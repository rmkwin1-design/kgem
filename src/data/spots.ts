import { TravelSpot } from "../types/spot";

export const sampleSpots: TravelSpot[] = [
    // --- SEOUL (서울) ---
    {
        id: "seoul-1",
        title: { ko: "성수동 숨은 LP바 '에디트'", en: "Hidden LP Bar 'Edit' in Seongsu", ja: "聖水洞の隠れ家LPバー「エディット」" },
        category: "food",
        image: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=800&q=80",
        rating: 4.9,
        isTrending: true,
        transport: { ko: "2호선 성수역 3번 출구 도보 5분", en: "5 min walk from Seongsu Station Exit 3 (Line 2)", ja: "2号線 聖水駅 3番出口 徒歩5分" },
        description: { ko: "아날로그 감성이 가득한 성수동의 비밀스러운 공간입니다.", en: "A secret space in Seongsu full of analog vibes.", ja: "アナログ感性あふれる聖水洞の秘密の空間です。" },
        query: "성수동 LP바",
        price: 25000,
        lat: 37.5447,
        lng: 127.0567,
        vipContent: {
            // ... 생략 (중간 데이터들에도 유사하게 price 추가 예정, 전체 파일 교체는 위험하므로 핵심 부분만 샘플링하여 교체하거나 multi_replace 사용)
            secretMenu: { ko: "히든 칵테일 '블루 상수'", en: "Hidden Cocktail 'Blue Sangsu'", ja: "裏カクテル「ブルー 」" },
            ownerTip: { ko: "오너가 직접 추천하는 소수 정예 명당 자리가 있습니다.", en: "There is a secret elite seat recommended by the owner.", ja: "オーナーが直接おすすめする少数精鋭の特等席があります。" },
            status: { ko: "실시간 혼잡도 40% (쾌적)", en: "40% Busy (Spacious)", ja: "リアルタイム混雑度40% (快適)" }
        }
    },
    {
        id: "seoul-2",
        title: { ko: "경복궁 달빛 산책", en: "Gyeongbokgung Moonlight Walk", ja: "景福宮月明かりの散" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        rating: 4.8,
        transport: { ko: "3호선 경복궁역 5번 출구 연결", en: "Directly connected to Gyeongbokgung Station Exit 5 (Line 3)", ja: "3号線 景福宮駅 5番出口 直結" },
        description: { ko: "조선 왕조의 위엄과 밤의 고요함이 만나는 아름다운 궁궐 산책로.", en: "A beautiful palace walk where Joseon majesty meets night tranquility.", ja: "朝鮮王朝の威厳と夜の静寂が 融合する美しい王宮の散歩道。" },
        query: "경복궁 별빛야행",
        vipContent: {
            secretMenu: { ko: "야간 관람 전용 '비밀 정자' 위치", en: "Location of 'Secret Pavilion' for Night View", ja: "夜間観覧専用「秘密の東屋」の場所" },
            ownerTip: { ko: "한복 착용 시 입구 근처의 숨겨진 포토존을 이용하세요.", en: "Use the hidden photo spot near the entrance when wearing Hanbok.", ja: "韓服着の 際、入口近くの隠れたフォトスポットを利用してください。" }
        },
        price: 3000,
        lat: 37.5796,
        lng: 126.9770
    },
    {
        id: "seoul-3",
        title: { ko: "북촌 한옥마을 '도깨비' 촬영지", en: "Bukchon Village 'Goblin' House", ja: "北村韓屋村「トッケビ」の" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=800&q=80",
        rating: 4.7,
        transport: { ko: "3호선 안국역 2번 출구 도보 10분", en: "10 min walk from Anguk Station Exit 2 (Line 3)", ja: "3号線 安国駅 2番出口 徒歩10分" },
        description: { ko: "드라마 '도깨비'의 신비로운 정원이 있는 서양식 주택.", en: "Western-style house with a mysterious garden from 'Goblin'.", ja: "ドラマ「トッケビ」の神秘的な庭園がある洋風住宅。" },
        query: "중앙고등학교",
        lat: 37.5826,
        lng: 126.9836,
        vipContent: {
            secretMenu: { ko: "촬영 소품 미니어처 키트", en: "Drama Prop Miniature Kit", ja: "撮影小道具のミニチュアキット" },
            ownerTip: { ko: "중앙고등학교 내부 관람은 주말에만 가능합니다.", en: "Internal visit is only available on weekends.", ja: "中央高校の内部観覧は週末にのみ可能です。" }
        }
    },
    {
        id: "seoul-4",
        title: { ko: "청담동 프라이빗 스파 'L'", en: "Cheongdam Private Spa 'L'", ja: "清潭洞プライベートスパ「L」" },
        category: "beauty",
        image: "https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?w=800&q=80",
        rating: 5.0,
        transport: { ko: "7호선 청담역 9번 출구 도보 3분", en: "3 min walk from Cheongdam Station Exit 9 (Line 7)", ja: "7号線 清潭駅 9番出口 徒歩3" },
        description: { ko: "국내 최정상급 아티스트들이 애용하는 0.1% 프라이빗 테라피 공간.", en: "0.1% private therapy space used by top artists in Korea.", ja: "国内最高峰のアーティストが愛用する0.1%プライベートセラピー空間。" },
        query: "청담동 스파",
        lat: 37.5255,
        lng: 127.0423,
        vipContent: {
            secretMenu: { ko: "VIP 전용 로열 티 서비스", en: "VIP-only Royal Tea Service", ja: "VIP専用ロイヤルティーサービス" },
            ownerTip: { ko: "오너 테라피스트 지명 시 추가 헤드 스파 서비스가 제공됩니다.", en: "Complimentary head spa when booking the owner therapist.", ja: "オーナーセラピスト指名時、追加のヘッドスパサービスが提供されます。" }
        },
        price: 150000
    },
    {
        id: "seoul-5",
        title: { ko: "연남동 '수풀' 드로잉 카페", en: "Supul Drawing Cafe in Yeonnam", ja: "延南洞「スプル」ドローイングカフェ" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "홍대입구역 3번 출구 도보 7분", en: "7 min walk from Hongik Univ. Station Exit 3", ja: "弘大入口駅 3番出口 徒歩7分" },
        description: { ko: "연남동 숲길 옆, 캔버스 위에 나만의 서울을 그리는 힐링 타임.", en: "Healing time drawing your own Seoul on canvas next to Yeonnam forest way.", ja: "延南洞の森の道沿い、キャンバスに自分だけのソウルを描くヒーリングタイム。" },
        query: "연남동 드로잉카페",
        lat: 37.5615,
        lng: 126.9248,
        vipContent: {
            secretMenu: { ko: "프리미엄 수입 물감 업그레이드", en: "Premium Imported Paint Upgrade", ja: "高級輸入絵具アップグレード" },
            ownerTip: { ko: "오후 4시 이후의 창가 자리는 완벽한 채광을 자랑합니다.", en: "Window seats after 4 PM have perfect natural lighting.", ja: "午後4時以降の窓際の席は完璧な採光を誇ります。" }
        },
        price: 20000
    },

    // --- BUSAN (부산) ---
    {
        id: "busan-1",
        title: { ko: "해운대 시크릿 오션뷰 바 '파도'", en: "Haeundae Secret Ocean View Bar 'Pado'", ja: "海雲台シークレットオーシャンビューバー「波」" },
        category: "food",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.9,
        transport: { ko: "2호선 해운대역 5번 출구 도보 10분", en: "10 min walk from Haeundae Station Exit 5 (Line 2)", ja: "2号線 海雲台駅 5番出口 徒歩10分" },
        description: { ko: "관광객은 모르는 엘시티 인근의 숨겨진 위스키 바.", en: "A hidden whisky bar near LCT that tourists don't know about.", ja: "観光客は知らないLCT近くの隠れ家ウィスキーバー。" },
        query: "해운대 숨은 술집",
        lat: 35.1587,
        lng: 129.1603,
        vipContent: {
            secretMenu: { ko: "부산 밤바다 시그니처 칵테일", en: "Busan Night Sea Signature Cocktail", ja: "釜山の夜の海シグネチャーカクテル" },
            ownerTip: { ko: "오후 8시 이전 방문 시 가장 아름다운 노을을 볼 수 있습니다.", en: "Visit before 8 PM for the most beautiful sunset views.", ja: "午後8時前に訪問すると、最も美しい夕焼けを見ることができます。" }
        },
        price: 35000
    },
    {
        id: "busan-2",
        title: { ko: "영도 흰여울 문화마을 '변호인' 촬영지", en: "Huinnyeoul Village 'The Attorney' Set", ja: "影島ヒンヨウル文化村「弁護人」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1590603783183-5dadbc038167?w=800&q=80",
        rating: 4.6,
        transport: { ko: "부산역에서 508번 버스 이용, 흰여울문화마을 하차", en: "Bus 508 from Busan Station, get off at Huinnyeoul Village", ja: "釜山駅から508番バス利用、ヒンヨウル文化村下車" },
        description: { ko: "바다 벼랑 골목길을 따라 걷는 영화 같은 풍경.", en: "Cinematic scenery walking along the sea cliff alleys.", ja: "海の崖の裏路地に沿って歩く映画のような風景。" },
        query: "흰여울문화마을",
        lat: 35.0784,
        lng: 129.0435,
        vipContent: {
            secretMenu: { ko: "촬영지 배경 한정판 엽서 세트", en: "Limited Edition Film Location Postcards", ja: "撮影地背景の限定版ポストカードセット" },
            ownerTip: { ko: "관광 안내소 뒤편의 좁은 계단 위가 최고의 포토스팟입니다.", en: "The narrow stairs behind the info center is the best photo spot.", ja: "観光案内所の裏側の狭い階段の上が最高のフォトスポットです。" }
        }
    },
    {
        id: "busan-3",
        title: { ko: "감천 문화마을 야간 서핑 체험", en: "Gamcheon Village Night Surfing", ja: "甘川文化村夜間サーフィン体験" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "사하구 마을버스 1-1번 이용, 감천문화마을 하차", en: "Village Bus 1-1 to Gamcheon Culture Village", ja: "沙下区マウルバス1-1番利用、甘川文化村下車" },
        description: { ko: "달빛 아래서 즐기는 다대포의 낭만적인 야간 서핑.", en: "Romantic night surfing in Dadaepo under the moonlight.", ja: "月明かりの下で楽しむ多大浦のロマンチックな夜間サーフィン。" },
        query: "부산 야간 서핑",
        lat: 35.0487,
        lng: 128.9667,
        vipContent: {
            secretMenu: { ko: "전문 서퍼의 1:1 고립 레슨", en: "1:1 Isolated Pro Surfer Lesson", ja: "プロサーファーによる1:1専門レッスン" },
            ownerTip: { ko: "서핑 후 제공되는 로컬 해산물 라면이 별미입니다.", en: "The local seafood ramen after surfing is a must-try.", ja: "サーフィン後に提供される地元の海鮮ラーメンが絶品です。" }
        }
    },

    // --- JEJU (제주) ---
    {
        id: "jeju-1",
        title: { ko: "애월 시크릿 다이빙 포인트 '블루홀'", en: "Aewol Secret Diving 'Blue Hole'", ja: "涯月シークレットダイビングポイント「ブルーホール」" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1544551763-47a01596a209?w=800&q=80",
        rating: 5.0,
        transport: { ko: "제주공항에서 202번 버스, 애월 한담공원 하차", en: "Bus 202 from Airport, get off at Aewol Handam Park", ja: "済州空港から202番バス、涯月ハンダム公園下車" },
        description: { ko: "현지 다이버들만 아는 에메랄드빛 천연 수영장.", en: "Emerald natural pool known only to local divers.", ja: "地元ダイバーだけが知るエメラルド色の天然プール。" },
        query: "제주도 숨은 물놀이 스팟",
        lat: 33.4616,
        lng: 126.3106,
        vipContent: {
            secretMenu: { ko: "고프로 무료 대여 및 수중 촬영 서비스", en: "Free GoPro Rental & Underwater Shooting", ja: "GoPro無料貸出および水中撮影サービス" },
            ownerTip: { ko: "만조 시간 2시간 전이 수심과 물빛이 가장 완벽합니다.", en: "The water color is most perfect 2 hours before high tide.", ja: "満潮時刻の2時間前が水深と水の色が最も完璧です。" }
        }
    },
    {
        id: "jeju-2",
        title: { ko: "제주 남서쪽 '우리들의 블루스' 촬영지", en: "Jeju SW 'Our Blues' Filming Set", ja: "済州南西部「私たちのブルース」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800&q=80",
        rating: 4.8,
        transport: { ko: "제주공항 151번 급행버스, 모슬포항 하차", en: "Express Bus 151 to Moseulpo Port", ja: "済州空港 151番急行バス、慕瑟浦港下車" },
        description: { ko: "드라마의 여운이 살아있는 고즈넉한 제주의 어촌 마을.", en: "Quiet Jeju fishing village where the drama's lingering vibes live.", ja: "ドラマの余韻が残る静かな済州の漁村。" },
        query: "모슬포항 우리들의 블루스",
        lat: 33.2173,
        lng: 126.2504,
        vipContent: {
            secretMenu: { ko: "작가의 친필 사인이 담긴 대본집 대여", en: "Writer-signed Script Rental", ja: "作家の親筆サイン入り台本集の貸出" },
            ownerTip: { ko: "항구 근처 방어 맛집들의 시크릿 타임을 공략하세요.", en: "Targets the secret times of the yellowtail fish restaurants nearby.", ja: "港周辺のブリ料理店のシークレットタイムを狙ってください。" }
        }
    },
    {
        id: "jeju-3",
        title: { ko: "제주 중산간 숨은 베이커리 '오름담'", en: "Mid-Mountain Bakery 'Oreum-dam'", ja: "済州の中山間部にあるパン屋「オルムダム」" },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        rating: 4.9,
        transport: { ko: "제주공항 211번 버스, 성읍민속마을 하차 후 택시 5분", en: "Bus 211 to Seongeup, then 5 min taxi", ja: "済州空港 211番バス、城邑民俗村下車後タクシー5分" },
        description: { ko: "매일 아침 제주 유기농 보리로 구워내는 한정판 빵.", en: "Limited edition bread baked every morning with Jeju organic barley.", ja: "毎朝済州産のオーガニック麦で焼き上げる限定パン。" },
        query: "제주 로컬 빵집",
        lat: 33.3934,
        lng: 126.7941,
        vipContent: {
            secretMenu: { ko: "현지인 전용 '고사리 카스텔라'", en: "Local-only 'Gosari Castella'", ja: "現地人専用「コサリカステラ」" },
            ownerTip: { ko: "매주 화요일은 오너 파티시에의 특별 신메뉴 테스트 데이입니다.", en: "Tuesdays are the owner pastry chef's new menu test days.", ja: "毎週火曜日はオーナーパティシエの特別新メニューテストデーです。" }
        }
    },

    // --- GYEONGGI (경기) ---
    {
        id: "gyeonggi-1",
        title: { ko: "파주 '태양의 후예' 촬영지", en: "Paju 'Descendants of the Sun' Set", ja: "坡州「太陽の末裔」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&q=80",
        rating: 4.7,
        transport: { ko: "경의중앙선 문산역에서 택시 10분/버스 92번", en: "10 min taxi or Bus 92 from Munsan Station", ja: "京義中央線 文山駅からタクシー10分/バス92番" },
        description: { ko: "유시진 대위가 머물던 군부대 느낌의 카페와 문화지구.", en: "Cultural district and cafe with the military base vibe from the drama.", ja: "ユ・シジン大尉が滞在した軍部隊のような雰囲気のカフェと文化地区。" },
        query: "파주 캠프그리브스",
        lat: 37.8914,
        lng: 126.7323,
        vipContent: {
            secretMenu: { ko: "드라마 속 '군번줄' 주문 제작", en: "Custom 'Dog Tag' from the Drama", ja: "劇中の「ドッグタグ」受注製作" },
            ownerTip: { ko: "사전 예약제로 운영되는 프라이빗 투어를 활용하세요.", en: "Use the private tour that operates on a reservation-only basis.", ja: "事前予約制で運営されるプライベートツアーを活用してください。" }
        }
    },
    {
        id: "gyeonggi-2",
        title: { ko: "용인 '민속촌' 한복 스냅 출사", en: "Yongin Folk Village Hanbok Shooting", ja: "龍仁「民俗村」韓服スナップ撮影" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
        rating: 4.8,
        transport: { ko: "기흥역에서 셔틀버스 또는 10-5번 버스", en: "Shuttle bus or Bus 10-5 from Giheung Station", ja: "器興駅からシャトルバスまたは10-5番バス" },
        description: { ko: "조선시대 주인공이 된 듯한 고퀄리티 한복 체험과 스틸컷 촬영.", en: "High-quality Hanbok experience as a Joseon era protagonist.", ja: "朝鮮時代の主役になったような高品質な韓服体験とスチール撮影。" },
        query: "한국민속촌 야간개장",
        lat: 37.2586,
        lng: 127.1166,
        vipContent: {
            secretMenu: { ko: "심야 한정 '귀신 이야기' 도슨트", en: "Late-night 'Ghost Story' Docent", ja: "深夜限定「お化けの話」ドニセント" },
            ownerTip: { ko: "비오는 날 방문하면 안개 낀 한옥의 독보적인 분위기를 촬영할 수 있습니다.", en: "Visit on rainy days for unique fog-covered Hanok vibes.", ja: "雨の日に訪問すると、霧に包まれた韓屋の独創的な雰囲気を撮影できます。" }
        }
    },

    // --- GANGWON (강원) ---
    {
        id: "gangwon-1",
        title: { ko: "주문진 '도깨비' 방파제", en: "Jumunjin 'Goblin' Breakwater", ja: "注文津「トッケビ」防波堤" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        rating: 4.9,
        transport: { ko: "강릉역에서 300번 버스 또는 택시 20분", en: "Bus 300 or 20 min taxi from Gangneung Station", ja: "江陵駅から300番バスまたはタクシー20分" },
        description: { ko: "공유와 김고은이 처음 만난 전설적인 촬영지.", en: "The legendary site where Gong Yoo and Kim Go-eun first met.", ja: "コン・ユとキム・ゴウンが初めて出会った伝説の撮影地。" },
        query: "주문진 방파제",
        lat: 37.8932,
        lng: 128.8317,
        vipContent: {
            secretMenu: { ko: "촬영 소품(빨간 목도리, 꽃) 무료 대여", en: "Free Rental of Drama Props (Red Scarf, Flower)", ja: "撮影用小道具(赤のマフラー、花)の無料貸出" },
            ownerTip: { ko: "근처 상점에서 '도깨비 커피'를 구매하면 줄 서는 팁을 알려줍니다.", en: "Buy 'Goblin Coffee' nearby for tips to skip the photo line.", ja: "近くの商店で「トッケビコーヒー」を購入すると、並び方のコツを教えてくれます。" }
        }
    },
    {
        id: "gangwon-2",
        title: { ko: "평창 시크릿 숲속 레스토랑 '더 숲'", en: "Pyeongchang Secret Forest 'The Soop'", ja: "平昌シークレット森のレストラン「ザ・スプ」" },
        category: "food",
        image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=800&q=80",
        rating: 5.0,
        transport: { ko: "평창역에서 마중 서비스 요청 가능 (예약 필수)", en: "Pickup service from Pyeongchang Station (Booking required)", ja: "平昌駅から迎えサービスリクエスト可能(要予約)" },
        description: { ko: "해발 700m 청정 숲에서 즐기는 로컬 식재료 다이닝.", en: "Dining with local ingredients in a clean forest at 700m altitude.", ja: "海抜700mの清浄な森で楽しむ地元の食材を使ったダイニング。" },
        query: "평창 숲속 식당",
        lat: 37.6433,
        lng: 128.4231,
        vipContent: {
            secretMenu: { ko: "오직 산지 직송 산나물 페스토 파스타", en: "Direct-from-Source Wild Herb Pesto Pasta", ja: "産地直送の山菜ジェノベーゼパスタ" },
            ownerTip: { ko: "오너가 직접 안내하는 뒷산 시크릿 산책 코스가 일품입니다.", en: "The owner-guided secret hiking trail behind the restaurant is superb.", ja: "オーナーが直接案内する裏山のシークレット散歩コースが絶品です." }
        }
    },

    // --- CHUNGNAM (충남) ---
    {
        id: "chungnam-1",
        title: { ko: "논산 '미스터 션샤인' 션샤인랜드", en: "Nonsan 'Mr. Sunshine' Sunshine Land", ja: "論山「ミスター・サンシャイン」サンシャインランド" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
        rating: 4.8,
        transport: { ko: "논산역에서 택시 15분 또는 212번 버스", en: "15 min taxi or Bus 212 from Nonsan Station", ja: "論山駅からタクシー15 は 212番バス" },
        description: { ko: "구한말 격동의 시대를 완벽하게 재현한 영화관 같은 세트장.", en: "A movie-like set perfectly replicating the turbulent era of late Joseon.", ja: "旧韓末の激動の時代を完璧に再現した映画館のようなセット。" },
        query: "션샤인랜드 논산",
        lat: 36.1438,
        lng: 127.1265,
        vipContent: {
            secretMenu: { ko: "글로리 호텔 전용 '가배(커피)' 체험", en: "Exclusive 'Gabae' (Coffee) Experience at Glory Hotel", ja: "グローリーホテル専用「加倍(ガベ、コーヒー)」体験" },
            ownerTip: { ko: "개화기 의상을 대여하면 모든 포토존에서 인생샷이 보장됩니다.", en: "Renting modern era costumes guarantees perfect shots at all spots.", ja: "開化期の衣装をレンタルすると、すべてのフォトスポットで最高の写真が撮れます。" }
        }
    },

    // --- INCHEON (인천) ---
    {
        id: "incheon-1",
        title: { ko: "송도 '호텔 델루나' 촬영지", en: "Songdo 'Hotel Del Luna' Spot", ja: "松島「ホテルデルーナ」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?w=800&q=80",
        rating: 4.7,
        transport: { ko: "인천1호선 센트럴파크역 4번 출구 도보 5분", en: "5 min walk from Central Park Station Exit 4", ja: "仁川1号線 セントラルパーク駅 4番出口 徒歩5分" },
        description: { ko: "미래 지향적인 도시 풍경 속 화려한 판타지 세계관.", en: "A flashy fantasy world within a futuristic city landscape.", ja: "未来志向な都市風景の中の華やかなファンタジーの世界観。" },
        query: "송도 아트센터 호텔델루나",
        lat: 37.3872,
        lng: 126.6346,
        vipContent: {
            secretMenu: { ko: "야간 루프탑 전용 델루나 칵테일", en: "Night Rooftop Exclusive Del Luna Cocktail", ja: "夜間ルーフトップ専用デルーナカクテル" },
            ownerTip: { ko: "일몰 직후 빌딩 숲의 불빛이 켜질 때가 가장 몽환적입니다.", en: "The vibe is most dreamlike when the city lights turn on right after sunset.", ja: "日没直後、ビル群の明かりが灯る頃が最も幻想的です。" }
        }
    },

    // --- DAEGU (대구) ---
    {
        id: "daegu-1",
        title: { ko: "대구 근대골목 '괜찮아 사랑이야' 촬영지", en: "Daegu Modern Alley 'It's Okay, That's Love'", ja: "大邱近代路「大丈夫、愛だ」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1596001150410-02381e9f067d?w=800&q=80",
        rating: 4.6,
        transport: { ko: "1, 2호선 반월당역 18번 출구 도보 10분", en: "10 min walk from Banwoldang Station Exit 18", ja: "1, 2号線 半月堂駅 18番出口 徒歩10分" },
        description: { ko: "세련된 근대 건축물 사이 흐르는 애틋한 멜로 감성.", en: "Heartfelt melodic vibes flowing between sophisticated modern buildings.", ja: "洗練された近代建築の間に流れる切ないメロドラマの感性。" },
        query: "대구 제일교회 촬영지",
        lat: 35.8654,
        lng: 128.5882,
        vipContent: {
            secretMenu: { ko: "근대 의상 대여 프리미엄 패키지", en: "Premium Modern Costume Rental Package", ja: "近代衣装レンタルプレミアムパッケージ" },
            ownerTip: { ko: "교회 앞 계단에서 내려다보는 시티뷰는 대구에서 가장 이국적입니다.", en: "The city view from the church steps is the most exotic in Daegu.", ja: "教会前の階段から見下ろすシティビューは大邱で最も異国情緒があります。" }
        }
    },

    // --- JEOLLA (전라) ---
    {
        id: "jeonju-1",
        title: { ko: "전주 한옥마을 '스물다섯 스물하나' 촬영지", en: "Jeonju 'Twenty-Five Twenty-One' Spot", ja: "全州韓屋村「二十五、二十一」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=800&q=80",
        rating: 4.9,
        transport: { ko: "전주역에서 119번 버스, 한옥마을 하차", en: "Bus 119 from Jeonju Station to Hanok Village", ja: "全州駅から119番バス、韓屋村下車" },
        description: { ko: "청춘의 싱그러움이 녹아있는 만화방과 터널길.", en: "The comic book store and tunnel path filled with the freshness of youth.", ja: "青春の瑞々しさが溶け込んでいる漫画喫茶とトンネルの道。" },
        query: "전주 한벽굴",
        lat: 35.8117,
        lng: 127.1583,
        vipContent: {
            secretMenu: { ko: "희도와 이진의 시그니처 간식 세트", en: "Heedo & Yijin's Signature Snack Set", ja: "ヒドとイジンのシグネチャーおやつセット" },
            ownerTip: { ko: "한벽굴(터널)에서 자전거를 타고 사진을 찍으면 드라마 주인공이 됩니다.", en: "Become the drama lead by taking a photo riding a bike at Hanbyeokgul.", ja: "寒碧窟(トンネル)で自転車に乗って写真を撮れば、ドラマの主人公になれます。" }
        }
    },

    // --- GYEONGSANG (경상) ---
    {
        id: "pohang-1",
        title: { ko: "포항 구룡포 '동백꽃 필 무렵' 촬영지", en: "Pohang 'When the Camellia Blooms' Set", ja: "浦項九龍浦「椿の花咲く頃」撮影地" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1596726565851-969a97bad6d2?w=800&q=80",
        rating: 4.9,
        transport: { ko: "포항역에서 9000번 버스 이용, 구룡포 하차", en: "Bus 9000 from Pohang Station to Guryongpo", ja: "浦項駅から9000番バス利用、九龍浦下車" },
        description: { ko: "까불이의 흔적은 없고 낭만만 가득한 바닷가 계단 마을.", en: "A seaside village with romance and no trace of the villain.", ja: "悪党の痕跡はなく、ロマンだけが溢れる海辺の階段の村。" },
        query: "구룡포 일본인 가옥거리",
        lat: 35.9904,
        lng: 129.5606,
        vipContent: {
            secretMenu: { ko: "동백이네 식당 시그니처 메뉴 재현", en: "Dongbaek's Restaurant Signature Menu Recreation", ja: "トンベクのお店のシグネチャーメニュー再現" },
            ownerTip: { ko: "계단 꼭대기에서 마을과 바다를 배경으로 마주 보고 앉아 사진을 찍으세요.", en: "Take a photo sitting and facing each other at the top of the stairs.", ja: "階段の頂上で村と海を背景に向かい合って座り、写真を撮ってください。" }
        }
    },

    // --- ULLEUNG (울릉도) ---
    {
        id: "ulleung-1",
        title: { ko: "울릉도 '태하 향목' 전망대", en: "Ulleungdo Taeha Hyangmok Observatory", ja: "鬱陵島「テハ・ヒャンモク」展望台" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1596401057633-54019159981e?w=800&q=80",
        rating: 5.0,
        transport: { ko: "도포항에서 태하행 버스 이용 후 모노레일 탑승", en: "Bus to Taeha from Port, then take Monorail", ja: "港からテハ行きのバス利用後、モノレール搭乗" },
        description: { ko: "한국의 10대 비경 중 하나로 꼽히는 울릉도 최고의 절경.", en: "One of Korea's top 10 scenic spots with the best views of Ulleungdo.", ja: "韓国の10大秘境に数えられる鬱陵島最高の絶景。" },
        query: "울릉도 태하향목관광모노레일",
        lat: 37.5144,
        lng: 130.7937,
        vipContent: {
            secretMenu: { ko: "정상 휴게소 전용 '울릉도 호박 식혜'", en: "Summit Exclusive 'Ulleungdo Pumpkin Sikhye'", ja: "頂上休憩所限定「鬱陵島かぼちゃシッケ」" },
            ownerTip: { ko: "모노레일 맨 앞자리에 앉아야 올라갈 때의 아찔한 절경을 만끽할 수 있습니다.", en: "Sit in the front of the monorail for the most thrilling view.", ja: "モノレールの最前列に座ると、登る際のスリル満載の絶景を満喫できます。" }
        }
    },

    // --- INCHEON (인천 추가) ---
    {
        id: "incheon-2",
        title: { ko: "신포국제시장 '원조' 닭강정", en: "Sinpo Market Original Dakgangjeong", ja: "新浦国際市場「元祖」タッカンジョン" },
        category: "food",
        image: "https://images.unsplash.com/photo-1562967914-6cbb04bac381?w=800&q=80",
        rating: 4.8,
        transport: { ko: "1호선 동인천역 2번 출구 도보 10분", en: "10 min walk from Dong-Incheon Station Exit 2", ja: "1号線 東仁川駅 2番出口 徒歩10分" },
        description: { ko: "인천을 대표하는 30년 전통의 매콤달콤한 닭강정 성지.", en: "Incheon's representative spicy-sweet chicken spot with 30-year tradition.", ja: "仁川を代表する30年の伝統を誇る甘辛タッカンジョンの聖地。" },
        query: "신포국제시장 닭강정",
        lat: 37.4705,
        lng: 126.6276,
        vipContent: {
            secretMenu: { ko: "포장 전용 스페셜 대용량 박스", en: "Special Large Box for Take-out", ja: "持ち帰り専用スペシャル大容量ボックス" },
            ownerTip: { ko: "줄이 길 때는 시장 안쪽 2호점을 이용하는 것이 숨겨진 꿀팁입니다.", en: "Use the 2nd branch inside the market when lines are long.", ja: "行列が長い時は、市場の内側にある2号店を利用するのが隠れたコツです。" }
        }
    },
    {
        id: "seoul-6",
        title: { ko: "이태원 클라쓰 '단밤' 1호점", en: "Itaewon Class 'Danbam' 1st", ja: "梨泰院クラス「タンバム」1号店" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80",
        rating: 4.8,
        transport: { ko: "6호선 녹사평역 3번 출구 도보 5분", en: "5 min walk from Noksapyeong Station Exit 3", ja: "6号線 緑莎坪駅 3番出口 徒歩5分" },
        description: { ko: "박새로이의 열정이 살아있는 이태원 클라쓰의 중심지.", en: "The heart of Itaewon Class where Park Saeroyi's passion lives.", ja: "パク・セロイの情熱が生きている梨泰院クラスの中心地。" },
        query: "이태원 단밤 촬영지",
        lat: 37.5346,
        lng: 126.9880,
        vipContent: {
            secretMenu: { ko: "드라마 속 '순두부찌개' 재현 메뉴", en: "Recreated Soft Tofu Stew from Drama", ja: "劇中の「スンドゥブチゲ」再現メニュー" },
            ownerTip: { ko: "루프탑에서 바라보는 남산뷰가 드라마 공식 포토존입니다.", en: "Namsan view from the rooftop is the official photo spot.", ja: "屋上から眺める南山ビューがドラマの公式フォトスポットです。" }
        }
    },
    {
        id: "seoul-7",
        title: { ko: "이태원 클라쓰 '남산육교'", en: "Itaewon Class 'Namsan Pedestrian Bridge'", ja: "梨泰院クラス「南山歩橋」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1540919315541-698f12ea926b?w=800&q=80",
        rating: 4.9,
        transport: { ko: "6호선 녹사평역 1번 출구 도보 2분", en: "2 min walk from Noksapyeong Station Exit 1", ja: "6号線 緑莎坪駅 1番出口 徒歩2分" },
        description: { ko: "박새로이가 고민에 잠기던 드라마 속 명장면의 배경.", en: "The background of the famous scene where Park Saeroyi was lost in thought.", ja: "パク・セロイが悩み事をした劇中の名場面の背景。" },
        query: "녹사평역 육교",
        lat: 37.5358,
        lng: 126.9868,
        vipContent: {
            secretMenu: { ko: "야간 출사 전용 삼각대 대여", en: "Night Photography Tripod Rental", ja: "夜間撮影用三脚の貸出" },
            ownerTip: { ko: "해 질 녘 남산타워에 불이 켜지는 순간이 가장 아름답습니다.", en: "Sunset is best when Namsan Tower lights turn on.", ja: "日没時、南山タワーに明かりが灯る瞬間が最も美しいです。" }
        }
    },
    {
        id: "suwon-1",
        title: { ko: "이상한 변호사 우영우 '카즈미'", en: "Extraordinary Attorney Woo 'Kajigurumi'", ja: "ウ・ヨンウ弁護士は天才肌「カジグルミ」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "수원역에서 60번 버스 이용, 행궁동 하차", en: "Bus 60 from Suwon Station to Haenggung-dong", ja: "水原駅から60番バス利用、行宮洞下車" },
        description: { ko: "드라마 속 우영우 김밥집으로 유명한 행궁동의 아기자기한 식당.", en: "A cute restaurant in Haenggung-dong famous as Woo Young-woo's Gimbap shop.", ja: "劇中のウ・ヨンウのキンパ店として有名な行宮洞のこじんまりとした食堂。" },
        query: "수원 카즈미",
        lat: 37.2844,
        lng: 127.0135,
        vipContent: {
            secretMenu: { ko: "기간 한정 '우영우 김밥' 특별 판매", en: "Limited Edition 'Woo Young-woo Gimbap'", ja: "期間限定「ウ・ヨンウキンパ」特別販売" },
            ownerTip: { ko: "식당 옆 고래 벽화는 필수로 찍어야 하는 포토존입니다.", en: "The whale mural next to the restaurant is a must-photo spot.", ja: "食堂の横のクジラの壁画は必須のフォトスポットです。" }
        }
    },
    {
        id: "suwon-2",
        title: { ko: "선재 업고 튀어 '수원 행궁동 일대'", en: "Lovely Runner 'Haenggung-dong Area'", ja: "ソンジェ背負って走れ「行宮洞一帯」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30eb2?w=800&q=80",
        rating: 4.9,
        transport: { ko: "수원역에서 택시 10분 또는 13번 버스", en: "10 min taxi or Bus 13 from Suwon Station", ja: "水原駅からタクシー10分または13番バス" },
        description: { ko: "임솔과 선재의 풋풋한 기억이 머물러 있는 청춘의 거리.", en: "The street of youth where Im Sol and Sun-jae's fresh memories stay.", ja: "イム・ソルとソンジェの初々しい記憶が残る青春の街。" },
        query: "수원 행궁동 선업튀 촬영지",
        lat: 37.2831,
        lng: 127.0124,
        vipContent: {
            secretMenu: { ko: "드라마 테마 스티커 사진기", en: "Drama-themed Photo Booth", ja: "ドラマテーマのプリントシール機" },
            ownerTip: { ko: "임솔의 집 배경이 된 카페는 현재 성지순례객들로 붐빕니다.", en: "The cafe that was Im Sol's house is now very popular with fans.", ja: "イム・ソルの家になったカフェは現在、聖地巡礼客で賑わっています。" }
        }
    },
    {
        id: "paju-2",
        title: { ko: "빈센조 '라스트 피크(라 페스타)'", en: "Vincenzo 'La Festa' Paju", ja: "ヴィンチェンツォ「ラ・フェスタ」坡州" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1549497538-30623643f81c?w=800&q=80",
        rating: 4.7,
        transport: { ko: "3호선 정발산역 2번 출구 도보 5분", en: "5 min walk from Jeongbalsan Station Exit 2", ja: "3号線 鼎鉢山駅 2番出口 徒歩5分" },
        description: { ko: "빈센조가 마피아의 카리스마를 보여주던 유럽풍 야외 쇼핑몰.", en: "European-style outdoor mall where Vincenzo showed his mafia charisma.", ja: "ヴィンチェンツォがマフィアのカリスマを見せた欧州風の屋外モール。" },
        query: "일산 라페스타 빈센조",
        lat: 37.6620,
        lng: 126.7725,
        vipContent: {
            secretMenu: { ko: "이탈리아 정통 에스프레소 세트", en: "Authentic Italian Espresso Set", ja: "本場イタリアのエスプレッソセット" },
            ownerTip: { ko: "야간 조명이 켜지면 진짜 이탈리아 광장에 온 듯한 기분이 듭니다.", en: "Feels like an Italian piazza when the night lights are on.", ja: "夜の照明が灯ると、本物のイタリアの広場に来たような気分になります。" }
        }
    },
    {
        id: "cheongju-1",
        title: { ko: "더 글로리 '바둑 공원'", en: "The Glory 'Go Park'", ja: "ザ・グローリー「囲碁公園」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        rating: 4.8,
        transport: { ko: "청주 시외버스터미널에서 831번 버스 이용", en: "Bus 831 from Cheongju Intercity Bus Terminal", ja: "清州市外バスターミナルから831番バス利用" },
        description: { ko: "문동은과 하도영이 침묵 속에 바둑을 두던 운명적인 장소.", en: "The fateful place where Moon Dong-eun and Ha Do-young played Go in silence.", ja: "ムン・ドンウンとハ・ドヨンが沈黙の中で囲碁を打った運命的な場所。" },
        query: "청주 중앙공원 바둑판",
        lat: 36.6322,
        lng: 127.4891,
        vipContent: {
            secretMenu: { ko: "바둑 테마 전통 차 서비스", en: "Go-themed Traditional Tea Service", ja: "囲碁テーマの伝統茶サービス" },
            ownerTip: { ko: "공원 내 대형 바둑판 조형물은 드라마 촬영 직후 설치된 것입니다.", en: "The large Go board artwork was installed after filming.", ja: "公園内の巨大な囲碁盤のオブジェはドラマ撮影直後に設置されたものです。" }
        }
    },
    {
        id: "seoul-8",
        title: { ko: "기생충 '자하문 터널'", en: "Parasite 'Jahamun Tunnel'", ja: "パラサイト「紫霞門トンネル」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
        rating: 4.9,
        transport: { ko: "3호선 경복궁역 3번 출구 버스 이용 (자하문 고개 하차)", en: "Bus from Gyeongbokgung Station Exit 3 to Jahamun Hill", ja: "3号線 景福宮駅 3番出口よりバス利用(紫霞門峠下車)" },
        description: { ko: "기택 가족이 빗속을 뚫고 도망치던 영화 속 계단과 터널.", en: "The stairs and tunnel where Ki-taek's family fled through the rain.", ja: "ギテク一家が雨の中を逃げた劇中の階段とトンネル。" },
        query: "자하문터널 기생충",
        lat: 37.5915,
        lng: 126.9635,
        vipContent: {
            secretMenu: { ko: "영화 포스터 컨셉 사진 인화", en: "Movie Poster Concept Photo Printing", ja: "映画ポスターコンセプトの写真現像" },
            ownerTip: { ko: "터널 입구에서 계단을 바라보는 각도가 최고의 '계급차이' 앵글입니다.", en: "The angle looking up the stairs is the best 'class gap' shot.", ja: "トンネルの入り口から階段を見上げる角度が最高の「階級差」アングルです。" }
        }
    },
    {
        id: "seoul-9",
        title: { ko: "오징어 게임 '쌍문동 시장'", en: "Squid Game 'Ssangmun-dong Market'", ja: "イカゲーム「双門洞市場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1547928576-965be7f5f6a6?w=800&q=80",
        rating: 4.7,
        transport: { ko: "4호선 쌍문역 2번 출구 도보 5분", en: "5 min walk from Ssangmun Station Exit 2", ja: "4号線 双門駅 2番出口 徒歩5分" },
        description: { ko: "성기훈의 일상이 묻어나던 생활 밀착형 시장 풍경.", en: "The daily market life of Seong Gi-hun in Squid Game.", ja: "ソン・ギフンの日常がにじみ出ていた生活密着型の市場の風景。" },
        query: "백운시장 오징어게임",
        lat: 37.6491,
        lng: 127.0345,
        vipContent: {
            secretMenu: { ko: "추억의 달고나 뽑기 체험", en: "Nostalgic Dalgona Challenge", ja: "あの日、あの時のダルゴナ型抜き体験" },
            ownerTip: { ko: "기훈이 자주 가던 생선 가게는 실제로 시장 입구에 있습니다.", en: "The fish shop Gi-hun frequented is actually at the market entrance.", ja: "ギフンがよく行っていた魚屋は実際に市場の入り口にあります。" }
        }
    },
    {
        id: "seoul-10",
        title: { ko: "무빙 '남산 돈까스'", en: "Moving 'Namsan Tonkatsu'", ja: "ムービング「南山とんかつ」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
        rating: 4.8,
        transport: { ko: "4호선 명동역 3번 출구 남산 케이블카 방향 도보 10분", en: "10 min walk from Myeongdong Station towards Namsan Cable Car", ja: "4号線 明洞駅 3番出口より南山ケーブルカー方面へ徒歩10分" },
        description: { ko: "드라마 '무빙'에서 초능력자들이 비밀스럽게 만나던 추억의 맛.", en: "The nostalgic taste where superpowered humans met secretly in 'Moving'.", ja: "ドラマ「ムービング」で超能力者たちが密かに会っていた思い出の味。" },
        query: "남산 돈까스 무빙",
        lat: 37.5562,
        lng: 126.9850,
        vipContent: {
            secretMenu: { ko: "드라마 속 '한효주 세트'", en: "Drama-themed 'Han Hyo-joo Set'", ja: "劇中の「ハン・ヒョジュ セット」" },
            ownerTip: { ko: "스프와 양배추 샐러드는 무한 리필이 국룰입니다.", en: "Infinite refill for soup and cabbage salad is the local rule.", ja: "スープとキャベツのサラダは無限におかわりするのが地元のルールです。" }
        }
    },
    {
        id: "chungju-1",
        title: { ko: "사랑의 불시착 '비내섬'", en: "Crash Landing on You 'Binae Island'", ja: "愛の不時着「ピネ島」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
        rating: 4.9,
        transport: { ko: "충주역에서 택시 20분 또는 시내버스 이용", en: "20 min taxi from Chungju Station", ja: "忠州駅からタクシー20分または市内バス利用" },
        description: { ko: "윤세리와 부대원들이 피크닉을 즐기던 평화로운 억새 평원.", en: "Peaceful silver grass field where Yoon Se-ri and soldiers had a picnic.", ja: "ユン・セリと部隊員たちがピクニックを楽しんだ平和なススキ原野。" },
        query: "충주 비내섬",
        lat: 37.1054,
        lng: 127.7681,
        vipContent: {
            secretMenu: { ko: "밀리터리 캠핑 푸드 박스", en: "Military Camping Food Box", ja: "ミリタリーキャンプフードボックス" },
            ownerTip: { ko: "가을철 억새가 만개할 때 방문하면 인생 샷을 건질 수 있습니다.", en: "Visit in autumn when silver grass is in full bloom for the best shots.", ja: "秋のススキが満開の時に訪問すると、最高のアート写真が撮れます。" }
        }
    },
    {
        id: "busan-4",
        title: { ko: "재벌집 막내아들 '정심재'", en: "Reborn Rich 'Jeongsimjae'", ja: "財閥家の末息子「ジョンシムジェ」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
        rating: 5.0,
        transport: { ko: "2호선 남천역 1번 출구 도보 15분", en: "15 min walk from Namcheon Station Exit 1", ja: "2号線 南川駅 1出口 徒歩15分" },
        description: { ko: "순양 그룹 진양철 회장의 위엄이 느껴지는 웅장한 대저택.", en: "Grand mansion where Sunyang Group Chairman Jin Yang-cheol's majesty is felt.", ja: "スニャングループのチン・ヤンチョル会長の威厳が感じられる壮大な邸宅。" },
        query: "부산 열린행사장",
        lat: 35.1504,
        lng: 129.1124,
        vipContent: {
            secretMenu: { ko: "재벌가 풍의 고급 다도 세트", en: "Conglomerate-style Premium Tea Set", ja: "財閥家風の高級茶道セット" },
            ownerTip: { ko: "실제 부산시장 관사였던 곳으로 내부 정원이 매우 아름답습니다.", en: "Formerly the Busan Mayor's residence, the inner garden is beautiful.", ja: "実際に釜山市長の公舎だった場所で、内部の庭園が非常に美しいです。" }
        }
    },
    {
        id: "incheon-3",
        title: { ko: "도깨비 '한미서점'", en: "Goblin 'Hanmi Bookstore'", ja: "トッケビ「ハンミ書店」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
        rating: 4.8,
        transport: { ko: "1호선 동인천역 4번 출구 도보 10분", en: "10 min walk from Dong-Incheon Station Exit 4", ja: "1号線 東仁川駅 4番出口 徒歩10分" },
        description: { ko: "노란 외벽이 인상적인 도깨비 공유의 단골 서점.", en: "Yellow-walled bookstore frequented by Goblin (Gong Yoo).", ja: "黄色い外壁が印象的なトッケビ(コン・ユ)の行きつけの本屋。" },
        query: "배다리 한미서점",
        lat: 37.4772,
        lng: 126.6348,
        vipContent: {
            secretMenu: { ko: "도깨비 시집 한정판 증정", en: "Goblin Poetry Book Limited Edition", ja: "トッケビ詩集限定版贈呈" },
            ownerTip: { ko: "서점 앞 노란 벽에서 머리를 쓰다듬는 포즈가 원조 포토존입니다.", en: "The head-patting pose in front of the yellow wall is the original shot.", ja: "本屋の前の黄色い壁で頭を撫でるポーズが元祖フォトスポットです。" }
        }
    },
    {
        id: "yongin-1",
        title: { ko: "호텔 델루나 '용인 서일농원'", en: "Hotel Del Luna 'Seoil Farm'", ja: "ホテルデルーナ「龍仁ソイル農園」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1505672678657-cc7037095e60?w=800&q=80",
        rating: 4.7,
        transport: { ko: "용인 버스터미널에서 시내버스 이용", en: "Local bus from Yongin Bus Terminal", ja: "龍仁バスターミナルから市内バス利用" },
        description: { ko: "수많은 장독대가 장관을 이루는 드라마 속 신비로운 장소.", en: "A mysterious place with thousands of traditional jars.", ja: "数え切れないほどの甕(かめ)が壮観をなす劇中の神秘的な場所。" },
        query: "안성 서일농원",
        lat: 37.1044,
        lng: 127.3564,
        vipContent: {
            secretMenu: { ko: "명인의 수제 된장 정식", en: "Master's Handmade Soy Paste Meal", ja: "名人の手作り味噌定食" },
            ownerTip: { ko: "드라마 속 호텔 정원으로 묘사된 숲길을 꼭 걸어보세요.", en: "Make sure to walk through the forest path depicted as the hotel garden.", ja: "ドラマの中でホテルの庭園として描写された森の道をぜひ歩いてみてください。" }
        }
    },
    {
        id: "seoul-11",
        title: { ko: "스타트업 '노들섬'", en: "Start-Up 'Nodeul Island'", ja: "スタートアップ「ノドゥル島」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1549497538-30623643f81c?w=800&q=80",
        rating: 4.8,
        transport: { ko: "9호선 노들역 2번 출구 한강대교 방향 도보 10분", en: "10 min walk from Nodeul Station Exit 2", ja: "9号線 ノドゥル駅 2番出口より漢江大橋方面へ徒歩10分" },
        description: { ko: "샌드박스(IT 실리콘밸리)의 배경이 된 한강 위의 문화 복합 공간.", en: "Culture complex on Han River, the background of 'Sandbox'.", ja: "サンドボックス(ITシリコンバレー)の背景になった漢江上の文化複合空間。" },
        query: "노들섬 샌드박스",
        lat: 37.5175,
        lng: 126.9581,
        vipContent: {
            secretMenu: { ko: "피크닉 매트 및 바스켓 대여 세트", en: "Picnic Mat & Basket Rental Set", ja: "ピクニックマット＆バスケットレンタルセット" },
            ownerTip: { ko: "해 질 무렵 불 켜진 63빌딩을 배경으로 찍는 사진이 예술입니다.", en: "Artistic shots with the 63 Building lights at sunset.", ja: "日が暮れる頃、明かりの灯った63ビルを背景に撮る写真が芸術的です。" }
        }
    },
    {
        id: "gapyeong-1",
        title: { ko: "별에서 온 그대 '쁘띠프랑스'", en: "My Love from the Star 'Petite France'", ja: "星から来たあなた「プチ・フランス」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1493246507139-91e8bef99c1e?w=800&q=80",
        rating: 4.8,
        transport: { ko: "경춘선 가평역에서 가평 관광지 순환버스 이용", en: "Gapyeong Tour Bus from Gapyeong Station", ja: "京春線 加平駅から加平観光地循環バス利用" },
        description: { ko: "도민준과 천송이의 마법 같은 키스 장면이 촬영된 프랑스 마을.", en: "French village where Do Min-jun and Cheon Song-yi's magical kiss was filmed.", ja: "ト・ミンジュンとチョン・ソンイの魔法のようなキスシーンが撮影されたフランス村。" },
        query: "쁘띠프랑스",
        lat: 37.7148,
        lng: 127.4912,
        vipContent: {
            secretMenu: { ko: "어린왕자 오르골 만들기 체험", en: "Little Prince Music Box Craft", ja: "星の王子さまオルゴール作り体験" },
            ownerTip: { ko: "야간 개장 시 전구 조명이 켜지면 동화 속 세계가 펼쳐집니다.", en: "Fairy tale world unfolds when night lights are on.", ja: "夜間開場時、電球の照明が灯ると童話の世界が広がります。" }
        }
    },
    {
        id: "pohang-2",
        title: { ko: "갯마을 차차차 '청하공진시장'", en: "Hometown Cha-Cha-Cha 'Gongjin Market'", ja: "海街チャチャチャ「コンジン市場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1547928576-965be7f5f6a6?w=800&q=80",
        rating: 4.8,
        transport: { ko: "포항역에서 택시 20분 또는 시내버스 이용", en: "20 min taxi from Pohang Station", ja: "浦項駅からタクシー20分または市内バス利用" },
        description: { ko: "홍반장과 윤치과가 만난 따뜻한 어촌 마을의 중심.", en: "The center of the warm fishing village where Chief Hong and Dr. Yoon met.", ja: "ホン班長とユン歯科が出会った温かい漁村の中心。" },
        query: "청하공진시장",
        lat: 36.1852,
        lng: 129.3456,
        vipContent: {
            secretMenu: { ko: "공진시장 오징어 회 한 접시", en: "Fresh Squid Sashimi at Gongjin Market", ja: "コンジン市場のイカ刺し一皿" },
            ownerTip: { ko: "시장 한복판의 오징어 동상 앞에서 찍는 사진이 시그니처입니다.", en: "The squid statue in the market is the signature photo spot.", ja: "市場の真ん中にあるイカの銅像の前で撮る写真がシグネチャーです。" }
        }
    },
    {
        id: "jeju-4",
        title: { ko: "웰컴투 삼달리 '광치기 해변'", en: "Welcome to Samdal-ri 'Gwangchigi Beach'", ja: "サムダルリへようこそ「クァンチギ海岸」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1590603783183-5dadbc038167?w=800&q=80",
        rating: 4.9,
        transport: { ko: "성산일출봉 근처, 201번 버스 이용", en: "Near Seongsan Ilchulbong, use Bus 201", ja: "城山日出峰近く、201番バス利用" },
        description: { ko: "드라마 속 삼달이와 용필이의 추억이 깃든 에메랄드빛 해변.", en: "Emerald beach where Sam-dal and Yong-pil's memories stay.", ja: "劇中のサムダルとヨンピルの思い出が込められたエメラルド色の海岸。" },
        query: "광치기해변",
        lat: 33.4526,
        lng: 126.9324,
        vipContent: {
            secretMenu: { ko: "해녀가 직접 따온 뿔소라 회", en: "Fresh Turban Shell Sashimi by Haenyeo", ja: "海女さんが直接獲ったサザエの刺身" },
            ownerTip: { ko: "간조 때 드러나는 이끼 낀 바위들이 드라마 속 신비로운 분위기를 연출합니다.", en: "Mossy rocks at low tide create the mysterious drama vibe.", ja: "干潮時に現れる苔が生えた岩が劇中の神秘的な雰囲気を演出します。" }
        }
    },
    {
        id: "mungyeong-1",
        title: { ko: "슈룹 '문경새재 오픈세트장'", en: "Under the Queen's Umbrella 'Mungyeong Saejae'", ja: "シュルプ「聞慶セジェオープンセット場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        rating: 4.8,
        transport: { ko: "문경터미널에서 시내버스 이용", en: "Local bus from Mungyeong Terminal", ja: "聞慶ターミナルから市内バス利用" },
        description: { ko: "중전 화령의 카리스마가 넘치던 웅장한 궁궐 세트.", en: "Grand palace set where Queen Im Hwa-ryeong's charisma overflowed.", ja: "中殿ファリョンのカリスマが溢れていた壮大な王宮セット。" },
        query: "문경새재 오픈세트장",
        lat: 36.7621,
        lng: 128.0845,
        vipContent: {
            secretMenu: { ko: "왕실 비법 전통 차 체험", en: "Royal Secret Traditional Tea Experience", ja: "王室秘伝の伝統茶体験" },
            ownerTip: { ko: "광화문 세트 앞은 모든 사극 팬들의 필수 코스입니다.", en: "Gwanghwamun set is a must-visit for all historical drama fans.", ja: "光化門のセット前はすべての時代劇ファンの必須コースです。" }
        }
    },
    {
        id: "iksan-1",
        title: { ko: "7번방의 선물 '익산 교도소 세트장'", en: "Miracle in Cell No. 7 'Iksan Prison Set'", ja: "7番房の贈り物「益山刑務所セット場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1549497538-30623643f81c?w=800&q=80",
        rating: 4.7,
        transport: { ko: "익산역에서 택시 20분 또는 시내버스 이용", en: "20 min taxi from Iksan Station", ja: "益山駅からタクシー20分または市内バス利用" },
        description: { ko: "수많은 영화와 드라마의 교도소 장면이 탄생한 국내 유일의 세트장.", en: "The only prison set in Korea where many movies/dramas were filmed.", ja: "数多くの映画やドラマの刑務所シーンが誕生した国内唯一のセット場。" },
        query: "익산 교도소 세트장",
        lat: 36.0684,
        lng: 127.0512,
        vipContent: {
            secretMenu: { ko: "죄수복 및 교도관복 대여 서비스", en: "Prisoner & Guard Uniform Rental", ja: "囚人服および看守服レンタルサービス" },
            ownerTip: { ko: "면회실 장면을 재현하며 찍는 사진이 가장 인기 있습니다.", en: "Photos recreating the visiting room scenes are most popular.", ja: "面会室のシーンを再現して撮る写真が最も人気があります。" }
        }
    },
    {
        id: "goyang-1",
        title: { ko: "킹더랜드 '일산 원마운트'", en: "King the Land 'One Mount' Goyang", ja: "キング・ザ・ランド「一山ワンマウント」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.8,
        transport: { ko: "3호선 주엽역 2번 출구 도보 10분", en: "10 min walk from Juyeop Station Exit 2", ja: "3号線 注葉駅 2番出口 徒歩10分" },
        description: { ko: "구원과 천사랑의 로맨틱한 데이트 장면이 촬영된 쇼핑 테마파크.", en: "Shopping theme park where Gu Won and Cheon Sa-rang's romantic date was filmed.", ja: "ク・ウォンとチョン・サランのロマンチックなデートシーンが撮影されたショッピングテーマパーク。" },
        query: "원마운트 킹더랜드",
        lat: 37.6654,
        lng: 126.7543,
        vipContent: {
            secretMenu: { ko: "킹더랜드 시그니처 디저트 플래터", en: "King the Land Signature Dessert Platter", ja: "キング・ザ・ランドシグネチャーデザートプラッター" },
            ownerTip: { ko: "회전목마 앞에서의 키스 장면을 재현해보세요.", en: "Recreate the kiss scene in front of the merry-go-round.", ja: "メリーゴーランド前でのキスシーンを再現してみてください。" }
        }
    },
    {
        id: "gangneung-2",
        title: { ko: "쓸쓸하고 찬란하神 - 도깨비 '강릉 영진해변'", en: "Goblin 'Yeongjin Beach' Gangneung", ja: "トッケビ「江陵ヨンジン海岸」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        rating: 4.9,
        transport: { ko: "강릉역에서 택시 20분 또는 300번 버스", en: "20 min taxi or Bus 300 from Gangneung Station", ja: "江陵駅からタクシー20分または300番バス" },
        description: { ko: "김신이 지은탁에게 메밀꽃을 건네던 바로 그 방파제.", en: "The seawall where Kim Shin handed buckwheat flowers to Ji Eun-tak.", ja: "キム・シンがチ・ウンタクにそばの花を渡したまさにその防波堤。" },
        query: "영진해변 도깨비",
        lat: 37.8643,
        lng: 128.8524,
        vipContent: {
            secretMenu: { ko: "메밀꽃 다발 및 빨간 목도리 세트 대여", en: "Buckwheat Flower & Red Scarf Set Rental", ja: "そばの花束と赤いマフラーセットのレンタル" },
            ownerTip: { ko: "파도가 세게 칠 때 찍어야 드라마 속 한 장면처럼 나옵니다.", en: "Take photos when waves are strong for a cinematic feel.", ja: "波が強く打っている時に撮ると、劇中の一場面のように写ります。" }
        }
    },
    {
        id: "naju-1",
        title: { ko: "달의 연인 - 보보경심 려 '나주 영상테마파크'", en: "Moon Lovers: Scarlet Heart Ryeo 'Naju'", ja: "麗〈レイ〉〜花萌ゆる8人の皇子たち〜「羅州映像テーマパーク」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&q=80",
        rating: 4.8,
        transport: { ko: "나주역에서 택시 20분", en: "20 min taxi from Naju Station", ja: "羅州駅からタクシー20分" },
        description: { ko: "고려 시대의 화려함을 그대로 간직한 황실 세트장.", en: "Imperial palace set preserving the splendor of the Goryeo era.", ja: "高麗時代の華やかさをそのまま残した皇室セット場。" },
        query: "나주 영상테마파크",
        lat: 34.9821,
        lng: 126.6543,
        vipContent: {
            secretMenu: { ko: "고려 황실 복식 체험", en: "Goryeo Imperial Costume Experience", ja: "高麗皇室の服飾体験" },
            ownerTip: { ko: "해 질 무렵 성벽 위에서 바라보는 영산강 뷰가 일품입니다.", en: "The sunset view of Yeongsan River from the city wall is superb.", ja: "夕暮れ時、城壁の上から眺める栄山江のビューが絶品です。" }
        }
    },
    {
        id: "damyang-1",
        title: { ko: "역적: 백성을 훔친 도적 '담양 죽녹원'", en: "The Rebel 'Damyang Juknokwon'", ja: "逆賊-民の英雄ホン・ギルドン-「潭陽竹緑苑」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1493246507139-91e8bef99c1e?w=800&q=80",
        rating: 4.9,
        transport: { ko: "광주역에서 311번 버스 이용", en: "Bus 311 from Gwangju Station", ja: "光州駅から311番バス利用" },
        description: { ko: "울창한 대나무 숲 사이로 무협 영화 같은 풍경이 펼쳐지는 곳.", en: "A landscape like a martial arts film amidst thick bamboo forests.", ja: "鬱蒼とした竹林の間に武侠映画のような風景が広がる場所。" },
        query: "담양 죽녹원",
        lat: 35.3254,
        lng: 126.9843,
        vipContent: {
            secretMenu: { ko: "죽로차 및 대나무 아이스크림", en: "Jungno Tea & Bamboo Ice Cream", ja: "竹露茶および竹のアイスクリーム" },
            ownerTip: { ko: "숲 안쪽의 한옥 쉼터는 드라마 속 주인공들이 쉬어가던 장소입니다.", en: "The Hanok shelter inside the forest is where the drama leads rested.", ja: "森の奥にある韓屋の休憩所は、劇中の主人公たちが休んでいた場所です。" }
        }
    },
    {
        id: "namwon-1",
        title: { ko: "미스터 션샤인 '남원 광한루원'", en: "Mr. Sunshine 'Namwon Gwanghanruwon'", ja: "ミスター・サンシャイン「南原広寒楼苑」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
        rating: 4.9,
        transport: { ko: "남원역에서 택시 10분", en: "10 min taxi from Namwon Station", ja: "南原駅からタクシー10分" },
        description: { ko: "야경이 아름다운 전통 정원, 애틋한 멜로의 배경.", en: "Beautiful traditional garden with stunning night views.", ja: "夜景が美しい伝統的な庭園、切ないメロドラマの背景。" },
        query: "남원 광한루원",
        lat: 35.4054,
        lng: 127.3843,
        vipContent: {
            secretMenu: { ko: "전통 한복 스냅 촬영 패키지", en: "Traditional Hanbok Snap Photo Package", ja: "伝統韓服スナップ撮影パッケージ" },
            ownerTip: { ko: "오작교 다리 위에서의 야간 촬영은 인생 샷을 보장합니다.", en: "Night photos on Ojakgyo bridge guarantee perfect shots.", ja: "烏鵲橋の上での夜間撮影は、人生最高の写真を保証します。" }
        }
    },
    {
        id: "gun산-1",
        title: { ko: "8월의 크리스마스 '초원사진관'", en: "Christmas in August 'Chowon Studio'", ja: "八月のクリスマス「草原写真館」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "군산역에서 택시 15분", en: "15 min taxi from Gunsan Station", ja: "群山駅からタクシー15分" },
        description: { ko: "한국 멜로 영화의 고전, 첫사랑의 기억이 머무는 사진관.", en: "A classic Korean romance film location, the studio of first love.", ja: "韓国メロ映画の古典、初恋の記憶が残る写真館。" },
        query: "군산 초원사진관",
        lat: 35.9845,
        lng: 126.7123,
        vipContent: {
            secretMenu: { ko: "영화 컨셉 흑백 사진 촬영", en: "Movie Concept B&W Photo Session", ja: "映画コンセプトのモノクロ写真撮影" },
            ownerTip: { ko: "사진관 내부의 아날로그 카메라 컬렉션을 구경해보세요.", en: "Check out the analog camera collection inside.", ja: "写真館内部のアナログカメラコレクションをぜひご覧ください。" }
        }
    },
    {
        id: "suwon-3",
        title: { ko: "그 해 우리는 '수원 지동벽화마을'", en: "Our Beloved Summer 'Jidong Mural Village'", ja: "その年、私たちは「水原池洞壁画村」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "수원역에서 11, 13번 버스", en: "Bus 11, 13 from Suwon Station", ja: "水原駅から11、13番バス" },
        description: { ko: "웅이와 연수의 풋풋한 시절이 그려진 아기자기한 골목.", en: "Cute alleys depicting Choi Woong and Yeon-su's youth.", ja: "ウンとヨンスの初々しい時代が描かれたこじまわりとした路地。" },
        query: "지동벽화마을",
        lat: 37.2812,
        lng: 127.0254,
        vipContent: {
            secretMenu: { ko: "드라마 굿즈 한정판 마스킹 테이프", en: "Drama Goods Limited Masking Tape", ja: "ドラマグッズ限定版マスが" },
            ownerTip: { ko: "미로 같은 골목길 사이 숨겨진 카페 '웅이네'를 찾아보세요.", en: "Find the hidden cafe 'Woong's' between the alleys.", ja: "迷路のような路地の間にある隠れたカフェ「ウンの家」を探してみてください。" }
        }
    },
    {
        id: "paju-3",
        title: { ko: "기생충 '돼지슈퍼'", en: "Parasite 'Doijee Supermarket'", ja: "パラサイト「テジスーパー」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80",
        rating: 4.7,
        transport: { ko: "아현역 3번 출구 도보 10분", en: "10 min walk from Ahyeon Station Exit 3", ja: "阿峴駅 3番出口 徒歩10分" },
        description: { ko: "영화 '기생충'의 시작점, 기우가 과외 제안을 받던 바로 그 슈퍼.", en: "The starting point of 'Parasite', where Ki-woo got the tutor offer.", ja: "映画「パラサイト」の起点、ギウが家庭教師の提案を受けたまさにそのスーパー。" },
        query: "우리슈퍼 기생충",
        lat: 37.5584,
        lng: 126.9532,
        vipContent: {
            secretMenu: { ko: "영화 속 소품 '복숭아' 컨셉 젤리", en: "Movie Prop 'Peach' Concept Jelly", ja: "劇中の小道具「桃」コンセプトのゼリー" },
            ownerTip: { ko: "현재도 실제로 운영하는 동네 슈퍼입니다. 조용히 관람해주세요.", en: "It's an operational local supermarket. Please visit quietly.", ja: "現在も実際に営業している近所のスーパーです。静かに見学してください。" }
        }
    },
    {
        id: "seoul-12",
        title: { ko: "사랑의 불시착 '울프강 스테이크하우스'", en: "Crash Landing on You 'Wolfgang Steakhouse'", ja: "愛の不時着「ウルフギャング・ステーキハウス」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=800&q=80",
        rating: 4.9,
        transport: { ko: "수인분당선 압구정로데오역 4번 출구 도보 5분", en: "5 min walk from Apgujeong Rodeo Station Exit 4", ja: "水仁盆唐線 狎鴎亭ロデオ駅 4番出口 徒歩5分" },
        description: { ko: "윤세리가 남한에서의 럭셔리한 일상을 보내던 스테이크 하우스.", en: "The steakhouse where Yoon Se-ri enjoyed her luxury life in the South.", ja: "ユン・セリが韓国でのラグジュアリーな日常を過ごしていたステーキハウス。" },
        query: "울프강 스테이크하우스 청담",
        lat: 37.5245,
        lng: 127.0412,
        vipContent: {
            secretMenu: { ko: "드라마 속 '세리's 피크' 최고급 스테이크 세트", en: "Seri's Pick Premium Steak Set", ja: "劇中の「セリズ・ピック」最高級ステーキセット" },
            ownerTip: { ko: "창가 좌석은 예약이 매우 치열하므로 1개월 전 예약을 권장합니다.", en: "Window seats are highly competitive, book 1 month ahead.", ja: "窓側の席は予約が非常に激しいため、1ヶ月前の予約をお勧めします。" }
        }
    },
    {
        id: "cheonan-1",
        title: { ko: "선재 업고 튀어 '단국대 천안캠퍼스'", en: "Lovely Runner 'Dankook Univ. Cheonan'", ja: "ソンジェ背負って走れ「檀国大学 天安キャンパス」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30eb2?w=800&q=80",
        rating: 4.8,
        transport: { ko: "천안역에서 11번 버스 이용", en: "Bus 11 from Cheonan Station", ja: "天安駅から11番バス利用" },
        description: { ko: "선재와 솔의 대학 캠퍼스 로맨스가 그려진 아름다운 호수 캠퍼스.", en: "The beautiful lake campus where Sun-jae and Sol's university romance began.", ja: "ソンジェとソルの大学キャンパスでのロマンスが描かれた美しい湖のキャンパス。" },
        query: "단국대 천안캠퍼스 선재",
        lat: 36.8324,
        lng: 127.1743,
        vipContent: {
            secretMenu: { ko: "학생 식당 드라마 테마 점심권", en: "Drama-themed Lunch Ticket", ja: "学生食堂ドラマテーマのランチ券" },
            ownerTip: { ko: "호수 주변 산책로는 봄철 벚꽃 명소로도 매우 유명합니다.", en: "The lake trail is very famous for cherry blossoms.", ja: "湖周辺の散歩道は春の桜の名所としても非常に有名です。" }
        }
    },
    {
        id: "jeju-5",
        title: { ko: "우리들의 블루스 '금능해수욕장'", en: "Our Blues 'Geumneung Beach'", ja: "私たちのブルース「金陵海水浴場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1544551763-47a01596a209?w=800&q=80",
        rating: 4.9,
        transport: { ko: "제주공항에서 202번 버스", en: "Bus 202 from Jeju Airport", ja: "済州空港から202番バス" },
        description: { ko: "드라마 속 해녀들과 상인들의 삶이 녹아있는 아름다운 제주 해변.", en: "Beautiful Jeju beach where the lives of haenyeo and merchants are melted.", ja: "劇中の海女さんたちと商人たちの人生が溶け込んでいる美しい済州の海岸。" },
        query: "금능해수욕장",
        lat: 33.3912,
        lng: 126.2354,
        vipContent: {
            secretMenu: { ko: "로컬 해물 뚝배기 VIP 할인권", en: "Local Seafood Stew VIP Discount", ja: "地元の海物トゥッペギVIP割引券" },
            ownerTip: { ko: "비양도가 정면으로 보이는 모래사장 쪽이 베스트 포토 스팟입니다.", en: "The beach facing Biyangdo is the best photo spot.", ja: "飛揚島が正面に見える砂浜側がベストフォトスポットです。" }
        }
    },
    {
        id: "ongjin-1",
        title: { ko: "오징어 게임 '백아도(가상의 섬)'", en: "Squid Game 'Baegado' (Fictional)", ja: "イカゲーム「白亜島(仮想の島)」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
        rating: 4.7,
        transport: { ko: "인천 연안여객터미널에서 배편 이용 (승봉도/덕적도 인근)", en: "Ferry from Incheon Port (Near Seungbongdo)", ja: "仁川沿岸旅客ターミナルから船便利用(昇鳳島/徳積島近辺)" },
        description: { ko: "드라마의 압도적인 긴장감이 느껴지는 서해의 신비로운 섬 풍경.", en: "Mysterious island landscape of the West Sea with intense tension.", ja: "ドラマの圧倒的な緊張感が感じられる西海の神秘的な島の風景。" },
        query: "옹진군 백아도",
        lat: 37.0654,
        lng: 125.9843,
        vipContent: {
            secretMenu: { ko: "오징어 게임 마스크 기념품 세트", en: "Squid Game Mask Souvenir Set", ja: "イカゲームマスク記念品セット" },
            ownerTip: { ko: "실제 촬영이 이루어진 장소는 환경 보호 구역이므로 주의가 필요합니다.", en: "Protected area filming site, please be careful.", ja: "実際に撮影が行われた場所は環境保護区域ですので、注意が必要です。" }
        }
    },
    {
        id: "busan-5",
        title: { ko: "마이네임 '부산 영도대교'", en: "My Name 'Yeongdodaegyo Bridge' Busan", ja: "マイネーム「釜山影島大橋」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.8,
        transport: { ko: "부산역에서 택시 10분 또는 1호선 남포역", en: "10 min taxi or Nampo Station (Line 1)", ja: "釜山駅からタクシー10分または1号線 南浦駅" },
        description: { ko: "화려한 액션과 어두운 누아르 감성이 공존하는 부산의 랜드마크.", en: "Busan landmark where flashy action and dark noir vibes coexist.", ja: "華やかなアクションとダークなノワールの感性が共存する釜山のランドマーク。" },
        query: "영도대교",
        lat: 35.0934,
        lng: 129.0365,
        vipContent: {
            secretMenu: { ko: "영도대교 배경 수제 위스키", en: "Yeongdodaegyo Handmade Whisky", ja: "影島大橋背景の手作りウィスキー" },
            ownerTip: { ko: "매일 오후 2시 도개(다리가 들리는) 시간에 맞추어 방문해보세요.", en: "Visit at 2 PM to see the bridge lift.", ja: "毎日午後2時、跳開(橋が持ち上がる)時間に合わせて訪問してみてください。" }
        }
    },
    {
        id: "gapyeong-2",
        title: { ko: "킹더랜드 '가평 아침고요수목원'", en: "King the Land 'The Garden of Morning Calm'", ja: "キング・ザ・「加平アチムゴヨ樹木園」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1493246507139-91e8bef99c1e?w=800&q=80",
        rating: 4.9,
        transport: { ko: "가평역에서 셔틀버스 이용", en: "Shuttle bus from Gapyeong Station", ja: "加平駅からシャトルバス利用" },
        description: { ko: "환상적인 꽃들이 가득한 정원에서 펼쳐진 로맨틱한 고백 장면.", en: "Romantic confession scene in a garden full of fantastic flowers.", ja: "幻想的な花々が咲き誇る庭園で繰り広げられたロマンチックな告白シーン。" },
        query: "아침고요수목원",
        lat: 37.7431,
        lng: 127.3524,
        vipContent: {
            secretMenu: { ko: "수목원 테마 향수 체험", en: "Arboretum Perfume Experience", ja: "樹木園テーマの香水体験" },
            ownerTip: { ko: "야간 오색별빛정원전 기간에 방문하면 드라마보다 더 아름답습니다.", en: "The night light festival is even more beautiful than the drama.", ja: "夜間の五色星の光庭園展の期間に訪問すると、ドラマよりも美しいです。" }
        }
    },
    {
        id: "paju-4",
        title: { ko: "사이코지만 괜찮아 '파주 소설원'", en: "It's Okay to Not Be Okay 'Soseolwon'", ja: "サイコだけど大丈夫「坡州ソソルウォン」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
        rating: 4.8,
        transport: { ko: "파주 출판단지 내, 합정역에서 2200번 버스", en: "In Paju Book City, Bus 2200 from Hapjeong", ja: "坡州出版団地内。合井駅から2200番バス" },
        description: { ko: "고문영 작가의 기묘한 저택을 연상시키는 신비로운 건축물.", en: "Mysterious architecture reminiscent of Ko Moon-young's mansion.", ja: "コ・ムニョン作家の奇な邸宅を連想させる神秘的な建築物。" },
        query: "파주 소설원",
        lat: 37.7123,
        lng: 126.6843,
        vipContent: {
            secretMenu: { ko: "고문영 컨셉 블랙 티 세트", en: "Ko Moon-young Black Tea Set", ja: "コ・ムニョンコンセプトのブラックティーセット" },
            ownerTip: { ko: "출판단지 고유의 조용한 분위기 속에서 독서를 즐기기 좋습니다.", en: "Great for quiet reading in Paju Book City.", ja: "出版団地特有の静かな雰囲気の中で読書を楽しむのに最適です。" }
        }
    },
    {
        id: "uijeongbu-1",
        title: { ko: "그 해 우리는 '의정부 가톨릭대학교'", en: "Our Beloved Summer 'Uijeongbu Catholic Univ.'", ja: "その年、私たちは「議政府カトリック大学」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1549497538-30623643f81c?w=800&q=80",
        rating: 4.7,
        transport: { ko: "1호선 망월사역 도보 15분", en: "15 min walk from Mangwolsa Station", ja: "1号線 望月寺駅 徒歩15分" },
        description: { ko: "웅이와 연수의 학창 시절 인터뷰 배경이 된 고풍스러운 캠퍼스.", en: "Classic campus where Woong and Yeon-su had their interviews.", ja: "ウンとヨンスの学生時代のインタビューの背景になった古風なキャンパス。" },
        query: "신한대학교 의정부캠퍼스 (구 가톨릭대)",
        lat: 37.7012,
        lng: 127.0543,
        vipContent: {
            secretMenu: { ko: "대학 시절 도시락 컨셉 밀키트", en: "Univ. Lunchbox Concept Meal Kit", ja: "大学時代のお弁当コンセプトのミールキット" },
            ownerTip: { ko: "캠퍼스 중앙 분수대 앞이 드라마 최고의 명당 자리입니다.", en: "The central fountain is the best spot.", ja: "キャンパス中央の噴水前がドラマ最高のロケーションです。" }
        }
    },
    {
        id: "filming-51",
        title: { ko: "환혼 '양평 두물머리'", en: "Alchemy of Souls 'Yangpyeong'", ja: "還魂「揚平ドゥムルモリ」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
        rating: 4.9,
        transport: { ko: "양수역 도보 15분", en: "15 min walk from Yangsu Station", ja: "両水駅から徒歩15分" },
        description: { ko: "신비로운 분위기의 무협 판타지 촬영지.", en: "Mysterious martial arts fantasy filming site.", ja: "神秘的な雰囲気の 武侠ファンタジー撮影地." },
        query: "양평 두물머리",
        lat: 37.5562,
        lng: 127.3275,
        vipContent: {
            secretMenu: { ko: "두물머리 연핫도그", en: "Lotus Hotdog", ja: "ドゥムルモリ蓮ホットドッグ" },
            ownerTip: { ko: "물안개가 피어오르는 새벽 풍경이 드라마의 한 장면 같습니다.", en: "The misty dawn scenery is like a scene from the drama.", ja: "川霧の立ち込める明け方の風景が、ドラマの一場面のようです。" }
        }
    },
    {
        id: "filming-52",
        title: { ko: "궁 '경희궁'", en: "Princess Hours 'Gyeonghuigung'", ja: "宮(クン)「慶熙宮」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        rating: 4.8,
        transport: { ko: "서대문역 도보 10분", en: "10 min walk from Seodaemun Station", ja: "西大門駅から徒歩10分" },
        description: { ko: "황실 판타지를 완벽하게 재현한 경희궁 세트.", en: "Gyeonghuigung set perfectly reproducing historical fantasy.", ja: "皇室ファンタジーを完璧に再現した慶熙宮セット。" },
        query: "경희궁",
        lat: 37.5714,
        lng: 126.9681,
        vipContent: {
            secretMenu: { ko: "황실 다도 세트", en: "Imperial Tea Set", ja: "皇室茶道セット" },
            ownerTip: { ko: "고즈넉한 분위기에서 한복 사진 촬영하기 가장 좋은 곳입니다.", en: "Best place for Hanbok photoshoot in a quiet vibe.", ja: "静かな雰囲気の中で韓服写真を撮るのに最適な場所です。" }
        }
    },
    {
        id: "filming-53",
        title: { ko: "시크릿 가든 '여주 마임비전빌리지'", en: "Secret Garden 'Maiim Vision Village'", ja: "シークレット・ガーデン「マイムビジョンビレッジ」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
        rating: 4.9,
        transport: { ko: "여주역 택시 20분", en: "20 min taxi from Yeoju Station", ja: "驪州駅からタクシー20分" },
        description: { ko: "김주원의 럭셔리한 대저택이 있는 아름다운 공간.", en: "Beautiful space featuring Kim Joo-won's luxury mansion.", ja: "キム・ジュウォンのラグジュアリーな大邸宅がある美しい空間。" },
        query: "마임비전빌리지",
        lat: 37.2912,
        lng: 127.6345,
        vipContent: {
            secretMenu: { ko: "드라마 속 블루벨벳 칵테일", en: "Blue Velvet Cocktail", ja: "劇中のブルーベルベットカクテル" },
            ownerTip: { ko: "정원 곳곳의 조형물과 건축물이 매우 예술적입니다.", en: "Sculptures and architecture in the garden are very artistic.", ja: "庭園のあちこちの造形物と建築物が非常に芸術的です。" }
        }
    },
    {
        id: "filming-54",
        title: { ko: "눈물의 여왕 '문경 사극세트장'", en: "Queen of Tears 'Mungyeong Set'", ja: "涙の女王「聞慶(ムンギョン)時代劇セット場」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&q=80",
        rating: 4.8,
        transport: { ko: "문경터미널 셔틀 이용", en: "Shuttle from Mungyeong Terminal", ja: "聞慶ターミナルからシャトル利用" },
        description: { ko: "백현우와 홍해인의 감동적인 서사가 녹아있습니다.", en: "Filled with Baek Hyun-woo and Hong Hae-in's epic story.", ja: "ペ・ヒョヌとホン・ヘインの感動的な叙事詩が込められています。" },
        query: "문경 사극세트장",
        lat: 36.7612,
        lng: 128.0834,
        vipContent: {
            secretMenu: { ko: "눈물의 여왕 굿즈 티켓", en: "Queen of Tears Goods Ticket", ja: "涙の女王グッズチケット" },
            ownerTip: { ko: "촬영 시 사용된 소품들이 전시되어 있어 구경하는 재미가 쏠쏠합니다.", en: "Exhibited props used in filming are fun to see.", ja: "撮影時に使用された小道具が展示されており、見学する楽しみがあります。" }
        }
    },
    {
        id: "filming-55",
        title: { ko: "태양의 후예 '삼탄아트마인'", en: "Descendants of the Sun 'Samtan'", ja: "太陽の末裔「サムタンアートマイン」" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.8,
        transport: { ko: "고한역 택시 10분", en: "10 min taxi from Gohan Station", ja: "古汗駅からタクシー10分" },
        description: { ko: "우르크 부대의 강인함이 느껴지는 폐광 예술 공간.", en: "Art space in a closed mine reflecting Uruk base strength.", ja: "ウルク部隊の強靭さが感じられる廃坑の芸術空間。" },
        query: "삼탄아트마인",
        lat: 37.2145,
        lng: 128.8524,
        vipContent: {
            secretMenu: { ko: "광부 도시락", en: "Miner's Lunchbox", ja: "鉱夫のお弁当" },
            ownerTip: { ko: "송중기 배우의 사인이 있는 전시장 앞이 최고 명당입니다.", en: "In front of Song Joong-ki's signed display is the best spot.", ja: "ソン・ジュンギ俳優のサインがある展示場の前が最高のロケーションです。" }
        }
    }
];
