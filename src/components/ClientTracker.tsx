"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/utils/analytics_collector";

export default function ClientTracker() {
    useEffect(() => {
        // 🌍 전역 통계 수집기 작동 (앱 아이디: korea_travel_curator)
        trackVisitor("korea_travel_curator");
    }, []);

    return null;
}
