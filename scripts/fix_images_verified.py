"""Replace spot images with VERIFIED existing Wikimedia Commons URLs."""
import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

# Only well-known, verified Wikimedia Commons images
# Format: spot_id -> url
VERIFIED = {
    # === SEOUL ===
    "seoul-attr-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Gyeongbokgung%2C_Seoul%2C_Korea.jpg/1280px-Gyeongbokgung%2C_Seoul%2C_Korea.jpg",
    "seoul-attr-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lotte_World_Tower_%28Seoul%2C_Korea%29.jpg/800px-Lotte_World_Tower_%28Seoul%2C_Korea%29.jpg",
    "seoul-attr-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-attr-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/%EC%B0%BD%EB%8D%95%EA%B6%81_%EC%A0%84%EA%B2%BD_%282012%29.jpg/1024px-%EC%B0%BD%EB%8D%95%EA%B6%81_%EC%A0%84%EA%B2%BD_%282012%29.jpg",
    "seoul-attr-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/The_War_Memorial_of_Korea.jpg/1280px-The_War_Memorial_of_Korea.jpg",
    "seoul-attr-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/National_Museum_of_Korea.jpg/1280px-National_Museum_of_Korea.jpg",
    "seoul-attr-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Banpo_Bridge_rainbow_fountain_side.jpg/1280px-Banpo_Bridge_rainbow_fountain_side.jpg",
    "seoul-attr-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Cheongwadae_2022.jpg/1280px-Cheongwadae_2022.jpg",
    "seoul-attr-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1%EB%82%99%EC%82%B0%EA%B5%AC%EA%B0%84.jpg/1280px-%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1%EB%82%99%EC%82%B0%EA%B5%AC%EA%B0%84.jpg",
    "seoul-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Seoul_from_N_Seoul_Tower.jpg/1280px-Seoul_from_N_Seoul_Tower.jpg",

    "seoul-beauty-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-beauty-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg/1280px-Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg",
    "seoul-beauty-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg/1280px-Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg",
    "seoul-beauty-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",
    "seoul-beauty-10":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg/1280px-Gangnam-gu%2C_Seoul%2C_South_Korea_%28Unsplash%29.jpg",

    "seoul-food-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg/1280px-Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg",
    "seoul-food-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Korean.food-Samgyeopsal-Gogi-gui-01.jpg/1280px-Korean.food-Samgyeopsal-Gogi-gui-01.jpg",
    "seoul-food-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Korean.food-Kalguksu-01.jpg/1280px-Korean.food-Kalguksu-01.jpg",
    "seoul-food-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Korean.food-Dolsot.bap-01.jpg/1280px-Korean.food-Dolsot.bap-01.jpg",
    "seoul-food-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Korean_food-Shabu_shabu-01.jpg/1280px-Korean_food-Shabu_shabu-01.jpg",
    "seoul-food-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg/1280px-Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg",
    "seoul-food-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg/1280px-Korean_Pork_Bone_Soup_%28Gamjatang%29.jpg",
    "seoul-food-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Korean.food-Bossam-01.jpg/1280px-Korean.food-Bossam-01.jpg",
    "seoul-food-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Gwangjang_Market_01.jpg/1280px-Gwangjang_Market_01.jpg",
    "seoul-food-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Korean_food-Golbaengi_muchim-01.jpg/1280px-Korean_food-Golbaengi_muchim-01.jpg",

    "seoul-cafe-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-cafe-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-cafe-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-cafe-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-cafe-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Itaewon_Seoul.jpg/1280px-Itaewon_Seoul.jpg",
    "seoul-cafe-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-cafe-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-cafe-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-cafe-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",

    "seoul-exp-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-exp-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Tongin_Market_Seoul.jpg/1280px-Tongin_Market_Seoul.jpg",
    "seoul-exp-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/National_Museum_of_Korea.jpg/1280px-National_Museum_of_Korea.jpg",
    "seoul-exp-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-exp-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/1280px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-exp-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg/960px-KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg",
    "seoul-exp-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%EB%B3%84%EB%A7%88%EB%8B%B9%EB%8F%84%EC%84%9C%EA%B4%803.jpg/960px-%EB%B3%84%EB%A7%88%EB%8B%B9%EB%8F%84%EC%84%9C%EA%B4%803.jpg",
    "seoul-exp-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Raccoon_-_melbourne_zoo.jpg/640px-Raccoon_-_melbourne_zoo.jpg",
    "seoul-exp-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Banpo_Bridge_rainbow_fountain_side.jpg/1280px-Banpo_Bridge_rainbow_fountain_side.jpg",
    "seoul-exp-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg/1280px-KOCIS_Korean_meal_table_%284553953910%29.jpg",

    "seoul-film-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/N_Seoul_Tower_2015.jpg/800px-N_Seoul_Tower_2015.jpg",
    "seoul-film-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-film-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Banpo_Bridge_rainbow_fountain_side.jpg/1280px-Banpo_Bridge_rainbow_fountain_side.jpg",
    "seoul-film-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Itaewon_Seoul.jpg/1280px-Itaewon_Seoul.jpg",
    "seoul-film-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dongdaemun_Design_Plaza_%28DDP%29%2C_Seoul%2C_Korea.jpg/1280px-Dongdaemun_Design_Plaza_%28DDP%29%2C_Seoul%2C_Korea.jpg",
    "seoul-film-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cheong_gye_stream_seoul.jpg/1280px-Cheong_gye_stream_seoul.jpg",
    "seoul-film-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Yonsei_University_Underwood_hall.jpg/1280px-Yonsei_University_Underwood_hall.jpg",
    "seoul-film-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gwanghwamun_Gate.jpg/1280px-Gwanghwamun_Gate.jpg",
    "seoul-film-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg/960px-KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg",

    # === BUSAN ===
    "busan-attr-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-attr-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-attr-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/%ED%95%B4%EB%8F%99%EC%9A%A9%EA%B6%81%EC%82%AC_%EC%82%AC%EC%B0%B0_%EC%A0%84%EA%B2%BD.jpg/960px-%ED%95%B4%EB%8F%99%EC%9A%A9%EA%B6%81%EC%82%AC_%EC%82%AC%EC%B0%B0_%EC%A0%84%EA%B2%BD.jpg",
    "busan-attr-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-attr-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-attr-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Songdo_cable_car_Busan.jpg/1280px-Songdo_cable_car_Busan.jpg",
    "busan-attr-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Centum_City%2C_Busan%2C_2014-12-28.jpg/1280px-Centum_City%2C_Busan%2C_2014-12-28.jpg",
    "busan-attr-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1280px-Jagalchi_Market_20200523_019.jpg",
    "busan-attr-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Oryuk-do.jpg/1280px-Oryuk-do.jpg",
    "busan-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1280px-Jagalchi_Market_20200523_019.jpg",

    "busan-food-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "busan-food-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Korean_food-Nakgopse-01.jpg/1280px-Korean_food-Nakgopse-01.jpg",
    "busan-food-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Korean_food-Nakgopse-01.jpg/1280px-Korean_food-Nakgopse-01.jpg",
    "busan-food-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1280px-Jagalchi_Market_20200523_019.jpg",
    "busan-food-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Korean_food-Naengmyeon-01.jpg/1280px-Korean_food-Naengmyeon-01.jpg",
    "busan-food-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Korean.food-Daegutang-01.jpg/1280px-Korean.food-Daegutang-01.jpg",
    "busan-food-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Korean.food-Samgyeopsal-Gogi-gui-01.jpg/1280px-Korean.food-Samgyeopsal-Gogi-gui-01.jpg",
    "busan-food-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1280px-Jagalchi_Market_20200523_019.jpg",
    "busan-food-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-food-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",

    "busan-beauty-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Centum_City%2C_Busan%2C_2014-12-28.jpg/1280px-Centum_City%2C_Busan%2C_2014-12-28.jpg",
    "busan-beauty-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Centum_City%2C_Busan%2C_2014-12-28.jpg/1280px-Centum_City%2C_Busan%2C_2014-12-28.jpg",
    "busan-beauty-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-beauty-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Centum_City%2C_Busan%2C_2014-12-28.jpg/1280px-Centum_City%2C_Busan%2C_2014-12-28.jpg",

    "busan-cafe-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-cafe-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-cafe-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-cafe-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-cafe-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-cafe-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-cafe-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-cafe-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-cafe-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",

    "busan-exp-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-exp-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-exp-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Songdo_cable_car_Busan.jpg/1280px-Songdo_cable_car_Busan.jpg",
    "busan-exp-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-exp-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-exp-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-exp-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg/1280px-KOCIS_Korean_meal_table_%284553953910%29.jpg",
    "busan-exp-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-exp-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/1280px-Jagalchi_Market_20200523_019.jpg",
    "busan-exp-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Busan_Tower_and_Yongdusan_Park_20200522_003.jpg/960px-Busan_Tower_and_Yongdusan_Park_20200522_003.jpg",

    "busan-film-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-film-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-film-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-film-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-film-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-film-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/1280px-Haeundae_Beach_in_Busan.jpg",
    "busan-film-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-film-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/1280px-Korea-Busan-Taejongdae-03.jpg",
    "busan-film-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gwangan_Bridge_Busan_Korea.jpg/1280px-Gwangan_Bridge_Busan_Korea.jpg",
    "busan-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/1280px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",

    # === JEJU ===
    "jeju-attr-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-thumbnail.jpg",
    "jeju-attr-2":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-attr-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-attr-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-thumbnail.jpg",
    "jeju-attr-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-attr-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg/960px-%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg",
    "jeju-attr-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-attr-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-attr-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Bijarim_Forest.jpg/960px-Bijarim_Forest.jpg",
    "jeju-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",

    "jeju-food-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg/1280px-KOCIS_Korean_meal_table_%284553953910%29.jpg",
    "jeju-food-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Korean.food-Samgyeopsal-Gogi-gui-01.jpg/1280px-Korean.food-Samgyeopsal-Gogi-gui-01.jpg",
    "jeju-food-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg/1280px-KOCIS_Korean_meal_table_%284553953910%29.jpg",
    "jeju-food-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Korean-Gimbap.jpg/1280px-Korean-Gimbap.jpg",
    "jeju-food-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/1280px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-9":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-food-10": "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",

    "jeju-beauty-1":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-beauty-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-beauty-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-beauty-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-beauty-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-beauty-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-beauty-7":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-beauty-8":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-beauty-9":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-beauty-10": "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",

    "jeju-cafe-1":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-cafe-2":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-cafe-3":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-cafe-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-cafe-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-cafe-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg/960px-%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg",
    "jeju-cafe-7":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-cafe-8":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-cafe-9":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",

    "jeju-exp-1":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-exp-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-exp-3":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-exp-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-exp-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-exp-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg/960px-%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg",
    "jeju-exp-7":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-exp-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-exp-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-thumbnail.jpg",
    "jeju-exp-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",

    "jeju-film-1":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-film-2":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-thumbnail.jpg",
    "jeju-film-3":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-film-4":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-film-5":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-film-6":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-film-7":  "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-film-8":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Bijarim_Forest.jpg/960px-Bijarim_Forest.jpg",
    "jeju-film-9":  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
}

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "data", "spots")


def replace_images(filepath, image_map):
    with open(filepath, encoding="utf-8") as f:
        content = f.read()
    replacements = 0
    for spot_id, new_url in image_map.items():
        id_pattern = '"id": "' + spot_id + '"'
        pos = content.find(id_pattern)
        if pos == -1:
            continue
        chunk = content[pos:pos+3000]
        m = re.search(r'"image":\s*"([^"]*)"', chunk)
        if m:
            old = m.group(1)
            if old != new_url:
                s = pos + m.start(1)
                e = pos + m.end(1)
                content = content[:s] + new_url + content[e:]
                print(f"  OK [{spot_id}]")
                replacements += 1
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return replacements


def main():
    files = {
        "seoul": os.path.join(DATA_DIR, "seoul.ts"),
        "busan": os.path.join(DATA_DIR, "busan.ts"),
        "jeju":  os.path.join(DATA_DIR, "jeju.ts"),
    }
    total = 0
    for city, path in files.items():
        print(f"\n=== {city.upper()} ===")
        n = replace_images(path, VERIFIED)
        print(f"  => {n} updated")
        total += n
    print(f"\nDone. Total: {total}")


if __name__ == "__main__":
    main()
