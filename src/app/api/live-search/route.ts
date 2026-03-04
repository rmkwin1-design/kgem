import { NextResponse } from 'next/server';
import { TravelSpot } from '@/types/spot';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const apiKey = process.env.OPENAI_API_KEY;

    console.log(`[Diagnostic] API received query: "${q}"`);
    console.log(`[Diagnostic] API Key status: ${apiKey ? (apiKey.startsWith('sk-') ? 'Valid format' : 'Invalid format') : 'Missing'}`);

    if (!q) {
        return NextResponse.json({ error: 'Query parameter q is missing' }, { status: 400 });
    }

    if (!apiKey || apiKey.includes('your_openai_api_key_here')) {
        console.error('[LiveSearch] API Key Missing or Invalid');
        return NextResponse.json({
            error: 'Search service is currently unavailable',
            details: 'API Key missing or invalid on server',
            keyPresent: !!apiKey,
            keyStart: apiKey ? apiKey.substring(0, 5) : 'none'
        }, { status: 500 });
    }

    const prompt = `You are a Korean travel expert specializing in deep-location intelligence. 
Generate EXACTLY 20 high-quality, real-world trending spots for the query: "${q}".
The user is looking for hidden gems, local favorites, or trending "hot places" specifically in THIS REGION.

Rules:
1. Return EXACTLY 20 items. No more, no less.
2. Mix categories: 'travel', 'food', 'dessert', 'activity', 'beauty', 'filming'.
3. Use realistic data based on actual places in the requested region (e.g., if ${q} is Incheon, return Incheon spots).
4. For names/descriptions, prioritize natural Korean expressions.
5. If coordinates are unknown, provide highly plausible coordinates for that specific district.

Each object must match this schema:
{
    "id": "live-" + UUID/Random,
    "title": { "ko": "한국어명", "en": "English Name", "ja": "日本語명" },
    "category": "one of the categories above",
    "image": "Wikimedia Commons URL or 'https://picsum.photos/seed/' + name_slug + '/800/600'",
    "rating": 4.0 ~ 5.0,
    "description": { "ko": "설명", "en": "Description", "ja": "説明" },
    "region": { "ko": "지역(예: 인천 송도)", "en": "Region", "ja": "地域" },
    "query": { "ko": "검색용 상호명", "en": "Search Query", "ja": "検索クエリ" },
    "isTrending": true,
    "vipContent": { "secretMenu": { "ko": "...", "en": "...", "ja": "..." }, "ownerTip": { "ko": "...", "en": "...", "ja": "..." } },
    "geoSchema": { "bluf": { "ko": "...", "en": "...", "ja": "..." } },
    "lat": number,
    "lng": number,
    "price": number (0 if free)
}

Output ONLY valid JSON.
{ "spots": [...] }`;

    console.log(`[LiveSearch] Initiating AI search for query: "${q}"`);

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                response_format: { type: "json_object" },
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
            }),
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("[LiveSearch] OpenAI API Error:", JSON.stringify(data.error));
            return NextResponse.json({ error: 'AI Search failed', message: data.error?.message }, { status: res.status });
        }

        const content = data.choices[0].message.content;
        console.log(`[LiveSearch] Raw AI response received for "${q}"`);

        const parsed = JSON.parse(content);
        const rawSpots = parsed.spots || [];

        // Define valid categories for normalization
        const validCategories = ['travel', 'food', 'dessert', 'activity', 'beauty', 'filming'];

        const spots: TravelSpot[] = rawSpots.map((spot: any) => {
            // Smart mapping for common LLM deviations
            const titleRef = spot.title || spot.name || spot.ko_name || 'Unknown';
            const localizedTitle = typeof titleRef === 'object' ? {
                ko: titleRef.ko || titleRef.name || 'Unknown',
                en: titleRef.en || titleRef.name || 'Unknown',
                ja: titleRef.ja || titleRef.name || 'Unknown'
            } : { ko: titleRef, en: titleRef, ja: titleRef };

            const descRef = spot.description || spot.desc || '';
            const localizedDesc = typeof descRef === 'object' ? {
                ko: descRef.ko || '',
                en: descRef.en || '',
                ja: descRef.ja || ''
            } : { ko: descRef, en: descRef, ja: descRef };

            const queryRef = spot.query || spot.title || spot.name || '';
            const localizedQuery = typeof queryRef === 'object' ? {
                ko: queryRef.ko || '',
                en: queryRef.en || '',
                ja: queryRef.ja || ''
            } : { ko: queryRef, en: queryRef, ja: queryRef };

            const regionRef = spot.region || spot.location || '';
            const localizedRegion = typeof regionRef === 'object' ? {
                ko: regionRef.ko || '',
                en: regionRef.en || '',
                ja: regionRef.ja || ''
            } : { ko: regionRef, en: regionRef, ja: regionRef };

            return {
                ...spot,
                category: validCategories.includes(spot.category) ? spot.category : 'travel',
                id: spot.id || `live-${Math.random().toString(36).substr(2, 9)}`,
                rating: typeof spot.rating === 'string' ? parseFloat(spot.rating) : (spot.rating || 4.5),
                title: localizedTitle,
                description: localizedDesc,
                query: localizedQuery,
                region: localizedRegion,
                // Ensure coordinates are numbers
                lat: typeof spot.lat === 'string' ? parseFloat(spot.lat) : spot.lat,
                lng: typeof spot.lng === 'string' ? parseFloat(spot.lng) : spot.lng,
                price: typeof spot.price === 'string' ? parseInt(spot.price, 10) : (spot.price || 0)
            };
        });

        console.log(`[LiveSearch] Successfully processed ${spots.length} spots for "${q}"`);

        return NextResponse.json(spots);
    } catch (error: any) {
        console.error('[LiveSearch] Critical Error:', error);
        return NextResponse.json({
            error: 'Failed to generate live results',
            details: error.message
        }, { status: 500 });
    }
}

