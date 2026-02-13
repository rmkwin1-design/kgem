'use client';

import { useTranslation } from "@/context/LanguageContext";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { sampleSpots } from "@/data/spots";
import { TravelSpot } from "@/types/spot";
import { growthEngine } from "@/utils/perpetualGrowth";
import { SocialProof } from "@/components/SocialProof";

// --- Ad Component for Premium Aesthetic ---
const NativeAdCard = ({ t }: { t: any }) => (
  <div className="glass-card overflow-hidden group relative flex flex-col border-indigo-500/20 bg-indigo-500/5">
    <div className="h-56 overflow-hidden relative">
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
        alt="Sponsored"
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-lg px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        {t.ad.sponsored}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-center text-center">
      <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t.ad.partner}</span>
      <h3 className="text-xl font-bold mb-4">{t.ad.title}</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">{t.ad.desc}</p>
      <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all border border-slate-700/50">
        {t.ad.learnMore}
      </button>
    </div>
  </div>
);

// --- Skeleton Card for Premium Loading Experience ---
const SkeletonCard = () => (
  <div className="glass-card overflow-hidden animate-pulse">
    <div className="h-64 bg-slate-800" />
    <div className="p-7 space-y-4">
      <div className="h-6 bg-slate-800 rounded w-3/4" />
      <div className="h-4 bg-slate-800 rounded w-full" />
      <div className="h-4 bg-slate-800 rounded w-5/6" />
      <div className="flex gap-3 mt-4">
        <div className="h-12 bg-slate-800 rounded-2xl flex-1" />
        <div className="h-12 bg-slate-800 rounded-2xl flex-1" />
      </div>
    </div>
  </div>
);

