'use client';

import Link from 'next/link';
import { useTranslation } from "@/context/LanguageContext";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { sampleSpots } from "@/data/spots";
import { TravelSpot } from "@/types/spot";
import { growthEngine } from "@/utils/perpetualGrowth";
import { SocialProof } from "@/components/SocialProof";
import { PricingModal } from '@/components/PricingModal';
import { activatePremiumPass } from "@/utils/payment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { kgemAgent } from "@/lib/agents/orchestrator";
import { useMapNavigation } from "@/hooks/useMapNavigation";
import { usePreference } from "@/context/PreferenceContext";
import { usePayment } from "@/context/PaymentContext";
import { blufEngine } from "@/lib/data/bluf_engine";
import { reservationService } from "@/lib/services/reservation_service";
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
      <div className="absolute top-4 left-4 bg-[var(--primary)]/90 backdrop-blur-lg px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--bg-dark)]">
        {t.ad.sponsored}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-center text-center">
      <span className="text-[var(--secondary)] text-[10px] font-bold uppercase tracking-widest mb-2">{t.ad.partner}</span>
      <h3 className="text-xl font-bold mb-4 premium-gradient">{t.ad.title}</h3>
      <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">{t.ad.desc}</p>
      <button className="w-full py-3 rounded-xl bg-[var(--surface-dark)] hover:bg-[var(--primary)] text-white hover:text-[var(--bg-dark)] text-xs font-bold transition-all border border-[var(--glass)] hover:border-[var(--primary)]">
        {t.ad.learnMore}
      </button>
    </div>
  </div>
);

