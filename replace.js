const fs = require('fs');
['./src/data/spots/seoul.ts', './src/data/spots/busan.ts', './src/data/spots/jeju.ts'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/"category": "attraction"/g, '"category": "travel"');
    c = c.replace(/"category": "experience"/g, '"category": "activity"');
    c = c.replace(/"category": "cafe"/g, '"category": "dessert"');
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
});
