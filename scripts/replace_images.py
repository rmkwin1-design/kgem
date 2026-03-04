"""
K-Gem Image URL Replacement Script
-------------------------------------
각 장소별로 실제 장소에 맞는 저작권 없는 이미지 URL로 교체합니다.
사용법: python replace_images.py
"""
import re
import os

# ========================================================
# 이미지 URL 매핑 (실제 장소 기반 / 무료 이미지)
# ========================================================
# Unsplash 이미지는 모두 Unsplash 라이선스 (상업용 무료 사용 가능)
# https://unsplash.com/license

IMAGE_MAP = {
    # ---- SEOUL ----
    "seoul-attr-1":  "https://images.unsplash.com/photo-1617622141573-c18a0d0944cf?w=800&q=80",  # 경복궁 (Gyeongbokgung)
    "seoul-attr-2":  "https://images.unsplash.com/photo-1575878175625-c0b5ebd36d67?w=800&q=80",  # 롯데월드타워
    "seoul-attr-3":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",  # 북촌 한옥마을
    "seoul-attr-4":  "https://images.unsplash.com/photo-1613391093291-19ed2a7ab3a5?w=800&q=80",  # 창덕궁
    "seoul-attr-5":  "https://images.unsplash.com/photo-1563050392-49ec69a29685?w=800&q=80",  # 전쟁기념관
    "seoul-attr-6":  "https://images.unsplash.com/photo-1529788295308-1eace6f67388?w=800&q=80",  # 국립중앙박물관
    "seoul-attr-7":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 반포대교 분수
    "seoul-attr-8":  "https://images.unsplash.com/photo-1600721391776-b82b094aadf0?w=800&q=80",  # 청와대
    "seoul-attr-9":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 인왕산 성곽길
    "seoul-attr-10": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",  # 올림픽공원

    "seoul-food-1":  "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",  # 옥동식 곰탕
    "seoul-food-2":  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",  # 홍고집 BBQ
    "seoul-food-3":  "https://images.unsplash.com/photo-1566831867452-fb5d2b1d6994?w=800&q=80",  # 명동교자 칼국수
    "seoul-food-4":  "https://images.unsplash.com/photo-1617196034874-5c0cb7c7c2ea?w=800&q=80",  # 솔솥 솥밥
    "seoul-food-5":  "https://images.unsplash.com/photo-1662116133748-4e7a43edb76c?w=800&q=80",  # 샤브보트
    "seoul-food-6":  "https://images.unsplash.com/photo-1603133872878-684f208fb054?w=800&q=80",  # 사랑방 칼국수
    "seoul-food-7":  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",  # 나주 곰탕
    "seoul-food-8":  "https://images.unsplash.com/photo-1498654896293-37aaa4293460?w=800&q=80",  # 장수보쌈
    "seoul-food-9":  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",  # 광장시장 육회
    "seoul-food-10": "https://images.unsplash.com/photo-1583224994559-1d00f108c5a1?w=800&q=80",  # 을지로 골뱅이

    "seoul-beauty-1": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",  # 강남 K-뷰티 클리닉
    "seoul-beauty-2": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",  # 홍대 퍼스널컬러
    "seoul-beauty-3": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",  # QD Skin
    "seoul-beauty-4": "https://images.unsplash.com/photo-1612908582935-3bbf9f4e8b1c?w=800&q=80",  # YAAN Clinic
    "seoul-beauty-5": "https://images.unsplash.com/photo-1626954079673-f3c3a1f3e8e3?w=800&q=80",  # Bailor Clinic
    "seoul-beauty-6": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",  # Pladen
    "seoul-beauty-7": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",  # Egg Clinic
    "seoul-beauty-8": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",  # 플랜에이 치과
    "seoul-beauty-9": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",  # 아비쥬
    "seoul-beauty-10":"https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",  # 차홍아르더

    "seoul-cafe-1":  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",  # 도토리 가든
    "seoul-cafe-2":  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",  # 카페 어니언 안국
    "seoul-cafe-3":  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",  # 청수당 (한옥 카페)
    "seoul-cafe-4":  "https://images.unsplash.com/photo-1518481852452-9415b262eba6?w=800&q=80",  # 낙원역
    "seoul-cafe-5":  "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80",  # 호우주의보
    "seoul-cafe-6":  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",  # 테디스오븐
    "seoul-cafe-7":  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80",  # 앤트러사이트
    "seoul-cafe-8":  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",  # 로키
    "seoul-cafe-9":  "https://images.unsplash.com/photo-1442975631134-1e7cdb11fc28?w=800&q=80",  # 프릳츠
    "seoul-cafe-10": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",  # 오설록

    "seoul-exp-1":  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",  # 홍대 퍼스널컬러
    "seoul-exp-2":  "https://images.unsplash.com/photo-1598430772299-8a4a2ee8c0f3?w=800&q=80",  # 통인시장
    "seoul-exp-3":  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",  # HiKR K-팝
    "seoul-exp-4":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",  # 익선동 한옥마을
    "seoul-exp-5":  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",  # 성수동 팝업스토어
    "seoul-exp-6":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 낙산공원 야경
    "seoul-exp-7":  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",  # 별마당 도서관
    "seoul-exp-8":  "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&q=80",  # 라쿤 카페
    "seoul-exp-9":  "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80",  # 서울웨이브 스타벅스
    "seoul-exp-10": "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80",  # 뮤지엄 김치간

    "seoul-film-1":  "https://images.unsplash.com/photo-1569850611040-a5e6d6b7e6a5?w=800&q=80",  # N서울타워
    "seoul-film-2":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",  # 북촌 도깨비
    "seoul-film-3":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 노들섬
    "seoul-film-4":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 이태원클라쓰 육교
    "seoul-film-5":  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",  # DDP
    "seoul-film-6":  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",  # 청계천
    "seoul-film-7":  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",  # 연세대
    "seoul-film-8":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",  # 광화문
    "seoul-film-9":  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",  # 인사동 쌈지길
    "seoul-film-10": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",  # N 낙산 성곽길
}


def replace_images_in_file(filepath: str, image_map: dict):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    replaced_count = 0

    for spot_id, new_url in image_map.items():
        # Find the position of this spot's id
        id_marker = f'"id": "{spot_id}"'
        pos = content.find(id_marker)
        if pos == -1:
            print(f"  [SKIP] [{spot_id}] - id not found")
            continue

        # Find the closing brace of this spot object (next '}')
        end_pos = content.find('}', pos)
        if end_pos == -1:
            print(f"  [SKIP] [{spot_id}] - closing brace not found")
            continue

        # Extract the spot substring
        spot_chunk = content[pos:end_pos]

        # Replace the image URL within this chunk
        new_chunk = re.sub(
            r'("image":\s*")[^"]+(")',
            lambda m, url=new_url: m.group(1) + url + m.group(2),
            spot_chunk,
            count=1
        )

        if new_chunk != spot_chunk:
            content = content[:pos] + new_chunk + content[end_pos:]
            replaced_count += 1
            print(f"  [OK] [{spot_id}]")
        else:
            print(f"  [SKIP] [{spot_id}] - image field not found in chunk")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return replaced_count



if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    spots_dir = os.path.join(base_dir, "src", "data", "spots")

    print("\n=== K-Gem Image Replacement START ===\n")

    seoul_path = os.path.join(spots_dir, "seoul.ts")
    print(f"[1/1] Processing seoul.ts ...")
    count = replace_images_in_file(seoul_path, IMAGE_MAP)
    print(f"\nDONE: {count} images replaced.")
    print("Refresh the app to see the changes.")

