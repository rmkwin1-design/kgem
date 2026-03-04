"""
K-Gem replace_images_v2.py
- seoul.ts 파일의 각 스팟 image URL을 실제 장소에 맞는 무료 이미지로 교체합니다.
- 한 줄짜리 TypeScript 파일 구조에 맞게 설계됨
"""
import re
import os
import sys

IMAGE_MAP = {
    # ---- ATTRACTIONS ----
    "seoul-attr-1":  "https://images.unsplash.com/photo-1617622141573-c18a0d0944cf?w=800&q=80",
    "seoul-attr-2":  "https://images.unsplash.com/photo-1575878175625-c0b5ebd36d67?w=800&q=80",
    "seoul-attr-3":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",
    "seoul-attr-4":  "https://images.unsplash.com/photo-1613391093291-19ed2a7ab3a5?w=800&q=80",
    "seoul-attr-5":  "https://images.unsplash.com/photo-1563050392-49ec69a29685?w=800&q=80",
    "seoul-attr-6":  "https://images.unsplash.com/photo-1529788295308-1eace6f67388?w=800&q=80",
    "seoul-attr-7":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    "seoul-attr-8":  "https://images.unsplash.com/photo-1600721391776-b82b094aadf0?w=800&q=80",
    "seoul-attr-9":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",
    "seoul-attr-10": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    # ---- FOOD ----
    "seoul-food-1":  "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    "seoul-food-2":  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    "seoul-food-3":  "https://images.unsplash.com/photo-1566831867452-fb5d2b1d6994?w=800&q=80",
    "seoul-food-4":  "https://images.unsplash.com/photo-1617196034874-5c0cb7c7c2ea?w=800&q=80",
    "seoul-food-5":  "https://images.unsplash.com/photo-1662116133748-4e7a43edb76c?w=800&q=80",
    "seoul-food-6":  "https://images.unsplash.com/photo-1603133872878-684f208fb054?w=800&q=80",
    "seoul-food-7":  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    "seoul-food-8":  "https://images.unsplash.com/photo-1498654896293-37aaa4293460?w=800&q=80",
    "seoul-food-9":  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    "seoul-food-10": "https://images.unsplash.com/photo-1583224994559-1d00f108c5a1?w=800&q=80",
    # ---- BEAUTY ----
    "seoul-beauty-1": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    "seoul-beauty-2": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    "seoul-beauty-3": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    "seoul-beauty-4": "https://images.unsplash.com/photo-1612908582935-3bbf9f4e8b1c?w=800&q=80",
    "seoul-beauty-5": "https://images.unsplash.com/photo-1626954079673-f3c3a1f3e8e3?w=800&q=80",
    "seoul-beauty-6": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    "seoul-beauty-7": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
    "seoul-beauty-8": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    "seoul-beauty-9": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    "seoul-beauty-10":"https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    # ---- CAFE ----
    "seoul-cafe-1":  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    "seoul-cafe-2":  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    "seoul-cafe-3":  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",
    "seoul-cafe-4":  "https://images.unsplash.com/photo-1518481852452-9415b262eba6?w=800&q=80",
    "seoul-cafe-5":  "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80",
    "seoul-cafe-6":  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    "seoul-cafe-7":  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80",
    "seoul-cafe-8":  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    "seoul-cafe-9":  "https://images.unsplash.com/photo-1442975631134-1e7cdb11fc28?w=800&q=80",
    "seoul-cafe-10": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    # ---- EXPERIENCE ----
    "seoul-exp-1":  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    "seoul-exp-2":  "https://images.unsplash.com/photo-1598430772299-8a4a2ee8c0f3?w=800&q=80",
    "seoul-exp-3":  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    "seoul-exp-4":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",
    "seoul-exp-5":  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    "seoul-exp-6":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",
    "seoul-exp-7":  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    "seoul-exp-8":  "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&q=80",
    "seoul-exp-9":  "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80",
    "seoul-exp-10": "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80",
    # ---- FILMING ----
    "seoul-film-1":  "https://images.unsplash.com/photo-1569850611040-a5e6d6b7e6a5?w=800&q=80",
    "seoul-film-2":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",
    "seoul-film-3":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    "seoul-film-4":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",
    "seoul-film-5":  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    "seoul-film-6":  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",
    "seoul-film-7":  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "seoul-film-8":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    "seoul-film-9":  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "seoul-film-10": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
}

def run(filepath, image_map):
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    count = 0
    for spot_id, new_url in image_map.items():
        id_str = '"id": "' + spot_id + '"'
        pos = content.find(id_str)
        if pos == -1:
            print('[SKIP] ' + spot_id + ' - id not found')
            continue

        # Find "image": "..." starting from pos, within the next 2000 chars
        search_area = content[pos : pos + 2000]
        # Match image field
        m = re.search(r'"image":\s*"[^"]+"', search_area)
        if not m:
            print('[SKIP] ' + spot_id + ' - image field not in range')
            continue

        old_img_str = m.group(0)
        new_img_str = '"image": "' + new_url + '"'

        # Replace only this one occurrence
        abs_start = pos + m.start()
        abs_end = pos + m.end()
        content = content[:abs_start] + new_img_str + content[abs_end:]
        count += 1
        print('[OK] ' + spot_id)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print('\nTotal replaced: ' + str(count))
    return count

if __name__ == '__main__':
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(base, 'src', 'data', 'spots', 'seoul.ts')
    print('Processing: ' + path)
    run(path, IMAGE_MAP)
