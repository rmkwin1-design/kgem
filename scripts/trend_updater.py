# -*- coding: utf-8 -*-
"""
trend_updater.py - K-Gem 트렌드 자동 업데이터
네이버 블로그 검색 + OpenAI 분석 → 새 핫플 자동 추가
기존 데이터는 절대 수정하지 않습니다.

사용법:
  python scripts/trend_updater.py
  python scripts/trend_updater.py --city seoul
  python scripts/trend_updater.py --dry-run
"""
import os, re, json, sys, time, argparse, subprocess
import urllib.request, urllib.parse
from datetime import datetime

ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV   = os.path.join(ROOT, ".env.local")
SPOTS = os.path.join(ROOT, "src", "data", "spots")

CITY_QUERIES = {
    "seoul": ["서울 2025 핫플레이스", "서울 요즘 뜨는 카페", "서울 여행 추천 맛집 2025"],
    "busan": ["부산 2025 핫플레이스", "부산 요즘 뜨는 카페", "부산 여행 추천 맛집 2025"],
    "jeju":  ["제주 2025 핫플레이스", "제주 요즘 뜨는 카페", "제주 여행 추천 맛집 2025"],
}
CITY_KO = {"seoul": "서울", "busan": "부산", "jeju": "제주"}
FALLBACK_IMG = {
    "seoul": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gyeongbokgung_-_Seoul_%2812%29.jpg/960px-Gyeongbokgung_-_Seoul_%2812%29.jpg",
    "busan": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/960px-Haeundae_Beach_in_Busan.jpg",
    "jeju":  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Seongsan_Ilchulbong.jpg/960px-Seongsan_Ilchulbong.jpg",
}
HEADERS = {"User-Agent": "Mozilla/5.0 (TrendUpdater/1.0)"}


