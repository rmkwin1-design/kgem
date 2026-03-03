import { marketingKB } from "./marketing_kb";

export const signalGenerator = {
    /**
     * Generates a context-aware marketing script for a specific platform using spot data.
     */
    generateViralScript(platform: 'Reddit' | 'TikTok' | 'Instagram' | 'Xiaohongshu' | 'Shorts' | 'Aggressive', spot: any, language: string): string {
        const name = spot.title[language] || spot.title['en'];
        const desc = spot.description[language] || spot.description['en'];
        const category = spot.category;

        const prompts: any = {
            Reddit: `[Post Idea for r/KoreaTravel]\nTitle: "Found the 0.1% secret spot in Seoul: ${name}"\nContent: Just visited this place called ${name}. It's ${desc}. Totally different from the usual tourist traps in Myeongdong. Has anyone else been here? I used K-Gem to find it.`,
            TikTok: `[TikTok/Shorts Script]\n(Visual: Fast cuts of ${name})\nCaption: ⚠️ Stop going to the same places in Korea. \nVoiceover: "This is ${name}, a hidden gem for ${category}. No crowds, just pure vibes. Found it on K-Gem. You're welcome."\n#KoreaTravel #SeoulHiddenGems #KGem`,
            Instagram: `[Carousel/Reel Caption]\nTop tier ${category} spot alert 📍 ${name}\n\n${desc}\n\nVerified 0.1% secret spot by K-Gem AI. Link in bio to find more. ✨\n#SeoulGuide #KoreaTrip #HiddenGems`,
            Xiaohongshu: `[小红书笔记标题]\n首尔旅行不踩雷！只有 0.1% 的人才知道的 ${category} 宝藏店 ✨\n\n[正文]\n在首尔盲目跟风？不如试试当地人的隐藏列表！\n这家 ${name} 真的绝了，${desc}。\n不管是装修还是氛围都是玻璃拟态的高级感。📸\n\n💡 避雷小贴士：别再用谷歌地图在韩国兜圈子了，真的会谢。用 K-Gem 直接导航到店门口，还能避开“二人起点”의 尴尬！\n\n#韩国旅行 #首尔探店 #首尔避雷 #KGem #韩国生活 #首尔美食`,
            Shorts: `[YouTube Shorts Script]\nTitle: Why Google Maps is a FOOL in Korea 🤡\nHook: Have you noticed that Google Maps just... stops working in Seoul?\nBody: You try to find ${name}, but you end up in a back alley. \nSolution: Switch to K-Gem. It uses local precision data so you actually get to your ${category} spot. No more walking in circles.\nCall to Action: Link in bio. Stop being a lost tourist, start being a guest.`,
            Aggressive: `[Aggressive Conversion Ad]\nHeadline: STOP OVERPAYING IN KOREA 🛑\nBody: Did you know most "Viral Spots" are actually tourist traps? \n${name} is different. Verified 0.1% secret by our AI engine. \nDon't get rejected for solo dining. Don't carry cash. \nGet the 24h Secret Pass for $4.99 and save $100+ on your trip. \nLink below.`
        };

        return prompts[platform] || "Focus on the unique value of this spot for global travelers.";
    },

    /**
     * Legacy support for signal scripts.
     */
    generateScript(platform: 'Reddit' | 'TikTok' | 'Facebook', signal: string): string {
        const signalMatch = marketingKB.signals.find(s => s.platform === platform && signal.includes(s.trigger));
        return signalMatch?.script || "Experience Korea like a local with KGEM.";
    }
};
