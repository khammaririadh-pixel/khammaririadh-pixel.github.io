/* Wortweg grammar reference + verb tables.
   Verb line: infinitive|English|Arabic|aux|Partizip II|Präteritum|du,er (present)|level
   "-" = build it by rule.  "an~rufen" = separable prefix.  "sich …" = reflexive. */
const VERB_LINES=`
sein|to be|يكون|sein|gewesen|war|-|A1
haben|to have|يملك|haben|gehabt|hatte|-|A1
werden|to become|يصبح|sein|geworden|wurde|-|A1
können|can, to be able to|يستطيع|haben|gekonnt|konnte|-|A1
müssen|must, to have to|يجب عليه|haben|gemusst|musste|-|A1
dürfen|may, to be allowed to|يُسمح له|haben|gedurft|durfte|-|A1
sollen|should, to be supposed to|ينبغي عليه|haben|gesollt|sollte|-|A1
wollen|to want|يريد|haben|gewollt|wollte|-|A1
mögen|to like|يحب|haben|gemocht|mochte|-|A1
wissen|to know (a fact)|يعرف (معلومة)|haben|gewusst|wusste|-|A1
machen|to do, to make|يعمل / يصنع|haben|-|-|-|A1
lernen|to learn|يتعلم|haben|-|-|-|A1
wohnen|to live (reside)|يسكن|haben|-|-|-|A1
arbeiten|to work|يعمل|haben|-|-|-|A1
spielen|to play|يلعب|haben|-|-|-|A1
kaufen|to buy|يشتري|haben|-|-|-|A1
kochen|to cook|يطبخ|haben|-|-|-|A1
hören|to hear, to listen|يسمع|haben|-|-|-|A1
sagen|to say|يقول|haben|-|-|-|A1
fragen|to ask|يسأل|haben|-|-|-|A1
antworten|to answer|يجيب|haben|-|-|-|A1
brauchen|to need|يحتاج|haben|-|-|-|A1
suchen|to look for|يبحث عن|haben|-|-|-|A1
zeigen|to show|يُري|haben|-|-|-|A1
leben|to live|يعيش|haben|-|-|-|A1
lieben|to love|يحب|haben|-|-|-|A1
warten|to wait|ينتظر|haben|-|-|-|A1
kosten|to cost|يكلّف|haben|-|-|-|A1
öffnen|to open|يفتح|haben|-|-|-|A2
reisen|to travel|يسافر|sein|-|-|-|A1
tanzen|to dance|يرقص|haben|-|-|-|A1
lachen|to laugh|يضحك|haben|-|-|-|A1
weinen|to cry|يبكي|haben|-|-|-|A2
glauben|to believe|يعتقد|haben|-|-|-|A2
zahlen|to pay|يدفع|haben|-|-|-|A1
bezahlen|to pay (for)|يدفع ثمن|haben|-|-|-|A1
besuchen|to visit|يزور|haben|-|-|-|A1
erklären|to explain|يشرح|haben|-|-|-|A2
erzählen|to tell|يحكي|haben|-|-|-|A2
verkaufen|to sell|يبيع|haben|-|-|-|A1
versuchen|to try|يحاول|haben|-|-|-|A2
bestellen|to order|يطلب|haben|-|-|-|A1
benutzen|to use|يستخدم|haben|-|-|-|A2
gehören|to belong to|يخصّ|haben|-|-|-|A2
studieren|to study (at university)|يدرس|haben|-|-|-|A1
telefonieren|to phone|يتصل هاتفياً|haben|-|-|-|A1
reparieren|to repair|يصلّح|haben|-|-|-|A2
diskutieren|to discuss|يناقش|haben|-|-|-|B1
putzen|to clean|ينظّف|haben|-|-|-|A2
schicken|to send|يرسل|haben|-|-|-|A1
holen|to fetch|يجلب|haben|-|-|-|A2
legen|to lay, to put|يضع|haben|-|-|-|A2
stellen|to put (upright)|يضع|haben|-|-|-|A2
feiern|to celebrate|يحتفل|haben|-|-|-|A1
wandern|to hike|يتنزه سيراً|sein|-|-|-|A2
ändern|to change|يغيّر|haben|-|-|-|B1
sammeln|to collect|يجمع|haben|-|-|-|A2
lächeln|to smile|يبتسم|haben|-|-|-|A2
heiraten|to marry|يتزوج|haben|-|-|-|A2
mieten|to rent|يستأجر|haben|-|-|-|A2
übernachten|to stay overnight|يبيت|haben|übernachtet|-|-|A2
bauen|to build|يبني|haben|-|-|-|A2
träumen|to dream|يحلم|haben|-|-|-|A2
danken|to thank|يشكر|haben|-|-|-|A1
schmecken|to taste|له طعم|haben|-|-|-|A1
dauern|to last|يستغرق|haben|-|-|-|A2
erreichen|to reach|يصل إلى|haben|-|-|-|B1
verdienen|to earn|يكسب|haben|-|-|-|B1
entwickeln|to develop|يطوّر|haben|-|-|-|B1
bedeuten|to mean|يعني|haben|-|-|-|A2
beantragen|to apply for|يقدّم طلباً للحصول على|haben|-|-|-|B1
verbessern|to improve|يحسّن|haben|-|-|-|B1
erwarten|to expect|يتوقع|haben|-|-|-|B1
unterstützen|to support|يدعم|haben|unterstützt|-|-|B2
behaupten|to claim|يدّعي|haben|-|-|-|B2
berücksichtigen|to take into account|يأخذ بعين الاعتبار|haben|-|-|-|B2
überzeugen|to convince|يقنع|haben|überzeugt|-|-|B2
beeinflussen|to influence|يؤثّر في|haben|-|-|-|B2
fahren|to drive, to go (by vehicle)|يقود / يذهب|sein|gefahren|fuhr|fährst,fährt|A1
gehen|to go, to walk|يذهب / يمشي|sein|gegangen|ging|-|A1
kommen|to come|يأتي|sein|gekommen|kam|-|A1
essen|to eat|يأكل|haben|gegessen|aß|isst,isst|A1
trinken|to drink|يشرب|haben|getrunken|trank|-|A1
schlafen|to sleep|ينام|haben|geschlafen|schlief|schläfst,schläft|A1
sprechen|to speak|يتكلم|haben|gesprochen|sprach|sprichst,spricht|A1
lesen|to read|يقرأ|haben|gelesen|las|liest,liest|A1
sehen|to see|يرى|haben|gesehen|sah|siehst,sieht|A1
geben|to give|يعطي|haben|gegeben|gab|gibst,gibt|A1
nehmen|to take|يأخذ|haben|genommen|nahm|nimmst,nimmt|A1
helfen|to help|يساعد|haben|geholfen|half|hilfst,hilft|A1
treffen|to meet|يلتقي|haben|getroffen|traf|triffst,trifft|A2
finden|to find|يجد|haben|gefunden|fand|-|A1
schreiben|to write|يكتب|haben|geschrieben|schrieb|-|A1
bleiben|to stay|يبقى|sein|geblieben|blieb|-|A1
heißen|to be called|يُسمّى|haben|geheißen|hieß|-|A1
laufen|to run, to walk|يركض / يمشي|sein|gelaufen|lief|läufst,läuft|A1
tragen|to carry, to wear|يحمل / يرتدي|haben|getragen|trug|trägst,trägt|A2
waschen|to wash|يغسل|haben|gewaschen|wusch|wäschst,wäscht|A2
fallen|to fall|يسقط|sein|gefallen|fiel|fällst,fällt|A2
gefallen|to please (I like …)|يعجب|haben|gefallen|gefiel|gefällst,gefällt|A1
halten|to hold, to stop|يمسك / يتوقف|haben|gehalten|hielt|hältst,hält|A2
lassen|to let, to leave|يترك / يدع|haben|gelassen|ließ|lässt,lässt|B1
vergessen|to forget|ينسى|haben|vergessen|vergaß|vergisst,vergisst|A2
verlieren|to lose|يفقد|haben|verloren|verlor|-|A2
gewinnen|to win|يفوز|haben|gewonnen|gewann|-|A2
beginnen|to begin|يبدأ|haben|begonnen|begann|-|A2
bekommen|to get, to receive|يحصل على|haben|bekommen|bekam|-|A1
verstehen|to understand|يفهم|haben|verstanden|verstand|-|A1
stehen|to stand|يقف|haben|gestanden|stand|-|A1
sitzen|to sit|يجلس|haben|gesessen|saß|-|A1
liegen|to lie (be lying)|يستلقي / يقع|haben|gelegen|lag|-|A1
singen|to sing|يغني|haben|gesungen|sang|-|A1
schwimmen|to swim|يسبح|sein|geschwommen|schwamm|-|A1
fliegen|to fly|يطير / يسافر بالطائرة|sein|geflogen|flog|-|A1
ziehen|to pull, to move|يسحب / ينتقل|haben|gezogen|zog|-|B1
rufen|to call|ينادي|haben|gerufen|rief|-|A2
schließen|to close|يغلق|haben|geschlossen|schloss|-|A2
sterben|to die|يموت|sein|gestorben|starb|stirbst,stirbt|B1
werfen|to throw|يرمي|haben|geworfen|warf|wirfst,wirft|B1
wachsen|to grow|ينمو|sein|gewachsen|wuchs|wächst,wächst|B1
steigen|to climb, to rise|يصعد / يرتفع|sein|gestiegen|stieg|-|B1
leiden|to suffer|يعاني|haben|gelitten|litt|-|B2
entscheiden|to decide|يقرر|haben|entschieden|entschied|-|B1
empfehlen|to recommend|يوصي|haben|empfohlen|empfahl|empfiehlst,empfiehlt|B1
vergleichen|to compare|يقارن|haben|verglichen|verglich|-|B1
schneiden|to cut|يقطع|haben|geschnitten|schnitt|-|B1
vermeiden|to avoid|يتجنب|haben|vermieden|vermied|-|B2
tun|to do|يفعل|haben|getan|tat|-|A2
bringen|to bring|يحضر|haben|gebracht|brachte|-|A1
denken|to think|يفكر|haben|gedacht|dachte|-|A2
kennen|to know (a person, place)|يعرف (شخصاً أو مكاناً)|haben|gekannt|kannte|-|A1
rennen|to run|يركض|sein|gerannt|rannte|-|B1
verbringen|to spend (time)|يقضي (وقتاً)|haben|verbracht|verbrachte|-|B1
an~rufen|to call (phone)|يتصل|haben|angerufen|rief|-|A1
auf~stehen|to get up|ينهض|sein|aufgestanden|stand|-|A1
ein~kaufen|to go shopping|يتسوق|haben|-|-|-|A1
an~fangen|to start|يبدأ|haben|angefangen|fing|fängst,fängt|A1
mit~kommen|to come along|يرافق|sein|mitgekommen|kam|-|A1
fern~sehen|to watch TV|يشاهد التلفاز|haben|ferngesehen|sah|siehst,sieht|A1
ab~fahren|to depart|يغادر|sein|abgefahren|fuhr|fährst,fährt|A2
an~kommen|to arrive|يصل|sein|angekommen|kam|-|A1
aus~steigen|to get off|ينزل|sein|ausgestiegen|stieg|-|A2
ein~steigen|to get on|يركب|sein|eingestiegen|stieg|-|A2
um~steigen|to change (trains)|يغيّر (وسيلة النقل)|sein|umgestiegen|stieg|-|A2
auf~machen|to open|يفتح|haben|-|-|-|A1
zu~machen|to close|يغلق|haben|-|-|-|A1
ein~laden|to invite|يدعو|haben|eingeladen|lud|lädst,lädt|A2
zurück~kommen|to come back|يعود|sein|zurückgekommen|kam|-|A2
aus~sehen|to look (appearance)|يبدو|haben|ausgesehen|sah|siehst,sieht|A2
mit~bringen|to bring along|يحضر معه|haben|mitgebracht|brachte|-|A2
auf~hören|to stop|يتوقف|haben|-|-|-|A2
ab~holen|to pick up|يأخذ / يستقبل|haben|-|-|-|A2
aus~füllen|to fill in|يملأ (استمارة)|haben|-|-|-|A2
statt~finden|to take place|يُقام|haben|stattgefunden|fand|-|B1
teil~nehmen|to take part|يشارك|haben|teilgenommen|nahm|nimmst,nimmt|B1
vor~schlagen|to suggest|يقترح|haben|vorgeschlagen|schlug|schlägst,schlägt|B1
fest~stellen|to find out, to notice|يلاحظ / يتبيّن|haben|-|-|-|B2
sich freuen|to be glad, to look forward|يفرح|haben|-|-|-|A2
sich waschen|to wash (oneself)|يغتسل|haben|gewaschen|wusch|wäschst,wäscht|A2
sich interessieren|to be interested|يهتم|haben|-|-|-|A2
sich erinnern|to remember|يتذكّر|haben|-|-|-|B1
sich fühlen|to feel|يشعر|haben|-|-|-|A2
sich beeilen|to hurry|يستعجل|haben|-|-|-|A2
sich ärgern|to be annoyed|ينزعج|haben|-|-|-|B1
sich entschuldigen|to apologise|يعتذر|haben|-|-|-|A2
sich setzen|to sit down|يجلس|haben|-|-|-|A2
sich vor~stellen|to introduce oneself|يقدّم نفسه|haben|-|-|-|A2
sich an~ziehen|to get dressed|يرتدي ملابسه|haben|angezogen|zog|-|A2
sich bewerben|to apply (for a job)|يتقدّم لوظيفة|haben|beworben|bewarb|bewirbst,bewirbt|B1
sich unterhalten|to chat|يتحادث|haben|unterhalten|unterhielt|unterhältst,unterhält|B1
sich beschweren|to complain|يشتكي|haben|-|-|-|B1
sich kümmern|to take care|يعتني|haben|-|-|-|B1
sich verabreden|to arrange to meet|يتفق على موعد|haben|-|-|-|B1
sich gewöhnen|to get used to|يعتاد|haben|-|-|-|B1
sich langweilen|to be bored|يشعر بالملل|haben|-|-|-|B1`;

