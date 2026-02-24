import { TravelSpot } from "../../types/spot";

export const seoulSpots: TravelSpot[] = [
    {
        id: "seoul-1",
        title: { ko: "?±ìˆ˜???¨ì? LPë°?'?ë””??", en: "Hidden LP Bar 'Edit' in Seongsu", ja: "?–æ°´æ´ã®? ã‚Œå®¶LP?ãƒ¼?Œã‚¨?‡ã‚£?ƒãƒˆ?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?w=800&q=80",
        rating: 4.9,
        isTrending: true,
        transport: { ko: "2?¸ì„  ?±ìˆ˜??3ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Seongsu Station Exit 3 (Line 2)", ja: "2?·ç·š ?–æ°´é§?3?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "?„ë‚ ë¡œê·¸ ê°ì„±??ê°€?í•œ ?±ìˆ˜?™ì˜ ë¹„ë??¤ëŸ¬??ê³µê°„?…ë‹ˆ??", en: "A secret space in Seongsu full of analog vibes.", ja: "?¢ãƒŠ??‚°?Ÿæ€§ã‚?µã‚Œ?‹è–æ°´æ´??§˜å¯†ã®ç©ºé–“?§ã™?? },
        query: { ko: "?±ìˆ˜??LPë°?, en: "Edit LP Bar Seongsu", ja: "?–æ°´æ´??¨ë””??LPë°? },
        price: 25000,
        lat: 37.5447,
        lng: 127.0567,
        vipContent: {
            secretMenu: { ko: "?ˆë“  ì¹µí…Œ??'ë¸”ë£¨ ?ìˆ˜'", en: "Hidden Cocktail 'Blue Sangsu'", ja: "è£ã‚«?¬í…”?Œãƒ–?«ãƒ¼ ?? },
            ownerTip: { ko: "?¤ë„ˆê°€ ì§ì ‘ ì¶”ì²œ?˜ëŠ” ?Œìˆ˜ ?•ì˜ˆ ëª…ë‹¹ ?ë¦¬ê°€ ?ˆìŠµ?ˆë‹¤.", en: "There is a secret elite seat recommended by the owner.", ja: "?ªãƒ¼?Šãƒ¼?Œç›´?¥ãŠ?™ã™?ã™?‹å°‘?°ç²¾??®?¹ç­‰å¸?Œ?‚ã‚Š?¾ã™?? },
            status: { ko: "?¤ì‹œê°??¼ì¡??40% (ì¾Œì )", en: "40% Busy (Spacious)", ja: "?ªã‚¢?«ã‚¿?¤ãƒ æ··é›‘åº?0% (å¿«é©)" }
        }
    },
    {
        id: "seoul-2",
        title: { ko: "ê²½ë³µê¶??¬ë¹› ?°ì±…", en: "Gyeongbokgung Moonlight Walk", ja: "??¦å®?œˆ?ã‹?Šã®?? },
        category: "travel",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
        rating: 4.8,
        transport: { ko: "3?¸ì„  ê²½ë³µê¶ì—­ 5ë²?ì¶œêµ¬ ?°ê²°", en: "Directly connected to Gyeongbokgung Station Exit 5 (Line 3)", ja: "3?·ç·š ??¦å®?§… 5?ªå‡º???´çµ" },
        description: { ko: "ì¡°ì„  ?•ì¡°???„ì—„ê³?ë°¤ì˜ ê³ ìš”?¨ì´ ë§Œë‚˜???„ë¦„?¤ìš´ ê¶ê¶ ?°ì±…ë¡?", en: "A beautiful palace walk where Joseon majesty meets night tranquility.", ja: "?é??‹æœ??¨?³ã¨å¤œã®?™å¯‚???åˆ?™ã‚‹ç¾ã—?„ç‹å®?®?£æ??“ã€? },
        query: { ko: "ê²½ë³µê¶?ë³„ë¹›?¼í–‰", en: "Gyeongbokgung Palace", ja: "??¦å®? },
        vipContent: {
            secretMenu: { ko: "?¼ê°„ ê´€???„ìš© 'ë¹„ë? ?•ì' ?„ì¹˜", en: "Location of 'Secret Pavilion' for Night View", ja: "å¤œé–“è¦³è¦§å°‚ç”¨?Œç§˜å¯†ã®?±å±‹?ã®?´æ?" },
            ownerTip: { ko: "?œë³µ ì°©ìš© ???…êµ¬ ê·¼ì²˜???¨ê²¨ì§??¬í† ì¡´ì„ ?´ìš©?˜ì„¸??", en: "Use the hidden photo spot near the entrance when wearing Hanbok.", ja: "?“æœ?€?¨ã®?›ã€å…¥?£è¿‘?ã®? ã‚Œ?Ÿãƒ•?©ãƒˆ?¹ãƒ?ƒãƒˆ?’åˆ©?¨ã—?¦ã? ã•?„ã€? }
        },
        price: 3000,
        lat: 37.5796,
        lng: 126.9770
    },
    {
        id: "seoul-3",
        title: { ko: "ë¶ì´Œ ?œì˜¥ë§ˆì„ '?„ê¹¨ë¹? ì´¬ì˜ì§€", en: "Bukchon Village 'Goblin' House", ja: "?—æ‘?“å±‹?‘ã€Œãƒˆ?ƒã‚±?“ã€ã®" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=800&q=80",
        rating: 4.7,
        transport: { ko: "3?¸ì„  ?ˆêµ­??2ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Anguk Station Exit 2 (Line 3)", ja: "3?·ç·š å®‰å›½é§?2?ªå‡º??å¾’æ?10?? },
        description: { ko: "?œë¼ë§?'?„ê¹¨ë¹???? ë¹„ë¡œìš´ ?•ì›???ˆëŠ” ?œì–‘??ì£¼íƒ.", en: "Western-style house with a mysterious garden from 'Goblin'.", ja: "?‰ãƒ©?ã€Œãƒˆ?ƒã‚±?“ã€ã®ç¥ç§˜?„ãªåº?œ’?Œã‚?‹æ´‹é¢¨ä½å®…ã€? },
        query: { ko: "ì¤‘ì•™ê³ ë“±?™êµ", en: "Bukchon Hanok Village", ja: "?—æ‘?“å±‹?? },
        lat: 37.5826,
        lng: 126.9836,
        vipContent: {
            secretMenu: { ko: "ì´¬ì˜ ?Œí’ˆ ë¯¸ë‹ˆ?´ì²˜ ?¤íŠ¸", en: "Drama Prop Miniature Kit", ja: "??½±å°é“?·ã®?Ÿãƒ‹?ãƒ¥?¢ã‚­?ƒãƒˆ" },
            ownerTip: { ko: "ì¤‘ì•™ê³ ë“±?™êµ ?´ë? ê´€?Œì? ì£¼ë§?ë§Œ ê°€?¥í•©?ˆë‹¤.", en: "Internal visit is only available on weekends.", ja: "ä¸?¤®é«˜æ ¡??†…?¨è¦³è¦§ã¯?±æœ«?«ã®?¿å¯?½ã§?™ã€? }
        }
    },
    {
        id: "seoul-4",
        title: { ko: "ì²?‹´???„ë¼?´ë¹— ?¤íŒŒ 'L'", en: "Cheongdam Private Spa 'L'", ja: "æ¸…æ½­æ´ãƒ—?©ã‚¤?™ãƒ¼?ˆã‚¹?‘ã€ŒL?? },
        category: "beauty",
        image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=800&q=80",
        rating: 5.0,
        transport: { ko: "7?¸ì„  ì²?‹´??9ë²?ì¶œêµ¬ ?„ë³´ 3ë¶?, en: "3 min walk from Cheongdam Station Exit 9 (Line 7)", ja: "7?·ç·š æ¸…æ½­é§?9?ªå‡º??å¾’æ?3" },
        description: { ko: "êµ?‚´ ìµœì •?ê¸‰ ?„í‹°?¤íŠ¸?¤ì´ ? ìš©?˜ëŠ” 0.1% ?„ë¼?´ë¹— ?Œë¼??ê³µê°„.", en: "0.1% private therapy space used by top artists in Korea.", ja: "?½å†…?€é«˜å³°??‚¢?¼ãƒ†?£ã‚¹?ˆãŒ?›ç”¨?˜ëŠ” 0.1%?—ãƒ©?¤ãƒ™?¼ãƒˆ?»ãƒ©?”ãƒ¼ç©ºé–“?? },
        query: { ko: "ì²?‹´???¤íŒŒ", en: "L Spa Cheongdam", ja: "æ¸…æ½­æ´ã‚¹?‘L" },
        lat: 37.5255,
        lng: 127.0423,
        vipContent: {
            secretMenu: { ko: "VIP ?„ìš© ë¡œì—´ ???œë¹„??, en: "VIP-only Royal Tea Service", ja: "VIPå°‚ç”¨??‚¤?¤ãƒ«?†ã‚£?¼ã‚µ?¼ãƒ“?? },
            ownerTip: { ko: "?¤ë„ˆ ?Œë¼?¼ìŠ¤??ì§€ëª???ì¶”ê? ?¤ë“œ ?¤íŒŒ ?œë¹„?¤ê? ?œê³µ?©ë‹ˆ??", en: "Complimentary head spa when booking the owner therapist.", ja: "?ªãƒ¼?Šãƒ¼?»ãƒ©?”ã‚¹?ˆæŒ‡?æ™‚?è¿½? ã®?˜ãƒƒ?‰ã‚¹?‘ã‚µ?¼ãƒ“?¹ãŒ?ä¾›?•ã‚Œ?¾ã™?? }
        },
        price: 150000
    },
    {
        id: "seoul-5",
        title: { ko: "?°ë‚¨??'?˜í?' ?œë¡œ??ì¹´í˜", en: "Supul Drawing Cafe in Yeonnam", ja: "å»¶å—æ´ã€Œã‚¹?—ãƒ«?ãƒ‰??ƒ¼?¤ãƒ³?°ã‚«?•ã‚§" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?ë??…êµ¬??3ë²?ì¶œêµ¬ ?„ë³´ 7ë¶?, en: "7 min walk from Hongik Univ. Station Exit 3", ja: "å¼˜å¤§?¥å£é§?3?ªå‡º??å¾’æ?7ë¶? },
        description: { ko: "?°ë‚¨???²ê¸¸ ?? ìº”ë²„???„ì— ?˜ë§Œ???œìš¸??ê·¸ë¦¬???ë§ ?€??", en: "Healing time drawing your own Seoul on canvas next to Yeonnam forest way.", ja: "å»¶å—æ´ã®æ£?®?“æ²¿?„ã€ã‚­?£ãƒ³?ã‚¹?«è‡ª?†ã ?‘ã®?½ã‚¦?«ã‚’?ã?’ãƒ¼?ªãƒ³?°ã‚¿?¤ãƒ ?? },
        query: { ko: "?°ë‚¨???œë¡œ?‰ì¹´??, en: "Supul Drawing Cafe", ja: "å»¶å—æ´ã‚¹?—ãƒ«?‰ãƒ­?¼ã‚¤?³ã‚°?«ãƒ•?? },
        lat: 37.5615,
        lng: 126.9248,
        vipContent: {
            secretMenu: { ko: "?„ë¦¬ë¯¸ì—„ ?˜ì… ë¬¼ê° ?…ê·¸?ˆì´??, en: "Premium Imported Paint Upgrade", ja: "é«˜ç´šè¼¸å…¥çµµå…·?¢ãƒƒ?—ã‚°?¬ãƒ¼?? },
            ownerTip: { ko: "?¤í›„ 4???´í›„??ì°½ê? ?ë¦¬???„ë²½??ì±„ê´‘???ë‘?©ë‹ˆ??", en: "Window seats after 4 PM have perfect natural lighting.", ja: "?ˆå¾Œ4?‚ä»¥?ã®çª“éš›??¸­??®Œ?§ãª?¡å…‰?’èª‡?Šã¾?™ã€? }
        },
        price: 20000
    },
    {
        id: "seoul-6",
        title: { ko: "?´íƒœ???´ë¼??'?¨ë°¤' 1?¸ì ", en: "Itaewon Class 'Danbam' 1st", ja: "æ¢¨æ³°?¢ã‚¯?©ã‚¹?Œã‚¿?³ãƒ? ã€??·åº—" },
        category: "filming",
        image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80",
        rating: 4.8,
        transport: { ko: "6?¸ì„  ?¹ì‚¬?‰ì—­ 3ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Noksapyeong Station Exit 3", ja: "6?·ç·š ç·‘è?ªé§… 3?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "ë°•ìƒˆë¡œì´???´ì •???´ì•„?ˆëŠ” ?´íƒœ???´ë¼?°ì˜ ì¤‘ì‹¬ì§€.", en: "The heart of Itaewon Class where Park Saeroyi's passion lives.", ja: "?‘ã‚¯?»ã‚»??‚¤??ƒ…?±ãŒ?Ÿã?¦ã„?‹æ¢¨æ³°é™¢??ƒ©?¹ã®ä¸?¿ƒ?°ã€? },
        query: { ko: "?´íƒœ???¨ë°¤ ì´¬ì˜ì§€", en: "Itaewon Danbam", ja: "æ¢¨æ³°?¢ã‚¿?³ãƒ?? },
        lat: 37.5346,
        lng: 126.9880,
        vipContent: {
            secretMenu: { ko: "?œë¼ë§???'?œë‘ë¶€ì°Œê°œ' ?¬í˜„ ë©”ë‰´", en: "Recreated Soft Tofu Stew from Drama", ja: "?‡ä¸­??€Œã‚¹?³ãƒ‰?¥ãƒ–?ã‚²?å†?¾ãƒ¡?‹ãƒ¥?? },
            ownerTip: { ko: "ë£¨í”„?‘ì—??ë°”ë¼ë³´ëŠ” ?¨ì‚°ë·°ê? ?œë¼ë§?ê³µì‹ ?¬í† ì¡´ì…?ˆë‹¤.", en: "Namsan view from the rooftop is the official photo spot.", ja: "å±‹ä¸Š?‹ã‚‰?ºã‚?‹å—å±±ãƒ“?¥ãƒ¼?Œãƒ‰?©ãƒ??…¬å¼ãƒ•?©ãƒˆ?¹ãƒ?ƒãƒˆ?§ã™?? }
        }
    },
    {
        id: "seoul-7",
        title: { ko: "?´íƒœ???´ë¼??'?¨ì‚°?¡êµ'", en: "Itaewon Class 'Namsan Pedestrian Bridge'", ja: "æ¢¨æ³°?¢ã‚¯?©ã‚¹?Œå—å±±æ?æ©‹ã€? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1540919315541-698f12ea926b?w=800&q=80",
        rating: 4.9,
        transport: { ko: "6?¸ì„  ?¹ì‚¬?‰ì—­ 1ë²?ì¶œêµ¬ ?„ë³´ 2ë¶?, en: "2 min walk from Noksapyeong Station Exit 1", ja: "6?·ç·š ç·‘è?ªé§… 1?ªå‡º??å¾’æ?2ë¶? },
        description: { ko: "ë°•ìƒˆë¡œì´ê°€ ê³ ë???? ê¸°???œë¼ë§???ëª…ì¥ë©´ì˜ ë°°ê²½.", en: "The background of the famous scene where Park Saeroyi was lost in thought.", ja: "?‘ã‚¯?»ã‚»??‚¤?Œæ‚©?¿äº‹?’ã—?ŸåŠ‡ä¸?®?å ´?¢ã®?Œæ™¯?? },
        query: { ko: "?¹ì‚¬?‰ì—­ ?¡êµ", en: "Noksapyeong Station Bridge", ja: "ç·‘è?ªé§…æ­©é“æ©? },
        lat: 37.5358,
        lng: 126.9868,
        vipContent: {
            secretMenu: { ko: "?¼ê°„ ì¶œì‚¬ ?„ìš© ?¼ê°?€ ?€??, en: "Night Photography Tripod Rental", ja: "å¤œé–“??½±?¨ä¸‰?šã®è²¸å‡º" },
            ownerTip: { ko: "??ì§????¨ì‚°?€?Œì— ë¶ˆì´ ì¼œì????œê°„??ê°€???„ë¦„?µìŠµ?ˆë‹¤.", en: "Sunset is best when Namsan Tower lights turn on.", ja: "?¥æ²¡?‚ã€å—å±±ã‚¿??ƒ¼?«æ˜?‹ã‚Š?Œç¯?‹ç¬?“ãŒ?€?‚ç¾?—ã„?§ã™?? }
        }
    },
    {
        id: "seoul-8",
        title: { ko: "ê¸°ìƒì¶?'?í•˜ë¬??°ë„'", en: "Parasite 'Jahamun Tunnel'", ja: "?‘ãƒ©?µã‚¤?ˆã€Œç´«?é??ˆãƒ³?ãƒ«?? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
        rating: 4.9,
        transport: { ko: "3?¸ì„  ê²½ë³µê¶ì—­ 3ë²?ì¶œêµ¬ ë²„ìŠ¤ ?´ìš© (?í•˜ë¬?ê³ ê°œ ?˜ì°¨)", en: "Bus from Gyeongbokgung Station Exit 3 to Jahamun Hill", ja: "3?·ç·š ??¦å®?§… 3?ªå‡º?£ã‚ˆ?Šãƒ?¹åˆ©??ç´«éœ?€å³ ä¸‹è»?" },
        description: { ko: "ê¸°íƒ ê°€ì¡±ì´ ë¹—ì†???«ê³  ?„ë§ì¹˜ë˜ ?í™” ??ê³„ë‹¨ê³??°ë„.", en: "The stairs and tunnel where Ki-taek's family fled through the rain.", ja: "??ƒ†???å®¶ãŒ?¨ã®ä¸?‚’?ƒã’?ŸåŠ‡ä¸?®?æ??¨ãƒˆ?³ãƒ?«ã€? },
        query: { ko: "?í•˜ë¬¸í„°??ê¸°ìƒì¶?, en: "Jahamun Tunnel", ja: "ç´«éœ?€?ˆãƒ³?ãƒ«" },
        lat: 37.5915,
        lng: 126.9635,
        vipContent: {
            secretMenu: { ko: "?í™” ?¬ìŠ¤??ì»¨ì…‰ ?¬ì§„ ?¸í™”", en: "Movie Poster Concept Photo Printing", ja: "? ç”»?ã‚¹?¿ãƒ¼?³ãƒ³?»ãƒ—?ˆã®?™çœŸ?¾åƒ" },
            ownerTip: { ko: "?°ë„ ?…êµ¬?ì„œ ê³„ë‹¨??ë°”ë¼ë³´ëŠ” ê°ë„ê°€ ìµœê³ ??'ê³„ê¸‰ì°¨ì´' ?µê??…ë‹ˆ??", en: "The angle looking up the stairs is the best 'class gap' shot.", ja: "?ˆãƒ³?ãƒ«??…¥?Šå£?‹ã‚‰?æ??’è¦‹ä¸Šã’?‹è§’åº¦ãŒ?€é«˜ã®?Œéšç´šå·®?ã‚¢?³ã‚°?«ã§?™ã€? }
        }
    },
    {
        id: "seoul-9",
        title: { ko: "?¤ì§•??ê²Œì„ '?ë¬¸???œì¥'", en: "Squid Game 'Ssangmun-dong Market'", ja: "?¤ì¹´ê²Œì„?ŒåŒ?€æ´å¸‚?´ã€? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1547928576-965be7f5f6a6?w=800&q=80",
        rating: 4.7,
        transport: { ko: "4?¸ì„  ?ë¬¸??2ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Ssangmun Station Exit 2", ja: "4?·ç·š ?Œé?é§?2?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "?±ê¸°?ˆì˜ ?¼ìƒ??ë¬»ì–´?˜ë˜ ?í™œ ë°€ì°©í˜• ?œì¥ ?ê²½.", en: "The daily market life of Seong Gi-hun in Squid Game.", ja: "?½ãƒ³?»ã‚®?•ãƒ³??—¥å¸¸ãŒ?«ã˜?¿å‡º?¦ã„?Ÿç”Ÿæ´»å¯†?€?‹ã®å¸‚å ´??¢¨??€? },
        query: { ko: "ë°±ìš´?œì¥ ?¤ì§•?´ê²Œ??, en: "Baegun Market Seoul", ja: "?½é›²å¸‚å ´?Œé?æ´? },
        lat: 37.6491,
        lng: 127.0345,
        vipContent: {
            secretMenu: { ko: "ì¶”ì–µ???¬ê³ ??ë½‘ê¸° ì²´í—˜", en: "Nostalgic Dalgona Challenge", ja: "?‚ã®?¥ã€ã‚??™‚????«ã‚´?Šå‹?œãä½“é¨“" },
            ownerTip: { ko: "ê¸°í›ˆ???ì£¼ ê°€???ì„  ê°€ê²ŒëŠ” ?¤ì œë¡??œì¥ ?…êµ¬???ˆìŠµ?ˆë‹¤.", en: "The fish shop Gi-hun frequented is actually at the market entrance.", ja: "??ƒ•?³ãŒ?ˆãè¡Œã£?¦ã„?Ÿé­šå±‹ã¯å®Ÿéš›?«å¸‚?´ã®?¥ã‚Š?£ã«?‚ã‚Š?¾ã™?? }
        }
    },
    {
        id: "seoul-10",
        title: { ko: "ë¬´ë¹™ '?¨ì‚° ?ˆê¹Œ??", en: "Moving 'Namsan Tonkatsu'", ja: "? ãƒ¼?“ãƒ³?°ã€Œå—å±±ã¨?“ã‹?¤ã€? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
        rating: 4.8,
        transport: { ko: "4?¸ì„  ëª…ë™??3ë²?ì¶œêµ¬ ?¨ì‚° ì¼€?´ë¸”ì¹?ë°©í–¥ ?„ë³´ 10ë¶?, en: "10 min walk from Myeongdong Station towards Namsan Cable Car", ja: "4?·ç·š ?æ´é§?3?ªå‡º?£ã‚ˆ?Šå—å±±ã‚±?¼ãƒ–?«ã‚«?¼æ–¹?¢ã¸å¾’æ?10ë¶? },
        description: { ko: "?œë¼ë§?'ë¬´ë¹™'?ì„œ ì´ˆëŠ¥?¥ì?¤ì´ ë¹„ë??¤ëŸ½ê²?ë§Œë‚˜??ì¶”ì–µ??ë§?", en: "The nostalgic taste where superpowered humans met secretly in 'Moving'.", ja: "?‰ãƒ©?ã€Œãƒ ?¼ãƒ“?³ã‚°?ã§è¶…èƒ½?›è€…ãŸ?¡ãŒå¯†ã‹?«ä¼š?£ã¦?„ãŸ?ã„?ºã®?³ã€? },
        query: { ko: "?¨ì‚° ?ˆê¹Œ??ë¬´ë¹™", en: "Namsan Tonkatsu", ja: "?—å±±?¨ã‚“?‹ã¤" },
        lat: 37.5562,
        lng: 126.9850,
        vipContent: {
            secretMenu: { ko: "?œë¼ë§???'?œíš¨ì£??¸íŠ¸'", en: "Drama-themed 'Han Hyo-joo Set'", ja: "?‡ä¸­??€Œãƒ?³ãƒ»?’ãƒ§?¸ãƒ¥ ?»ãƒƒ?ˆã€? },
            ownerTip: { ko: "?¤í”„?€ ?‘ë°°ì¶??ëŸ¬?œëŠ” ë¬´í•œ ë¦¬í•„??êµ?£°?…ë‹ˆ??", en: "Infinite refill for soup and cabbage salad is the local rule.", ja: "?¹ãƒ¼?—ã¨??ƒ£?™ãƒ„??‚µ?©ã???„¡?ã«?Šã‹?ã‚Š?™ã‚‹??Œ?°å…ƒ??ƒ«?¼ãƒ«?§ã™?? }
        }
    },
    {
        id: "seoul-11",
        title: { ko: "?¤í??¸ì—… '?¸ë“¤??", en: "Start-Up 'Nodeul Island'", ja: "?¹ã‚¿?¼ãƒˆ?¢ãƒƒ?—ã€Œãƒ?‰ã‚¥?«å³¶?? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1549497538-30623643f81c?w=800&q=80",
        rating: 4.8,
        transport: { ko: "9?¸ì„  ?¸ë“¤??2ë²?ì¶œêµ¬ ?œê°•?€êµ?ë°©í–¥ ?„ë³´ 10ë¶?, en: "10 min walk from Nodeul Station Exit 2", ja: "9?·ç·š ?ãƒ‰?¥ãƒ«é§?2?ªå‡º?£ã‚ˆ?Šæ¼¢æ±Ÿå¤§æ©‹æ–¹?¢ã¸å¾’æ?10ë¶? },
        description: { ko: "?Œë“œë°•ìŠ¤(IT ?¤ë¦¬ì½˜ë°¸ë¦???ë°°ê²½?????œê°• ?„ì˜ ë¬¸í™” ë³µí•© ê³µê°„.", en: "Culture complex on Han River, the background of 'Sandbox'.", ja: "?µãƒ³?‰ãƒœ?ƒã‚¯??IT?·ãƒª?³ãƒ³?ãƒ¬????ƒŒ??«?ªã£?Ÿæ¼¢æ±Ÿä¸Š??–‡?–è¤‡?ˆç©º?“ã€? },
        query: { ko: "?¸ë“¤???Œë“œë°•ìŠ¤", en: "Nodeul Island", ja: "?¹ã‚¿?¼ãƒˆ?¢ãƒƒ?—ãƒ?‰ã‚¥?«å³¶" },
        lat: 37.5175,
        lng: 126.9581,
        vipContent: {
            secretMenu: { ko: "?¼í¬??ë§¤íŠ¸ ë°?ë°”ìŠ¤ì¼??€???¸íŠ¸", en: "Picnic Mat & Basket Rental Set", ja: "?”í¬?‹ãƒƒ??ƒ?ƒãƒˆï¼†ãƒ?¹ã‚±?ƒãƒˆ?¬ãƒ³?¿ãƒ«?»ãƒƒ?? },
            ownerTip: { ko: "??ì§?ë¬´ë µ ë¶?ì¼œì§„ 63ë¹Œë”©??ë°°ê²½?¼ë¡œ ì°ëŠ” ?¬ì§„???ˆìˆ ?…ë‹ˆ??", en: "Artistic shots with the 63 Building lights at sunset.", ja: "?¥ãŒ??‚Œ?‹é ƒ?æ˜?‹ã‚Š??¯?£ãŸ63?“ãƒ«?’èƒŒ??«??‚‹?™çœŸ?ŒèŠ¸è¡“ì ?§ã™?? }
        }
    },
    {
        id: "seoul-12",
        title: { ko: "?¬ë‘??ë¶ˆì‹œì°?'?¸í”„ê°??¤í…Œ?´í¬?˜ìš°??", en: "Crash Landing on You 'Wolfgang Steakhouse'", ja: "?›ã®ä¸æ™‚?€?Œã‚¦?«ãƒ•??ƒ£?³ã‚°?»ã‚¹?†ãƒ¼??ƒ?¦ã‚¹?? },
        category: "filming",
        image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?˜ì¸ë¶„ë‹¹???•êµ¬?•ë¡œ?°ì˜¤??4ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Apgujeong Rodeo Station Exit 4", ja: "æ°´ä»?†å”ç·??é´äº?ƒ­?‡ã‚ªé§?4?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "?¤ì„¸ë¦¬ê? ?¨í•œ?ì„œ????…”ë¦¬í•œ ?¼ìƒ??ë³´ë‚´???¤í…Œ?´í¬ ?˜ìš°??", en: "The steakhouse where Yoon Se-ri enjoyed her luxury life in the South.", ja: "?¦ãƒ³?»ã‚»?ªãŒ?“å›½?§ã®?©ã‚°?¸ãƒ¥?¢ãƒª?¼ãª?¥å¸¸?’é?”ã—?¦ã„?Ÿã‚¹?†ãƒ¼??ƒ?¦ã‚¹?? },
        query: { ko: "?¸í”„ê°??¤í…Œ?´í¬?˜ìš°??ì²?‹´", en: "Wolfgang Steakhouse", ja: "?›ã®ä¸æ™‚?€?¦ãƒ«?•ã‚®?£ãƒ³?°ãƒ»?¹ãƒ†?¼ã‚­?ã‚¦?? },
        lat: 37.5245,
        lng: 127.0412,
        vipContent: {
            secretMenu: { ko: "?œë¼ë§???'?¸ë¦¬'s ?¼í¬' ìµœê³ ê¸??¤í…Œ?´í¬ ?¸íŠ¸", en: "Seri's Pick Premium Steak Set", ja: "?‡ä¸­??€Œã‚»?ªã‚º?»ãƒ”?ƒã‚¯?æ?é«˜ç´š?¹ãƒ†?¼ã‚­?»ãƒƒ?? },
            ownerTip: { ko: "ì°½ê? ì¢Œì„?€ ?ˆì•½??ë§¤ìš° ì¹˜ì—´?˜ë?ë¡?1ê°œì›” ???ˆì•½??ê¶Œì¥?©ë‹ˆ??", en: "Window seats are highly competitive, book 1 month ahead.", ja: "çª“å´??¸­??ºˆç´„ãŒ?å¸¸?«æ??—ã„?Ÿã‚???¶æœˆ?ã®äºˆç´„?’ãŠ?§ã‚?—ã¾?™ã€? }
        }
    },
    {
        id: "gangnam-strat-1",
        title: { ko: "ì²?‹´ '?•ì‹?? - ì½”ë¦¬???Œì¸ ?¤ì´??, en: "Jungsik - Korean Fine Dining in Cheongdam", ja: "æ¸…æ½­?Œã‚¸?§ãƒ³?·ã‚¯?¿ãƒ³??- ?³ãƒª?¢ãƒ³?•ã‚¡?¤ãƒ³?€?¤ãƒ‹?³ã‚°" },
        category: "food",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        rating: 4.9,
        isTrending: true,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??4ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Apgujeong Rodeo Station Exit 4", ja: "?é´äº?ƒ­?‡ã‚ªé§?4?ªå‡º??å¾’æ?5?? },
        description: { ko: "ê°•ë‚¨ ?„ìŠ¹ ?„ëµ???•ì . ?´ìš•ê³??œìš¸?ì„œ ë¯¸ì‰ë¦?ê°€?´ë“œë¥??¬ë¡œ?¡ì? ëª¨ë˜ ?œì‹.", en: "The peak of Gangnam strategy. Modern Korean cuisine that captured Michelin guides in NY and Seoul.", ja: "æ±Ÿå—å¿…å‹??•¥?? ‚?¹ã€‚ãƒ‹?¥ãƒ¼?¨ãƒ¼??¨?½ã‚¦?«ã§?Ÿã‚·?¥ãƒ©?³ã‚¬?¤ãƒ‰?’è™œ?«ã—?Ÿãƒ¢?€?³éŸ“?½æ–™?†ã€? },
        query: { ko: "ì²?‹´ ?•ì‹??, en: "Jungsik Cheongdam", ja: "æ¸…æ½­ ?¸ãƒ§?³ã‚·??‚¿?? },
        price: 250000,
        lat: 37.5255,
        lng: 127.0402,
        vipContent: {
            secretMenu: { ko: "ë©”ë‰´?ì— ?†ëŠ” ë¹ˆí‹°ì§€ ?€???˜ì–´ë§?, en: "Off-menu Vintage Wine Pairing", ja: "?¡ãƒ‹?¥ãƒ¼?«ãª?„ãƒ´?£ãƒ³?†ãƒ¼?¸ãƒ¯?¤ãƒ³?šã‚¢?ªãƒ³?? },
            ownerTip: { ko: "2ê°œì›” ???ˆì•½ ?„ìˆ˜, ì°½ê??ì? ë©¤ë²„???°ì„  ë°°ì •?…ë‹ˆ??", en: "Book 2 months ahead. Window seats are priority for members.", ja: "2?¶æœˆ?ã®äºˆç´„å¿…é ˆ?‚çª“?´ã®å¸?¯?¡ãƒ³?ãƒ¼?·ãƒƒ?—å„ª?ˆé…?†ã§?™ã€? }
        }
    },
    {
        id: "gangnam-strat-2",
        title: { ko: "? ì‚¬ 'ë§ˆì¼?¤í†¤ ì»¤í”¼' ë¡œìŠ¤?°ì¦ˆ", en: "Milestone Coffee Roasters Sinsa", ja: "?°æ²™?Œãƒ?¤ãƒ«?¹ãƒˆ?¼ãƒ³?³ãƒ¼?’ãƒ¼?ãƒ­?¼ã‚¹?¿ãƒ¼?? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        rating: 4.8,
        transport: { ko: "? ì‚¬??8ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Sinsa Station Exit 8", ja: "?°æ²™é§?8?ªå‡º??å¾’æ?10?? },
        description: { ko: "ê°€ë¡œìˆ˜ê¸¸ì—??ê°€???™í•œ ?ìŠ¤?„ë ˆ??ë°? ê°•ë‚¨ ?¸ë Œ?œì„¸?°ë“¤??ì§‘ê²°ì§€.", en: "The hippest espresso bar in Garosu-gil. A gathering spot for Gangnam trendsetters.", ja: "è¡—è·¯æ¨¹é€šã‚Š?§æ??‚ãƒ’?ƒãƒ—?ªã‚¨?¹ãƒ—?¬ãƒƒ?½ãƒ?¼ã€‚æ±Ÿ?—ã®?ˆãƒ¬?³ãƒ‰?»ãƒƒ?¿ãƒ¼?Ÿã¡??›†ê²°åœ°?? },
        query: { ko: "? ì‚¬??ë§ˆì¼?¤í†¤ì»¤í”¼", en: "Milestone Coffee Sinsa", ja: "?°æ²™æ´??ã‚¤?«ã‚¹?ˆãƒ¼?³ã‚³?¼ãƒ’?? },
        vipContent: {
            secretMenu: { ko: "?¨ê³¨ ?„ìš© ?œí¬ë¦?ë¸”ë Œ???ë‘", en: "Regular-only Secret Blend Beans", ja: "å¸¸é€£å°‚?¨ã‚·?¼ã‚¯?¬ãƒƒ?ˆãƒ–?¬ãƒ³?‰è±†" },
            ownerTip: { ko: "?¤ì „ 11???´ì „ ë°©ë¬¸ ??ê°€???œì ?˜ê²Œ ë¶„ìœ„ê¸°ë? ì¦ê¸¸ ???ˆìŠµ?ˆë‹¤.", en: "Visit before 11 AM for the quietest atmosphere.", ja: "?ˆå‰11?‚å‰?«è¨ª?ã™?‹ã¨?æ??‚é™?‹ã«?°å›²æ°—ã‚’æ¥½ã—?ã¾?™ã€? }
        }
    },
    {
        id: "gangnam-strat-3",
        title: { ko: "?•êµ¬??'?¬ë²„ë¦°ì¦ˆ' ?Œë˜ê·¸ì‹­ ?¤í† ??, en: "Tamburins Flagship Store Apgujeong", ja: "?é´äº?€Œã‚¿?³ãƒ?ªãƒ³?ºã€ãƒ•?©ãƒƒ?°ã‚·?ƒãƒ—?¹ãƒˆ?? },
        category: "beauty",
        image: "https://images.unsplash.com/photo-1522335789183-b11407384352?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??5ë²?ì¶œêµ¬ ?„ë³´ 7ë¶?, en: "7 min walk from Apgujeong Rodeo Station Exit 5", ja: "?é´äº?ƒ­?‡ã‚ªé§?5ë²ˆå‡º??å¾’æ?7ë¶? },
        description: { ko: "?¥ê¸°ë¥??ˆìˆ ë¡??¹í™”?œí‚¨ ê³µê°„. ?¸ìŠ¤?€ê·¸ë˜ë¨¸ë¸”???¸í…Œë¦¬ì–´?€ ê°ê°?ì¸ ?¥ìˆ˜.", en: "A space where scent is sublimated into art. Instagrammable interior and sensible perfumes.", ja: "é¦™ã‚Š?’èŠ¸è¡“ã¸?¨æ˜‡??•?›ãŸç©ºé–“?‚ã‚¤?³ã‚¹?¿æ˜ ?ˆã™?‹ã‚¤?³ãƒ†?ªã‚¢?¨æ„Ÿè¦šçš„?ªé¦™æ°´ã€? },
        query: { ko: "?•êµ¬???¬ë²„ë¦°ì¦ˆ", en: "Tamburins Apgujeong", ja: "?é´äº??¿ãƒ³?ãƒª?³ã‚º" },
        vipContent: {
            secretMenu: { ko: "?„ì‹œ ì»¨ì…‰ ?œì •???¸ë“œ?¬ë¦¼", en: "Exhibition Concept Limited Edition Hand Cream", ja: "å±•ç¤º?³ãƒ³?»ãƒ—?ˆé™å®šç‰ˆ?ãƒ³?‰ã‚¯?ªãƒ¼?? },
            ownerTip: { ko: "ì§€??1ì¸??„ì‹œê´€?€ ?•ê¸°?ìœ¼ë¡??Œë§ˆê°€ ë°”ë€Œë‹ˆ ì²´í¬?˜ì„¸??", en: "The B1 exhibition theme changes regularly, so check it out.", ja: "?°ä¸‹1?ã®å±•ç¤ºé¤¨ã¯å®šæœŸ?„ã«?†ãƒ¼?ãŒå¤‰ã‚?‹ã®?§ãƒ?§ãƒƒ??—?¦ã? ã•?„ã€? }
        }
    },
    {
        id: "gangnam-strat-4",
        title: { ko: "ì²?‹´ '?¨ë¦¬?? ì²?‹´ - ?¤í”¼?¤ì? ë°?, en: "Alice Cheongdam - Speakeasy Bar", ja: "æ¸…æ½­?Œã‚¢?ªã‚¹?æ¸…æ½?- ?¹ãƒ”?¼ã‚¯?¤ãƒ¼?¸ãƒ¼?ãƒ¼" },
        category: "food",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??4ë²?ì¶œêµ¬ ?„ë³´ 3ë¶?, en: "3 min walk from Apgujeong Rodeo Station Exit 4", ja: "?é´äº?ƒ­?‡ã‚ªé§?4?ªå‡º??å¾’æ?3?? },
        description: { ko: "ê½ƒì§‘ ?¤ì— ?¨ê²¨ì§??™í™” ê°™ì? ë°? ê°•ë‚¨??ë¹„ë??¤ëŸ¬??ë°¤ì„ ì±…ì„ì§‘ë‹ˆ??", en: "A fairytale-like bar hidden behind a flower shop. Responsbile for secret nights in Gangnam.", ja: "?±å±‹??£?«éš ?•ã‚Œ?Ÿç«¥è©±ã®?ˆã†?ªãƒ?¼ã€‚æ±Ÿ?—ã®ç§˜å¯†??¤œ?’å½©?Šã¾?™ã€? },
        query: { ko: "ì²?‹´ ?¨ë¦¬??ë°?, en: "Alice Cheongdam Bar", ja: "æ¸…æ½­ ?¢ãƒª???ãƒ¼" },
        vipContent: {
            secretMenu: { ko: "? ë¼ êµ??…ì¥ê°??„ìš© ?œê·¸?ˆì²˜ ì¹µí…Œ??, en: "Rabbit Hole Entrance Exclusive Signature Cocktail", ja: "?¦ã‚µ??®ç©´ã®?¥å ´å®¢å°‚?¨ã‚·?°ãƒ?ãƒ£?¼ã‚«??ƒ†?? },
            ownerTip: { ko: "?…êµ¬??ì§„ì§œ ê½ƒì§‘ì²˜ëŸ¼ ë³´ì´ì§€ë§?ë¬¸ì„ ë°€ê³??¤ì–´ê°€ë©??©ë‹ˆ??", en: "The entrance looks like a real flower shop, just push the door.", ja: "?¥ã‚Š?£ã¯?¬ç‰©??Š±å±‹ã®?ˆã†?«è¦‹?ˆã¾?™ãŒ?ãƒ‰?¢ã‚’?¼ã—?‹ã‘??…¥?£ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "gangnam-strat-5",
        title: { ko: "ê°•ë‚¨ '?„ìš°??ë² ì´ì»¤ë¦¬' ?„ì‚°ë³¸ì ", en: "Our Bakery Dosan Main Store", ja: "æ±Ÿå—?Œã‚¢?¦ã‚¢?™ãƒ¼?«ãƒ¼?ªãƒ¼?å³¶å±±æœ¬åº? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        rating: 4.7,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??5ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Apgujeong Rodeo Station Exit 5", ja: "?é´äº?ƒ­?‡ã‚ªé§?5?ªå‡º??å¾’æ?10?? },
        description: { ko: "????ë² ì–´ ë¬¼ë©´ ë©ˆì¶œ ???†ëŠ” '?”í‹°ì´ˆì½”'???±ì?.", en: "Grand central for 'Dirty Chocolate' that you can't stop eating once you bite.", ja: "ä¸€?£é£Ÿ?¹ãŸ?‰æ??¾ã‚‰?ªã„?Œã??¼ãƒ†?£ãƒ¼?ãƒ§?³ã€ã®?–åœ°?? },
        query: { ko: "?„ìš°?´ë² ?´ì»¤ë¦??„ì‚°", en: "Our Bakery Dosan", ja: "?¢ã‚¦?¢ãƒ™?¼ã‚«?¼ãƒª??å³¶å±±" },
        vipContent: {
            secretMenu: { ko: "?ˆì•½ êµ¬ë§¤ ?„ìš© ?„ë¦¬ë¯¸ì—„ ?¤í†¨??, en: "Pre-order Only Premium Stollen", ja: "äºˆç´„è³¼å…¥å°‚ç”¨?—ãƒ¬?Ÿã‚¢? ã‚·?¥ãƒˆ?¼ãƒ¬?? },
            ownerTip: { ko: "?”í‹°ì´ˆì½”???•í•´ì§??œê°„?ë§Œ ?˜ì˜¤??ì¶œê³  ?œê°„??ë¯¸ë¦¬ ?•ì¸?˜ì„¸??", en: "Dirty Chocolate only comes out at set times, check the schedule.", ja: "?€?¼ãƒ†?£ãƒ¼?ãƒ§?³ã¯æ±ºã¾?£ãŸ?‚é–“?«ã—?‹å‡º?ªã„??§?ç„¼?ä¸Š?Œã‚Š?‚é–“?’äº‹?ã«ç¢ºèª?—ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "gangnam-strat-6",
        title: { ko: "??‚¼ '?¼í„°?„ë“œ' ê³ ë©” ?¤íŠ¸ë¦¬íŠ¸", en: "Centerfield Gourmet Street Yeoksam", ja: "é§…ä¸‰?Œã‚»?³ã‚¿?¼ãƒ•?£ãƒ¼?«ãƒ‰?ã‚°?«ãƒ¡?¹ãƒˆ?ªãƒ¼?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        rating: 4.8,
        transport: { ko: "??‚¼??8ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Yeoksam Station Exit 8", ja: "é§…ä¸‰é§?8?ªå‡º??å¾’æ?5?? },
        description: { ko: "ë¹„ì¦ˆ?ˆìŠ¤ ë¯¸íŒ…ê³?ë¯¸ì‹???™ì‹œ???´ê²°?˜ëŠ” ?Œí—¤?€ë¡œì˜ ?ˆë¡œ???¬ì¥.", en: "The new heart of Teheran-ro for both business meetings and fine dining.", ja: "?“ã‚¸?ã‚¹?Ÿãƒ¼?†ã‚£?³ã‚°?¨ç¾é£Ÿã‚’?Œæ™‚?«è§£æ±ºã™?‹ãƒ†?˜ë?è·?®?°ã—?„ä¸­å¿ƒåœ°?? },
        query: { ko: "??‚¼ ?¼í„°?„ë“œ ë§›ì§‘", en: "Centerfield Yeoksam", ja: "é§…ä¸‰ ?»ãƒ³?¿ãƒ¼?•ã‚£?¼ãƒ«?? },
        vipContent: {
            secretMenu: { ko: "?…ì  ?ˆìŠ¤? ë‘ ?°í•© VIP ì½”ìŠ¤", en: "Integrated Restaurant Union VIP Course", ja: "?¥åº—?¬ã‚¹?ˆãƒ©?³é€£åˆVIP?³ãƒ¼?? },
            ownerTip: { ko: "ì¡°ì„  ?°ë¦¬???¸í…” ?´ìš©ê°ì? ë³„ë„??ë°œë › ?œë¹„?¤ë? ?´ìš©?????ˆìŠµ?ˆë‹¤.", en: "Josun Palace Hotel guests can use separate valet service.", ja: "?é??‘ãƒ¬?¹ãƒ›?†ãƒ«?©ç”¨å®¢ã¯?¥é€”ã®?ãƒ¬?¼ã‚µ?¼ãƒ“?¹ã‚’?©ç”¨?§ã?¾ã™?? }
        }
    },
    {
        id: "gangnam-strat-7",
        title: { ko: "?¼ì‚° 'ì¡°ì„ ?°ë¦¬?? 1914 ?¼ìš´ì§€", en: "Josun Palace 1914 Lounge", ja: "è«–å±±?Œæœé®?ƒ‘?¬ã‚¹??914?©ã‚¦?³ã‚¸" },
        category: "food",
        image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=800&q=80",
        rating: 5.0,
        transport: { ko: "??‚¼??8ë²?ì¶œêµ¬ ?¸ê·¼", en: "Near Yeoksam Station Exit 8", ja: "é§…ä¸‰é§?8?ªå‡º?£ä»˜è¿? },
        description: { ko: "?•ë„?ì¸ ?œí‹°ë·°ì? ?¨ê»˜ ì¦ê¸°???˜ì´?”ë“œ ì¹µí…Œ?¼ê³¼ ? í”„?°ëˆˆ ??", en: "High-end cocktails and afternoon tea with an overwhelming city view.", ja: "?§å€’çš„?ªã‚·?†ã‚£?“ãƒ¥?¼ã¨?±ã«æ¥½ã—?€?ã‚¤?¨ãƒ³?‰ãª?«ã‚¯?†ãƒ«?¨ã‚¢?•ã‚¿?Œãƒ¼?³ãƒ†?£ãƒ¼?? },
        query: { ko: "ì¡°ì„ ?°ë¦¬???¼ìš´ì§€", en: "Josun Palace 1914 Lounge", ja: "?é??‘ãƒ¬???©ã‚¦?³ã‚¸" },
        vipContent: {
            secretMenu: { ko: "ìµœìƒì¸??…ì  ?¼ê²½ ?¨í‚¤ì§€", en: "Top Floor Exclusive Night View Package", ja: "?€ä¸Šéš?¬å å¤œæ™¯?‘ãƒƒ?±ãƒ¼?? },
            ownerTip: { ko: "ì£¼ë§ ì°½ê??ì? ?¼ì£¼?????ˆì•½??ë§ˆê°?˜ëŠ” ê²½ìš°ê°€ ë§ìŠµ?ˆë‹¤.", en: "Weekend window seats are often booked a week in advance.", ja: "?±æœ«??ª“?´ã®å¸?¯1?±é–“?ã«äºˆç´„?ŒåŸ‹?¾ã‚‹?“ã¨?Œå¤š?„ã§?™ã€? }
        }
    },
    {
        id: "gangnam-strat-8",
        title: { ko: "?¼ì„± 'ë³„ë§ˆ???„ì„œê´€'", en: "Starfield Library Samseong", ja: "ä¸‰æˆ?Œãƒ”?§ãƒ«?ã??³å›³?¸é¤¨?? },
        category: "travel",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?¼ì„±??6ë²?ì¶œêµ¬ ì½”ì—‘???°ê²°", en: "Connected to COEX from Samseong Station Exit 6", ja: "ä¸‰æˆé§?6?ªå‡º??COEX?´çµ" },
        description: { ko: "ì§€?±ë? ?˜ì¹˜??ê°•ë‚¨ ?„ëµ???•ì„. ê±°ë???ì±…ì¥??ì£¼ëŠ” ?•ë„?ì¸ ê°œë°©ê°?", en: "The standard of intellectual Gangnam strategy. Overwhelming openness from gigantic shelves.", ja: "?¥æ€§ã«?‚ãµ?Œã‚‹æ±Ÿå—??•¥??®š?³ã€‚å·¨å¤§ãª?¬æ£š?Œä¸?ˆã‚‹?§å€’çš„?ªé–‹?¾æ„Ÿ?? },
        query: { ko: "ì½”ì—‘??ë³„ë§ˆ?¹ë„?œê?", en: "Starfield Library Seoul", ja: "?”ãƒ§?«ãƒ?€?³å›³?¸é¤¨" },
        vipContent: {
            secretMenu: { ko: "?„ì„œê´€ ?ë ˆ?´í„° ì¶”ì²œ ?œí¬ë¦?ë¶?ë¦¬ìŠ¤??, en: "Library Curator Recommended Secret Book List", ja: "?³æ›¸é¤¨ã‚­?¥ãƒ¬?¼ã‚¿?¼ãŠ?™ã™?ã®?·ãƒ¼??ƒ¬?ƒãƒˆ?–ãƒƒ??ƒª?¹ãƒˆ" },
            ownerTip: { ko: "?ìŠ¤ì»¬ë ˆ?´í„°ë¥??€ê³??¬ë¼ê°€ë©?ì°ëŠ” ?•ë©´ ?·ì´ ê°€??? ëª…?©ë‹ˆ??", en: "The front shot from the escalator is the most famous.", ja: "?¨ã‚¹?«ãƒ¬?¼ã‚¿?¼ã«ä¹—ã‚Š?ªãŒ?‰æ’®?‹æ??¢ã‚·?§ãƒƒ?ˆãŒ?€?‚æœ‰?ã§?™ã€? }
        }
    },
    {
        id: "gangnam-strat-9",
        title: { ko: "ì²?‹´ 'ë³¸ìƒµ' - ?°ì˜ˆ??ë©”ì´?¬ì—…", en: "BON SHOP - Celebrity Makeup in Cheongdam", ja: "æ¸…æ½­?ŒBON SHOP??- ?¸èƒ½äººãƒ¡?¤ã‚¯" },
        category: "beauty",
        image: "https://images.unsplash.com/photo-1522338221030-42b3194a00e5?w=800&q=80",
        rating: 4.9,
        transport: { ko: "ì²?‹´??9ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Cheongdam Station Exit 9", ja: "æ¸…æ½­é§?9?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "K-?œë¼ë§?ì£¼ì¸ê³µì²˜??ë³´ì´ê³??¶ë‹¤ë©??„ìˆ˜ ì½”ìŠ¤. ê°•ë‚¨ ?¤í???ë³€? ì˜ ?µì‹¬.", en: "Essential course for K-drama transformation. The core of Gangnam style makeover.", ja: "K?‰ãƒ©?ã®ä¸»äºº?¬ã®?ˆã†?«ãª?ŠãŸ?„ãª?‰å¿…?ˆã‚³?¼ã‚¹?‚æ±Ÿ?—ã‚¹?¿ã‚¤?«å¤‰èº«ã®?¸å¿ƒ?? },
        query: { ko: "ì²?‹´??ë³¸ìƒµ", en: "BON SHOP Makeup Seoul", ja: "æ¸…æ½­æ´?BON SHOP" },
        vipContent: {
            secretMenu: { ko: "?¼ìŠ¤??ì»¬ëŸ¬ ì§„ë‹¨ ë°?ë§ì¶¤ ?”ì¥??ì¶”ì²œ", en: "Personal Color Diagnosis & Custom Cosmetics", ja: "?‘ãƒ¼?½ãƒŠ?«ã‚«?©ãƒ¼è¨ºæ–­?¨å€‹äºº?‘ã‘?–ç²§?ãŠ?™ã™?? },
            ownerTip: { ko: "? ëª… ?„í‹°?¤íŠ¸ ì§€ëª???ì¶”ê? ?”ê¸ˆ???ˆì?ë§?ë§Œì¡±?„ëŠ” 200%?…ë‹ˆ??", en: "Top artists cost extra but satisfaction is 200%.", ja: "?‰å?¢ãƒ¼?†ã‚£?¹ãƒˆ?‡å?‚ã«??¿½? æ–™?‘ãŒ?‚ã‚Š?¾ã™?Œã€æ?è¶³åº¦??00%?§ã™?? }
        }
    },
    {
        id: "gangnam-strat-10",
        title: { ko: "? ì‚¬ '? í?ëª¬ìŠ¤?? ?˜ìš°???„ì‚°", en: "Gentle Monster HAUS DOSAN", ja: "?°æ²™?Œã‚¸?§ãƒ³?ˆãƒ«?¢ãƒ³?¹ã‚¿?¼ã€ãƒ?¦ã‚¹å³¶å±±" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??5ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Apgujeong Rodeo Station Exit 5", ja: "?é´äº?ƒ­?‡ã‚ªé§?5?ªå‡º??å¾’æ?10?? },
        description: { ko: "?ˆê²½?ì„ ?˜ì–´???ˆìˆ  ê³µê°„. ë¯¸ë˜ì§€?¥ì ???¤ì¹˜ ë¯¸ìˆ ê³??„ì´?¨ì–´ë¥?ë§Œë‚˜??ê³?", en: "Art space beyond an optical shop. Where futuristic installation art meets eyewear.", ja: "?¼é¡åº—ã‚’è¶…ãˆ?ŸèŠ¸è¡“ç©º?“ã€‚æœª?¥å¿—?‘çš„?ªã‚¤?³ã‚¹?¿ãƒ¬?¼ã‚·?§ãƒ³?¢ãƒ¼?ˆã¨?¢ã‚¤?¦ã‚§?¢ã«?ºä¼š?ˆã‚‹?´æ??? },
        query: { ko: "? í?ëª¬ìŠ¤???˜ìš°?¤ë„??, en: "HAUS DOSAN Gentle Monster", ja: "?¸ã‚§?³ãƒˆ?«ãƒ¢?³ã‚¹?¿ãƒ¼ ?ã‚¦?¹å³¶å±? },
        vipContent: {
            secretMenu: { ko: "?„ë°?´í¬ ?…ì  ?”ì???? ì˜ˆ?½ê¶Œ", en: "NUDAKE Exclusive Dessert Pre-order Voucher", ja: "NUDAKE?¬å ?‡ã‚¶?¼ãƒˆ?ˆè¡Œäºˆç´„æ¨? },
            ownerTip: { ko: "4ì¸??¥ìƒ ?•ì›?€ ???Œë ¤ì§€ì§€ ?Šì? ?ˆë“  ?¬í†  ?¤íŒŸ?…ë‹ˆ??", en: "The 4th-floor rooftop garden is a hidden photo spot.", ja: "4?ã®å±‹ä¸Šåº?œ’??‚?¾ã‚Š?¥ã‚‰?Œã¦?„ãª?„éš ?ŒãŸ?•ã‚©?ˆã‚¹?ãƒƒ?ˆã§?™ã€? }
        }
    },
    {
        id: "gangnam-strat-11",
        title: { ko: "?¼ì„± '?Œí¬ ?˜ì–???œìš¸' ???€ë²??˜ìš°??, en: "The Timber House - Park Hyatt Seoul", ja: "ä¸‰æˆ?Œãƒ‘?¼ã‚¯?ã‚¤?¢ãƒƒ?ˆã‚½?¦ãƒ«?ã‚¶?»ãƒ†?£ãƒ³?ãƒ¼?ã‚¦?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?¼ì„±??1ë²?ì¶œêµ¬ ë°”ë¡œ ??, en: "Right in front of Samseong Station Exit 1", ja: "ä¸‰æˆé§?1ë²ˆå‡º?£ã®?™ã?? },
        description: { ko: "?„ë‚ ë¡œê·¸ ë°”ì´???Œì•…ê³??¨ê»˜ ì¦ê¸°???„ë¦¬ë¯¸ì—„ ?¼ì‹ ë°?& ?¤ë§ˆì¹´ì„¸.", en: "Premium Japanese bar & omakase with analog vinyl music.", ja: "?¢ãƒŠ??‚°?ã‚¤?Šãƒ«?³æ??¨å…±?«æ??—ã??—ãƒ¬?Ÿã‚¢? å’Œé£Ÿãƒ?¼ï¼†?Šã¾?‹ã›?? },
        query: { ko: "?Œí¬?˜ì–???€ë²„í•˜?°ìŠ¤", en: "The Timber House Seoul", ja: "?‘ãƒ¼??ƒ?¤ã‚¢?ƒãƒˆ ?†ã‚£?³ãƒ?¼ãƒ?¦ã‚¹" },
        vipContent: {
            secretMenu: { ko: "?¬ê? ?„ìŠ¤??ì»¬ë ‰???„ë¼?´ë¹— ?œìŒ", en: "Private Rare Whisky Tasting", ja: "å¸Œå°‘?¦ã‚£?¹ã‚­?¼ã‚³?¬ã‚¯?·ãƒ§?³ãƒ—?©ã‚¤?™ãƒ¼?ˆè©¦é£? },
            ownerTip: { ko: "?¼ì´ë¸?ê³µì—°???ˆëŠ” ?€???œê°„??ë°©ë¬¸?˜ë©´ ë¶„ìœ„ê¸°ê? ë°°ê? ?©ë‹ˆ??", en: "Visit during evening live performances for doubled atmosphere.", ja: "?©ã‚¤?–å…¬æ¼”ãŒ?‚ã‚‹å¤•æ–¹??™‚?“ã«è¨ªå•?™ã‚‹?¨é›°?²æ°—?Œå€å¢—?—ã¾?™ã€? }
        }
    },
    {
        id: "gangnam-strat-12",
        title: { ko: "ì²?‹´ '?¤í™”?? ?Œë˜ê·¸ì‹­ ?¤í† ??, en: "Sulwhasoo Flagship Store Cheongdam", ja: "æ¸…æ½­?Œé›ª?±ç??ãƒ•?©ãƒƒ?°ã‚·?ƒãƒ—?¹ãƒˆ?? },
        category: "beauty",
        image: "https://images.unsplash.com/photo-1540555700478-4be289aef09a?w=800&q=80",
        rating: 5.0,
        transport: { ko: "?•êµ¬?•ì—­ 3ë²?ì¶œêµ¬ ?„ë³´ 15ë¶?, en: "15 min walk from Apgujeong Station Exit 3", ja: "?é´äº?§… 3ë²ˆå‡º??å¾’æ?15ë¶? },
        description: { ko: "?œêµ­ ?„í†µ??ì§€?œë? ?„ë??ìœ¼ë¡??¬í•´?í•œ ??…”ë¦?ë·°í‹° ê³µê°„.", en: "Luxury beauty space reinterpreting traditional Korean wisdom modernly.", ja: "?“å›½ä¼çµ±??Ÿ¥?µã‚’?¾ä»£?„ã«?ç¢ºèªã—?Ÿãƒ©?°ã‚¸?¥ã‚¢?ªãƒ¼?“ãƒ¥?¼ãƒ†?£ç©º?“ã€? },
        query: { ko: "?¤í™”???„ì‚° ?Œë˜ê·¸ì‹­", en: "Sulwhasoo Bukchon/Cheongdam", ja: "?ªèŠ±ç§€ ?•ãƒ©?ƒã‚°?·ãƒƒ?—ã‚¹?ˆã‚¢" },
        vipContent: {
            secretMenu: { ko: "VIP ?„ìš© ?œë°© ???¸ë ˆëª¨ë‹ˆ", en: "VIP-only Oriental Tea Ceremony", ja: "VIPå°‚ç”¨?“æ–¹?†ã‚£?¼ã‚»?¬ãƒ¢?‹ãƒ¼" },
            ownerTip: { ko: "ë£¨í”„?‘ì˜ ê¸ˆìƒ‰ êµ¬ì¡°ë¬¼ì? ?¬ì§„???•ë§ ???˜ì˜¤??ëª…ë‹¹?…ë‹ˆ??", en: "The gold structure on the rooftop is a perfect photo spot.", ja: "å±‹ä¸Š??‡‘?²ã®æ§‹é€ ç‰©??†™?ŸãŒ?¬å½“?«ç¶ºéº—ã«??‚Œ?‹ç‰¹ç­‰å¸­?§ã™?? }
        }
    },
    {
        id: "gangnam-strat-13",
        title: { ko: "? ì‚¬ '?¬ë§?¤ì¹œ' ë¸ŒëŸ°ì¹?, en: "Darling Kitchen Sinsa", ja: "?°æ²™?Œã??¼ãƒª?³ã‚­?ƒãƒ?³ã€ãƒ–?©ãƒ³?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
        rating: 4.7,
        transport: { ko: "?•êµ¬?•ì—­ 3ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Apgujeong Station Exit 3", ja: "?é´äº?§… 3ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "?¼í˜„??ì£¼íƒê°€ ??? ëŸ½ ê°ì„± ê°€?í•œ ë¸ŒëŸ°ì¹?ì¹´í˜.", en: "European vibe brunch cafe in the residential alleys of Nonhyeon.", ja: "è«–å³´æ´ã®ä½å®…è¡—ã«?‚ã‚‹?¨ãƒ¼??ƒƒ?‘ã®?Ÿæ€§è±Š?‹ãª?–ãƒ©?³ãƒ?«ãƒ•?§ã€? },
        query: { ko: "?¼í˜„ ?¬ë§?¤ì¹œ", en: "Darling Kitchen Seoul", ja: "è«–å³´ ?€?¼ãƒª?³ã‚­?ƒãƒ?? },
        vipContent: {
            secretMenu: { ko: "?Œë¼??ì¢Œì„ ?„ìš© ?œì •??ë¸ŒëŸ°ì¹?ë³´ë“œ", en: "Terrace-only Limited Edition Brunch Board", ja: "?†ãƒ©?¹å¸­å°‚ç”¨?å®š?ˆãƒ–?©ãƒ³?ãƒœ?¼ãƒ‰" },
            ownerTip: { ko: "?‡ì‚´??ì¢‹ì? ??2ì¸??Œë¼??ì¢Œì„??ê°•ë ¥ ì¶”ì²œ?©ë‹ˆ??", en: "Highly recommend the 2nd-floor terrace on sunny days.", ja: "?¥å·®?—ã®??„?¥ã€??ã®?†ãƒ©?¹å¸­?’å¼·?ãŠ?™ã™?ã—?¾ã™?? }
        }
    },
    {
        id: "gangnam-strat-14",
        title: { ko: "?•êµ¬??'?„ê??„ê?' ì§??„ì‚°", en: "Wiggle Wiggle Zip Dosan", ja: "?é´äº?€Œã‚¦?£ã‚°?«ã‚¦?£ã‚°?«ã€å? å³¶å±±" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??5ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Apgujeong Rodeo Station Exit 5", ja: "?é´äº?ƒ­?‡ã‚ªé§?5?ªå‡º??å¾’æ?5ë¶? },
        description: { ko: "ë¹„ë¹„?œí•œ ?‰ê°ê³??¤ì¹˜???”ì?¸ìœ¼ë¡?ê°€?í•œ ?¼ì´?„ìŠ¤?€???¤í† ??", en: "Lifestyle store full of vivid colors and kitschy designs.", ja: "?“ãƒ“?ƒãƒ‰?ªè‰²ä½¿ã„?¨ã‚­?ƒãƒ?¥ãª?‡ã‚¶?¤ãƒ³?«ã‚?µã‚Œ?Ÿãƒ©?¤ãƒ•?¹ã‚¿?¤ãƒ«?¹ãƒˆ?¢ã€? },
        query: { ko: "?„ê??„ê? ?„ì‚°", en: "Wiggle Wiggle Seoul", ja: "?¦ã‚£?°ãƒ«?¦ã‚£?°ãƒ« å³¶å±±" },
        vipContent: {
            secretMenu: { ko: "?œì •??ìºë¦­??êµ¿ì¦ˆ ?¨í‚¤ì§€", en: "Limited Character Goods Package", ja: "?å®š?ˆã‚­?£ãƒ©??‚¿?¼ã‚°?ƒã‚º?‘ãƒƒ?±ãƒ¼?? },
            ownerTip: { ko: "ëª¨ë“  ì¸µì´ ?¬í† ì¡´ì´??ë°°í„°ë¦¬ë? ê°€??ì±„ì›Œ ë°©ë¬¸?˜ì„¸??", en: "Every floor is a photo spot, come with a full battery.", ja: "?¨ãƒ•??‚¢?Œãƒ•?©ãƒˆ?¹ãƒ?ƒãƒˆ?ªã®?§ã€ãƒ?ƒãƒ†?ªãƒ¼?’ãƒ•?«å……?»ã—??¨ª?ã—?¦ã? ã•?„ã€? }
        }
    },
    {
        id: "gangnam-strat-15",
        title: { ko: "ì²?‹´ '?¤íŠœ?”ì˜¤ 21' - K-Pop ?„ìŠ¤ ì²´í—˜", en: "Studio 21 - K-Pop Dance Class in Cheongdam", ja: "æ¸…æ½­?Œã‚¹?¿ã‚¸??1??- K-POP?€?³ã‚¹ä½“é¨“" },
        category: "activity",
        image: "https://images.unsplash.com/photo-1547153760-18fc26394bb1?w=800&q=80",
        rating: 4.9,
        transport: { ko: "ì²?‹´??13ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Cheongdam Station Exit 13", ja: "æ¸…æ½­é§?13ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "?„ì§ ?„ì´??ë°±ëŒ„?œë“¤?ê²Œ ì§ì ‘ ë°°ìš°??1???„ìŠ¤ ?´ë˜??", en: "1-day dance class taught by active idol backup dancers.", ja: "?¾å½¹?¢ã‚¤?‰ãƒ«?ãƒƒ????³ã‚µ?¼ã‹?‰ç›´?¥å????¥ã??³ã‚¹??ƒ©?¹ã€? },
        query: { ko: "ì²?‹´ K???„ìŠ¤", en: "Cheongdam K-Pop Dance Studio", ja: "æ¸…æ½­ K-POP?€?³ã‚¹" },
        vipContent: {
            secretMenu: { ko: "?„ìŠ¤ ë§ˆìŠ¤?°ì˜ 1:1 ?¬ì¸???ˆìŠ¨", en: "1:1 Point Lesson by Dance Master", ja: "?€?³ã‚¹?ã‚¹?¿ãƒ¼?«ã‚ˆ??:1?ã‚¤?³ãƒˆ?¬ãƒƒ?¹ãƒ³" },
            ownerTip: { ko: "?˜ì—… ???„ë¬¸ê°€??ì¡°ëª… ?„ë˜???¼ì¸  ì´¬ì˜???„ì??œë¦½?ˆë‹¤.", en: "Assistance for filming Shorts under pro lighting after class.", ja: "?¬ãƒƒ?¹ãƒ³??¾Œ?ãƒ—??”¨??…§?ã®ä¸‹ã§?·ãƒ§?¼ãƒˆ?•ç”»??’®å½±ã‚’?Šæ‰‹ä¼ã„?—ã¾?™ã€? }
        }
    },
    {
        id: "gangnam-strat-16",
        title: { ko: "??‚¼ 'ë£¨í”„ 808' - ?¼ê²½ ?¼ìš´ì§€", en: "Roof 808 - Night View Lounge in Yeoksam", ja: "é§…ä¸‰?Œãƒ«?¼ãƒ•808??- å¤œæ™¯?©ã‚¦?³ã‚¸" },
        category: "food",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        rating: 4.6,
        transport: { ko: "? ë…¼?„ì—­ 5ë²?ì¶œêµ¬ ë°”ë¡œ ??, en: "Right in front of Sinnonhyeon Station Exit 5", ja: "?°è«–å³´é§… 5?ªå‡º?£ã®?™ã?? },
        description: { ko: "ê°•ë‚¨?€ë¡œì˜ ?”ë ¤???¼ê²½???œëˆˆ???´ìœ¼ë©?ì¦ê¸°??ë£¨í”„??ë°?", en: "Rooftop bar to enjoy the brilliant night view of Gangnam-daero.", ja: "æ±Ÿå—å¤§è·¯??¯?„ã‹?ªå¤œ??‚’ä¸€?›ã—?ªãŒ?‰æ??—ã?å±‹ä¸Š?ãƒ¼?? },
        query: { ko: "ê°•ë‚¨ ë£¨í”„ 808", en: "Roof 808 Gangnam", ja: "æ±Ÿå— ?«ãƒ¼??08" },
        vipContent: {
            secretMenu: { ko: "ë°”í…???¤í˜??ì»¤ìŠ¤?€ ì¹µí…Œ??, en: "Bartender Special Custom Cocktail", ja: "?ãƒ¼?†ãƒ³?€?¼ã‚¹?šã‚·?£ãƒ«?«ã‚¹?¿ãƒ ?«ã‚¯?†ãƒ«" },
            ownerTip: { ko: "?¼ê°„?ëŠ” ë°”ëŒ??ë§ì´ ë¶????ˆìœ¼???‡ì? ê²‰ì˜·??ì±™ê¸°?¸ìš”.", en: "Bring a light jacket as it can be windy at night.", ja: "å¤œé–“??¢¨?Œå¼·?„å ´?ˆãŒ?‚ã‚‹??§?è–„?‹ã®ä¸Šç??’ç”¨?ã—?¦ã? ã•?„ã€? }
        }
    },
    {
        id: "gangnam-strat-17",
        title: { ko: "?¼ì„± '?¬ìŠ¤ì½??¼í„°' ?„ì¿ ?„ë¦¬?€ ë¡œë¹„", en: "POSCO Center Aquarium Lobby", ja: "ä¸‰æˆ?ŒPOSCO?»ãƒ³?¿ãƒ¼?ã‚¢??‚¢?ªã‚¦? ãƒ­?“ãƒ¼" },
        category: "travel",
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
        rating: 4.7,
        transport: { ko: "?¼ì„±??4ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Samseong Station Exit 4", ja: "ä¸‰æˆé§?4ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "ë¹Œë”© ????ê±°ë????í†µ???˜ì¡±ê´€. ??…”ë¦??¤í”¼??ë¶„ìœ„ê¸°ë? ë§Œë½?˜ì„¸??", en: "Gigantic cylindrical aquarium in the building forest. Enjoy the luxury office vibe.", ja: "?“ãƒ«ç¾¤ã®ä¸?«?‚ã‚‹å·¨å¤§?ªå††ç­’å½¢æ°´æ—é¤¨ã€‚ãƒ©?°ã‚¸?¥ã‚¢?ªãƒ¼?ªã‚ª?•ã‚£?¹ã®?°å›²æ°—ã‚’æº€?«ã—?¦ã? ã•?„ã€? },
        query: { ko: "?¬ìŠ¤ì½”ì„¼???˜ì¡±ê´€", en: "POSCO Center Seoul", ja: "POSCO?»ãƒ³?¿ãƒ¼ æ°´æ—é¤? },
        vipContent: {
            secretMenu: { ko: "?¼í„° ??ì¹´í˜ ê³ ë¦´???¼ìš´ì§€ ?´ìš©ê¶?, en: "Center Cafe Gorilla Lounge Voucher", ja: "?»ãƒ³?¿ãƒ¼?…ã‚«?•ã‚§?Œã‚´?ªãƒ©?©ã‚¦?³ã‚¸?åˆ©?¨åˆ¸" },
            ownerTip: { ko: "?‰ì¼ ?ì‹¬?œê°„ ?´í›„ê°€ ê°€???œì‚°?˜ì—¬ ?¬ì§„ ì°ê¸° ì¢‹ìŠµ?ˆë‹¤.", ja: "å¹³æ—¥?©ãƒ³?ã‚¿?¤ãƒ ä»¥é™?Œæ??‚ç©º?„ã¦?„ã¦?™çœŸ??½±?«æ??©ã§?™ã€? }
        }
    },
    {
        id: "gangnam-strat-18",
        title: { ko: "? ì‚¬ '?¤ë…ë°??? - ê°ì„± ë°?, en: "Oden Bar Den Sinsa", ja: "?°æ²™?ŒãŠ?§ã‚“?ãƒ¼ DEN??- ?Ÿæ€§ãƒ?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
        rating: 4.8,
        transport: { ko: "? ì‚¬??8ë²?ì¶œêµ¬ ?„ë³´ 8ë¶?, en: "8 min walk from Sinsa Station Exit 8", ja: "?°æ²™é§?8ë²ˆå‡º??å¾’æ?8ë¶? },
        description: { ko: "ê°€ë¡œìˆ˜ê¸¸ì˜ ì¡°ìš©??ê³¨ëª© ???„ë¦¬ë¯¸ì—„ ?¤ë…ë°? ê°•ë‚¨???Œë°•?˜ì?ë§?ê³ ê¸‰?¤ëŸ¬??ë°?", en: "Premium oden bar in a quiet alley of Garosu-gil. Simple yet classy Gangnam night.", ja: "è¡—è·¯æ¨¹é€šã‚Š??™?‹ãªè·?œ°è£ã«?‚ã‚‹?—ãƒ¬?Ÿã‚¢? ãŠ?§ã‚“?ãƒ¼?‚æ±Ÿ?—ã®ç´ æœ´?ªãŒ?‰ã‚‚é«˜ç´š?Ÿã‚?µã‚Œ?‹å¤œ?? },
        query: { ko: "ê°€ë¡œìˆ˜ê¸???, en: "Oden Bar Den Seoul", ja: "è¡—è·¯æ¨¹é€šã‚Š DEN" },
        vipContent: {
            secretMenu: { ko: "?¥ì¸??ë¹šì? ?˜ì œ ?´ë¬µ ?¹ë³„ ëª¨ë“¬", en: "Artisan Handmade Oden Special Platter", ja: "?·äºº?Œä½œ?£ãŸ?‹ä½œ?ŠãŠ?§ã‚“?¹åˆ¥?›ã‚Š?ˆã‚?? },
            ownerTip: { ko: "ë°?ì¢Œì„?€ 2???ë‹˜ ?„ì£¼?´ë©°, ?ˆì•½ ?†ì´ ë°©ë¬¸ ???€ê¸°ê? ê¸????ˆìŠµ?ˆë‹¤.", en: "Bar seats for 2 mainly, long wait if visiting without booking.", ja: "?«ã‚¦?³ã‚¿?¼å¸­???æ§˜?Œä¸»?§ã€äºˆç´„ãª?—ã®è¨ªå•? ã¨å¾…ã¡?‚é–“?Œé•·?ãª?‹å ´?ˆãŒ?‚ã‚Š?¾ã™?? }
        }
    },
    {
        id: "gangnam-strat-19",
        title: { ko: "?•êµ¬??'?°ë˜ ë² ì´ê¸€ ë®¤ì??? ?„ì‚°", en: "London Bagel Museum Dosan", ja: "?é´äº?€Œãƒ­?³ãƒ‰?³ãƒ™?¼ã‚°?«ãƒŸ?¥ãƒ¼?¸ã‚¢? ã€å³¶å±? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?•êµ¬?•ë¡œ?°ì˜¤??5ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Apgujeong Rodeo Station Exit 5", ja: "?é´äº?ƒ­?‡ã‚ªé§?5?ªå‡º??å¾’æ?10?? },
        description: { ko: "?¤í”ˆ ?„ë???ì¤??œëŠ” ?„êµ­êµ?ë² ì´ê¸€ ?±ì?. ê°•ë‚¨ ?¤í”ˆ?°ì˜ ?ì§•.", en: "The bagel holy ground with lines before opens. Symbol of Gangnam open-run.", ja: "?‹åº—?ã‹?‰åˆ—?Œã§?ã‚‹?¨å›½?ºã®?™ãƒ¼?°ãƒ«??–?°ã€‚æ±Ÿ?—ã‚ª?¼ãƒ—?³ãƒ©?³ã®è±¡å¾´?? },
        query: { ko: "?°ë˜ë² ì´ê¸€ë®¤ì????„ì‚°", en: "London Bagel Museum Seoul", ja: "??ƒ³?‰ãƒ³?™ãƒ¼?°ãƒ«?Ÿãƒ¥?¼ã‚¸?¢ãƒ  å³¶å±±" },
        vipContent: {
            secretMenu: { ko: "VIP ?„ìš© ?€ê¸??†ëŠ” ?Œì´?¬ì•„???œë¹„??, en: "VIP-only No-wait Takeaway Service", ja: "VIPå°‚ç”¨å¾…ã¡?‚é–“?ªã—??ƒ†?¤ã‚¯?¢ã‚¦?ˆã‚µ?¼ãƒ“?? },
            ownerTip: { ko: "?ê²© ì¤„ì„œê¸???? í”Œë¦¬ì??´ì…˜ 'ìºì¹˜?Œì´ë¸???ë°˜ë“œ???œìš©?˜ì„¸??", en: "Must use 'CatchTable' app for remote queuing.", ja: "? éš”è¡Œåˆ—?¢ãƒ—?ªã€Œã‚­?£ãƒƒ?ãƒ†?¼ãƒ–?«ã€ã‚’å¿…ãšæ´»ç”¨?—ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "gangnam-strat-20",
        title: { ko: "ì²?‹´ '?¤íŠœ?”ì˜¤ ê³ ìœ ' - ?¼ìŠ¤???œë³µ ì´¬ì˜", en: "Studio Goyu - Personal Hanbok Photo in Cheongdam", ja: "æ¸…æ½­?Œã‚¹?¿ã‚¸?ªå›º?‰ã€?- ?‘ãƒ¼?½ãƒŠ?«éŸ“?æ’®å½? },
        category: "activity",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?w=800&q=80",
        rating: 5.0,
        transport: { ko: "ê°•ë‚¨êµ¬ì²­??4ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Gangnam-gu Office Station Exit 4", ja: "æ±Ÿå—?ºåºé§?4?ªå‡º??å¾’æ?10ë¶? },
        description: { ko: "?¼ë°˜ ?¬ì§„ê´€ê³¼ëŠ” ê²©ì´ ?¤ë¥¸ ?˜ì´?”ë“œ ?¸ë¬¼ ?„ë¡œ???¤íŠœ?”ì˜¤.", en: "High-end portrait profile studio with a different class from usual shops.", ja: "ä¸€?¬çš„?ªå†™?Ÿé¤¨?¨ã¯ä¸€ç·šã‚’?»ã™?ã‚¤?¨ãƒ³?‰ãªäººç‰©?—ãƒ­?•ã‚¡?¤ãƒ«?¹ã‚¿?¸ã‚ª?? },
        query: { ko: "ì²?‹´???„ë¡œ?„ì‚¬ì§?, en: "Studio Goyu Cheongdam", ja: "æ¸…æ½­æ´??—ãƒ­?•ã‚£?¼ãƒ«?™çœŸ" },
        vipContent: {
            secretMenu: { ko: "ë©”ì¸ ?‘ê? 1:1 ë§ì¶¤ ë³´ì • ë¬´ì œ??, en: "Main Photographer 1:1 Custom Retouching Unlimited", ja: "?¡ã‚¤?³ä½œå®¶ã«?ˆã‚‹1:1?‹äºº?‘ã‘ä¿???¡åˆ¶?? },
            ownerTip: { ko: "ê°•ë‚¨ ?„ìŠ¹ ?„ëµ??ë§ˆì?ë§‰ì? ?¸ìƒ?·ì…?ˆë‹¤. ë¯¸ë¦¬ ì»¨ì…‰???¡ê³  ?¤ì„¸??", en: "Final boss of Gangnam strategy is life-shot. Pick a concept first.", ja: "æ±Ÿå—å¿…å‹??•¥??· ?ã?ã‚Š??€Œäºº?Ÿã‚·?§ãƒƒ?ˆã€ã§?™ã€‚äº‹?ã«?³ãƒ³?»ãƒ—?ˆã‚’æ±ºã‚??¥?¦ã? ã•?„ã€? }
        },
    {
        id: "solo-bbq-seoul-1",
        title: { ko: "ê°•ë‚¨ '?¡ì „?ë‹¹' 4?¸ì  - 1?¸ë¶„ ê°€??, en: "Yookjeon Sikdang Gangnam - Solo Friendly", ja: "æ±Ÿå—?Œãƒ¦??‚¸?§ãƒ³?·ã‚¯?¿ãƒ³??4?·åº— - 1äººå‰??ƒ½" },
        category: "food",
        image: "https://images.unsplash.com/photo-1632766329864-16d552655848?w=800&q=80",
        rating: 4.8,
        transport: { ko: "ê°•ë‚¨??1ë²?ì¶œêµ¬ ?„ë³´ 5ë¶?, en: "5 min walk from Gangnam Station Exit 1", ja: "æ±Ÿå—é§?1?ªå‡º??å¾’æ?5?? },
        description: { ko: "?¸ìƒ ëª©ì‚´??ë§›ë³¼ ???ˆëŠ” ê³? ì§ì›??ì§ì ‘ êµ¬ì›Œì£¼ì–´ ?¼ì?œë„ ?„ë²½??êµ½ê¸°ë¥?ì¦ê¸¸ ???ˆìŠµ?ˆë‹¤.", en: "Taste the best pork neck. Staff grills for you, perfect for solo diners.", ja: "äººç”Ÿ?€é«˜ã®è±šè‚©??ƒ¼?¹ã‚’?³ã‚?ˆã‚‹?´æ??‚åº—?¡ãŒ?´æ¥?¼ã„?¦ã?Œã‚‹??§?ä?äººã§?‚å®Œ?§ãª?¼ã? æ¸›?’æ??—ã‚?¾ã™?? },
        query: { ko: "ê°•ë‚¨ ?¡ì „?ë‹¹", en: "Yookjeon Sikdang Gangnam", ja: "æ±Ÿå— ?¦ã‚¯?¸ãƒ§?³ã‚·??‚¿?? },
        price: 19000,
        vipContent: {
            secretMenu: { ko: "ë§ˆë¬´ë¦?ë³¶ìŒë°?VIP ? í•‘", en: "Fried Rice VIP Toppings", ja: "ç· ã‚??”é£?VIP?ˆãƒƒ?”ãƒ³?? },
            ownerTip: { ko: "?ì‹¬ ?œê°„ ì§í›„ ë°©ë¬¸?˜ë©´ ?¨ì´???†ì´ ?¼ë°¥?˜ê¸° ê°€??ì¢‹ìŠµ?ˆë‹¤.", en: "Visit right after lunch peak for best solo dining without wait.", ja: "?¼é£Ÿ?‚ç›´å¾Œã«è¨ªå•?™ã‚‹?¨ã€å¾…?¡æ™‚?“ãª?—ã§ä¸€äººé£¯?’æ??—ã‚?¾ã™?? }
        }
    },
    {
        id: "solo-bbq-seoul-2",
        title: { ko: "?œë‚¨ '?˜ë¦¬??ì§? - ?‰ë™ ?¼ê²¹???±ì?", en: "Nari's House Hannam - Frozen Pork Belly", ja: "æ¼¢å—?ŒãƒŠ?ªã‚£?ãƒƒ??- ?·å‡?µãƒ ??ƒ§?—ã‚µ?«è–?? },
        category: "food",
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80",
        rating: 4.6,
        transport: { ko: "?œê°•ì§„ì—­ 1ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Hangangjin Station Exit 1", ja: "æ¼¢æ±Ÿ??§… 1ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "?˜ìš”ë¯¸ì‹?Œê? ?¸ì •???‰ì‚¼???•ì„. 1?¸ë¶„ ì£¼ë¬¸?€ ?´ë µì§€ë§??¼ì 2?¸ë¶„?€ ê±°ëœ¬??ë§›ì…?ˆë‹¤.", en: "Standard of frozen pork belly recognized by food critics. Hard to order 1 portion, but easy to finish 2 alone.", ja: "æ°´æ›œç¾é£Ÿä¼šãŒèªã‚?Ÿå†·?ã‚µ? ã‚®?§ãƒ—?µãƒ«??®š?³ã€?äººå‰??³¨?‡ã¯?£ã—?„ã§?™ãŒ?ä?äººã§2äººå‰??½™è£•ã§é£Ÿã¹?‰ã‚Œ?‹å‘³?§ã™?? },
        query: { ko: "?´íƒœ?ë‚˜ë¦¬ì˜ì§?, en: "Nari's House Seoul", ja: "æ¢¨æ³°???Šãƒª?£ãƒ?? },
        vipContent: {
            secretMenu: { ko: "?´ê³³ë§Œì˜ ë¹„ë²• ?Œì ˆ??ì¶”ê? ?œê³µ", en: "Secret Seasoned Green Onion Refill", ja: "?“ã“? ã‘??§˜ä¼ãƒ??’Œ?ˆè¿½? æä¾? },
            ownerTip: { ko: "ì²?µ­?¥ì´ ?•ë§ ë§›ìˆ?¼ë‹ˆ ê³ ê¸°?€ ?¨ê»˜ ê¼?ì£¼ë¬¸?˜ì„¸??", en: "Cheonggukjang (rich soybean paste stew) is a must-order with meat.", ja: "?ãƒ§?³ã‚°?ƒãƒ?£ãƒ³?Œæœ¬å½“ã«ç¾å‘³?—ã„??§?è‚‰?¨ä?ç·’ã«å¿…ãšæ³¨æ–‡?—ã¦?ã ?•ã„?? }
        }
    },
    {
        id: "tea-tour-seoul-1",
        title: { ko: "ì¢…ë¡œ 'ì°?ë§ˆì‹œ???? - ?œì˜¥ ì°»ì§‘", en: "Cha Masineun Tteul - Hanok Tea House", ja: "?¾è·¯?Œãƒ?£ãƒ?·ãƒŒ?³ãƒˆ?¥ãƒ«??- ?“å±‹?¶å±‹" },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1555529731-118a5bb67af7?w=800&q=80",
        rating: 4.9,
        transport: { ko: "?ˆêµ­??2ë²?ì¶œêµ¬ ?„ë³´ 15ë¶?(ë¶ì´Œ)", en: "15 min walk from Anguk Station Exit 2", ja: "å®‰å›½é§?2ë²ˆå‡º??å¾’æ?15ë¶? },
        description: { ko: "ë¶ì´Œ???„ê²½???œëˆˆ???´ë ¤?¤ë³´?´ëŠ” ?·ì ëª¨ì–‘???„ë¦„?¤ìš´ ?œì˜¥ ì°»ì§‘.", en: "Beautiful U-shaped Hanok tea house overlooking Bukchon scenery.", ja: "?—æ‘??…¨??Œä¸€?›ã§?ã‚‹?ã‚³??­—?‹ã®ç¾ã—?„éŸ“å±‹èŒ¶å±‹ã€? },
        query: { ko: "?¼ì²­??ì°¨ë§ˆ?œëŠ”??, en: "Cha Masineun Tteul Bukchon", ja: "ä¸‰æ¸…æ´??ãƒ£?ã‚·?Œãƒ³?ˆã‚¥?? },
        vipContent: {
            secretMenu: { ko: "ê³„ì ˆ ?œì • ?˜ì œ ê½ƒì°¨", en: "Seasonal Handmade Flower Tea", ja: "å­£ç??å®š?‹ä½œ?ŠèŠ±?? },
            ownerTip: { ko: "ì¤‘ì •(ë§ˆë‹¹)??ê°€????ë³´ì´??ì¤‘ì•™ ?ë¦¬ê°€ ëª…ë‹¹?…ë‹ˆ??", en: "The center seat with the best view of the courtyard is the best.", ja: "ä¸?º­?Œä??ªã‚ˆ?è¦‹?ˆã‚‹ä¸?¤®??¸­?Œç‰¹ç­‰å¸­?§ã™?? }
        }
    },
    {
        id: "tea-tour-seoul-2",
        title: { ko: "?œì´Œ '?´ì´?? - ??ì½œë ‰?°ë¸Œ", en: "Eieom - Tea Collective Seochon", ja: "è¥¿æ‘?ŒEieom??- ?†ã‚£?¼ã‚³?¬ã‚¯?†ã‚£?? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1544333323-537ea8d44336?w=800&q=80",
        rating: 4.8,
        transport: { ko: "ê²½ë³µê¶ì—­ 2ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Gyeongbokgung Station Exit 2", ja: "??¦å®?§… 2ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "ë¯¸ë‹ˆë©€??ê°ì„±ê³??™ì–‘??ì°?ë¬¸í™”ê°€ ë§Œë‚˜??ì¡°ìš©???´ì‹ì²?", en: "A quiet retreat where minimal vibes meet Oriental tea culture.", ja: "?Ÿãƒ‹?ãƒ«?ªæ„Ÿ?§ã¨?±æ´‹??Š?¶æ–‡?–ãŒ?åˆ?™ã‚‹?™ã‹?ªä¼‘????? },
        query: { ko: "?œì´Œ ?´ì´??, en: "Eieom Seochon", ja: "è¥¿æ‘ Eieom" },
        vipContent: {
            secretMenu: { ko: "?„ë¼?´ë¹— ?¤ë„ ?¸ì…˜ ?ˆì•½ê¶?, en: "Private Tea Ceremony Session Voucher", ja: "?—ãƒ©?¤ãƒ™?¼ãƒˆ?¶é“?»ãƒƒ?·ãƒ§?³äºˆç´„æ¨©" },
            ownerTip: { ko: "ì°¨ì? ?¨ê»˜ ?œê³µ?˜ëŠ” ?¤ê³¼ê°€ ë§¤ìš° ?•ê°ˆ?˜ë©° ?¸ìŠ¤?€ê·¸ë¨ ?¬ì§„?©ìœ¼ë¡?ìµœê³ ?…ë‹ˆ??", en: "The refreshments served with tea are very neat and great for Instagram.", ja: "?ŠèŒ¶?¨ä?ç·’ã«?ºã•?Œã‚‹?Šè“å­ãŒ?å¸¸?«ä¸Š?ã§?ã‚¤?³ã‚¹?¿æ˜ ?ˆé–“?•ã„?ªã—?§ã™?? }
        }
    },
    {
        id: "solo-bbq-seoul-3",
        title: { ko: "ë§ì› '?œê°•ê»ë°ê¸? - ?¨ê³¨?¤ì˜ ?±ì?", en: "Hangang Kkeopdegi - Locals' Favorite", ja: "?›é ?Œæ¼¢æ±Ÿã‚³?—ãƒ†??€?- å¸¸é€£ãŸ?¡ã®?–åœ°" },
        category: "food",
        image: "https://images.unsplash.com/photo-1590577976322-3d2d6e2133de?w=800&q=80",
        rating: 4.7,
        transport: { ko: "ë§ì›??2ë²?ì¶œêµ¬ ?„ë³´ 12ë¶?, en: "12 min walk from Mangwon Station Exit 2", ja: "?›é é§?2ë²ˆå‡º??å¾’æ?12ë¶? },
        description: { ko: "?°ì˜ˆ?¸ë“¤??ì¤??œì„œ ë¨¹ëŠ” ë§ì›???€??ë§›ì§‘. ì£½ì—¬ì£¼ëŠ” ì¹¼êµ­?˜ì? ê»ë°ê¸°ì˜ ì¡°í™”.", en: "Mangwon-dong's top spot where even celebrities queue. Great combo of Kalguksu and pork rind.", ja: "?¸èƒ½äººã‚‚ä¸¦ã‚“?§é£Ÿ?¹ã‚‹?›é æ´ã®ä»£è¡¨?„ãª?åº—?‚çµ¶?ã®?«ãƒ«?°ã‚¯?¹ã¨è±šçš®??ƒ?¼ãƒ¢?‹ãƒ¼?? },
        query: { ko: "ë§ì›???œê°•ê»ë°ê¸?, en: "Hangang Kkeopdegi Mangwon", ja: "?›é æ´?æ¼¢æ±Ÿ?³ãƒ—?†ã‚®" },
        vipContent: {
            secretMenu: { ko: "VIP ?„ìš© ë¬µì?ì§€ ì¶”ê? ?œë¹„??, en: "VIP Special Aged Kimchi Refill", ja: "VIPå°‚ç”¨?Ÿæˆ??ƒ ?è¿½? ã‚µ?¼ãƒ“?? },
            ownerTip: { ko: "?‰ì¼ ?¤í”ˆ ì§í›„??ê°€ë©??¼ì?œë„ ?¬ìœ ë¡?²Œ ì¦ê¸¸ ???ˆìŠµ?ˆë‹¤.", en: "Go right at opening on weekdays for a relax solo meal.", ja: "å¹³æ—¥??–‹åº—ç›´å¾Œã«è¡Œã‘?°ã€ä?äººã§?‚ã‚†?£ã?Šæ??—ã‚?¾ã™?? }
        }
    },
    {
        id: "tea-tour-seoul-3",
        title: { ko: "?±ë¶??'?˜ì—°?°ë°©' - ?Œì„¤ê°€??ê³ íƒ", en: "Suyeon Sanbang - Novelist's Historic House", ja: "?åŒ—æ´ã€Œå?ç¡?±±?¿ã€?- å°èª¬å®¶ã®?¤å®…" },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
        rating: 4.9,
        transport: { ko: "4?¸ì„  ?œì„±?€?…êµ¬??ë²„ìŠ¤ ?´ìš© ???„ë³´", en: "Bus from Hansung Univ. Station then walk", ja: "4?·ç·š æ¼¢åŸå¤§å…¥?£é§…?‹ã‚‰?ã‚¹?©ç”¨å¾Œã€å¾’æ­? },
        description: { ko: "?Œì„¤ê°€ ?´íƒœì¤€??ê³ íƒ??ê°œì¡°??ì°»ì§‘. ?¨í˜¸ë°•ì£½ê³??€ì¶”ì°¨ê°€ ?¼í’ˆ?…ë‹ˆ??", en: "Tea house modified from novelist Lee Tae-jun's house. Sweet pumpkin porridge and jujube tea are top-tier.", ja: "å°èª¬å®¶ã‚¤?»ãƒ†?¸ãƒ¥?³ã®?¤å®…?’æ”¹è£…ã—?ŸèŒ¶å±‹ã€‚ã‹?¼ã¡?ƒç²¥?¨ãª?¤ã‚?¶ãŒçµ¶å“?§ã™?? },
        query: { ko: "?±ë¶???˜ì—°?°ë°©", en: "Suyeon Sanbang Seoul", ja: "?åŒ—æ´?å¯¿ç¡¯å±±æˆ¿" },
        vipContent: {
            secretMenu: { ko: "?„í†µ ?˜ì œ ?½ê³¼ ?¸íŠ¸ ? ë¬¼", en: "Traditional Handmade Yakgwa Set Gift", ja: "ä¼çµ±?‹ä½œ?Šè–¬???¤ãƒƒ??‚¡)?»ãƒƒ?ˆã®?—ãƒ¬?¼ãƒ³?? },
            ownerTip: { ko: "ê°€???¨í’ ?œì¦Œ??ë°©ë¬¸?˜ë©´ ê³ íƒ ?•ì›??ì§„ìˆ˜ë¥??ë‚„ ???ˆìŠµ?ˆë‹¤.", en: "Visit during autumn foliage to see the essence of the garden.", ja: "ç§‹ã®ç´…è‘‰?·ãƒ¼?ºãƒ³?«è¨ª?ã™?‹ã¨?å¤å®…ã®åº?œ’??œŸé«„ã‚’?Ÿã˜?‹ã“?¨ãŒ?§ã?¾ã™?? }
        }
    },
    {
        id: "solo-bbq-seoul-4",
        title: { ko: "? ë‹¹ 'ë°±ì†¡' - ì§ê°ˆë¹??„ë¬¸", en: "Baeksong - Rib Specialty in Sindang", ja: "?°å ‚?Œãƒš??‚½?³ã€?- ?›ã‚?°ã‚‰?‰å°‚?€" },
        category: "food",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        rating: 4.8,
        transport: { ko: "? ë‹¹??6ë²?ì¶œêµ¬ ?„ë³´ 3ë¶?, en: "3 min walk from Sindang Station Exit 6", ja: "?°å ‚é§?6ë²ˆå‡º??å¾’æ?3ë¶? },
        description: { ko: "?ˆíŠ¸ë¡?ê°ì„± ê°€?í•œ ë¶„ìœ„ê¸°ì—??ì¦ê¸°??ê³ í€„ë¦¬???Œê³ ê¸? ?¤ì°Œ?ì´ ?ˆì–´ ?¼ë°¥?˜ê¸° ì¢‹ìŠµ?ˆë‹¤.", en: "High-quality beef in a retro atmosphere. Counter seats make it great for solo dining.", ja: "?¬ãƒˆ??ª?…ç·’?‚ãµ?Œã‚‹?°å›²æ°—ã§æ¥½ã—?€é«˜å“è³ªãª?›è‚‰?‚ã‚«?¦ãƒ³?¿ãƒ¼å¸?Œ?‚ã‚Šä¸€äººé£¯?«æ??©ã§?™ã€? },
        query: { ko: "? ë‹¹ ë°±ì†¡", en: "Baeksong Sindang", ja: "?°å ‚ ?šã‚¯?½ãƒ³" },
        vipContent: {
            secretMenu: { ko: "?¹ì¼ ?„ì¶• ?œì •???¡ì‚¬?œë? ???‘ì‹œ", en: "Same-day Slaughter Limited Beef Sashimi", ja: "å½“æ—¥å± æ??å®š?ˆã®?¦ã‚¯?µã‚·???›åˆº??ä¸€?? },
            ownerTip: { ko: "?œë?ê°ˆë¹„ê°€ ê°€??? ëª…?˜ë‹ˆ ì²?ì£¼ë¬¸?¼ë¡œ ì¶”ì²œ?©ë‹ˆ??", en: "Seodae-galbi is the most famous, recommend for first order.", ja: "?½ãƒ‡?«ãƒ«?“ãŒä¸€?ªæœ‰?ãª??§?æ??ã®æ³¨æ–‡?«ãŠ?™ã™?ã§?™ã€? }
        }
    },
    {
        id: "tea-tour-seoul-4",
        title: { ko: "ê°€ë¡œìˆ˜ê¸?'??ì½œë ‰?°ë¸Œ' - ?¤ê?????, en: "Tea Collective Garosu-gil", ja: "è¡—è·¯æ¨¹é€šã‚Š?Œãƒ†?£ãƒ¼?³ãƒ¬??ƒ†?£ãƒ–?? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1576091160550-2173bdd99611?w=800&q=80",
        rating: 4.7,
        transport: { ko: "?•êµ¬?•ì—­ 4ë²?ì¶œêµ¬ ?„ë³´ 10ë¶?, en: "10 min walk from Apgujeong Station Exit 4", ja: "?é´äº?§… 4ë²ˆå‡º??å¾’æ?10ë¶? },
        description: { ko: "?„ì‹¬ ???ì¥ ì»¨ì…‰??? ê¸°??ë¡œì»¬ ???„ë¬¸?? ?¸ë ¨??ë¶„ìœ„ê¸°ì—??ì¦ê¸°???°ë¦¬ ì°?", en: "Organic local tea specialty shop with an urban farm concept. Our tea in a sophisticated vibe.", ja: "?½å¿ƒ??ƒ•?¡ãƒ¼? ã‚³?³ã‚»?—ãƒˆ??‚ª?¼ã‚¬?‹ãƒƒ??ƒ­?¼ã‚«?«ãƒ†?£ãƒ¼å°‚é?åº—ã€‚æ´—ç·´ã•?ŒãŸ?°å›²æ°—ã§æ¥½ã—?€?“å›½?¶ã€? },
        query: { ko: "ê°•ë‚¨ ?°ì½œ?‰í‹°ë¸?, en: "Tea Collective Seoul", ja: "æ±Ÿå— ?†ã‚£?¼ã‚³?¬ã‚¯?†ã‚£?? },
        vipContent: {
            secretMenu: { ko: "VIP ë©¤ë²„???„ìš© ?„ë¼?´ë¹— ??ë¸”ë Œ??, en: "VIP Membership Private Tea Blending", ja: "VIP?¡ãƒ³?ãƒ¼?·ãƒƒ?—å°‚?¨ãƒ—?©ã‚¤?™ãƒ¼?ˆãƒ†?£ãƒ¼?–ãƒ¬?³ãƒ‡?£ãƒ³?? },
            ownerTip: { ko: "?µìœ ë¦?ì°½ì„ ?µí•´ ?¤ì–´?¤ëŠ” ?¤í›„???‡ì‚´??ê°€???„ë¦„?¤ìš´ ê³³ì…?ˆë‹¤.", en: "Afternoon sunlight through the floor-to-ceiling windows is beautiful.", ja: "?¨é¢?¬ãƒ©?¹çª“?‹ã‚‰å·?—è¾¼ã??ˆå¾Œ??—¥å·?—?Œæ??‚ç¾?—ã„?´æ??§ã™?? }
        }
    },
    {
        id: "solo-bbq-seoul-5",
        title: { ko: "?„ì?ë¡?'?„ë??? - ?™ì„± ?ê³ ê¸?, en: "Domino Euljiro - Aged Fresh Meat", ja: "ä¹™æ”¯è·?€Œãƒˆ?Ÿãƒ³?›ã€?- ?Ÿæˆ?Ÿè‚‰" },
        category: "food",
        image: "https://images.unsplash.com/photo-1544621235-9856f70ca1bc?w=800&q=80",
        rating: 4.6,
        transport: { ko: "?„ì?ë¡?ê°€??11ë²?ì¶œêµ¬ ?„ë³´ 2ë¶?, en: "2 min walk from Euljiro 3-ga Exit 11", ja: "ä¹™æ”¯è·?è¡—é§… 11ë²ˆå‡º??å¾’æ?2ë¶? },
        description: { ko: "?™ì?ë¡?ê°ì„±?¼ë¡œ ì¦ê¸°???™ì„± ?¼ì?ê³ ê¸°. ë°??•íƒœ??ì¢Œì„???ˆì–´ ?¼ì?œë„ êµ½ê¸° ì¢‹ìŠµ?ˆë‹¤.", en: "Aged pork with Hipjiro vibes. Bar-style seats perfect for solo grilling.", ja: "?’ãƒƒ?—ãªä¹™æ”¯è·??’ãƒƒ?—ã‚¸????„Ÿ?§ã§æ¥½ã—?€?Ÿæˆè±šè‚‰?‚ã‚«?¦ãƒ³?¿ãƒ¼å¸?Œ?‚ã‚Šä¸€äººã§?¼ã??«?‚æ??©ã§?™ã€? },
        query: { ko: "?„ì?ë¡??„ë???, en: "Domino Euljiro", ja: "ä¹™æ”¯è·??ˆãƒŸ?³ãƒ›" },
        vipContent: {
            secretMenu: { ko: "ë©”ë‰´?ì— ?†ëŠ” ?ˆë“  ?œê·¸?ˆì²˜ ì°Œê°œ", en: "Off-menu Hidden Signature Stew", ja: "?¡ãƒ‹?¥ãƒ¼?«ãª?„è£?·ã‚°?ãƒ?£ãƒ¼?ã‚²" },
            ownerTip: { ko: "ê³ ê¸° ì£¼ë¬¸ ???¨ê»˜ ?˜ì˜¤???€??ê¹€ì¹˜ë? êµ¬ì›Œ ë¨¹ìœ¼ë©?ë³„ë??…ë‹ˆ??", en: "Grilled green onion kimchi served with meat is a specialty.", ja: "?‰ã®æ³¨æ–‡?‚ã«ä¸€ç·’ã«?ºã•?Œã‚‹?·ãƒ??‚­? ãƒ?’ç„¼?„ã¦é£Ÿã¹?‹ã¨çµ¶å“?§ã™?? }
        }
    },
    {
        id: "tea-tour-seoul-5",
        title: { ko: "?œêµ??'?´ë? ì»¤í”¼' - ì°¨ì? ì»¤í”¼", en: "Imi Coffee Seogyo - Tea & Coffee", ja: "è¥¿æ©‹æ´ã€Œì´ë¯?ì»¤í”¼??- ?ŠèŒ¶?¨ã‚³?¼ãƒ’?? },
        category: "dessert",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        rating: 4.8,
        transport: { ko: "?ë??…êµ¬??1ë²?ì¶œêµ¬ ?„ë³´ 7ë¶?, en: "7 min walk from Hongik Univ. Station Exit 1", ja: "å¼˜å¤§?¥å£é§?1ë²ˆå‡º??å¾’æ?7ë¶? },
        description: { ko: "?”ì??¸ì? ê°€?????´ìš¸ë¦¬ëŠ” ì°¨ì? ì»¤í”¼ë¥??ë ˆ?´íŒ…?´ì£¼??ê³?", en: "Curates the best tea and coffee to pair with desserts.", ja: "?‡ã‚¶?¼ãƒˆ?«æ??‚åˆ?†ãŠ?¶ã¨?³ãƒ¼?’ãƒ¼?’ã‚­?¥ãƒ¬?¼ã‚·?§ãƒ³?—ã¦?ã‚Œ?‹å ´?€?? },
        query: { ko: "?ë? ?´ë?ì»¤í”¼", en: "Imi Coffee Hongdae", ja: "å¼˜å¤§ ?´ë? ì»¤í”¼" },
        vipContent: {
            secretMenu: { ko: "VIP ?„ìš© ?œì •??ê³„ì ˆ ?”ì???ë³´ë“œ", en: "VIP-only Limited Seasonal Dessert Board", ja: "VIPå°‚ç”¨?å®š?ˆå?ç¯€??ƒ‡?¶ãƒ¼?ˆãƒœ?¼ãƒ‰" },
            ownerTip: { ko: "ë°©ë¬¸ ?¹ì¼ ?ë ˆ?´ì…˜??ì¡°í•©??ë¯¿ê³  ì£¼ë¬¸?´ë³´?¸ìš”. ?¤íŒ¨ ?†ìŠµ?ˆë‹¤.", en: "Trust the day's curated pairing. You won't regret it.", ja: "è¨ªå•å½“æ—¥?«ã‚­?¥ãƒ¬?¼ã‚·?§ãƒ³?•ã‚Œ?Ÿçµ„?¿åˆ?ã›?’ä¿¡?˜ã¦æ³¨æ–‡?—ã¦?¿ã¦?ã ?•ã„?‚å¤±?—ã‚?Šã¾?›ã‚“?? }
        }
    }
];
