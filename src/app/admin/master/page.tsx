'use client';

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

interface VisitRecord {
    country: string;
    countryCode: string;
    timestamp: any;
    path: string;
}

export default function MasterDashboard() {
    const [selectedApp, setSelectedApp] = useState("korea_travel_curator");
    const [stats, setStats] = useState<{ total: number; today: number; countries: Record<string, number> }>({
        total: 0,
        today: 0,
        countries: {}
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async (appId: string) => {
        setLoading(true);
        try {
            const visitsRef = collection(db, "global_analytics", appId, "visits");
            const q = query(visitsRef, orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);

            let total = 0;
            let todayCount = 0;
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
            });

            setStats({
                total,
                today: todayCount,
                countries: countryMap
            });
        } catch (error) {
            console.error("통계 조회 중 오류:", error);
        } finally {
            setLoading(false);
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
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">김 박사의 마스터 대시보드 👑</h1>
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
                            <span className="text-6xl text-emerald-500">🌍</span>
                        </div>
                        <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">현재 유입 국가</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{loading ? "..." : Object.keys(stats.countries).length}</span>
                            <span className="text-slate-500 text-sm font-bold">개국</span>
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
                                김 박사님, 현재 <span className="text-white font-bold">{selectedApp}</span> 어플은
                                {stats.total > 10 ? " 안정적인 성장을 보이고 있습니다." : " 초기 유입 단계에 있습니다."}
                                특히 {Object.keys(stats.countries)[0] || "전 세계"} 지역에서의 반응이 가장 좋습니다.
                            </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">AI 제언</h4>
                            <p className="text-sm text-slate-300">
                                수집된 국가 데이터를 기반으로 {Object.keys(stats.countries)[0]} 맞춤형 로컬 이벤트를 진행해보시는 건 어떨까요?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
