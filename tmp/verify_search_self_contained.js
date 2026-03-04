/**
 * verify_search_self_contained.js
 * Verification script without external dependencies like 'dotenv'.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to get OPENAI_API_KEY
let apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/OPENAI_API_KEY=([^\r\n]+)/);
        if (match) {
            apiKey = match[1].trim().replace(/^['"]|['"]$/g, '');
        }
    }
}

if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY could not be found in process.env or .env.local');
    process.exit(1);
}

async function testQuery(q) {
    console.log(`\n--- Testing query: "${q}" ---`);

    const prompt = `You are a Korean travel expert. Generate 3 spots for "${q}". Output valid JSON: { "spots": [...] } with id, title(ko, en), category, description(ko, en), region(ko, en), lat, lng.`;

    const data = JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: "json_object" },
        messages: [{ role: 'user', content: prompt }],
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
                    try {
                        const result = JSON.parse(body);
                        const content = JSON.parse(result.choices[0].message.content);
                        console.log(`Success! Received ${content.spots.length} spots.`);
                        content.spots.forEach((s, i) => console.log(`[${i + 1}] ${s.title.ko || s.title} (${s.region.ko || s.region})`));
                        resolve(true);
                    } catch (e) {
                        console.error('Failed to parse response content:', e.message);
                        resolve(false);
                    }
                } else {
                    console.error(`Failed with status ${res.statusCode}: ${body}`);
                    resolve(false);
                }
            });
        });
        req.on('error', (e) => resolve(false));
        req.write(data);
        req.end();
    });
}

(async () => {
    const r1 = await testQuery('인천 맛집');
    const r2 = await testQuery('안산 맛집');
    if (r1 && r2) console.log('\nVerification complete.');
    else process.exit(1);
})();
