import re
import os

file_path = r"d:\backup\research_automation\korea_travel_curator\src\data\spots.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Dictionary of refined geocodable queries
refinements = {
    "seoul-6": {"en": "Itaewon Danbam", "ja": "梨泰院タンバム"},
    "seoul-7": {"en": "Noksapyeong Station Bridge", "ja": "緑莎坪駅歩道橋"},
    "suwon-1": {"en": "Kajigurumi Suwon", "ja": "水原カジグルミ"},
    "suwon-2": {"en": "Haenggung-dong Suwon", "ja": "水原行宮洞"},
    "pohang-1": {"en": "Guryongpo Japanese House Street", "ja": "九龍浦日本人家屋通り"},
    "paju-2": {"en": "Ilsan La Festa", "ja": "一山ラフェスタ"},
    "cheongju-1": {"en": "Cheongju Central Park", "ja": "清州中央公園"},
    "seoul-8": {"en": "Jahamun Tunnel", "ja": "紫霞門トンネル"},
    "seoul-9": {"en": "Baegun Market Seoul", "ja": "白雲市場双門洞"},
    "seoul-10": {"en": "Namsan Tonkatsu", "ja": "南山とんかつ"},
    "chungju-1": {"en": "Binae Island Chungju", "ja": "忠州ピネ島"},
    "busan-4": {"en": "Busan Open City Hall", "ja": "釜山開かれたイベント会場"},
    "incheon-3": {"en": "Baedari Hanmi Bookstore", "ja": "船橋ハンミ書店"},
    "yongin-1": {"en": "Seoil Farm Anseong", "ja": "安城ソイル農園"}
}

for spot_id, queries in refinements.items():
    # Find the spot block by ID
    pattern = rf'id: "{spot_id}",.*?query: {{ ko: "(.*?)", en: ".*?", ja: ".*?" }}'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        ko_query = match.group(1)
        new_query_line = f'query: {{ ko: "{ko_query}", en: "{queries["en"]}", ja: "{queries["ja"]}" }}'
        content = re.sub(rf'query: {{ ko: "{ko_query}", en: ".*?", ja: ".*?" }}', new_query_line, content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Batch refinement complete.")
