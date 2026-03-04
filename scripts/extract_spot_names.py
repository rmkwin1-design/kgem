"""Extract spot id, title, category from all city files for image matching."""
import re

files = {
    'seoul': 'd:/backup/research_automation/korea_travel_curator/src/data/spots/seoul.ts',
    'busan': 'd:/backup/research_automation/korea_travel_curator/src/data/spots/busan.ts',
    'jeju':  'd:/backup/research_automation/korea_travel_curator/src/data/spots/jeju.ts',
}

for city, path in files.items():
    content = open(path, encoding='utf-8').read()
    # Extract id and title pairs
    # Pattern: "id": "VALUE" ... "title": "VALUE"
    spots = re.findall(r'"id":\s*"([^"]+)".*?"title":\s*"([^"]+)".*?"category":\s*"([^"]+)"', content)
    print(f'=== {city.upper()} ({len(spots)} spots) ===')
    for sid, title, cat in spots:
        print(f'  {sid} | {cat} | {title}')
    print()
