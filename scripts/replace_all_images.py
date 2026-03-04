"""Replace all K-Gem spot images with copyright-free Wikimedia Commons images."""
import re, os, sys

# Force UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

IMAGE_MAP = {
    # SEOUL - travel
    "seoul-attr-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/%EA%B2%BD%EB%B3%B5%EA%B6%81_%EC%A0%84%EA%B2%BD.jpg/960px-%EA%B2%BD%EB%B3%B5%EA%B6%81_%EC%A0%84%EA%B2%BD.jpg",
    "seoul-attr-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Lotte_World_Tower%2C_Seoul_%282019%29.jpg/800px-Lotte_World_Tower%2C_Seoul_%282019%29.jpg",
    "seoul-attr-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-attr-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/%EC%B0%BD%EB%8D%95%EA%B6%81_%EC%A0%84%EA%B2%BD_%282012%29.jpg/960px-%EC%B0%BD%EB%8D%95%EA%B6%81_%EC%A0%84%EA%B2%BD_%282012%29.jpg",
    "seoul-attr-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/The_War_Memorial_Of_Korea_240615_02.jpg/960px-The_War_Memorial_Of_Korea_240615_02.jpg",
    "seoul-attr-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg/960px-National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg",
    "seoul-attr-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Banpo_Bridge_Moonlight_Rainbow_Fountain.jpg/960px-Banpo_Bridge_Moonlight_Rainbow_Fountain.jpg",
    "seoul-attr-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cheong_Wa_Dae_%28Blue_House%29_2022.jpg/960px-Cheong_Wa_Dae_%28Blue_House%29_2022.jpg",
    "seoul-attr-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1%EB%82%99%EC%82%B0%EA%B5%AC%EA%B0%84.jpg/960px-%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1%EB%82%99%EC%82%B0%EA%B5%AC%EA%B0%84.jpg",
    "seoul-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Seoul_Olympic_Park_from_Lotte_World_Tower.jpg/960px-Seoul_Olympic_Park_from_Lotte_World_Tower.jpg",
    # SEOUL - beauty
    "seoul-beauty-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gangnam_Seoul_Skincare_Clinic.jpg/800px-Gangnam_Seoul_Skincare_Clinic.jpg",
    "seoul-beauty-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/800px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-beauty-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gangnam_district_Seoul_Korea_2019.jpg/800px-Gangnam_district_Seoul_Korea_2019.jpg",
    "seoul-beauty-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gangnam_district_Seoul_Korea_2019.jpg/800px-Gangnam_district_Seoul_Korea_2019.jpg",
    "seoul-beauty-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg/800px-Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg",
    "seoul-beauty-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gangnam_district_Seoul_Korea_2019.jpg/800px-Gangnam_district_Seoul_Korea_2019.jpg",
    "seoul-beauty-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg/800px-Garosu-gil_street%2C_Sinsa-dong%2C_Seoul_%2825490948756%29.jpg",
    "seoul-beauty-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cheongdam-dong_Seoul_Korea.jpg/800px-Cheongdam-dong_Seoul_Korea.jpg",
    "seoul-beauty-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gangnam_district_Seoul_Korea_2019.jpg/800px-Gangnam_district_Seoul_Korea_2019.jpg",
    "seoul-beauty-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cheongdam-dong_Seoul_Korea.jpg/800px-Cheongdam-dong_Seoul_Korea.jpg",
    # SEOUL - food
    "seoul-food-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "seoul-food-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Korean.food-Samgyeopsal-Gogi-gui-01.jpg/800px-Korean.food-Samgyeopsal-Gogi-gui-01.jpg",
    "seoul-food-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Korean.food-Manduguk-01.jpg/800px-Korean.food-Manduguk-01.jpg",
    "seoul-food-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Korean.food-Dolsot.bap-01.jpg/800px-Korean.food-Dolsot.bap-01.jpg",
    "seoul-food-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Korean_food-Shabu_shabu-01.jpg/800px-Korean_food-Shabu_shabu-01.jpg",
    "seoul-food-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "seoul-food-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "seoul-food-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Korean.food-Bossam-01.jpg/800px-Korean.food-Bossam-01.jpg",
    "seoul-food-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Gwangjang_Market_Seoul.jpg/800px-Gwangjang_Market_Seoul.jpg",
    "seoul-food-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Euljiro_street_Seoul.jpg/800px-Euljiro_street_Seoul.jpg",
    # SEOUL - dessert/cafe
    "seoul-cafe-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-cafe-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-cafe-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-cafe-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-cafe-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Itaewon_Seoul_Korea.jpg/800px-Itaewon_Seoul_Korea.jpg",
    "seoul-cafe-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seongsu-dong_Seoul_2019.jpg/800px-Seongsu-dong_Seoul_2019.jpg",
    "seoul-cafe-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Hapjeong_Seoul_Korea.jpg/800px-Hapjeong_Seoul_Korea.jpg",
    "seoul-cafe-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seongsu-dong_Seoul_2019.jpg/800px-Seongsu-dong_Seoul_2019.jpg",
    "seoul-cafe-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mapo-gu_Seoul.jpg/800px-Mapo-gu_Seoul.jpg",
    "seoul-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    # SEOUL - activity/experience
    "seoul-exp-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg/800px-Hongdae_Street_-_Seoul%2C_South_Korea_%287348498614%29.jpg",
    "seoul-exp-2": "https://upload.wikimedia.org/wikipedia/commons/4/40/Tongin_Market_2018-06-17-18-28-59.jpg",
    "seoul-exp-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg/960px-National_Museum_of_Korea%2C_Seoul_%282%29_%2840236586235%29.jpg",
    "seoul-exp-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg/960px-View_of_Ikseon-dong_from_National_Tax_Service_Jongno_District_Office.jpg",
    "seoul-exp-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seongsu-dong_Seoul_2019.jpg/800px-Seongsu-dong_Seoul_2019.jpg",
    "seoul-exp-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg/960px-KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg",
    "seoul-exp-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%EB%B3%84%EB%A7%88%EB%8B%B9%EB%8F%84%EC%84%9C%EA%B4%803.jpg/960px-%EB%B3%84%EB%A7%88%EB%8B%B9%EB%8F%84%EC%84%9C%EA%B4%803.jpg",
    "seoul-exp-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Raccoon_-_melbourne_zoo.jpg/640px-Raccoon_-_melbourne_zoo.jpg",
    "seoul-exp-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Han_River_Seoul_Korea.jpg/800px-Han_River_Seoul_Korea.jpg",
    "seoul-exp-10": "https://upload.wikimedia.org/wikipedia/commons/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg",
    # SEOUL - filming
    "seoul-film-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/N_Seoul_Tower_2015.jpg/640px-N_Seoul_Tower_2015.jpg",
    "seoul-film-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg/960px-Bukchon_Hanok_Village_%EB%B6%81%EC%B4%8C_%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_October_1_2020_15.jpg",
    "seoul-film-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Han_River_Seoul_Korea.jpg/800px-Han_River_Seoul_Korea.jpg",
    "seoul-film-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Itaewon_Seoul_Korea.jpg/800px-Itaewon_Seoul_Korea.jpg",
    "seoul-film-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Dongdaemun_Design_Plaza_%28DDP%29_2019.jpg/800px-Dongdaemun_Design_Plaza_%28DDP%29_2019.jpg",
    "seoul-film-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cheong_gye_stream_seoul.jpg/800px-Cheong_gye_stream_seoul.jpg",
    "seoul-film-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Yonsei_University_Underwood_hall.jpg/800px-Yonsei_University_Underwood_hall.jpg",
    "seoul-film-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gwanghwamun_Square_Seoul.jpg/800px-Gwanghwamun_Square_Seoul.jpg",
    "seoul-film-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Insadong_Seoul_Korea.jpg/800px-Insadong_Seoul_Korea.jpg",
    "seoul-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg/960px-KOCIS_Korea_Seoul_Fortress_20130924_11_%289910956885%29.jpg",

    # BUSAN - travel
    "busan-attr-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/960px-Haeundae_Beach_in_Busan.jpg",
    "busan-attr-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/960px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-attr-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/%ED%95%B4%EB%8F%99%EC%9A%A9%EA%B6%81%EC%82%AC_%EC%82%AC%EC%B0%B0_%EC%A0%84%EA%B2%BD.jpg/960px-%ED%95%B4%EB%8F%99%EC%9A%A9%EA%B6%81%EC%82%AC_%EC%82%AC%EC%B0%B0_%EC%A0%84%EA%B2%BD.jpg",
    "busan-attr-4": "https://upload.wikimedia.org/wikipedia/ko/thumb/b/b9/P080713002.jpg/960px-P080713002.jpg",
    "busan-attr-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Taejongdae-03.jpg/960px-Korea-Busan-Taejongdae-03.jpg",
    "busan-attr-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Songdo_Yonggung_Bridae_Busan.jpg/800px-Songdo_Yonggung_Bridae_Busan.jpg",
    "busan-attr-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Centum_City%2C_Busan%2C_2014-12-28.jpg/960px-Centum_City%2C_Busan%2C_2014-12-28.jpg",
    "busan-attr-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/960px-Jagalchi_Market_20200523_019.jpg",
    "busan-attr-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Oryuk-do.jpg/960px-Oryuk-do.jpg",
    "busan-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/BIFF_Square_Nampo-dong_Busan.jpg/800px-BIFF_Square_Nampo-dong_Busan.jpg",
    # BUSAN - food
    "busan-food-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "busan-food-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pizza-3007395.jpg/800px-Pizza-3007395.jpg",
    "busan-food-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Korean_food-Nakgopse-01.jpg/800px-Korean_food-Nakgopse-01.jpg",
    "busan-food-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Eomuk_fish_cake.jpg/800px-Eomuk_fish_cake.jpg",
    "busan-food-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Korean_milmyeon_cold_noodles.jpg/800px-Korean_milmyeon_cold_noodles.jpg",
    "busan-food-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Korean.food-Daegutang-01.jpg/800px-Korean.food-Daegutang-01.jpg",
    "busan-food-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Korean_Fried_Chicken.jpg/800px-Korean_Fried_Chicken.jpg",
    "busan-food-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jagalchi_Market_20200523_019.jpg/960px-Jagalchi_Market_20200523_019.jpg",
    "busan-food-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Gwangandaegyo-night.jpg/800px-Korea-Busan-Gwangandaegyo-night.jpg",
    "busan-food-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    # BUSAN - beauty
    "busan-beauty-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Shinsegae_Department_Store_Centum_City_Busan.jpg/800px-Shinsegae_Department_Store_Centum_City_Busan.jpg",
    "busan-beauty-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-beauty-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-beauty-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-beauty-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/960px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/960px-Haeundae_Beach_in_Busan.jpg",
    "busan-beauty-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Shinsegae_Department_Store_Centum_City_Busan.jpg/800px-Shinsegae_Department_Store_Centum_City_Busan.jpg",
    "busan-beauty-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Geumjeong_Mountain_Busan.jpg/800px-Geumjeong_Mountain_Busan.jpg",
    "busan-beauty-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-beauty-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Shinsegae_Department_Store_Centum_City_Busan.jpg/800px-Shinsegae_Department_Store_Centum_City_Busan.jpg",
    # BUSAN - dessert/cafe
    "busan-cafe-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gijang_county_Busan.jpg/800px-Gijang_county_Busan.jpg",
    "busan-cafe-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Songjeong_beach_Busan.jpg/800px-Songjeong_beach_Busan.jpg",
    "busan-cafe-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Yeongdo_Island_Busan.jpg/800px-Yeongdo_Island_Busan.jpg",
    "busan-cafe-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Yeongdo_Island_Busan.jpg/800px-Yeongdo_Island_Busan.jpg",
    "busan-cafe-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Haeundae_beach_Busan_Korea.jpg/800px-Haeundae_beach_Busan_Korea.jpg",
    "busan-cafe-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Haeundae_beach_Busan_Korea.jpg/800px-Haeundae_beach_Busan_Korea.jpg",
    "busan-cafe-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Busan_Station_Korea.jpg/800px-Busan_Station_Korea.jpg",
    "busan-cafe-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/F1963_Busan.jpg/800px-F1963_Busan.jpg",
    "busan-cafe-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Yeongdo_Island_Busan.jpg/800px-Yeongdo_Island_Busan.jpg",
    # BUSAN - activity/experience
    "busan-exp-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Haeundae_Beach_in_Busan.jpg/960px-Haeundae_Beach_in_Busan.jpg",
    "busan-exp-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Busan_City_Haeundae_District_%2801%29.jpg/960px-Busan_City_Haeundae_District_%2801%29.jpg",
    "busan-exp-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Songdo_cable_car_Busan_Korea.jpg/800px-Songdo_cable_car_Busan_Korea.jpg",
    "busan-exp-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Gwangandaegyo-night.jpg/800px-Korea-Busan-Gwangandaegyo-night.jpg",
    "busan-exp-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Songjeong_beach_Busan.jpg/800px-Songjeong_beach_Busan.jpg",
    "busan-exp-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg/960px-Gamcheon_Colored_Houses%2C_Busan%2C_Korea.jpg",
    "busan-exp-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/KOCIS_Korean_meal_table_%284553953910%29.jpg/800px-KOCIS_Korean_meal_table_%284553953910%29.jpg",
    "busan-exp-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Paragliding_in_South_Korea.jpg/800px-Paragliding_in_South_Korea.jpg",
    "busan-exp-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pupyeong_Market_entrance.jpg/960px-Pupyeong_Market_entrance.jpg",
    "busan-exp-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Busan_Tower_and_Yongdusan_Park_20200522_003.jpg/960px-Busan_Tower_and_Yongdusan_Park_20200522_003.jpg",
    # BUSAN - filming
    "busan-film-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Yeongdo_Island_Busan.jpg/800px-Yeongdo_Island_Busan.jpg",
    "busan-film-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gijang_county_Busan.jpg/800px-Gijang_county_Busan.jpg",
    "busan-film-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Busan_City_Haeundae_District_%2801%29.jpg/960px-Busan_City_Haeundae_District_%2801%29.jpg",
    "busan-film-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Busan_Station_Korea.jpg/800px-Busan_Station_Korea.jpg",
    "busan-film-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Haeundae_beach_Busan_Korea.jpg/800px-Haeundae_beach_Busan_Korea.jpg",
    "busan-film-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Dadaepo_Beach_sunset_Busan.jpg/800px-Dadaepo_Beach_sunset_Busan.jpg",
    "busan-film-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Korea-Busan-Gwangandaegyo-night.jpg/800px-Korea-Busan-Gwangandaegyo-night.jpg",
    "busan-film-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gijang_county_Busan.jpg/800px-Gijang_county_Busan.jpg",
    "busan-film-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Seomyeon_Busan_Korea.jpg/800px-Seomyeon_Busan_Korea.jpg",
    "busan-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Busan_Station_Korea.jpg/800px-Busan_Station_Korea.jpg",

    # JEJU - travel
    "jeju-attr-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg",
    "jeju-attr-2": "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-attr-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/960px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg",
    "jeju-attr-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Udo_%28satellite_image%29.jpg/960px-Udo_%28satellite_image%29.jpg",
    "jeju-attr-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Sinchang_wind_power_Jeju.jpg/800px-Sinchang_wind_power_Jeju.jpg",
    "jeju-attr-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg/960px-%EB%A7%8C%EC%9E%A5%EA%B5%B4_%2824%29.jpg",
    "jeju-attr-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg/960px-Korea-Jeju-Cheonjiyeon_Waterfall-01.jpg",
    "jeju-attr-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Camellia_Hill_Jeju_South_Korea.jpg/800px-Camellia_Hill_Jeju_South_Korea.jpg",
    "jeju-attr-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Bijarim_Forest.jpg/960px-Bijarim_Forest.jpg",
    "jeju-attr-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Jeju_Stone_Park_2019.jpg/800px-Jeju_Stone_Park_2019.jpg",
    # JEJU - food
    "jeju-food-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jeju_gogi_guksu_pork_noodle_soup.jpg/800px-Jeju_gogi_guksu_pork_noodle_soup.jpg",
    "jeju-food-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jeonbok_gui_grilled_abalone_Korean_food.jpg/800px-Jeonbok_gui_grilled_abalone_Korean_food.jpg",
    "jeju-food-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Korean.food-Samgyeopsal-Gogi-gui-01.jpg/800px-Korean.food-Samgyeopsal-Gogi-gui-01.jpg",
    "jeju-food-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Grilled_largehead_hairtail_Korea.jpg/800px-Grilled_largehead_hairtail_Korea.jpg",
    "jeju-food-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Gimbap_Korean_food.jpg/800px-Gimbap_Korean_food.jpg",
    "jeju-food-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korean_pork_soup_%28sundae_gukbap%29.jpg/800px-Korean_pork_soup_%28sundae_gukbap%29.jpg",
    "jeju-food-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gimnyeong_beach_Jeju.jpg/800px-Gimnyeong_beach_Jeju.jpg",
    "jeju-food-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Hyeopjae_beach_Jeju_Korea.jpg/800px-Hyeopjae_beach_Jeju_Korea.jpg",
    # JEJU - beauty
    "jeju-beauty-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lotte_Hotel_Jeju_exterior.jpg/800px-Lotte_Hotel_Jeju_exterior.jpg",
    "jeju-beauty-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Herb_garden_Jeju_Korea.jpg/800px-Herb_garden_Jeju_Korea.jpg",
    "jeju-beauty-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seogwipo_coast_Jeju.jpg/800px-Seogwipo_coast_Jeju.jpg",
    "jeju-beauty-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seogwipo_coast_Jeju.jpg/800px-Seogwipo_coast_Jeju.jpg",
    "jeju-beauty-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seogwipo_coast_Jeju.jpg/800px-Seogwipo_coast_Jeju.jpg",
    "jeju-beauty-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jungmun_resort_complex_Jeju.jpg/800px-Jungmun_resort_complex_Jeju.jpg",
    "jeju-beauty-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jeju_city_Korea.jpg/800px-Jeju_city_Korea.jpg",
    "jeju-beauty-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jeju_city_Korea.jpg/800px-Jeju_city_Korea.jpg",
    "jeju-beauty-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jeju_city_Korea.jpg/800px-Jeju_city_Korea.jpg",
    "jeju-beauty-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jeju_city_Korea.jpg/800px-Jeju_city_Korea.jpg",
    # JEJU - dessert/cafe
    "jeju-cafe-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-cafe-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-cafe-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-cafe-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Hamdeok_beach_Jeju.jpg/800px-Hamdeok_beach_Jeju.jpg",
    "jeju-cafe-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jungmun_resort_complex_Jeju.jpg/800px-Jungmun_resort_complex_Jeju.jpg",
    "jeju-cafe-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Jusangjeolli_Cliff_Jeju.jpg/800px-Jusangjeolli_Cliff_Jeju.jpg",
    "jeju-cafe-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sanbangsan_Jeju.jpg/800px-Sanbangsan_Jeju.jpg",
    "jeju-cafe-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-cafe-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Hyeopjae_beach_Jeju_Korea.jpg/800px-Hyeopjae_beach_Jeju_Korea.jpg",
    "jeju-cafe-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seogwipo_coast_Jeju.jpg/800px-Seogwipo_coast_Jeju.jpg",
    # JEJU - activity/experience
    "jeju-exp-1": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-exp-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yongnuni_oreum_Jeju_island.jpg/800px-Yongnuni_oreum_Jeju_island.jpg",
    "jeju-exp-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/%EC%97%90%EB%B2%84%EB%9E%9C%EB%93%9C_%EA%B4%80%EB%9E%8C%EC%B0%A8_%EC%A0%95%EC%9B%90_2025.jpg/960px-%EC%97%90%EB%B2%84%EB%9E%9C%EB%93%9C_%EA%B4%80%EB%9E%8C%EC%B0%A8_%EC%A0%95%EC%9B%90_2025.jpg",
    "jeju-exp-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jungmun_resort_complex_Jeju.jpg/800px-Jungmun_resort_complex_Jeju.jpg",
    "jeju-exp-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2015%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%84%9C%EC%9A%B8%EB%9E%9C%EB%93%9C_%EC%A0%84%EA%B2%BD_DSC09925.jpg/960px-2015%EB%85%84_5%EC%9B%94_5%EC%9D%BC_%EC%84%9C%EC%9A%B8%EB%9E%9C%EB%93%9C_%EC%A0%84%EA%B2%BD_DSC09925.jpg",
    "jeju-exp-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bunker_de_Lumieres_Jeju_Korea.jpg/800px-Bunker_de_Lumieres_Jeju_Korea.jpg",
    "jeju-exp-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-exp-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jungmun_resort_complex_Jeju.jpg/800px-Jungmun_resort_complex_Jeju.jpg",
    "jeju-exp-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Ilchul-ro%2C_Seongsan-eup%2C_Seogwipo-si%2C_Jeju-do%2C_South_Korea_-_panoramio_-_song_songroov.jpg/960px-Ilchul-ro%2C_Seongsan-eup%2C_Seogwipo-si%2C_Jeju-do%2C_South_Korea_-_panoramio_-_song_songroov.jpg",
    "jeju-exp-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yongnuni_oreum_Jeju_island.jpg/800px-Yongnuni_oreum_Jeju_island.jpg",
    # JEJU - filming
    "jeju-film-1": "https://upload.wikimedia.org/wikipedia/commons/c/c7/%EC%A0%9C%EC%A3%BC%EB%8F%84_%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80.jpeg",
    "jeju-film-2": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg/960px-%EC%84%B1%EC%82%B0%EC%9D%BC%EC%B6%9C%EB%B4%89_%EC%B2%9C%EC%97%B0%EB%B3%B4%ED%98%B8%EA%B5%AC%EC%97%AD_2019%EB%85%84_%EC%B4%AC%EC%98%81%28%EC%B6%9C%EC%B2%98_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EB%8C%80%EB%B3%80%EC%9D%B8%EC%8B%A4%29.jpg",
    "jeju-film-3": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Aewol_Jeju_coast.jpg/800px-Aewol_Jeju_coast.jpg",
    "jeju-film-4": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Seogwipo_coast_Jeju.jpg/800px-Seogwipo_coast_Jeju.jpg",
    "jeju-film-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sanbangsan_Jeju.jpg/800px-Sanbangsan_Jeju.jpg",
    "jeju-film-6": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Yongnuni_oreum_Jeju_island.jpg/800px-Yongnuni_oreum_Jeju_island.jpg",
    "jeju-film-7": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gimnyeong_beach_Jeju.jpg/800px-Gimnyeong_beach_Jeju.jpg",
    "jeju-film-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Camellia_Hill_Jeju_South_Korea.jpg/800px-Camellia_Hill_Jeju_South_Korea.jpg",
    "jeju-film-9": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sanbangsan_Jeju.jpg/800px-Sanbangsan_Jeju.jpg",
    "jeju-film-10": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Sinchang_wind_power_Jeju.jpg/800px-Sinchang_wind_power_Jeju.jpg",
}

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "data", "spots")


