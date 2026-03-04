/**
 * verify_search.js
 * Verification script to test the search API for specific queries.
 */
const https = require('https');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('OPENAI_API_KEY is missing');
    process.exit(1);
}

async function testQuery(q) {
    console.log(`\n--- Testing query: "${q}" ---`);

    // Simulating the prompt and logic from route.ts (not calling the actual local API route as it requires a Next.js environment)
    const prompt = `You are a Korean travel expert specializing in deep-location intelligence. 
Generate EXACTLY 5 high-quality, real-world trending spots for the query: "${q}".
The user is looking for hidden gems, local favorites, or trending "hot places" specifically in THIS REGION.

Rules:
1. Return EXACTLY 5 items.
2. Mix categories: 'travel', 'food', 'dessert', 'activity', 'beauty', 'filming'.
3. Use realistic data based on actual places in the requested region (e.g., if ${q} is Incheon, return Incheon spots).
4. For names/descriptions, prioritize natural Korean expressions.

Each object must match this schema:
{
    "id": "live-" + UUID/Random,
    "title": { "ko": "한국어명", "en": "English Name", "ja": "日本語명" },
    "category": "one of the categories above",
    "image": "https://picsum.photos/seed/" + name_slug + "/800/600",
    "rating": 4.0 ~ 5.0,
    "description": { "ko": "설명", "en": "Description", "ja": "説明" },
    "region": { "ko": "지역(예: 인천 송도)", "en": "Region", "ja": "地域" },
    "query": { "ko": "검색용 상호명", "en": "Search Query", "ja": "検索クエリ" },
    "lat": number,
    "lng": number
}

Output ONLY valid JSON.
{ "spots": [...] }`;

    const data = JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: "json_object" },
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
    });

    return new Promise((resolve) => {
        const options = {
            hostname: 'api.openai.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const result = JSON.parse(body);
                    const content = JSON.parse(result.choices[0].message.content);
                    console.log(`Success! Received ${content.spots.length} spots.`);

                    // Basic validation
                    content.spots.forEach((spot, i) => {
                        console.log(`[${i + 1}] ${spot.title.ko} (${spot.region.ko}) - Category: ${spot.category}`);
                        if (!spot.title.ko || !spot.region.ko || !spot.lat || !spot.lng) {
                            console.warn(`   WARNING: Missing critical fields for "${spot.title.ko}"`);
                        }
                    });
                    resolve(true);
                } else {
                    console.error(`Failed with status ${res.statusCode}: ${body}`);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Error: ${e.message}`);
            resolve(false);
        });

        req.write(data);
        req.end();
    });
}

async function run() {
    const q1 = await testQuery('인천 맛집');
    const q2 = await testQuery('안산 맛집');
    if (q1 && q2) {
        console.log('\nAll tests passed successfully.');
    } else {
        console.error('\nSome tests failed.');
        process.exit(1);
    }
}

run();
