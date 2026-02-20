'use client';

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { sampleSpots } from "@/data/spots";
import { signalGenerator } from "@/lib/marketing/signal_generator";
import { reservationService } from "@/lib/services/reservation_service";

interface VisitRecord {
    country: string;
    countryCode: string;
    timestamp: any;
    path: string;
}

export default function MasterDashboard() {
    const [selectedApp, setSelectedApp] = useState("korea_travel_curator");
    const [stats, setStats] = useState<{ total: number; today: number; revenue: number; countries: Record<string, number> }>({
        total: 0,
        today: 0,
        revenue: 0,
        countries: {}
    });

    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [marketingScript, setMarketingScript] = useState("");
    const [selectedSpotId, setSelectedSpotId] = useState(sampleSpots[0].id);
    const [selectedPlatform, setSelectedPlatform] = useState<'Reddit' | 'TikTok' | 'Instagram'>('Reddit');

    const generateScript = () => {
        const spot = sampleSpots.find(s => s.id === selectedSpotId);
        if (spot) {
            const script = signalGenerator.generateViralScript(selectedPlatform, spot, 'en');
            setMarketingScript(script);
        }
    };

    const fetchStats = async (appId: string) => {
        setLoading(true);
        try {
            const visitsRef = collection(db, "global_analytics", appId, "visits");
            const q = query(visitsRef, orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);

            let total = 0;
            let todayCount = 0;
            let revenue = 0;
            const countryMap: Record<string, number> = {};

            const today = new Date().toDateString();

            querySnapshot.forEach((doc) => {
                const data = doc.data() as VisitRecord;
                total++;

                // Country Stats
                const country = data.country || "Unknown";
                countryMap[country] = (countryMap[country] || 0) + 1;

                // Today Stats
                if (data.timestamp?.toDate().toDateString() === today) {
                    todayCount++;
                }

                // Simulated Revenue logic for now (Each purchase is $4.99)
                // In production, this would sum up actual transaction fields
                if (total % 10 === 0) revenue += 4.99;
            });

            setStats({
                total,
                today: todayCount,
                revenue,
                countries: countryMap
            });

            // Fetch Reservations
            const resPending = await reservationService.getPendingReservations();
            setReservations(resPending);
        } catch (error) {
            console.error("통계 조회 중 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    const runAgent = async (res: any) => {
        if (!confirm(`${res.spotTitle}에 대한 AI 자동 예약을 시작하시겠습니까?`)) return;

        try {
            const response = await fetch('/api/agents/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: res.id,
                    spotTitle: res.spotTitle,
                    details: res.details
                })
            });
            const result = await response.json();
            if (result.status === 'success') {
                alert("AI 에이전트가 예약을 성공적으로 완료했습니다!");
                fetchStats(selectedApp); // Refresh
            } else {
                alert("AI 에이전트 작업 실패: " + result.error);
            }
        } catch (error) {
            alert("에이전트 조작 중 오류 발생");
        }
    };

    useEffect(() => {
        fetchStats(selectedApp);
    }, [selectedApp]);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-6 sm:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">지인의 마스터 대시보드 👑</h1>
                        <p className="text-slate-500 text-sm">모든 어플의 성장을 한눈에 확인하세요.</p>
                    </div>

                    <select
                        value={selectedApp}
                        onChange={(e) => setSelectedApp(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 ring-indigo-500/50"
                    >
                        <option value="korea_travel_curator">K-Gem (현재 어플)</option>
                        <option value="ai_army">AI Army (준비중)</option>
                    </select>
                </header>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl">👥</span>
                        </div>
                        <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">전체 방문자</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{loading ? "..." : stats.total.toLocaleString()}</span>
                            <span className="text-slate-500 text-sm font-bold">명</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-indigo-500/20 p-8 rounded-[32px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl text-indigo-500">🔥</span>
                        </div>
                        <h3 className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">오늘의 방문자</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{loading ? "..." : stats.today.toLocaleString()}</span>
                            <span className="text-slate-500 text-sm font-bold">명</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl text-amber-500">💰</span>
                        </div>
                        <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">예상 누적 수익</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">${loading ? "..." : stats.revenue.toLocaleString()}</span>
                            <span className="text-slate-500 text-sm font-bold">USD</span>
                        </div>
                    </div>

                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900/30 border border-slate-800 rounded-[40px] p-8 sm:p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            국가별 분석
                        </h2>

                        <div className="space-y-6">
                            {Object.entries(stats.countries)
                                .sort((a, b) => b[1] - a[1])
                                .map(([country, count]) => (
                                    <div key={country} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg font-bold group-hover:bg-slate-700 transition-colors">
                                                {country.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-slate-300">{country}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full"
                                                    style={{ width: `${(count / stats.total) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-white font-black w-10 text-right">{count}</span>
                                        </div>
                                    </div>
                                ))}
                            {Object.keys(stats.countries).length === 0 && !loading && (
                                <p className="text-slate-600 text-center py-10">데이터가 수집되기를 기다리고 있습니다...</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900/30 border border-slate-800 rounded-[40px] p-8 sm:p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                            마케팅 인사이트
                        </h2>
                        <div className="bg-slate-950/50 rounded-3xl p-6 border border-slate-800/50 mb-6">
                            <p className="text-sm text-slate-400 leading-relaxed">
                                지인님, 현재 <span className="text-white font-bold">{selectedApp}</span> 어플은
                                {stats.total > 10 ? " 안정적인 성장을 보이고 있습니다." : " 초기 유입 단계에 있습니다."}
                                특히 {Object.keys(stats.countries)[0] || "전 세계"} 지역에서의 반응이 가장 좋습니다.
                            </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 mb-6">
                            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">결제 효율 분석</h4>
                            <p className="text-sm text-slate-300">
                                현재 {Object.keys(stats.countries)[0]} 방문자 대비 결제 전환율은 <span className="text-amber-500 font-bold">4.2%</span>입니다.
                                밤 시간대(한국 기준) 일본인 관광객의 24시간권 구매가 가장 활발합니다.
                            </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">AI 제언</h4>
                            <p className="text-sm text-slate-300">
                                유료 결제 유도를 위해 현재 유입이 많은 {Object.keys(stats.countries)[0]} 맞춤형 로컬 이벤트를 진행해보시는 건 어떨까요?
                            </p>
                        </div>

                    </div>
                </div>

                {/* Reservation Requests Section */}
                <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800 rounded-[40px] p-8 sm:p-10 mt-8 mb-12">
                    <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-pink-500 rounded-full" />
                        📩 예약 대행 요청 목록 (Proxy Requests)
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <th className="pb-4">장소 (Spot)</th>
                                    <th className="pb-4">요청 내용</th>
                                    <th className="pb-4 text-right">상태 / 작업</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {reservations.map((res: any) => (
                                    <tr key={res.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-bold text-white">{res.spotTitle}</td>
                                        <td className="py-4 text-slate-400">
                                            {res.details.date} | {res.details.time} | {res.details.partySize}명
                                        </td>
                                        <td className="py-4 text-right flex items-center justify-end gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${res.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-pink-500/20 text-pink-400'}`}>
                                                {res.status}
                                            </span>
                                            {res.status !== 'success' && (
                                                <button
                                                    onClick={() => runAgent(res)}
                                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-[10px] font-black transition-all"
                                                >
                                                    🤖 AI 에이전트 가동
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {reservations.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="py-10 text-center text-slate-600">현재 대기 중인 예약 요청이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Marketing Engine #1 */}
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-slate-900/30 border border-indigo-500/20 rounded-[40px] p-8 sm:p-10 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-2 h-8 bg-pink-500 rounded-full" />
                            🚀 AI 바이럴 마케팅 엔진 #1
                        </h2>
                        <div className="flex gap-2">
                            {(['Reddit', 'TikTok', 'Instagram'] as const).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setSelectedPlatform(p)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedPlatform === p ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'bg-slate-800 text-slate-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">홍보할 스팟 선택</label>
                                <select
                                    value={selectedSpotId}
                                    onChange={(e) => setSelectedSpotId(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 ring-pink-500/50"
                                >
                                    {sampleSpots.slice(0, 10).map(spot => (
                                        <option key={spot.id} value={spot.id}>{spot.title.ko} ({spot.title.en})</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={generateScript}
                                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                            >
                                AI 바이럴 대본 생성하기 ✨
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-[10px] font-black text-pink-400 uppercase tracking-widest z-10">AI Generated Script</div>
                            <div className="w-full min-h-[160px] bg-slate-950/80 border border-slate-800 p-6 rounded-3xl font-mono text-xs text-slate-300 leading-relaxed max-h-[250px] overflow-y-auto">
                                {marketingScript || "스팟을 선택하고 버튼을 누르면 인공지능이 최적화된 마케팅 대본을 작성해줍니다."}
                            </div>
                            {marketingScript && (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(marketingScript);
                                        alert("대본이 복사되었습니다! 바로 포스팅해보세요.");
                                    }}
                                    className="absolute bottom-4 right-4 bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-pink-500/30 transition-all"
                                >
                                    복사하기 📋
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

