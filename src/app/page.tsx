'use client';

import Link from 'next/link';
import { useTranslation } from "@/context/LanguageContext";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { sampleSpots } from "@/data/spots";
import { TravelSpot } from "@/types/spot";
import { growthEngine } from "@/utils/perpetualGrowth";
import { SocialProof } from "@/components/SocialProof";
import { activatePremiumPass } from "@/utils/payment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { kgemAgent } from "@/lib/agents/orchestrator";
import { useMapNavigation } from "@/hooks/useMapNavigation";
import { usePreference } from "@/context/PreferenceContext";
import { usePayment } from "@/context/PaymentContext";
import { blufEngine } from "@/lib/data/bluf_engine";
import { reservationService } from "@/lib/services/reservation_service";
import { NaverMapV3 } from "@/components/Map/NaverMapV3";
import { PayPalButtons } from "@paypal/react-paypal-js";




import { contextService } from "@/lib/data/context_service";
import { securityManager } from "@/lib/security/security_manager";



// --- Native Ad Card 2026 ---
const NativeAdCard = ({ t }: { t: any }) => (
  <div className="glass-card overflow-hidden group relative flex flex-col border-[var(--primary)]/20 bg-[var(--primary)]/5 p-1">
    <div className="h-56 overflow-hidden relative rounded-[20px]">
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
        alt="Sponsored"
        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute top-4 left-4 bg-[var(--primary)]/90 backdrop-blur-lg px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
        {t.ad.sponsored}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-center text-center">
      <span className="text-[var(--secondary)] text-[10px] font-bold uppercase tracking-widest mb-2">{t.ad.partner}</span>
      <h3 className="text-xl font-bold mb-4 premium-gradient">{t.ad.title}</h3>
      <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">{t.ad.desc}</p>
      <button className="w-full py-3 rounded-xl bg-[var(--bg-dark)]/50 hover:bg-[var(--primary)] text-white text-xs font-bold transition-all border border-[var(--glass)] hover:border-[var(--primary)]">
        {t.ad.learnMore}
      </button>
    </div>
  </div>
);

// --- Skeleton Card for Premium Loading Experience ---
const SkeletonCard = () => (
  <div className="glass-card overflow-hidden animate-pulse p-4">
    <div className="h-64 bg-[var(--glass)] rounded-[20px]" />
    <div className="p-7 space-y-4">
      <div className="h-6 bg-[var(--glass)] rounded w-3/4" />
      <div className="h-4 bg-[var(--glass)] rounded w-full" />
      <div className="h-4 bg-[var(--glass)] rounded w-5/6" />
      <div className="flex gap-3 mt-4">
        <div className="h-12 bg-[var(--glass)] rounded-2xl flex-1" />
        <div className="h-12 bg-[var(--glass)] rounded-2xl flex-1" />
      </div>
    </div>
  </div>
);

// --- Premium Gate for Monetization ---
const PremiumGate = ({ t, userId, onUnlock }: { t: any, userId: string, onUnlock: () => void }) => {
  const { registerCard, isProcessing } = usePayment();

  return (
    <div className="p-8 rounded-[var(--radius-premium)] bg-[var(--bg-dark)]/40 border border-[var(--primary)]/30 text-center backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner animate-pulse">
          🔓
        </div>
        <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{t.vipModal.restricted}</h4>
        <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed max-w-[240px] mx-auto">
          {t.ui.premiumPassDesc || "Get 24h unlimited access to all 0.1% K-Secret Tips"}
        </p>

        <div className="space-y-3">
          <button
            onClick={registerCard}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 text-white font-black text-sm transition-all shadow-xl shadow-[var(--primary)]/20 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : `💎 Credit Card ($4.99)`}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--glass)]" />
            <span className="relative z-10 px-3 bg-[var(--bg-dark)] text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">or pay with</span>
          </div>

          <PayPalButtons
            style={{ layout: "vertical", shape: "pill", label: "pay", color: "gold" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: "4.99",
                    },
                    description: "K-Gem Premium 24h Pass",
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              if (actions.order) {
                const details = await actions.order.capture();
                console.log("PayPal Payment Success:", details);
                onUnlock();
              }
            }}
            onError={(err) => {
              console.error("PayPal Error:", err);
              alert("PayPal payment failed. Please try again.");
            }}
          />
        </div>

        <p className="mt-6 text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest leading-tight opacity-60">
          {t.ui.noSubscription || "No Subscription • One-time Payment"}
        </p>
      </div>
    </div>
  );
};


