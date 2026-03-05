import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const lang = searchParams.get('lang') || 'ko';

    if (!q) {
        return NextResponse.json({ error: 'Missing q' }, { status: 400 });
    }

    // 🚀 SPEED OPTIMIZATION: Generate only 1 language instead of 3 (60% fewer tokens = 2-3x faster)
    const langMap: Record<string, string> = { ko: '한국어', en: 'English', ja: '日本語' };
    const langName = langMap[lang] || '한국어';

    // Determine category hint from query
    const foodWords = ['맛집', '식당', '카페', 'food', '음식', '밥', '고기', '갈비', '치킨', '국밥', '냉면'];
    const isFoodQuery = foodWords.some(w => q.toLowerCase().includes(w));
    const categoryHint = isFoodQuery
        ? 'ONLY use category "food" or "dessert". NEVER use "travel".'
        : 'Use any appropriate category.';

    const prompt = `Generate 10 real Korean spots for "${q}" as NDJSON (1 JSON per line, no markdown).
Language: ${langName} only. ${categoryHint}
Schema: {"id":"live-<num>","title":{"${lang}":"..."},"category":"food|travel|dessert|activity","image":"https://picsum.photos/seed/<name>/800/600","rating":4.5,"description":{"${lang}":"..."},"region":{"${lang}":"..."},"lat":0,"lng":0,"price":0}`;

    try {
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Fast NDJSON generator. Output raw JSON lines only. No explanation.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0,
            max_tokens: 2500,
            stream: true,
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                let buf = "";
                try {
                    for await (const chunk of stream) {
                        const c = chunk.choices[0]?.delta?.content || "";
                        if (!c) continue;
                        buf += c;
                        let i;
                        while ((i = buf.indexOf("\n")) !== -1) {
                            const line = buf.slice(0, i).trim();
                            buf = buf.slice(i + 1);
                            if (line) controller.enqueue(encoder.encode(line + "\n"));
                        }
                    }
                    if (buf.trim()) controller.enqueue(encoder.encode(buf.trim() + "\n"));
                    controller.close();
                } catch (e) { controller.error(e); }
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
