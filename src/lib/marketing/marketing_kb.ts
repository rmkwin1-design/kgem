/**
 * KGEM Marketing Knowledge Base (2026 Strategy)
 * Contains persona-driven copy and community engagement scripts.
 */

export const marketingKB = {
    painPoints: {
        MAP_VOID: "Google Maps walking navigation is limited in Korea.",
        TMONEY_CASH: "T-money cards often require cash for top-ups.",
        BARRIER_82: "Korean phone numbers are required for many local services.",
        SOLO_DINING: "Some restaurants require 2-person minimum orders.",
        TRASH_HUNT: "Public trash cans are extremely rare in tourist areas."
    },

    copy: {
        en: {
            map: "Google Maps gave up on Korea. We didn't. Get real turn-by-turn walking directions designed for travelers.",
            solo: "Turned away at the door? KGEM's 'Solo-Friendly' filter finds BBQ spots that welcome you, not just your money."
        },
        ja: {
            nav: "Googleマップが使えない韓国、迷子になるのはもう終わり。KGEMなら、路地裏のカフェまで日本語で完璧ナビ。",
            res: "韓国の電話번호がなくても大丈夫。話題のカフェ予約も、タクシー手配も、KGEMのAIエージェントにお任せ。"
        },
        zh: {
            pay: "T-money 充值還要找現金？用 KGEM 一鍵解決交通與支付，韓國旅行從此不卡關。"
        }
    },

    signals: [
        {
            platform: "Reddit",
            trigger: "Which map app?",
            script: "Naver Maps has the best data but can be tricky in English. KGEM uses Naver's precision with a Google Maps UX, so you can find hidden gems without knowing Korean. (link)"
        },
        {
            platform: "TikTok",
            trigger: "No trash cans!",
            contentIdea: "Stitch with original video showing KGEM's 'Find Nearby Bin' feature. 30s solution."
        }
    ]
};
