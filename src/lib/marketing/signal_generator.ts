import { marketingKB } from "./marketing_kb";

export const signalGenerator = {
    /**
     * Generates a context-aware marketing script for a specific platform using spot data.
     */
    generateViralScript(platform: 'Reddit' | 'TikTok' | 'Instagram', spot: any, language: string): string {
        const name = spot.title[language] || spot.title['en'];
        const desc = spot.description[language] || spot.description['en'];
        const category = spot.category;

        const prompts: any = {
            Reddit: `[Post Idea for r/KoreaTravel]\nTitle: "Found the 0.1% secret spot in Seoul: ${name}"\nContent: Just visited this place called ${name}. It's ${desc}. Totally different from the usual tourist traps in Myeongdong. Has anyone else been here? I used K-Gem to find it.`,
            TikTok: `[TikTok/Shorts Script]\n(Visual: Fast cuts of ${name})\nCaption: ⚠️ Stop going to the same places in Korea. \nVoiceover: "This is ${name}, a hidden gem for ${category}. No crowds, just pure vibes. Found it on K-Gem. You're welcome."\n#KoreaTravel #SeoulHiddenGems #KGem`,
            Instagram: `[Carousel/Reel Caption]\nTop tier ${category} spot alert 📍 ${name}\n\n${desc}\n\nVerified 0.1% secret spot by K-Gem AI. Link in bio to find more. ✨\n#SeoulGuide #KoreaTrip #HiddenGems`
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
