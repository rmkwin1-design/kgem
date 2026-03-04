import re
from collections import Counter
content = open('d:/backup/research_automation/korea_travel_curator/src/data/spots/seoul.ts', encoding='utf-8').read()
urls = re.findall(r'"image":\s*"(https://[^"]+)"', content)
c = Counter(urls)
print('Total image fields:', len(urls))
print('Unique images:', len(c))
print()
print('Top 5 most common:')
for url, cnt in c.most_common(5):
    print('  x' + str(cnt) + ': ...' + url[-55:])
