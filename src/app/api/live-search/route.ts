import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ error: 'Missing q' }, { status: 400 });

    // Category detection
    const foodKW = ['맛집', '식당', '카페', 'food', '음식', '밥', '고기', '갈비', '치킨', '국밥', '냉면', 'restaurant', 'ramen', 'sushi'];
    const isFood = foodKW.some(w => q.toLowerCase().includes(w));
    const catRule = isFood ? 'CRITICAL: You MUST ONLY output real restaurants, cafes, or eateries. NEVER output museums, parks, historical sites, or tourist attractions. Set category to "food" or "dessert".' : '';

    const prompt = `Output EXACTLY 10 real places for "${q}" as NDJSON. One JSON per line. No markdown.
${catRule}
Format: {"id":"live-N","title":{"ko":"...","en":"...","ja":"..."},"category":"food|travel|dessert|activity","image":"https://picsum.photos/seed/NAME/800/600","rating":4.5,"description":{"ko":"한줄","en":"one line","ja":"一行"},"region":{"ko":"...","en":"...","ja":"..."},"lat":0,"lng":0,"price":0}`;

    try {
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You output NDJSON only. No text. No code blocks. 10 lines exactly.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0,
            max_tokens: 4000,
            stream: true,
        });

        const enc = new TextEncoder();
        const readable = new ReadableStream({
            async start(ctrl) {
                let buf = '';
                try {
                    for await (const chunk of stream) {
                        const c = chunk.choices[0]?.delta?.content || '';
                        if (!c) continue;
                        buf += c;
                        let i;
                        while ((i = buf.indexOf('\n')) !== -1) {
                            const line = buf.slice(0, i).trim();
                            buf = buf.slice(i + 1);
                            if (line) ctrl.enqueue(enc.encode(line + '\n'));
                        }
                    }
                    if (buf.trim()) ctrl.enqueue(enc.encode(buf.trim() + '\n'));
                    ctrl.close();
                } catch (e) { ctrl.error(e); }
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'application/x-ndjson; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Accel-Buffering': 'no',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Stream failed', details: error.message }, { status: 500 });
    }
}