const PRON=["ich","du","er/sie/es","wir","ihr","sie/Sie"];
const REFL=["mich","dich","sich","uns","euch","sich"];
const AUX={haben:["habe","hast","hat","haben","habt","haben"],sein:["bin","bist","ist","sind","seid","sind"]};
const AUXP={haben:["hatte","hattest","hatte","hatten","hattet","hatten"],sein:["war","warst","war","waren","wart","waren"]};
const WERD=["werde","wirst","wird","werden","werdet","werden"];
const WUERD=["würde","würdest","würde","würden","würdet","würden"];
const teForms=b=>[b,b+"st",b,b+"n",b+"t",b+"n"];
/* the irregular verbs every learner needs, written out */
const SPECIAL={
 sein:{pr:["bin","bist","ist","sind","seid","sind"],pt:["war","warst","war","waren","wart","waren"],k2:["wäre","wärst","wäre","wären","wärt","wären"]},
 haben:{pr:["habe","hast","hat","haben","habt","haben"],k2:teForms("hätte")},
 werden:{pr:["werde","wirst","wird","werden","werdet","werden"],k2:WUERD},
 wissen:{pr:["weiß","weißt","weiß","wissen","wisst","wissen"],k2:teForms("wüsste")},
 können:{pr:["kann","kannst","kann","können","könnt","können"],k2:teForms("könnte")},
 müssen:{pr:["muss","musst","muss","müssen","müsst","müssen"],k2:teForms("müsste")},
 dürfen:{pr:["darf","darfst","darf","dürfen","dürft","dürfen"],k2:teForms("dürfte")},
 sollen:{pr:["soll","sollst","soll","sollen","sollt","sollen"],k2:teForms("sollte")},
 wollen:{pr:["will","willst","will","wollen","wollt","wollen"],k2:teForms("wollte")},
 mögen:{pr:["mag","magst","mag","mögen","mögt","mögen"],k2:teForms("möchte")}
};
const VERBS=VERB_LINES.trim().split("\n").map(l=>{const [inf,en,ar,aux,pp,pt,pres,lv]=l.split("|");return {inf,en,ar,aux,pp,pt,pres,lv}});

