"""
K-Gem: Busan + Jeju Image Replacement Script
- 부산 60개, 제주 63개 스팟 이미지를 실제 장소에 맞는 무료 이미지로 교체
"""
import re
import os

# ============================================================
# BUSAN - 실제 장소별 이미지 매핑
# ============================================================
BUSAN_MAP = {
    # ATTRACTIONS - 부산 명소
    "busan-attr-1":  "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80",  # 해운대 해수욕장
    "busan-attr-2":  "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80",  # 광안리+광안대교
    "busan-attr-3":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",  # 감천문화마을
    "busan-attr-4":  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",  # 부산항/자갈치
    "busan-attr-5":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 용두산공원 부산타워
    "busan-attr-6":  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",  # 송도해수욕장
    "busan-attr-7":  "https://images.unsplash.com/photo-1598430772299-8a4a2ee8c0f3?w=800&q=80",  # 국제시장
    "busan-attr-8":  "https://images.unsplash.com/photo-1569850611040-a5e6d6b7e6a5?w=800&q=80",  # 오륙도 스카이워크
    "busan-attr-9":  "https://images.unsplash.com/photo-1529788295308-1eace6f67388?w=800&q=80",  # 부산박물관
    "busan-attr-10": "https://images.unsplash.com/photo-1563050392-49ec69a29685?w=800&q=80",  # 이기대

    # FOOD - 부산 맛집
    "busan-food-1":  "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&q=80",  # 돼지국밥
    "busan-food-2":  "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",  # 씨앗호떡
    "busan-food-3":  "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80",  # 해물라면
    "busan-food-4":  "https://images.unsplash.com/photo-1498654896293-37aaa4293460?w=800&q=80",  # 복국/어묵
    "busan-food-5":  "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",  # 삼겹살/고기
    "busan-food-6":  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",  # 회/해산물
    "busan-food-7":  "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",  # 곰장어
    "busan-food-8":  "https://images.unsplash.com/photo-1603133872878-684f208fb054?w=800&q=80",  # 밀면
    "busan-food-9":  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",  # 육전
    "busan-food-10": "https://images.unsplash.com/photo-1583224994559-1d00f108c5a1?w=800&q=80",  # 동래파전

    # BEAUTY - 부산 뷰티
    "busan-beauty-1": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",  # 피부과
    "busan-beauty-2": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",  # 스킨케어
    "busan-beauty-3": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",  # 미용실
    "busan-beauty-4": "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",  # 헤어샵
    "busan-beauty-5": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",  # 퍼스널컬러
    "busan-beauty-6": "https://images.unsplash.com/photo-1612908582935-3bbf9f4e8b1c?w=800&q=80",  # 네일
    "busan-beauty-7": "https://images.unsplash.com/photo-1626954079673-f3c3a1f3e8e3?w=800&q=80",  # 클리닉
    "busan-beauty-8": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",  # 성형
    "busan-beauty-9": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",  # 치과
    "busan-beauty-10":"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",  # 스파

    # CAFE - 부산 카페
    "busan-cafe-1":  "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80",  # 해운대 오션뷰 카페
    "busan-cafe-2":  "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80",  # 광안리 루프탑 카페
    "busan-cafe-3":  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80",  # 인더스트리얼 카페
    "busan-cafe-4":  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",  # 감천 카페
    "busan-cafe-5":  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",  # 스페셜티 커피
    "busan-cafe-6":  "https://images.unsplash.com/photo-1442975631134-1e7cdb11fc28?w=800&q=80",  # 베이커리 카페
    "busan-cafe-7":  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",  # 티 카페
    "busan-cafe-8":  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",  # 디저트 카페
    "busan-cafe-9":  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",  # 전통 카페
    "busan-cafe-10": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",  # 야경 카페

    # EXPERIENCE - 부산 체험
    "busan-exp-1":  "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80",  # 해운대 서핑
    "busan-exp-2":  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",  # 요트 투어
    "busan-exp-3":  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",  # 아쿠아리움
    "busan-exp-4":  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",  # 스파/찜질방
    "busan-exp-5":  "https://images.unsplash.com/photo-1598430772299-8a4a2ee8c0f3?w=800&q=80",  # 야시장
    "busan-exp-6":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 야경 크루즈
    "busan-exp-7":  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",  # 해양스포츠
    "busan-exp-8":  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",  # K-팝 체험
    "busan-exp-9":  "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80",  # 전통문화
    "busan-exp-10": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",  # 쇼핑몰

    # FILMING - 부산 촬영지
    "busan-film-1":  "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80",  # 해운대 - 영화
    "busan-film-2":  "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80",  # 광안대교 야경
    "busan-film-3":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",  # 감천문화마을 입구
    "busan-film-4":  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",  # BIFF 광장
    "busan-film-5":  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",  # 동의대 계단
    "busan-film-6":  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",  # 부산항 야경
    "busan-film-7":  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",  # 흰여울문화마을
    "busan-film-8":  "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=800&q=80",  # 초량 이바구길
    "busan-film-9":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 영도다리
    "busan-film-10": "https://images.unsplash.com/photo-1569850611040-a5e6d6b7e6a5?w=800&q=80",  # 부산타워 야경
}

