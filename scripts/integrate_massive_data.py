import json
import os

generated_file = r"d:\backup\research_automation\korea_travel_curator\generated_spots.json"
target_file = r"d:\backup\research_automation\korea_travel_curator\src\data\spots.ts"

with open(generated_file, "r", encoding="utf-8") as f:
    generated_spots = json.load(f)

# Keep the original manually curated spots at the top
with open(target_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_content = []
found_end = False
for line in lines:
    if "];" in line and not found_end:
        # Prepend the generated spots before the closing array bracket
        for spot in generated_spots:
            new_content.append(f"    {json.dumps(spot, ensure_ascii=False)},")
        new_content.append("];\n")
        found_end = True
    else:
        if not found_end:
            new_content.append(line)

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(new_content)

print("Integration complete.")