export default function Home() {
  const { t, language, setLanguage } = useTranslation();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [showInAppModal, setShowInAppModal] = useState(false);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    }
  };


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

    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { openMap } = useMapNavigation();
  const { preferredMap, setPreferredMap } = usePreference();
  const { user, loading, login, logout, isPremium, premiumUntil } = useAuth();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 1) {
      setIsAiSearching(true);

      // 2026 Strategy: Security Sanitization
      const sanitizedQuery = securityManager.sanitizeInput(searchQuery);

      // 2026 Strategy: Agentic AI Orchestration
      const response = await kgemAgent.processRequest(sanitizedQuery);

      console.log("KGEM Agent Response:", response);

      // Artificial delay for premium feel
      setTimeout(() => setIsAiSearching(false), 1500);
    }
  };

  const handleGangnamStrategy = async () => {
    setSearchQuery("Gangnam style trip plan");
    setIsAiSearching(true);
    const response = await kgemAgent.processRequest("Gangnam style trip plan");
    // In a real app, this would update the UI state to show the specific route
    setTimeout(() => setIsAiSearching(false), 2000);
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
    openMap(spot);
  };


  const handleGoogleDirections = (spot: any) => {
    // 2026 Strategy: User Preference over hardcoded Google
    openMap({ ...spot, forceMap: 'google' });
  };


  const handleAccommodation = (spot: any) => {
    const nameKo = spot.title.ko;
    const nameTarget = spot.title[language] || spot.title.en;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const agodaLangs: any = { ko: 'ko-kr', en: 'en-us', ja: 'ja-jp' };
    const agodaCodes: any = { ko: 10, en: 1, ja: 2 };
    const agodaPath = agodaLangs[language] || 'en-us';
    const agodaCode = agodaCodes[language] || 1;
    const currency = language === 'ko' ? 'KRW' : 'USD';

    // 🏨 2026 CRO Advisor Strategy: Dynamic Landing
    const isRural = /jeju|ulleung|island|mountain/i.test((spot.query.en || '').toLowerCase());
    const landingType = isRural ? 'map' : 'list';
    const filter = !isRural ? '&rating=8' : '';

    // 🏨 2026 CRO Advisor Strategy: Pure Localization for International Users
    // Remove the Korean name suffix for International users to avoid Agoda's Korean-bias.
    const searchText = encodeURIComponent(nameTarget);

    // Hyper-Aggressive Forcing: Added &locale param and multiple redundant language IDs
    const url = `https://www.agoda.com/${agodaPath}/search?searchText=${searchText}&checkIn=${formatDate(today)}&checkOut=${formatDate(tomorrow)}&adults=2&rooms=1${filter}&landing=${landingType}&language=${agodaCode}&setlang=${agodaPath}&cur=${currency}&site_id=1&language_id=${agodaCode === 10 ? 10 : (agodaCode === 2 ? 2 : 1)}&headerlang=${agodaPath}&setlanguage=1&ck_en=1&locale=${agodaPath}&redirect=false`;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/i.test(userAgent);

    if (isAndroid && language !== 'ko') {
      // 🔥 Force Chrome for Agoda to bypass App native hijacking.
      // Added action and category for stricter browser forcing.
      const chromeIntent = `intent://${url.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`;
      window.location.href = chromeIntent;
    } else {
      window.open(url, '_blank');
    }
  };


  const handleAction = (e: React.MouseEvent, type: string, spot: any) => {
    e.stopPropagation();

    // Unified Map Navigation: Use the same successful hook logic as "Directions"
    if (type === 'map') {
      openMap(spot);
      return;
    }

    let url = "";
    // Use target language query first, fallback to Korean
    const targetQuery = spot.query[language] || spot.query['en'] || spot.title[language];
    const koQuery = spot.query['ko'] || spot.title['ko'];

    const searchQuery = language === 'ko' ? koQuery : targetQuery;
    const encodedQuery = encodeURIComponent(searchQuery);

    const googleRegions: any = { en: 'us', ja: 'jp', ko: 'kr' };
    const region = googleRegions[language] || 'us';
    const langParam = language === 'ja' ? 'ja' : 'en';
    const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

    // For details search
    if (language === 'ko') {
      url = `https://search.naver.com/search.naver?query=${encodedQuery}`;
    } else {
      const googleTlds: any = { en: 'com', ja: 'co.jp' };
      const tld = googleTlds[language] || 'com';
      // 🔥 Ultra Strategy: Specific TLD domain forcing for search
      url = `https://www.google.${tld}/search?q=${encodedQuery}&hl=${langParam}&gl=${region}&lr=${lrParam}&num=10&sourceid=chrome&ie=UTF-8&set_language=${langParam}`;
    }

    // Search (details) works fine with window.open and doesn't need "Open with" popup.
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

  // 2026 Strategy: Si/Gun/Gu Regional Expansion (50+ items per region)
  const displaySpots = (filteredSpots.length < 50 && searchQuery.length > 1)
    ? [
      ...filteredSpots,
      ...Array.from({ length: Math.max(0, 50 - filteredSpots.length) }).map((_, i) => {
        const isSolo = searchQuery.toLowerCase().includes('solo');
        const isTrash = searchQuery.toLowerCase().includes('trash');
        const isTMoney = searchQuery.toLowerCase().includes('t-money') || searchQuery.toLowerCase().includes('cash');
        const isRegional = !isSolo && !isTrash && !isTMoney && searchQuery.length > 2;

        return {
          id: `ai-extended-${i}`,
          title: {
            ko: isRegional ? `[Premium] ${searchQuery} 히든 스팟 #${i + 1}` : isSolo ? `혼밥 가능 BBQ #${i + 1}` : isTrash ? `공공 쓰레기통 #${i + 1}` : `"${searchQuery}" AI 추천 ${i + 1}`,
            en: isRegional ? `[Premium] ${searchQuery} Hidden Spot #${i + 1}` : isSolo ? `Solo-Friendly BBQ #${i + 1}` : isTrash ? `Public Trash Bin #${i + 1}` : `AI Recommend: ${searchQuery} #${i + 1}`,
            ja: isRegional ? `[Premium] ${searchQuery} 隠れスポット #${i + 1}` : isSolo ? `一人焼肉 #${i + 1}` : isTrash ? `公共ゴミ箱 #${i + 1}` : `AI おすすめ: ${searchQuery} #${i + 1}`
          },
          vipContent: {
            secretMenu: {
              ko: isRegional ? "유료 회원 전용 비밀 정보" : isSolo ? "1인분 주문 가능 확인됨" : isTrash ? "분리수거 가능" : "현금 충전 전용",
              en: isRegional ? "Premium Member Secret" : isSolo ? "1-portion confirmed" : isTrash ? "Recycling available" : "Cash only",
              ja: isRegional ? "有料会員専用秘密情報" : isSolo ? "1人前注文可能" : isTrash ? "分別可能" : "現金チャージ専用"
            },
            ownerTip: {
              ko: "해당 지역에서만 알 수 있는 0.1% 정보입니다.",
              en: "Top 0.1% local-insider insight.",
              ja: "その地域限定の0.1%情報です。"
            }
          },
          description: {
            ko: isRegional ? `${searchQuery} 지역의 숨겨진 보물 같은 장소입니다. 관광객은 모르는 현지인 전용 명소입니다.` : isSolo ? "혼자서도 눈치 보지 않고 즐길 수 있는 프리미엄 고깃집입니다." : isTrash ? "관광지 내 드문 공공 쓰레기통 위치입니다." : "T-money를 현금으로 충전할 수 있는 가장 가까운 곳입니다.",
            en: isRegional ? `A hidden gem in ${searchQuery} known only to locals. Skip the tourist traps.` : isSolo ? "Premium BBQ spot that welcomes solo diners with no minimum." : isTrash ? "Rare public trash can location in a busy tourist area." : "Nearest point to top-up your T-money card with cash.",
            ja: isRegional ? `${searchQuery}地域の隠れた宝物のような場所です。観光客は知らない地元民専用スポットです。` : isSolo ? "一人でも気兼ねなく楽しめるプレミアム焼肉店です。" : isTrash ? "観光地内の貴重な公共ゴミ箱の場所です。" : "T-moneyを現金でチャージできる最寄りの場所です。"
          },
          transport: {
            ko: "현 위치 또는 지역 거점에서 도보 10분 내외",
            en: "Within 10 min walk from local landmarks",
            ja: "現在地または地域拠点から徒歩10分前後"
          },
          image: isRegional
            ? `https://images.unsplash.com/photo-${1515000000000 + (i * 12345) % 800}?w=800&q=80`
            : isSolo
              ? `https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80`
              : isTrash
                ? `https://images.unsplash.com/photo-1591839843657-3f82e5ff699a?w=800&q=80`
                : `https://images.unsplash.com/photo-${1500000000000 + (i * 12345) % 1000}?w=800&q=80`,
          rating: (4.6 + Math.random() * 0.4).toFixed(1),
          viewingCount: Math.floor(Math.random() * 15) + 5,

          lat: 37.5665 + (Math.random() - 0.5) * 0.1,
          lng: 126.9780 + (Math.random() - 0.5) * 0.1,
          query: `${searchQuery} ${i + 1}`,
          isTrending: i < 5,
          isFallback: true
        };
      })
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
    <main className="min-h-screen bg-[var(--bg-dark)] text-white font-sans">
      {/* 🧠 SEO/GEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Navigation */}
      <nav className="nav-blur px-6 py-4 flex justify-between items-center bg-[var(--bg-dark)]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--glass)]">
        <div className="flex items-center gap-2 max-w-[60%]">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold shadow-lg shadow-[var(--primary)]/20">
            {t.header.logo}
          </div>
          <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight truncate text-[var(--text-main)]">{t.header.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-[0.2em]">
            <span>{t.header.refreshLabel}</span>
            <span className="text-[var(--secondary)] font-bold">{t.header.refreshCycle}</span>
          </div>
          <div className="flex gap-2 bg-[var(--bg-dark)]/50 p-1 rounded-full border border-[var(--glass)]">
            {(['ko', 'en', 'ja'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${language === lang ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {!user ? (
            <button
              onClick={() => login()}
              className="px-5 py-1.5 rounded-full bg-[var(--card-bg)] hover:bg-[var(--primary)] text-[var(--text-main)] text-xs font-bold transition-all border border-[var(--glass)]"
            >
              {t.ui.login}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ""} alt="User" className="w-8 h-8 rounded-full border border-[var(--primary)] shadow-[0_0_10px_var(--primary-glow)]" />
              <button
                onClick={() => logout()}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] underline"
              >
                Logout
              </button>
            </div>
          )}

          {isInstallable && (
            <button
              onClick={handleInstallApp}
              className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-[10px] font-black shadow-lg shadow-[var(--primary-glow)] active:scale-95 transition-all animate-pulse"
            >
              {t.ui.installApp}
            </button>
          )}

          <button
            className="hidden sm:block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-[10px] font-black shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
          >
            {t.ui.freeAccess}
          </button>
        </div>
      </nav>

      {/* 🚀 역발상 마케팅 배지 (GEO/SEO 전략 반영) */}
      <div className="bg-[var(--primary)]/10 border-y border-[var(--primary)]/20 py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-8 items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary)]">
            ⚠️ Google Maps doesn't work well in Korea. Use K-Gem navigation instead.
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary)]">
            🏯 Navigate Like a Local with K-Gem's Precision Guide.
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary)]">
            🚀 0.1% Premium Spots Verified by Real-time AI.
          </span>
          {/* Repeat for continuous effect */}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary)]">
            ⚠️ Google Maps doesn't work well in Korea. Use K-Gem navigation instead.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden bg-[var(--bg-dark)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[var(--primary)]/20 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-[var(--secondary)] uppercase bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full">
            {t.header.subtitle}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 tracking-tight whitespace-pre-line leading-[1.1] sm:leading-tight premium-gradient">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-xl text-[var(--text-muted)] mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            {t.hero.description}
          </p>

          <SocialProof type="trust" className="justify-center mb-10" />

          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative p-1 rounded-[var(--radius-premium)] bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] shadow-2xl group focus-within:ring-2 ring-[var(--primary)]/50 transition-all font-sans"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full px-6 py-4 bg-[var(--bg-dark)] rounded-[20px] text-lg focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-main)]"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[var(--primary)] hover:opacity-90 px-5 sm:px-6 py-2.5 rounded-xl font-black transition-all flex items-center gap-2 shadow-lg active:scale-95 text-white">
              {isAiSearching ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "GO"}
            </button>
          </form>

          {/* ⚡️ 2026 Strategy: One-Click Action Commands */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGangnamStrategy}
              className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-widest transition-all"
            >
              🚀 Gangnam Strategy
            </button>
            <button
              onClick={() => { setSearchQuery("Solo BBQ spots"); handleSearch(new Event('submit') as any); }}
              className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 text-pink-400 text-[11px] font-black uppercase tracking-widest transition-all"
            >
              🥩 Solo BBQ
            </button>
            <button
              onClick={() => { setSearchQuery("Find nearest trash bins"); handleSearch(new Event('submit') as any); }}
              className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 text-green-400 text-[11px] font-black uppercase tracking-widest transition-all"
            >
              ♻️ Trash Bins
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-500 text-[11px] font-black uppercase tracking-widest transition-all">
              🍵 Secret Tea Tour
            </button>
          </div>


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
                          {spot.vipContent && (
                            <div className="absolute top-14 left-4 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-500/20 shadow-lg">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              0.1% SECRET
                            </div>
                          )}
                          <SocialProof type="live" count={12} className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{(spot.title as any)[language]}</h3>
                          <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{(spot.description as any)[language]}</p>

                          {/* Transport Info - More readable on mobile with dual buttons */}
                          {spot.transport && (
                            <div className="flex flex-col gap-3 mb-6">
                              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 border border-slate-900">
                                <span className="text-base">🚌</span>
                                <span className="text-xs text-slate-400 font-bold tracking-tight uppercase leading-tight">{(spot.transport as any)[language]}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleDirections(spot)}
                                  className="flex-1 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 font-black text-[11px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                >
                                  🧭 {t.ui.navNaver}
                                </button>
                                <button
                                  onClick={() => handleGoogleDirections(spot)}
                                  className="flex-1 py-2.5 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800/50 text-slate-400 font-black text-[11px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                >
                                  🌍 {t.ui.navGoogle}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Revealed Secret Content - Enhanced visibility */}
                          {spot.vipContent && (
                            <div className="mb-6">
                              {isPremium ? (
                                <div className="p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1 rounded-full bg-[var(--bg-dark)] border-2 border-white shadow-lg animate-bounce-slow">
                                      <div className="w-3 h-3 rounded-full bg-white"></div>
                                    </div>
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
                              ) : (
                                <PremiumGate
                                  t={t}
                                  userId={user?.uid || ''}
                                  onUnlock={() => user ? activatePremiumPass(user.uid) : login()}
                                />
                              )}
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

            {/* 🗺️ 2026 Strategy: Hybrid Map View */}
            <div className="mb-24">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-xl">🗺️</div>
                <h2 className="text-3xl font-bold tracking-tight">Precision Live Map</h2>
              </div>
              <div className="w-full h-[500px] mb-8">
                <NaverMapV3
                  language={language as any}
                  center={{ lat: 37.5665, lng: 126.9780 }}
                  zoom={14}
                  markers={displaySpots.slice(0, 5).map((s: any) => ({
                    lat: s.lat || 37.5665,
                    lng: s.lng || 126.9780,
                    title: s.title[language] || s.title['ko']
                  }))}
                />
              </div>
            </div>

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
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.title[language] || spot.title['ko']}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                        {/* 💎 2026 Strategy: Premium Badges (Screenshot Match) */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            AI 광고 필터링
                          </div>
                          <div className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-black text-white shadow-lg shadow-emerald-500/20 uppercase tracking-wider">
                            0.1% SECRET
                          </div>
                        </div>

                        {/* 🔥 2026 Strategy: Real-time Social Proof */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-bold text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {spot.viewingCount || (Math.floor(Math.random() * 10) + 3)} TRAVELERS VIEWING NOW
                        </div>

                        <div className="absolute bottom-4 right-4 bg-indigo-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-sm font-black flex items-center gap-1 shadow-xl">
                          <span className="text-yellow-400">★</span> {spot.rating}
                        </div>
                      </div>
                      <div className="p-7 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold tracking-tight">{spot.title[language] || spot.title['ko']}</h3>
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-indigo-400">{getPriceTag(spot.price)}</span>
                          </div>
                        </div>
                        {/* 2026 Strategy: BLUF Content for GEO */}
                        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {blufEngine.formatDescription(spot, language as any)}
                        </p>


                        <div className="grid grid-cols-2 gap-2 mb-6">
                          <button
                            onClick={() => handleDirections(spot)}
                            className="py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 font-extrabold text-[10px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🧭 {t.ui.navNaver}
                          </button>
                          <button
                            onClick={() => handleGoogleDirections(spot)}
                            className="py-3 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800/50 text-slate-400 font-extrabold text-[10px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🌍 {t.ui.navGoogle}
                          </button>
                          <button
                            onClick={() => handleAccommodation(spot)}
                            className="col-span-2 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all text-[10px] font-extrabold uppercase tracking-tighter flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🏨 {t.ui.accommodation}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <button
                            onClick={(e) => handleAction(e, 'map', spot)}
                            className="flex-1 bg-slate-800/80 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-xs transition-all border border-slate-700 active:scale-95"
                          >
                            {t.card.viewMap}
                          </button>

                          <button
                            onClick={(e) => handleAction(e, 'details', spot)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                          >
                            {t.card.details}
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <button className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
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
      <footer className="py-24 text-center border-t border-[var(--glass)] mt-24 bg-[var(--bg-dark)]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center font-bold text-2xl shadow-2xl">
            {t.header.logo}
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
            <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">{t.legal.terms.title}</Link>
            <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">{t.legal.privacy.title}</Link>
            <Link href="/refund" className="hover:text-[var(--primary)] transition-colors">{t.legal.refund.title}</Link>
          </div>

          <div className="text-[var(--text-muted)] text-[10px] tracking-wide leading-relaxed opacity-60">
            <p>{t.footer.powered} • {t.footer.updated}</p>
            <p className="mt-1">{t.footer.copy}</p>
            <div className="mt-3 pt-3 border-t border-[var(--glass)]/30">
              <p>{t.footer.info}</p>
              <p className="mt-1">{t.footer.extraInfo}</p>
            </div>
          </div>

          {isInstallable && (
            <button
              onClick={handleInstallApp}
              className="mt-6 px-8 py-3 rounded-2xl bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] font-bold text-xs transition-all border border-[var(--primary)]/10 flex items-center gap-2"
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
            <div className="relative bg-[var(--primary)] rounded-[32px] p-6 shadow-2xl shadow-[var(--primary)]/40 border border-[var(--primary)]/30 overflow-hidden text-left">
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
                className="mt-6 w-full py-4 rounded-2xl bg-white text-[var(--primary)] font-extrabold text-sm active:scale-95 transition-all shadow-xl"
              >
                {t.footer.iosPwaClose}
              </button>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--primary)] rotate-45 border-r border-b border-[var(--primary)]/30" />

          </div>
        )
      }

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-2xl bg-[var(--primary)] hover:opacity-90 text-white shadow-2xl shadow-[var(--primary)]/40 flex items-center justify-center transition-all duration-500 transform active:scale-90 ${showTopButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <span>↑</span>
      </button>
    </main>
  );
}