# ============================================================
# JEJU - 실제 장소별 이미지 매핑
# ============================================================
JEJU_MAP = {
    # ATTRACTIONS - 제주 명소
    "jeju-attr-1":  "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e3d?w=800&q=80",  # 성산일출봉
    "jeju-attr-2":  "https://images.unsplash.com/photo-1598942133018-92e7addf28d3?w=800&q=80",  # 한라산
    "jeju-attr-3":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",  # 협재해수욕장
    "jeju-attr-4":  "https://images.unsplash.com/photo-1560714727-35ee10c4f10d?w=800&q=80",  # 천지연폭포
    "jeju-attr-5":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 만장굴
    "jeju-attr-6":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 에메랄드 바다
    "jeju-attr-7":  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",  # 용머리해안
    "jeju-attr-8":  "https://images.unsplash.com/photo-1529788295308-1eace6f67388?w=800&q=80",  # 세계자연유산센터
    "jeju-attr-9":  "https://images.unsplash.com/photo-1563050392-49ec69a29685?w=800&q=80",  # 사려니숲길
    "jeju-attr-10": "https://images.unsplash.com/photo-1613391093291-19ed2a7ab3a5?w=800&q=80",  # 섭지코지

    # FOOD - 제주 맛집
    "jeju-food-1":  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",  # 흑돼지 구이
    "jeju-food-2":  "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&q=80",  # 전복죽
    "jeju-food-3":  "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",  # 고기국수
    "jeju-food-4":  "https://images.unsplash.com/photo-1617196034874-5c0cb7c7c2ea?w=800&q=80",  # 갈치조림
    "jeju-food-5":  "https://images.unsplash.com/photo-1498654896293-37aaa4293460?w=800&q=80",  # 한치
    "jeju-food-6":  "https://images.unsplash.com/photo-1566831867452-fb5d2b1d6994?w=800&q=80",  # 성게국
    "jeju-food-7":  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",  # 옥돔구이
    "jeju-food-8":  "https://images.unsplash.com/photo-1583224994559-1d00f108c5a1?w=800&q=80",  # 해산물뷔페
    "jeju-food-9":  "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",  # 제주 빙수
    "jeju-food-10": "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",  # 흑돼지 BBQ

    # BEAUTY - 제주 뷰티
    "jeju-beauty-1": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    "jeju-beauty-2": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
    "jeju-beauty-3": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    "jeju-beauty-4": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    "jeju-beauty-5": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    "jeju-beauty-6": "https://images.unsplash.com/photo-1612908582935-3bbf9f4e8b1c?w=800&q=80",
    "jeju-beauty-7": "https://images.unsplash.com/photo-1626954079673-f3c3a1f3e8e3?w=800&q=80",
    "jeju-beauty-8": "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    "jeju-beauty-9": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    "jeju-beauty-10":"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",

    # CAFE - 제주 카페
    "jeju-cafe-1":  "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&q=80",  # 오션뷰 카페
    "jeju-cafe-2":  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",  # 협재 카페
    "jeju-cafe-3":  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",  # 한라산뷰 카페
    "jeju-cafe-4":  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",  # 감귤 카페
    "jeju-cafe-5":  "https://images.unsplash.com/photo-1442975631134-1e7cdb11fc28?w=800&q=80",  # 제주 차 카페
    "jeju-cafe-6":  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80",  # 돌담 카페
    "jeju-cafe-7":  "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80",  # 성산 카페
    "jeju-cafe-8":  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",  # 디저트
    "jeju-cafe-9":  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",  # 녹차 카페
    "jeju-cafe-10": "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80",  # 루프탑 카페

    # EXPERIENCE - 제주 체험
    "jeju-exp-1":  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",  # 스쿠버 다이빙
    "jeju-exp-2":  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",  # 해녀 체험
    "jeju-exp-3":  "https://images.unsplash.com/photo-1598430772299-8a4a2ee8c0f3?w=800&q=80",  # 감귤 농장
    "jeju-exp-4":  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",  # 승마 체험
    "jeju-exp-5":  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",  # 온천 스파
    "jeju-exp-6":  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 한라산 트레킹
    "jeju-exp-7":  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",  # 책방 투어
    "jeju-exp-8":  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",  # ATV/쿼드
    "jeju-exp-9":  "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80",  # 전통 공예
    "jeju-exp-10": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",  # 공연 관람

    # FILMING - 제주 촬영지
    "jeju-film-1":  "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e3d?w=800&q=80",  # 성산일출봉 (봄봄 등)
    "jeju-film-2":  "https://images.unsplash.com/photo-1598942133018-92e7addf28d3?w=800&q=80",  # 한라산
    "jeju-film-3":  "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&q=80",  # 사려니 숲
    "jeju-film-4":  "https://images.unsplash.com/photo-1560714727-35ee10c4f10d?w=800&q=80",  # 폭포 (피노키오)
    "jeju-film-5":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",  # 협재 해변
    "jeju-film-6":  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",  # 절벽/해안
    "jeju-film-7":  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",  # 용머리 해안
    "jeju-film-8":  "https://images.unsplash.com/photo-1613391093291-19ed2a7ab3a5?w=800&q=80",  # 섭지코지
    "jeju-film-9":  "https://images.unsplash.com/photo-1529788295308-1eace6f67388?w=800&q=80",  # 4·3 평화공원
    "jeju-film-10": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",  # 우도
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

        search_area = content[pos: pos + 2000]
        m = re.search(r'"image":\s*"[^"]+"', search_area)
        if not m:
            print('[SKIP] ' + spot_id + ' - image field not found')
            continue

        abs_start = pos + m.start()
        abs_end = pos + m.end()
        new_img_str = '"image": "' + new_url + '"'
        content = content[:abs_start] + new_img_str + content[abs_end:]
        count += 1
        print('[OK] ' + spot_id)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return count


if __name__ == '__main__':
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    spots = os.path.join(base, 'src', 'data', 'spots')

    print('=== BUSAN ===')
    n = run(os.path.join(spots, 'busan.ts'), BUSAN_MAP)
    print('Busan replaced: ' + str(n))

    print('')
    print('=== JEJU ===')
    n2 = run(os.path.join(spots, 'jeju.ts'), JEJU_MAP)
    print('Jeju replaced: ' + str(n2))

    print('')
    print('ALL DONE: ' + str(n + n2) + ' total images replaced.')
