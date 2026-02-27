import { NextResponse } from 'next/server';
import { TravelSpot } from '@/types/spot';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Query parameter q is missing' }, { status: 400 });
    }

    const prompt = `You are a Korean travel expert. Generate 10 highly accurate and currently trending hot spots for the search query: "${q}".
The output MUST be a valid JSON object containing a single key "spots" which is an array of objects.
Each object in the array MUST strictly match this TypeScript interface representation:

interface LocalizedString { ko: string; en: string; ja: string; }
interface VipContent { secretMenu: LocalizedString; ownerTip: LocalizedString; }
interface GeoSchema { bluf: LocalizedString; }
interface TravelSpot {
    id: string; // Use a unique string starting with 'live-' + random numbers
    title: LocalizedString;
    category: string; // MUST be exactly one of: 'travel', 'food', 'dessert', 'activity', 'beauty', 'filming'
    image: string; // Use a realistic random placeholder: "https://picsum.photos/seed/" + random_string + "/800/600"
    rating: number; // Decimal between 4.0 and 5.0
    description: LocalizedString; // Engaging description
    region: LocalizedString; // The region requested, e.g. Incheon
    query: LocalizedString; // Exact pure venue name used for map searching (no extra words)
    isTrending: boolean; // true
    vipContent: VipContent;
    geoSchema: GeoSchema;
}

Output ONLY the JSON object { "spots": [ ...10 items... ] }. No markdown blocks, no other text.`;

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
                temperature: 0.7,
            }),
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("OpenAI API Error:", data.error);
            throw new Error(data.error?.message || 'OpenAI API Error');
        }

        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);

        // Typecast just to be safe it's treated as what we expect
        const spots: TravelSpot[] = parsed.spots;

        return NextResponse.json(spots);
    } catch (error: any) {
        console.error('Live Search Error:', error);
        return NextResponse.json({ error: 'Failed to generate live results' }, { status: 500 });
    }
}
