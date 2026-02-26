import json
import os

generated_file = r"d:\backup\research_automation\korea_travel_curator\generated_spots.json"
base_dir = r"d:\backup\research_automation\korea_travel_curator\src\data\spots"

with open(generated_file, "r", encoding="utf-8") as f:
    spots = json.load(f)

# Group spots by region
regions = {
    "seoul": [],
    "busan": [],
    "jeju": [],
    "others": []
}

for spot in spots:
    sid = spot['id']
    if sid.startswith("seoul"):
        regions["seoul"].append(spot)
    elif sid.startswith("busan"):
        regions["busan"].append(spot)
    elif sid.startswith("jeju"):
        regions["jeju"].append(spot)
    else:
        regions["others"].append(spot)

def write_region_file(region, spot_list):
    file_path = os.path.join(base_dir, f"{region}.ts")
    # Sort spots by ID to be deterministic
    spot_list.sort(key=lambda x: x['id'])
    
    content = [
        'import { TravelSpot } from "../../types/spot";',
        '',
        f'export const {region if region != "others" else "other"}Spots: TravelSpot[] = ['
    ]
    
    for spot in spot_list:
        content.append(f"    {json.dumps(spot, ensure_ascii=False)},")
    
    content.append("];")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(content))

for region, spot_list in regions.items():
    write_region_file(region, spot_list)

print("Repair complete. All regional files regenerated from JSON.")
