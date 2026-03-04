const https = require('https');

function normalizeSpots(rawSpots) {
    const validCategories = ['travel', 'food', 'dessert', 'activity', 'beauty', 'filming'];
    return rawSpots.map((spot) => {
        const title = spot.title || spot.name || 'Unknown';
        const localizedTitle = typeof title === 'object' ? title : { ko: title, en: title, ja: title };

        const description = spot.description || spot.desc || '';
        const localizedDesc = typeof description === 'object' ? description : { ko: description, en: description, ja: description };

        const query = spot.query || spot.title || spot.name || '';
        const localizedQuery = typeof query === 'object' ? query : { ko: query, en: query, ja: query };

        const region = spot.region || '';
        const localizedRegion = typeof region === 'object' ? region : { ko: region, en: region, ja: region };

        return {
            ...spot,
            category: validCategories.includes(spot.category) ? spot.category : 'travel',
            id: spot.id || `live-${Math.random().toString(36).substr(2, 9)}`,
            rating: typeof spot.rating === 'string' ? parseFloat(spot.rating) : (spot.rating || 4.5),
            title: localizedTitle,
            description: localizedDesc,
            query: localizedQuery,
            region: localizedRegion,
            lat: typeof spot.lat === 'string' ? parseFloat(spot.lat) : spot.lat,
            lng: typeof spot.lng === 'string' ? parseFloat(spot.lng) : spot.lng,
            price: typeof spot.price === 'string' ? parseInt(spot.price, 10) : (spot.price || 0)
        };
    });
}

// Test case 1: Flat strings instead of objects
const testData1 = [
    { name: 'Test Spot', desc: 'Flat description', rating: '4.2', price: '1000' }
];

console.log('Testing Resilient Normalization (Test Case 1):');
const normalized1 = normalizeSpots(testData1);
console.log(JSON.stringify(normalized1, null, 2));

// Test case 2: Actual API Call (Sanity Check)
const apiKey = process.env.OPENAI_API_KEY;
const q = '인천 맛집';
const prompt = `You are a Korean travel expert. Generate 3 spots for "${q}". Return JSON { "spots": [...] }`;

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
        'Authorization': 'Bearer ' + apiKey
    }
};

console.log(`\nTesting Actual API Call for "${q}":`);
const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            const content = JSON.parse(parsed.choices[0].message.content);
            const normalized = normalizeSpots(content.spots || []);
            console.log('API Status:', res.statusCode);
            console.log('First spot (normalized):', JSON.stringify(normalized[0], null, 2));
            console.log('Success!');
        } catch (e) {
            console.error('Error:', e);
        }
    });
});

req.on('error', (error) => console.error(error));
req.write(data);
req.end();
