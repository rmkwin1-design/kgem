import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * 전 세계 모든 앱의 방문자 데이터를 통합 관리하는 수집기
 */
export const trackVisitor = async (appId: string) => {
    try {
        // 1. 보안상 클라이언트 측 IP 추적은 제한적이므로, 간단한 GEO API 활용
        // (Vercel 환경에서는 헤더에서 가져올 수 있으나, 여기선 범용성을 위해 API 활용)
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();

        // 2. Firebase의 통합 컬렉션에 기록
        // 구조: global_analytics -> {appId} -> visits -> {doc}
        const analyticsRef = collection(db, "global_analytics", appId, "visits");

        await addDoc(analyticsRef, {
            country: geoData.country_name || "Unknown",
            countryCode: geoData.country || "??",
            city: geoData.city || "Unknown",
            timestamp: serverTimestamp(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
            path: typeof window !== 'undefined' ? window.location.pathname : '/'
        });

        console.log(`[Analytics] ${appId} 방문 기록 완료: ${geoData.country_name}`);
    } catch (error) {
        console.error("[Analytics] 데이터 수집 중 오류 발생:", error);
    }
};