/* build all tenses of one verb */
function conjugate(v){
  const refl=v.inf.startsWith("sich ");const base=v.inf.replace(/^sich /,"");
  const [pre,core]=base.includes("~")?base.split("~"):["",base];
  let stem=/(el|er)n$/.test(core)?core.slice(0,-1):/en$/.test(core)?core.slice(0,-2):core.slice(0,-1);
  const needE=/[td]$/.test(stem)||/[^aeiouäöülrhmn]n$/.test(stem)||/[^aeiouäöülrhm]m$/.test(stem);
  const sEnd=/(s|ß|z|x)$/.test(stem);
  const inf=pre+core;
  const tail=i=>(refl?" "+REFL[i]:"")+(pre?" "+pre:"");          /* after the finite verb */
  const mid=i=>refl?REFL[i]+" ":"";                                 /* before a non-finite verb */
  const sp=SPECIAL[core];
  /* Präsens */
  let pr;
  if(sp&&sp.pr)pr=sp.pr.slice();
  else{
    const ich=/eln$/.test(core)?stem.slice(0,-2)+"le":stem+"e";
    let du,er;
    if(v.pres&&v.pres!=="-"){[du,er]=v.pres.split(",")}
    else{du=stem+(needE?"est":sEnd?"t":"st");er=stem+(needE?"et":"t")}
    pr=[ich,du,er,core,stem+(needE?"et":"t"),core];
  }
  /* Präteritum */
  let pt;
  if(sp&&sp.pt)pt=sp.pt.slice();
  else if(!v.pt||v.pt==="-")pt=teForms(stem+(needE?"ete":"te"));
  else if(/e$/.test(v.pt))pt=teForms(v.pt);   /* machte, brachte, wurde */
  else{const P=v.pt,td=/[td]$/.test(P),s=/(s|ß|z)$/.test(P);pt=[P,P+(td||s?"est":"st"),P,P+"en",P+(td?"et":"t"),P+"en"]}
  /* Partizip II */
  let pp=v.pp;
  if(!pp||pp==="-"){const insep=/^(be|ver|er|ent|zer|emp|miss|ge)/.test(core)||/ieren$/.test(core);pp=pre+(insep?"":"ge")+stem+(needE?"et":"t")}
  const aux=v.aux==="sein"?"sein":"haben";
  const k2=sp&&sp.k2?sp.k2.map((f,i)=>f+tail(i)):WUERD.map((w,i)=>w+" "+mid(i)+inf);
  return {
    inf:(refl?"sich ":"")+inf,pp,aux,
    t:{
      praes:pr.map((f,i)=>f+tail(i)),
      praet:pt.map((f,i)=>f+tail(i)),
      perf:AUX[aux].map((a,i)=>a+" "+mid(i)+pp),
      plusq:AUXP[aux].map((a,i)=>a+" "+mid(i)+pp),
      fut:WERD.map((w,i)=>w+" "+mid(i)+inf),
      k2
    }};
}
const TENSES=[
 {id:"praes",de:"Präsens",en:"present",fr:"présent",ar:"المضارع"},
 {id:"praet",de:"Präteritum",en:"simple past",fr:"prétérit",ar:"الماضي البسيط"},
 {id:"perf",de:"Perfekt",en:"present perfect (spoken past)",fr:"parfait (passé composé)",ar:"الماضي التام (ماضي الكلام)"},
 {id:"plusq",de:"Plusquamperfekt",en:"past perfect",fr:"plus-que-parfait",ar:"الماضي الأسبق"},
 {id:"fut",de:"Futur I",en:"future",fr:"futur",ar:"المستقبل"},
 {id:"k2",de:"Konjunktiv II",en:"would / conditional",fr:"conditionnel",ar:"صيغة التمني والشرط"}
];

