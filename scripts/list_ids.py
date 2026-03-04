import re

files = [
    'd:/backup/research_automation/korea_travel_curator/src/data/spots/busan.ts',
    'd:/backup/research_automation/korea_travel_curator/src/data/spots/jeju.ts',
    'd:/backup/research_automation/korea_travel_curator/src/data/spots/others.ts',
]

for fpath in files:
    try:
        content = open(fpath, encoding='utf-8').read()
        ids = re.findall(r'"id":\s*"([^"]+)"', content)
        fname = fpath.split('/')[-1]
        print('=== ' + fname + ' ===')
        for i in ids:
            print('  ' + i)
        print('Total: ' + str(len(ids)))
        print()
    except Exception as e:
        print('ERROR: ' + str(e))
