const https = require('https');

const q = '인천 맛집';
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

const data = JSON.stringify({
    model: 'gpt-4o-mini',
    response_format: { type: "json_object" },
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
});

const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            const content = JSON.parse(parsed.choices[0].message.content);
            console.log('Categories found:', [...new Set(content.spots.map(s => s.category))]);
            console.log('Sample spot:', JSON.stringify(content.spots[0], null, 2));
        } catch (e) {
            console.error(e);
        }
    });
});

req.on('error', (error) => console.error(error));
req.write(data);
req.end();
