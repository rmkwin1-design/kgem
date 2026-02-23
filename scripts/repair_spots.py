import re
import os

file_path = r"d:\backup\research_automation\korea_travel_curator\src\data\spots.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Repair and Refinement Mapping
repairs = {
    "mungyeong-1": {"en": "Mungyeong Saejae Open Set", "ja": "聞慶セジェオープンセット場"},
    "paju-4": {"en": "Soseolwon Paju", "ja": "坡州ソソルウォン"},
    "jeonju-1": {"en": "Hanbyeokgul Tunnel Jeonju", "ja": "全州韓屋村二十五、二十一撮影地"},
    "gapyeong-1": {"en": "Petite France Gapyeong", "ja": "加平プチ・フランス"},
    "gapyeong-2": {"en": "The Garden of Morning Calm", "ja": "ア치무고요樹木園"},
    "busan-5": {"en": "Yeongdodaegyo Bridge Busan", "ja": "釜山影島大橋"},
    "uijeongbu-1": {"en": "Shinhan University Uijeongbu", "ja": "議政府カトリック大学"},
    "cheonan-1": {"en": "Dankook University Cheonan", "ja": "檀国大学 天安キャンパス"},
    "seoul-6": {"en": "Itaewon Danbam", "ja": "梨泰院タンバム"},
    "naju-1": {"en": "Naju Image Theme Park", "ja": "羅州映像テーマパーク"},
    "gangneung-2": {"en": "Yeongjin Beach Gangneung", "ja": "江陵ヨンジン海岸"}
}

for spot_id, queries in repairs.items():
    # More robust pattern to find the query line within the block of the given ID
    pattern = rf'(id: "{spot_id}",.*?query: {{ ko: ".*?", en: ")(.*?)", ja: ".*?" \}}'
    
    def replacement(match):
        return f'{match.group(1)}{queries["en"]}", ja: "{queries["ja"]}" }}'

    content = re.sub(rf'(id: "{spot_id}",.*?query: {{ ko: ".*?", en: ").*?", ja: ".*?" \}}', 
                    replacement, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Spots.ts repair and refinement complete.")