/* ---------- grammar overview: every topic in one place ---------- */
const T3=(en,fr,ar)=>({en,fr,ar});
const GREF=[
{id:"pron",lv:"A1",de:"Personalpronomen",t:T3("Personal pronouns","Pronoms personnels","الضمائر الشخصية"),
 s:T3("Pronouns change with the case. Nominative = the subject (who does it), accusative = the direct object, dative = the indirect object (to whom). Sie with a capital S is the polite 'you'.",
 "Les pronoms changent selon le cas. Nominatif = le sujet, accusatif = le complément d'objet direct, datif = le complément d'objet indirect (à qui). Sie avec majuscule est le vouvoiement.",
 "تتغير الضمائر بحسب الحالة الإعرابية. الرفع (Nominativ) للفاعل، والنصب (Akkusativ) للمفعول به المباشر، والجر (Dativ) للمفعول غير المباشر (لمن). و Sie بحرف كبير هي صيغة المخاطب المهذبة."),
 tables:[[["","Nominativ","Akkusativ","Dativ","Possessiv"],["1. Sg.","ich","mich","mir","mein"],["2. Sg.","du","dich","dir","dein"],["3. Sg. m","er","ihn","ihm","sein"],["3. Sg. f","sie","sie","ihr","ihr"],["3. Sg. n","es","es","ihm","sein"],["1. Pl.","wir","uns","uns","unser"],["2. Pl.","ihr","euch","euch","euer"],["3. Pl.","sie","sie","ihnen","ihr"],["höflich","Sie","Sie","Ihnen","Ihr"]]],
 ex:["Ich sehe dich.","Kannst du mir helfen?","Wir besuchen ihn morgen."]},
{id:"artikel",lv:"A1",de:"Artikel und die vier Fälle",t:T3("Articles and the four cases","Les articles et les quatre cas","أدوات التعريف والحالات الأربع"),
 s:T3("German has four cases. The article shows gender, number and case. Learn the definite (der), indefinite (ein) and negative (kein) forms together.",
 "L'allemand a quatre cas. L'article indique le genre, le nombre et le cas. Apprenez ensemble les formes définies (der), indéfinies (ein) et négatives (kein).",
 "في الألمانية أربع حالات إعرابية. تُظهر الأداة الجنس والعدد والحالة. احفظ معاً صيغ أداة التعريف (der) والنكرة (ein) والنفي (kein)."),
 tables:[[["bestimmt","mask.","fem.","neutr.","Plural"],["Nominativ","der","die","das","die"],["Akkusativ","den","die","das","die"],["Dativ","dem","der","dem","den (+n)"],["Genitiv","des (+s)","der","des (+s)","der"]],
  [["unbestimmt / kein","mask.","fem.","neutr.","Plural"],["Nominativ","ein / kein","eine / keine","ein / kein","– / keine"],["Akkusativ","einen / keinen","eine / keine","ein / kein","– / keine"],["Dativ","einem / keinem","einer / keiner","einem / keinem","– / keinen"],["Genitiv","eines / keines","einer / keiner","eines / keines","– / keiner"]]],
 ex:["Der Mann kauft den Tisch.","Ich gebe dem Kind einen Apfel.","Das ist das Auto des Lehrers."]},
{id:"kasus",lv:"A2",de:"Wann welcher Fall?",t:T3("Which case when?","Quel cas quand ?","متى نستخدم كل حالة؟"),
 s:T3("Nominative: the subject. Accusative: the direct object and after durch, für, gegen, ohne, um. Dative: the indirect object, after aus, bei, mit, nach, seit, von, zu, and with verbs like helfen, danken, gefallen. Genitive: possession (des Vaters) and after wegen, trotz, während.",
 "Nominatif : le sujet. Accusatif : l'objet direct et après durch, für, gegen, ohne, um. Datif : l'objet indirect, après aus, bei, mit, nach, seit, von, zu, et avec helfen, danken, gefallen. Génitif : la possession (des Vaters) et après wegen, trotz, während.",
 "الرفع: الفاعل. النصب: المفعول به المباشر وبعد durch و für و gegen و ohne و um. الجر: المفعول غير المباشر وبعد aus و bei و mit و nach و seit و von و zu ومع أفعال مثل helfen و danken و gefallen. الإضافة (Genitiv): الملكية (des Vaters) وبعد wegen و trotz و während."),
 tables:[[["Fall","Frage","Beispiel"],["Nominativ","Wer? Was?","Der Hund schläft."],["Akkusativ","Wen? Was?","Ich sehe den Hund."],["Dativ","Wem?","Ich gebe dem Hund Wasser."],["Genitiv","Wessen?","Das ist der Ball des Hundes."]]],
 ex:["Ich helfe meiner Mutter.","Das Buch gefällt mir.","Wegen des Regens bleiben wir zu Hause."]},
{id:"nomen",lv:"A1",de:"Nomen: Genus und Plural",t:T3("Nouns: gender and plural","Noms : genre et pluriel","الأسماء: الجنس والجمع"),
 s:T3("All nouns are written with a capital letter. Some endings tell you the gender. Plurals have several patterns, so learn every noun with its article and plural.",
 "Tous les noms prennent une majuscule. Certaines terminaisons indiquent le genre. Le pluriel a plusieurs formes : apprenez chaque nom avec son article et son pluriel.",
 "تُكتب كل الأسماء بحرف كبير. بعض النهايات تدل على الجنس. للجمع عدة صيغ، فاحفظ كل اسم مع أداته وجمعه."),
 tables:[[["Endung","Genus","Beispiel"],["-ung, -heit, -keit, -schaft, -ion, -tät","die","die Zeitung, die Freiheit"],["-chen, -lein, -ment, -um","das","das Mädchen, das Zentrum"],["-er (Person), -ling, -ismus","der","der Lehrer, der Frühling"],["-e (oft)","die","die Lampe, die Straße"]],
  [["Plural","Beispiel"],["-e","der Tisch → die Tische"],["-¨e","die Hand → die Hände"],["-er / -¨er","das Kind → die Kinder, das Buch → die Bücher"],["-n / -en","die Lampe → die Lampen, die Frau → die Frauen"],["-s","das Auto → die Autos"],["– / -¨","der Lehrer → die Lehrer, der Vater → die Väter"]]],
 ex:["Die Zeitung liegt auf dem Tisch.","Das Mädchen hat zwei Brüder.","Die Kinder spielen im Garten."]},
{id:"praesens",lv:"A1",de:"Präsens",t:T3("Present tense","Le présent","المضارع"),
 s:T3("Stem + ending: -e, -st, -t, -en, -t, -en. Stems ending in -t/-d add an e (du arbeitest). Many strong verbs change their vowel in the du and er/sie/es forms: e → i (geben → gibt), e → ie (lesen → liest), a → ä (fahren → fährt).",
 "Radical + terminaison : -e, -st, -t, -en, -t, -en. Les radicaux en -t/-d ajoutent un e (du arbeitest). Beaucoup de verbes forts changent de voyelle à du et er/sie/es : e → i (geben → gibt), e → ie (lesen → liest), a → ä (fahren → fährt).",
 "الجذر + النهاية: e و st و t و en و t و en. الجذور المنتهية بـ t أو d تضيف e (du arbeitest). وكثير من الأفعال القوية يتغير حرفها الصوتي مع du و er/sie/es: ‏e إلى i ‏(gibt)، ‏e إلى ie ‏(liest)، ‏a إلى ä ‏(fährt)."),
 tables:[[["","machen","arbeiten","fahren","lesen","geben"],["ich","mache","arbeite","fahre","lese","gebe"],["du","machst","arbeitest","fährst","liest","gibst"],["er/sie/es","macht","arbeitet","fährt","liest","gibt"],["wir","machen","arbeiten","fahren","lesen","geben"],["ihr","macht","arbeitet","fahrt","lest","gebt"],["sie/Sie","machen","arbeiten","fahren","lesen","geben"]]],
 ex:["Ich lerne jeden Tag Deutsch.","Er fährt mit dem Bus.","Liest du gern?"]},
{id:"perfekt",lv:"A2",de:"Perfekt",t:T3("Present perfect (spoken past)","Le parfait (passé composé)","الماضي التام (ماضي الكلام)"),
 s:T3("Used for the past when speaking: haben or sein + Partizip II at the end. Sein for movement from A to B or a change of state (gehen, fahren, kommen, aufstehen, werden) and for sein and bleiben. Partizip II: weak ge-…-t (gemacht), strong ge-…-en (gefahren), no ge- for be-/ver-/er- and -ieren (besucht, studiert), separable verbs put ge in the middle (aufgestanden).",
 "Pour le passé à l'oral : haben ou sein + participe II à la fin. Sein pour un déplacement de A vers B ou un changement d'état (gehen, fahren, kommen, aufstehen, werden) ainsi que sein et bleiben. Participe II : faible ge-…-t (gemacht), fort ge-…-en (gefahren), pas de ge- avec be-/ver-/er- et -ieren (besucht, studiert), les verbes séparables mettent ge au milieu (aufgestanden).",
 "يُستخدم للماضي في الكلام: haben أو sein + اسم المفعول (Partizip II) في آخر الجملة. نستخدم sein للحركة من مكان إلى آخر أو لتغيّر الحال (gehen و fahren و kommen و aufstehen و werden) ومع sein و bleiben. اسم المفعول: الأفعال الضعيفة ge…t ‏(gemacht)، والقوية ge…en ‏(gefahren)، ولا نضيف ge مع be و ver و er ومع ieren ‏(besucht, studiert)، والأفعال المنفصلة تضع ge في الوسط (aufgestanden)."),
 tables:[[["","machen","fahren","aufstehen"],["ich","habe gemacht","bin gefahren","bin aufgestanden"],["du","hast gemacht","bist gefahren","bist aufgestanden"],["er/sie/es","hat gemacht","ist gefahren","ist aufgestanden"],["wir","haben gemacht","sind gefahren","sind aufgestanden"],["ihr","habt gemacht","seid gefahren","seid aufgestanden"],["sie/Sie","haben gemacht","sind gefahren","sind aufgestanden"]]],
 ex:["Ich habe gestern Pizza gegessen.","Wir sind nach Berlin gefahren.","Hast du die Hausaufgaben gemacht?"]},
{id:"praeteritum",lv:"B1",de:"Präteritum",t:T3("Simple past","Le prétérit","الماضي البسيط"),
 s:T3("Used mainly in writing and stories. In speech Germans use it mostly with sein, haben, the modal verbs and es gab. Weak verbs: stem + -te (machte). Strong verbs change their vowel (fahren → fuhr, gehen → ging); ich and er/sie/es have no ending.",
 "Surtout à l'écrit et dans les récits. À l'oral, on l'emploie surtout avec sein, haben, les verbes de modalité et es gab. Verbes faibles : radical + -te (machte). Verbes forts : changement de voyelle (fahren → fuhr, gehen → ging) ; ich et er/sie/es n'ont pas de terminaison.",
 "يُستخدم غالباً في الكتابة والقصص. وفي الكلام يُستخدم خاصة مع sein و haben والأفعال المساعدة و es gab. الأفعال الضعيفة: الجذر + te ‏(machte). الأفعال القوية يتغير حرفها الصوتي (fuhr و ging)، ولا نهاية مع ich و er/sie/es."),
 tables:[[["","sein","haben","machen","gehen","können"],["ich","war","hatte","machte","ging","konnte"],["du","warst","hattest","machtest","gingst","konntest"],["er/sie/es","war","hatte","machte","ging","konnte"],["wir","waren","hatten","machten","gingen","konnten"],["ihr","wart","hattet","machtet","gingt","konntet"],["sie/Sie","waren","hatten","machten","gingen","konnten"]]],
 ex:["Als Kind wohnte ich in Tunis.","Gestern war ich krank.","Es war einmal ein König."]},
{id:"futur",lv:"A2",de:"Futur I und Plusquamperfekt",t:T3("Future and past perfect","Futur et plus-que-parfait","المستقبل والماضي الأسبق"),
 s:T3("Futur I: werden + infinitive at the end (ich werde arbeiten). Germans often use the present with a time word instead (Morgen fahre ich). Plusquamperfekt: hatte/war + Partizip II, for something that happened before another past event.",
 "Futur I : werden + infinitif à la fin (ich werde arbeiten). On utilise souvent le présent avec un mot de temps (Morgen fahre ich). Plus-que-parfait : hatte/war + participe II, pour une action antérieure à une autre action passée.",
 "المستقبل: werden + المصدر في آخر الجملة (ich werde arbeiten). وكثيراً ما يُستخدم المضارع مع كلمة زمن (Morgen fahre ich). الماضي الأسبق: hatte أو war + اسم المفعول، لحدث وقع قبل حدث ماضٍ آخر."),
 tables:[[["","Futur I","Plusquamperfekt"],["ich","werde lernen","hatte gelernt / war gegangen"],["du","wirst lernen","hattest gelernt / warst gegangen"],["er/sie/es","wird lernen","hatte gelernt / war gegangen"],["wir","werden lernen","hatten gelernt / waren gegangen"],["ihr","werdet lernen","hattet gelernt / wart gegangen"],["sie/Sie","werden lernen","hatten gelernt / waren gegangen"]]],
 ex:["Nächstes Jahr werde ich in Deutschland studieren.","Nachdem wir gegessen hatten, gingen wir spazieren."]},
{id:"modal",lv:"A1",de:"Modalverben",t:T3("Modal verbs","Les verbes de modalité","الأفعال المساعدة الناقصة"),
 s:T3("können (can), müssen (must), dürfen (may), sollen (should), wollen (want), mögen/möchten (like / would like). The modal verb is conjugated in position 2 and the main verb goes to the end as an infinitive. Ich and er/sie/es have the same form without an ending.",
 "können (pouvoir), müssen (devoir), dürfen (avoir le droit), sollen (devoir, être censé), wollen (vouloir), mögen/möchten (aimer / voudrais). Le verbe de modalité est conjugué en 2e position et le verbe principal va à la fin à l'infinitif. Ich et er/sie/es ont la même forme, sans terminaison.",
 "können (يستطيع)، müssen (يجب)، dürfen (يُسمح)، sollen (ينبغي)، wollen (يريد)، mögen/möchten (يحب / يودّ). يُصرَّف الفعل المساعد في المكان الثاني ويذهب الفعل الأساسي إلى آخر الجملة في صيغة المصدر. صيغتا ich و er/sie/es متطابقتان وبلا نهاية."),
 tables:[[["","können","müssen","dürfen","sollen","wollen","möchten"],["ich","kann","muss","darf","soll","will","möchte"],["du","kannst","musst","darfst","sollst","willst","möchtest"],["er/sie/es","kann","muss","darf","soll","will","möchte"],["wir","können","müssen","dürfen","sollen","wollen","möchten"],["ihr","könnt","müsst","dürft","sollt","wollt","möchtet"],["sie/Sie","können","müssen","dürfen","sollen","wollen","möchten"]]],
 ex:["Ich kann gut schwimmen.","Du musst heute arbeiten.","Möchten Sie einen Kaffee?"]},
{id:"trennbar",lv:"A2",de:"Trennbare und untrennbare Verben",t:T3("Separable and inseparable verbs","Verbes séparables et inséparables","الأفعال المنفصلة وغير المنفصلة"),
 s:T3("Separable prefixes (an, auf, aus, ein, mit, vor, zu, zurück, fern …) are stressed and go to the end of the sentence: Ich stehe um 7 Uhr auf. Inseparable prefixes (be, emp, ent, er, ge, miss, ver, zer) never separate and take no ge- in the Partizip II: verstanden, bekommen.",
 "Les préfixes séparables (an, auf, aus, ein, mit, vor, zu, zurück, fern…) sont accentués et vont en fin de phrase : Ich stehe um 7 Uhr auf. Les préfixes inséparables (be, emp, ent, er, ge, miss, ver, zer) ne se séparent jamais et n'ont pas de ge- au participe II : verstanden, bekommen.",
 "السوابق المنفصلة (an و auf و aus و ein و mit و vor و zu و zurück و fern …) تُنطق بنبرة وتذهب إلى آخر الجملة: Ich stehe um 7 Uhr auf. أما السوابق غير المنفصلة (be و emp و ent و er و ge و miss و ver و zer) فلا تنفصل أبداً ولا تأخذ ge في اسم المفعول: verstanden و bekommen."),
 tables:[[["","Präsens","Perfekt","mit Modalverb"],["anrufen","Ich rufe dich an.","Ich habe dich angerufen.","Ich will dich anrufen."],["einkaufen","Wir kaufen ein.","Wir haben eingekauft.","Wir müssen einkaufen."],["verstehen","Ich verstehe dich.","Ich habe dich verstanden.","Ich kann dich verstehen."]]],
 ex:["Der Zug fährt um 8 Uhr ab.","Kommst du mit?","Ich habe das Wort vergessen."]},
{id:"reflexiv",lv:"A2",de:"Reflexive Verben",t:T3("Reflexive verbs","Verbes pronominaux","الأفعال الانعكاسية"),
 s:T3("Some verbs need a reflexive pronoun that refers back to the subject: sich freuen, sich waschen, sich erinnern. Usually the accusative; when there is another object, the dative (Ich wasche mir die Hände).",
 "Certains verbes demandent un pronom réfléchi qui renvoie au sujet : sich freuen, sich waschen, sich erinnern. En général à l'accusatif ; s'il y a un autre objet, au datif (Ich wasche mir die Hände).",
 "بعض الأفعال تحتاج ضميراً انعكاسياً يعود على الفاعل: sich freuen و sich waschen و sich erinnern. غالباً في حالة النصب، وإذا وُجد مفعول آخر ففي حالة الجر (Ich wasche mir die Hände)."),
 tables:[[["","Akkusativ","Dativ","Beispiel"],["ich","mich","mir","Ich freue mich."],["du","dich","dir","Du freust dich."],["er/sie/es","sich","sich","Er freut sich."],["wir","uns","uns","Wir freuen uns."],["ihr","euch","euch","Ihr freut euch."],["sie/Sie","sich","sich","Sie freuen sich."]]],
 ex:["Ich interessiere mich für Musik.","Erinnerst du dich an mich?","Wir müssen uns beeilen."]},
{id:"satzbau",lv:"A1",de:"Satzbau",t:T3("Word order","L'ordre des mots","ترتيب الكلمات"),
 s:T3("Main clause: the conjugated verb is always in position 2. Yes/no question: verb first. W-question: question word, then verb. Subordinate clause (weil, dass, wenn …): the conjugated verb goes to the very end. Middle field order: time – cause – manner – place (TeKaMoLo).",
 "Proposition principale : le verbe conjugué est toujours en 2e position. Question fermée : verbe en tête. Question en W : mot interrogatif puis verbe. Subordonnée (weil, dass, wenn…) : le verbe conjugué va tout à la fin. Ordre au milieu : temps – cause – manière – lieu (TeKaMoLo).",
 "في الجملة الرئيسية يكون الفعل المصرَّف دائماً في المكان الثاني. في سؤال نعم/لا يأتي الفعل أولاً. في السؤال بأداة استفهام: الأداة ثم الفعل. في الجملة الفرعية (weil و dass و wenn …) يذهب الفعل المصرَّف إلى النهاية. ترتيب وسط الجملة: الزمان – السبب – الطريقة – المكان (TeKaMoLo)."),
 tables:[[["Position 1","Position 2 (Verb)","Mittelfeld","Ende"],["Ich","fahre","heute mit dem Zug","nach Berlin."],["Heute","fahre","ich mit dem Zug","nach Berlin."],["Wann","fährst","du","nach Berlin?"],["–","Fährst","du heute","nach Berlin?"],["…, weil","–","ich heute nach Berlin","fahre."]]],
 ex:["Morgen gehe ich ins Kino.","Ich bleibe zu Hause, weil ich krank bin.","Ich fahre morgen wegen der Arbeit mit dem Auto nach Köln."]},
{id:"negation",lv:"A1",de:"Negation: nicht und kein",t:T3("Negation: nicht and kein","La négation : nicht et kein","النفي: nicht و kein"),
 s:T3("kein negates a noun with ein or without an article (Ich habe kein Auto, keine Zeit). nicht negates everything else: verbs, adjectives, nouns with der/die/das, names. nicht usually stands at the end or before the part it negates.",
 "kein nie un nom avec ein ou sans article (Ich habe kein Auto, keine Zeit). nicht nie tout le reste : verbes, adjectifs, noms avec der/die/das, noms propres. nicht se place en général à la fin ou devant l'élément nié.",
 "تنفي kein الاسم المسبوق بـ ein أو بلا أداة (Ich habe kein Auto, keine Zeit). وتنفي nicht كل ما عدا ذلك: الأفعال والصفات والأسماء المعرّفة بـ der/die/das وأسماء الأعلام. وتأتي nicht عادة في آخر الجملة أو قبل الجزء المنفي."),
 tables:[[["positiv","negativ"],["Ich habe ein Auto.","Ich habe kein Auto."],["Ich habe Zeit.","Ich habe keine Zeit."],["Ich komme.","Ich komme nicht."],["Das ist gut.","Das ist nicht gut."],["Ich sehe den Film.","Ich sehe den Film nicht."]]],
 ex:["Er trinkt keinen Kaffee.","Ich wohne nicht in Berlin.","Das ist nicht mein Buch."]},
{id:"praepositionen",lv:"A2",de:"Präpositionen",t:T3("Prepositions","Les prépositions","حروف الجر"),
 s:T3("Each preposition takes a case. Two-way prepositions take the accusative for direction (Wohin? – Ich gehe in den Park) and the dative for location (Wo? – Ich bin im Park). Common contractions: im = in dem, am = an dem, zum = zu dem, zur = zu der, ins = in das, beim = bei dem.",
 "Chaque préposition régit un cas. Les prépositions mixtes prennent l'accusatif pour la direction (Wohin ? – Ich gehe in den Park) et le datif pour le lieu (Wo ? – Ich bin im Park). Contractions : im = in dem, am = an dem, zum = zu dem, zur = zu der, ins = in das, beim = bei dem.",
 "لكل حرف جر حالة إعرابية. حروف الجر المزدوجة تأخذ النصب للاتجاه (Wohin؟ – Ich gehe in den Park) والجر للمكان (Wo؟ – Ich bin im Park). الاختصارات الشائعة: im = in dem و am = an dem و zum = zu dem و zur = zu der و ins = in das و beim = bei dem."),
 tables:[[["Fall","Präpositionen"],["Akkusativ","durch, für, gegen, ohne, um, bis"],["Dativ","aus, bei, mit, nach, seit, von, zu, gegenüber, ab"],["Akk. (wohin?) / Dat. (wo?)","an, auf, hinter, in, neben, über, unter, vor, zwischen"],["Genitiv","wegen, trotz, während, statt, innerhalb, außerhalb"]]],
 ex:["Das Geschenk ist für dich.","Ich fahre mit dem Bus zur Arbeit.","Ich lege das Buch auf den Tisch. Das Buch liegt auf dem Tisch."]},
{id:"adjektiv",lv:"B1",de:"Adjektivdeklination",t:T3("Adjective endings","La déclinaison de l'adjectif","تصريف الصفات"),
 s:T3("An adjective after the noun's verb has no ending (Der Tisch ist neu). Before a noun it takes an ending that depends on the article. After der/die/das the endings are mostly -e/-en; after ein the adjective shows the gender (-er, -e, -es); with no article it takes the article's endings.",
 "Un adjectif attribut n'a pas de terminaison (Der Tisch ist neu). Devant un nom, il prend une terminaison selon l'article. Après der/die/das : surtout -e/-en ; après ein, l'adjectif montre le genre (-er, -e, -es) ; sans article, il prend les terminaisons de l'article.",
 "الصفة الخبرية لا تأخذ نهاية (Der Tisch ist neu). أما قبل الاسم فتأخذ نهاية تتوقف على الأداة. بعد der/die/das تكون النهايات غالباً e أو en، وبعد ein تُظهر الصفة الجنس (er و e و es)، وبلا أداة تأخذ الصفة نهايات الأداة نفسها."),
 tables:[[["nach der/die/das","mask.","fem.","neutr.","Plural"],["Nom.","der neue Tisch","die neue Lampe","das neue Buch","die neuen Bücher"],["Akk.","den neuen Tisch","die neue Lampe","das neue Buch","die neuen Bücher"],["Dat.","dem neuen Tisch","der neuen Lampe","dem neuen Buch","den neuen Büchern"],["Gen.","des neuen Tisches","der neuen Lampe","des neuen Buches","der neuen Bücher"]],
  [["nach ein/kein/mein","mask.","fem.","neutr.","Plural"],["Nom.","ein neuer Tisch","eine neue Lampe","ein neues Buch","keine neuen Bücher"],["Akk.","einen neuen Tisch","eine neue Lampe","ein neues Buch","keine neuen Bücher"],["Dat.","einem neuen Tisch","einer neuen Lampe","einem neuen Buch","keinen neuen Büchern"],["Gen.","eines neuen Tisches","einer neuen Lampe","eines neuen Buches","keiner neuen Bücher"]],
  [["ohne Artikel","mask.","fem.","neutr.","Plural"],["Nom.","guter Kaffee","frische Milch","kaltes Wasser","neue Bücher"],["Akk.","guten Kaffee","frische Milch","kaltes Wasser","neue Bücher"],["Dat.","gutem Kaffee","frischer Milch","kaltem Wasser","neuen Büchern"],["Gen.","guten Kaffees","frischer Milch","kalten Wassers","neuer Bücher"]]],
 ex:["Ich habe einen neuen Laptop.","Die kleine Katze schläft.","Ich trinke gern kaltes Wasser."]},
{id:"komparativ",lv:"A2",de:"Komparativ und Superlativ",t:T3("Comparative and superlative","Comparatif et superlatif","التفضيل"),
 s:T3("Comparative: adjective + -er + als (schneller als). Equal: so … wie (so groß wie). Superlative: am + -sten (am schnellsten) or der/die/das …-ste before a noun. Short adjectives often add an umlaut (alt → älter). Learn the irregular ones: gut, viel, gern, hoch, nah.",
 "Comparatif : adjectif + -er + als (schneller als). Égalité : so … wie (so groß wie). Superlatif : am + -sten (am schnellsten) ou der/die/das …-ste devant un nom. Les adjectifs courts prennent souvent un Umlaut (alt → älter). Apprenez les irréguliers : gut, viel, gern, hoch, nah.",
 "المقارنة: الصفة + er + als ‏(schneller als). المساواة: so … wie ‏(so groß wie). التفضيل الأعلى: am + sten ‏(am schnellsten) أو der/die/das …ste قبل الاسم. الصفات القصيرة تأخذ غالباً Umlaut ‏(alt → älter). احفظ الشاذة: gut و viel و gern و hoch و nah."),
 tables:[[["Positiv","Komparativ","Superlativ"],["schnell","schneller","am schnellsten"],["alt","älter","am ältesten"],["groß","größer","am größten"],["gut","besser","am besten"],["viel","mehr","am meisten"],["gern","lieber","am liebsten"],["hoch","höher","am höchsten"],["nah","näher","am nächsten"]]],
 ex:["Mein Bruder ist älter als ich.","Berlin ist so schön wie Wien.","Ich trinke am liebsten Tee."]},
{id:"konnektoren",lv:"B1",de:"Konnektoren",t:T3("Connectors","Les connecteurs","أدوات الربط"),
 s:T3("Three groups change the word order differently. Position 0 (und, aber, oder, denn, sondern): normal order. Subordinating (weil, dass, wenn, als, ob, obwohl, damit, während, bevor, nachdem): verb at the end. Adverbs (deshalb, trotzdem, dann, außerdem, sonst): they take position 1, so the verb comes right after them.",
 "Trois groupes changent l'ordre des mots différemment. Position 0 (und, aber, oder, denn, sondern) : ordre normal. Subordonnants (weil, dass, wenn, als, ob, obwohl, damit, während, bevor, nachdem) : verbe à la fin. Adverbes (deshalb, trotzdem, dann, außerdem, sonst) : ils occupent la position 1, le verbe vient juste après.",
 "ثلاث مجموعات تغيّر ترتيب الكلمات بطرق مختلفة. المكان صفر (und و aber و oder و denn و sondern): ترتيب عادي. أدوات الجملة الفرعية (weil و dass و wenn و als و ob و obwohl و damit و während و bevor و nachdem): الفعل في النهاية. الظروف (deshalb و trotzdem و dann و außerdem و sonst): تأخذ المكان الأول فيأتي الفعل بعدها مباشرة."),
 tables:[[["Typ","Beispiel"],["denn (Position 0)","Ich bleibe zu Hause, denn ich bin krank."],["weil (Verb am Ende)","Ich bleibe zu Hause, weil ich krank bin."],["deshalb (Verb danach)","Ich bin krank, deshalb bleibe ich zu Hause."],["obwohl","Ich gehe arbeiten, obwohl ich krank bin."],["trotzdem","Ich bin krank, trotzdem gehe ich arbeiten."]]],
 ex:["Ich weiß, dass du recht hast.","Wenn es regnet, nehme ich den Bus.","Als ich klein war, wohnte ich in Sousse."]},
{id:"relativ",lv:"B1",de:"Relativsätze",t:T3("Relative clauses","Les propositions relatives","جمل الصلة"),
 s:T3("A relative clause describes a noun. The relative pronoun takes its gender and number from the noun, but its case from its role in the relative clause. The verb goes to the end, and there is always a comma.",
 "La relative décrit un nom. Le pronom relatif prend le genre et le nombre du nom, mais son cas dépend de sa fonction dans la relative. Le verbe va à la fin et on met toujours une virgule.",
 "جملة الصلة تصف اسماً. يأخذ الاسم الموصول جنسه وعدده من الاسم، أما حالته الإعرابية فمن دوره داخل جملة الصلة. ويذهب الفعل إلى النهاية، ونضع دائماً فاصلة."),
 tables:[[["","mask.","fem.","neutr.","Plural"],["Nominativ","der","die","das","die"],["Akkusativ","den","die","das","die"],["Dativ","dem","der","dem","denen"],["Genitiv","dessen","deren","dessen","deren"]]],
 ex:["Das ist der Mann, der neben mir wohnt.","Die Frau, die ich gestern getroffen habe, ist Ärztin.","Das sind die Kinder, mit denen ich spiele."]},
{id:"passiv",lv:"B1",de:"Passiv",t:T3("Passive voice","Le passif","المبني للمجهول"),
 s:T3("The passive puts the action in focus, not the person: werden + Partizip II. The person can be added with von + dative. Perfect passive: sein + Partizip II + worden. With a modal verb: muss + Partizip II + werden.",
 "Le passif met l'action au centre, pas la personne : werden + participe II. On peut ajouter l'agent avec von + datif. Passif au parfait : sein + participe II + worden. Avec un verbe de modalité : muss + participe II + werden.",
 "المبني للمجهول يركّز على الفعل لا على الفاعل: werden + اسم المفعول. ويمكن ذكر الفاعل بـ von + الجر. في الماضي التام: sein + اسم المفعول + worden. ومع الفعل المساعد: muss + اسم المفعول + werden."),
 tables:[[["Zeit","Beispiel"],["Präsens","Das Haus wird gebaut."],["Präteritum","Das Haus wurde gebaut."],["Perfekt","Das Haus ist gebaut worden."],["mit Modalverb","Das Haus muss gebaut werden."],["Zustandspassiv","Das Haus ist gebaut."]]],
 ex:["Hier wird Deutsch gesprochen.","Das Paket wurde gestern geschickt.","Der Brief muss heute geschrieben werden."]},
{id:"konjunktiv2",lv:"B1",de:"Konjunktiv II",t:T3("Subjunctive II (would)","Le subjonctif II (conditionnel)","صيغة الشرط والتمني"),
 s:T3("For wishes, polite requests and unreal conditions. Most verbs: würde + infinitive. Special forms are used for sein (wäre), haben (hätte) and the modal verbs (könnte, müsste, dürfte, sollte). Past: hätte/wäre + Partizip II.",
 "Pour les souhaits, les demandes polies et les conditions irréelles. La plupart des verbes : würde + infinitif. Formes propres pour sein (wäre), haben (hätte) et les verbes de modalité (könnte, müsste, dürfte, sollte). Passé : hätte/wäre + participe II.",
 "للتمني والطلب المهذب والشرط غير الواقعي. معظم الأفعال: würde + المصدر. وتُستخدم صيغ خاصة مع sein ‏(wäre) و haben ‏(hätte) والأفعال المساعدة (könnte و müsste و dürfte و sollte). وفي الماضي: hätte/wäre + اسم المفعول."),
 tables:[[["","sein","haben","können","würde + Inf."],["ich","wäre","hätte","könnte","würde gehen"],["du","wärst","hättest","könntest","würdest gehen"],["er/sie/es","wäre","hätte","könnte","würde gehen"],["wir","wären","hätten","könnten","würden gehen"],["ihr","wärt","hättet","könntet","würdet gehen"],["sie/Sie","wären","hätten","könnten","würden gehen"]]],
 ex:["Wenn ich Zeit hätte, würde ich reisen.","Könnten Sie mir bitte helfen?","Ich wäre gern am Meer."]},
{id:"konjunktiv1",lv:"B2",de:"Konjunktiv I (indirekte Rede)",t:T3("Subjunctive I (reported speech)","Subjonctif I (discours indirect)","الكلام المنقول (Konjunktiv I)"),
 s:T3("Used mainly in news and formal texts to report what someone said. Stem + -e, -est, -e, -en, -et, -en. If the form is the same as the present, use Konjunktiv II instead. Most common: er sei, er habe, er werde, er könne.",
 "Surtout dans la presse et les textes formels pour rapporter des paroles. Radical + -e, -est, -e, -en, -et, -en. Si la forme est identique au présent, on prend le subjonctif II. Formes fréquentes : er sei, er habe, er werde, er könne.",
 "يُستخدم غالباً في الأخبار والنصوص الرسمية لنقل كلام شخص. الجذر + e و est و e و en و et و en. وإذا تطابقت الصيغة مع المضارع نستخدم Konjunktiv II. أشهر الصيغ: er sei و er habe و er werde و er könne."),
 tables:[[["","sein","haben","werden","können"],["ich","sei","habe → hätte","werde → würde","könne"],["du","sei(e)st","habest","werdest","könnest"],["er/sie/es","sei","habe","werde","könne"],["wir","seien","haben → hätten","werden → würden","können → könnten"],["ihr","seiet","habet","werdet","könnet"],["sie/Sie","seien","haben → hätten","werden → würden","können → könnten"]]],
 ex:["Der Minister sagte, er sei zufrieden.","Sie erklärte, sie habe keine Zeit.","Er behauptet, er könne das allein."]},
{id:"imperativ",lv:"A1",de:"Imperativ",t:T3("Imperative","L'impératif","صيغة الأمر"),
 s:T3("du: the du form without -st and without du (Komm! Mach!). Verbs with e → i/ie keep it (Gib! Lies! Nimm!), but a → ä does not (Fahr!). ihr: the ihr form without ihr (Kommt!). Sie: verb + Sie (Kommen Sie!). Add bitte to be polite.",
 "du : la forme de du sans -st et sans du (Komm ! Mach !). Les verbes en e → i/ie le gardent (Gib ! Lies ! Nimm !), mais pas a → ä (Fahr !). ihr : la forme de ihr sans ihr (Kommt !). Sie : verbe + Sie (Kommen Sie !). Ajoutez bitte pour être poli.",
 "مع du: صيغة du بدون st وبدون du ‏(Komm! Mach!). الأفعال التي يتغير فيها e إلى i أو ie تحافظ على التغيير (Gib! Lies! Nimm!) أما a إلى ä فلا (Fahr!). مع ihr: صيغة ihr بدون ihr ‏(Kommt!). مع Sie: الفعل + Sie ‏(Kommen Sie!). أضف bitte للتهذيب."),
 tables:[[["","kommen","geben","fahren","sein"],["du","Komm!","Gib!","Fahr!","Sei!"],["ihr","Kommt!","Gebt!","Fahrt!","Seid!"],["Sie","Kommen Sie!","Geben Sie!","Fahren Sie!","Seien Sie!"]]],
 ex:["Mach bitte das Fenster zu!","Sprechen Sie bitte langsam!","Seid leise, das Baby schläft!"]},
{id:"zuinf",lv:"B1",de:"Infinitiv mit zu",t:T3("Infinitive with zu","L'infinitif avec zu","المصدر مع zu"),
 s:T3("After many verbs and expressions (versuchen, vergessen, anfangen, Lust haben, es ist wichtig …) the second verb goes to the end as zu + infinitive. Separable verbs put zu in the middle (anzurufen). Also: um … zu (in order to), ohne … zu, statt … zu.",
 "Après beaucoup de verbes et d'expressions (versuchen, vergessen, anfangen, Lust haben, es ist wichtig…), le deuxième verbe va à la fin avec zu + infinitif. Les verbes séparables mettent zu au milieu (anzurufen). Aussi : um … zu (pour), ohne … zu, statt … zu.",
 "بعد كثير من الأفعال والتعابير (versuchen و vergessen و anfangen و Lust haben و es ist wichtig …) يذهب الفعل الثاني إلى النهاية بصيغة zu + المصدر. والأفعال المنفصلة تضع zu في الوسط (anzurufen). وكذلك: um … zu (لكي) و ohne … zu و statt … zu."),
 tables:[[["Ausdruck","Beispiel"],["versuchen","Ich versuche, mehr zu lesen."],["vergessen","Ich habe vergessen, dich anzurufen."],["Lust haben","Hast du Lust, ins Kino zu gehen?"],["um … zu","Ich lerne Deutsch, um in Deutschland zu arbeiten."]]],
 ex:["Es ist wichtig, jeden Tag zu üben.","Er geht, ohne etwas zu sagen."]},
{id:"genitiv",lv:"B1",de:"Genitiv",t:T3("Genitive","Le génitif","حالة الإضافة"),
 s:T3("The genitive shows possession: das Auto des Vaters (the father's car). Masculine and neuter nouns add -s or -es. With names just add -s: Annas Buch. In everyday speech von + dative is common: das Auto von meinem Vater.",
 "Le génitif exprime la possession : das Auto des Vaters (la voiture du père). Les noms masculins et neutres prennent -s ou -es. Avec un prénom, on ajoute -s : Annas Buch. À l'oral, on dit souvent von + datif : das Auto von meinem Vater.",
 "حالة الإضافة تعبّر عن الملكية: das Auto des Vaters (سيارة الأب). الأسماء المذكرة والمحايدة تضيف s أو es. ومع الأسماء الشخصية نضيف s فقط: Annas Buch. وفي الكلام اليومي يُقال كثيراً von + الجر: das Auto von meinem Vater."),
 tables:[[["","mask.","fem.","neutr.","Plural"],["bestimmt","des Mannes","der Frau","des Kindes","der Kinder"],["unbestimmt","eines Mannes","einer Frau","eines Kindes","–"],["Possessiv","meines Mannes","meiner Frau","meines Kindes","meiner Kinder"]]],
 ex:["Das ist das Haus meiner Eltern.","Trotz des Wetters gehen wir spazieren.","Während des Kurses ist das Handy aus."]}
];
