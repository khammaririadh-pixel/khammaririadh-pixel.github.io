/* Wortweg vocabulary: themes of German words with English and Arabic.
   Each line: article|word|plural|English|Arabic|level   (article empty for non-nouns, plural "-" when there is none) */
const VOCAB=[
{id:"hallo",icon:"👋",de:"Begrüßung & Floskeln",en:"Greetings & phrases",fr:"Salutations et formules",ar:"التحية والعبارات",w:`
|Hallo!||hello!|مرحباً!|A1
|Guten Morgen!||good morning!|صباح الخير!|A1
|Guten Tag!||good day! / hello!|نهارك سعيد!|A1
|Guten Abend!||good evening!|مساء الخير!|A1
|Gute Nacht!||good night!|تصبح على خير!|A1
|Tschüss!||bye!|إلى اللقاء!|A1
|Auf Wiedersehen!||goodbye!|مع السلامة!|A1
|Bis später!||see you later!|أراك لاحقاً!|A1
|bitte||please / you're welcome|من فضلك / عفواً|A1
|danke||thank you|شكراً|A1
|Vielen Dank!||thank you very much!|شكراً جزيلاً!|A1
|Entschuldigung!||excuse me! / sorry!|عذراً! / آسف!|A1
|Es tut mir leid.||I'm sorry.|أنا آسف.|A1
|ja||yes|نعم|A1
|nein||no|لا|A1
|Wie geht's?||how are you?|كيف حالك؟|A1
|Mir geht's gut.||I'm fine.|أنا بخير.|A1
|Freut mich!||nice to meet you!|تشرفت!|A1
|Wie heißt du?||what's your name?|ما اسمك؟|A1
|Ich heiße …||my name is …|اسمي …|A1
|Woher kommst du?||where are you from?|من أين أنت؟|A1
|Ich verstehe nicht.||I don't understand.|لا أفهم.|A1
|Können Sie das wiederholen?||can you repeat that?|هل يمكنك أن تكرر ذلك؟|A1
|Sprechen Sie langsam, bitte.||please speak slowly.|تكلم ببطء من فضلك.|A1
|Wie bitte?||pardon?|عفواً؟ ماذا قلت؟|A1
|Alles klar!||all right! / got it!|حسناً! / فهمت!|A2
|Viel Glück!||good luck!|حظاً سعيداً!|A2
|Herzlichen Glückwunsch!||congratulations!|مبروك!|A2
|Gute Besserung!||get well soon!|شفاك الله!|A2
|Kein Problem.||no problem.|لا مشكلة.|A2
|Das macht nichts.||that doesn't matter.|لا بأس.|A2
|Schönes Wochenende!||have a nice weekend!|عطلة سعيدة!|A2`},
{id:"familie",icon:"👪",de:"Familie & Menschen",en:"Family & people",fr:"Famille et personnes",ar:"العائلة والناس",w:`
die|Familie|Familien|family|العائلة|A1
die|Mutter|Mütter|mother|الأم|A1
der|Vater|Väter|father|الأب|A1
die|Eltern|-|parents|الوالدان|A1
das|Kind|Kinder|child|الطفل|A1
der|Sohn|Söhne|son|الابن|A1
die|Tochter|Töchter|daughter|البنت|A1
der|Bruder|Brüder|brother|الأخ|A1
die|Schwester|Schwestern|sister|الأخت|A1
die|Geschwister|-|siblings|الإخوة|A1
der|Großvater|Großväter|grandfather|الجد|A1
die|Großmutter|Großmütter|grandmother|الجدة|A1
die|Oma|Omas|grandma|الجدة (عامية)|A1
der|Opa|Opas|grandpa|الجد (عامية)|A1
der|Mann|Männer|man / husband|الرجل / الزوج|A1
die|Frau|Frauen|woman / wife|المرأة / الزوجة|A1
der|Junge|Jungen|boy|الولد|A1
das|Mädchen|Mädchen|girl|البنت|A1
das|Baby|Babys|baby|الرضيع|A1
der|Freund|Freunde|friend / boyfriend|الصديق|A1
die|Freundin|Freundinnen|friend / girlfriend|الصديقة|A1
der|Onkel|Onkel|uncle|العم / الخال|A2
die|Tante|Tanten|aunt|العمة / الخالة|A2
der|Cousin|Cousins|cousin (m)|ابن العم / ابن الخال|A2
die|Cousine|Cousinen|cousin (f)|بنت العم / بنت الخال|A2
der|Enkel|Enkel|grandson|الحفيد|A2
die|Enkelin|Enkelinnen|granddaughter|الحفيدة|A2
der|Nachbar|Nachbarn|neighbour|الجار|A2
die|Ehe|Ehen|marriage|الزواج|B1
verheiratet||-|married|متزوج|A1
ledig||-|single|أعزب|A2
geschieden||-|divorced|مطلق|B1
die|Hochzeit|Hochzeiten|wedding|حفل الزفاف|A2
der|Erwachsene|Erwachsenen|adult|البالغ|B1
die|Verwandten|-|relatives|الأقارب|B1`},
{id:"koerper",icon:"🩺",de:"Körper & Gesundheit",en:"Body & health",fr:"Corps et santé",ar:"الجسم والصحة",w:`
der|Körper|Körper|body|الجسم|A1
der|Kopf|Köpfe|head|الرأس|A1
das|Gesicht|Gesichter|face|الوجه|A1
das|Auge|Augen|eye|العين|A1
das|Ohr|Ohren|ear|الأذن|A1
die|Nase|Nasen|nose|الأنف|A1
der|Mund|Münder|mouth|الفم|A1
der|Zahn|Zähne|tooth|السن|A1
das|Haar|Haare|hair|الشعر|A1
der|Hals|Hälse|neck / throat|الرقبة / الحلق|A1
der|Arm|Arme|arm|الذراع|A1
die|Hand|Hände|hand|اليد|A1
der|Finger|Finger|finger|الإصبع|A1
das|Bein|Beine|leg|الساق|A1
der|Fuß|Füße|foot|القدم|A1
der|Bauch|Bäuche|belly, stomach|البطن|A1
der|Rücken|Rücken|back|الظهر|A1
das|Herz|Herzen|heart|القلب|A2
der|Arzt|Ärzte|doctor|الطبيب|A1
die|Ärztin|Ärztinnen|doctor (f)|الطبيبة|A1
das|Krankenhaus|Krankenhäuser|hospital|المستشفى|A1
die|Apotheke|Apotheken|pharmacy|الصيدلية|A1
die|Tablette|Tabletten|pill|الحبة / القرص|A2
das|Medikament|Medikamente|medicine|الدواء|A2
das|Fieber|-|fever|الحمى|A2
der|Husten|-|cough|السعال|A2
der|Schnupfen|-|cold (runny nose)|الزكام|A2
die|Erkältung|Erkältungen|cold|نزلة البرد|A2
die|Kopfschmerzen|-|headache|الصداع|A2
krank||-|ill, sick|مريض|A1
gesund||-|healthy|بصحة جيدة|A1
müde||-|tired|متعب|A1
der|Termin|Termine|appointment|الموعد|A2
die|Versicherung|Versicherungen|insurance|التأمين|B1
die|Verletzung|Verletzungen|injury|الإصابة|B1
die|Schmerzen|-|pain|الألم|A2
der|Notfall|Notfälle|emergency|حالة الطوارئ|B1`},
{id:"essen",icon:"🍞",de:"Essen",en:"Food",fr:"Nourriture",ar:"الطعام",w:`
das|Essen|-|food / meal|الطعام / الوجبة|A1
das|Brot|Brote|bread|الخبز|A1
das|Brötchen|Brötchen|bread roll|الخبز الصغير|A1
die|Butter|-|butter|الزبدة|A1
der|Käse|-|cheese|الجبن|A1
die|Wurst|Würste|sausage|النقانق|A1
das|Ei|Eier|egg|البيضة|A1
das|Fleisch|-|meat|اللحم|A1
das|Hähnchen|Hähnchen|chicken|الدجاج|A1
der|Fisch|Fische|fish|السمك|A1
der|Reis|-|rice|الأرز|A1
die|Nudeln|-|pasta, noodles|المعكرونة|A1
die|Kartoffel|Kartoffeln|potato|البطاطا|A1
das|Gemüse|-|vegetables|الخضار|A1
das|Obst|-|fruit|الفاكهة|A1
der|Apfel|Äpfel|apple|التفاحة|A1
die|Banane|Bananen|banana|الموزة|A1
die|Orange|Orangen|orange|البرتقالة|A1
die|Tomate|Tomaten|tomato|الطماطم|A1
die|Zwiebel|Zwiebeln|onion|البصل|A2
der|Salat|Salate|salad / lettuce|السلطة|A1
die|Suppe|Suppen|soup|الحساء|A1
der|Kuchen|Kuchen|cake|الكعكة|A1
die|Schokolade|Schokoladen|chocolate|الشوكولاتة|A1
der|Zucker|-|sugar|السكر|A1
das|Salz|-|salt|الملح|A1
der|Pfeffer|-|pepper|الفلفل|A2
das|Frühstück|Frühstücke|breakfast|الفطور|A1
das|Mittagessen|-|lunch|الغداء|A1
das|Abendessen|-|dinner|العشاء|A1
der|Hunger|-|hunger|الجوع|A1
lecker||-|tasty, delicious|لذيذ|A1
scharf||-|spicy|حار|A2
süß||-|sweet|حلو|A1
salzig||-|salty|مالح|A2
frisch||-|fresh|طازج|A2
das|Rezept|Rezepte|recipe|الوصفة|A2
die|Zutat|Zutaten|ingredient|المكوّن|B1`},
{id:"trinken",icon:"☕",de:"Trinken, Café & Restaurant",en:"Drinks, café & restaurant",fr:"Boissons, café et restaurant",ar:"المشروبات والمقهى والمطعم",w:`
das|Wasser|-|water|الماء|A1
der|Kaffee|Kaffees|coffee|القهوة|A1
der|Tee|Tees|tea|الشاي|A1
die|Milch|-|milk|الحليب|A1
der|Saft|Säfte|juice|العصير|A1
der|Apfelsaft|Apfelsäfte|apple juice|عصير التفاح|A1
die|Cola|Colas|cola|الكولا|A1
der|Durst|-|thirst|العطش|A1
die|Tasse|Tassen|cup|الفنجان|A1
das|Glas|Gläser|glass|الكأس|A1
die|Flasche|Flaschen|bottle|الزجاجة|A1
das|Café|Cafés|café|المقهى|A1
das|Restaurant|Restaurants|restaurant|المطعم|A1
die|Speisekarte|Speisekarten|menu|قائمة الطعام|A2
der|Kellner|Kellner|waiter|النادل|A2
die|Kellnerin|Kellnerinnen|waitress|النادلة|A2
die|Rechnung|Rechnungen|bill|الفاتورة|A2
das|Trinkgeld|Trinkgelder|tip|البقشيش|A2
der|Tisch|Tische|table|الطاولة|A1
der|Teller|Teller|plate|الصحن|A1
die|Gabel|Gabeln|fork|الشوكة|A1
das|Messer|Messer|knife|السكين|A1
der|Löffel|Löffel|spoon|الملعقة|A1
die|Vorspeise|Vorspeisen|starter|المقبلات|B1
das|Hauptgericht|Hauptgerichte|main course|الطبق الرئيسي|B1
die|Nachspeise|Nachspeisen|dessert|التحلية|B1
|Ich hätte gern …||I'd like …|أودّ …|A2
|Zahlen, bitte!||the bill, please!|الحساب من فضلك!|A2
|Guten Appetit!||enjoy your meal!|بالهناء والشفاء!|A1
|Prost!||cheers!|في صحتك!|A2`},
{id:"wohnen",icon:"🏠",de:"Wohnen",en:"Home & living",fr:"Logement",ar:"السكن والبيت",w:`
das|Haus|Häuser|house|البيت|A1
die|Wohnung|Wohnungen|flat, apartment|الشقة|A1
das|Zimmer|Zimmer|room|الغرفة|A1
die|Küche|Küchen|kitchen|المطبخ|A1
das|Bad|Bäder|bathroom|الحمام|A1
das|Schlafzimmer|Schlafzimmer|bedroom|غرفة النوم|A1
das|Wohnzimmer|Wohnzimmer|living room|غرفة الجلوس|A1
der|Balkon|Balkone|balcony|الشرفة|A1
der|Garten|Gärten|garden|الحديقة|A1
die|Tür|Türen|door|الباب|A1
das|Fenster|Fenster|window|النافذة|A1
die|Treppe|Treppen|stairs|الدرج|A2
der|Stock|Stockwerke|floor (storey)|الطابق|A2
der|Aufzug|Aufzüge|lift, elevator|المصعد|A2
das|Bett|Betten|bed|السرير|A1
der|Stuhl|Stühle|chair|الكرسي|A1
das|Sofa|Sofas|sofa|الأريكة|A1
der|Schrank|Schränke|cupboard, wardrobe|الخزانة|A1
die|Lampe|Lampen|lamp|المصباح|A1
der|Kühlschrank|Kühlschränke|fridge|الثلاجة|A1
der|Herd|Herde|stove|الموقد|A2
die|Waschmaschine|Waschmaschinen|washing machine|الغسالة|A2
die|Heizung|Heizungen|heating|التدفئة|A2
die|Miete|Mieten|rent|الإيجار|A2
der|Vermieter|Vermieter|landlord|المؤجّر|B1
der|Mieter|Mieter|tenant|المستأجر|B1
die|Nebenkosten|-|additional costs (utilities)|التكاليف الإضافية|B1
die|Kaution|Kautionen|deposit|مبلغ التأمين|B1
der|Schlüssel|Schlüssel|key|المفتاح|A1
umziehen||-|to move house|ينتقل إلى مسكن جديد|A2
gemütlich||-|cosy|مريح ودافئ|A2
hell||-|bright|مضيء|A2
dunkel||-|dark|مظلم|A2
ruhig||-|quiet|هادئ|A2
laut||-|loud, noisy|صاخب|A2`},
{id:"kleidung",icon:"👕",de:"Kleidung",en:"Clothes",fr:"Vêtements",ar:"الملابس",w:`
die|Kleidung|-|clothes|الملابس|A1
das|Hemd|Hemden|shirt|القميص|A1
das|T-Shirt|T-Shirts|T-shirt|القميص القصير|A1
die|Hose|Hosen|trousers|البنطال|A1
die|Jeans|Jeans|jeans|الجينز|A1
der|Rock|Röcke|skirt|التنورة|A1
das|Kleid|Kleider|dress|الفستان|A1
die|Jacke|Jacken|jacket|السترة|A1
der|Mantel|Mäntel|coat|المعطف|A1
der|Pullover|Pullover|jumper|الكنزة|A1
der|Schuh|Schuhe|shoe|الحذاء|A1
der|Stiefel|Stiefel|boot|الجزمة|A2
die|Socke|Socken|sock|الجورب|A1
die|Mütze|Mützen|cap, beanie|القبعة الصوفية|A1
der|Hut|Hüte|hat|القبعة|A1
der|Schal|Schals|scarf|الوشاح|A2
die|Brille|Brillen|glasses|النظارة|A1
die|Tasche|Taschen|bag / pocket|الحقيبة / الجيب|A1
der|Gürtel|Gürtel|belt|الحزام|A2
der|Anzug|Anzüge|suit|البدلة|A2
die|Größe|Größen|size|المقاس|A2
anziehen||-|to put on|يرتدي|A2
ausziehen||-|to take off|يخلع|A2
anprobieren||-|to try on|يجرّب (الملابس)|A2
passen||-|to fit|يناسب (المقاس)|A2
eng||-|tight|ضيق|A2
weit||-|wide, loose|واسع|A2
bequem||-|comfortable|مريح|A2`},
{id:"stadt",icon:"🏙️",de:"Stadt & Orte",en:"Town & places",fr:"Ville et lieux",ar:"المدينة والأماكن",w:`
die|Stadt|Städte|town, city|المدينة|A1
das|Dorf|Dörfer|village|القرية|A1
die|Straße|Straßen|street|الشارع|A1
der|Platz|Plätze|square / seat|الساحة / المقعد|A1
die|Kreuzung|Kreuzungen|crossroads|التقاطع|A2
die|Ampel|Ampeln|traffic light|إشارة المرور|A2
die|Brücke|Brücken|bridge|الجسر|A2
der|Park|Parks|park|الحديقة العامة|A1
der|Supermarkt|Supermärkte|supermarket|السوبرماركت|A1
der|Markt|Märkte|market|السوق|A1
die|Bäckerei|Bäckereien|bakery|المخبز|A1
die|Bank|Banken|bank|البنك|A1
die|Post|-|post office|مكتب البريد|A1
das|Kino|Kinos|cinema|السينما|A1
das|Museum|Museen|museum|المتحف|A1
die|Kirche|Kirchen|church|الكنيسة|A2
die|Moschee|Moscheen|mosque|المسجد|A2
die|Schule|Schulen|school|المدرسة|A1
die|Universität|Universitäten|university|الجامعة|A1
die|Bibliothek|Bibliotheken|library|المكتبة|A2
das|Rathaus|Rathäuser|town hall|البلدية|A2
die|Polizei|-|police|الشرطة|A1
das|Hotel|Hotels|hotel|الفندق|A1
der|Bahnhof|Bahnhöfe|train station|محطة القطار|A1
der|Flughafen|Flughäfen|airport|المطار|A1
die|Haltestelle|Haltestellen|stop (bus/tram)|المحطة|A1
das|Zentrum|Zentren|centre|المركز|A1
das|Geschäft|Geschäfte|shop / business|المحل / التجارة|A1
links||-|left|يساراً|A1
rechts||-|right|يميناً|A1
geradeaus||-|straight ahead|إلى الأمام مباشرة|A1
in der Nähe||-|nearby|بالقرب|A2
weit weg||-|far away|بعيد|A2`},
{id:"verkehr",icon:"🚆",de:"Verkehr & Reisen",en:"Transport & travel",fr:"Transports et voyages",ar:"المواصلات والسفر",w:`
das|Auto|Autos|car|السيارة|A1
der|Bus|Busse|bus|الحافلة|A1
der|Zug|Züge|train|القطار|A1
die|U-Bahn|U-Bahnen|underground, metro|المترو|A1
die|S-Bahn|S-Bahnen|suburban train|القطار الضاحوي|A1
die|Straßenbahn|Straßenbahnen|tram|الترام|A1
das|Fahrrad|Fahrräder|bicycle|الدراجة|A1
das|Flugzeug|Flugzeuge|plane|الطائرة|A1
das|Taxi|Taxis|taxi|سيارة الأجرة|A1
das|Schiff|Schiffe|ship|السفينة|A2
die|Fahrkarte|Fahrkarten|ticket|التذكرة|A1
das|Ticket|Tickets|ticket|التذكرة|A1
der|Fahrplan|Fahrpläne|timetable|جدول المواعيد|A2
das|Gleis|Gleise|platform (track)|الرصيف (السكة)|A2
die|Abfahrt|Abfahrten|departure|المغادرة|A2
die|Ankunft|Ankünfte|arrival|الوصول|A2
die|Verspätung|Verspätungen|delay|التأخير|A2
umsteigen||-|to change (trains)|يغيّر (القطار)|A2
der|Koffer|Koffer|suitcase|الحقيبة|A1
der|Pass|Pässe|passport|جواز السفر|A1
die|Reise|Reisen|journey, trip|الرحلة|A1
der|Urlaub|Urlaube|holiday, vacation|العطلة|A1
das|Gepäck|-|luggage|الأمتعة|A2
die|Grenze|Grenzen|border|الحدود|B1
der|Stau|Staus|traffic jam|الازدحام المروري|B1
der|Führerschein|Führerscheine|driving licence|رخصة القيادة|A2
die|Unterkunft|Unterkünfte|accommodation|السكن (أثناء السفر)|B1
buchen||-|to book|يحجز|A2
abfahren||-|to depart|يغادر|A2
ankommen||-|to arrive|يصل|A1
einsteigen||-|to get on|يركب|A2
aussteigen||-|to get off|ينزل|A2`},
{id:"arbeit",icon:"💼",de:"Arbeit & Beruf",en:"Work & jobs",fr:"Travail et métiers",ar:"العمل والمهن",w:`
die|Arbeit|Arbeiten|work|العمل|A1
der|Beruf|Berufe|profession|المهنة|A1
die|Firma|Firmen|company|الشركة|A1
das|Büro|Büros|office|المكتب|A1
der|Chef|Chefs|boss|المدير|A1
die|Chefin|Chefinnen|boss (f)|المديرة|A1
der|Kollege|Kollegen|colleague|الزميل|A2
die|Kollegin|Kolleginnen|colleague (f)|الزميلة|A2
der|Lehrer|Lehrer|teacher|المعلم|A1
die|Lehrerin|Lehrerinnen|teacher (f)|المعلمة|A1
der|Ingenieur|Ingenieure|engineer|المهندس|A2
der|Krankenpfleger|Krankenpfleger|nurse (m)|الممرض|A2
die|Krankenpflegerin|Krankenpflegerinnen|nurse (f)|الممرضة|A2
der|Verkäufer|Verkäufer|salesperson|البائع|A1
der|Koch|Köche|cook|الطباخ|A1
der|Fahrer|Fahrer|driver|السائق|A1
der|Mechaniker|Mechaniker|mechanic|الميكانيكي|A2
der|Anwalt|Anwälte|lawyer|المحامي|B1
der|Polizist|Polizisten|police officer|الشرطي|A2
der|Student|Studenten|student|الطالب الجامعي|A1
die|Studentin|Studentinnen|student (f)|الطالبة الجامعية|A1
das|Gehalt|Gehälter|salary|الراتب|B1
der|Lohn|Löhne|wage|الأجر|B1
die|Bewerbung|Bewerbungen|job application|طلب التوظيف|B1
das|Vorstellungsgespräch|Vorstellungsgespräche|job interview|مقابلة العمل|B1
der|Lebenslauf|Lebensläufe|CV|السيرة الذاتية|B1
die|Stelle|Stellen|position, job|الوظيفة|B1
die|Erfahrung|Erfahrungen|experience|الخبرة|B1
die|Ausbildung|Ausbildungen|vocational training|التكوين المهني|B1
das|Praktikum|Praktika|internship|التدريب|B1
der|Vertrag|Verträge|contract|العقد|B1
die|Besprechung|Besprechungen|meeting|الاجتماع|B1
die|Überstunden|-|overtime|الساعات الإضافية|B2
arbeitslos||-|unemployed|عاطل عن العمل|A2
selbstständig||-|self-employed|يعمل لحسابه الخاص|B2
kündigen||-|to quit, to give notice|يستقيل|B2`},
{id:"schule",icon:"📚",de:"Schule & Lernen",en:"School & learning",fr:"École et apprentissage",ar:"المدرسة والتعلم",w:`
der|Unterricht|-|lesson, class|الدرس|A1
der|Kurs|Kurse|course|الدورة|A1
die|Klasse|Klassen|class (group)|الصف|A1
die|Prüfung|Prüfungen|exam|الامتحان|A2
der|Test|Tests|test|الاختبار|A1
die|Note|Noten|mark, grade|العلامة|A2
die|Hausaufgabe|Hausaufgaben|homework|الواجب المنزلي|A1
das|Buch|Bücher|book|الكتاب|A1
das|Heft|Hefte|exercise book|الدفتر|A1
der|Stift|Stifte|pen|القلم|A1
der|Kuli|Kulis|ballpoint pen|قلم الحبر|A1
das|Papier|Papiere|paper|الورق|A1
das|Wörterbuch|Wörterbücher|dictionary|القاموس|A1
die|Sprache|Sprachen|language|اللغة|A1
das|Wort|Wörter|word|الكلمة|A1
der|Satz|Sätze|sentence|الجملة|A1
die|Frage|Fragen|question|السؤال|A1
die|Antwort|Antworten|answer|الجواب|A1
der|Fehler|Fehler|mistake|الخطأ|A1
die|Übung|Übungen|exercise|التمرين|A1
die|Bedeutung|Bedeutungen|meaning|المعنى|A2
die|Grammatik|-|grammar|القواعد|A1
die|Aussprache|-|pronunciation|النطق|A2
das|Zeugnis|Zeugnisse|school report, certificate|الشهادة|B1
das|Studium|Studien|university studies|الدراسة الجامعية|B1
das|Fach|Fächer|subject|المادة الدراسية|A2
lernen||-|to learn|يتعلم|A1
üben||-|to practise|يتمرن|A1
wiederholen||-|to repeat, to revise|يكرر / يراجع|A2
erklären||-|to explain|يشرح|A2
bestehen||-|to pass (an exam)|ينجح (في الامتحان)|B1`},
{id:"zeit",icon:"🗓️",de:"Zeit, Tage & Monate",en:"Time, days & months",fr:"Temps, jours et mois",ar:"الوقت والأيام والشهور",w:`
die|Zeit|Zeiten|time|الوقت|A1
die|Uhr|Uhren|clock / o'clock|الساعة|A1
die|Stunde|Stunden|hour|الساعة (مدة)|A1
die|Minute|Minuten|minute|الدقيقة|A1
der|Tag|Tage|day|اليوم|A1
die|Woche|Wochen|week|الأسبوع|A1
der|Monat|Monate|month|الشهر|A1
das|Jahr|Jahre|year|السنة|A1
der|Morgen|Morgen|morning|الصباح|A1
der|Mittag|Mittage|noon|الظهر|A1
der|Nachmittag|Nachmittage|afternoon|بعد الظهر|A1
der|Abend|Abende|evening|المساء|A1
die|Nacht|Nächte|night|الليل|A1
heute||-|today|اليوم|A1
morgen||-|tomorrow|غداً|A1
gestern||-|yesterday|أمس|A1
jetzt||-|now|الآن|A1
später||-|later|لاحقاً|A1
bald||-|soon|قريباً|A2
immer||-|always|دائماً|A1
oft||-|often|غالباً|A1
manchmal||-|sometimes|أحياناً|A1
nie||-|never|أبداً|A1
der|Montag|Montage|Monday|الإثنين|A1
der|Dienstag|Dienstage|Tuesday|الثلاثاء|A1
der|Mittwoch|Mittwoche|Wednesday|الأربعاء|A1
der|Donnerstag|Donnerstage|Thursday|الخميس|A1
der|Freitag|Freitage|Friday|الجمعة|A1
der|Samstag|Samstage|Saturday|السبت|A1
der|Sonntag|Sonntage|Sunday|الأحد|A1
das|Wochenende|Wochenenden|weekend|عطلة نهاية الأسبوع|A1
der|Januar|-|January|يناير / كانون الثاني|A1
der|Februar|-|February|فبراير / شباط|A1
der|März|-|March|مارس / آذار|A1
der|April|-|April|أبريل / نيسان|A1
der|Mai|-|May|مايو / أيار|A1
der|Juni|-|June|يونيو / حزيران|A1
der|Juli|-|July|يوليو / تموز|A1
der|August|-|August|أغسطس / آب|A1
der|September|-|September|سبتمبر / أيلول|A1
der|Oktober|-|October|أكتوبر / تشرين الأول|A1
der|November|-|November|نوفمبر / تشرين الثاني|A1
der|Dezember|-|December|ديسمبر / كانون الأول|A1
der|Frühling|-|spring|الربيع|A1
der|Sommer|-|summer|الصيف|A1
der|Herbst|-|autumn|الخريف|A1
der|Winter|-|winter|الشتاء|A1
der|Geburtstag|Geburtstage|birthday|عيد الميلاد|A1`},
{id:"zahlen",icon:"🔢",de:"Zahlen & Mengen",en:"Numbers & amounts",fr:"Nombres et quantités",ar:"الأعداد والكميات",w:`
|null||zero|صفر|A1
|eins||one|واحد|A1
|zwei||two|اثنان|A1
|drei||three|ثلاثة|A1
|vier||four|أربعة|A1
|fünf||five|خمسة|A1
|sechs||six|ستة|A1
|sieben||seven|سبعة|A1
|acht||eight|ثمانية|A1
|neun||nine|تسعة|A1
|zehn||ten|عشرة|A1
|elf||eleven|أحد عشر|A1
|zwölf||twelve|اثنا عشر|A1
|zwanzig||twenty|عشرون|A1
|dreißig||thirty|ثلاثون|A1
|hundert||hundred|مئة|A1
|tausend||thousand|ألف|A1
|die Million||million|مليون|A2
|erste||first|الأول|A1
|zweite||second|الثاني|A1
|dritte||third|الثالث|A1
|halb||half|نصف|A1
|das Viertel||quarter|ربع|A1
|viel||much, a lot|كثير|A1
|wenig||little, few|قليل|A1
|alle||all|الكل|A1
|ein bisschen||a bit|قليلاً|A1
|genug||enough|كافٍ|A2
|das Kilo||kilo|كيلو|A1
|der Liter||litre|لتر|A1
|das Stück||piece|قطعة|A1
|die Hälfte||half|النصف|A2
|das Prozent||percent|بالمئة|B1`},
{id:"farben",icon:"🎨",de:"Farben & Formen",en:"Colours & shapes",fr:"Couleurs et formes",ar:"الألوان والأشكال",w:`
die|Farbe|Farben|colour|اللون|A1
rot||-|red|أحمر|A1
blau||-|blue|أزرق|A1
grün||-|green|أخضر|A1
gelb||-|yellow|أصفر|A1
schwarz||-|black|أسود|A1
weiß||-|white|أبيض|A1
grau||-|grey|رمادي|A1
braun||-|brown|بني|A1
orange||-|orange|برتقالي|A1
rosa||-|pink|وردي|A1
lila||-|purple|بنفسجي|A1
hell||-|light|فاتح|A2
dunkel||-|dark|غامق|A2
bunt||-|colourful|ملوّن|A2
der|Kreis|Kreise|circle|الدائرة|A2
das|Quadrat|Quadrate|square|المربع|A2
das|Dreieck|Dreiecke|triangle|المثلث|A2
rund||-|round|دائري|A2
groß||-|big, tall|كبير / طويل|A1
klein||-|small|صغير|A1
lang||-|long|طويل|A1
kurz||-|short|قصير|A1
breit||-|wide|عريض|A2
schmal||-|narrow|ضيّق|B1`},
{id:"wetter",icon:"⛅",de:"Wetter & Natur",en:"Weather & nature",fr:"Météo et nature",ar:"الطقس والطبيعة",w:`
das|Wetter|-|weather|الطقس|A1
die|Sonne|Sonnen|sun|الشمس|A1
der|Regen|-|rain|المطر|A1
der|Schnee|-|snow|الثلج|A1
der|Wind|Winde|wind|الريح|A1
die|Wolke|Wolken|cloud|السحابة|A1
das|Gewitter|Gewitter|thunderstorm|العاصفة الرعدية|A2
der|Nebel|-|fog|الضباب|A2
die|Temperatur|Temperaturen|temperature|درجة الحرارة|A2
der|Grad|Grade|degree|الدرجة|A2
sonnig||-|sunny|مشمس|A1
bewölkt||-|cloudy|غائم|A2
warm||-|warm|دافئ|A1
heiß||-|hot|حار جداً|A1
kalt||-|cold|بارد|A1
nass||-|wet|مبلل|A2
trocken||-|dry|جاف|A2
regnen||-|to rain|تمطر|A1
schneien||-|to snow|تثلج|A1
die|Natur|-|nature|الطبيعة|A2
der|Baum|Bäume|tree|الشجرة|A1
die|Blume|Blumen|flower|الزهرة|A1
der|Wald|Wälder|forest|الغابة|A1
der|Berg|Berge|mountain|الجبل|A1
der|See|Seen|lake|البحيرة|A1
das|Meer|Meere|sea|البحر|A1
der|Fluss|Flüsse|river|النهر|A1
der|Strand|Strände|beach|الشاطئ|A1
die|Insel|Inseln|island|الجزيرة|A2
die|Umwelt|-|environment|البيئة|B1
der|Klimawandel|-|climate change|تغير المناخ|B2
die|Energie|Energien|energy|الطاقة|B1
der|Müll|-|rubbish, waste|النفايات|A2
recyceln||-|to recycle|يعيد التدوير|B1`},
{id:"tiere",icon:"🐾",de:"Tiere",en:"Animals",fr:"Animaux",ar:"الحيوانات",w:`
das|Tier|Tiere|animal|الحيوان|A1
der|Hund|Hunde|dog|الكلب|A1
die|Katze|Katzen|cat|القطة|A1
das|Pferd|Pferde|horse|الحصان|A1
die|Kuh|Kühe|cow|البقرة|A1
das|Schwein|Schweine|pig|الخنزير|A2
das|Schaf|Schafe|sheep|الخروف|A2
die|Ziege|Ziegen|goat|الماعز|A2
das|Huhn|Hühner|hen, chicken|الدجاجة|A2
der|Vogel|Vögel|bird|الطائر|A1
der|Fisch|Fische|fish|السمكة|A1
die|Maus|Mäuse|mouse|الفأر|A1
der|Hase|Hasen|hare, rabbit|الأرنب البري|A2
das|Kaninchen|Kaninchen|rabbit|الأرنب|A2
der|Löwe|Löwen|lion|الأسد|A2
der|Elefant|Elefanten|elephant|الفيل|A2
der|Affe|Affen|monkey|القرد|A2
der|Bär|Bären|bear|الدب|A2
die|Schlange|Schlangen|snake|الثعبان|A2
das|Kamel|Kamele|camel|الجمل|A2
die|Biene|Bienen|bee|النحلة|A2
der|Schmetterling|Schmetterlinge|butterfly|الفراشة|B1`},
{id:"freizeit",icon:"⚽",de:"Freizeit & Hobbys",en:"Free time & hobbies",fr:"Loisirs",ar:"وقت الفراغ والهوايات",w:`
die|Freizeit|-|free time|وقت الفراغ|A1
das|Hobby|Hobbys|hobby|الهواية|A1
der|Sport|-|sport|الرياضة|A1
der|Fußball|Fußbälle|football|كرة القدم|A1
das|Spiel|Spiele|game, match|اللعبة / المباراة|A1
die|Musik|-|music|الموسيقى|A1
das|Lied|Lieder|song|الأغنية|A1
der|Film|Filme|film|الفيلم|A1
das|Konzert|Konzerte|concert|الحفلة الموسيقية|A2
das|Theater|Theater|theatre|المسرح|A2
die|Party|Partys|party|الحفلة|A1
der|Ausflug|Ausflüge|trip, outing|النزهة|A2
das|Schwimmbad|Schwimmbäder|swimming pool|المسبح|A1
das|Fitnessstudio|Fitnessstudios|gym|النادي الرياضي|A2
das|Foto|Fotos|photo|الصورة|A1
der|Verein|Vereine|club|النادي / الجمعية|B1
schwimmen||-|to swim|يسبح|A1
tanzen||-|to dance|يرقص|A1
singen||-|to sing|يغني|A1
spielen||-|to play|يلعب|A1
lesen||-|to read|يقرأ|A1
kochen||-|to cook|يطبخ|A1
wandern||-|to hike|يتنزه سيراً|A2
reisen||-|to travel|يسافر|A1
malen||-|to paint|يرسم|A2
fotografieren||-|to take photos|يصوّر|A2
spazieren gehen||-|to go for a walk|يتمشى|A2`},
{id:"einkaufen",icon:"🛒",de:"Einkaufen & Geld",en:"Shopping & money",fr:"Achats et argent",ar:"التسوق والمال",w:`
das|Geld|-|money|المال|A1
der|Euro|Euros|euro|اليورو|A1
der|Cent|Cents|cent|السنت|A1
der|Preis|Preise|price|السعر|A1
die|Kasse|Kassen|checkout, till|الصندوق|A1
die|Karte|Karten|card / map / ticket|البطاقة / الخريطة|A1
das|Bargeld|-|cash|النقود|A2
der|Kassenzettel|Kassenzettel|receipt|الإيصال|A2
das|Angebot|Angebote|offer|العرض|A2
der|Rabatt|Rabatte|discount|التخفيض|B1
die|Tüte|Tüten|bag (plastic/paper)|الكيس|A2
der|Einkaufswagen|Einkaufswagen|shopping trolley|عربة التسوق|A2
das|Konto|Konten|bank account|الحساب البنكي|A2
die|Kreditkarte|Kreditkarten|credit card|بطاقة الائتمان|A2
teuer||-|expensive|غالٍ|A1
billig||-|cheap|رخيص|A1
günstig||-|good value|بسعر مناسب|A2
kaufen||-|to buy|يشتري|A1
verkaufen||-|to sell|يبيع|A1
bezahlen||-|to pay|يدفع|A1
kosten||-|to cost|يكلّف|A1
umtauschen||-|to exchange (goods)|يستبدل|B1
sparen||-|to save (money)|يدّخر|A2
|Was kostet das?||how much is that?|كم ثمن هذا؟|A1
|Kann ich mit Karte zahlen?||can I pay by card?|هل يمكنني الدفع بالبطاقة؟|A2`},
{id:"medien",icon:"📱",de:"Technik & Medien",en:"Technology & media",fr:"Technologie et médias",ar:"التقنية والإعلام",w:`
das|Handy|Handys|mobile phone|الهاتف المحمول|A1
der|Computer|Computer|computer|الحاسوب|A1
der|Laptop|Laptops|laptop|الحاسوب المحمول|A1
das|Internet|-|internet|الإنترنت|A1
die|E-Mail|E-Mails|email|البريد الإلكتروني|A1
die|Nachricht|Nachrichten|message / news|الرسالة / الخبر|A1
das|Passwort|Passwörter|password|كلمة السر|A2
die|App|Apps|app|التطبيق|A1
der|Bildschirm|Bildschirme|screen|الشاشة|A2
die|Taste|Tasten|key (keyboard)|الزر|A2
das|Programm|Programme|programme / software|البرنامج|A2
die|Zeitung|Zeitungen|newspaper|الجريدة|A1
das|Fernsehen|-|television (medium)|التلفزيون|A1
der|Fernseher|Fernseher|TV set|جهاز التلفاز|A1
das|Radio|Radios|radio|الراديو|A1
die|Werbung|-|advertising|الإعلان|B1
die|Daten|-|data|البيانات|B1
herunterladen||-|to download|يحمّل (من الإنترنت)|B1
anrufen||-|to call (phone)|يتصل|A1
schicken||-|to send|يرسل|A1
speichern||-|to save (a file)|يحفظ|B1
löschen||-|to delete|يحذف|B1`},
{id:"gefuehle",icon:"🙂",de:"Gefühle & Charakter",en:"Feelings & character",fr:"Sentiments et caractère",ar:"المشاعر والشخصية",w:`
das|Gefühl|Gefühle|feeling|الشعور|A2
die|Liebe|-|love|الحب|A2
die|Angst|Ängste|fear|الخوف|A2
die|Freude|Freuden|joy|الفرح|A2
der|Ärger|-|anger, trouble|الغضب / المتاعب|B1
glücklich||-|happy|سعيد|A1
traurig||-|sad|حزين|A1
froh||-|glad|مسرور|A2
wütend||-|angry|غاضب|A2
nervös||-|nervous|متوتر|A2
ruhig||-|calm|هادئ|A2
zufrieden||-|satisfied|راضٍ|B1
enttäuscht||-|disappointed|خائب الأمل|B1
überrascht||-|surprised|متفاجئ|B1
stolz||-|proud|فخور|B1
nett||-|nice|لطيف|A1
freundlich||-|friendly|ودود|A1
lustig||-|funny|مضحك|A1
ernst||-|serious|جاد|B1
fleißig||-|hard-working|مجتهد|A2
faul||-|lazy|كسول|A2
ehrlich||-|honest|صادق|B1
höflich||-|polite|مهذب|B1
geduldig||-|patient|صبور|B1
neugierig||-|curious|فضولي|B1
schüchtern||-|shy|خجول|B1
selbstbewusst||-|self-confident|واثق من نفسه|B2
zuverlässig||-|reliable|موثوق به|B2`},
{id:"adjektive",icon:"⚖️",de:"Gegensätze (Adjektive)",en:"Opposites (adjectives)",fr:"Contraires (adjectifs)",ar:"الأضداد (الصفات)",w:`
gut||-|good|جيد|A1
schlecht||-|bad|سيئ|A1
neu||-|new|جديد|A1
alt||-|old|قديم / كبير في السن|A1
jung||-|young|شاب|A1
schnell||-|fast|سريع|A1
langsam||-|slow|بطيء|A1
leicht||-|easy / light|سهل / خفيف|A1
schwer||-|difficult / heavy|صعب / ثقيل|A1
richtig||-|right, correct|صحيح|A1
falsch||-|wrong|خطأ|A1
schön||-|beautiful|جميل|A1
hässlich||-|ugly|قبيح|A2
voll||-|full|ممتلئ|A1
leer||-|empty|فارغ|A1
offen||-|open|مفتوح|A1
geschlossen||-|closed|مغلق|A1
sauber||-|clean|نظيف|A1
schmutzig||-|dirty|متسخ|A2
reich||-|rich|غني|A2
arm||-|poor|فقير|A2
stark||-|strong|قوي|A2
schwach||-|weak|ضعيف|A2
früh||-|early|مبكراً|A1
spät||-|late|متأخر|A1
wichtig||-|important|مهم|A1
möglich||-|possible|ممكن|A2
unmöglich||-|impossible|مستحيل|B1
einfach||-|simple|بسيط|A1
kompliziert||-|complicated|معقد|B1
sicher||-|safe / sure|آمن / متأكد|A2
gefährlich||-|dangerous|خطير|A2
bekannt||-|well-known|معروف|B1
fremd||-|foreign, strange|غريب|B1`},
{id:"kleinwoerter",icon:"🧩",de:"Kleine Wörter: Fragen & Verbindungen",en:"Little words: questions & connectors",fr:"Petits mots : questions et liaisons",ar:"كلمات صغيرة: أسئلة وروابط",w:`
|wer?||who?|من؟|A1
|was?||what?|ماذا؟|A1
|wo?||where?|أين؟|A1
|wohin?||where to?|إلى أين؟|A1
|woher?||where from?|من أين؟|A1
|wann?||when?|متى؟|A1
|wie?||how?|كيف؟|A1
|warum?||why?|لماذا؟|A1
|wie viel?||how much?|كم؟|A1
|welcher?||which?|أيّ؟|A2
|und||and|و|A1
|oder||or|أو|A1
|aber||but|لكن|A1
|denn||because (main clause)|لأن (جملة رئيسية)|A2
|weil||because|لأن|A2
|dass||that|أنّ|A2
|wenn||if / when(ever)|إذا / عندما|A2
|als||when (past) / than|عندما (ماضٍ) / من|B1
|ob||whether|ما إذا|B1
|obwohl||although|على الرغم من أن|B1
|trotzdem||nevertheless|ومع ذلك|B1
|deshalb||therefore|لذلك|B1
|damit||so that|لكي|B1
|während||while / during|بينما / خلال|B1
|bevor||before|قبل أن|B1
|nachdem||after|بعد أن|B1
|sondern||but rather|بل|B1
|sowohl … als auch||both … and|كلٌّ من … و|B2
|weder … noch||neither … nor|لا … ولا|B2
|je … desto||the … the|كلما … كلما|B2
|außerdem||besides|بالإضافة إلى ذلك|B1
|zum Beispiel||for example|مثلاً|A2
|vielleicht||maybe|ربما|A1
|natürlich||of course|طبعاً|A1
|leider||unfortunately|للأسف|A1
|sehr||very|جداً|A1
|auch||also|أيضاً|A1
|noch||still / yet|ما زال / بعد|A1
|schon||already|بالفعل|A1
|nur||only|فقط|A1`},
{id:"gesellschaft",icon:"🏛️",de:"Gesellschaft & Meinung",en:"Society & opinions",fr:"Société et opinions",ar:"المجتمع والرأي",w:`
die|Gesellschaft|Gesellschaften|society|المجتمع|B1
die|Meinung|Meinungen|opinion|الرأي|B1
die|Politik|-|politics|السياسة|B1
die|Regierung|Regierungen|government|الحكومة|B1
die|Wahl|Wahlen|election / choice|الانتخاب / الاختيار|B1
das|Gesetz|Gesetze|law|القانون|B1
das|Recht|Rechte|right / law|الحق / القانون|B1
die|Pflicht|Pflichten|duty|الواجب|B1
die|Freiheit|Freiheiten|freedom|الحرية|B1
die|Gleichberechtigung|-|equal rights|المساواة في الحقوق|B2
die|Integration|-|integration|الاندماج|B2
die|Kultur|Kulturen|culture|الثقافة|A2
die|Religion|Religionen|religion|الدين|B1
die|Wirtschaft|-|economy|الاقتصاد|B1
die|Gesundheit|-|health|الصحة|A2
die|Bildung|-|education|التعليم|B1
die|Zukunft|-|future|المستقبل|A2
die|Vergangenheit|-|past|الماضي|B1
die|Entwicklung|Entwicklungen|development|التطور|B2
der|Vorteil|Vorteile|advantage|الميزة|B1
der|Nachteil|Nachteile|disadvantage|العيب|B1
die|Lösung|Lösungen|solution|الحل|B1
das|Problem|Probleme|problem|المشكلة|A2
die|Herausforderung|Herausforderungen|challenge|التحدي|B2
die|Verantwortung|-|responsibility|المسؤولية|B2
die|Auswirkung|Auswirkungen|effect, impact|التأثير|B2
die|Voraussetzung|Voraussetzungen|prerequisite|الشرط المسبق|B2
|meiner Meinung nach||in my opinion|في رأيي|B1
|ich bin der Meinung, dass …||I'm of the opinion that …|أرى أنّ …|B1
|einerseits … andererseits||on the one hand … on the other|من جهة … ومن جهة أخرى|B2
|im Gegensatz zu||in contrast to|على عكس|B2
|es kommt darauf an||it depends|هذا يعتمد|B2
|zustimmen||to agree|يوافق|B1
|widersprechen||to contradict|يعارض|B2
|überzeugen||to convince|يقنع|B2
|diskutieren||to discuss|يناقش|B1`}
];
/* parse the compact lines into word objects */
VOCAB.forEach(th=>{th.items=th.w.trim().split("\n").map(l=>{let [a,w,pl,en,ar,lv]=l.split("|");
  if(a&&!w&&!/^(der|die|das)$/.test(a)){w=a;a=""}   /* "word||-|…" lines: non-nouns */
  return {art:a,de:w,pl:pl&&pl!=="-"?pl:"",en,ar,lv:lv||"A1",th:th.id}});delete th.w});
const ALLWORDS=VOCAB.flatMap(th=>th.items);