def load_env():
    env = {}
    if os.path.exists(ENV):
        with open(ENV, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and '=' in line and not line.startswith('#'):
                    k, v = line.split('=', 1)
                    env[k.strip()] = v.strip()
    return env


def naver_search(query, client_id, client_secret, display=20):
    params = urllib.parse.urlencode({"query": query, "display": display, "sort": "date"})
    url = f"https://openapi.naver.com/v1/search/blog.json?{params}"
    req = urllib.request.Request(url, headers={
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return json.loads(r.read().decode('utf-8')).get("items", [])
    except Exception as e:
        print(f"  네이버 오류: {e}")
        return []


def get_existing_titles(city):
    path = os.path.join(SPOTS, f"{city}.ts")
    if not os.path.exists(path):
        return set()
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    return set(re.findall(r'"ko":\s*"([^"]+)"', content))


def ask_openai(blog_texts, city_ko, existing, openai_key, max_spots=5):
    text_sample = "\n---\n".join(blog_texts[:8])[:3000]
    existing_sample = list(existing)[:20]

    prompt = f"""최근 {city_ko} 여행 블로그 내용입니다:

{text_sample}

위에서 {city_ko}의 새로운 인기 장소를 {max_spots}개 추출하세요.
이미 있는 곳 제외: {existing_sample}

JSON 배열로만 응답하세요:
[
  {{
    "title_ko": "장소명",
    "title_en": "Place Name",
    "category": "travel|food|dessert|beauty|activity|filming",
    "region_ko": "동/구",
    "region_en": "Region",
    "description_ko": "한줄 소개 (40자 이내)",
    "description_en": "One-line (40 chars max)",
    "search_image_en": "wikimedia keyword",
    "lat": 위도,
    "lng": 경도,
    "price": 가격숫자
  }}
]"""

    data = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2,
        "max_tokens": 1500
    }).encode('utf-8')

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=data,
        headers={"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read().decode('utf-8'))
        text = result["choices"][0]["message"]["content"].strip()
        text = re.sub(r'^```json\s*', '', text)
        text = re.sub(r'\s*```$', '', text)
        return json.loads(text)
    except Exception as e:
        print(f"  OpenAI 오류: {e}")
        return []


def get_wikimedia_image(keyword):
    params = urllib.parse.urlencode({
        "action": "query", "generator": "search", "gsrnamespace": "6",
        "gsrsearch": keyword, "gsrlimit": "3", "prop": "imageinfo",
        "iiprop": "url", "iiurlwidth": "960", "format": "json"
    })
    url = f"https://commons.wikimedia.org/w/api.php?{params}"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode('utf-8'))
        for page in data.get("query", {}).get("pages", {}).values():
            t = page.get("imageinfo", [{}])[0].get("thumburl", "")
            if t.startswith("https://"):
                return t
    except:
        pass
    return None


def append_spots(city, new_spots, dry_run=False):
    path = os.path.join(SPOTS, f"{city}.ts")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    today = datetime.now().strftime("%Y-%m-%d")
    added = []

    for i, spot in enumerate(new_spots):
        title_ko = spot.get("title_ko", "")
        title_en = spot.get("title_en", title_ko)

        img = get_wikimedia_image(spot.get("search_image_en", title_en) + " Korea")
        if not img:
            img = FALLBACK_IMG.get(city, FALLBACK_IMG["seoul"])

        spot_id = f"{city}-trend-{today.replace('-','')}-{i+1:02d}"
        entry = {
            "id": spot_id,
            "title": {"ko": title_ko, "en": title_en, "ja": title_en, "zh": title_en},
            "category": spot.get("category", "travel"),
            "region": {
                "ko": spot.get("region_ko", CITY_KO[city]),
                "en": spot.get("region_en", city.title()),
                "ja": spot.get("region_ko", city),
                "zh": spot.get("region_ko", city)
            },
            "image": img,
            "rating": 4.5,
            "description": {
                "ko": spot.get("description_ko", ""),
                "en": spot.get("description_en", ""),
                "ja": spot.get("description_en", ""),
                "zh": spot.get("description_en", "")
            },
            "query": {"ko": title_ko, "en": title_en, "ja": title_en, "zh": title_en},
            "lat": spot.get("lat", 37.5665),
            "lng": spot.get("lng", 126.9780),
            "price": spot.get("price", 0),
            "vipContent": {
                "secretMenu": {
                    "ko": "현지인 추천 메뉴", "en": "Local's pick",
                    "ja": "地元のおすすめ", "zh": "当地人推荐"
                },
                "ownerTip": {
                    "ko": "방문 전 SNS 확인 추천", "en": "Check SNS before visiting",
                    "ja": "訪問前にSNSを確認", "zh": "参观前请查看SNS"
                }
            }
        }

        entry_json = json.dumps(entry, ensure_ascii=False)
        status = "preview" if dry_run else "+추가"
        print(f"    [{status}] {title_ko}")

        if not dry_run:
            content = re.sub(
                r'\s*\];\s*$',
                f',\n    // [트렌드 자동추가 {today}]\n    {entry_json}\n];\n',
                content
            )
            added.append(spot_id)

        time.sleep(0.3)

    if not dry_run and added:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

    return added


def main():
    parser = argparse.ArgumentParser(description="K-Gem 트렌드 자동 업데이터")
    parser.add_argument("--city", choices=["seoul","busan","jeju"])
    parser.add_argument("--dry-run", action="store_true", help="저장 없이 미리보기")
    args = parser.parse_args()

    env = load_env()
    openai_key   = env.get("OPENAI_API_KEY", "")
    naver_id     = env.get("NAVER_SEARCH_CLIENT_ID", "")
    naver_secret = env.get("NAVER_CLIENT_SECRET", "")

    if not openai_key:
        print("오류: OPENAI_API_KEY 없음")
        sys.exit(1)

    cities = [args.city] if args.city else ["seoul", "busan", "jeju"]
    total = 0

    for city in cities:
        print(f"\n{'='*50}")
        print(f"  {CITY_KO[city]} 트렌드 분석")
        print('='*50)

        existing = get_existing_titles(city)
        print(f"  기존 타이틀 {len(existing)}개")

        blog_texts = []
        if naver_id and naver_secret:
            for q in CITY_QUERIES[city]:
                items = naver_search(q, naver_id, naver_secret)
                for item in items:
                    desc = re.sub(r'<[^>]+>', '', item.get("description",""))
                    title = re.sub(r'<[^>]+>', '', item.get("title",""))
                    blog_texts.append(f"{title}: {desc}")
                time.sleep(0.1)
            print(f"  블로그 수집: {len(blog_texts)}건")
        else:
            blog_texts = CITY_QUERIES[city]
            print("  키워드 모드 (NAVER_CLIENT_SECRET 미설정)")

        print("  OpenAI 분석 중...")
        spots = ask_openai(blog_texts, CITY_KO[city], existing, openai_key)

        if not spots:
            print("  → 새 핫플 없음")
            continue

        print(f"  발견: {len(spots)}개")
        added = append_spots(city, spots, dry_run=args.dry_run)
        total += len(added)

    if total > 0 and not args.dry_run:
        cwd = ROOT
        subprocess.run(["git","add",
            "src/data/spots/seoul.ts",
            "src/data/spots/busan.ts",
            "src/data/spots/jeju.ts"], cwd=cwd)
        today = datetime.now().strftime("%Y-%m-%d")
        subprocess.run(["git","commit","-m",
            f"feat: auto-add {total} trending spots ({today})"], cwd=cwd)
        r = subprocess.run(["git","push","origin","main"], cwd=cwd,
                           capture_output=True, text=True)
        print("push 성공! Vercel 배포 시작됨." if r.returncode == 0 else f"push 오류: {r.stderr}")
    elif args.dry_run:
        print("\n[dry-run 완료] 실제 저장되지 않았습니다")
    else:
        print("\n추가된 스팟 없음")


if __name__ == "__main__":
    main()
