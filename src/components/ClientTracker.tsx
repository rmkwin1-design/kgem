"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/utils/analytics_collector";
import { growthEngine } from "@/utils/perpetualGrowth";

export default function ClientTracker() {
    useEffect(() => {
        // 🌍 전역 통계 수집기 작동 (앱 아이디: korea_travel_curator)
        trackVisitor("korea_travel_curator");

        // 🚀 자율 성장 엔진 가동 (24/7 무중단 사이클 체크)
        growthEngine.checkGrowthCycle();
    }, []);

    return null;
}
