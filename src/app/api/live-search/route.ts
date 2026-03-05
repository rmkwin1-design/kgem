import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 1. Edge Runtime 설정으로 콜드 스타트 최적화 및 타임아웃 우회
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Query parameter q is missing' }, { status: 400 });
    }

    // 2. 프롬프트 최적화: NDJSON 포맷으로 한 줄씩 출력하도록 지시 (지역/키워드 엄격성 강화 및 수량 증액)
    const prompt = `You are a Korean travel expert.
Generate EXACTLY 12 real-world trending spots for the query: "${q}".
Output ONLY as NDJSON (one JSON object per line). No markdown code blocks.

Rules:
1. One spot per line. 
2. Use natural Korean.
3. Be EXTREMELY fast. Priority: Speed.
4. STRICT LOCATION & KEYWORD: Only return spots that are DIRECTLY related to the city and keywords in "${q}". 
   - If "${q}" contains "맛집", "food", or "eat", you MUST use "category": "food" or "dessert". Do NOT return "travel" (attractions) for these queries.
   - Do NOT return locations from unrelated regions (e.g., no Incheon/Seoul spots for a Suwon search).
5. Schema per line:
{"id":"live-<ID>","title":{"ko":"...","en":"...","ja":"..."},"category":"travel|food|dessert|activity|beauty|filming","image":"https://picsum.photos/seed/<NAME>/800/600","rating":4.5,"description":{"ko":"...","en":"...","ja":"..."},"region":{"ko":"...","en":"...","ja":"..."},"query":{"ko":"...","en":"...","ja":"..."},"lat":37.5,"lng":127.0,"price":0}`;

    try {
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: 'You are a fast NDJSON generator for Korean travel.' }, { role: 'user', content: prompt }],
            temperature: 0.1,
            stream: true,
        });

        const encoder = new TextEncoder();

        // 3. ReadableStream으로 스트림 변환하여 즉시 반환 (서버 단 라인 버퍼링 적용)
        const readable = new ReadableStream({
            async start(controller) {
                let textBuffer = "";
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content || "";
                        if (content) {
                            textBuffer += content;

                            // 줄바꿈(\n)이 포함되어 있으면 한 줄씩 잘라서 보냄
                            let newlineIndex;
                            while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
                                const line = textBuffer.slice(0, newlineIndex).trim();
                                textBuffer = textBuffer.slice(newlineIndex + 1);
                                if (line) {
                                    controller.enqueue(encoder.encode(line + "\n"));
                                }
                            }
                        }
                    }
                    // 마지막 남은 버퍼 처리
                    if (textBuffer.trim()) {
                        controller.enqueue(encoder.encode(textBuffer.trim() + "\n"));
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'application/x-ndjson; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Accel-Buffering': 'no',
                'X-Content-Type-Options': 'nosniff',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error('[LiveSearch] Streaming Error:', error);
        return NextResponse.json({ error: 'Failed to stream results', details: error.message }, { status: 500 });
    }
}
