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
        vipContent: {
            // ... 생략 (중간 데이터들에도 유사하게 price 추가 예정, 전체 파일 교체는 위험하므로 핵심 부분만 샘플링하여 교체하거나 multi_replace 사용)
            secretMenu: { ko: "히든 칵테일 '블루 상수'", en: "Hidden Cocktail 'Blue Sangsu'", ja: "裏カクテル「ブルー 상수」" },
            ownerTip: { ko: "오너가 직접 추천하는 소수 정예 명당 자리가 있습니다.", en: "There is a secret elite seat recommended by the owner.", ja: "オーナーが直接おすすめする少数精鋭の特等席があります。" },
            status: { ko: "실시간 혼잡도 40% (쾌적)", en: "40% Busy (Spacious)", ja: "リアルタイム混雑度40% (快適)" }
        }
    },
    {
        id: "seoul-2",
        title: { ko: "경복궁 달빛 산책", en: "Gyeongbokgung Moonlight Walk", ja: "景福宮月明かりの散보" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        rating: 4.8,
        transport: { ko: "3호선 경복궁역 5번 출구 연결", en: "Directly connected to Gyeongbokgung Station Exit 5 (Line 3)", ja: "3号線 景福宮駅 5番出口 直結" },
        description: { ko: "조선 왕조의 위엄과 밤의 고요함이 만나는 아름다운 궁궐 산책로.", en: "A beautiful palace walk where Joseon majesty meets night tranquility.", ja: "朝鮮王朝の威厳と夜の静寂가 融合する美しい王宮の散歩道。" },
        query: "경복궁 별빛야행",
        vipContent: {
            secretMenu: { ko: "야간 관람 전용 '비밀 정자' 위치", en: "Location of 'Secret Pavilion' for Night View", ja: "夜間観覧専用「秘密の東屋」の場所" },
            ownerTip: { ko: "한복 착용 시 입구 근처의 숨겨진 포토존을 이용하세요.", en: "Use the hidden photo spot near the entrance when wearing Hanbok.", ja: "韓服着용의 際、入口近くの隠れたフォトスポットを利用してください。" }
        },
        price: 3000
    },
    {
        id: "seoul-3",
        title: { ko: "북촌 한옥마을 '도깨비' 촬영지", en: "Bukchon Village 'Goblin' House", ja: "北村韓屋村「トッケビ」の촬영지" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=800&q=80",
        rating: 4.7,
        transport: { ko: "3호선 안국역 2번 출구 도보 10분", en: "10 min walk from Anguk Station Exit 2 (Line 3)", ja: "3号線 安国駅 2番出口 徒歩10分" },
        description: { ko: "드라마 '도깨비'의 신비로운 정원이 있는 서양식 주택.", en: "Western-style house with a mysterious garden from 'Goblin'.", ja: "ドラマ「トッケビ」の神秘的な庭園がある洋風住宅。" },
        query: "중앙고등학교",
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
        transport: { ko: "7호선 청담역 9번 출구 도보 3분", en: "3 min walk from Cheongdam Station Exit 9 (Line 7)", ja: "7号線 清潭駅 9番出口 徒歩3분" },
        description: { ko: "국내 최정상급 아티스트들이 애용하는 0.1% 프라이빗 테라피 공간.", en: "0.1% private therapy space used by top artists in Korea.", ja: "国内最高峰のアーティストが愛用する0.1%プライベートセラピー空間。" },
        query: "청담동 스파",
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
        transport: { ko: "경의중앙선 문산역에서 택시 10분/버스 92번", en: "10 min taxi or Bus 92 from Munsan Stn", ja: "京義中央線 文山駅からタクシー10分/バス92番" },
        description: { ko: "유시진 대위가 머물던 군부대 느낌의 카페와 문화지구.", en: "Cultural district and cafe with the military base vibe from the drama.", ja: "ユ・シジン大尉が滞在した軍部隊のような雰囲気のカフェと文化地区。" },
        query: "파주 캠프그리브스",
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
        vipContent: {
            secretMenu: { ko: "심야 한정 '귀신 이야기' 도슨트", en: "Late-night 'Ghost Story' Docent", ja: "深夜限定「お化けの話」ドニセント" },
            ownerTip: { ko: "비오는 날 방문하면 안개 낀 한옥의 독보적인 분위기를 촬영할 수 있습니다.", en: "Visit on rainy days for unique fog-covered Hanok vibes.", ja: "雨の日に訪問すると、霧に包まれた韓屋の独創的な雰囲気を撮影できます。" }
        }
    },

    // --- GANGWON (강원) ---
    {
        id: "gangwon-1",
        title: { ko: "주문진 '도깨비' 방사제", en: "Jumunjin 'Goblin' Seawall", ja: "注文津「トッケビ」防波堤" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        rating: 4.9,
        transport: { ko: "강릉역에서 300번 버스 또는 택시 20분", en: "Bus 300 or 20 min taxi from Gangneung Stn", ja: "江陵駅から300番バスまたはタクシー20分" },
        description: { ko: "공유와 김고은이 처음 만난 전설적인 촬영지.", en: "The legendary site where Gong Yoo and Kim Go-eun first met.", ja: "コン・ユとキム・ゴウンが初めて出会った伝説の撮影地。" },
        query: "주문진 방사제",
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
        transport: { ko: "평창역에서 마중 서비스 요청 가능 (예약 필수)", en: "Pickup service from Pyeongchang Stn (Booking required)", ja: "平昌駅から迎えサービスリクエスト可能(要予約)" },
        description: { ko: "해발 700m 청정 숲에서 즐기는 로컬 식재료 다이닝.", en: "Dining with local ingredients in a clean forest at 700m altitude.", ja: "海抜700mの清浄な森で楽しむ地元の食材を使ったダイニング。" },
        query: "평창 숲속 식당",
        vipContent: {
            secretMenu: { ko: "오직 산지 직송 산나물 페스토 파스타", en: "Direct-from-Source Wild Herb Pesto Pasta", ja: "産地直送の山菜ジェノベーゼパスタ" },
            ownerTip: { ko: "오너가 직접 안내하는 뒷산 시크릿 산책 코스가 일품입니다.", en: "The owner-guided secret hiking trail behind the restaurant is superb.", ja: "オーナーが直接案内する裏山のシークレット散歩コースが絶品입니다." }
        }
    },

    // --- CHUNGNAM (충남) ---
    {
        id: "chungnam-1",
        title: { ko: "논산 '미스터 션샤인' 션샤인랜드", en: "Nonsan 'Mr. Sunshine' Sunshine Land", ja: "論山「ミスター・サンシャイン」サンシャインランド" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
        rating: 4.8,
        transport: { ko: "논산역에서 택시 15분 또는 212번 버스", en: "15 min taxi or Bus 212 from Nonsan Stn", ja: "論山駅からタクシー15분 또는 212番バス" },
        description: { ko: "구한말 격동의 시대를 완벽하게 재현한 영화관 같은 세트장.", en: "A movie-like set perfectly replicating the turbulent era of late Joseon.", ja: "旧韓末の激動の時代を完璧に再現した映画館のようなセット。" },
        query: "션샤인랜드 논산",
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
        vipContent: {
            secretMenu: { ko: "포장 전용 스페셜 대용량 박스", en: "Special Large Box for Take-out", ja: "持ち帰り専用スペシャル大容量ボックス" },
            ownerTip: { ko: "줄이 길 때는 시장 안쪽 2호점을 이용하는 것이 숨겨진 꿀팁입니다.", en: "Use the 2nd branch inside the market when lines are long.", ja: "行列が長い時は、市場の内側にある2号店を利用するのが隠れたコツです。" }
        }
    }
];
