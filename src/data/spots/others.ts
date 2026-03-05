import { TravelSpot } from "../../types/spot";

export const otherSpots: TravelSpot[] = [
    {
        "id": "incheon-songdo-central",
        "title": { "ko": "송도 센트럴파크", "en": "Songdo Central Park", "ja": "松島セントラルパーク" },
        "category": "travel",
        "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        "rating": 4.8,
        "description": {
            "ko": "인천 송도의 상징적인 공원 맛집으로, 수상 택시와 아름다운 야경 투어를 즐길 수 있는 최고의 산책 코스이자 맛집 데이트 코스입니다.",
            "en": "Incheon Songdo's iconic park with water taxis and beautiful night views.",
            "ja": "仁川松島の象徴的な公園で、水上タクシーと美しい夜景を楽しめます。"
        },
        "query": { "ko": "인천 송도 센트럴파크 맛집 야경 데이트", "en": "Songdo Central Park", "ja": "松島セントラルパーク" },
        "region": { "ko": "인천 송도", "en": "Songdo, Incheon", "ja": "仁川松島" },
        "lat": 37.3927,
        "lng": 126.6391,
        "price": 0
    },
    {
        "id": "incheon-chinatown",
        "title": { "ko": "인천 차이나타운", "en": "Incheon Chinatown", "ja": "仁川チャイナタウン" },
        "category": "food",
        "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        "rating": 4.5,
        "description": {
            "ko": "짜장면의 발상지로 유명한 역사적인 동네 맛집입니다. 백짜장, 공갈빵 등 다양한 중식 맛집과 감성 카페가 가득한 인천 대표 맛집 구역입니다.",
            "en": "The birthplace of Jjajangmyeon, filled with historic Chinese restaurants.",
            "ja": "ジャジャン麺の発祥地として有名な歴史的な街です。様々な中華料理店가並んでいます。"
        },
        "query": { "ko": "인천 차이나타운 맛집 중국집 짜장면 카페", "en": "Incheon Chinatown", "ja": "仁川チャイナタウン" },
        "region": { "ko": "인천 중구", "en": "Jung-gu, Incheon", "ja": "仁川中区" },
        "lat": 37.4759,
        "lng": 126.6171,
        "price": 0
    },
    {
        "id": "suwon-hwaseong",
        "title": { "ko": "수원 화성", "en": "Suwon Hwaseong Fortress", "ja": "水原華城" },
        "category": "travel",
        "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        "rating": 4.9,
        "description": {
            "ko": "유네스코 세계문화유산으로 지정된 아름다운 성곽길이자 수원 대표 볼거리 맛집입니다. 주변에 수원 왕갈비 통닭거리 맛집들이 가깝습니다.",
            "en": "A beautiful fortress wall designated as a UNESCO World Heritage site.",
            "ja": "ユネスコ世界文化遺산に指定された美しい城郭の道です。"
        },
        "query": { "ko": "수원 화성 성곽길 맛집 통닭거리 왕갈비", "en": "Suwon Hwaseong Fortress", "ja": "水原華城" },
        "region": { "ko": "수원 팔달구", "en": "Paldal-gu, Suwon", "ja": "水原八達区" },
        "lat": 37.2882,
        "lng": 127.0135,
        "price": 0
    },
    {
        "id": "suwon-haenggung",
        "title": { "ko": "수원 행리단길", "en": "Haengnidan-gil", "ja": "ヘンリ단길" },
        "category": "dessert",
        "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        "rating": 4.7,
        "description": {
            "ko": "수원 화성 옆 개성 넘치는 감성 카페와 골목 맛집들이 모여 있는 핫플레이스 맛집 지역입니다. 행궁동 맛집 투어로 유명합니다.",
            "en": "A hot place near Hwaseong Fortress with unique cafes and alley restaurants.",
            "ja": "水原華城の隣にある、個性豊かなカフェと路地裏の名店が集まるホットプレイスです。"
        },
        "query": { "ko": "수원 행리단길 카페 맛집 행궁동 감성", "en": "Haengnidan-gil", "ja": "ヘン리단길" },
        "region": { "ko": "수원 행궁동", "en": "Haenggung-dong, Suwon", "ja": "水原行宮洞" },
        "lat": 37.2844,
        "lng": 127.0145,
        "price": 0
    },
    {
        "id": "incheon-wolmido",
        "title": { "ko": "월미도 테마파크", "en": "Wolmido Theme Park", "ja": "月尾島テーマパーク" },
        "category": "activity",
        "image": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        "rating": 4.2,
        "description": {
            "ko": "인천 바다 바지락 칼국수와 조개구이 맛집이 즐비한 테마파크 월미도입니다. 디스코팡팡도 유명한 인싸 맛집 구역입니다.",
            "en": "A theme park with various rides set against the backdrop of the Incheon Sea.",
            "ja": "仁川の海를 배경으로, 다양한 어트랙션을 즐길 수 있는 테마파크입니다."
        },
        "query": { "ko": "인천 월미도 맛집 조개구이 칼국수", "en": "Wolmido", "ja": "月尾島" },
        "region": { "ko": "인천 중구", "en": "Jung-gu, Incheon", "ja": "仁川中区" },
        "lat": 37.4719,
        "lng": 126.5968,
        "price": 0
    }
];