// --- Skeleton Card for Premium Loading Experience ---
const SkeletonCard = () => (
  <div className="glass-card overflow-hidden animate-pulse p-4">
    <div className="h-64 bg-[var(--surface-dark)] rounded-[20px]" />
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
    <div className="p-8 rounded-[var(--radius-premium)] bg-[var(--surface-dark)] border border-[var(--primary)]/30 text-center backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner animate-pulse border border-[var(--primary)]/30">
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
            className="w-full py-4 rounded-2xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] font-black text-sm transition-all shadow-xl shadow-[var(--primary)]/20 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? t.ui.processing : t.ui.payWithCard}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--primary)]/20" />
            <span className="relative z-10 px-3 bg-[var(--surface-dark)] text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">{t.ui.orPayWith}</span>
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
              alert(t.ui.paypalError);
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
  const { user, loading, login, logout, isPremium, premiumUntil } = useAuth();
  const { isProcessing, subscriptionStatus } = usePayment();
  const { openMap } = useMapNavigation();
  const { preferredMap, setPreferredMap } = usePreference();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [showInAppModal, setShowInAppModal] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false); // Moved up
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const [liveSpots, setLiveSpots] = useState<TravelSpot[]>([]);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    console.log(`[Diagnostic] Browser UA: ${ua}, isInApp: ${isInApp}`);
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

    const scrollContainer = document.getElementById('app-clip');
    const handleScroll = () => {
      setShowTopButton((scrollContainer?.scrollTop || window.scrollY) > 400);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);



  // 🛡️ 2026 Strategy: Deterministic Filter Reset
  useEffect(() => {
    console.log(`[Diagnostic] Active category changed to: ${activeCategory}`);
    // setSearchQuery(''); // DISABLED: Too aggressive, clears search results unexpectedly
    // setLiveSpots([]);   // DISABLED: Too aggressive
  }, [activeCategory]);


  const scrollToTop = () => {
    const scrollContainer = document.getElementById('app-clip');
    if (scrollContainer) {
      scrollContainer.focus(); // 🚀 Prevent focus loss on some browsers
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = overrideQuery || searchQuery;
    if (query.trim().length <= 1) {
      setLiveSpots([]);
      setIsAiSearching(false);
      return;
    }

    setActiveCategory('all');
    setLiveSpots([]);
    setIsAiSearching(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      // 1. Show local matches instantly
      const sanitized = securityManager.sanitizeInput(query);
      const localMatches = sampleSpots.filter(spot => {
        const title = `${(spot.title as any)[language] || ''} ${spot.title['ko'] || ''}`.toLowerCase();
        const desc = `${(spot.description as any)[language] || ''} ${spot.description['ko'] || ''}`.toLowerCase();
        return query.split(/\s+/).every(kw => `${title} ${desc}`.includes(kw.toLowerCase()));
      });
      if (localMatches.length > 0) setLiveSpots(localMatches);

      // 2. Background agent
      kgemAgent.processRequest(sanitized).catch(() => { });

      // 3. AI Stream — use mutable counter to avoid React closure stale-count bug
      const res = await fetch(`/api/live-search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
      if (!res.ok) throw new Error('Search failed');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No body');

      const decoder = new TextDecoder();
      let buffer = '';
      const counter = { n: 0 }; // Mutable object survives React batching

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const spot = JSON.parse(line);
            if (spot && spot.id) {
              counter.n++;
              setLiveSpots(prev => {
                if (prev.some(s => s.id === spot.id)) return prev;
                return [...prev, spot];
              });
              if (counter.n >= 12) { // Get up to 12 to guarantee 10+ after dedup
                reader.cancel();
                break;
              }
            }
          } catch { /* partial JSON line, skip */ }
        }
        if (counter.n >= 12) break;
      }
    } catch (err: any) {
      console.warn('[LiveSearch]', err.name === 'AbortError' ? 'Timeout' : err.message);
    } finally {
      clearTimeout(timeoutId);
      setIsAiSearching(false);
    }
  };

  const triggerSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(undefined, query);
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
    openMap(spot, 'directions');
  };


  const handleGoogleDirections = (spot: any) => {
    // 2026 Strategy: User Preference over hardcoded Google
    openMap({ ...spot, forceMap: 'google' }, 'directions');
  };


  const handleAccommodation = (spot: any) => {
    const url = reservationService.getAgodaDeepLink(spot, language);
    window.open(url, '_blank');
  };

  const handleAction = (e: React.MouseEvent, type: string, spot: any) => {
    e.stopPropagation();

    if (type === 'map') {
      openMap(spot, 'search');
      return;
    }

    // Safe access: AI spots may not have `query` field
    const targetQuery = spot.query?.[language] || spot.query?.['en'] || spot.title?.[language] || spot.title?.['ko'] || '';
    const koQuery = spot.query?.['ko'] || spot.title?.['ko'] || '';

    const cleanQuery = (q: string) => q
      .replace(/\[Premium\]\s*/gi, '')
      .replace(/\(Premium\)\s*/gi, '')
      .replace(/[\u{1F300}-\u{1F9FF}]\s*/gu, '')
      .replace(/히든\s*스팟\s*#?\d*/g, '')
      .replace(/Hidden\s*Spot\s*#?\d*/gi, '')
      .replace(/隠れスポット\s*#?\d*/g, '')
      .trim();

    const finalSearchQuery = cleanQuery(language === 'ko' ? koQuery : targetQuery);
    const encodedQuery = encodeURIComponent(finalSearchQuery);

    let url = "";
    const googleRegions: any = { en: 'us', ja: 'jp', ko: 'kr' };
    const region = googleRegions[language] || 'us';
    const langParam = language === 'ja' ? 'ja' : 'en';
    const lrParam = language === 'ja' ? 'lang_ja' : 'lang_en';

    if (language === 'ko') {
      url = `https://search.naver.com/search.naver?query=${encodedQuery}`;
    } else {
      const googleTlds: any = { en: 'com', ja: 'co.jp' };
      const tld = googleTlds[language] || 'com';
      url = `https://www.google.${tld}/search?q=${encodedQuery}&hl=${langParam}&gl=${region}&lr=${lrParam}`;
    }

    window.open(url, '_blank');
  };

  // 14 days rotation logic (2 weeks)
  const rotationTick = Math.floor(Date.now() / (14 * 24 * 60 * 60 * 1000));

  // Next update calculation for UI display
  const nextUpdateEpoch = (rotationTick + 1) * 14 * 24 * 60 * 60 * 1000;
  const nextUpdateDate = new Date(nextUpdateEpoch).toLocaleDateString(language === 'ko' ? 'ko-KR' : language === 'ja' ? 'ja-JP' : 'en-US', {
    month: 'short', day: 'numeric'
  });

  const getRotatedSpots = (spots: TravelSpot[]) => {
    const rotated = [...spots];
    // Seed-based stable shuffle for the period
    const offset = (rotationTick * 7) % Math.max(1, spots.length);
    return [...rotated.slice(offset), ...rotated.slice(0, offset)];
  };

  const rotatedSpots = useMemo(() => getRotatedSpots(sampleSpots), [rotationTick]);

  const keywords = searchQuery.trim().toLowerCase().split(/\s+/);

  const matchesSearch = (spot: TravelSpot) => {
    if (!searchQuery.trim()) return true;
    const title = `${(spot.title as any)[language] || ''} ${spot.title['ko'] || ''}`.toLowerCase();
    const description = `${(spot.description as any)[language] || ''} ${spot.description['ko'] || ''}`.toLowerCase();
    const region = `${(spot.region as any)?.[language] || ''} ${(spot.region as any)?.['ko'] || ''}`.toLowerCase();
    const query = `${(spot.query as any)?.[language] || ''} ${(spot.query as any)?.['ko'] || ''}`.toLowerCase();
    const id = spot.id.toString().toLowerCase();
    const searchBuffer = `${title} ${description} ${region} ${query} ${id}`;
    return keywords.every(kw => searchBuffer.includes(kw));
  };

  const categoryMap: Record<string, string> = {
    'attraction': 'travel',
    'experience': 'activity',
    'cafe': 'dessert'
  };

  const filteredSpots = useMemo(() => {
    return rotatedSpots.filter(spot => {
      const mappedCategory = categoryMap[activeCategory] || activeCategory;
      const matchesCategory = activeCategory === 'all' || spot.category === mappedCategory;
      return matchesCategory && matchesSearch(spot);
    });
  }, [rotatedSpots, activeCategory, searchQuery, language]);

  const trendingSpots = useMemo(() => rotatedSpots.filter(spot => spot.isTrending), [rotatedSpots]);

  const ladiesSpots = useMemo(() => {
    // 🧠 Fix: Use 'dessert' for cafe and 'beauty' for beauty category matching
    return sampleSpots.filter(spot => spot.category === 'beauty' || spot.category === 'dessert').slice(0, 10);
  }, []);

  // 2026 Strategy: Display local database + Live AI fetched spots
  const displaySpots = useMemo(() => {
    const mappedCategory = categoryMap[activeCategory] || activeCategory;
    const q = searchQuery.toLowerCase();
    const isFoodSearch = q.includes('맛집') || q.includes('식당') || q.includes('레스토랑') || q.includes('food') || q.includes('restaurant');

    // 1. Local matches (already filtered by filteredSpots)
    const localMatches = filteredSpots.filter(spot => {
      if (isFoodSearch && activeCategory === 'all') {
        return spot.category === 'food' || spot.category === 'dessert';
      }
      return true;
    });

    // 2. AI live spots — DON'T re-filter with matchesSearch (AI already returns query-relevant data)
    const liveMatches = liveSpots.filter(spot => {
      const matchesCat = activeCategory === 'all' || spot.category === mappedCategory;
      if (isFoodSearch && activeCategory === 'all') {
        // AI Hallucination Safeguard: drop obvious non-food elements
        const title = (spot.title?.['ko'] || '').toLowerCase();
        const desc = (spot.description?.['ko'] || '').toLowerCase();
        const text = `${title} ${desc}`;
        if (text.includes('박물관') || text.includes('미술관') || text.includes('유적지') || text.includes('공원')) {
          return false;
        }
        return spot.category === 'food' || spot.category === 'dessert';
      }
      return matchesCat;
    });

    // 3. Combine: AI results first (fresher), then local
    const combined = [...liveMatches, ...localMatches];
    const uniqueMap = new Map();
    combined.forEach(spot => {
      if (!uniqueMap.has(spot.id)) uniqueMap.set(spot.id, spot);
    });

    return Array.from(uniqueMap.values());
  }, [liveSpots, filteredSpots, activeCategory, searchQuery, language]);

  const handleCategorySelect = (categoryKey: string) => {
    setIsAiSearching(false);
    setActiveCategory(categoryKey);
    // Note: setSearchQuery('') is now handled by useEffect for maximum reliability
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-dark)] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin" />
      </div>
    );
  }

  // --- Login Gate Component for Mobile-first Premium Experience ---
  const LoginGate = () => (
    <div className="relative py-20 px-6 text-center max-w-2xl mx-auto flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-4xl shadow-2xl mb-8 animate-bounce-slow">
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
        className="group relative px-10 py-5 rounded-3xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] text-lg font-black transition-all shadow-2xl shadow-[var(--primary)]/30 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        {t.ui.gateButton}
      </button>

      <div className="mt-12 flex items-center gap-4 text-[var(--primary)]/60 text-xs font-bold uppercase tracking-widest">
        <span>Verified Content</span>
        <div className="w-1 h-1 rounded-full bg-[var(--primary)]/40" />
        <span>0.1% Premium</span>
      </div>
    </div>
  );


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
    <main className="relative flex flex-col min-h-screen w-full max-w-full bg-[var(--bg-dark)] text-white font-sans">
      {/* 🧠 SEO/GEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Navigation */}
      <nav className="nav-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 max-w-[60%]">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center font-bold text-[var(--bg-dark)] shadow-lg shadow-[var(--primary)]/30 text-sm">
            {t.header.logo}
          </div>
          <span className="text-[var(--primary)] font-extrabold text-lg sm:text-xl tracking-tight truncate">{t.header.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-[0.2em]">
            <span>{t.header.refreshLabel}</span>
            <span className="text-[var(--primary)] font-bold">{t.header.refreshCycle}</span>
          </div>
          <div className="flex gap-1 bg-[var(--primary)]/10 p-1 rounded-full border border-[var(--primary)]/20">
            {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${language === lang ? 'bg-[var(--primary)] text-[var(--bg-dark)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--primary)]'
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {!user ? (
            <button
              onClick={() => login()}
              className="px-5 py-1.5 rounded-full bg-[var(--primary)]/10 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-[var(--bg-dark)] text-xs font-bold transition-all border border-[var(--primary)]/20 hover:border-[var(--primary)]"
            >
              {t.ui.login}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ""} alt="User" className="w-8 h-8 rounded-full border-2 border-[var(--primary)] shadow-[0_0_12px_var(--primary-glow)]" />
              <button
                onClick={() => logout()}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)] underline"
              >
                Logout
              </button>
            </div>
          )}

          {isInstallable && (
            <button
              onClick={handleInstallApp}
              className="px-5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--bg-dark)] text-[10px] font-black shadow-lg shadow-[var(--primary)]/30 active:scale-95 transition-all animate-pulse"
            >
              {t.ui.installApp}
            </button>
          )}

          <button
            className="hidden sm:block px-5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black border border-[var(--primary)]/20 active:scale-95 transition-all hover:bg-[var(--primary)] hover:text-[var(--bg-dark)]"
          >
            {t.ui.freeAccess}
          </button>
        </div>
      </nav>

      {/* 🚀 역발상 마케팅 배지 (GEO/SEO 전략 반영) */}
      <div className="relative w-full overflow-hidden bg-[var(--primary)]/5 border-y border-[var(--primary)]/10 py-2 whitespace-nowrap isolate">
        <div className="flex animate-marquee gap-8 items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">
            {t.marquee.warning}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]/70">
            {t.marquee.navigate}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">
            {t.marquee.verified}
          </span>
          {/* Repeat for continuous effect */}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]/70">
            {t.marquee.warning}
          </span>
        </div>
      </div>

      {/* 📍 Unified Sticky Navigation Hub (Search + Categories) */}
      <div className="sticky top-[72px] lg:top-[76px] z-40 w-full isolate flex flex-col gap-3 pt-4 pb-3">
        {/* Background Blur layer */}
        <div className="absolute inset-0 bg-[var(--bg-dark)]/95 backdrop-blur-2xl border-b border-[var(--primary)]/10 shadow-xl -z-10" />

        {/* Compact Search Bar */}
        <div className="px-5 sm:px-6 w-full max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="w-full relative flex items-center rounded-full bg-[var(--surface-dark)] border border-[var(--primary)]/20 focus-within:border-[var(--primary)]/50 transition-all shadow-inner overflow-hidden"
          >
            <svg className="absolute left-4 w-5 h-5 text-[var(--text-muted)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // debounce auto-search: trigger after 0.8s of no typing
                if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
                searchDebounceRef.current = setTimeout(() => {
                  if (e.target.value.trim().length > 1) {
                    handleSearch(undefined, e.target.value);
                  } else {
                    setLiveSpots([]);
                  }
                }, 300);
              }}
              placeholder={t.hero.searchPlaceholder}
              className="w-full pl-12 pr-20 py-3 bg-transparent rounded-full text-[14px] sm:text-[15px] focus:outline-none placeholder:text-slate-500 text-[var(--text-main)] overflow-ellipsis"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--bg-dark)] w-16 h-9 rounded-full font-black text-[12px] transition-all flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
              {isAiSearching ? <div className="w-3.5 h-3.5 border-2 border-[var(--bg-dark)] border-t-transparent rounded-full animate-spin" /> : t.ui.go}
            </button>
          </form>
        </div>

        {/* Category Slider */}
        <div className="allow-x-scroll w-full overflow-x-auto no-scrollbar overscroll-x-contain" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="flex flex-nowrap items-center w-max sm:mx-auto">
            <div className="shrink-0 w-5 sm:w-6 h-1" aria-hidden="true" /> {/* Left Spacer */}

            {Object.entries(t.categories).map(([key, label]) => (
              <button
                key={`sticky-${key}`}
                onClick={() => handleCategorySelect(key)}
                className={`whitespace-nowrap flex-shrink-0 min-w-0 mr-2 px-5 py-2 rounded-full border transition-all duration-300 font-bold text-[12px] uppercase tracking-wider relative z-20 ${activeCategory === key
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--bg-dark)] shadow-lg shadow-[var(--primary)]/20'
                  : 'bg-[var(--surface-dark)] border-[var(--primary)]/10 text-slate-500 hover:text-[var(--primary)] hover:border-[var(--primary)]/30'
                  }`}
              >
                {label as any}
              </button>
            ))}

            <div className="shrink-0 w-3 sm:w-4 h-1" aria-hidden="true" /> {/* Right Spacer */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden bg-[var(--bg-dark)]">
        <div className="absolute inset-x-0 mx-auto top-0 w-full h-[500px] bg-gradient-to-b from-[var(--primary)]/20 to-transparent pointer-events-none paint-contain" />

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

          {/* Search Bar Relocated to Sticky Navigation Hub */}

          {/* 💼 Business Partnership Inquiry Relocated for Visibility */}
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[var(--surface-dark)] hover:bg-[var(--primary)]/10 border border-[var(--primary)]/10 hover:border-[var(--primary)]/40 transition-all duration-500 font-bold text-[13px] text-slate-400 hover:text-[var(--primary)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              {t.footer.business}
            </button>
          </div>

          {/* 📈 2026 Strategy: Why K-Gem? USP Section */}
          <div className="mt-20 mb-10 max-w-5xl mx-auto px-4">
            <div className="mb-10">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                {t.usp.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black premium-gradient">
                {t.usp.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Map USP */}
              <div className="glass-card p-6 text-center group hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--primary)]/20 p-4 overflow-hidden shrink-0">
                  <span className="text-xl font-black text-[var(--bg-dark)] uppercase w-full text-center leading-tight tracking-tighter">{(t.usp.map as any).iconLabel}</span>
                </div>
                <h3 className="text-lg font-black text-[var(--primary)] mb-3">{t.usp.map.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.usp.map.desc}</p>
              </div>

              {/* Solo USP */}
              <div className="glass-card p-6 text-center group hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--secondary)]/20 p-4 overflow-hidden shrink-0">
                  <span className="text-xl font-black text-[var(--bg-dark)] uppercase w-full text-center leading-tight tracking-tighter">{(t.usp.solo as any).iconLabel}</span>
                </div>
                <h3 className="text-lg font-black text-[var(--primary)] mb-3">{t.usp.solo.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.usp.solo.desc}</p>
              </div>

              {/* Cashless USP */}
              <div className="glass-card p-6 text-center group hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--primary)]/20 p-4 overflow-hidden shrink-0">
                  <span className="text-xl font-black text-[var(--bg-dark)] uppercase w-full text-center leading-tight tracking-tighter">{(t.usp.cash as any).iconLabel}</span>
                </div>
                <h3 className="text-lg font-black text-[var(--primary)] mb-3">{t.usp.cash.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.usp.cash.desc}</p>
              </div>
            </div>
          </div>

          {/* Categories have been relocated to the Sticky Nav Hub for performance and UX */}
        </div>
      </section>

      {/* Featured Content & Login Gate */}
      {
        (user || searchQuery) ? (
          <section className="px-6 py-12 max-w-7xl mx-auto animate-in fade-in duration-1000">

            {/* Trending Section */}
            {!searchQuery && activeCategory === 'all' && user && (
              <div className="mb-24">
                {isInstallable && (
                  <button
                    onClick={handleInstallApp}
                    className="mb-8 w-full py-4 rounded-2xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-[var(--primary)]/20 active:scale-[0.98]"
                  >
                    <span>📱</span> {t.ui.installApp} (Free)
                  </button>
                )}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center text-2xl">🔥</div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.sections.trending}</h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{t.header.refreshCycle}</p>
                    </div>
                  </div>
                  <span className="sm:ml-auto px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold border border-[var(--primary)]/10 uppercase tracking-widest">
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
                          <div className="absolute top-4 left-4 bg-[var(--primary)]/90 backdrop-blur-lg px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg text-[var(--bg-dark)]">
                            {t.card.trending}
                          </div>
                          {spot.vipContent && (
                            <div className="absolute top-14 left-4 bg-[var(--secondary)]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-[var(--secondary)]/20 shadow-lg text-white">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              0.1% SECRET
                            </div>
                          )}
                          <SocialProof type="live" count={12} className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-md" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{(spot.title as any)[language]}</h3>
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
                                  className="flex-1 py-2.5 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 hover:bg-[var(--primary)]/20 text-[var(--primary)] font-black text-[11px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                >
                                  🧭 {t.ui.navNaver}
                                </button>
                                <button
                                  onClick={() => handleGoogleDirections(spot)}
                                  className="flex-1 py-2.5 rounded-xl bg-[var(--surface-dark)] border border-[var(--primary)]/10 hover:bg-[var(--primary)]/10 text-slate-400 font-black text-[11px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
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
                                <div className="p-5 rounded-3xl bg-[var(--primary)]/5 border border-[var(--primary)]/10 relative overflow-hidden">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1 rounded-full bg-[var(--bg-dark)] border-2 border-[var(--primary)] shadow-lg animate-bounce-slow">
                                      <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                                    </div>
                                    <span className="text-xs font-black text-[var(--primary)] uppercase tracking-tighter">{t.ui.secretInfo}</span>
                                    <div className="h-[1px] flex-1 bg-[var(--primary)]/20" />
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
                              className="flex-1 py-4 rounded-2xl bg-[var(--surface-dark)] hover:bg-[var(--primary)]/10 text-sm font-bold transition-all border border-[var(--primary)]/10 active:scale-95 text-slate-300"
                            >
                              {t.card.viewMap}
                            </button>
                            <button
                              onClick={(e) => handleAction(e, 'details', spot)}
                              className="flex-1 py-4 rounded-2xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] text-sm font-bold transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95"
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
            {!searchQuery && activeCategory === 'all' && user && (
              <div className="mb-24 p-8 rounded-[40px] bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface-dark)] to-[var(--secondary)]/5 border border-[var(--primary)]/10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--secondary)]/20 flex items-center justify-center text-xl">✨</div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                      {t.sections.ladies}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Skin · Cosmetic · Dessert · Cafe</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ladiesSpots.map((spot) => (
                    <div key={`ladies-${spot.id}`} className="bg-[var(--bg-dark)]/80 border border-[var(--primary)]/10 rounded-3xl overflow-hidden group hover:border-[var(--primary)]/30 transition-all">
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={spot.image}
                          alt={(spot.title as any)[language]}
                          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest">{(t.categories as any)[spot.category || 'beauty']}</span>
                        <h3 className="font-bold mt-1 text-sm line-clamp-1">{(spot.title as any)[language]}</h3>
                        <div className="flex gap-3 mt-5">
                          <button onClick={(e) => handleAction(e, 'map', spot)} className="flex-1 text-xs py-3 rounded-xl bg-[var(--surface-dark)] border border-[var(--primary)]/10 hover:bg-[var(--primary)]/10 active:scale-95 transition-all">
                            {t.ui.map}
                          </button>
                          <button onClick={(e) => handleAction(e, 'details', spot)} className="flex-1 text-xs py-3 rounded-xl bg-[var(--primary)] hover:brightness-110 font-bold text-[var(--bg-dark)] active:scale-95 transition-all">
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
                    {isAiSearching ? t.ui.searchingLocal : t.ui.searchResultCount.replace('{query}', searchQuery).replace('{count}', displaySpots.length.toString())}
                    {!isAiSearching && <span className="text-[var(--primary)] text-xs font-black bg-[var(--primary)]/10 px-2 py-1 rounded">{t.ui.verified}</span>}
                  </span>
                ) : t.sections.curated}
              </h2>
              <div className="h-[1px] flex-1 bg-slate-800/50" />
            </div>


            {isAiSearching && displaySpots.length === 0 ? (
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
                        {isPremium && (
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <div className="bg-[var(--bg-dark)]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[var(--primary)] border border-[var(--primary)]/30 flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                              AI 광고 필터링
                            </div>
                            <div className="bg-[var(--secondary)] px-3 py-1 rounded-full text-[10px] font-black text-white shadow-lg shadow-[var(--secondary)]/20 uppercase tracking-wider">
                              0.1% SECRET
                            </div>
                          </div>
                        )}

                        {/* 🔥 2026 Strategy: Real-time Social Proof */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-bold text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {spot.viewingCount || (Math.floor(Math.random() * 10) + 3)} TRAVELERS VIEWING NOW
                        </div>

                        <div className="absolute bottom-4 right-4 bg-[var(--primary)]/90 backdrop-blur-md text-[var(--bg-dark)] px-2.5 py-1 rounded-lg text-sm font-black flex items-center gap-1 shadow-xl">
                          <span className="text-[var(--bg-dark)]">★</span> {spot.rating}
                        </div>
                      </div>
                      <div className="p-7 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold tracking-tight">{spot.title[language] || spot.title['ko']}</h3>
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-[var(--primary)]">{getPriceTag(spot.price)}</span>
                          </div>
                        </div>
                        {/* 2026 Strategy: BLUF Content for GEO */}
                        <div className="relative">
                          <p className={`text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed transition-all ${subscriptionStatus === 'free' ? 'blur-sm select-none' : ''}`}>
                            {blufEngine.formatDescription(spot, language as any)}
                          </p>
                          {subscriptionStatus === 'free' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={() => setIsPricingOpen(true)}
                                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--bg-dark)] text-[10px] font-black shadow-xl"
                              >
                                {t.vipModal?.restricted || 'UNLOCK SECRET TIP'}
                              </button>
                            </div>
                          )}
                        </div>


                        <div className="grid grid-cols-2 gap-2 mb-6">
                          <button
                            onClick={() => handleDirections(spot)}
                            className="py-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 hover:bg-[var(--primary)]/20 text-[var(--primary)] font-extrabold text-[10px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🧭 {t.ui.navNaver}
                          </button>
                          <button
                            onClick={() => handleGoogleDirections(spot)}
                            className="py-3 rounded-xl bg-[var(--surface-dark)] border border-[var(--primary)]/10 hover:bg-[var(--primary)]/10 text-slate-400 font-extrabold text-[10px] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🌍 {t.ui.navGoogle}
                          </button>
                          <button
                            onClick={() => handleAccommodation(spot)}
                            className="col-span-2 py-3 rounded-xl bg-[var(--surface-dark)] border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all text-[10px] font-extrabold uppercase tracking-tighter flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            🏨 {t.ui.accommodation}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <button
                            onClick={(e) => handleAction(e, 'map', spot)}
                            className="flex-1 bg-[var(--surface-dark)] hover:bg-[var(--primary)]/10 text-white py-3 rounded-xl font-bold text-xs transition-all border border-[var(--primary)]/10 active:scale-95"
                          >
                            {t.card.viewMap}
                          </button>

                          <button
                            onClick={(e) => handleAction(e, 'details', spot)}
                            className="flex-1 bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95"
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
              <div className="text-center py-40 bg-[var(--surface-dark)]/40 rounded-[60px] border border-dashed border-slate-800 backdrop-blur-sm">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center text-4xl mb-8 mx-auto animate-pulse">
                  {isAiSearching ? '🧠' : '🔍'}
                </div>
                <p className="text-slate-300 text-xl font-bold mb-4">
                  {isAiSearching
                    ? t.ui.searchingLocal
                    : t.ui.noResultsFound.replace('{query}', searchQuery)}
                </p>
                <p className="text-slate-500 text-sm italic">
                  {isAiSearching
                    ? (language === 'ko' ? 'AI 큐레이터가 실시간으로 소셜 트렌드와 현지 리뷰를 분석하고 있습니다.' : 'Our AI curator is analyzing social trends and local reviews in real-time.')
                    : (language === 'ko' ? '다른 검색어나 지역명으로 다시 검색해보세요.' : 'Try searching with different keywords or regions.')}
                </p>
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
              <p className="mt-2 text-[var(--primary)]/20 font-bold">Build Version: 2026-03-04-2135 (STABLE)</p>
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
              <div className="w-20 h-20 rounded-3xl bg-[var(--primary)]/20 flex items-center justify-center text-4xl mb-8 animate-bounce border border-[var(--primary)]/30">
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
                  className="w-full py-4 rounded-2xl bg-[var(--primary)] hover:brightness-110 text-[var(--bg-dark)] font-black text-sm transition-all shadow-xl shadow-[var(--primary)]/20 active:scale-95"
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