def replace_images_in_file(filepath, image_map):
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    replacements = 0
    for spot_id, new_url in image_map.items():
        # Match the id field then find the image field anywhere in the same object
        # Strategy: locate the string `"id": "spot_id"` then find next `"image": "..."` within ~2000 chars
        id_pattern = '"id": "' + spot_id + '"'
        pos = content.find(id_pattern)
        if pos == -1:
            continue  # spot not in this file

        # Find the image field after this position (within same JSON object ~2000 chars)
        search_chunk = content[pos:pos+2500]
        img_match = re.search(r'"image":\s*"([^"]*)"', search_chunk)
        if img_match:
            old_url = img_match.group(1)
            if old_url != new_url:
                abs_start = pos + img_match.start(1)
                abs_end   = pos + img_match.end(1)
                content = content[:abs_start] + new_url + content[abs_end:]
                print(f"  OK [{spot_id}]")
                replacements += 1
    return content, replacements


def main():
    files = {
        "seoul": os.path.join(DATA_DIR, "seoul.ts"),
        "busan": os.path.join(DATA_DIR, "busan.ts"),
        "jeju":  os.path.join(DATA_DIR,  "jeju.ts"),
    }
    total = 0
    for city, path in files.items():
        print(f"\n=== {city.upper()} ===")
        new_content, count = replace_images_in_file(path, IMAGE_MAP)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  => {count} image(s) updated")
        total += count
    print(f"\nDone. Total replacements: {total}")


if __name__ == "__main__":
    main()
