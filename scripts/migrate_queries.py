import re
import os

file_path = r'd:\backup\research_automation\korea_travel_curator\src\data\spots.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find query: "something"
# We want to replace it with query: { ko: "something", en: "something", ja: "something" }
# But we should be careful not to match query inside objects that are already localized if any.
# In TravelSpot, it was query: string.

new_content = re.sub(r'query:\s*"([^"]+)"', r'query: { ko: "\1", en: "\1", ja: "\1" }', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Migration completed.")
