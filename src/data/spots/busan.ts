import { TravelSpot } from "../../types/spot";

export const busanSpots: TravelSpot[] = [
    {
        id: "busan-1",
        title: { ko: "?´ìš´?€ ?œí¬ë¦??¤ì…˜ë·?ë°?'?Œë„'", en: "Haeundae Secret Ocean View Bar 'Pado'", ja: "æµ·é›²?°ã‚·?¼ã‚¯?¬ãƒƒ?ˆã‚ª?¼ã‚·?£ãƒ³?“ãƒ¥?¼ãƒ?¼ã€Œæ³¢?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.9,
        transport: { ko: "2?¸ì„  ?´ìš´?€??5ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Haeundae Station Exit 5 (Line 2)", ja: "2?·ç·š æµ·é›²?°é§… 5?ªå‡º??å¾’æ?10ë¶? },
        description: { ko: "ê´€ê´‘ê°?€ ëª¨ë¥´???˜ì‹œ???¸ê·¼???¨ê²¨ì§??„ìŠ¤??ë°?", en: "A hidden whisky bar near LCT that tourists don't know about.", ja: "è¦³å…‰å®¢ã¯?¥ã‚‰?ªã„LCTè¿‘ã??š ?Œå??¦ã‚£?¹ã‚­?¼ãƒ?¼ã€? },
        query: { ko: "?´ìš´?€ ?¨ì? ? ì§‘", en: "Haeundae Beach Busan", ja: "æµ·é›²???œå±±" },
        lat: 35.1587,
        lng: 129.1603,
        vipContent: {
            secretMenu: { ko: "ë¶€??ë°¤ë°”???œê·¸?ˆì²˜ ì¹µí…Œ??, en: "Busan Night Sea Signature Cocktail", ja: "?œå±±??¤œ??µ·?·ê·¸?¤ì²˜?«ã‚¯?†ãƒ«" },
            ownerTip: { ko: "?¤í›„ 8???´ì „ ë°©ë¬¸ ??ê°€???„ë¦„?¤ìš´ ?¸ì„??ë³????ˆìŠµ?ˆë‹¤.", en: "Visit before 8 PM for the most beautiful sunset views.", ja: "?ˆå¾Œ8?‚å‰?«è¨ª?ã™?‹ã¨?æ??‚ç¾?—ã„å¤•ç„¼?‘ã‚’è¦‹ã‚‹?“ã¨?Œã§?ã¾?™ã€? }
        },
        price: 35000
    },
    {
        id: "busan-2",
        title: { ko: "?ë„ ?°ì—¬??ë¬¸í™”ë§ˆì„ 'ë³€?¸ì¸' ì´¬ì˜ì§€", en: "Huinnyeoul Village 'The Attorney' Set", ja: "å½±å³¶?’ãƒ³?¨ã‚¦?«æ–‡?–æ‘?Œå¼è­·äºº?æ’®å½±åœ°" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1590603783183-5dadbc038167?w=800&q=80",
        rating: 4.6,
        transport: { ko: "ë¶€?°ì—­?ì„œ 508ë²?ë²„ìŠ¤ ?´ìš©, ?°ì—¬?¸ë¬¸?”ë§ˆ???˜ì°¨", en: "Bus 508 from Busan Station, get off at Huinnyeoul Village", ja: "?œå±±é§…ã‹??08?ªãƒ?¹åˆ©?¨ã€ãƒ’?³ãƒ¨?¦ãƒ«?‡åŒ–?‘ä¸‹è»? },
        description: { ko: "ë°”ë‹¤ ë²¼ë‘ ê³¨ëª©ê¸¸ì„ ?°ë¼ ê±·ëŠ” ?í™” ê°™ì? ?ê²½.", en: "Cinematic scenery walking along the sea cliff alleys.", ja: "æµ·ã®å´–ã®è£è·¯?°ã«æ²¿ã£????æ˜ ?»ã®?ˆã†?ªé¢¨??€? },
        query: { ko: "?°ì—¬?¸ë¬¸?”ë§ˆ??, en: "The Attorney", ja: "å½±å³¶?’ãƒ³?¨ã‚¦?«æ–‡?–æ‘å¼è?äººæ’®å½±åœ°" },
        lat: 35.0784,
        lng: 129.0435,
        vipContent: {
            secretMenu: { ko: "ì´¬ì˜ì§€ ë°°ê²½ ?œì •???½ì„œ ?¸íŠ¸", en: "Limited Edition Film Location Postcards", ja: "??½±?°èƒŒ??®?å®š?ˆãƒ?¹ãƒˆ?«ãƒ¼?‰ã‚»?ƒãƒˆ" },
            ownerTip: { ko: "ê´€ê´??ˆë‚´???¤í¸??ì¢ì? ê³„ë‹¨ ?„ê? ìµœê³ ???¬í† ?¤íŒŸ?…ë‹ˆ??", en: "The narrow stairs behind the info center is the best photo spot.", ja: "è¦³å…‰æ¡ˆå†…?€??£?´ã®??„?æ???¸Š?Œæ?é«˜ã®?•ã‚©?ˆã‚¹?ãƒƒ?ˆã§?™ã€? }
        }
    },
    {
        id: "busan-3",
        title: { ko: "ê°ì²œ ë¬¸í™”ë§ˆì„ ?¼ê°„ ?œí•‘ ì²´í—˜", en: "Gamcheon Village Night Surfing", ja: "?˜å·?‡åŒ–?‘å¤œ?“ã‚µ?¼ãƒ•?£ãƒ³ä½“é¨“" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?¬í•˜êµ?ë§ˆì„ë²„ìŠ¤ 1-1ë²??´ìš©, ê°ì²œë¬¸í™”ë§ˆì„ ?˜ì°¨", en: "Village Bus 1-1 to Gamcheon Culture Village", ja: "æ²™ä¸‹?ºãƒ?¦ãƒ«?ã‚¹1-1?ªåˆ©?¨ã€ç”˜å·æ–‡?–æ‘ä¸‹è»Š" },
        description: { ko: "?¬ë¹› ?„ë˜??ì¦ê¸°???¤ë??¬ì˜ ??§Œ?ì¸ ?¼ê°„ ?œí•‘.", en: "Romantic night surfing in Dadaepo under the moonlight.", ja: "?ˆæ˜?‹ã‚Š??¸‹?§æ??—ã?å¤šå¤§æµ¦ã®??ƒ?³ãƒ?ƒã‚¯?ªå¤œ?“ã‚µ?¼ãƒ•?£ãƒ³?? },
        query: { ko: "ë¶€???¼ê°„ ?œí•‘", en: "Gamcheon Village Night Surfing", ja: "?˜å·?‡åŒ–?‘å¤œ?“ã‚µ?¼ãƒ•?£ãƒ³ä½“é¨“" },
        lat: 35.0487,
        lng: 128.9667,
        vipContent: {
            secretMenu: { ko: "?„ë¬¸ ?œí¼??1:1 ê³ ë¦½ ?ˆìŠ¨", en: "1:1 Isolated Pro Surfer Lesson", ja: "?—ãƒ­?µãƒ¼?•ã‚¡?¼ã«?ˆã‚‹1:1å°‚é??¬ãƒƒ?¹ãƒ³" },
            ownerTip: { ko: "?œí•‘ ???œê³µ?˜ëŠ” ë¡œì»¬ ?´ì‚°ë¬??¼ë©´??ë³„ë??…ë‹ˆ??", en: "The local seafood ramen after surfing is a must-try.", ja: "?µãƒ¼?•ã‚£?³å¾Œ?«æä¾›ã•?Œã‚‹?°å…ƒ??µ·é®?ƒ©?¼ãƒ¡?³ãŒçµ¶å“?§ã™?? }
        }
    },
    {
        id: "busan-4",
        title: { ko: "?¬ë²Œì§?ë§‰ë‚´?„ë“¤ '?•ì‹¬??", en: "Reborn Rich 'Jeongsimjae'", ja: "è²¡é–¥å®¶ã®?«æ¯å­ã€Œã‚¸?§ãƒ³?·ãƒ ?¸ã‚§?? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
        rating: 5.0,
        transport: { ko: "2?¸ì„  ?¨ì²œ??1ë²?ì¶œêµ¬ ?„ë³´ 15ë¶?, en: "15 min walk from Namcheon Station Exit 1", ja: "2?·ç·š ?—å·é§?1?ºå£ å¾’æ?15ë¶? },
        description: { ko: "?œì–‘ ê·¸ë£¹ ì§„ì–‘ì²??Œì¥???„ì—„???ê»´ì§€???…ì¥???€?€??", en: "Grand mansion where Sunyang Group Chairman Jin Yang-cheol's majesty is felt.", ja: "?¹ãƒ‹?£ãƒ³?°ãƒ«?¼ãƒ—??ƒ?³ãƒ»?¤ãƒ³?ãƒ§?«ä¼š?·ã®å¨å³?Œæ„Ÿ?˜ã‚‰?Œã‚‹å£?¤§?ªé‚¸å®…ã€? },
        query: { ko: "ë¶€???´ë¦°?‰ì‚¬??, en: "Busan Open City Hall", ja: "?œå±±?‹ã‹?ŒãŸ?¤ãƒ™?³ãƒˆä¼šå ´" },
        lat: 35.1504,
        lng: 129.1124,
        vipContent: {
            secretMenu: { ko: "?¬ë²Œê°€ ?ì˜ ê³ ê¸‰ ?¤ë„ ?¸íŠ¸", en: "Conglomerate-style Premium Tea Set", ja: "è²¡é–¥å®¶é¢¨??«˜ç´šèŒ¶?“ã‚»?ƒãƒˆ" },
            ownerTip: { ko: "?¤ì œ ë¶€?°ì‹œ??ê´€?¬ì???ê³³ìœ¼ë¡??´ë? ?•ì›??ë§¤ìš° ?„ë¦„?µìŠµ?ˆë‹¤.", en: "Formerly the Busan Mayor's residence, the inner garden is beautiful.", ja: " ?¤ì œë¡??œå±±å¸‚é•·??…¬?ã ?£ãŸ?´æ??§ã€å†…?¨ã®åº?œ’?Œéå¸¸ã«ç¾ã—?„ã§?™ã€? }
        }
    },
    {
        id: "busan-5",
        title: { ko: "ë§ˆì´?¤ì„ 'ë¶€???ë„?€êµ?", en: "My Name 'Yeongdodaegyo Bridge' Busan", ja: "?ã‚¤?ãƒ¼? ã€Œé‡œå±±å½±å³¶å¤§æ©‹ã€? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.8,
        transport: { ko: "ë¶€?°ì—­?ì„œ ?ì‹œ 10ë¶??ëŠ” 1?¸ì„  ?¨í¬??, en: "10 min taxi or Nampo Station (Line 1)", ja: "?œå±±é§…ã‹?‰ã‚¿??‚·??0ë¶??ëŠ” 1?·ç·š ?—æµ¦é§? },
        description: { ko: "?”ë ¤???¡ì…˜ê³??´ë‘???„ì•„ë¥?ê°ì„±??ê³µì¡´?˜ëŠ” ë¶€?°ì˜ ?œë“œë§ˆí¬.", en: "Busan landmark where flashy action and dark noir vibes coexist.", ja: "??‚„?‹ãª?¢ã‚¯?·ãƒ§?³ã¨?€?¼ã‚¯?ªãƒ??ƒ¼?«ã®?Ÿæ€§ãŒ?±å­˜?™ã‚‹?œå±±??ƒ©?³ãƒ‰?ãƒ¼??€? },
        query: { ko: "?ë„?€êµ?, en: "Yeongdodaegyo Bridge Busan", ja: "?œå±±å½±å³¶å¤§æ©‹" },
        lat: 35.0934,
        lng: 129.0365,
        vipContent: {
            secretMenu: { ko: "?ë„?€êµ?ë°°ê²½ ?˜ì œ ?„ìŠ¤??, en: "Yeongdodaegyo Handmade Whisky", ja: "å½±å³¶å¤§æ©‹?Œæ™¯??‰‹ä½œã‚Š?¦ã‚£?¹ã‚­?? },
            ownerTip: { ko: "ë§¤ì¼ ?¤í›„ 2???„ê°œ(?¤ë¦¬ê°€ ?¤ë¦¬?? ?œê°„??ë§ì¶”??ë°©ë¬¸?´ë³´?¸ìš”.", en: "Visit at 2 PM to see the bridge lift.", ja: "æ¯æ—¥?ˆå¾Œ2?‚ã€è·³??æ©‹ãŒ?ã¡ä¸ŠãŒ???‚é–“?«åˆ?ã›??¨ª?ã—?¦ã¿?¦ã? ã•?„ã€? }
        }
    },
    {
        id: "solo-bbq-busan-1",
        title: { ko: "ë¶€?°ì—­ 'ë³¸ì „?¼ì?êµ?°¥' - ?˜ìœ¡ 1?¸ë¶„", en: "Bonjeon Dwaeji-gukbab - 1 Portion Boiled Pork", ja: "?œå±±é§…ã€Œãƒœ?³ã‚¸?§ãƒ³è±šã‚¯?ƒãƒ‘??- ?¹ãƒ¦???¹ã§è±?1äººå‰" },
        category: "food",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
        rating: 4.9,
        transport: { ko: "ë¶€?°ì—­ 2ë²?ì¶œêµ¬ ?„ë³´ 2ë¶?, en: "2 min walk from Busan Station Exit 2", ja: "?œå±±é§?2ë²ˆå‡º??å¾’æ?2ë¶? },
        description: { ko: "?¼ê²¹???€??ì¦ê¸°??ë¶€?°ì˜ ?Œìš¸?¸ë“œ ?˜ìœ¡. 1?¸ë¶„ ì£¼ë¬¸??ê°€?¥í•˜ë©??¡ë‚´ ?†ëŠ” ê¹”ë”??ë§›ì´ ?¼í’ˆ?…ë‹ˆ??", en: "Busan's soul food boiled pork instead of BBQ. 1 portion available, clean taste without smell.", ja: "?µãƒ ??ƒ§?—ã‚µ?«ã®ä»£ã‚?Šã«æ¥½ã—?€?œå±±??‚½?¸ãƒ•?¼ãƒ‰?ã‚¹?¦ã‚¯(?¹ã§è±???äººå‰??³¨?‡ãŒ??ƒ½?§ã€è‡­?¿ã®?ªã„?•ã£?±ã‚Š?¨ã—?Ÿå‘³?Œçµ¶?ã§?™ã€? },
        query: { ko: "ë¶€?°ì—­ ë³¸ì „?¼ì?êµ?°¥", en: "Bonjeon Dwaeji-gukbab Busan", ja: "?œå±±é§??œãƒ³?¸ãƒ§?³è±š??ƒƒ?? },
        price: 9000,
        vipContent: {
            secretMenu: { ko: "ë§›ë³´ê¸??˜ìœ¡ ???‘ì‹œ ì¶”ê? ? ì¸", en: "Discounted Mini Boiled Pork Plate", ja: "?³è¦‹?¨ã‚¹?¦ã‚¯ä¸€?¿è¿½? å‰²å¼? },
            ownerTip: { ko: "?•ì„?€ë¡?ë¶€ì¶”ë¬´ì¹¨ì„ êµ?°¥???¬ë¿ ?£ì–´ ?œì„¸??", en: "Put plenty of seasoned chives into the soup as a local rule.", ja: "å®šçŸ³?šã‚Š?ãƒ‹?©å’Œ?ˆã‚’??ƒƒ?‘ã«?Ÿã£?·ã‚Š?¥ã‚Œ??£Ÿ?¹ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "tea-tour-busan-1",
        title: { ko: "?ë„ '? ê¸°?? - ????ì°»ì§‘", en: "Shinki Sup - Tea House in Forest", ja: "å½±å³¶?Œã‚·?³ã‚­?¹ãƒ—??- æ£?®ä¸?®?¶å±‹" },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1544333323-537ea8d44336?w=800&q=80",
        rating: 4.8,
        transport: { ko: "ë¶€?°ì—­?ì„œ 508ë²?ë²„ìŠ¤ ?´ìš©, ? ê¸°?°ì—… ?˜ì°¨", en: "Bus 508 from Busan Station to Shinki Industries", ja: "?œå±±é§…ã‹??08?ªãƒ?¹åˆ©?¨ã€ã‚·?³ã‚­?£æ?ä¸‹è»Š" },
        description: { ko: "?€?˜ë¬´ ?²ì— ?˜ëŸ¬?¸ì¸ ê³ ìš”??ê³µê°„. ì°½ë°–?¼ë¡œ ë³´ì´??ì´ˆë¡ë¹?ë·°ì? ?¨ê»˜ ì¦ê¸°??ì°?????", en: "Quiet space surrounded by bamboo forest. A cup of tea with the green view out the window.", ja: "ç«¹æ—?«å›²?¾ã‚Œ?Ÿé™?‹ãªç©ºé–“?‚çª“??¤–?«è¦‹?ˆã‚‹ç·‘è±Š?‹ãª??‰²?¨å…±?«æ??—ã??ŠèŒ¶ä¸€??€? },
        query: { ko: "ë¶€???ë„ ? ê¸°??, en: "Shinki Sup Busan", ja: "?œå±± å½±å³¶ ?·ãƒ³??‚¹?? },
        vipContent: {
            secretMenu: { ko: "?œí¬ë¦?ë¸”ë Œ???²ì°¨", en: "Secret Blended Forest Tea", ja: "?·ãƒ¼??ƒ¬?ƒãƒˆ?–ãƒ¬?³ãƒ‡?£ãƒ³?°æ£®?? },
            ownerTip: { ko: "2ì¸??¸í‚¤ì¦?ì¡´ì—??ë°”ë¼ë³´ëŠ” ?€?˜ë¬´ ??ë·°ê? ê°€???‰í™”ë¡?Šµ?ˆë‹¤.", en: "The bamboo forest view from the 2nd-floor no-kids zone is the most peaceful.", ja: "2?ã®?ãƒ¼??ƒƒ?ºã‚¾?¼ãƒ³?‹ã‚‰?ºã‚?‹ç«¹?—ã®??‰²?Œæ??‚å¹³?Œã§?™ã€? }
        }
    },
    {
        id: "solo-bbq-busan-2",
        title: { ko: "?œë©´ 'êµ¬ì´?? - 1???”ë¡œêµ¬ì´", en: "Guijeom - 1 Person Grill in Seomyun", ja: "è¥¿é¢?Œã‚¯?¤ã‚¸?§ãƒ ??- 1äººç”¨?‰ç«¯?¼ã" },
        category: "food",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        rating: 4.7,
        transport: { ko: "?œë©´??2ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Seomyun Station Exit 2", ja: "è¥¿é¢é§?2ë²ˆå‡º??å¾’æ?5ë¶? },
        description: { ko: "?˜ë§Œ???„í•œ ?‘ì? ?”ë¡œ?ì„œ ì¦ê¸°???„ë¦¬ë¯¸ì—„ ?Œê³ ê¸°ì? ?¼ì?êµ¬ì´. ?¼ìˆ ì¡±ë“¤???±ì??…ë‹ˆ??", en: "Premium beef and pork on a small grill just for you. A mecca for solo drinkers.", ja: "?ªåˆ†? ã‘??°?•ãª?‰ã§æ¥½ã—?€?—ãƒ¬?Ÿã‚¢? ãª?›è‚‰?¨è±š?‰ã€‚ä?äººé£²?¿æ´¾??–?°ã§?™ã€? },
        query: { ko: "ë¶€???œë©´ ?¼ìˆ  ê³ ê¸°ì§?, en: "Guijeom Seomyun Busan", ja: "?œå±± è¥¿é¢ ä¸€äººé£²?¿ç„¼?? },
        vipContent: {
            secretMenu: { ko: "1???ë‹˜ ?„ìš© '?¤ëŠ˜???¹ìˆ˜ë¶€?? ?ŒëŸ‰ ?ë§¤", en: "Small Portion 'Today's Special Cut' for Solo", ja: "?Šä?äººæ§˜?å®š?Œæœ¬?¥ã®?¹æ®Š?¨ä½?å°‘?è²©å£? },
            ownerTip: { ko: "?˜ì´ë³?ì¢…ë¥˜ê°€ ë§¤ìš° ?¤ì–‘?˜ë‹ˆ ê³ ê¸°?€ ?¨ê»˜ ê³ë“¤?¬ë³´?¸ìš”.", en: "Variety of Highballs available, pair them with meat.", ja: "?ã‚¤?œãƒ¼?«ã®ç¨?¡?Œéå¸¸ã«è±Šå¯Œ?ªã®?§ã€è‚‰?¨ä?ç·’ã«æ¥½ã—?“ã§?¿ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "tea-tour-busan-2",
        title: { ko: "?´ìš´?€ 'ë¹„ë¹„ë¹„ë‹¹' - ì²?‚¬??ì°»ì§‘", en: "Bibibidang - Cheongsapo Tea House", ja: "æµ·é›²?°ã€Œãƒ”?”ãƒ”?€?³ã€?- ?’æ²™æµ?Œ¶å±? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1555529731-118a5bb67af7?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?¥ì‚°??—???ì‹œë¡?10ë¶? ?¬ë§?´ê¸¸ ì¤‘í„±", en: "10 min taxi from Jangsan Station, Dalmaji-gil", ja: "?‡å±±é§…ã‹?‰ã‚¿??‚·?¼ã§10?†ã€æœˆè¦‹é€šã‚Š??¸­?? },
        description: { ko: "???¸ì¸ ì²?‚¬??ë°”ë‹¤ ë·°ë? ë³´ë©° ì¦ê¸°???„í†µ ?¤ê³¼?? ë¶€ëª¨ë‹˜ ëª¨ì‹œê³?ê°€ê¸°ì—??ìµœê³ ?…ë‹ˆ??", en: "Traditional refreshments while looking at the open Cheongsapo sea view. Best for parents.", ja: "?‹æ”¾?„ãª?’æ²™æµ¦ã®æµ·ã‚’?ºã‚?ªãŒ?‰æ??—ã?ä¼çµ±?„ãª?Šè“å­ã€‚ã”ä¸¡è¦ª?’é€£ã‚Œ??¡Œ?ã®?«ã‚‚?€?©ã§?™ã€? },
        query: { ko: "?´ìš´?€ ë¹„ë¹„ë¹„ë‹¹", en: "Bibibidang Busan", ja: "æµ·é›²???”ãƒ”?”ã??? },
        vipContent: {
            secretMenu: { ko: "?œì¦Œ ?œì • ?¸ë°•?í˜œ VIP ?¬ì´ì¦ˆì—…", en: "Seasonal Pumpkin Sikhye VIP Size-up", ja: "å­£ç??å®š?‹ã¼?¡ã‚ƒ?·ãƒƒ??VIP?µã‚¤?ºã‚¢?ƒãƒ—" },
            ownerTip: { ko: "ì°½ê? ì¢Œì„?€ ê²½ìŸ??ì¹˜ì—´?˜ë‹ˆ ?¤í”ˆ ?œê°„??ë§ì¶° ë°©ë¬¸?˜ëŠ” ê²ƒì„ ê¶Œì¥?©ë‹ˆ??", en: "Window seats are competitive, visit at opening time.", ja: "çª“å´??¸­??«¶äº‰ç‡?Œé«˜?„ã®?§ã€é–‹åº—æ™‚?“ã«?ˆã‚?›ã¦è¨ªå•?™ã‚‹?“ã¨?’ãŠ?§ã‚?—ã¾?™ã€? }
        }
    },
    {
        id: "solo-bbq-busan-3",
        title: { ko: "ê´‘ì•ˆë¦?'ì´ˆí•„?´ë¼ì§€êµ¬ì´' - ?¸ìƒ ê»ë°ê¸?, en: "Chopilsal BBQ - Best Pork Rind", ja: "åºƒå®‰?Œã€Œãƒ?§ã‚³?”ãƒ«?µãƒ«è±šç„¼?ã€?- äººç”Ÿ?€é«˜ã®è±šçš®" },
        category: "food",
        image: "https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?w=800&q=80",
        rating: 4.8,
        transport: { ko: "ê¸ˆë ¨?°ì—­ 1ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Geumnyeonsan Station Exit 1", ja: "?‘è“®å±±é§… 1ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "ë°”ì‚­?˜ê³  ì«€?í•œ ë²Œì§‘ ê»ë°ê¸°ë¡œ ?„êµ­?ì¸ ? ëª…?¸ë? ??ê³? ?€ê¸°ê? ê¸¸ì?ë§?ê¸°ë‹¤ë¦?ê°€ì¹˜ê? ?ˆìŠµ?ˆë‹¤.", en: "Nationally famous for crispy and chewy honeycomb pork rind. Long wait but worth it.", ja: "?µã‚¯?µã‚¯?§ãƒ¢?ãƒ¢?ãª?‚ã®å·£ã‚³?—ãƒ†??§?¨å›½?„ã«?‰å?«ãª?£ãŸ?´æ??‚å¾…?¡æ™‚?“ã¯?·ã„?§ã™?Œã€ä¸¦?¶ä¾¡?¤ãŒ?‚ã‚Š?¾ã™?? },
        query: { ko: "ê´‘ì•ˆë¦?ì´ˆí•„?´ë¼ì§€êµ¬ì´", en: "Chopilsal BBQ Busan", ja: "åºƒå®‰???ãƒ§?³ãƒ”?«ã‚µ?«è±š?¼ã" },
        vipContent: {
            secretMenu: { ko: "?Œì´ë¸”ë‹¹ 1???œê³µ?˜ëŠ” ?œí¬ë¦??‘ë… ?ŒìŠ¤", en: "Secret Seasoning Sauce Once per Table", ja: "?†ãƒ¼?–ãƒ«?«ã¤???æä¾›ã•?Œã‚‹?·ãƒ¼??ƒ¬?ƒãƒˆ?³ä»˜?‘ã‚½?¼ã‚¹" },
            ownerTip: { ko: "?„ì¥ ?€ê¸°ë³´????'?Œì´ë¸”ë§'???´ìš©???ê²© ì¤„ì„œê¸°ê? ?„ìˆ˜?…ë‹ˆ??", en: "Remote queuing with 'Tabling' app is essential.", ja: "?¾å ´?§å¾…?¤ã‚ˆ?Šã€ã‚¢?—ãƒª?Œãƒ†?¼ãƒ–?«ãƒª?³ã‚°?ã‚’?©ç”¨?—ãŸ? éš”è¡Œåˆ—?Œå¿…?ˆã§?™ã€? }
        }
    }
];