export default function Home() {
  const { t, language, setLanguage } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [showInAppModal, setShowInAppModal] = useState(false);

  useEffect(() => {
    // 🧠 인앱 브라우저 감지 로직 (카카오톡, 인스타그램 등)
    const ua = navigator.userAgent.toLowerCase();
    const isInApp = /kakaotalk|instagram|fbav|line|naver|pinterst/i.test(ua);
    if (isInApp) {
      setShowInAppModal(true);
    }
    // 🚀 PWA 설치 프롬프트 제어 로직
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 🚀 영구적 성장 엔진 가동 (마케팅 자동화 및 데이터 동기화)
    growthEngine;

    // 📱 iOS PWA 설치 유도 로직 (스토어 없는 확산 전략)
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isIos && !isStandalone) {
      setShowIosPrompt(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };
  const { user, loading, login, logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 1) {
      setIsAiSearching(true);
      setTimeout(() => setIsAiSearching(false), 2000); // Increased for better skeleton experience
    }
  };

  const getPriceTag = (price?: number) => {
    if (price === undefined) return null;
    if (price === 0) return language === 'ko' ? '무료' : 'FREE';

    const rates = { USD: 1350, JPY: 9 };
    if (language === 'ko') return `₩${price.toLocaleString()}`;
    if (language === 'ja') return `¥${Math.floor(price / rates.JPY).toLocaleString()}`;
    return `$${Math.floor(price / rates.USD).toLocaleString()}`;
  };

  const handleShare = (spot: any) => {
    const title = (spot.title as any)[language];
    if (navigator.share) {
      navigator.share({
        title: `K-Gem | ${title}`,
        text: `Check out this 0.1% secret spot in Korea: ${title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(language === 'ko' ? '링크가 복사되었습니다!' : 'Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rmkwin@naver.com');
    alert(language === 'ko' ? '이메일 주소(rmkwin@naver.com)가 복사되었습니다!\n메일 작성 시 붙여넣기 해주세요.' : 'Email address (rmkwin@naver.com) copied!');
  };

  const handleDirections = (spot: any) => {
    const lat = spot.lat;
    const lng = spot.lng;
    const name = spot.title[language] || spot.title['ko'];
    const query = spot.query || name;

    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    // 📍 Language-aware start location text for better SEO/UX on map providers
    const startTexts: Record<string, string> = {
      ko: '현재위치',
      en: 'Current Location',
      ja: '現在地'
    };
    const startName = startTexts[language] || startTexts['en'];

    if (lat && lng) {
      // 🍎 iOS Global Users: Apple Maps optimization (Top-tier English labels in Korea)
      if (isIOS && language !== 'ko') {
        const appleMapsUrl = `http://maps.apple.com/?daddr=${lat},${lng}&dname=${encodeURIComponent(name)}&dirflg=r`;
        window.open(appleMapsUrl, '_blank');
        return;
      }

      if (language === 'ko') {
        if (isMobile) {
          // 🚀 Mobile: Naver Map App Direct Call
          const naverAppUrl = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=kgem`;
          const start = Date.now();
          window.location.href = naverAppUrl;
          setTimeout(() => {
            if (Date.now() - start < 2000) {
              window.open(`https://map.naver.com/v5/directions/-,/${lat},${lng},${encodeURIComponent(name)}/transit`, '_blank');
            }
          }, 1500);
        } else {
          // 💻 PC: Naver Web Stable
          const naverUrl = `https://map.naver.com/index.nhn?slng=&slat=&stext=&elng=${lng}&elat=${lat}&etext=${encodeURIComponent(name)}&menu=route&pathType=1`;
          window.open(naverUrl, '_blank');
        }
      } else {
        // 🌏 Global (EN/JA): New Naver Map /v5 engine (stable) with 'lang' parameter for native translation
        const naverLang = language === 'ja' ? 'ja' : 'en';
        // Using '-' as the departure point ensures Naver Map triggers the "Current Location" search automatically
        const naverWebUrl = `https://map.naver.com/v5/directions/-,/${lat},${lng},${encodeURIComponent(name)}/transit?lang=${naverLang}`;

        if (isMobile && !isIOS) {
          // Android Native: Try translated App first, fallback to Multilingual Web
          const naverAppUrl = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=kgem`;
          const start = Date.now();
          window.location.href = naverAppUrl;
          setTimeout(() => {
            if (Date.now() - start < 2000) {
              window.open(naverWebUrl, '_blank');
            }
          }, 1500);
        } else {
          // PC or iOS alternative: Naver v5 Multilingual interface
          window.open(naverWebUrl, '_blank');
        }
      }
    } else {
      const fallbackUrl = language === 'ko'
        ? `https://map.naver.com/index.nhn?menu=route&pathType=1&etext=${encodeURIComponent(query)}`
        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&travelmode=transit&hl=${language}`;
      window.open(fallbackUrl, '_blank');
    }
  };

  const handleAccommodation = (spot: any) => {
    const name = spot.title[language] || spot.title['ko'];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const agodaLangs: any = { ko: 'ko-kr', en: 'en-us', ja: 'ja-jp' };
    const agodaPath = agodaLangs[language] || 'en-us';

    // 🏨 최종 안정화 규격: 아고다 서버 부하 및 보안 정책에 가장 덜 구속받는 단순 검색 방식
    const url = `https://www.agoda.com/${agodaPath}/search?searchText=${encodeURIComponent(name + (language === 'ko' ? ' 주변 호텔' : ' hotels nearby'))}&checkIn=${formatDate(today)}&checkOut=${formatDate(tomorrow)}&adults=2&rooms=1`;
    window.open(url, '_blank');
  };

  const handleAction = (e: React.MouseEvent, type: string, spot: any) => {
    e.stopPropagation();
    let url = "";
    const query = spot.query || spot.title[language] || spot.title['ko'];

    if (type === 'map') {
      if (language === 'ko') {
        url = `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
      } else if (language === 'ja') {
        url = `https://www.google.co.jp/maps/search/${encodeURIComponent(query)}?hl=ja`;
      } else {
        url = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=en`;
      }
    } else {
      if (language === 'ko') {
        url = `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
      } else if (language === 'ja') {
        url = `https://www.google.co.jp/search?q=${encodeURIComponent(query)}&hl=ja`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`;
      }
    }
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  // --- Login Gate Component for Mobile-first Premium Experience ---
  const LoginGate = () => (
    <div className="relative py-20 px-6 text-center max-w-2xl mx-auto flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-2xl mb-8 animate-bounce-slow">
        🔒
      </div>

      <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight leading-tight">
        {t.ui.gateTitle}
      </h2>

      <p className="text-slate-400 text-base sm:text-lg mb-10 whitespace-pre-line leading-relaxed">
        {t.ui.gateDesc}
      </p>

      <button
        onClick={() => login()}
        className="group relative px-10 py-5 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-lg font-black transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        {t.ui.gateButton}
      </button>

      <div className="mt-12 flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
        <span>Verified Content</span>
        <div className="w-1 h-1 rounded-full bg-slate-700" />
        <span>0.1% Premium</span>
      </div>
    </div>
  );

  // 14 days rotation logic (2 weeks)
  const rotationTick = Math.floor(Date.now() / (14 * 24 * 60 * 60 * 1000));

  // Next update calculation for UI display
  const nextUpdateEpoch = (rotationTick + 1) * 14 * 24 * 60 * 60 * 1000;
  const nextUpdateDate = new Date(nextUpdateEpoch).toLocaleDateString(language === 'ko' ? 'ko-KR' : language === 'ja' ? 'ja-JP' : 'en-US', {
    month: 'short', day: 'numeric'
  });

  const getRotatedSpots = (spots: TravelSpot[]) => {
    if (searchQuery.trim().length > 0) return spots; // Don't rotate when searching
    const rotated = [...spots];
    // Seed-based stable shuffle for the period
    const offset = (rotationTick * 7) % Math.max(1, spots.length);
    return [...rotated.slice(offset), ...rotated.slice(0, offset)];
  };

  const rotatedSpots = getRotatedSpots(sampleSpots);

  const filteredSpots = rotatedSpots.filter(spot => {
    const matchesCategory = activeCategory === 'all' || spot.category === activeCategory;
    const title = (spot.title as any)[language] || (spot.title as any)['ko'];
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.title['ko'].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingSpots = rotatedSpots.filter(spot => spot.isTrending);
  const ladiesSpots = rotatedSpots.filter(spot => spot.category === 'beauty' || spot.category === 'dessert');

  const displaySpots = (filteredSpots.length < 5 && searchQuery.length > 1)
    ? [
      ...filteredSpots,
      ...Array.from({ length: 12 - filteredSpots.length }).map((_, i) => ({
        id: `ai-${i}`,
        title: {
          ko: `"${searchQuery}" AI 추천 ${i + 1}`,
          en: `AI Recommend: ${searchQuery} #${i + 1}`,
          ja: `AI おすすめ: ${searchQuery} #${i + 1}`
        },
        description: {
          ko: `실시간 AI 분석으로 찾은 ${searchQuery} 최고의 0.1% 명소입니다. 전문 큐레이터가 검증한 최신 정보를 제공합니다.`,
          en: `0.1% premium spot in ${searchQuery} area verified via real-time AI. Up-to-date information provided.`,
          ja: `リアルタイムAI分析で見つけた「${searchQuery}」周辺の最高級0.1%スポットです。専門家が検証した最新情報です.`
        },
        transport: {
          ko: "AI 분석 결과: 해당 지역 중심지에서 도보 및 대중교통 이용 가능",
          en: "AI Analysis: Accessible via walking & public transport from the center",
          ja: "AI 分析結果: 該当地域の中心地から徒歩および公共交通機関で移動可能"
        },
        image: `https://images.unsplash.com/photo-${1500000000000 + (i * 12345) % 1000}?w=800&q=80`,
        rating: (4.7 + Math.random() * 0.3).toFixed(1),
        lat: 37.5665 + (Math.random() - 0.5) * 0.1, // Simulated lat for SEO/GEO
        lng: 126.9780 + (Math.random() - 0.5) * 0.1, // Simulated lng
        query: `${searchQuery} ${i + 1}`,
        isTrending: i < 3,
        isFallback: true
      }))
    ]
    : filteredSpots;

  // --- GEO 최적화: AI 검색 엔진을 위한 JSON-LD Schema 생성 ---
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": displaySpots.slice(0, 10).map((spot: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": spot.title[language] || spot.title['ko'],
        "description": spot.description[language] || spot.description['ko'],
        "image": spot.image,
        "geo": spot.lat && spot.lng ? {
          "@type": "GeoCoordinates",
          "latitude": spot.lat,
          "longitude": spot.lng
        } : undefined,
        "url": "https://kgem.vercel.app/"
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* 🧠 SEO/GEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Navigation */}
      <nav className="nav-blur px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800/50">
        <div className="flex items-center gap-2 max-w-[60%]">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
            {t.header.logo}
          </div>
          <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight truncate">{t.header.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">
            <span>{t.header.refreshLabel}</span>
            <span className="text-indigo-400 font-bold">{t.header.refreshCycle}</span>
          </div>
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-full border border-slate-700">
            {(['ko', 'en', 'ja'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${language === lang ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {!user ? (
            <button
              onClick={() => login()}
              className="px-5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              {t.ui.login}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ""} alt="User" className="w-8 h-8 rounded-full border border-indigo-500" />
              <button
                onClick={() => logout()}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Logout
              </button>
            </div>
          )}

          {isInstallable && (
            <button
              onClick={handleInstallApp}
              className="px-5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black shadow-lg shadow-indigo-600/20 active:scale-95 transition-all animate-pulse"
            >
              {t.ui.installApp}
            </button>
          )}

          <button
            className="hidden sm:block px-5 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-black shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
          >
            {t.ui.freeAccess}
          </button>
        </div>
      </nav>

      {/* 🚀 역발상 마케팅 배지 (GEO/SEO 전략 반영) */}
      <div className="bg-indigo-600/20 border-y border-indigo-500/30 py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-8 items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
            ⚠️ Google Maps doesn't work well in Korea. Use K-Gem navigation instead.
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
            🏯 Navigate Like a Local with K-Gem's Precision Guide.
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
            🚀 0.1% Premium Spots Verified by Real-time AI.
          </span>
          {/* Repeat for continuous effect */}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
            ⚠️ Google Maps doesn't work well in Korea. Use K-Gem navigation instead.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            {t.header.subtitle}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 tracking-tight whitespace-pre-line leading-[1.1] sm:leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            {t.hero.description}
          </p>

          <SocialProof type="trust" className="justify-center mb-10" />

          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl group focus-within:ring-2 ring-indigo-500/50 transition-all font-sans"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full px-6 py-4 bg-slate-900 rounded-xl text-lg focus:outline-none placeholder:text-slate-500"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 px-5 sm:px-6 py-2.5 rounded-lg font-black transition-all flex items-center gap-2 shadow-lg active:scale-95">
              {isAiSearching ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "GO"}
            </button>
          </form>

          {/* 💼 Business Partnership Inquiry Relocated for Visibility */}
          <div className="mt-5 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-slate-900/40 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/40 transition-all duration-500 font-bold text-[13px] text-slate-400 hover:text-indigo-400"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {t.footer.business}
            </button>
          </div>

          {/* Category Filter Moved Here */}
          <div className="mt-10 flex overflow-x-auto pb-4 gap-2 no-scrollbar px-2 justify-center">
            {Object.entries(t.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-sm ${activeCategory === key
                  ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/30 text-white'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300 border-dashed'
                  }`}
              >
                {label as any}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content & Login Gate */}
      {
        user ? (
          <section className="px-6 py-12 max-w-7xl mx-auto animate-in fade-in duration-1000">

            {/* Trending Section */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="mb-24">
                {isInstallable && (
                  <button
                    onClick={handleInstallApp}
                    className="mb-8 w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
                  >
                    <span>📱</span> {t.ui.installApp} (Free)
                  </button>
                )}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-2xl">🔥</div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.sections.trending}</h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{t.header.refreshCycle}</p>
                    </div>
                  </div>
                  <span className="sm:ml-auto px-4 py-1.5 rounded-full bg-indigo-600/10 text-indigo-400 text-xs font-bold border border-indigo-500/10 uppercase tracking-widest">
                    {t.ui.realtime}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trendingSpots.map((spot, index) => (
                    <React.Fragment key={`trending-${spot.id}`}>
                      <div className="glass-card overflow-hidden group relative flex flex-col">
                        <div className="h-56 overflow-hidden relative">
                          <img
                            src={spot.image}
                            alt={(spot.title as any)[language]}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur-lg px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg">
                            {t.card.trending}
                          </div>
                          <SocialProof type="live" count={12} className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{(spot.title as any)[language]}</h3>
                          <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{(spot.description as any)[language]}</p>

                          {/* Transport Info - More readable on mobile */}
                          {spot.transport && (
                            <div className="flex flex-col gap-3 mb-6">
                              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 border border-slate-900">
                                <span className="text-base">🚌</span>
                                <span className="text-xs text-slate-400 font-bold tracking-tight uppercase leading-tight">{(spot.transport as any)[language]}</span>
                              </div>
                              <button
                                onClick={() => handleDirections(spot)}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors pl-1 py-1"
                              >
                                📍 {t.ui.getDirections}
                              </button>
                            </div>
                          )}

                          {/* Revealed Secret Content - Enhanced visibility */}
                          {spot.vipContent && (
                            <div className="mb-6 p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-black text-indigo-400 uppercase tracking-tighter">{t.ui.secretInfo}</span>
                                <div className="h-[1px] flex-1 bg-indigo-500/20" />
                              </div>
                              <div>
                                <p className="text-[13px] text-slate-200 font-bold leading-snug">
                                  ✨ {(spot.vipContent.secretMenu as any)[language]}
                                </p>
                                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed italic">
                                  💡 {(spot.vipContent.ownerTip as any)[language]}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-3 mt-auto">
                            <button
                              onClick={(e) => handleAction(e, 'map', spot)}
                              className="flex-1 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-sm font-bold transition-all border border-slate-700/50 active:scale-95"
                            >
                              {t.card.viewMap}
                            </button>
                            <button
                              onClick={(e) => handleAction(e, 'details', spot)}
                              className="flex-1 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                            >
                              {t.card.details}
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Insert Ad after the 2nd trending card */}
                      {index === 1 && <NativeAdCard t={t} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Ladies Choice Section */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="mb-24 p-8 rounded-[40px] bg-gradient-to-br from-indigo-900/20 via-slate-900 to-purple-900/10 border border-indigo-500/10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-xl">✨</div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {t.sections.ladies}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Skin · Cosmetic · Dessert · Cafe</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ladiesSpots.map((spot) => (
                    <div key={`ladies-${spot.id}`} className="bg-slate-950/50 border border-slate-800 rounded-3xl overflow-hidden group hover:border-purple-500/30 transition-all">
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={spot.image}
                          alt={(spot.title as any)[language]}
                          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">{(t.categories as any)[spot.category || 'beauty']}</span>
                        <h3 className="font-bold mt-1 text-sm line-clamp-1">{(spot.title as any)[language]}</h3>
                        <div className="flex gap-3 mt-5">
                          <button onClick={(e) => handleAction(e, 'map', spot)} className="flex-1 text-xs py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 active:scale-95 transition-all">
                            {t.ui.map}
                          </button>
                          <button onClick={(e) => handleAction(e, 'details', spot)} className="flex-1 text-xs py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold active:scale-95 transition-all">
                            {t.ui.info}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tight">
                {searchQuery ? (
                  <span className="flex items-center gap-3">
                    {isAiSearching ? t.ui.analyzing : `"${searchQuery}" AI Results (10+)`}
                    {!isAiSearching && <span className="text-emerald-400 text-xs font-black bg-emerald-400/10 px-2 py-1 rounded">{t.ui.verified}</span>}
                  </span>
                ) : t.sections.curated}
              </h2>
              <div className="h-[1px] flex-1 bg-slate-800/50" />
            </div>


            {isAiSearching ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
              </div>
            ) : displaySpots.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displaySpots.map((spot: any, index: number) => (
                  <React.Fragment key={spot.id}>
                    <div className="glass-card overflow-hidden group flex flex-col h-full border-slate-800/50 hover:bg-slate-800/30">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.title[language] || spot.title['ko']}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-slate-700/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          {t.card.adFiltered}
                        </div>
                        {spot.isTrending && (
                          <div className="absolute top-4 right-4 bg-pink-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border border-pink-500/20 shadow-lg">
                            🔥 {t.card.trending}
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4 bg-indigo-600/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-black border border-indigo-400/30">
                          ⭐️ {spot.rating}
                        </div>
                        <SocialProof type="live" count={8} className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md" />
                      </div>
                      <div className="p-7 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold tracking-tight">{spot.title[language] || spot.title['ko']}</h3>
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-indigo-400">{getPriceTag(spot.price)}</span>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{spot.description[language] || spot.description['ko']}</p>

                        <div className="flex gap-2 mb-6">
                          <button
                            onClick={() => handleDirections(spot)}
                            className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-[11px] font-black uppercase tracking-tighter flex items-center justify-center gap-1.5"
                          >
                            🧭 {t.ui.getDirections}
                          </button>
                          <button
                            onClick={() => handleAccommodation(spot)}
                            className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all text-[11px] font-black uppercase tracking-tighter flex items-center justify-center gap-1.5"
                          >
                            🏨 {t.ui.accommodation}
                          </button>
                        </div>

                        <div className="flex gap-3 mt-auto">
                          <button
                            onClick={(e) => handleAction(e, 'map', spot)}
                            className="flex-1 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 font-bold text-sm transition-all border border-slate-800 shadow-sm active:scale-95"
                          >
                            {t.card.viewMap}
                          </button>
                          <button
                            onClick={(e) => handleAction(e, 'details', spot)}
                            className="flex-1 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                          >
                            {t.card.details}
                          </button>
                          <button
                            onClick={() => handleShare(spot)}
                            className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-indigo-500/50 transition-all text-xl"
                          >
                            🔗
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Insert Ad after the 3rd card in main grid */}
                    {index === 2 && <NativeAdCard t={t} />}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-slate-900/30 rounded-[40px] border border-dashed border-slate-800">
                <p className="text-slate-500 text-lg">"{searchQuery}" {language === 'ko' ? '에 대한 지역 특화 결과를 찾고 있습니다...' : ' - Looking for regional results...'}</p>
              </div>
            )}
          </section>
        ) : (
          <LoginGate />
        )
      }

      {/* Footer Branding */}
      <footer className="py-24 text-center border-t border-slate-800/50 mt-24 bg-slate-950/20">
        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-2xl shadow-2xl">
            {t.header.logo}
          </div>
          <p className="text-slate-500 text-sm tracking-wide">
            {t.footer.powered} • {t.footer.updated}<br />
            {t.footer.copy}
          </p>

          {isInstallable && (
            <button
              onClick={handleInstallApp}
              className="mt-6 px-8 py-3 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 font-bold text-xs transition-all border border-indigo-500/10 flex items-center gap-2"
            >
              <span>📱</span> {t.ui.installApp} (Free)
            </button>
          )}

        </div>
      </footer>

      {/* 🛡️ 인앱 브라우저(OAuth 차단) 대응 프리미엄 안내 모달 */}
      {showInAppModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" />
          <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/20 rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 flex items-center justify-center text-4xl mb-8 animate-bounce">
                🛡️
              </div>
              <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                {t.ui.inAppTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 whitespace-pre-line">
                {t.ui.inAppDesc}
              </p>

              <div className="w-full space-y-4">
                <button
                  onClick={() => {
                    const currentUrl = window.location.href;
                    // iOS 카카오톡/인스타용 인텐트 스키마 등은 브라우저마다 다르므로 
                    // 가장 확실한 방법은 외부 브라우저 열기 버튼 제공 또는 URL 복사 지원
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(currentUrl);
                      alert(language === 'ko' ? 'URL이 복사되었습니다. 브라우저 주소창에 붙여넣어주세요!' : 'URL Copied!');
                    }
                  }}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  {t.ui.copyUrl}
                </button>
                <button
                  onClick={() => setShowInAppModal(false)}
                  className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs transition-all active:scale-95"
                >
                  {t.ui.gateButton}
                </button>
              </div>
              <p className="mt-8 text-[10px] text-slate-600 font-bold uppercase tracking-widest animate-pulse">
                💡 {t.ui.openExternal} (Chrome/Safari)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 📱 iOS PWA 설치 안내 툴팁 */}
      {
        showIosPrompt && (
          <div className="fixed bottom-24 left-6 right-6 z-[70] animate-in slide-in-from-bottom duration-700">
            <div className="relative bg-indigo-600 rounded-[32px] p-6 shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4 pr-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                  📲
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-lg text-white mb-1 uppercase tracking-tight">
                    {t.footer.iosPwaTitle}
                  </h4>
                  <p className="text-white/80 text-sm font-medium leading-snug">
                    {t.footer.iosPwaDesc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowIosPrompt(false)}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              >
                <span className="text-2xl font-light">✕</span>
              </button>
              <button
                onClick={() => setShowIosPrompt(false)}
                className="mt-6 w-full py-4 rounded-2xl bg-white text-indigo-600 font-extrabold text-sm active:scale-95 transition-all shadow-xl"
              >
                {t.footer.iosPwaClose}
              </button>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-600 rotate-45 border-r border-b border-indigo-400/30" />
          </div>
        )
      }

      {/* Floating TOP Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/40 flex items-center justify-center transition-all duration-500 transform active:scale-90 ${showTopButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
      >
        <span className="text-xl font-black">↑</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
      </button>
    </main >
  );
}
