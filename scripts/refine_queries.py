import re
import os

file_path = r"d:\backup\research_automation\korea_travel_curator\src\data\spots.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def refine_query(match):
    # This is a basic heuristic: if title exists, use it as a base for query if it's not already localized.
    # For this exercise, I will manually map some key spots to demonstrate high-quality localization.
    spot_text = match.group(0)
    
    # Extract titles and current queries
    title_ko = re.search(r"ko:\s*\"([^\"]+)\"", spot_text)
    title_en = re.search(r"en:\s*\"([^\"]+)\"", spot_text)
    title_ja = re.search(r"ja:\s*\"([^\"]+)\"", spot_text)
    
    query_ko = re.search(r"query:\s*{[^}]+ko:\s*\"([^\"]+)\"", spot_text)
    
    t_ko = title_ko.group(1) if title_ko else ""
    t_en = title_en.group(1) if title_en else ""
    t_ja = title_ja.group(1) if title_ja else ""
    
    # Heuristics for better search terms
    # English: Remove quotes and specific phrases
    q_en = t_en.split("'")[1] if "'" in t_en else t_en
    q_en = q_en.replace("Hidden ", "").replace("Secret ", "").replace("Private ", "").strip()
    if "(" in q_en: q_en = q_en.split("(")[0].strip()
    
    # Japanese: Keep proper nouns
    q_ja = t_ja.replace("隠れ家", "").replace("秘密", "").replace("プライベート", "").replace("「", "").replace("」", "").strip()
    if "(" in q_ja: q_ja = q_ja.split("(")[0].strip()

    # Apply some manual overrides for common spots
    if "경복궁" in t_ko:
        q_en = "Gyeongbokgung Palace"
        q_ja = "景福宮"
    elif "성수동" in t_ko:
        if "에디트" in t_ko:
            q_en = "Edit LP Bar Seongsu"
            q_ja = "聖水洞 エディット LPバー"
    elif "북촌" in t_ko:
        q_en = "Bukchon Hanok Village"
        q_ja = "北村韓屋村"
    elif "부산" in t_ko or "해운대" in t_ko:
        q_en = "Haeundae Beach Busan"
        q_ja = "海雲台 釜山"

    # Replace the query object
    new_query = f'query: {{ ko: "{query_ko.group(1)}", en: "{q_en}", ja: "{q_ja}" }}'
    return re.sub(r"query:\s*{[^}]+}", new_query, spot_text)

# Find each spot object and refine its query
new_content = re.sub(r"{\s*id:[\s\S]+?lng:[\s\S]+?}", refine_query, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully refined localized queries in spots.ts")
