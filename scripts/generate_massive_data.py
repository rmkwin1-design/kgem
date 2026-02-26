import json
import random

regions = [
    {"id": "seoul", "ko": "서울", "en": "Seoul", "ja": "ソウル"},
    {"id": "busan", "ko": "부산", "en": "Busan", "ja": "釜山"},
    {"id": "jeju", "ko": "제주", "en": "Jeju", "ja": "済州"},
    {"id": "incheon", "ko": "인천", "en": "Incheon", "ja": "仁川"},
    {"id": "daegu", "ko": "대구", "en": "Daegu", "ja": "大邱"},
    {"id": "daejeon", "ko": "대전", "en": "Daejeon", "ja": "大田"},
    {"id": "gwangju", "ko": "광주", "en": "Gwangju", "ja": "光州"},
    {"id": "ulsan", "ko": "울산", "en": "Ulsan", "ja": "蔚山"},
    {"id": "sejong", "ko": "세종", "en": "Sejong", "ja": "世宗"},
    {"id": "gyeonggi", "ko": "경기", "en": "Gyeonggi", "ja": "京畿道"},
    {"id": "gangwon", "ko": "강원", "en": "Gangwon", "ja": "江原道"},
    {"id": "chungbuk", "ko": "충북", "en": "Chungbuk", "ja": "忠清北道"},
    {"id": "chungnam", "ko": "충남", "en": "Chungnam", "ja": "忠清南道"},
    {"id": "jeonbuk", "ko": "전북", "en": "Jeonbuk", "ja": "全羅北道"},
    {"id": "jeonnam", "ko": "전남", "en": "Jeonnam", "ja": "全羅南道"},
    {"id": "gyeongbuk", "ko": "경북", "en": "Gyeongbuk", "ja": "慶尚北道"},
    {"id": "gyeongnam", "ko": "경남", "en": "Gyeongnam", "ja": "慶尚南道"}
]

categories = [
    {
        "key": "gangnam",
        "title": {"ko": "강남 필승 전략 - {}", "en": "Gangnam Strategy - {}", "ja": "江南必勝戦略 - {}"},
        "desc": {"ko": "트렌디한 장소에서 즐기는 {} 투어.", "en": "A trendy {} tour in the heart of Korea.", "ja": "韓国の中心で楽しむトレンディな{}ツアー。"},
        "cat": "activity"
    },
    {
        "key": "bbq",
        "title": {"ko": "{} 1인분 삼겹살", "en": "{} Solo BBQ Spot", "ja": "{} 1人前サムギョプサル"},
        "desc": {"ko": "혼자서도 눈치 보지 않고 즐길 수 있는 {}의 삼겹살 맛집.", "en": "Verified BBQ spots in {} that welcome single diners.", "ja": "{}で一人でも気兼ねなく楽しめるサムギョプサルの名店。"},
        "cat": "food"
    },
    {
        "key": "tea",
        "title": {"ko": "{} 시크릿 티 투어", "en": "{} Secret Tea Tour", "ja": "{} シークレットティーツアー"},
        "desc": {"ko": "도심 속에서 즐기는 {}의 고즈넉한 전통/현대 티 룸.", "en": "Quiet traditional and modern tea rooms in {}.", "ja": "都会の中で楽しむ{}の静かな伝統/現代ティールーム。"},
        "cat": "activity"
    }
]

def generate_spots():
    all_spots = []
    spot_count = 1
    
    for region in regions:
        for cat_info in categories:
            for i in range(1, 51):
                spot_id = f"{region['id']}-{cat_info['key']}-{i}"
                title_ko = cat_info['title']['ko'].format(region['ko']) + f" {i}"
                title_en = cat_info['title']['en'].format(region['en']) + f" {i}"
                title_ja = cat_info['title']['ja'].format(region['ja']) + f" {i}"
                
                desc_ko = cat_info['desc']['ko'].format(region['ko'])
                desc_en = cat_info['desc']['en'].format(region['en'])
                desc_ja = cat_info['desc']['ja'].format(region['ja'])
                
                # Mock coordinates near region centers
                lat = 35.0 + random.uniform(0, 2.5)
                lng = 126.5 + random.uniform(0, 2.5)
                
                spot = {
                    "id": spot_id,
                    "title": {"ko": title_ko, "en": title_en, "ja": title_ja},
                    "category": cat_info['cat'],
                    "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
                    "rating": round(random.uniform(4.0, 5.0), 1),
                    "description": {"ko": desc_ko, "en": desc_en, "ja": desc_ja},
                    "query": {"ko": title_ko, "en": title_en, "ja": title_ja},
                    "lat": round(lat, 4),
                    "lng": round(lng, 4),
                    "price": random.randint(10000, 100000),
                    "vipContent": {
                        "secretMenu": {"ko": f"비밀 메뉴 {i}", "en": f"Secret Menu {i}", "ja": f"裏メニュー {i}"},
                        "ownerTip": {"ko": f"오너 추천 팁 {i}", "en": f"Owner Tip {i}", "ja": f"オーナーのヒント {i}"}
                    }
                }
                all_spots.append(spot)
    
    return all_spots

if __name__ == "__main__":
    spots = generate_spots()
    with open("generated_spots.json", "w", encoding="utf-8") as f:
        json.dump(spots, f, ensure_ascii=False, indent=4)
    print(f"Generated {len(spots)} spots.")
