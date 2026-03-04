import { NextResponse } from 'next/server';
import { TravelSpot } from '@/types/spot';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Query parameter q is missing' }, { status: 400 });
    }

    const prompt = `You are a Korean travel expert specializing in deep-location intelligence. 
Generate EXACTLY 20 high-quality, real-world trending spots for the query: "${q}".
The user is likely looking for hidden gems, local favorites, or trending "hot places".

Rules:
1. Return EXACTLY 20 items. No more, no less.
2. Mix categories: 'travel', 'food', 'dessert', 'activity', 'beauty', 'filming'.
3. Use realistic data based on actual places in that region.
4. If coordinates are unknown, provide highly plausible coordinates for that specific district.

Each object must match this schema:
{
    "id": "live-" + UUID/Random,
    "title": { "ko": "한국어명", "en": "English Name", "ja": "日本語名" },
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
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
            console.error("[LiveSearch] OpenAI API Error:", data.error);
            throw new Error(data.error?.message || 'OpenAI API Error');
        }

        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        const spots: TravelSpot[] = parsed.spots;

        console.log(`[LiveSearch] Successfully generated ${spots.length} spots for "${q}"`);

        return NextResponse.json(spots);
    } catch (error: any) {
        console.error('[LiveSearch] Critical Error:', error);
        return NextResponse.json({ error: 'Failed to generate live results' }, { status: 500 });
    }
}
