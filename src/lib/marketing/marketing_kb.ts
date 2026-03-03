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
        TRASH_HUNT: "Public trash cans are extremely rare in tourist areas.",
        TOURIST_TRAP: "Myeongdong/Hongdae tourist traps charge 2x prices.",
        MAP_CLOWN: "Google Maps leading tourists into military zones or wrong side of buildings."
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
            pay: "T-money 充值還要找現金？用 KGEM 一鍵解決交通與支付，韓國旅行從此不卡關。",
            red: "还在被小红书上的‘韩国旅行避雷’刷屏？KGEM 独家‘极简暗黑+玻璃拟态’UI，带你直达 0.1% 的当地人宝藏店。别再跟着谷歌地图在首尔迷路了！"
        }
    },
    usp: {
        MAP_VOID: {
            title: "Google Maps is a Void",
            desc: "Stop getting lost. We use Naver's precision with an intuitive Global UX."
        },
        SOLO_DINING: {
            title: "Solo-Dining Hero",
            desc: "BBQ for one? We filter spots that welcome solo travelers without the '2-person minimum' stress."
        },
        NO_CASH: {
            title: "Cashless in Korea",
            desc: "Forget T-money cash top-ups. Pay, Nav, and Book everything in one app."
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
