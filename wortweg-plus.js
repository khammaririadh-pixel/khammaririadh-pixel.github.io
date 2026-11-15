/* Wortweg Plus: vocabulary, grammar overview, verb tables, training, animated lessons & scenes, saved progress.
   Loaded after the main app script; it adds screens and hooks into renderAll / setLevel / openVideo. */
(()=>{
const tr=o=>o?(o[state.lang]||o.en||""):"";
const lvIdx=id=>LEVELS.findIndex(l=>l.id===id);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const uniq=a=>[...new Set(a)];
const gloss=w=>state.lang==="ar"?w.ar:w.en;
const artWord=w=>(w.art?w.art+" ":"")+w.de;
const ARTC=s=>esc(s).replace(/(^|[\s(„"])(der|die|das|den|dem|des|ein|eine|einen|einem|einer)(?=[\s.,!?]|$)/gi,(m,p,a)=>{const k=a.toLowerCase();const c=k==="die"||k==="eine"||k==="einer"?"die":k==="das"?"das":"der";return `${p}<span class="ac-${c}">${a}</span>`});

/* all verbs from the verb tables also become a vocabulary topic */
if(typeof VERBS!=="undefined"&&!VOCAB.some(x=>x.id==="verben")){
  const th={id:"verben",icon:"🏃",de:"Wichtige Verben",en:"Important verbs",fr:"Verbes importants",ar:"أفعال مهمة",
    items:VERBS.map(v=>({art:"",de:v.inf.replace("~",""),pl:"",en:v.en,ar:v.ar,lv:v.lv,th:"verben"}))};
  VOCAB.push(th);ALLWORDS.push(...th.items);
}

/* ---------------- texts ---------------- */
Object.assign(L.en,{tab_words:"Words",words_title:"Vocabulary",words_lead:"Hundreds of everyday words sorted by topic, each with English and Arabic. Tap the speaker to hear a word, tick the words you know, or practise with flashcards.",w_search:"Search in German, English or Arabic…",w_all:"All",w_learned:"learned",w_list:"List",w_cards:"Flashcards",w_flip:"Tap the card to see the meaning",w_know:"I know it ✓",w_again:"Again",w_done:"Great, you went through all the cards!",w_back:"All topics",w_none:"No words found.",w_mark:"Mark as learned",w_restart:"Start again",
g_lessons:"Lessons",g_ref:"Overview",g_verbs:"Verbs",g_train:"Training",ref_lead:"The whole of German grammar, topic by topic: the rule, the tables and examples.",verbs_lead:"important verbs in every tense with ich, du, er/sie/es, wir, ihr, sie/Sie. Tap a verb to see all its forms.",verbs_search:"Search a verb in German, English or Arabic…",v_aux:"Perfekt with",v_sep:"separable",v_refl:"reflexive",v_hear:"Listen",
train_title:"Training",train_lead:"Mixed exercises from every topic of your level: grammar, articles, verb forms, plurals, word order, vocabulary, listening and spelling. Every round is new.",train_start:"Start a round",train_best:"Best",train_q:"Question",train_check:"Check",train_next:"Next",train_done:"Round finished!",train_again:"New round",train_review:"To review",train_of:"of",train_correct:"correct",
tq_gram:"Fill the gap",tq_art:"Which article?",tq_mean:"What does it mean?",tq_rev:"How do you say it in German?",tq_conj:"Choose the right verb form",tq_plural:"What is the plural?",tq_order:"Put the words in the right order",tq_type:"Write it in German",tq_hear:"Listen and choose the word you hear",tq_order_hint:"Tap the words in order. Tap a chosen word to take it back.",tq_type_ph:"Type in German…",tq_article_tip:"Remember the article:",
sc_title:"Scenes",sc_lead:"Animated everyday scenes: people talk in German, you read along and can show the translation. Pick a scene for your level.",sc_lines:"lines",sc_seen:"watched",
pl_tr:"Translation",pl_replay:"Replay",pl_orig:"Original video",pl_practice:"Do the exercises",pl_chat:"Practise this with Lena",pl_turn:"Your turn! Say it out loud.",pl_rule:"The rule",pl_forms:"Forms",pl_ex:"Example",pl_end:"Well done!",pl_end_sub:"Now practise what you heard.",pl_nat:"natural voice",pl_dev:"device voice",pl_lesson:"Video lesson",pl_scene:"Scene",pl_close:"Close",pl_rec:"recorded German voice",pl_basic:"basic voice ⚠",pl_basic_tip:"This device has no German voice, so a basic robot voice is used. For correct German pronunciation: open the app in Microsoft Edge or Chrome, or on Windows add a German voice (Settings › Time & language › Speech › Add voices › Deutsch), or add a free Gemini key for Lena's natural voice.",
pr_title:"Your progress",pr_lead:"Everything you do is saved automatically on this device. Save a backup file to keep it safe or move it to another phone.",pr_ex:"exercises done",pr_words:"words learned",pr_train:"best training score",pr_scenes:"scenes watched",pr_lessons:"lessons watched",pr_save:"Save progress file",pr_load:"Load progress file",pr_saved:"Saved! Keep this file to restore your progress later.",pr_loaded:"Progress loaded.",pr_bad:"This file isn't a Lernivo progress file.",pr_confirm:"Replace the progress on this device with the progress from this file?",pr_auto:"✓ Saved automatically on this device"});
Object.assign(L.fr,{tab_words:"Mots",words_title:"Vocabulaire",words_lead:"Des centaines de mots du quotidien classés par thème, avec l'anglais et l'arabe. Touchez le haut-parleur pour écouter, cochez les mots que vous connaissez ou entraînez-vous avec les cartes.",w_search:"Chercher en allemand, anglais ou arabe…",w_all:"Tous",w_learned:"appris",w_list:"Liste",w_cards:"Cartes",w_flip:"Touchez la carte pour voir le sens",w_know:"Je sais ✓",w_again:"Encore",w_done:"Bravo, vous avez vu toutes les cartes !",w_back:"Tous les thèmes",w_none:"Aucun mot trouvé.",w_mark:"Marquer comme appris",w_restart:"Recommencer",
g_lessons:"Leçons",g_ref:"Résumé",g_verbs:"Verbes",g_train:"Entraînement",ref_lead:"Toute la grammaire allemande, thème par thème : la règle, les tableaux et des exemples.",verbs_lead:"verbes importants à tous les temps avec ich, du, er/sie/es, wir, ihr, sie/Sie. Touchez un verbe pour voir toutes ses formes.",verbs_search:"Chercher un verbe en allemand, anglais ou arabe…",v_aux:"Parfait avec",v_sep:"séparable",v_refl:"pronominal",v_hear:"Écouter",
train_title:"Entraînement",train_lead:"Des exercices variés sur tous les thèmes de votre niveau : grammaire, articles, conjugaison, pluriels, ordre des mots, vocabulaire, écoute et orthographe. Chaque série est nouvelle.",train_start:"Commencer une série",train_best:"Meilleur",train_q:"Question",train_check:"Vérifier",train_next:"Suivant",train_done:"Série terminée !",train_again:"Nouvelle série",train_review:"À revoir",train_of:"sur",train_correct:"justes",
tq_gram:"Complétez",tq_art:"Quel article ?",tq_mean:"Que veut dire ce mot ?",tq_rev:"Comment dit-on en allemand ?",tq_conj:"Choisissez la bonne forme du verbe",tq_plural:"Quel est le pluriel ?",tq_order:"Mettez les mots dans le bon ordre",tq_type:"Écrivez en allemand",tq_hear:"Écoutez et choisissez le mot entendu",tq_order_hint:"Touchez les mots dans l'ordre. Touchez un mot choisi pour le retirer.",tq_type_ph:"Écrivez en allemand…",tq_article_tip:"N'oubliez pas l'article :",
sc_title:"Scènes",sc_lead:"Des scènes animées du quotidien : des personnes parlent allemand, vous lisez en même temps et pouvez afficher la traduction. Choisissez une scène de votre niveau.",sc_lines:"répliques",sc_seen:"vue",
pl_tr:"Traduction",pl_replay:"Revoir",pl_orig:"Vidéo d'origine",pl_practice:"Faire les exercices",pl_chat:"S'entraîner avec Lena",pl_turn:"À vous ! Dites-le à voix haute.",pl_rule:"La règle",pl_forms:"Les formes",pl_ex:"Exemple",pl_end:"Bravo !",pl_end_sub:"Entraînez-vous maintenant sur ce que vous avez entendu.",pl_nat:"voix naturelle",pl_dev:"voix de l'appareil",pl_lesson:"Leçon vidéo",pl_scene:"Scène",pl_close:"Fermer",pl_rec:"voix allemande enregistrée",pl_basic:"voix basique ⚠",pl_basic_tip:"Cet appareil n'a pas de voix allemande : une voix robotique de base est utilisée. Pour une prononciation correcte : ouvrez l'app dans Microsoft Edge ou Chrome, ou sous Windows ajoutez une voix allemande (Paramètres › Heure et langue › Voix › Ajouter des voix › Deutsch), ou ajoutez une clé Gemini gratuite pour la voix naturelle.",
pr_title:"Votre progression",pr_lead:"Tout ce que vous faites est enregistré automatiquement sur cet appareil. Enregistrez un fichier de sauvegarde pour le garder ou le transférer sur un autre téléphone.",pr_ex:"exercices faits",pr_words:"mots appris",pr_train:"meilleur entraînement",pr_scenes:"scènes vues",pr_lessons:"leçons vues",pr_save:"Enregistrer ma progression",pr_load:"Charger une progression",pr_saved:"Enregistré ! Gardez ce fichier pour retrouver votre progression plus tard.",pr_loaded:"Progression chargée.",pr_bad:"Ce fichier n'est pas une sauvegarde Lernivo.",pr_confirm:"Remplacer la progression de cet appareil par celle du fichier ?",pr_auto:"✓ Enregistré automatiquement sur cet appareil"});
Object.assign(L.ar,{tab_words:"الكلمات",words_title:"المفردات",words_lead:"مئات الكلمات اليومية مرتبة حسب الموضوع، مع الإنجليزية والعربية. المس السماعة لسماع الكلمة، وضع علامة على الكلمات التي تعرفها، أو تدرّب بالبطاقات.",w_search:"ابحث بالألمانية أو الإنجليزية أو العربية…",w_all:"الكل",w_learned:"تم تعلمها",w_list:"القائمة",w_cards:"البطاقات",w_flip:"المس البطاقة لرؤية المعنى",w_know:"أعرفها ✓",w_again:"مرة أخرى",w_done:"رائع، أنهيت كل البطاقات!",w_back:"كل المواضيع",w_none:"لم يتم العثور على كلمات.",w_mark:"تعليم كمحفوظة",w_restart:"ابدأ من جديد",
g_lessons:"الدروس",g_ref:"ملخص القواعد",g_verbs:"الأفعال",g_train:"التدريب",ref_lead:"قواعد اللغة الألمانية كاملة، موضوعاً بموضوع: القاعدة والجداول والأمثلة.",verbs_lead:"فعلاً مهماً بكل الأزمنة مع ich و du و er/sie/es و wir و ihr و sie/Sie. المس فعلاً لرؤية كل صيغه.",verbs_search:"ابحث عن فعل بالألمانية أو الإنجليزية أو العربية…",v_aux:"الماضي التام مع",v_sep:"منفصل",v_refl:"انعكاسي",v_hear:"استمع",
train_title:"التدريب",train_lead:"تمارين متنوعة من كل مواضيع مستواك: القواعد والأدوات وتصريف الأفعال والجمع وترتيب الكلمات والمفردات والاستماع والإملاء. كل جولة جديدة.",train_start:"ابدأ جولة",train_best:"الأفضل",train_q:"السؤال",train_check:"تحقق",train_next:"التالي",train_done:"انتهت الجولة!",train_again:"جولة جديدة",train_review:"للمراجعة",train_of:"من",train_correct:"صحيحة",
tq_gram:"أكمل الفراغ",tq_art:"ما الأداة الصحيحة؟",tq_mean:"ما معنى هذه الكلمة؟",tq_rev:"كيف تقولها بالألمانية؟",tq_conj:"اختر صيغة الفعل الصحيحة",tq_plural:"ما صيغة الجمع؟",tq_order:"رتّب الكلمات ترتيباً صحيحاً",tq_type:"اكتبها بالألمانية",tq_hear:"استمع واختر الكلمة التي سمعتها",tq_order_hint:"المس الكلمات بالترتيب. المس كلمة مختارة لإرجاعها.",tq_type_ph:"اكتب بالألمانية…",tq_article_tip:"لا تنسَ الأداة:",
sc_title:"مشاهد",sc_lead:"مشاهد متحركة من الحياة اليومية: أشخاص يتحدثون بالألمانية، تقرأ معهم ويمكنك إظهار الترجمة. اختر مشهداً يناسب مستواك.",sc_lines:"جمل",sc_seen:"تمت المشاهدة",
pl_tr:"الترجمة",pl_replay:"إعادة",pl_orig:"الفيديو الأصلي",pl_practice:"حلّ التمارين",pl_chat:"تدرّب على هذا مع لينا",pl_turn:"دورك! قلها بصوت عالٍ.",pl_rule:"القاعدة",pl_forms:"الصيغ",pl_ex:"مثال",pl_end:"أحسنت!",pl_end_sub:"تدرّب الآن على ما سمعته.",pl_nat:"صوت طبيعي",pl_dev:"صوت الجهاز",pl_lesson:"درس فيديو",pl_scene:"مشهد",pl_close:"إغلاق",pl_rec:"صوت ألماني مسجّل",pl_basic:"صوت بسيط ⚠",pl_basic_tip:"لا يوجد صوت ألماني على هذا الجهاز، لذا يُستخدم صوت آلي بسيط. للحصول على نطق ألماني صحيح: افتح التطبيق في Microsoft Edge أو Chrome، أو أضف صوتاً ألمانياً في Windows (الإعدادات › الوقت واللغة › الكلام › إضافة أصوات › Deutsch)، أو أضف مفتاح Gemini مجانياً للصوت الطبيعي.",
pr_title:"تقدّمك",pr_lead:"كل ما تنجزه يُحفظ تلقائياً على هذا الجهاز. احفظ ملفاً احتياطياً للحفاظ عليه أو لنقله إلى هاتف آخر.",pr_ex:"تمارين أُنجزت",pr_words:"كلمات تم تعلمها",pr_train:"أفضل نتيجة تدريب",pr_scenes:"مشاهد تمت مشاهدتها",pr_lessons:"دروس تمت مشاهدتها",pr_save:"حفظ ملف التقدم",pr_load:"تحميل ملف التقدم",pr_saved:"تم الحفظ! احتفظ بهذا الملف لاستعادة تقدمك لاحقاً.",pr_loaded:"تم تحميل التقدم.",pr_bad:"هذا الملف ليس ملف تقدم من Lernivo.",pr_confirm:"هل تريد استبدال التقدم على هذا الجهاز بالتقدم الموجود في الملف؟",pr_auto:"✓ يُحفظ تلقائياً على هذا الجهاز"});

/* ---------------- styles ---------------- */
const css=`
body[data-screen="words"] [data-screen="words"]{display:block}
body[data-screen="listen"]:not([data-lmode="scenes"]) #px-scenes{display:none!important}
body[data-lmode="scenes"] #videos{display:none!important}
.lseg{grid-template-columns:repeat(3,1fr)!important;max-width:560px}
.gseg{grid-template-columns:repeat(4,1fr);max-width:640px;margin-bottom:18px}
body[data-gmode]:not([data-gmode="lessons"]) #g-levels,body[data-gmode]:not([data-gmode="lessons"]) #g-topics,body[data-gmode]:not([data-gmode="lessons"]) #g-panel{display:none}
body[data-gmode="lessons"] #px-gx,body:not([data-gmode]) #px-gx{display:none}
.px-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.px-search{flex:1 1 260px;min-width:0;font:inherit;border:1.5px solid var(--line);border-radius:14px;padding:11px 14px;background:var(--surface);color:var(--ink)}
.px-search:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 4px var(--brand-soft)}
.px-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg,24px);box-shadow:var(--sh-2);padding:clamp(18px,3vw,32px)}
.px-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.px-theme{border:1px solid var(--line);background:var(--surface);border-radius:20px;padding:16px;text-align:start;display:grid;gap:6px;box-shadow:var(--sh-1);transition:transform .2s var(--ease),box-shadow .2s,border-color .2s}
.px-theme:hover{transform:translateY(-3px);box-shadow:var(--sh-2);border-color:var(--brand)}
.px-theme .ic{font-size:1.7rem;line-height:1}
.px-theme b{font-family:var(--f-display);font-weight:800;font-size:1.15rem;line-height:1.2}
.px-theme small{color:var(--muted)}
.px-meter{height:6px;border-radius:99px;background:var(--soft);overflow:hidden}.px-meter i{display:block;height:100%;border-radius:99px;background:var(--grad)}
.px-words{display:grid;gap:8px}
.wrow{display:grid;grid-template-columns:auto minmax(0,1.2fr) minmax(0,1.4fr) auto auto;gap:12px;align-items:center;padding:10px 12px;border:1px solid var(--line);border-radius:16px;background:var(--surface)}
.wrow.on{background:color-mix(in srgb,var(--das) 7%,var(--surface));border-color:color-mix(in srgb,var(--das) 35%,var(--line))}
.wde b{font-size:1.05rem}.wde small{display:block;color:var(--muted);font-size:.8rem}
.wtr{display:grid;gap:1px;font-size:.92rem}.wtr span:last-child{font-family:var(--f-ar);color:var(--muted)}
.wlv{font-family:var(--f-mono);font-size:.7rem;color:var(--muted);background:var(--soft);padding:2px 7px;border-radius:99px}
.wchk{width:34px;height:34px;border-radius:50%;border:1.5px solid var(--line);background:var(--surface);font-weight:800;color:var(--muted)}
.wchk[aria-pressed="true"]{background:var(--das);border-color:var(--das);color:#fff}
.art-tag{font-family:var(--f-mono);font-size:.78rem;font-weight:600;padding:2px 7px;border-radius:7px;color:#fff;margin-inline-end:6px}
.art-der{background:var(--der)}.art-die{background:var(--die)}.art-das{background:var(--das)}
.ac-der{color:var(--der);font-weight:800}.ac-die{color:var(--die);font-weight:800}.ac-das{color:var(--das);font-weight:800}
@media (max-width:640px){.wrow{grid-template-columns:auto minmax(0,1fr) auto;row-gap:4px}.wrow .wtr{grid-column:2/3}.wrow .wlv{display:none}.wrow .wchk{grid-row:1/3;grid-column:3}}
.flash{perspective:1200px;max-width:520px;margin:10px auto 0}
.fcard{position:relative;min-height:260px;border-radius:28px;cursor:pointer;transform-style:preserve-3d;transition:transform .6s var(--ease)}
.fcard.flip{transform:rotateY(180deg)}
.fface{position:absolute;inset:0;border-radius:28px;display:grid;place-items:center;align-content:center;gap:10px;padding:24px;text-align:center;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:var(--sh-2)}
.ffront{background:var(--grad-ink);color:#fff}.fback{background:var(--surface);border:1px solid var(--line);transform:rotateY(180deg)}
.ffront .w{font-family:var(--f-display);font-weight:800;font-size:clamp(2rem,6vw,2.8rem);line-height:1.1}
.fback .en{font-size:1.4rem;font-weight:700}.fback .ar{font-family:var(--f-ar);font-size:1.6rem}
.fbtns{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.px-split{display:grid;grid-template-columns:280px minmax(0,1fr);gap:18px;align-items:start}
@media (max-width:900px){.px-split{grid-template-columns:1fr}}
.px-list{display:grid;gap:6px;max-height:70vh;overflow:auto;padding-inline-end:4px}
@media (max-width:900px){.px-list{display:flex;overflow-x:auto;max-height:none;padding-bottom:6px;scrollbar-width:none}.px-list::-webkit-scrollbar{display:none}.px-list>*{flex:none}}
.px-item{border:1px solid transparent;background:transparent;border-radius:14px;padding:10px 12px;text-align:start;display:grid;gap:2px}
.px-item:hover{background:var(--soft)}
.px-item[aria-pressed="true"]{background:var(--surface);border-color:var(--brand);box-shadow:var(--sh-1)}
.px-item b{font-size:.95rem}.px-item small{color:var(--muted);font-size:.8rem}
@media (max-width:900px){.px-item{border-color:var(--line);background:var(--surface);max-width:240px}}
.px-panel{display:grid;gap:18px}
.px-panel h3{font-family:var(--f-display);font-weight:800;font-size:clamp(1.6rem,3vw,2.2rem);letter-spacing:-.02em}
.px-panel .lead{font-size:1.04rem;line-height:1.75;max-width:75ch}
.px-tables{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:14px}
.px-tables .tbl table td,.px-tables .tbl table th{white-space:normal}
.px-verbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px;max-height:46vh;overflow:auto;padding:2px}
.px-verb{border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:9px 12px;text-align:start;display:grid;gap:1px}
.px-verb b{font-size:.98rem}.px-verb small{color:var(--muted);font-size:.78rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.px-verb[aria-pressed="true"]{border-color:var(--brand);background:var(--brand-soft)}
.px-tense{border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--surface)}
.px-tense h4{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 14px;margin:0;background:var(--brand-soft);color:var(--ink);text-transform:none;letter-spacing:0;font-size:.9rem}
.px-tense h4 small{font-family:var(--f-body);color:var(--muted);font-weight:500}
.px-tense table{font-size:.95rem}.px-tense td{white-space:normal}.px-tense td:first-child{width:34%;color:var(--muted)}
.px-tenses{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:12px}
.px-vhead{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline}
.px-vhead h3{margin-inline-end:6px}
.px-badge{font-family:var(--f-mono);font-size:.72rem;padding:3px 9px;border-radius:99px;background:var(--soft);color:var(--muted)}
.px-q{display:grid;gap:16px}
.px-qhead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.px-qtype{font-family:var(--f-mono);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brand)}
.px-prompt{font-size:clamp(1.25rem,3vw,1.7rem);font-weight:700;line-height:1.4}
.px-prompt small{display:block;font-size:.95rem;font-weight:500;color:var(--muted);margin-top:4px}
.px-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:10px}
.px-opts .opt{min-height:52px;font-size:1.02rem}
.px-fb{border-radius:16px;padding:12px 14px;display:grid;gap:4px;animation:fadeUp .3s var(--ease) both}
.px-fb.ok{background:color-mix(in srgb,var(--ok) 12%,var(--surface));border:1px solid color-mix(in srgb,var(--ok) 40%,transparent)}
.px-fb.no{background:color-mix(in srgb,var(--bad) 10%,var(--surface));border:1px solid color-mix(in srgb,var(--bad) 35%,transparent)}
.px-build{min-height:56px;border:2px dashed var(--line);border-radius:16px;padding:8px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.px-bank{display:flex;flex-wrap:wrap;gap:8px}
.px-tok{border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:8px 12px;font-weight:700;font-size:1rem}
.px-tok:hover{border-color:var(--brand)}
.px-type{font:inherit;font-size:1.15rem;border:1.5px solid var(--line);border-radius:14px;padding:12px 14px;width:100%;background:var(--surface);color:var(--ink)}
.px-type:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 4px var(--brand-soft)}
.px-bigsay{width:84px;height:84px;border-radius:50%;border:0;background:var(--grad);color:var(--accent-ink);display:grid;place-items:center;margin:4px auto;box-shadow:0 18px 34px -16px var(--accent-2)}
.px-bigsay svg{width:34px;height:34px}
.px-score{font-family:var(--f-display);font-size:clamp(3rem,10vw,5rem);font-weight:600;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.px-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.px-stat{border:1px solid var(--line);border-radius:18px;padding:14px 16px;background:var(--surface);display:grid;gap:2px}
.px-stat b{font-family:var(--f-display);font-weight:800;font-size:1.9rem;line-height:1.1}
.px-stat small{color:var(--muted)}
.px-lvbars{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.px-lvbar{display:grid;gap:4px;font-family:var(--f-mono);font-size:.8rem}
.px-scenes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.px-scene{border:1px solid var(--line);background:var(--surface);border-radius:22px;overflow:hidden;text-align:start;display:grid;box-shadow:var(--sh-1);transition:transform .2s var(--ease),box-shadow .2s}
.px-scene:hover{transform:translateY(-4px);box-shadow:var(--sh-2)}
.px-scene .th{aspect-ratio:16/9;position:relative;overflow:hidden;background:var(--soft)}
.px-scene .th svg{position:absolute;inset:0;width:100%;height:100%}
.px-scene .meta{padding:12px 14px 16px;display:grid;gap:3px}
.px-scene .meta b{font-family:var(--f-display);font-weight:800;font-size:1.15rem}
.px-scene .meta small{color:var(--muted)}
.px-scene .seen{position:absolute;top:10px;inset-inline-end:10px;background:var(--das);color:#fff;font-size:.72rem;font-weight:700;padding:3px 8px;border-radius:99px}
.px-scene .lvt{position:absolute;top:10px;inset-inline-start:10px;background:rgba(0,0,0,.55);color:#fff;font-family:var(--f-mono);font-size:.72rem;padding:3px 8px;border-radius:99px}
/* player */
.stage-sheet{position:fixed;inset:0;z-index:60;background:color-mix(in srgb,#0C0714 88%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:grid;place-items:center;padding:calc(10px + var(--sat,0px)) 10px calc(10px + var(--sab,0px));animation:fadeUp .25s var(--ease) both}
.stage-sheet[hidden]{display:none}
.stage-box{width:min(1040px,100%);max-height:100%;display:grid;grid-template-rows:auto minmax(0,1fr) auto auto auto;background:#160F22;color:#fff;border-radius:28px;overflow:hidden;box-shadow:0 50px 100px -40px rgba(0,0,0,.8)}
.st-top{display:flex;align-items:center;gap:12px;padding:12px 16px}
.st-top .tt{display:grid;flex:1;min-width:0}
.st-top small{font-family:var(--f-mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#EDB56A}
.st-top b{font-family:var(--f-display);font-weight:800;font-size:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-voice{font-size:.72rem;color:#D9CCEA;border:1px solid rgba(255,255,255,.2);padding:3px 9px;border-radius:99px;white-space:nowrap}
.st-top .vclose{background:rgba(255,255,255,.12);color:#fff}
.st-view{position:relative;aspect-ratio:16/9;max-height:62dvh;overflow:hidden;background:#1E1530}
@media (max-width:640px){.st-view{aspect-ratio:4/5;max-height:58dvh}}
.st-sub{min-height:72px;padding:12px 18px;display:grid;gap:3px;align-content:center;text-align:center;background:#120B1C}
.st-sub .de{font-size:clamp(1.05rem,2.6vw,1.35rem);font-weight:700;line-height:1.35}
.st-sub .tr{font-size:.92rem;color:#D9CCEA}
.st-sub .tr[dir="rtl"]{font-family:var(--f-ar);font-size:1.02rem}
.st-bar{height:4px;background:rgba(255,255,255,.1)}.st-bar i{display:block;height:100%;width:0;background:var(--grad);transition:width .4s var(--ease)}
.st-ctrl{display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 14px 16px;flex-wrap:wrap}
.st-btn{width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;display:grid;place-items:center}
.st-btn svg{width:20px;height:20px}
.st-btn.big{width:58px;height:58px;background:var(--grad);border:0;color:#fff}
.st-btn.big svg{width:24px;height:24px}
.st-pill{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:99px;padding:8px 14px;font-weight:700;font-size:.85rem}
.st-pill[aria-pressed="true"]{background:#fff;color:#2E1F15}
/* karaoke words */
.kara.live .kw{opacity:.5;transition:opacity .18s ease,color .18s ease}
.kara.live .kw.on{opacity:1}
.kara.live .kw.now{color:#FFB38A;text-shadow:0 0 18px rgba(255,140,90,.45)}
.sc-bub .kara.live .kw.now{color:#E0592F;text-shadow:none}
.st-voice.warn{border-color:#F2B24C;color:#FFD08A;cursor:help}
/* lesson slides */
.ls{position:absolute;inset:0;display:grid;place-items:center;padding:clamp(18px,4vw,48px);text-align:center;background:radial-gradient(800px 400px at 80% 0%,rgba(242,97,63,.42),transparent 60%),radial-gradient(700px 400px at 0% 100%,rgba(142,75,255,.42),transparent 60%),#1E1530;animation:lsIn .6s var(--ease) both}
@keyframes lsIn{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:none}}
.ls .k{font-family:var(--f-mono);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:#EDB56A}
.ls h2{font-family:var(--f-display);font-weight:800;font-size:clamp(2rem,6vw,3.8rem);line-height:1.05;letter-spacing:-.02em;margin:10px 0}
.ls .sub{font-size:clamp(1rem,2.4vw,1.3rem);color:#EFE6FA}
.ls .bars{display:flex;gap:6px;justify-content:center;margin-top:18px}.ls .bars i{width:10px;height:34px;border-radius:5px;animation:barUp .8s var(--ease) both}
.ls .bars i:nth-child(2){animation-delay:.1s}.ls .bars i:nth-child(3){animation-delay:.2s}
@keyframes barUp{from{transform:scaleY(0)}to{transform:none}}
.ls .rule{max-width:780px;font-size:clamp(1.05rem,2.5vw,1.45rem);line-height:1.6;text-align:start}
.ls .rule span{opacity:0;animation:fadeUp .5s var(--ease) both}
.ls table{border-collapse:separate;border-spacing:0;font-size:clamp(.85rem,2.2vw,1.15rem);background:rgba(255,255,255,.05);border-radius:16px;overflow:hidden;max-width:100%}
.ls th,.ls td{padding:clamp(6px,1.2vw,10px) clamp(8px,1.6vw,16px);border-bottom:1px solid rgba(255,255,255,.08);color:#fff;text-align:start;white-space:nowrap}
.ls th{background:rgba(255,255,255,.1);font-family:var(--f-mono);font-size:.75em;letter-spacing:.06em;text-transform:uppercase;color:#D9CCEA}
.ls td:first-child{color:#EDB56A}
.ls tr.hi td{background:rgba(255,180,60,.22)}
.ls tr.dim td{opacity:.45}
.ls .ex{font-family:var(--f-display);font-weight:800;font-size:clamp(1.7rem,5vw,3.1rem);line-height:1.2;max-width:900px}
.ls .ex .ac-der{color:#7FB7D1}.ls .ex .ac-die{color:#EE8B6B}.ls .ex .ac-das{color:#A9BB6A}
.ls .ext{margin-top:12px;font-size:clamp(1rem,2.4vw,1.3rem);color:#EFE6FA}
.ls .turn{margin-top:22px;display:inline-flex;gap:8px;align-items:center;background:var(--grad);color:#fff;font-weight:800;border-radius:99px;padding:10px 18px;animation:pop .5s var(--ease) both}
.ls .end{display:grid;gap:14px;justify-items:center}
.ls .end .btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.ls .end .btn{color:#fff;border-color:rgba(255,255,255,.4)}.ls .end .btn.primary{color:#2E1F15}
.ls .ic{font-size:2.6rem}
.ls .tk{display:inline-block;width:10px;height:10px;border-radius:50%;background:#EDB56A;margin-inline-end:8px;animation:ring 1.2s ease-out infinite}
/* scene stage */
.sc-bg{position:absolute;inset:0;width:100%;height:100%}
.sc-char{position:absolute;bottom:-2%;width:min(34%,280px);transition:transform .4s var(--ease),filter .3s}
.sc-char.a{left:8%}.sc-char.b{right:8%}
.sc-char svg{width:100%;height:auto;display:block;overflow:visible}
.sc-char.talk{animation:bob .5s ease-in-out infinite alternate}
.sc-char.quiet{filter:saturate(.85) brightness(.92)}
@keyframes bob{from{transform:translateY(0)}to{transform:translateY(-1.5%)}}
.sc-char .mo{transform-box:fill-box;transform-origin:center;transform:scaleY(.35)}
.sc-char.talk .mo{animation:talk .18s ease-in-out infinite alternate}
@keyframes talk{from{transform:scaleY(.25)}to{transform:scaleY(1.1)}}
.sc-char .eye{transform-box:fill-box;transform-origin:center;animation:blink 4.2s infinite}
.sc-char.b .eye{animation-delay:1.7s}
@keyframes blink{0%,94%,100%{transform:none}97%{transform:scaleY(.1)}}
.sc-name{position:absolute;bottom:4%;background:rgba(22,15,34,.82);color:#fff;font-weight:700;font-size:.8rem;padding:4px 10px;border-radius:99px}
.sc-name.a{left:10%}.sc-name.b{right:10%}
.sc-bub{position:absolute;top:6%;max-width:min(56%,520px);background:#fff;color:#2E1F15;border-radius:22px;padding:12px 16px;font-weight:700;font-size:clamp(.95rem,2.2vw,1.2rem);line-height:1.4;box-shadow:0 18px 40px -18px rgba(0,0,0,.6);animation:pop .35s var(--ease) both}
.sc-bub.a{left:6%;border-bottom-left-radius:6px}.sc-bub.b{right:6%;border-bottom-right-radius:6px}
.sc-bub small{display:block;font-weight:600;color:#8E4BFF;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:2px}
@media (max-width:640px){.sc-char{width:44%}.sc-char.a{left:2%}.sc-char.b{right:2%}.sc-bub{max-width:88%;left:6%!important;right:6%!important}}
.sc-title{position:absolute;inset:0;display:grid;place-items:center;background:rgba(22,15,34,.6);text-align:center;color:#fff;animation:fadeUp .4s var(--ease) both}
.sc-title h2{font-family:var(--f-display);font-weight:800;font-size:clamp(1.8rem,5vw,3rem)}
.sc-title .k{font-family:var(--f-mono);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:#EDB56A}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------------- DOM: new screens and buttons ---------------- */
const ICON_WORDS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="13" height="16" rx="2"/><path d="M8 4v16"/><path d="M19 7v13"/><path d="M11 9h3M11 13h3"/></svg>';
const PLAYI='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const PAUSEI='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
const PREVI='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg>';
const NEXTI='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>';
const $$=s=>document.querySelector(s);

const gBtn=$$('#tabbar [data-go="grammar"]');
if(gBtn)gBtn.insertAdjacentHTML("afterend",`<button data-go="words">${ICON_WORDS}<span data-i18n="tab_words"></span></button>`);
SCREENS.push("words");TITLE.words="tab_words";

const main=document.getElementById("top");
main.insertAdjacentHTML("beforeend",`<section id="words" class="sec" data-screen="words"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Wortschatz</p><h2 data-i18n="words_title"></h2><p data-i18n="words_lead"></p></div>
  <div id="px-words"></div></div></section>`);
document.getElementById("levels").insertAdjacentHTML("afterend",`<section id="px-progress" class="sec" data-screen="home"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Fortschritt</p><h2 data-i18n="pr_title"></h2><p data-i18n="pr_lead"></p></div>
  <div id="px-prog"></div></div></section>`);
document.getElementById("listen").insertAdjacentHTML("beforebegin",`<section id="px-scenes" class="sec" data-screen="listen"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Szenen</p><h2 data-i18n="sc_title"></h2><p data-i18n="sc_lead"></p></div>
  <div class="lvl-tabs" id="px-sclv"></div><div class="px-scenes" id="px-sclist"></div></div></section>`);
const lseg=$$(".lseg");if(lseg){const ex=lseg.querySelector('[data-lmode="ex"]');ex.insertAdjacentHTML("beforebegin",`<button type="button" data-lmode="scenes" data-i18n="sc_title"></button>`)}
const gwrap=document.querySelector("#grammar .wrap");
gwrap.querySelector(".sec-head").insertAdjacentHTML("afterend",`<div class="seg gseg" id="px-gseg"><button type="button" data-gmode="lessons" data-i18n="g_lessons"></button><button type="button" data-gmode="ref" data-i18n="g_ref"></button><button type="button" data-gmode="verbs" data-i18n="g_verbs"></button><button type="button" data-gmode="train" data-i18n="g_train"></button></div>`);
gwrap.insertAdjacentHTML("beforeend",`<div id="px-gx"></div>`);
document.body.insertAdjacentHTML("beforeend",`<div class="stage-sheet" id="px-stage" hidden><div class="stage-box" role="dialog" aria-modal="true" aria-labelledby="px-st-name">
  <div class="st-top"><div class="tt"><small id="px-st-k"></small><b id="px-st-name"></b></div><span class="st-voice" id="px-st-voice"></span><button class="vclose" id="px-st-close" aria-label="Close">×</button></div>
  <div class="st-view" id="px-st-view"></div>
  <div class="st-sub" id="px-st-sub" aria-live="polite"></div>
  <div class="st-bar"><i id="px-st-prog"></i></div>
  <div class="st-ctrl"><button class="st-btn" id="px-st-prev" aria-label="Previous">${PREVI}</button><button class="st-btn big" id="px-st-play" aria-label="Pause">${PAUSEI}</button><button class="st-btn" id="px-st-next" aria-label="Next">${NEXTI}</button><button class="st-pill" id="px-st-tr" aria-pressed="true" data-i18n="pl_tr"></button><button class="st-pill" id="px-st-orig" data-i18n="pl_orig" hidden></button></div>
</div></div>`);

/* ---------------- saved state ---------------- */
const P={learned:store.get("learned",{}),trainBest:store.get("trainBest",{}),scenesSeen:store.get("scenesSeen",{}),lessonsSeen:store.get("lessonsSeen",{}),gmode:store.get("gmode","lessons"),stTr:store.get("stTr",true)};
const save=k=>store.set(k,P[k]);
const W={theme:null,lv:"all",q:"",mode:"list",deck:[],di:0,flip:false};
const R={id:GREF[0].id};
const V={q:"",lv:"all",sel:"sein"};
let TQ=null;   /* training session */
let SCLV=null; /* scene level filter: null = current level */
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}

/* ---------------- Vocabulary ---------------- */
const wkey=w=>w.th+":"+w.de;
function wordFilter(list){
  const q=W.q.trim().toLowerCase();
  return list.filter(w=>(W.lv==="all"||w.lv===W.lv)&&(!q||(w.de+" "+w.art+" "+w.pl+" "+w.en+" "+w.ar).toLowerCase().includes(q)));
}
function wordRow(w){
  const k=wkey(w),on=!!P.learned[k];
  return `<div class="wrow${on?" on":""}"><button class="say sm" data-say="${esc(artWord(w))}" aria-label="${esc(t("listen"))}">${SPK}</button>
  <div class="wde" lang="de" dir="ltr">${w.art?`<span class="art-tag art-${w.art}">${w.art}</span>`:""}<b>${esc(w.de)}</b>${w.pl?`<small>Pl.: die ${esc(w.pl)}</small>`:""}</div>
  <div class="wtr"><span dir="ltr">${esc(w.en)}</span><span dir="rtl" lang="ar">${esc(w.ar)}</span></div>
  <span class="wlv">${w.lv}</span><button class="wchk" data-learn="${esc(k)}" aria-pressed="${on}" aria-label="${esc(t("w_mark"))}">✓</button></div>`;
}
function lvFilterChips(attr,cur){return [["all",t("w_all")],...LEVELS.map(l=>[l.id,l.id])].map(([id,lab])=>`<button class="chip" ${attr}="${id}" aria-pressed="${cur===id}">${esc(lab)}</button>`).join("")}
function renderWords(){
  const box=document.getElementById("px-words");if(!box)return;
  const head=`<div class="px-row"><input class="px-search" id="px-wq" type="search" value="${esc(W.q)}" placeholder="${esc(t("w_search"))}" autocomplete="off"></div>
    <div class="px-row"><div class="lvl-tabs" style="margin:0">${lvFilterChips("data-wlv",W.lv)}</div></div>`;
  let body="";
  if(W.q.trim()){
    const res=wordFilter(ALLWORDS).slice(0,150);
    body=res.length?`<div class="px-words">${res.map(wordRow).join("")}</div>`:`<p class="hq">${esc(t("w_none"))}</p>`;
  }else if(!W.theme){
    body=`<div class="px-grid">${VOCAB.map(th=>{const items=th.items.filter(w=>W.lv==="all"||w.lv===W.lv);const done=items.filter(w=>P.learned[wkey(w)]).length;
      return `<button class="px-theme" data-pxtheme="${th.id}"><span class="ic">${th.icon}</span><b lang="de">${esc(th.de)}</b><small>${esc(tr(th))} · ${items.length}</small><span class="px-meter"><i style="width:${items.length?Math.round(100*done/items.length):0}%"></i></span><small>${done} ${esc(t("w_learned"))}</small></button>`}).join("")}</div>`;
  }else{
    const th=VOCAB.find(x=>x.id===W.theme);const items=wordFilter(th.items);
    body=`<div class="px-row"><button class="tiny" data-pxtheme="">← ${esc(t("w_back"))}</button><h3 style="font-family:var(--f-display);font-weight:800;font-size:1.5rem;margin-inline-end:auto">${th.icon} <span lang="de">${esc(th.de)}</span></h3>
      <div class="seg seg2" style="min-width:220px"><button type="button" data-wmode="list" aria-pressed="${W.mode==="list"}">${esc(t("w_list"))}</button><button type="button" data-wmode="cards" aria-pressed="${W.mode==="cards"}">${esc(t("w_cards"))}</button></div></div>`;
    if(W.mode==="list")body+=items.length?`<div class="px-words">${items.map(wordRow).join("")}</div>`:`<p class="hq">${esc(t("w_none"))}</p>`;
    else body+=renderCards(items);
  }
  box.innerHTML=head+body;
}
function renderCards(items){
  if(!W.deck.length||W.deckFor!==W.theme+W.lv){W.deck=shuffle(items.filter(w=>!P.learned[wkey(w)])).concat(shuffle(items.filter(w=>P.learned[wkey(w)])));W.di=0;W.flip=false;W.deckFor=W.theme+W.lv}
  if(W.di>=W.deck.length)return `<div class="px-card" style="text-align:center;display:grid;gap:12px;justify-items:center"><div style="font-size:3rem">🎉</div><b style="font-size:1.2rem">${esc(t("w_done"))}</b><button class="btn primary" data-wcard="restart">${esc(t("w_restart"))}</button></div>`;
  const w=W.deck[W.di];
  return `<div class="flash"><p class="hq" style="text-align:center;margin-bottom:8px">${W.di+1} / ${W.deck.length} · ${esc(t("w_flip"))}</p>
   <div class="fcard${W.flip?" flip":""}" data-wcard="flip" role="button" tabindex="0">
    <div class="fface ffront"><span class="w" lang="de">${w.art?`<span style="opacity:.75">${w.art}</span> `:""}${esc(w.de)}</span><button class="say" data-say="${esc(artWord(w))}" aria-label="${esc(t("listen"))}" style="background:rgba(255,255,255,.15);color:#fff;border-color:transparent">${SPK}</button></div>
    <div class="fface fback"><span class="en">${esc(w.en)}</span><span class="ar" dir="rtl" lang="ar">${esc(w.ar)}</span>${w.pl?`<small class="hq" lang="de">Plural: die ${esc(w.pl)}</small>`:""}</div>
   </div>
   <div class="fbtns"><button class="btn" data-wcard="again">↺ ${esc(t("w_again"))}</button><button class="btn primary" data-wcard="know">${esc(t("w_know"))}</button></div></div>`;
}

/* ---------------- Grammar: overview ---------------- */
function tableHTML(rows){return `<div class="tbl"><table><thead><tr>${rows[0].map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td lang="de">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function renderRef(box){
  const s=GREF.find(x=>x.id===R.id)||GREF[0];
  box.innerHTML=`<p class="hq" style="margin-bottom:14px">${esc(t("ref_lead"))}</p><div class="px-split">
   <div class="px-list">${GREF.map(x=>`<button class="px-item" data-ref="${x.id}" aria-pressed="${x.id===s.id}"><b lang="de">${esc(x.de)}</b><small>${esc(tr(x.t))} · ${x.lv}</small></button>`).join("")}</div>
   <div class="px-card px-panel swap" id="px-refp"><div><p class="eyebrow">${s.lv}</p><h3 lang="de">${esc(s.de)}</h3><p class="hq">${esc(tr(s.t))}</p></div>
    <p class="lead">${esc(tr(s.s))}</p><div class="px-tables">${s.tables.map(tableHTML).join("")}</div>
    <div><h4 style="margin-bottom:10px">${esc(t("examples"))}</h4><ul class="exs">${s.ex.map(e=>`<li><button class="say sm" data-say="${esc(e)}" aria-label="${esc(t("listen"))}">${SPK}</button><div class="de" lang="de" dir="ltr">${ARTC(e)}</div></li>`).join("")}</ul></div></div></div>`;
}
/* ---------------- Grammar: verbs ---------------- */
function renderVerbs(box){
  const q=V.q.trim().toLowerCase();
  const list=VERBS.filter(v=>(V.lv==="all"||v.lv===V.lv)&&(!q||(v.inf.replace("~","")+" "+v.en+" "+v.ar).toLowerCase().includes(q)));
  const v=VERBS.find(x=>x.inf===V.sel)||VERBS[0];const c=conjugate(v);
  const sep=v.inf.includes("~"),refl=v.inf.startsWith("sich ");
  box.innerHTML=`<p class="hq" style="margin-bottom:12px">${VERBS.length} ${esc(t("verbs_lead"))}</p>
   <div class="px-row"><input class="px-search" id="px-vq" type="search" value="${esc(V.q)}" placeholder="${esc(t("verbs_search"))}" autocomplete="off"><div class="lvl-tabs" style="margin:0">${lvFilterChips("data-vlv",V.lv)}</div></div>
   <div class="px-verbs" id="px-vlist">${list.map(x=>`<button class="px-verb" data-verb="${esc(x.inf)}" aria-pressed="${x.inf===v.inf}"><b lang="de">${esc(x.inf.replace("~",""))}</b><small>${esc(state.lang==="ar"?x.ar:x.en)}</small></button>`).join("")||`<p class="hq">${esc(t("w_none"))}</p>`}</div>
   <div class="px-card px-panel swap" style="margin-top:16px" id="px-vpanel">
    <div class="px-vhead"><h3 lang="de">${esc(c.inf)}</h3><button class="say" data-say="${esc(c.inf)}" aria-label="${esc(t("listen"))}">${SPK}</button><span class="px-badge">${v.lv}</span>${sep?`<span class="px-badge">${esc(t("v_sep"))}</span>`:""}${refl?`<span class="px-badge">${esc(t("v_refl"))}</span>`:""}</div>
    <p style="display:flex;gap:16px;flex-wrap:wrap"><span>${esc(v.en)}</span><span dir="rtl" lang="ar" style="font-family:var(--f-ar)">${esc(v.ar)}</span></p>
    <p class="hq">Partizip II: <b lang="de" style="color:var(--ink)">${esc(c.pp)}</b> · ${esc(t("v_aux"))} <b lang="de" style="color:var(--ink)">${c.aux}</b></p>
    <div class="px-tenses">${TENSES.map(T=>`<div class="px-tense"><h4><span lang="de">${T.de} <small>· ${esc(tr(T))}</small></span><button class="say sm" data-say="${esc(c.t[T.id].map((f,i)=>PRON[i].split("/")[0]+" "+f).join(". "))}" aria-label="${esc(t("v_hear"))}">${SPK}</button></h4><table><tbody>${c.t[T.id].map((f,i)=>`<tr><td lang="de">${PRON[i]}</td><td lang="de"><b>${esc(f)}</b></td></tr>`).join("")}</tbody></table></div>`).join("")}</div>
   </div>`;
}

/* ---------------- Grammar: training ---------------- */
const TENSE_BY_LV={A1:["praes"],A2:["praes","praes","perf"],B1:["praes","perf","praet","fut"],B2:["praet","perf","plusq","k2","fut"]};
function normDe(s){return String(s).toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[.!?,;:"„“]/g,"").replace(/\s+/g," ").trim()}
function makeQ(type,L){
  const li=lvIdx(L);
  const words=ALLWORDS.filter(w=>lvIdx(w.lv)<=li&&!/[…?!]/.test(w.de)&&w.de.length<28);
  const nouns=words.filter(w=>w.art);
  const sameTheme=(w,pool)=>{const s=pool.filter(x=>x.th===w.th&&x!==w);return s.length>=3?s:pool.filter(x=>x!==w)};
  if(type==="gram"){
    const qs=G.filter(g=>g.level===L).flatMap(g=>g.q.filter(q=>q.p&&q.p.includes("___")).map(q=>({q,g})));if(!qs.length)return null;
    const {q,g}=pick(qs);const full=q.p.replace("___",q.o[q.a]);
    return {type,title:t("tq_gram"),prompt:`<span lang="de" dir="ltr">${esc(q.p).replace("___",'<span class="blank">___</span>')}</span><small lang="de">${esc(g.de)}</small>`,opts:q.o,ans:q.a,explain:`<b lang="de">${esc(full)}</b>`,say:full};
  }
  if(type==="art"){
    const w=pick(nouns);const opts=["der","die","das"];
    return {type,title:t("tq_art"),prompt:`<span lang="de" dir="ltr"><span class="blank">___</span> ${esc(w.de)}</span><small>${esc(gloss(w))}</small>`,opts,ans:opts.indexOf(w.art),explain:`<b lang="de"><span class="art-tag art-${w.art}">${w.art}</span>${esc(w.de)}</b>${w.pl?` <span class="hq">· Pl.: die ${esc(w.pl)}</span>`:""}`,say:artWord(w)};
  }
  if(type==="mean"||type==="rev"||type==="hear"){
    const w=pick(type==="hear"?words.filter(x=>x.de.split(" ").length<=2):words);const others=shuffle(sameTheme(w,words)).filter(x=>x.de!==w.de&&gloss(x)!==gloss(w)).slice(0,3);
    const all=shuffle([w,...others]);const ans=all.indexOf(w);
    if(type==="mean")return {type,title:t("tq_mean"),prompt:`<span lang="de" dir="ltr">${esc(artWord(w))}</span> <button class="say sm" data-say="${esc(artWord(w))}">${SPK}</button>`,opts:all.map(gloss),ans,explain:`<b lang="de">${esc(artWord(w))}</b> = ${esc(w.en)} · <span dir="rtl" lang="ar">${esc(w.ar)}</span>`,say:artWord(w)};
    if(type==="rev")return {type,title:t("tq_rev"),prompt:`${esc(gloss(w))}${state.lang!=="ar"?`<small dir="rtl" lang="ar">${esc(w.ar)}</small>`:`<small>${esc(w.en)}</small>`}`,opts:all.map(artWord),ans,explain:`<b lang="de">${esc(artWord(w))}</b>`,say:artWord(w)};
    return {type,title:t("tq_hear"),prompt:`<button class="px-bigsay" data-say="${esc(artWord(w))}" aria-label="${esc(t("listen"))}">${SPK}</button>`,opts:all.map(artWord),ans,explain:`<b lang="de">${esc(artWord(w))}</b> = ${esc(gloss(w))}`,say:artWord(w),auto:artWord(w)};
  }
  if(type==="conj"){
    const vs=VERBS.filter(v=>lvIdx(v.lv)<=li);const v=pick(vs);const tense=pick(TENSE_BY_LV[L]);const c=conjugate(v);const forms=c.t[tense];const p=Math.floor(Math.random()*6);
    const pool=uniq([...forms,...c.t[tense==="praes"?"praet":"praes"]]).filter(f=>f!==forms[p]);
    const opts=shuffle([forms[p],...shuffle(pool).slice(0,3)]);const T=TENSES.find(x=>x.id===tense);
    return {type,title:t("tq_conj"),prompt:`<span lang="de" dir="ltr">${PRON[p]} <span class="blank">___</span></span><small><span lang="de">${esc(c.inf)}</span> · ${T.de} (${esc(tr(T))})</small>`,opts,ans:opts.indexOf(forms[p]),explain:`<b lang="de">${PRON[p]} ${esc(forms[p])}</b> <span class="hq">· ${esc(v.en)}</span>`,say:PRON[p].split("/")[0]+" "+forms[p]};
  }
  if(type==="plural"){
    const ns=nouns.filter(w=>w.pl&&w.pl!==w.de);if(!ns.length)return null;const w=pick(ns);
    const uml=s=>s.replace(/([aou])(?!.*[aou])/,m=>({a:"ä",o:"ö",u:"ü"}[m]));
    const cand=uniq([w.de+"e",w.de+"en",w.de+"n",w.de+"s",w.de+"er",uml(w.de)+"e",uml(w.de)+"er",uml(w.de),w.de]).filter(x=>x!==w.pl);
    const opts=shuffle([w.pl,...shuffle(cand).slice(0,3)]);
    return {type,title:t("tq_plural"),prompt:`<span lang="de" dir="ltr">${w.art} ${esc(w.de)} → die <span class="blank">___</span></span><small>${esc(gloss(w))}</small>`,opts,ans:opts.indexOf(w.pl),explain:`<b lang="de">${w.art} ${esc(w.de)} → die ${esc(w.pl)}</b>`,say:"die "+w.pl};
  }
  if(type==="order"){
    const exs=G.filter(g=>lvIdx(g.level)<=li&&lvIdx(g.level)>=li-1).flatMap(g=>g.ex).filter(e=>{const n=e.de.split(" ").length;return n>=4&&n<=10});if(!exs.length)return null;
    const e=pick(exs);const toks=e.de.split(" ");let sh=shuffle(toks);let n=0;while(sh.join(" ")===toks.join(" ")&&n++<5)sh=shuffle(toks);
    return {type,title:t("tq_order"),prompt:`${esc(e[state.lang]||e.en)}<small>${esc(t("tq_order_hint"))}</small>`,tokens:sh,ans:e.de,explain:`<b lang="de">${esc(e.de)}</b>`,say:e.de};
  }
  if(type==="type"){
    const w=pick(words.filter(x=>x.de.split(" ").length<=2&&x.de.length<=14));
    return {type,title:t("tq_type"),prompt:`${esc(gloss(w))}${state.lang!=="ar"?`<small dir="rtl" lang="ar">${esc(w.ar)}</small>`:`<small>${esc(w.en)}</small>`}`,input:true,ans:artWord(w),word:w,explain:`<b lang="de">${esc(artWord(w))}</b>`,say:artWord(w)};
  }
  return null;
}
function newRound(){
  const L=state.level;const li=lvIdx(L);
  const plan=shuffle(["gram","gram","gram","art","art","mean","rev","conj","conj","plural","order","order","type","hear"].concat(li>=2?["conj","gram"]:["art","mean"])).slice(0,12);
  const qs=[];for(const ty of plan){let q=null,n=0;while(!q&&n++<6){q=makeQ(ty,L);if(q&&qs.some(x=>x.explain===q.explain))q=null}if(q)qs.push(q)}
  TQ={L,qs,i:0,score:0,done:false,picked:null,build:[],typed:"",miss:[]};
}
function renderTrain(box){
  if(!TQ||TQ.L!==state.level&&!TQ.qs.length){TQ=null}
  if(!TQ){
    box.innerHTML=`<div class="px-card" style="display:grid;gap:16px"><div><p class="eyebrow">${state.level}</p><h3 style="font-family:var(--f-display);font-weight:800;font-size:clamp(1.7rem,3vw,2.3rem);margin-top:6px">${esc(t("train_title"))}</h3></div>
      <p class="lead" style="max-width:70ch">${esc(t("train_lead"))}</p>
      <div class="lvl-tabs" style="margin:0">${lvlChips()}</div>
      <div class="px-lvbars">${LEVELS.map(l=>`<div class="px-lvbar"><span>${l.id} · ${esc(t("train_best"))}: ${P.trainBest[l.id]!=null?P.trainBest[l.id]+"/12":"–"}</span><span class="px-meter"><i style="width:${Math.round(100*(P.trainBest[l.id]||0)/12)}%"></i></span></div>`).join("")}</div>
      <div><button class="btn primary" data-tq="start">${esc(t("train_start"))} · ${state.level}</button></div></div>`;
    return;
  }
  if(TQ.done){
    const n=TQ.qs.length;
    box.innerHTML=`<div class="px-card" style="display:grid;gap:16px;text-align:center;justify-items:center"><p class="eyebrow">${TQ.L}</p><h3 style="font-family:var(--f-display);font-weight:800;font-size:1.8rem">${esc(t("train_done"))}</h3>
      <div class="px-score">${TQ.score}/${n}</div><p class="hq">${TQ.score} ${esc(t("train_of"))} ${n} ${esc(t("train_correct"))} · ${esc(t("train_best"))}: ${P.trainBest[TQ.L]}/12</p>
      ${TQ.miss.length?`<div style="text-align:start;width:100%;max-width:640px"><h4 style="margin-bottom:8px">${esc(t("train_review"))}</h4><ul class="exs">${TQ.miss.map(m=>`<li><button class="say sm" data-say="${esc(m.say||"")}">${SPK}</button><div>${m.explain}</div></li>`).join("")}</ul></div>`:""}
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn primary" data-tq="start">${esc(t("train_again"))}</button><button class="btn" data-tq="home">${esc(t("train_title"))}</button></div></div>`;
    return;
  }
  const q=TQ.qs[TQ.i];const answered=TQ.picked!==null;
  let body="";
  if(q.opts){
    body=`<div class="px-opts" lang="de" dir="ltr">${q.opts.map((o,i)=>{let c="opt";if(answered&&i===q.ans)c+=" right";if(answered&&i===TQ.picked&&i!==q.ans)c+=" wrongpick";return `<button class="${c}" data-tqo="${i}" ${answered?"disabled":""}>${esc(o)}</button>`}).join("")}</div>`;
  }else if(q.tokens){
    const used=TQ.build;
    body=`<div class="px-build" lang="de" dir="ltr">${used.map((ti,k)=>`<button class="px-tok" data-tqb="${k}" ${answered?"disabled":""}>${esc(q.tokens[ti])}</button>`).join("")}</div>
      <div class="px-bank" lang="de" dir="ltr">${q.tokens.map((tk,ti)=>used.includes(ti)?"":`<button class="px-tok" data-tqt="${ti}" ${answered?"disabled":""}>${esc(tk)}</button>`).join("")}</div>
      ${answered?"":`<div><button class="btn primary" data-tq="check" ${used.length===q.tokens.length?"":"disabled"}>${esc(t("train_check"))}</button></div>`}`;
  }else{
    body=`<input class="px-type" id="px-ty" lang="de" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t("tq_type_ph"))}" value="${esc(TQ.typed)}" ${answered?"disabled":""}>
      ${answered?"":`<div><button class="btn primary" data-tq="check">${esc(t("train_check"))}</button></div>`}`;
  }
  const fb=answered?`<div class="px-fb ${TQ.ok?"ok":"no"}"><b>${TQ.ok?"✓ "+esc(t("correct")):esc(t("wrong"))}</b><div>${q.explain}${TQ.tip?`<div class="hq">${TQ.tip}</div>`:""}</div></div><div style="display:flex;justify-content:flex-end"><button class="nextbtn" data-tq="next"><span>${esc(t("train_next"))}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>`:"";
  box.innerHTML=`<div class="px-card px-q swap"><div class="px-qhead"><span class="px-qtype">${esc(q.title)}</span><span class="score">${t("train_q")} ${TQ.i+1}/${TQ.qs.length} · ✓ ${TQ.score}</span></div>
    <div class="qbar"><i style="width:${Math.round(100*TQ.i/TQ.qs.length)}%"></i></div>
    <div class="px-prompt">${q.prompt}</div>${body}${fb}</div>`;
  if(q.auto&&!answered&&!q.played){q.played=true;setTimeout(()=>TTS.speak(q.auto),250)}
  const ty=document.getElementById("px-ty");if(ty&&!answered){ty.focus();ty.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();TQ.typed=ty.value;answerTyped()}});ty.addEventListener("input",()=>{TQ.typed=ty.value})}
}
function finishAnswer(ok){
  const q=TQ.qs[TQ.i];TQ.ok=ok;if(ok)TQ.score++;else TQ.miss.push(q);
  if(q.say)setTimeout(()=>TTS.speak(q.say),150);
  renderGX();
}
function answerTyped(){
  const q=TQ.qs[TQ.i];const v=normDe(TQ.typed);if(!v)return;
  const w=q.word;const full=normDe(artWord(w)),bare=normDe(w.de);
  let ok=v===full||(!w.art&&v===bare);TQ.tip="";
  if(!ok&&w.art&&v===bare){ok=true;TQ.tip=`${esc(t("tq_article_tip"))} <b lang="de">${w.art} ${esc(w.de)}</b>`}
  TQ.picked=-1;finishAnswer(ok);
}

/* ---------------- grammar mode switch ---------------- */
function renderGX(){
  document.body.dataset.gmode=P.gmode;
  document.querySelectorAll("button[data-gmode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.gmode===P.gmode)));
  const box=document.getElementById("px-gx");if(!box)return;
  if(P.gmode==="ref")renderRef(box);else if(P.gmode==="verbs")renderVerbs(box);else if(P.gmode==="train")renderTrain(box);else box.innerHTML="";
}

/* ---------------- Progress ---------------- */
function renderProgress(){
  const box=document.getElementById("px-prog");if(!box)return;
  const answered=Object.values(state.answers||{}).reduce((n,a)=>n+Object.keys(a).length,0);
  const learned=Object.keys(P.learned).length;const best=Math.max(0,...Object.values(P.trainBest));
  box.innerHTML=`<div class="px-card" style="display:grid;gap:18px">
    <div class="px-stats">
      <div class="px-stat"><b>${answered}</b><small>${esc(t("pr_ex"))}</small></div>
      <div class="px-stat"><b>${learned}</b><small>${esc(t("pr_words"))} / ${ALLWORDS.length}</small></div>
      <div class="px-stat"><b>${best}/12</b><small>${esc(t("pr_train"))}</small></div>
      <div class="px-stat"><b>${Object.keys(P.lessonsSeen).length}</b><small>${esc(t("pr_lessons"))} / ${G.length}</small></div>
      <div class="px-stat"><b>${Object.keys(P.scenesSeen).length}</b><small>${esc(t("pr_scenes"))} / ${SCENES.length}</small></div>
    </div>
    <div class="px-lvbars">${LEVELS.map(l=>`<div class="px-lvbar"><span>${l.id} · ${levelPct(l.id)}%</span><span class="px-meter"><i style="width:${levelPct(l.id)}%"></i></span></div>`).join("")}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn primary" data-pr="save">⬇ ${esc(t("pr_save"))}</button><button class="btn" data-pr="load">⬆ ${esc(t("pr_load"))}</button><span class="hq" style="color:var(--ok)">${esc(t("pr_auto"))}</span></div>
    <p class="hq" id="px-prmsg" aria-live="polite"></p><input type="file" id="px-prfile" accept=".json,application/json" hidden></div>`;
}
function exportProgress(){
  const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith("wortweg:")&&!k.startsWith("wortweg:ai_key_"))data[k]=localStorage.getItem(k)}
  const blob=new Blob([JSON.stringify({app:"wortweg",v:1,date:new Date().toISOString(),data},null,1)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`wortflug-progress-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);
  const m=document.getElementById("px-prmsg");if(m)m.textContent=t("pr_saved");
}
function importProgress(file){
  const rd=new FileReader();rd.onload=()=>{let j;try{j=JSON.parse(rd.result)}catch(e){j=null}
    const m=document.getElementById("px-prmsg");
    if(!j||j.app!=="wortweg"||typeof j.data!=="object"){if(m)m.textContent=t("pr_bad");return}
    if(!confirm(t("pr_confirm")))return;
    Object.entries(j.data).forEach(([k,v])=>{if(k.startsWith("wortweg:")&&!k.startsWith("wortweg:ai_key_"))try{localStorage.setItem(k,v)}catch(e){}});
    if(m)m.textContent=t("pr_loaded");setTimeout(()=>location.reload(),600)};
  rd.readAsText(file);
}

/* ---------------- Scenes list ---------------- */
function renderScenes(){
  const lvb=document.getElementById("px-sclv"),list=document.getElementById("px-sclist");if(!list)return;
  const cur=SCLV||"all";
  lvb.innerHTML=lvFilterChips("data-sclv",cur);
  list.innerHTML=SCENES.filter(s=>cur==="all"||s.lv===cur).map(s=>`<button class="px-scene" data-scene="${s.id}"><span class="th">${bgSVG(s.bg)}${miniCast(s)}<span class="lvt">${s.lv}</span>${P.scenesSeen[s.id]?`<span class="seen">✓ ${esc(t("sc_seen"))}</span>`:""}</span><span class="meta"><b lang="de">${esc(s.t.de)}</b><small>${esc(tr(s.t))} · ${s.lines.length} ${esc(t("sc_lines"))} · ${esc(s.cast.a.name)} & ${esc(s.cast.b.name)}</small></span></button>`).join("");
}
function miniCast(s){return `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMax slice" style="position:absolute;inset:0"><g transform="translate(110 150) scale(1)">${charBody(s.cast.a)}</g><g transform="translate(490 150) scale(1)">${charBody(s.cast.b)}</g></svg>`}

/* ---------------- illustration: backgrounds and people ---------------- */
function bgSVG(k){
  const sky=`<defs><linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8EC5FF"/><stop offset="1" stop-color="#DDEEFF"/></linearGradient></defs>`;
  const B={
   cafe:`<rect width="800" height="450" fill="#F3E2CC"/><rect y="330" width="800" height="120" fill="#B98962"/><rect y="330" width="800" height="10" fill="#9C6F4B"/>
     <rect x="300" y="60" width="200" height="140" rx="10" fill="#9FD3F5" stroke="#7A5638" stroke-width="10"/><line x1="400" y1="60" x2="400" y2="200" stroke="#7A5638" stroke-width="6"/>
     <rect x="40" y="90" width="150" height="10" fill="#7A5638"/><rect x="610" y="90" width="150" height="10" fill="#7A5638"/>
     ${[55,95,135].map(x=>`<rect x="${x}" y="64" width="26" height="26" rx="4" fill="#fff"/><rect x="${x+520}" y="64" width="26" height="26" rx="4" fill="#E85A4F"/>`).join("")}
     <rect x="0" y="250" width="800" height="90" fill="#6E4B32"/><rect x="0" y="245" width="800" height="12" fill="#8B5E3C"/>
     <rect x="560" y="190" width="70" height="60" rx="6" fill="#3B3B48"/><circle cx="595" cy="215" r="10" fill="#C0C0C8"/>
     <path d="M90 250 q-20-70 0-110 q20 40 0 110z" fill="#3E8E5A"/><rect x="78" y="230" width="24" height="22" rx="4" fill="#D96C3E"/>
     <line x1="200" y1="0" x2="200" y2="40" stroke="#333" stroke-width="2"/><path d="M180 40h40l-8 18h-24z" fill="#F5A623"/><line x1="600" y1="0" x2="600" y2="40" stroke="#333" stroke-width="2"/><path d="M580 40h40l-8 18h-24z" fill="#F5A623"/>`,
   street:`${sky}<rect width="800" height="450" fill="url(#g-sky)"/><circle cx="680" cy="70" r="36" fill="#FFD966"/>
     <rect x="0" y="90" width="170" height="260" fill="#E8B4A0"/><rect x="170" y="140" width="150" height="210" fill="#F1D6A8"/><rect x="480" y="110" width="160" height="240" fill="#B7C9E8"/><rect x="640" y="160" width="160" height="190" fill="#E7C1D8"/>
     ${[[20,120],[90,120],[20,200],[90,200],[195,170],[255,170],[195,250],[255,250],[505,140],[575,140],[505,220],[575,220],[665,190],[735,190]].map(([x,y])=>`<rect x="${x}" y="${y}" width="40" height="50" rx="4" fill="#FFFFFF" opacity=".85"/>`).join("")}
     <rect y="350" width="800" height="100" fill="#9A9AA6"/><rect y="345" width="800" height="10" fill="#C9C9D2"/>
     <rect x="395" y="190" width="8" height="160" fill="#555"/><circle cx="399" cy="180" r="34" fill="#3E8E5A"/><circle cx="380" cy="200" r="24" fill="#4FA36A"/>`,
   doctor:`<rect width="800" height="450" fill="#E6F1F6"/><rect y="340" width="800" height="110" fill="#C9D6DE"/>
     <rect x="80" y="70" width="120" height="150" rx="8" fill="#fff" stroke="#B8C7D1" stroke-width="4"/><path d="M140 105v80M100 145h80" stroke="#E14B5A" stroke-width="18" stroke-linecap="round"/>
     <rect x="600" y="70" width="130" height="170" rx="8" fill="#fff" stroke="#B8C7D1" stroke-width="4"/><path d="M630 140q35-40 70 0q-35 50-70 0z" fill="#E14B5A" opacity=".8"/><path d="M620 175h90M620 195h70" stroke="#B8C7D1" stroke-width="6" stroke-linecap="round"/>
     <rect x="260" y="250" width="280" height="20" rx="6" fill="#FFFFFF" stroke="#B8C7D1" stroke-width="3"/><rect x="280" y="270" width="12" height="80" fill="#B8C7D1"/><rect x="508" y="270" width="12" height="80" fill="#B8C7D1"/>
     <circle cx="300" cy="238" r="12" fill="none" stroke="#3B4A6B" stroke-width="4"/><path d="M300 226q30-30 60 0" fill="none" stroke="#3B4A6B" stroke-width="4"/>`,
   shop:`<rect width="800" height="450" fill="#F5F0E6"/><rect y="350" width="800" height="100" fill="#D8D2C4"/>
     ${[0,1,2].map(r=>`<rect x="30" y="${80+r*85}" width="740" height="10" fill="#9C8F78"/>${Array.from({length:18},(_,i)=>`<rect x="${40+i*41}" y="${42+r*85}" width="32" height="38" rx="3" fill="${["#E85A4F","#F5A623","#4FA36A","#5B8DEF","#B06AD9","#F2D16B"][(i+r)%6]}"/>`).join("")}`).join("")}
     <rect x="360" y="10" width="80" height="34" rx="6" fill="#2E5BCC"/><text x="400" y="34" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="20" fill="#fff">4</text>`,
   station:`${sky}<rect width="800" height="450" fill="url(#g-sky)"/><rect y="0" width="800" height="40" fill="#5A6170"/>
     <rect x="0" y="120" width="800" height="150" rx="20" fill="#E8EDF3"/><rect x="0" y="120" width="800" height="26" fill="#D7263D"/>
     ${[30,180,330,480,630].map(x=>`<rect x="${x}" y="160" width="120" height="70" rx="10" fill="#2C3E50" opacity=".85"/>`).join("")}
     <rect y="300" width="800" height="150" fill="#B8B8C2"/><rect y="295" width="800" height="12" fill="#F2D16B"/>
     <rect x="560" y="50" width="200" height="56" rx="6" fill="#1E2A3A"/><text x="575" y="74" font-family="monospace" font-size="16" fill="#F2D16B">ICE 521 München</text><text x="575" y="96" font-family="monospace" font-size="16" fill="#FF6B6F">+40 min</text>
     <circle cx="120" cy="80" r="30" fill="#fff" stroke="#333" stroke-width="5"/><path d="M120 80V62M120 80l12 8" stroke="#333" stroke-width="4" stroke-linecap="round"/>`,
   flat:`<rect width="800" height="450" fill="#EFE7DD"/><rect y="340" width="800" height="110" fill="#C49A6C"/>
     <rect x="290" y="50" width="220" height="180" rx="8" fill="#BFE3F7" stroke="#fff" stroke-width="12"/><line x1="400" y1="50" x2="400" y2="230" stroke="#fff" stroke-width="8"/><line x1="290" y1="140" x2="510" y2="140" stroke="#fff" stroke-width="8"/>
     <rect x="20" y="250" width="230" height="90" rx="20" fill="#C0532F"/><rect x="20" y="220" width="230" height="50" rx="20" fill="#7A6BF0"/>
     <rect x="600" y="80" width="110" height="80" rx="6" fill="#F5A623"/><rect x="612" y="92" width="86" height="56" fill="#FFE6B8"/>
     <line x1="700" y1="200" x2="700" y2="340" stroke="#555" stroke-width="5"/><path d="M670 200h60l-12-40h-36z" fill="#F2D16B"/>
     <path d="M560 340q-30-90 0-150q30 60 0 150z" fill="#3E8E5A"/><rect x="545" y="310" width="30" height="32" rx="5" fill="#D96C3E"/>`,
   office:`<rect width="800" height="450" fill="#E4E8EF"/><rect y="340" width="800" height="110" fill="#9AA3B2"/>
     <rect x="300" y="40" width="200" height="170" fill="#CFE7F7"/>${Array.from({length:8},(_,i)=>`<rect x="300" y="${44+i*21}" width="200" height="8" fill="#fff" opacity=".9"/>`).join("")}
     <rect x="40" y="70" width="170" height="250" fill="#8B6A4E"/>${[0,1,2,3].map(r=>`<rect x="50" y="${90+r*58}" width="150" height="6" fill="#6B4E36"/>${Array.from({length:6},(_,i)=>`<rect x="${56+i*24}" y="${58+r*58+12}" width="18" height="${26+(i%3)*4}" fill="${["#E85A4F","#5B8DEF","#F5A623","#4FA36A","#B06AD9","#3B4A6B"][(i+r)%6]}"/>`).join("")}`).join("")}
     <rect x="260" y="250" width="300" height="18" rx="5" fill="#5A6170"/><rect x="360" y="200" width="100" height="52" rx="6" fill="#2C3E50"/><rect x="368" y="207" width="84" height="38" fill="#7FB6E8"/>
     <path d="M680 340q-30-100 0-170q30 70 0 170z" fill="#3E8E5A"/><rect x="664" y="305" width="32" height="36" rx="5" fill="#C0532F"/>`
  };
  return `<svg class="sc-bg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${B[k]||B.street}</svg>`;
}
function charBody(c){
  const sk=c.skin,hr=c.hair,shade="rgba(0,0,0,.12)";
  let back="",front="";
  if(c.style==="long")back=`<path d="M44 120 Q38 52 100 50 Q162 52 156 120 L164 228 Q132 244 100 236 Q68 244 36 228Z" fill="${hr}"/>`;
  if(c.style==="bob")back=`<path d="M42 128 Q38 54 100 52 Q162 54 158 128 L158 182 Q100 196 42 182Z" fill="${hr}"/>`;
  if(c.style==="bun")back=`<circle cx="100" cy="52" r="24" fill="${hr}"/>`;
  if(c.style==="hijab")back=`<path d="M34 140 Q30 46 100 42 Q170 46 166 140 Q170 214 132 240 L68 240 Q30 214 34 140Z" fill="${c.scarf||"#7B5EA7"}"/>`;
  if(c.style==="short")front=`<path d="M46 118 Q44 58 100 56 Q156 58 154 118 Q146 86 100 84 Q58 86 46 118Z" fill="${hr}"/>`;
  if(c.style==="curly")front=`<g fill="${hr}">${[[58,82],[78,66],[100,60],[122,66],[142,82],[50,104],[150,104],[70,74],[130,74]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="17"/>`).join("")}</g>`;
  if(c.style==="long"||c.style==="bob"||c.style==="bun")front=`<path d="M46 116 Q46 58 100 56 Q154 58 154 116 Q132 80 92 84 Q62 90 46 116Z" fill="${hr}"/>`;
  if(c.style==="hijab")front=`<path d="M48 110 Q52 62 100 60 Q148 62 152 110 Q128 84 100 84 Q72 84 48 110Z" fill="${c.scarf||"#7B5EA7"}" opacity=".95"/>`;
  const cap=c.cap?`<path d="M44 96 Q48 52 100 50 Q152 52 156 96Z" fill="#1F3A68"/><rect x="40" y="90" width="124" height="12" rx="6" fill="#16294A"/><circle cx="100" cy="70" r="8" fill="#F2D16B"/>`:"";
  const beard=c.beard?`<path d="M58 140 Q62 192 100 196 Q138 192 142 140 Q130 172 100 174 Q70 172 58 140Z" fill="${hr}" opacity=".9"/>`:"";
  const glasses=c.glasses?`<g fill="none" stroke="#2A2A33" stroke-width="3.5"><circle cx="80" cy="126" r="13"/><circle cx="120" cy="126" r="13"/><path d="M93 126h14"/></g>`:"";
  const tie=c.top==="#F4F4F4"?`<path d="M80 210 L100 300 L120 210" fill="none" stroke="#9BB0C4" stroke-width="4"/><circle cx="72" cy="246" r="9" fill="none" stroke="#3B4A6B" stroke-width="4"/>`:"";
  return `<g>${back}
   <path d="M18 330 Q22 222 100 210 Q178 222 182 330Z" fill="${c.top}"/><path d="M100 210 Q178 222 182 330 L150 330 Q150 250 100 228Z" fill="${shade}"/>${tie}
   <rect x="86" y="168" width="28" height="46" rx="12" fill="${sk}"/><rect x="86" y="190" width="28" height="18" fill="${shade}"/>
   <circle cx="47" cy="128" r="10" fill="${sk}"/><circle cx="153" cy="128" r="10" fill="${sk}"/>
   <ellipse cx="100" cy="124" rx="54" ry="60" fill="${sk}"/>
   ${beard}
   <ellipse cx="76" cy="150" rx="9" ry="5" fill="#E88" opacity=".25"/><ellipse cx="124" cy="150" rx="9" ry="5" fill="#E88" opacity=".25"/>
   <path d="M68 108 q12-7 24 0M108 108 q12-7 24 0" stroke="${c.style==="hijab"?"#3B2A22":hr}" stroke-width="4" fill="none" stroke-linecap="round"/>
   <ellipse class="eye" cx="80" cy="126" rx="6" ry="7" fill="#22202E"/><ellipse class="eye" cx="120" cy="126" rx="6" ry="7" fill="#22202E"/>
   <circle cx="82" cy="123" r="2" fill="#fff"/><circle cx="122" cy="123" r="2" fill="#fff"/>
   <path d="M97 136 q3 10 -3 12" stroke="rgba(0,0,0,.25)" stroke-width="3" fill="none" stroke-linecap="round"/>
   <ellipse class="mo" cx="100" cy="161" rx="13" ry="7" fill="#7A2E3A"/>
   ${glasses}${front}${cap}</g>`;
}
function charSVG(c){return `<svg viewBox="0 0 200 330" aria-hidden="true">${charBody(c)}</svg>`}

/* ---------------- player engine (lessons + scenes) ---------------- */
const PL={steps:[],i:0,run:0,paused:false,kind:"",ctx:null,timer:null};
const VOICES={f:[{vn:"Kore",pitch:1.08},{vn:"Aoede",pitch:1.18}],m:[{vn:"Puck",male:true,pitch:.88},{vn:"Charon",male:true,pitch:.8}]};
/* speak one line; resolves when it has finished (or false when there's no voice for that language) */
function say(text,opt,run){
  return new Promise(res=>{
    const lang=(opt&&opt.lang)||"de";
    if(lang!=="de"&&!TTS.natural&&!(TTS.engine()==="device"&&TTS.hasLang(lang))){res(false);return}
    let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(g);res(true)};
    const g=setTimeout(fin,(TTS.natural?9000:4000)+String(text).length*110/Math.max(.5,state.rate));
    PL.guard=g;
    try{TTS.speakLena(text,null,()=>{if(run===PL.run)fin()},opt||{})}catch(e){fin()}
  });
}
const wait=(ms,run)=>new Promise(res=>{PL.timer=setTimeout(()=>res(run===PL.run),ms)});
/* karaoke: every word carries its character offset, so it lights up exactly when it is spoken */
const normT=s=>String(s).replace(/\s+/g," ").trim();
function kwHTML(s){let o=0;return normT(s).split(" ").map(w=>{const h=`<span class="kw" data-o="${o}">${ARTC(w)}</span>`;o+=w.length+1;return h}).join(" ")}
function highlight(i){
  document.querySelectorAll("#px-stage .kara").forEach(box=>{box.classList.add("live");let last=null;
    box.querySelectorAll(".kw").forEach(k=>{const on=+k.dataset.o<=i;k.classList.toggle("on",on);k.classList.remove("now");if(on)last=k});if(last)last.classList.add("now")})}
function setSub(de,trs){
  const showTr=P.stTr&&trs;PL.subText=de?normT(de):"";
  document.getElementById("px-st-sub").innerHTML=de?`<span class="de kara" lang="de" dir="ltr">${kwHTML(de)}</span>${showTr?`<span class="tr" dir="${state.lang==="ar"?"rtl":"ltr"}">${esc(trs)}</span>`:""}`:"";
}
function voiceLabel(){const el=document.getElementById("px-st-voice");const s=PL.steps[PL.i];const rec=!!(s&&s.speak&&s.speak.some(it=>TTS.hasRec(it.text,it.opt)));const basic=!rec&&!TTS.natural&&TTS.engine()==="builtin";el.textContent="🔊 "+t(rec?"pl_rec":TTS.natural?"pl_nat":basic?"pl_basic":"pl_dev");el.classList.toggle("warn",basic);el.title=basic?t("pl_basic_tip"):""}
function prefetchStep(s){if(!s||!s.speak)return;const it=s.speak[0];if(it)TTS.prefetch(it.text,it.opt)}
async function playStep(i){
  const run=++PL.run;clearTimeout(PL.timer);TTS.stop();
  PL.i=Math.max(0,Math.min(i,PL.steps.length-1));const s=PL.steps[PL.i];
  document.getElementById("px-st-prog").style.width=Math.round(100*(PL.i+1)/PL.steps.length)+"%";
  s.show();voiceLabel();
  if(PL.paused){return}
  (s.speak||[]).forEach((it,k)=>{if(k>0)TTS.prefetch(it.text,it.opt)});prefetchStep(PL.steps[PL.i+1]);
  for(const it of (s.speak||[])){if(run!==PL.run)return;if(it.sub!==undefined)setSub(it.sub,it.tr);
    let started=false;const kara=normT(it.text)===PL.subText;
    /* animations start when the sound starts, and words light up as they are spoken */
    const o=Object.assign({},it.opt,{onstart:()=>{if(run!==PL.run||started)return;started=true;if(it.before)it.before()},onword:ci=>{if(run===PL.run&&kara)highlight(ci)}});
    const spoke=await say(it.text,o,run);if(run!==PL.run)return;
    if(!started&&it.before)it.before();
    if(kara)highlight(1e9);
    if(!spoke&&it.read)await wait(it.read,run);if(it.after)it.after();if(it.gap)await wait(it.gap,run);if(run!==PL.run)return}
  if(s.hold&&!(await wait(s.hold,run)))return;
  if(run!==PL.run||s.end)return;
  if(PL.i<PL.steps.length-1)playStep(PL.i+1);
}
function setPaused(p){PL.paused=p;document.getElementById("px-st-play").innerHTML=p?PLAYI:PAUSEI;document.getElementById("px-st-play").setAttribute("aria-label",p?"Play":"Pause");if(p){PL.run++;clearTimeout(PL.timer);TTS.stop();document.querySelectorAll(".sc-char").forEach(c=>c.classList.remove("talk"))}else playStep(PL.i)}
function openStage(kicker,name,steps,kind,ctx){
  if(typeof stopMic==="function")try{stopMic()}catch(e){}
  try{const v=document.getElementById("vplayer");v&&v.pause()}catch(e){}
  PL.steps=steps;PL.kind=kind;PL.ctx=ctx;PL.paused=false;
  document.getElementById("px-st-k").textContent=kicker;document.getElementById("px-st-name").textContent=name;
  document.getElementById("px-st-orig").hidden=true;   /* the old recorded videos use a robot voice: the animated lesson replaces them */
  document.getElementById("px-st-tr").setAttribute("aria-pressed",String(P.stTr));
  document.getElementById("px-stage").hidden=false;document.body.classList.add("sheet-open");
  document.getElementById("px-st-play").innerHTML=PAUSEI;
  TTS.unlock();playStep(0);
}
function closeStage(){PL.run++;clearTimeout(PL.timer);TTS.stop();document.getElementById("px-stage").hidden=true;document.body.classList.remove("sheet-open");document.getElementById("px-st-view").innerHTML=""}

/* ---- animated lesson from a grammar topic ---- */
const PRONS=["ich","du","er/sie/es","er","sie","es","wir","ihr","sie/Sie","Sie","er/es"];
function rowSpeech(row){
  const cells=row.slice(1).map(c=>String(c).replace(/^–\s*/,"").trim()).filter(c=>c&&c!=="–"&&c!=="-");
  const p=String(row[0]).trim();
  if(PRONS.includes(p)){const pr=p.split("/")[0];return cells.map(c=>`${pr} ${c}`).join(". ")+"."}
  return cells.join(", ")+".";
}
function openLesson(id){
  const g=G.find(x=>x.id===id);if(!g)return;
  P.lessonsSeen[id]=1;save("lessonsSeen");
  const view=()=>document.getElementById("px-st-view");
  const tbl=g.table||[];const steps=[];
  steps.push({show:()=>{view().innerHTML=`<div class="ls"><div><div class="k">${t("pl_lesson")} · ${g.level}</div><h2 lang="de">${esc(g.de)}</h2><div class="sub">${esc(tr(g.t))}</div><div class="bars"><i style="background:#7FB7D1"></i><i style="background:#EE8B6B"></i><i style="background:#A9BB6A"></i></div></div></div>`;setSub(g.de,tr(g.t))},
    speak:[{text:g.de,opt:{vn:"Kore"}}],hold:700});
  const rule=tr(g.s);
  steps.push({show:()=>{view().innerHTML=`<div class="ls"><div style="display:grid;gap:14px;justify-items:center"><div class="k">📘 ${esc(t("pl_rule"))}</div><p class="rule" dir="${state.lang==="ar"?"rtl":"ltr"}">${rule.split(/(?<=[.!?])\s+/).map((s,i)=>`<span style="animation-delay:${i*0.45}s">${esc(s)} </span>`).join("")}</p></div></div>`;setSub("","")},
    speak:[{text:rule,opt:{vn:"Kore",lang:state.lang},read:Math.min(16000,Math.max(6000,rule.length*55))}],hold:600});
  if(tbl.length>1){
    const rows=tbl.slice(1);
    steps.push({show:()=>{view().innerHTML=`<div class="ls"><div style="display:grid;gap:12px;justify-items:center;max-width:100%;overflow:auto"><div class="k">${esc(t("pl_forms"))}</div><table lang="de"><thead><tr>${tbl[0].map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r,i)=>`<tr data-r="${i}">${r.map(c=>`<td>${ARTC(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;setSub("","")},
      speak:rows.map((r,i)=>({text:rowSpeech(r),opt:{vn:"Kore",rate:.95},sub:r.join("  ·  "),tr:"",gap:350,
        before:()=>view().querySelectorAll("tr[data-r]").forEach(tr=>{const k=+tr.dataset.r;tr.classList.toggle("hi",k===i);tr.classList.toggle("dim",k>i)})})),hold:500});
  }
  g.ex.forEach((e,i)=>{
    steps.push({show:()=>{view().innerHTML=`<div class="ls"><div><div class="k">${esc(t("pl_ex"))} ${i+1}/${g.ex.length}</div><p class="ex" lang="de" dir="ltr">${ARTC(e.de)}</p>${P.stTr?`<p class="ext" dir="${state.lang==="ar"?"rtl":"ltr"}">${esc(e[state.lang]||e.en)}</p>`:""}<div id="px-turn"></div></div></div>`;setSub(e.de,e[state.lang]||e.en)},
      speak:[{text:e.de,opt:{vn:"Kore"},after:()=>{const tn=document.getElementById("px-turn");if(tn)tn.innerHTML=`<span class="turn">🗣 ${esc(t("pl_turn"))}</span>`},gap:2800}],hold:300});
  });
  const idx=G.filter(x=>x.level===g.level).indexOf(g);
  steps.push({end:true,show:()=>{view().innerHTML=`<div class="ls"><div class="end"><div class="ic">🎉</div><h2>${esc(t("pl_end"))}</h2><p class="sub">${esc(t("pl_end_sub"))}</p><div class="btns"><button class="btn primary" data-pl="practice" data-tlevel="${g.level}" data-topic-i="${idx}">${esc(t("pl_practice"))}</button><button class="btn" data-pl="replay">↺ ${esc(t("pl_replay"))}</button></div></div></div>`;setSub("","")}});
  PL.lessonId=id;
  openStage(`${t("pl_lesson")} · ${g.level}`,g.de,steps,"lesson",g);
}
/* ---- animated scene ---- */
function openScene(id){
  const s=SCENES.find(x=>x.id===id);if(!s)return;
  P.scenesSeen[id]=1;save("scenesSeen");
  const view=()=>document.getElementById("px-st-view");
  const vo={},cnt={f:0,m:0};["a","b"].forEach(k=>{const c=s.cast[k];vo[k]=VOICES[c.g][cnt[c.g]++%2]});
  const build=()=>{view().innerHTML=`${bgSVG(s.bg)}<div class="sc-char a" id="px-ca">${charSVG(s.cast.a)}</div><div class="sc-char b" id="px-cb">${charSVG(s.cast.b)}</div><span class="sc-name a">${esc(s.cast.a.name)}</span><span class="sc-name b">${esc(s.cast.b.name)}</span><div id="px-bub"></div>`};
  const talk=k=>{["a","b"].forEach(x=>{const el=document.getElementById("px-c"+x);if(el){el.classList.toggle("talk",x===k);el.classList.toggle("quiet",!!k&&x!==k)}})};
  const kick=s.ep?`📺 ${esc(s.ep.series)} · Folge ${s.ep.n}`:`${t("pl_scene")} · ${s.lv}`;
  const steps=[{show:()=>{build();view().insertAdjacentHTML("beforeend",`<div class="sc-title"><div><div class="k">${kick}${s.ep?` · ${s.lv}`:""}</div><h2 lang="de">${esc(s.t.de)}</h2><p>${esc(tr(s.t))}</p></div></div>`);setSub("","")},hold:2200}];
  s.lines.forEach((ln,i)=>{const [who,de,en,fr,ar]=ln;const trs={en,fr,ar}[state.lang]||en;
    steps.push({show:()=>{if(!document.getElementById("px-ca"))build();const tt=view().querySelector(".sc-title");if(tt)tt.remove();
      document.getElementById("px-bub").innerHTML=`<div class="sc-bub ${who}"><small>${esc(s.cast[who].name)}</small><span class="kara" lang="de" dir="ltr">${kwHTML(de)}</span></div>`;talk(null);setSub(de,trs)},
      speak:[{text:de,opt:vo[who],before:()=>talk(who),after:()=>talk(null)}],hold:450});
  });
  steps.push({end:true,show:()=>{talk(null);view().insertAdjacentHTML("beforeend",`<div class="sc-title"><div class="end" style="display:grid;gap:12px;justify-items:center"><div style="font-size:2.4rem">🎉</div><h2>${esc(t("pl_end"))}</h2><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${s.q?`<button class="btn primary" data-pl="quiz">❓ ${esc(t("ep_quiz"))} (${s.q.length})</button>`:""}<button class="btn ${s.q?"":"primary"}" data-pl="chat" ${s.q?'style="color:#fff;border-color:rgba(255,255,255,.4)"':""}>${esc(t("pl_chat"))}</button><button class="btn" data-pl="replay" style="color:#fff;border-color:rgba(255,255,255,.4)">↺ ${esc(t("pl_replay"))}</button></div></div></div>`);setSub("","")}});
  openStage(s.ep?`📺 Folge ${s.ep.n} · ${s.lv}`:`${t("pl_scene")} · ${s.lv}`,s.t.de,steps,"scene",s);
}

/* ---------------- Free talk with Lena: any topic, spontaneous ---------------- */
SC.unshift({id:"frei",de:"Freies Gespräch ✨",t:{en:"Free talk: any topic",fr:"Discussion libre : tous sujets",ar:"حديث حر: أي موضوع"},desc:"a spontaneous, free conversation between friends about any topic the learner brings up",
  o:{de:"Hallo, schön dich zu sehen! Ich habe heute etwas Lustiges erlebt. Aber erzähl du zuerst: Worüber möchtest du sprechen?",en:"Hi, nice to see you! Something funny happened to me today. But you first: what would you like to talk about?",fr:"Salut, contente de te voir ! Il m'est arrivé un truc drôle aujourd'hui. Mais toi d'abord : de quoi veux-tu parler ?",ar:"مرحباً، سعيدة برؤيتك! حدث لي اليوم شيء مضحك. لكن أخبرني أنت أولاً: عن ماذا تريد أن نتحدث؟"}});
OPEN.frei={A1:ex("Hallo! Ich bin Lena. Worüber möchtest du sprechen?","Hi! I'm Lena. What would you like to talk about?","Salut ! Je suis Lena. De quoi veux-tu parler ?","مرحباً! أنا لينا. عن ماذا تريد أن نتحدث؟"),
 B1:ex("Hey, schön, dass du da bist! Ich habe gerade über eine verrückte Idee nachgedacht. Aber zuerst: Worüber möchtest du heute reden?","Hey, nice that you're here! I was just thinking about a crazy idea. But first: what would you like to talk about today?","Hé, content que tu sois là ! Je pensais justement à une idée folle. Mais d'abord : de quoi veux-tu parler aujourd'hui ?","أهلاً، جميل أنك هنا! كنت أفكر للتو في فكرة مجنونة. لكن أولاً: عن ماذا تريد أن نتحدث اليوم؟"),
 B2:ex("Schön, dich zu sehen! Mir geht seit heute Morgen eine Frage nicht aus dem Kopf, aber vielleicht hast du ja ein spannenderes Thema. Worüber würdest du gern sprechen?","Nice to see you! A question has been on my mind since this morning, but maybe you have a more exciting topic. What would you like to talk about?","Contente de te voir ! Une question me trotte dans la tête depuis ce matin, mais tu as peut-être un sujet plus passionnant. De quoi aimerais-tu parler ?","سعيدة برؤيتك! هناك سؤال لا يفارق ذهني منذ الصباح، لكن ربما لديك موضوع أكثر إثارة. عن ماذا تودّ أن نتحدث؟")};
START.frei={A:[ex("Ich möchte über Musik sprechen.","I'd like to talk about music.","Je voudrais parler de musique.","أريد أن أتحدث عن الموسيقى."),ex("Was ist passiert? Erzähl!","What happened? Tell me!","Qu'est-ce qui s'est passé ? Raconte !","ماذا حدث؟ احكي لي!"),ex("Lass uns über Essen sprechen.","Let's talk about food.","Parlons de cuisine.","لنتحدث عن الطعام.")],
 B:[ex("Erzähl mir zuerst von deiner verrückten Idee!","Tell me about your crazy idea first!","Raconte-moi d'abord ton idée folle !","أخبريني أولاً عن فكرتك المجنونة!"),ex("Ich würde gern über Reisen sprechen. Wo warst du zuletzt?","I'd like to talk about travel. Where did you go last?","J'aimerais parler de voyages. Où es-tu allée la dernière fois ?","أودّ أن أتحدث عن السفر. أين كنتِ آخر مرة؟"),ex("Was ist dein größter Traum?","What is your biggest dream?","Quel est ton plus grand rêve ?","ما هو أكبر حلم لديك؟")]};
const FT_TOPICS=[["Reisen","Travel","Voyages","السفر"],["Essen & Kochen","Food & cooking","Cuisine","الطعام والطبخ"],["Musik","Music","Musique","الموسيقى"],["Filme & Serien","Films & series","Films et séries","الأفلام والمسلسلات"],["Sport","Sport","Sport","الرياضة"],["Arbeit & Träume","Work & dreams","Travail et rêves","العمل والأحلام"],["Familie & Freunde","Family & friends","Famille et amis","العائلة والأصدقاء"],["Technik & KI","Tech & AI","Technologie et IA","التقنية والذكاء الاصطناعي"],["Natur & Umwelt","Nature","Nature","الطبيعة والبيئة"],["Feste & Kultur","Festivals & culture","Fêtes et culture","الأعياد والثقافة"],["Die Zukunft","The future","L'avenir","المستقبل"]];
Object.assign(L.en,{ft_btn:"Free talk",ft_q:"What would you like to talk about?",ft_ph:"Any topic… or leave empty for a surprise",ft_start:"Start talking",ft_change:"Change topic",ft_topic:"Topic",ft_surprise:"Surprise me ✨"});
Object.assign(L.fr,{ft_btn:"Discussion libre",ft_q:"De quoi aimeriez-vous parler ?",ft_ph:"N'importe quel sujet… ou laissez vide pour une surprise",ft_start:"Commencer",ft_change:"Changer de sujet",ft_topic:"Sujet",ft_surprise:"Surprends-moi ✨"});
Object.assign(L.ar,{ft_btn:"حديث حر",ft_q:"عن ماذا تريد أن تتحدث؟",ft_ph:"أي موضوع… أو اتركه فارغاً لمفاجأة",ft_start:"ابدأ الحديث",ft_change:"غيّر الموضوع",ft_topic:"الموضوع",ft_surprise:"فاجئيني ✨"});
const chatTop=document.querySelector(".chat-top");
document.getElementById("hf").insertAdjacentHTML("beforebegin",`<button class="tiny ftbtn" id="px-ftbtn"><span aria-hidden="true">✨</span> <span data-i18n="ft_btn"></span></button>`);
chatTop.insertAdjacentHTML("afterend",`<div class="ftpanel" id="px-free"></div>`);
const FT={open:true};
function renderFree(){
  const chat=document.querySelector(".chat");const on=state.scen==="frei";chat.classList.toggle("free",on);
  document.getElementById("px-ftbtn").setAttribute("aria-pressed",String(on));
  const box=document.getElementById("px-free");if(!on){box.innerHTML="";return}
  if(!FT.open&&state.topic_free!==undefined){box.innerHTML=`<div class="ft-mini"><span>✨ ${esc(t("ft_topic"))}: <b lang="de">${esc(state.topic_free||"Überraschung")}</b></span><button class="linkbtn" data-ft="edit">${esc(t("ft_change"))}</button></div>`;return}
  box.innerHTML=`<div class="ft-box"><b class="ft-q">${esc(t("ft_q"))}</b>
    <form class="ft-form" id="px-ftform"><input id="px-ftin" lang="de" dir="ltr" autocomplete="off" placeholder="${esc(t("ft_ph"))}" value="${esc(state.topic_free||"")}"><button class="sendbtn">${esc(t("ft_start"))}</button></form>
    <div class="ft-chips">${FT_TOPICS.map(([de,en,fr,ar])=>`<button type="button" class="chip" data-fttopic="${esc(de)}" title="${esc({en,fr,ar}[state.lang]||en)}" lang="de">${esc(de)}</button>`).join("")}<button type="button" class="chip" data-fttopic="">${esc(t("ft_surprise"))}</button></div></div>`;
}
async function startFree(topic){
  state.scen="frei";state.topic_free=topic||"";FT.open=false;TTS.stop();try{stopMic()}catch(e){}
  renderChatSide();
  if(!AI.key()){resetChat();renderFree();note("no_key");openKey(true);return}
  state.shown=0;state.msgs=[{role:"typing"}];state.ideasBusy=true;renderLog();renderIdeas();renderFree();
  try{
    const r=await aiJSON(buildPrompt("open",topic||""),()=>note("ai_wait"),{max:900,temp:1});
    if(!r||typeof r.reply!=="string")throw {code:"invalid_json"};
    const trs={};["en","ar","fr"].forEach(k=>{const v=r["reply_"+k];if(typeof v==="string"&&v.trim())trs[k]=v.trim()});
    state.msgs=[{role:"bot",de:r.reply,trs,open:false}];
    const ideas=(Array.isArray(r.ideas)?r.ideas:[]).filter(x=>x&&x.de).slice(0,4).map(x=>({de:String(x.de),tr:String(x.tr||"")}));
    state.ideas=ideas.length?ideas:startIdeas(scen());
    state.words=(Array.isArray(r.words)?r.words:[]).filter(x=>x&&x.de).slice(0,6).map(x=>({de:String(x.de),tr:String(x.tr||"")}));
    state.ideasBusy=false;note(null);renderLog();renderIdeas();
    if(state.autoread||state.hf)speakThenListen(r.reply);
  }catch(e){state.ideasBusy=false;resetChat();renderFree();note(e&&e.code==="bad_key"?"bad_key":e&&e.code==="rate_limited"?"chat_limit":"chat_err")}
}
document.addEventListener("click",e=>{
  if(e.target.closest("#px-ftbtn")){if(state.scen!=="frei"){state.scen="frei";FT.open=true;state.topic_free=undefined;TTS.stop();renderChatSide();resetChat()}else{FT.open=true;renderFree()}return}
  if(e.target.closest('[data-scen="frei"]')){FT.open=true;state.topic_free=undefined;renderFree();return}
  const tp=e.target.closest("[data-fttopic]");if(tp){startFree(tp.dataset.fttopic);return}
  if(e.target.closest('[data-ft="edit"]')){FT.open=true;renderFree();const i=document.getElementById("px-ftin");if(i)i.focus()}
});
document.addEventListener("submit",e=>{if(e.target.id==="px-ftform"){e.preventDefault();startFree(document.getElementById("px-ftin").value.trim())}});
const _renderChatSide=renderChatSide;renderChatSide=function(){_renderChatSide();try{renderFree()}catch(e){}};
document.head.insertAdjacentHTML("beforeend",`<style>
.chat.free .chat-main{grid-template-rows:auto auto minmax(0,1fr) auto}
.ftpanel:empty{display:none}
.ft-box{display:grid;gap:10px;padding:14px 18px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--accent) 10%,var(--surface))}
.ft-q{font-family:var(--f-display);font-size:1.2rem;font-weight:600}
.ft-form{display:flex;gap:8px}.ft-form input{flex:1;min-width:0;font:inherit;border:1.5px solid var(--line);border-radius:999px;padding:10px 16px;background:var(--surface);color:var(--ink)}
.ft-form input:focus{outline:none;border-color:var(--brand)}
.ft-form .sendbtn{height:auto;padding:10px 18px}
.ft-chips{display:flex;gap:6px;flex-wrap:wrap}.ft-chips .chip{padding:6px 12px;font-size:.85rem}
.ft-mini{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 18px;border-bottom:1px solid var(--line);font-size:.9rem;background:color-mix(in srgb,var(--accent) 8%,var(--surface))}
.ftbtn[aria-pressed="true"]{background:var(--grad);color:#fff;border-color:transparent}
@media (max-width:640px){.ft-chips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}.ft-chips .chip{flex:none}.ft-box{padding:12px}}
</style>`);

/* ---------------- Lena: hands-free by default, close & restart, big view ---------------- */
Object.assign(L.en,{lena_close:"Close and start a new conversation",lena_big:"Big view",lena_auto:"Listen automatically: no need to press the microphone",lena_paused:"Listening is paused. Tap the microphone to talk again."});
Object.assign(L.fr,{lena_close:"Fermer et commencer une nouvelle conversation",lena_big:"Grand écran",lena_auto:"Écoute automatique : pas besoin d'appuyer sur le micro",lena_paused:"L'écoute est en pause. Touchez le micro pour reparler."});
Object.assign(L.ar,{lena_close:"أغلق وابدأ محادثة جديدة",lena_big:"عرض كبير",lena_auto:"استماع تلقائي: لا حاجة للضغط على الميكروفون",lena_paused:"الاستماع متوقف مؤقتاً. المس الميكروفون للتحدث مجدداً."});
state.autolisten=store.get("autolisten",true);
const EXPAND='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const SHRINK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
chatTop.insertAdjacentHTML("beforeend",`<button class="tiny iconic" id="px-big" aria-pressed="false">${EXPAND}</button><button class="tiny iconic closebtn" id="px-close">✕</button>`);
document.querySelector(".chat-side").insertAdjacentHTML("beforeend",`<label class="vcheck"><input type="checkbox" id="px-autolisten"><span data-i18n="lena_auto"></span></label>`);
document.getElementById("composer").insertAdjacentHTML("beforebegin",`<div class="ideas-strip" id="px-strip"></div>`);
function lenaLabels(){const c=document.getElementById("px-close"),b=document.getElementById("px-big");c.title=c.ariaLabel=t("lena_close");b.title=b.ariaLabel=t("lena_big");document.getElementById("px-autolisten").checked=!!state.autolisten}
function autoStart(){
  if(!state.autolisten||state.hf||state.busy||!SR||!AI.key())return;
  setTimeout(()=>{if(state.screen==="chat"&&!state.hf&&!state.busy&&!document.hidden)try{startHF()}catch(e){}},350);
}
function setBig(on){document.body.classList.toggle("chat-full",on);const b=document.getElementById("px-big");b.setAttribute("aria-pressed",String(on));b.innerHTML=on?SHRINK:EXPAND;const lg=document.getElementById("log");setTimeout(()=>{lg.scrollTop=lg.scrollHeight},60)}
function closeConversation(){
  if(state.hf)endHF(null);TTS.stop();try{stopMic()}catch(e){}
  document.getElementById("msg").value="";state.speech=null;note(null);
  if(state.scen==="frei"){FT.open=true;state.topic_free=undefined}
  resetChat();renderChatSide();
  if(state.autolisten)autoStart();
}
/* small swipeable strip of reply ideas above the text box (phones) */
function renderStrip(){
  const s=document.getElementById("px-strip");if(!s)return;
  if(state.ideasBusy){s.innerHTML=`<span class="strip-wait"><span class="typing"><i></i><i></i><i></i></span></span>`;return}
  s.innerHTML=(state.ideas||[]).slice(0,4).map((x,i)=>`<button type="button" class="strip-idea" data-idea-strip="${i}" lang="de" dir="ltr">💡 ${esc(x.de)}</button>`).join("");
}
const _renderIdeas=renderIdeas;renderIdeas=function(){_renderIdeas();try{renderStrip()}catch(e){}};
const _go=go;go=function(s,fromHash){const prev=state.screen;_go(s,fromHash);
  if(state.screen==="chat"&&prev!=="chat")autoStart();
  if(state.screen!=="chat"){if(state.hf)endHF(null);setBig(false)}};
document.getElementById("px-close").addEventListener("click",closeConversation);
document.getElementById("px-big").addEventListener("click",()=>setBig(!document.body.classList.contains("chat-full")));
document.getElementById("px-autolisten").addEventListener("change",e=>{state.autolisten=e.target.checked;store.set("autolisten",state.autolisten);if(state.autolisten)autoStart();else if(state.hf)endHF("lena_paused")});
document.addEventListener("click",e=>{const b=e.target.closest("[data-idea-strip]");if(b){useIdea(+b.dataset.ideaStrip);if(state.hf){/* speak it yourself: the mic is still listening */}}});
/* after the key is saved, start listening right away */
document.getElementById("keyform").addEventListener("submit",()=>setTimeout(autoStart,300));
document.head.insertAdjacentHTML("beforeend",`<style>
.chat-top .iconic{width:36px;height:34px;padding:0;display:inline-grid;place-items:center}
.chat-top .iconic svg{width:17px;height:17px}
.chat-top .closebtn{font-size:1rem;font-weight:800}
.chat-top .closebtn:hover{background:var(--bad);border-color:var(--bad);color:#fff}
.chat .autosend{display:none}
.ideas-strip{display:none;gap:6px;overflow-x:auto;padding:8px 12px 0;scrollbar-width:none}
.ideas-strip::-webkit-scrollbar{display:none}
.strip-idea{flex:none;max-width:78vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1px solid var(--line);background:var(--solid,var(--surface));border-radius:999px;padding:7px 12px;font-weight:700;font-size:.85rem;color:var(--ink)}
.strip-idea:hover{border-color:var(--brand)}
.strip-wait{padding:4px 8px}
@media (max-width:999px){
  .ideas-strip{display:flex}
  .ideabtn{display:none!important}
  .chat.ideas-open .ideas{display:none!important}
  .chat-top{flex-wrap:nowrap!important;gap:6px!important;padding:8px 10px!important}
  .chat-top .who b{font-size:1rem}.chat-top .who span{font-size:.75rem}
  .chat-top .avatar{width:34px;height:34px;font-size:1rem}
  .chat-top .hfbtn{flex:none!important;width:36px;height:34px;padding:0!important;justify-content:center}
  .chat-top .hfbtn span,#restart,#px-ftbtn [data-i18n]{display:none}
  .chat-top #px-ftbtn{padding:0 10px}
  body[data-screen="chat"] #chat{padding-block:6px 4px!important}
  body[data-screen="chat"] .appbar-in{height:52px}
  .bubble{font-size:1.08rem}
}
body.chat-full .appbar,body.chat-full .tabbar{display:none!important}
body.chat-full{padding:0!important}
body.chat-full #chat{padding:0!important}
body.chat-full #chat .wrap{max-width:none;padding:0}
body.chat-full .chat{border-radius:0!important;border:0}
body.chat-full .chat-main{height:calc(100dvh - var(--sat) - var(--sab))!important}
body.chat-full .bubble{font-size:1.15rem}
</style>`);

/* ---------------- more topics: every level gets its own situations ---------------- */
const TOPIC_EM={kennen:"👋",cafe:"☕",markt:"🛒",arzt:"🩺",wohnung:"🔑",wochenende:"🌤️",frei:"✨"};
SC.forEach(s=>{if(!s.em)s.em=TOPIC_EM[s.id]||"💬"});
const NT=(id,em,lv,de,t,desc,o)=>({id,em,lv,de,t:{en:t[0],fr:t[1],ar:t[2]},desc,o:{de:o[0],en:o[1],fr:o[2],ar:o[3]}});
const LVA=["A1","A2"],LVAB=["A2","B1"],LVB=["B1","B2"],LVB2=["B2"];
SC.push(
NT("familie","👨‍👩‍👧",LVA,"Meine Familie",["My family","Ma famille","عائلتي"],"chatting about family with a friendly neighbour; Lena is that neighbour",
 ["Hallo! Ich habe eine große Familie. Hast du Geschwister?","Hi! I have a big family. Do you have brothers or sisters?","Salut ! J'ai une grande famille. Tu as des frères et sœurs ?","مرحباً! عندي عائلة كبيرة. هل لديك إخوة أو أخوات؟"]),
NT("hobbys","🎨",LVA,"Hobbys & Freizeit",["Hobbies & free time","Loisirs","الهوايات ووقت الفراغ"],"chatting with a friend about hobbies and free time",
 ["Hallo! Ich male gern und spiele Gitarre. Was machst du gern in deiner Freizeit?","Hi! I like painting and I play the guitar. What do you like doing in your free time?","Salut ! J'aime peindre et je joue de la guitare. Qu'est-ce que tu aimes faire pendant ton temps libre ?","مرحباً! أحب الرسم وأعزف على الغيتار. ماذا تحب أن تفعل في وقت فراغك؟"]),
NT("tag","⏰",LVA,"Mein Tag",["My day","Ma journée","يومي"],"talking with a friend about daily routines and times of day",
 ["Guten Morgen! Ich stehe jeden Tag um sieben Uhr auf. Und du? Wann stehst du auf?","Good morning! I get up at seven o'clock every day. And you? When do you get up?","Bonjour ! Je me lève tous les jours à sept heures. Et toi ? Tu te lèves quand ?","صباح الخير! أستيقظ كل يوم في الساعة السابعة. وأنت؟ متى تستيقظ؟"]),
NT("essen","🍝",LVA,"Essen & Trinken",["Food & drink","Manger et boire","الطعام والشراب"],"chatting with a friend about favourite food and drinks",
 ["Ich habe so Hunger! Ich esse sehr gern Pizza. Was isst du gern?","I'm so hungry! I really like eating pizza. What do you like to eat?","J'ai tellement faim ! J'adore la pizza. Qu'est-ce que tu aimes manger ?","أنا جائعة جداً! أحب البيتزا كثيراً. ماذا تحب أن تأكل؟"]),
NT("kleidung","👕",LVA,"Im Kleidergeschäft",["Buying clothes","Dans un magasin de vêtements","في متجر الملابس"],"buying clothes in a shop; Lena is the shop assistant and uses Sie",
 ["Guten Tag! Kann ich Ihnen helfen? Heute sind alle Jacken billiger.","Hello! Can I help you? All jackets are cheaper today.","Bonjour ! Je peux vous aider ? Aujourd'hui, toutes les vestes sont moins chères.","نهارك سعيد! هل أستطيع مساعدتك؟ كل السترات أرخص اليوم."]),
NT("bahnhof","🚆",LVA,"Am Bahnhof",["At the station","À la gare","في محطة القطار"],"buying a train ticket at the station; Lena works at the ticket counter and uses Sie",
 ["Guten Tag! Wohin möchten Sie fahren?","Hello! Where would you like to go?","Bonjour ! Où souhaitez-vous aller ?","نهارك سعيد! إلى أين تريد أن تسافر؟"]),
NT("wetter","☀️",LVA,"Das Wetter",["The weather","La météo","الطقس"],"chatting with a friend about the weather and what to do in it",
 ["Heute ist es so schön sonnig! Ich gehe gleich in den Park. Wie ist das Wetter bei dir?","It's so nice and sunny today! I'm going to the park in a moment. What's the weather like where you are?","Il fait si beau aujourd'hui ! Je vais au parc tout à l'heure. Quel temps fait-il chez toi ?","الجو مشمس وجميل جداً اليوم! سأذهب إلى الحديقة بعد قليل. كيف الطقس عندك؟"]),
NT("restaurant","🍽️",LVAB,"Im Restaurant",["At the restaurant","Au restaurant","في المطعم"],"eating out in a restaurant; Lena is the waiter and uses Sie",
 ["Guten Abend und herzlich willkommen! Hier ist die Speisekarte. Möchten Sie schon etwas trinken?","Good evening and welcome! Here is the menu. Would you like something to drink already?","Bonsoir et bienvenue ! Voici la carte. Vous désirez déjà quelque chose à boire ?","مساء الخير وأهلاً بك! تفضل قائمة الطعام. هل تريد أن تشرب شيئاً الآن؟"]),
NT("urlaub","✈️",LVAB,"Urlaub & Reisen",["Holidays & travel","Vacances et voyages","العطلات والسفر"],"chatting with a friend about holidays and travelling",
 ["Ich war letzten Monat in Italien, es war wunderschön! Wohin bist du schon mal gereist?","I was in Italy last month, it was beautiful! Where have you travelled before?","J'étais en Italie le mois dernier, c'était magnifique ! Où es-tu déjà allé en voyage ?","كنت في إيطاليا الشهر الماضي، وكانت رائعة! إلى أين سافرت من قبل؟"]),
NT("weg","🗺️",LVAB,"Nach dem Weg fragen",["Asking the way","Demander son chemin","السؤال عن الطريق"],"asking for directions in a German city; Lena is a helpful passer-by and uses Sie",
 ["Sie sehen ein bisschen verloren aus. Kann ich Ihnen helfen? Wohin möchten Sie denn?","You look a little lost. Can I help you? Where do you want to go?","Vous avez l'air un peu perdu. Je peux vous aider ? Où voulez-vous aller ?","تبدو تائهاً قليلاً. هل أستطيع مساعدتك؟ إلى أين تريد أن تذهب؟"]),
NT("party","🎉",LVAB,"Eine Party planen",["Planning a party","Organiser une fête","التخطيط لحفلة"],"planning a birthday party together with a friend",
 ["Nächsten Samstag habe ich Geburtstag und ich möchte eine Party machen! Hilfst du mir? Was brauchen wir?","It's my birthday next Saturday and I want to have a party! Will you help me? What do we need?","Samedi prochain, c'est mon anniversaire et je veux faire une fête ! Tu m'aides ? De quoi avons-nous besoin ?","عيد ميلادي السبت القادم وأريد أن أقيم حفلة! هل تساعدني؟ ماذا نحتاج؟"]),
NT("hotel","🏨",LVAB,"Im Hotel",["At the hotel","À l'hôtel","في الفندق"],"checking in at a hotel and asking about it; Lena is the receptionist and uses Sie",
 ["Guten Tag und willkommen in unserem Hotel! Haben Sie eine Reservierung?","Hello and welcome to our hotel! Do you have a reservation?","Bonjour et bienvenue dans notre hôtel ! Vous avez une réservation ?","نهارك سعيد وأهلاً بك في فندقنا! هل لديك حجز؟"]),
NT("termin","📞",LVAB,"Einen Termin machen",["Making an appointment","Prendre rendez-vous","حجز موعد"],"making a doctor's appointment on the phone; Lena is the receptionist of the practice and uses Sie",
 ["Praxis Dr. Weber, Sie sprechen mit Lena Schmidt. Was kann ich für Sie tun?","Dr. Weber's practice, you're speaking with Lena Schmidt. What can I do for you?","Cabinet du docteur Weber, Lena Schmidt à l'appareil. Que puis-je faire pour vous ?","عيادة الدكتور فيبر، معك لينا شميت. كيف أستطيع مساعدتك؟"]),
NT("bewerbung","💼",LVB,"Vorstellungsgespräch",["Job interview","Entretien d'embauche","مقابلة عمل"],"a job interview; Lena works in HR, is friendly but professional and uses Sie",
 ["Guten Tag, schön, dass Sie da sind! Erzählen Sie mir doch zuerst ein bisschen über sich und warum Sie sich bei uns beworben haben.","Hello, nice that you could come! First, tell me a bit about yourself and why you applied with us.","Bonjour, ravie que vous soyez là ! Parlez-moi d'abord un peu de vous et de la raison pour laquelle vous avez postulé chez nous.","نهارك سعيد، يسعدني حضورك! حدّثني أولاً قليلاً عن نفسك ولماذا تقدّمت للعمل لدينا."]),
NT("reklamation","🧾",LVB,"Eine Reklamation",["Making a complaint","Faire une réclamation","تقديم شكوى"],"complaining about a faulty online order; Lena works in customer service and uses Sie",
 ["Guten Tag, Kundenservice, mein Name ist Lena. Sie hatten ein Problem mit Ihrer Bestellung? Was ist denn passiert?","Hello, customer service, my name is Lena. You had a problem with your order? What happened?","Bonjour, service client, je m'appelle Lena. Vous avez eu un problème avec votre commande ? Que s'est-il passé ?","نهارك سعيد، خدمة العملاء، اسمي لينا. هل واجهت مشكلة في طلبك؟ ماذا حدث؟"]),
NT("nachbarn","🏠",LVB,"Ärger mit den Nachbarn",["Trouble with neighbours","Problèmes de voisinage","مشاكل مع الجيران"],"two young neighbours discussing a noisy neighbour and what to do about it",
 ["Hey, hast du gestern Abend auch die laute Musik gehört? Ich konnte bis zwei Uhr nicht schlafen. Was meinst du, sollen wir mit den Nachbarn reden?","Hey, did you hear the loud music last night too? I couldn't sleep until two o'clock. What do you think, should we talk to the neighbours?","Dis, tu as aussi entendu la musique forte hier soir ? Je n'ai pas pu dormir avant deux heures. Tu en penses quoi, on devrait parler aux voisins ?","مرحباً، هل سمعت أنت أيضاً الموسيقى العالية مساء أمس؟ لم أستطع النوم حتى الساعة الثانية. ما رأيك، هل نتحدث مع الجيران؟"]),
NT("gesund","🥗",LVB,"Gesund leben",["Healthy living","Vivre sainement","حياة صحية"],"chatting with a friend about sport, food, sleep and staying healthy",
 ["Ich habe beschlossen, jeden Morgen joggen zu gehen, aber ehrlich gesagt fällt es mir schwer. Wie hältst du dich eigentlich fit?","I decided to go jogging every morning, but honestly it's hard for me. How do you actually keep fit?","J'ai décidé d'aller courir tous les matins, mais honnêtement, j'ai du mal. Et toi, comment tu restes en forme ?","قررت أن أركض كل صباح، لكن بصراحة الأمر صعب عليّ. كيف تحافظ أنت على لياقتك؟"]),
NT("medien","📱",LVB,"Handy & soziale Medien",["Phones & social media","Téléphone et réseaux sociaux","الهاتف ووسائل التواصل"],"chatting with a friend about smartphones, screen time and social media",
 ["Ich habe gestern gemerkt, dass ich fast fünf Stunden am Handy war! Wie viel Zeit verbringst du so mit sozialen Medien?","Yesterday I noticed I spent almost five hours on my phone! How much time do you spend on social media?","Hier, j'ai remarqué que j'avais passé presque cinq heures sur mon téléphone ! Tu passes combien de temps sur les réseaux sociaux ?","لاحظت أمس أنني قضيت قرابة خمس ساعات على الهاتف! كم من الوقت تقضي على وسائل التواصل الاجتماعي؟"]),
NT("amt","🏛️",LVB,"Auf dem Amt",["At the registry office","À la mairie","في الدائرة الحكومية"],"registering a new address at the Bürgeramt; Lena is the official and uses Sie",
 ["Guten Morgen! Sie möchten Ihre neue Wohnung anmelden? Haben Sie Ihren Pass und den Mietvertrag dabei?","Good morning! You'd like to register your new flat? Do you have your passport and the rental contract with you?","Bonjour ! Vous souhaitez déclarer votre nouveau logement ? Vous avez votre passeport et votre contrat de location ?","صباح الخير! هل تريد تسجيل شقتك الجديدة؟ هل معك جواز سفرك وعقد الإيجار؟"]),
NT("ausbildung","🎓",LVB,"Studium & Ausbildung",["Studies & training","Études et formation","الدراسة والتكوين المهني"],"chatting with a friend about school, university, vocational training and career plans",
 ["Ich überlege gerade, ob ich noch einen Master machen oder lieber anfangen soll zu arbeiten. Was hast du eigentlich gelernt oder studiert?","I'm wondering whether to do a master's or start working instead. What did you actually train in or study?","Je me demande si je devrais faire un master ou plutôt commencer à travailler. Et toi, qu'est-ce que tu as étudié ou appris comme métier ?","أفكر حالياً هل أكمل الماجستير أم أبدأ العمل. ماذا درست أنت أو ما المهنة التي تعلّمتها؟"]),
NT("stadtland","🏙️",LVB2,"Stadt oder Land?",["City or countryside?","Ville ou campagne ?","المدينة أم الريف؟"],"a friendly debate about living in the city or in the countryside; Lena has her own opinions and likes to argue a little",
 ["Ich spiele ernsthaft mit dem Gedanken, aus der Stadt aufs Land zu ziehen. Mehr Ruhe, weniger Miete, aber auch weniger Kultur. Wo würdest du lieber leben, und warum?","I'm seriously toying with the idea of moving from the city to the countryside. More peace, lower rent, but also less culture. Where would you rather live, and why?","J'envisage sérieusement de quitter la ville pour la campagne. Plus de calme, un loyer plus bas, mais aussi moins de culture. Où préférerais-tu vivre, et pourquoi ?","أفكر جدياً في الانتقال من المدينة إلى الريف. هدوء أكثر وإيجار أقل، لكن ثقافة أقل أيضاً. أين تفضّل أن تعيش، ولماذا؟"]),
NT("klima","🌍",LVB2,"Klima & Umwelt",["Climate & environment","Climat et environnement","المناخ والبيئة"],"a discussion between friends about climate change, personal responsibility and politics",
 ["Neulich habe ich gelesen, dass immer mehr Menschen aufs Fliegen verzichten. Findest du, dass jeder Einzelne etwas fürs Klima tun sollte, oder ist das vor allem Aufgabe der Politik?","I recently read that more and more people are giving up flying. Do you think every individual should do something for the climate, or is that mainly the job of politics?","J'ai lu récemment que de plus en plus de gens renoncent à l'avion. Tu penses que chacun devrait agir pour le climat, ou c'est surtout le rôle des politiques ?","قرأت مؤخراً أن عدداً متزايداً من الناس يتخلّون عن السفر بالطائرة. هل ترى أن على كل فرد أن يفعل شيئاً من أجل المناخ، أم أن هذه مهمة السياسة أساساً؟"]),
NT("homeoffice","💻",LVB2,"Arbeitswelt & Homeoffice",["Work life & home office","Monde du travail et télétravail","عالم العمل والعمل من المنزل"],"a discussion between friends about modern work, home office and work-life balance",
 ["Seit ich nur noch im Homeoffice arbeite, vermisse ich manchmal meine Kollegen, obwohl ich viel produktiver bin. Wie stellst du dir den perfekten Arbeitsplatz vor?","Since I've been working only from home, I sometimes miss my colleagues, although I'm much more productive. What does the perfect workplace look like to you?","Depuis que je travaille uniquement en télétravail, mes collègues me manquent parfois, même si je suis beaucoup plus productive. Comment imagines-tu le lieu de travail idéal ?","منذ أن أصبحت أعمل من المنزل فقط، أفتقد زملائي أحياناً، رغم أنني أكثر إنتاجية بكثير. كيف تتخيّل مكان العمل المثالي؟"]),
NT("ki","🤖",LVB2,"Künstliche Intelligenz",["Artificial intelligence","Intelligence artificielle","الذكاء الاصطناعي"],"a discussion between friends about artificial intelligence in everyday life, its chances and risks",
 ["Mein Bruder lässt inzwischen fast alle E-Mails von einer KI schreiben. Ich finde das praktisch, aber auch ein bisschen unheimlich. Wie stehst du dazu?","My brother now has an AI write almost all his emails. I find it practical, but also a little creepy. How do you feel about it?","Mon frère fait désormais écrire presque tous ses e-mails par une IA. Je trouve ça pratique, mais aussi un peu inquiétant. Qu'en penses-tu ?","أخي صار يترك الذكاء الاصطناعي يكتب له كل رسائله الإلكترونية تقريباً. أجد ذلك عملياً، لكنه مخيف بعض الشيء أيضاً. ما رأيك في ذلك؟"]),
NT("kultur","🌐",LVB2,"Kulturunterschiede",["Cultural differences","Différences culturelles","الفروق الثقافية"],"chatting with a friend about cultural differences, habits and surprises abroad and in Germany",
 ["Als ich zum ersten Mal in Spanien war, hat mich überrascht, wie spät dort zu Abend gegessen wird. Welche kulturellen Unterschiede sind dir in Deutschland aufgefallen?","When I was in Spain for the first time, I was surprised how late people eat dinner there. Which cultural differences have you noticed in Germany?","La première fois que je suis allée en Espagne, j'ai été surprise de voir à quelle heure tardive on y dîne. Quelles différences culturelles as-tu remarquées en Allemagne ?","عندما زرت إسبانيا لأول مرة، فاجأني كم يتأخر الناس هناك في تناول العشاء. ما الفروق الثقافية التي لاحظتها في ألمانيا؟"]),
NT("gehalt","🤝",LVB2,"Gehalt verhandeln",["Negotiating a salary","Négocier son salaire","التفاوض على الراتب"],"negotiating a pay rise; Lena is the learner's boss, polite but demanding, and uses Sie",
 ["Sie wollten mit mir über Ihr Gehalt sprechen. Ich höre Ihnen gern zu: Warum finden Sie, dass Sie eine Gehaltserhöhung verdient haben?","You wanted to talk to me about your salary. I'm happy to listen: why do you think you deserve a raise?","Vous vouliez me parler de votre salaire. Je vous écoute : pourquoi pensez-vous mériter une augmentation ?","أردت التحدث معي عن راتبك. أنا أستمع إليك: لماذا ترى أنك تستحق زيادة في الراتب؟"])
);
/* new topics have no fixed reply ideas: Lena's AI writes three for her first line */
let ideasRun=0;
async function lxIdeas(){
  const s=scen(),o=state.msgs[0];if(!s||s.id==="frei"||!o||o.role!=="bot"||(state.ideas&&state.ideas.length)||!AI.key())return;
  const run=++ideasRun;state.ideasBusy=true;renderIdeas();
  try{
    const r=await aiJSON(`A learner of German at CEFR level ${state.level} is practising this situation with Lena: ${s.desc}. Lena just said: "${o.de}"

${LVGUIDE[state.level]||""}

Give 3 short, different answers the learner could say next, in flawless German at level ${state.level}, first person (one very short, one with a detail, one asking back). Translate each into ${LANGNAME[state.lang]}.
Reply with only this JSON object: {"ideas":[{"de":"…","tr":"…"}]}`,null,{max:500,fast:true});
    if(run===ideasRun&&state.msgs[0]===o&&!state.msgs.some(m=>m.role==="user"))state.ideas=(Array.isArray(r&&r.ideas)?r.ideas:[]).filter(x=>x&&x.de).slice(0,4).map(x=>({de:String(x.de),tr:String(x.tr||"")}));
  }catch(e){}
  if(run===ideasRun&&!state.busy){state.ideasBusy=false;renderIdeas()}
}
const _resetChat=resetChat;resetChat=function(){ideasRun++;_resetChat();lxIdeas()};

/* ---------------- Lena's box: header · status line · Topics | Free talk · conversation ---------------- */
Object.assign(L.en,{lx_topics:"Topics",lx_free:"Free talk",lx_pick:"Choose a topic",lx_any:"Any topic",lx_all:"Everyday situations · all levels",lx_lv:"Topics for level",lx_listen:"Listening… just speak",lx_think:"Lena is thinking…",lx_speak:"Lena is speaking…",lx_idle:"Tap the microphone to talk",lx_surprise:"Surprise",fb_wait:"Checking your German…",fb_fail:"The correction could not load.",fb_retry:"Try again"});
Object.assign(L.fr,{lx_topics:"Thèmes",lx_free:"Discussion libre",lx_pick:"Choisir un thème",lx_any:"Tous les sujets",lx_all:"Situations du quotidien · tous niveaux",lx_lv:"Thèmes du niveau",lx_listen:"J'écoute… parlez",lx_think:"Lena réfléchit…",lx_speak:"Lena parle…",lx_idle:"Touchez le micro pour parler",lx_surprise:"Surprise",fb_wait:"Vérification de votre allemand…",fb_fail:"La correction n'a pas pu se charger.",fb_retry:"Réessayer"});
Object.assign(L.ar,{lx_topics:"المواضيع",lx_free:"حديث حر",lx_pick:"اختر موضوعاً",lx_any:"أي موضوع",lx_all:"مواقف يومية · كل المستويات",lx_lv:"مواضيع المستوى",lx_listen:"أستمع… تكلّم فقط",lx_think:"لينا تفكر…",lx_speak:"لينا تتحدث…",lx_idle:"المس الميكروفون للتحدث",lx_surprise:"مفاجأة",fb_wait:"جارٍ تصحيح جملتك…",fb_fail:"تعذّر تحميل التصحيح.",fb_retry:"أعد المحاولة"});
const LX={panel:null,warm:0};
(()=>{
  const bar=document.createElement("div");bar.className="lx-bar";
  bar.innerHTML=`<span class="lx-status" id="px-status" data-k=""><i class="dot" aria-hidden="true"></i><span id="px-status-t"></span></span>`;
  bar.appendChild(document.getElementById("hftime"));bar.appendChild(document.getElementById("hf"));
  chatTop.after(bar);
  const modes=document.createElement("div");modes.className="lx-modes";
  modes.innerHTML=["topics","free"].map(k=>`<button type="button" class="lx-tab" data-lx="${k}" aria-expanded="false" aria-pressed="false"><span class="ic" aria-hidden="true">${k==="topics"?"📚":"✨"}</span><span class="tx"><b data-i18n="lx_${k}"></b><small id="px-cur-${k}"></small></span><span class="chev" aria-hidden="true">▾</span></button>`).join("");
  bar.after(modes);
  const tp=document.createElement("div");tp.className="lx-panel";tp.id="px-topics";modes.after(tp);
  tp.after(document.getElementById("px-free"));
  const sc=document.getElementById("scen");if(sc&&sc.parentElement)sc.parentElement.hidden=true;   /* the topic list now lives in its own panel */
})();
function topicCard(s){return `<button type="button" class="lx-card" data-lxscen="${s.id}" aria-pressed="${s.id===state.scen}"><span class="em" aria-hidden="true">${s.em||"💬"}</span><span class="nm"><b lang="de">${esc(s.de)}</b><small>${esc(tr(s.t))}</small></span></button>`}
function renderTopics(){
  const box=document.getElementById("px-topics");if(LX.panel!=="topics"){box.innerHTML="";return}
  const mine=SC.filter(s=>s.lv&&s.lv.includes(state.level)),all=SC.filter(s=>!s.lv&&s.id!=="frei");
  box.innerHTML=`<div class="lx-lv"><span>${esc(t("your_level"))}</span><div class="lvl-mini">${lvlChips()}</div></div>
    <h5>${esc(t("lx_lv"))} ${state.level}</h5><div class="lx-grid">${mine.map(topicCard).join("")}</div>
    <h5>${esc(t("lx_all"))}</h5><div class="lx-grid">${all.map(topicCard).join("")}</div>`;
}
function renderModes(){
  const free=state.scen==="frei";document.querySelector(".chat").classList.toggle("lx-open",!!LX.panel);const hb=document.getElementById("hf");hb.title=hb.ariaLabel=t("hf");
  document.querySelectorAll("[data-lx]").forEach(b=>{const k=b.dataset.lx;b.setAttribute("aria-pressed",String(k==="free"?free:!free));b.setAttribute("aria-expanded",String(LX.panel===k))});
  const s=scen();
  document.getElementById("px-cur-topics").textContent=free?t("lx_pick"):`${s.em||""} ${s.de}`.trim();
  document.getElementById("px-cur-free").textContent=free&&state.topic_free!==undefined?(state.topic_free||t("lx_surprise")):t("lx_any");
}
renderFree=function(){
  document.querySelector(".chat").classList.toggle("free",state.scen==="frei");
  const box=document.getElementById("px-free");
  if(LX.panel!=="free"){box.innerHTML="";renderModes();return}
  box.innerHTML=`<div class="ft-box"><b class="ft-q">${esc(t("ft_q"))}</b>
    <form class="ft-form" id="px-ftform"><input id="px-ftin" lang="de" dir="ltr" autocomplete="off" placeholder="${esc(t("ft_ph"))}" value="${esc(state.topic_free||"")}"><button class="sendbtn">${esc(t("ft_start"))}</button></form>
    <div class="ft-chips">${FT_TOPICS.map(([de,en,fr,ar])=>`<button type="button" class="chip" data-fttopic="${esc(de)}" title="${esc({en,fr,ar}[state.lang]||en)}" lang="de">${esc(de)}</button>`).join("")}<button type="button" class="chip" data-fttopic="">${esc(t("ft_surprise"))}</button></div></div>`;
  renderModes();
};
function renderLX(){renderTopics();renderFree();lxStatus(true)}
const _startFree=startFree;startFree=function(topic){LX.panel=null;TTS.unlock();
  /* hands-free on, but the microphone waits until Lena has said her first line */
  if(state.autolisten&&SR&&AI.key()&&!state.hf&&!document.hidden){try{startHF();stopMic()}catch(e){}}
  return _startFree(topic).then(()=>{if(state.hf&&!state.lenaTalking)afterLena()})};
/* Lena reads her first line, then the microphone opens by itself */
function lenaOpen(){
  const m=state.msgs[0];if(!m||m.role!=="bot"||state.msgs.length>1)return;TTS.unlock();
  if(state.autolisten&&SR&&AI.key()&&!state.hf&&!document.hidden){try{startHF();stopMic()}catch(e){}}
  if(state.autoread||state.hf)speakThenListen(m.de);
}
function pickTopic(id){
  if(state.hf)endHF(null);TTS.stop();try{stopMic()}catch(e){}
  state.scen=id;LX.panel=null;document.getElementById("msg").value="";state.speech=null;note(null);
  renderChatSide();resetChat();lenaOpen();
}
document.addEventListener("click",e=>{
  const tb=e.target.closest("[data-lx]");
  if(tb){const k=tb.dataset.lx;LX.panel=LX.panel===k?null:k;renderLX();
    if(LX.panel==="free"){const i=document.getElementById("px-ftin");if(i&&innerWidth>=1000)i.focus()}return}
  const c=e.target.closest("[data-lxscen]");if(c){pickTopic(c.dataset.lxscen);return}
});
const _rcs=renderChatSide;renderChatSide=function(){_rcs();try{renderTopics()}catch(e){}};
/* status line: what is happening right now, so the header never has to squeeze it in */
const LXS={listen:"lx_listen",think:"lx_think",speak:"lx_speak",idle:"lx_idle"};
function lxStatus(force){
  const el=document.getElementById("px-status");if(!el)return;
  let k=document.getElementById("mic").classList.contains("rec")?"listen":state.busy?"think":state.lenaTalking?"speak":state.hf?"":"idle";
  if(!k){if(!force)return;k=el.dataset.k||"idle"}
  if(force||el.dataset.k!==k){el.dataset.k=k;document.getElementById("px-status-t").textContent=t(LXS[k])}
  /* keep the connection to the AI open while the learner talks, so the answer does not wait for a new handshake */
  if(k==="listen"&&Date.now()-LX.warm>20000&&AI.key()){LX.warm=Date.now();
    try{if(AI.prov==="gemini")fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1",{headers:{"x-goog-api-key":AI.key()}}).catch(()=>{});
      else fetch("https://api.anthropic.com/v1/models?limit=1",{headers:{"x-api-key":AI.key(),"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"}}).catch(()=>{})}catch(x){}}
}
setInterval(()=>{if(state.screen==="chat")lxStatus()},200);
["https://generativelanguage.googleapis.com","https://api.anthropic.com"].forEach(h=>document.head.insertAdjacentHTML("beforeend",`<link rel="preconnect" href="${h}" crossorigin>`));
/* the status line replaces the "listening / speaking" notes above the text box */
const _note=note;note=function(k){if(k==="hf_listen"||k==="hf_speak"||k==="mic_on")k=null;_note(k)};
/* ✕ ends the conversation and opens the topic list for the next one */
document.getElementById("px-close").removeEventListener("click",closeConversation);
document.getElementById("px-close").addEventListener("click",()=>{
  if(state.hf)endHF(null);TTS.stop();try{stopMic()}catch(e){}
  document.getElementById("msg").value="";state.speech=null;note(null);
  if(state.scen==="frei")state.topic_free=undefined;
  LX.panel=state.scen==="frei"?"free":"topics";
  resetChat();renderChatSide();renderLX();
  const p=document.getElementById(LX.panel==="free"?"px-free":"px-topics");if(p)p.scrollTop=0;
});
document.head.insertAdjacentHTML("beforeend",`<style>
.chat-main{display:flex!important;flex-direction:column}
.chat-main>.chat-body{flex:1 1 auto;min-height:0}
.chat-main>*:not(.chat-body){flex:none}
.chat.free .chat-main{grid-template-rows:none}
#px-ftbtn,#restart,.ft-mini{display:none!important}
.lx-bar{display:flex;align-items:center;gap:10px;padding:6px 14px;border-bottom:1px solid var(--line);min-height:44px}
.lx-status{display:inline-flex;align-items:center;gap:8px;flex:1 1 auto;min-width:0;font-size:.86rem;font-weight:700;color:var(--muted)}
.lx-status span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lx-status .dot{width:10px;height:10px;border-radius:50%;background:var(--line);flex:none}
.lx-status[data-k="listen"]{color:var(--ok)}.lx-status[data-k="listen"] .dot{background:var(--ok);animation:lxPulse 1.2s ease-in-out infinite}
.lx-status[data-k="think"] .dot{background:var(--accent,#f5b942);animation:lxPulse .8s ease-in-out infinite}
.lx-status[data-k="speak"]{color:var(--brand)}.lx-status[data-k="speak"] .dot{background:var(--brand);animation:lxPulse .6s ease-in-out infinite}
@keyframes lxPulse{50%{transform:scale(1.45);opacity:.55}}
.lx-bar .hftime{margin:0;flex:none;font-size:.78rem}
.lx-bar .hfbtn{flex:none!important;width:auto!important;height:32px!important;padding:0 12px!important;display:inline-flex!important;align-items:center;gap:6px;justify-content:center}
.lx-bar .hfbtn span{display:inline!important}
.lx-bar .hfbtn svg{width:16px;height:16px}
.lx-modes{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 12px;border-bottom:1px solid var(--line)}
.lx-tab{display:flex;align-items:center;gap:8px;min-width:0;padding:7px 10px;border:1.5px solid var(--line);border-radius:14px;background:var(--surface);color:var(--ink);text-align:start;font:inherit;cursor:pointer}
.lx-tab .ic{font-size:1.15rem;flex:none}
.lx-tab .tx{display:grid;min-width:0;flex:1;line-height:1.25}
.lx-tab b{font-size:.9rem}
.lx-tab small{font-size:.74rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lx-tab .chev{flex:none;font-size:.8rem;color:var(--muted);transition:transform .2s}
.lx-tab[aria-pressed="true"]{border-color:var(--brand);background:color-mix(in srgb,var(--brand) 12%,var(--surface))}
.lx-tab[aria-expanded="true"] .chev{transform:rotate(180deg)}
.lx-panel:empty{display:none}
.lx-panel{display:grid;gap:10px;padding:12px;border-bottom:1px solid var(--line);max-height:min(54dvh,480px);overflow-y:auto;background:color-mix(in srgb,var(--brand) 5%,var(--surface));animation:fadeUp .25s ease both}
.lx-panel h5{margin:2px 0 0;font-family:var(--f-mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.lx-lv{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;font-size:.88rem}
.lx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.lx-card{display:flex;align-items:center;gap:10px;min-width:0;padding:10px;border:1px solid var(--line);border-radius:14px;background:var(--surface);color:var(--ink);text-align:start;font:inherit;cursor:pointer}
.lx-card:hover{border-color:var(--brand)}
.lx-card .em{font-size:1.4rem;flex:none}
.lx-card .nm{display:grid;min-width:0;line-height:1.25}
.lx-card b{font-size:.9rem}
.lx-card small{font-size:.74rem;color:var(--muted)}
.lx-card[aria-pressed="true"]{border-color:var(--brand);box-shadow:0 0 0 2px color-mix(in srgb,var(--brand) 35%,transparent)}
#px-free{overflow-y:auto;overflow-x:hidden}#px-free .ft-box{border-bottom:0;grid-template-columns:minmax(0,1fr);align-content:start}
#px-free .ft-chips{flex-wrap:wrap!important;overflow:visible}
#px-free .ft-form .sendbtn{flex:none;white-space:nowrap}
.fb.wait{display:flex!important;align-items:center;gap:10px;opacity:.85}
.fb.wait .typing{display:inline-flex;gap:3px}
.fb.err{display:flex!important;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.lx-card b,.lx-card small{overflow-wrap:break-word;hyphens:auto}
.chat.lx-open .chat-body{display:none}
.chat.lx-open .lx-panel:not(:empty),.chat.lx-open .ftpanel:not(:empty){flex:1 1 auto!important;max-height:none;min-height:0}
.lx-panel{overflow-x:hidden}
@media (max-width:640px){.lx-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lx-card{padding:8px;gap:8px}.lx-card .em{font-size:1.2rem}.lx-card b{font-size:.84rem}.lx-bar{padding:4px 10px;gap:8px}.lx-modes{padding:6px 10px;gap:6px}
  .lx-bar .hfbtn{width:36px!important;padding:0!important}.lx-bar .hfbtn span{display:none!important}}
</style>`);

/* ---------------- reading: book pages with highlighted adjectives (English + Arabic) ---------------- */
const RD=window.RTEXTS;
const RX=(id,level,title,rt,de,tr,adj,q)=>({id,level,title,rt:{ar:rt[0],en:rt[1]},de,tr:{en:tr[0],fr:tr[1],ar:tr[2]},adj,q:mkQ(q)});
RD.push(
RX("r-einkauf","A1","Einkaufen im Supermarkt",["التسوق في السوبرماركت","Shopping at the supermarket"],
"Ich brauche Essen, also gehe ich in den Supermarkt. Der Supermarkt ist groß. Ich nehme einen Einkaufswagen am Eingang. Zuerst gehe ich zum Obst und Gemüse. Ich kaufe Äpfel, Bananen und Tomaten. Die Tomaten sind heute sehr billig. Dann brauche ich Milch, Brot und Eier. Ich suche den Reis, aber ich finde ihn nicht. Ich frage einen Mitarbeiter: „Entschuldigung, wo ist der Reis?“ Er antwortet: „Dort hinten im Regal drei.“ Ich sage danke. In meinem Einkaufswagen sind auch Käse und Fleisch. Ich habe alles. Jetzt gehe ich zur Kasse. Es sind drei Leute vor mir. Ich warte kurz. Die Kassiererin scannt meine Sachen. Sie sagt: „Das macht 42 Euro, bitte.“ Ich bezahle mit meiner Karte. Ich lege das Essen in meine Tasche. Der Einkauf ist fertig und ich gehe nach Hause. Kochen macht Spaß!",
["I need food, so I go to the supermarket. The supermarket is big. I take a shopping trolley at the entrance. First I go to the fruit and vegetables. I buy apples, bananas and tomatoes. The tomatoes are very cheap today. Then I need milk, bread and eggs. I look for the rice, but I can't find it. I ask a member of staff: “Excuse me, where is the rice?” He answers: “Back there on shelf three.” I say thank you. In my trolley there is also cheese and meat. I have everything. Now I go to the checkout. There are three people in front of me. I wait a short time. The cashier scans my things. She says: “That's 42 euros, please.” I pay with my card. I put the food in my bag. The shopping is done and I go home. Cooking is fun!",
 "J'ai besoin de nourriture, alors je vais au supermarché. Le supermarché est grand. Je prends un chariot à l'entrée. D'abord, je vais au rayon fruits et légumes. J'achète des pommes, des bananes et des tomates. Les tomates sont très bon marché aujourd'hui. Ensuite, j'ai besoin de lait, de pain et d'œufs. Je cherche le riz, mais je ne le trouve pas. Je demande à un employé : « Excusez-moi, où est le riz ? » Il répond : « Là-bas au fond, au rayon trois. » Je dis merci. Dans mon chariot, il y a aussi du fromage et de la viande. J'ai tout. Maintenant, je vais à la caisse. Il y a trois personnes devant moi. J'attends un peu. La caissière scanne mes articles. Elle dit : « Ça fait 42 euros, s'il vous plaît. » Je paie avec ma carte. Je mets les courses dans mon sac. Les courses sont finies et je rentre à la maison. Cuisiner, c'est amusant !",
 "أحتاج إلى طعام، لذلك أذهب إلى السوبرماركت. السوبرماركت كبير. آخذ عربة تسوّق عند المدخل. أولاً أذهب إلى قسم الفواكه والخضروات. أشتري تفاحاً وموزاً وطماطم. الطماطم رخيصة جداً اليوم. ثم أحتاج إلى حليب وخبز وبيض. أبحث عن الأرز، لكنني لا أجده. أسأل موظفاً: «عذراً، أين الأرز؟» فيجيب: «هناك في الخلف، في الرف رقم ثلاثة.» أقول شكراً. في عربة التسوّق الخاصة بي يوجد أيضاً جبن ولحم. لديّ كل شيء. الآن أذهب إلى الصندوق. هناك ثلاثة أشخاص أمامي. أنتظر قليلاً. تقوم الكاشيرة بمسح مشترياتي. تقول: «المجموع 42 يورو، من فضلك.» أدفع ببطاقتي. أضع الطعام في حقيبتي. انتهى التسوّق وأعود إلى البيت. الطبخ ممتع!"],
[["groß","groß","big","كبير"],["billig","billig","cheap","رخيص"],["kurz","kurz","short (briefly)","قصير (قليلاً)"],["fertig","fertig","finished, done","منتهٍ، جاهز"]],
[["Was nimmt die Person am Eingang?","Einen Einkaufswagen","Eine Tasche","Einen Korb"],["Was ist heute sehr billig?","Die Tomaten","Der Käse","Die Milch"],["Wo ist der Reis?","Im Regal drei","An der Kasse","Am Eingang"],["Wie viel kostet der Einkauf?","42 Euro","24 Euro","12 Euro"],["Wie bezahlt die Person?","Mit der Karte","Bar","Mit dem Handy"]]),
RX("r-wohnung","A1","Meine Wohnung",["شقتي","My flat"],
"Ich wohne in einer kleinen Wohnung in Berlin. Die Wohnung ist alt, aber sehr schön. Sie hat zwei Zimmer, eine Küche und ein Bad. Das Wohnzimmer ist hell und gemütlich. Dort steht ein großes, blaues Sofa. Die Küche ist klein, aber modern. Mein Schlafzimmer ist ruhig, denn das Fenster geht zum Hof. Die Miete ist nicht billig: Ich bezahle 650 Euro im Monat. Meine Nachbarn sind nett und freundlich. Ich bin glücklich hier.",
["I live in a small flat in Berlin. The flat is old, but very beautiful. It has two rooms, a kitchen and a bathroom. The living room is bright and cosy. There is a big blue sofa there. The kitchen is small, but modern. My bedroom is quiet, because the window faces the courtyard. The rent is not cheap: I pay 650 euros a month. My neighbours are nice and friendly. I am happy here.",
 "J'habite dans un petit appartement à Berlin. L'appartement est ancien, mais très beau. Il a deux pièces, une cuisine et une salle de bains. Le salon est clair et confortable. Il y a un grand canapé bleu. La cuisine est petite, mais moderne. Ma chambre est calme, car la fenêtre donne sur la cour. Le loyer n'est pas bon marché : je paie 650 euros par mois. Mes voisins sont gentils et aimables. Je suis heureux ici.",
 "أسكن في شقة صغيرة في برلين. الشقة قديمة، لكنها جميلة جداً. فيها غرفتان ومطبخ وحمّام. غرفة المعيشة مضيئة ومريحة. وفيها أريكة كبيرة زرقاء. المطبخ صغير، لكنه حديث. غرفة نومي هادئة، لأن النافذة تطل على الفناء. الإيجار ليس رخيصاً: أدفع 650 يورو في الشهر. جيراني لطفاء وودودون. أنا سعيد هنا."],
[["kleinen|klein","klein","small","صغير"],["alt","alt","old","قديم"],["schön","schön","beautiful","جميل"],["hell","hell","bright","مضيء"],["gemütlich","gemütlich","cosy","مريح"],["großes","groß","big","كبير"],["blaues","blau","blue","أزرق"],["modern","modern","modern","حديث"],["ruhig","ruhig","quiet","هادئ"],["billig","billig","cheap","رخيص"],["nett","nett","nice","لطيف"],["freundlich","freundlich","friendly","ودود"],["glücklich","glücklich","happy","سعيد"]],
[["Wo wohnt die Person?","In Berlin","In Hamburg","In München"],["Wie ist das Wohnzimmer?","Hell und gemütlich","Dunkel und kalt","Klein und laut"],["Welche Farbe hat das Sofa?","Blau","Rot","Grün"],["Warum ist das Schlafzimmer ruhig?","Das Fenster geht zum Hof.","Es hat kein Fenster.","Die Nachbarn sind im Urlaub."],["Wie viel kostet die Miete?","650 Euro im Monat","560 Euro im Monat","650 Euro in der Woche"]]),
RX("r-freund","A1","Mein bester Freund",["صديقي المفضّل","My best friend"],
"Mein bester Freund heißt Omar. Er ist 26 Jahre alt und kommt aus Marokko. Omar ist groß und schlank. Er hat kurze, schwarze Haare und braune Augen. Er ist sehr lustig und immer hilfsbereit. Omar arbeitet als Koch in einem italienischen Restaurant. Die Arbeit ist hart, aber interessant. Am Wochenende gehen wir oft zusammen ins Kino. Omar mag lange Filme, ich mag kurze Filme. Er ist ein toller Freund!",
["My best friend is called Omar. He is 26 years old and comes from Morocco. Omar is tall and slim. He has short black hair and brown eyes. He is very funny and always helpful. Omar works as a cook in an Italian restaurant. The work is hard, but interesting. At the weekend we often go to the cinema together. Omar likes long films, I like short films. He is a great friend!",
 "Mon meilleur ami s'appelle Omar. Il a 26 ans et vient du Maroc. Omar est grand et mince. Il a les cheveux courts et noirs et les yeux marron. Il est très drôle et toujours serviable. Omar travaille comme cuisinier dans un restaurant italien. Le travail est dur, mais intéressant. Le week-end, nous allons souvent au cinéma ensemble. Omar aime les films longs, moi j'aime les films courts. C'est un super ami !",
 "صديقي المفضّل اسمه عمر. عمره 26 سنة وهو من المغرب. عمر طويل ونحيف. شعره قصير وأسود وعيناه بنيّتان. هو مضحك جداً ومستعد دائماً للمساعدة. يعمل عمر طبّاخاً في مطعم إيطالي. العمل شاق لكنه ممتع. في عطلة نهاية الأسبوع نذهب كثيراً معاً إلى السينما. عمر يحب الأفلام الطويلة، وأنا أحب الأفلام القصيرة. إنه صديق رائع!"],
[["bester","gut (der beste)","best","الأفضل"],["alt","alt","old (age)","عمره / كبير في السن"],["groß","groß","tall","طويل"],["schlank","schlank","slim","نحيف"],["kurze","kurz","short","قصير"],["schwarze","schwarz","black","أسود"],["braune","braun","brown","بنّي"],["lustig","lustig","funny","مضحك"],["hilfsbereit","hilfsbereit","helpful","متعاون"],["italienischen","italienisch","Italian","إيطالي"],["hart","hart","hard","شاق، صعب"],["interessant","interessant","interesting","ممتع، مثير للاهتمام"],["lange","lang","long","طويل"],["toller","toll","great","رائع"]],
[["Woher kommt Omar?","Aus Marokko","Aus Tunesien","Aus Italien"],["Wie sind Omars Haare?","Kurz und schwarz","Lang und braun","Kurz und blond"],["Was ist Omar von Beruf?","Koch","Kellner","Lehrer"],["Wie ist die Arbeit?","Hart, aber interessant","Leicht und langweilig","Sehr gut bezahlt"],["Welche Filme mag Omar?","Lange Filme","Kurze Filme","Keine Filme"]]),
RX("r-urlaub","A2","Urlaub am Meer",["عطلة على البحر","A holiday by the sea"],
"Im Sommer war ich zwei Wochen mit meiner Familie in Spanien. Wir haben in einem kleinen Hotel direkt am Meer gewohnt. Das Zimmer war einfach, aber sauber, und wir hatten einen wunderbaren Blick auf den Strand. Jeden Morgen sind wir früh aufgestanden und im warmen Wasser geschwommen. Mittags war es oft zu heiß, deshalb haben wir im Schatten gelegen und gelesen. Das Essen war frisch und lecker, besonders der Fisch. An einem Abend haben wir ein kleines Dorf in den Bergen besucht. Die Straßen waren eng und ruhig, und die Leute waren sehr freundlich. Es war ein perfekter Urlaub!",
["In the summer I spent two weeks in Spain with my family. We stayed in a small hotel right by the sea. The room was simple but clean, and we had a wonderful view of the beach. Every morning we got up early and swam in the warm water. At midday it was often too hot, so we lay in the shade and read. The food was fresh and tasty, especially the fish. One evening we visited a small village in the mountains. The streets were narrow and quiet, and the people were very friendly. It was a perfect holiday!",
 "Cet été, j'ai passé deux semaines en Espagne avec ma famille. Nous avons logé dans un petit hôtel juste au bord de la mer. La chambre était simple, mais propre, et nous avions une vue magnifique sur la plage. Chaque matin, nous nous levions tôt et nous nagions dans l'eau chaude. À midi, il faisait souvent trop chaud, alors nous restions allongés à l'ombre et nous lisions. La nourriture était fraîche et délicieuse, surtout le poisson. Un soir, nous avons visité un petit village dans les montagnes. Les rues étaient étroites et calmes, et les gens étaient très aimables. C'étaient des vacances parfaites !",
 "في الصيف قضيت أسبوعين مع عائلتي في إسبانيا. أقمنا في فندق صغير على البحر مباشرة. كانت الغرفة بسيطة لكنها نظيفة، وكان لدينا منظر رائع على الشاطئ. كل صباح كنا نستيقظ مبكراً ونسبح في الماء الدافئ. في الظهيرة كان الجو حاراً جداً في أغلب الأحيان، لذلك كنا نستلقي في الظل ونقرأ. كان الطعام طازجاً ولذيذاً، وخاصة السمك. في إحدى الأمسيات زرنا قرية صغيرة في الجبال. كانت الشوارع ضيقة وهادئة، وكان الناس ودودين جداً. كانت عطلة مثالية!"],
[["kleinen|kleines","klein","small","صغير"],["einfach","einfach","simple","بسيط"],["sauber","sauber","clean","نظيف"],["wunderbaren","wunderbar","wonderful","رائع"],["früh","früh","early","مبكر"],["warmen","warm","warm","دافئ"],["heiß","heiß","hot","حار"],["frisch","frisch","fresh","طازج"],["lecker","lecker","tasty","لذيذ"],["eng","eng","narrow","ضيق"],["ruhig","ruhig","quiet","هادئ"],["freundlich","freundlich","friendly","ودود"],["perfekter","perfekt","perfect","مثالي"]],
[["Wie lange war die Familie in Spanien?","Zwei Wochen","Eine Woche","Einen Monat"],["Wie war das Zimmer?","Einfach, aber sauber","Groß und teuer","Klein und schmutzig"],["Was haben sie mittags gemacht?","Im Schatten gelegen und gelesen","Im Meer geschwommen","Fußball gespielt"],["Wie war das Essen?","Frisch und lecker","Teuer und schlecht","Zu scharf"],["Wie waren die Straßen im Dorf?","Eng und ruhig","Breit und laut","Neu und modern"]]),
RX("r-umzug","A2","Der Umzug",["الانتقال إلى بيت جديد","Moving house"],
"Letzten Monat bin ich in eine neue Wohnung umgezogen. Die alte Wohnung war zu klein und zu dunkel, und die Nachbarn waren oft laut. Die neue Wohnung ist größer und heller, und sie hat sogar einen Balkon. Der Umzug war allerdings sehr anstrengend. Meine Freunde haben mir geholfen, die schweren Kisten zu tragen. Leider gibt es im Haus keinen Aufzug, und ich wohne im vierten Stock! Am Abend waren wir alle müde und hungrig, deshalb haben wir Pizza bestellt. Jetzt muss ich noch neue Möbel kaufen, aber ich bin sehr zufrieden.",
["Last month I moved into a new flat. The old flat was too small and too dark, and the neighbours were often loud. The new flat is bigger and brighter, and it even has a balcony. The move was very tiring, though. My friends helped me carry the heavy boxes. Unfortunately there is no lift in the building, and I live on the fourth floor! In the evening we were all tired and hungry, so we ordered pizza. Now I still have to buy new furniture, but I am very satisfied.",
 "Le mois dernier, j'ai emménagé dans un nouvel appartement. L'ancien appartement était trop petit et trop sombre, et les voisins étaient souvent bruyants. Le nouvel appartement est plus grand et plus clair, et il a même un balcon. Le déménagement a cependant été très fatigant. Mes amis m'ont aidé à porter les cartons lourds. Malheureusement, il n'y a pas d'ascenseur dans l'immeuble, et j'habite au quatrième étage ! Le soir, nous étions tous fatigués et affamés, alors nous avons commandé des pizzas. Maintenant, je dois encore acheter de nouveaux meubles, mais je suis très content.",
 "في الشهر الماضي انتقلت إلى شقة جديدة. كانت الشقة القديمة صغيرة جداً ومظلمة جداً، وكان الجيران صاخبين في كثير من الأحيان. الشقة الجديدة أكبر وأكثر إضاءة، وفيها شرفة أيضاً. لكن الانتقال كان متعباً جداً. ساعدني أصدقائي في حمل الصناديق الثقيلة. للأسف لا يوجد مصعد في المبنى، وأنا أسكن في الطابق الرابع! في المساء كنا جميعاً متعبين وجائعين، لذلك طلبنا بيتزا. الآن ما زال عليّ أن أشتري أثاثاً جديداً، لكنني راضٍ جداً."],
[["Letzten","letzt","last","الماضي"],["neue","neu","new","جديد"],["alte","alt","old","قديم"],["klein","klein","small","صغير"],["dunkel","dunkel","dark","مظلم"],["laut","laut","loud","صاخب"],["größer","groß","bigger","أكبر"],["heller","hell","brighter","أكثر إضاءة"],["anstrengend","anstrengend","tiring","متعب"],["schweren","schwer","heavy","ثقيل"],["vierten","viert","fourth","الرابع"],["müde","müde","tired","تعبان"],["hungrig","hungrig","hungry","جائع"],["zufrieden","zufrieden","satisfied","راضٍ"]],
[["Warum ist die Person umgezogen?","Die alte Wohnung war zu klein und zu dunkel.","Die Miete war zu hoch.","Sie hat eine neue Arbeit."],["Was hat die neue Wohnung?","Einen Balkon","Einen Garten","Einen Aufzug"],["Wer hat beim Umzug geholfen?","Freunde","Die Nachbarn","Eine Umzugsfirma"],["In welchem Stock wohnt die Person?","Im vierten Stock","Im ersten Stock","Im Erdgeschoss"],["Was haben sie am Abend gegessen?","Pizza","Fisch","Salat"]]),
RX("r-geschenk","A2","Ein Geschenk für Oma",["هدية للجدة","A present for Grandma"],
"Nächste Woche hat meine Oma Geburtstag. Sie wird achtzig Jahre alt! Gestern bin ich in die Stadt gegangen, weil ich ein schönes Geschenk suchen wollte. Zuerst war ich in einem großen Kaufhaus, aber dort war alles zu teuer. Dann habe ich einen kleinen Laden mit alten Büchern gefunden. Die Verkäuferin war sehr geduldig und hat mir viel gezeigt. Am Ende habe ich ein altes Kochbuch aus dem Jahr 1960 gekauft. Es ist ein bisschen kaputt, aber die Bilder sind wunderschön. Ich glaube, Oma wird sich sehr freuen, denn sie kocht gern und liebt alte Rezepte.",
["Next week it's my grandma's birthday. She's turning eighty! Yesterday I went into town because I wanted to look for a nice present. First I was in a big department store, but everything there was too expensive. Then I found a small shop with old books. The shop assistant was very patient and showed me a lot. In the end I bought an old cookbook from 1960. It is a bit damaged, but the pictures are beautiful. I think Grandma will be very happy, because she likes cooking and loves old recipes.",
 "La semaine prochaine, c'est l'anniversaire de ma grand-mère. Elle va avoir quatre-vingts ans ! Hier, je suis allé en ville parce que je voulais chercher un beau cadeau. D'abord, j'étais dans un grand magasin, mais tout y était trop cher. Ensuite, j'ai trouvé une petite boutique de livres anciens. La vendeuse était très patiente et m'a montré beaucoup de choses. Finalement, j'ai acheté un vieux livre de cuisine de 1960. Il est un peu abîmé, mais les images sont magnifiques. Je pense que mamie sera très contente, car elle aime cuisiner et adore les vieilles recettes.",
 "في الأسبوع القادم عيد ميلاد جدتي. ستبلغ الثمانين من عمرها! ذهبت أمس إلى المدينة لأنني أردت أن أبحث عن هدية جميلة. في البداية كنت في متجر كبير، لكن كل شيء هناك كان غالياً جداً. ثم وجدت محلاً صغيراً للكتب القديمة. كانت البائعة صبورة جداً وأرتني أشياء كثيرة. في النهاية اشتريت كتاب طبخ قديماً من عام 1960. إنه تالف قليلاً، لكن الصور رائعة الجمال. أظن أن جدتي ستفرح كثيراً، لأنها تحب الطبخ وتعشق الوصفات القديمة."],
[["Nächste","nächst","next","القادم"],["alt|alten|altes|alte","alt","old","قديم، كبير في السن"],["schönes","schön","nice, beautiful","جميل"],["großen","groß","big","كبير"],["teuer","teuer","expensive","غالٍ"],["kleinen","klein","small","صغير"],["geduldig","geduldig","patient","صبور"],["kaputt","kaputt","broken, damaged","تالف، مكسور"],["wunderschön","wunderschön","beautiful","رائع الجمال"]],
[["Wie alt wird die Oma?","Achtzig Jahre","Siebzig Jahre","Neunzig Jahre"],["Warum hat die Person im Kaufhaus nichts gekauft?","Alles war zu teuer.","Das Kaufhaus war geschlossen.","Es gab keine Bücher."],["Wie war die Verkäuferin?","Sehr geduldig","Unfreundlich","Sehr müde"],["Was hat die Person gekauft?","Ein altes Kochbuch","Einen Kuchen","Blumen"],["Warum wird sich die Oma freuen?","Sie kocht gern und liebt alte Rezepte.","Sie liest gern Romane.","Sie sammelt Bilder."]]),
RX("r-ehrenamt","B1","Ehrenamtlich helfen",["التطوع لمساعدة الآخرين","Volunteering"],
"Seit zwei Jahren engagiere ich mich jeden Samstag ehrenamtlich bei der Tafel in meiner Stadt. Die Tafel sammelt Lebensmittel, die im Supermarkt nicht mehr verkauft werden, aber noch völlig in Ordnung sind, und verteilt sie an bedürftige Menschen. Am Anfang war ich ziemlich unsicher, weil ich niemanden kannte. Doch das Team war von Anfang an herzlich und offen. Die Arbeit ist manchmal körperlich anstrengend, denn die Kisten sind schwer und wir stehen stundenlang. Trotzdem fühle ich mich nach jedem Einsatz zufrieden, weil ich etwas Sinnvolles tue. Besonders wichtig finde ich die kurzen Gespräche mit den Besuchern, die oft einsam sind und sich über ein freundliches Wort freuen.",
["For two years I have been volunteering every Saturday at the food bank in my town. The food bank collects food that supermarkets can no longer sell but that is still perfectly fine, and distributes it to people in need. At first I was quite unsure, because I didn't know anyone. But the team was warm and open from the very beginning. The work is sometimes physically tiring, because the boxes are heavy and we stand for hours. Still, I feel satisfied after every shift, because I am doing something meaningful. I find the short conversations with the visitors especially important; they are often lonely and are happy about a friendly word.",
 "Depuis deux ans, je fais du bénévolat tous les samedis à la banque alimentaire de ma ville. La banque alimentaire récupère des aliments que les supermarchés ne vendent plus, mais qui sont encore parfaitement bons, et les distribue aux personnes dans le besoin. Au début, je n'étais pas très sûr de moi, parce que je ne connaissais personne. Mais l'équipe a été chaleureuse et ouverte dès le premier jour. Le travail est parfois physiquement fatigant, car les caisses sont lourdes et nous restons debout pendant des heures. Pourtant, je me sens satisfait après chaque service, parce que je fais quelque chose qui a du sens. Je trouve particulièrement importantes les courtes conversations avec les visiteurs, qui sont souvent seuls et se réjouissent d'un mot gentil.",
 "منذ سنتين أتطوع كل يوم سبت في بنك الطعام في مدينتي. يجمع بنك الطعام المواد الغذائية التي لم تعد تُباع في السوبرماركت لكنها ما زالت سليمة تماماً، ويوزعها على المحتاجين. في البداية كنت غير واثق من نفسي إلى حد ما، لأنني لم أكن أعرف أحداً. لكن الفريق كان ودوداً ومنفتحاً منذ البداية. العمل متعب جسدياً أحياناً، لأن الصناديق ثقيلة ونقف لساعات طويلة. ومع ذلك أشعر بالرضا بعد كل مرة، لأنني أفعل شيئاً ذا معنى. وأجد المحادثات القصيرة مع الزوار مهمة بشكل خاص، فهم غالباً يعيشون وحدهم ويفرحون بكلمة لطيفة."],
[["ehrenamtlich","ehrenamtlich","voluntary (as a volunteer)","تطوعي"],["völlig","völlig","completely","تماماً"],["bedürftige","bedürftig","in need","محتاج"],["unsicher","unsicher","unsure","غير واثق"],["herzlich","herzlich","warm, cordial","ودود، حار"],["offen","offen","open","منفتح"],["körperlich","körperlich","physical(ly)","جسدي"],["anstrengend","anstrengend","tiring","متعب"],["schwer","schwer","heavy","ثقيل"],["zufrieden","zufrieden","satisfied","راضٍ"],["Sinnvolles","sinnvoll","meaningful","ذو معنى"],["wichtig","wichtig","important","مهم"],["kurzen","kurz","short","قصير"],["einsam","einsam","lonely","وحيد"],["freundliches","freundlich","friendly, kind","لطيف"]],
[["Was macht die Tafel?","Sie verteilt Lebensmittel an bedürftige Menschen.","Sie verkauft billiges Essen.","Sie kocht für Touristen."],["Warum war die Person am Anfang unsicher?","Weil sie niemanden kannte.","Weil die Arbeit zu schwer war.","Weil sie kein Deutsch sprach."],["Wie war das Team?","Herzlich und offen","Streng und kühl","Müde und gestresst"],["Warum ist die Arbeit körperlich anstrengend?","Die Kisten sind schwer und man steht lange.","Man muss weit laufen.","Man arbeitet nachts."],["Was findet die Person besonders wichtig?","Die Gespräche mit den Besuchern","Das Geld","Die Pausen"]]),
RX("r-grossstadt","B1","Leben in der Großstadt",["الحياة في المدينة الكبيرة","Life in the big city"],
"Vor drei Jahren bin ich aus einem kleinen Dorf nach München gezogen. Am Anfang war ich von der Großstadt begeistert: Es gab unzählige Cafés, interessante Museen und ein lebendiges Nachtleben. Außerdem sind die öffentlichen Verkehrsmittel so gut, dass ich kein eigenes Auto mehr brauche. Mit der Zeit habe ich aber auch die Nachteile bemerkt. Die Mieten sind extrem hoch, und meine Wohnung ist deutlich kleiner als mein altes Zimmer bei meinen Eltern. Oft ist es laut und hektisch, und in der U-Bahn ist es morgens unglaublich voll. Trotzdem möchte ich nicht zurück aufs Land, denn hier habe ich viel mehr berufliche Möglichkeiten.",
["Three years ago I moved from a small village to Munich. At first I was thrilled by the big city: there were countless cafés, interesting museums and a lively nightlife. Public transport is also so good that I no longer need a car of my own. Over time, though, I noticed the disadvantages too. Rents are extremely high, and my flat is clearly smaller than my old room at my parents' house. It is often loud and hectic, and the underground is incredibly crowded in the mornings. Still, I don't want to go back to the countryside, because here I have many more career opportunities.",
 "Il y a trois ans, j'ai quitté un petit village pour Munich. Au début, j'étais enthousiasmé par la grande ville : il y avait d'innombrables cafés, des musées intéressants et une vie nocturne animée. De plus, les transports en commun sont si bons que je n'ai plus besoin de ma propre voiture. Avec le temps, j'ai aussi remarqué les inconvénients. Les loyers sont extrêmement élevés, et mon appartement est nettement plus petit que mon ancienne chambre chez mes parents. Il y a souvent du bruit et de l'agitation, et le métro est incroyablement bondé le matin. Pourtant, je ne veux pas retourner à la campagne, car ici j'ai beaucoup plus de possibilités professionnelles.",
 "قبل ثلاث سنوات انتقلت من قرية صغيرة إلى ميونخ. في البداية كنت متحمساً جداً للمدينة الكبيرة: كانت فيها مقاهٍ لا تُحصى ومتاحف مثيرة للاهتمام وحياة ليلية حيوية. كما أن المواصلات العامة جيدة لدرجة أنني لم أعد بحاجة إلى سيارة خاصة. لكن مع الوقت لاحظت العيوب أيضاً. الإيجارات مرتفعة جداً، وشقتي أصغر بكثير من غرفتي القديمة في بيت والديّ. وكثيراً ما يكون المكان صاخباً ومزدحماً بالحركة، والمترو مكتظ بشكل لا يصدق في الصباح. ومع ذلك لا أريد العودة إلى الريف، لأن لدي هنا فرصاً مهنية أكثر بكثير."],
[["kleinen|kleiner","klein","small (smaller)","صغير (أصغر)"],["begeistert","begeistert","thrilled, enthusiastic","متحمس"],["unzählige","unzählig","countless","لا يُحصى"],["interessante","interessant","interesting","مثير للاهتمام"],["lebendiges","lebendig","lively","حيوي"],["öffentlichen","öffentlich","public","عام"],["gut","gut","good","جيد"],["eigenes","eigen","own","خاص"],["hoch","hoch","high","مرتفع"],["altes","alt","old","قديم"],["laut","laut","loud","صاخب"],["hektisch","hektisch","hectic","مضطرب، محموم"],["voll","voll","full, crowded","مكتظ"],["berufliche","beruflich","professional, career","مهني"]],
[["Woher kommt die Person ursprünglich?","Aus einem kleinen Dorf","Aus Berlin","Aus dem Ausland"],["Warum braucht sie kein Auto mehr?","Die öffentlichen Verkehrsmittel sind sehr gut.","Autos sind in München verboten.","Sie wohnt neben der Arbeit."],["Was ist ein Nachteil der Stadt?","Die Mieten sind sehr hoch.","Es gibt keine Museen.","Das Nachtleben ist langweilig."],["Wie ist die U-Bahn morgens?","Unglaublich voll","Fast leer","Sehr pünktlich"],["Warum bleibt die Person in München?","Wegen der beruflichen Möglichkeiten","Wegen der Familie","Wegen des Wetters"]]),
RX("r-essen","B1","Gesund essen",["الأكل الصحي","Eating healthily"],
"Immer mehr Menschen achten darauf, was auf ihrem Teller landet. Frisches Obst und Gemüse, Vollkornprodukte und ausreichend Wasser gelten als Grundlage einer gesunden Ernährung. Ärzte warnen dagegen vor zu viel Zucker und fettigen Fertiggerichten, weil sie das Risiko für Übergewicht erhöhen. Viele Berufstätige finden es allerdings schwierig, sich im stressigen Alltag ausgewogen zu ernähren. Eine praktische Lösung kann das sogenannte Meal Prep sein: Man kocht am Wochenende mehrere Portionen vor und nimmt sie mit zur Arbeit. Das spart nicht nur Zeit, sondern auch Geld. Wichtig ist außerdem, langsam und bewusst zu essen, statt nebenbei aufs Handy zu schauen.",
["More and more people pay attention to what ends up on their plate. Fresh fruit and vegetables, wholegrain products and enough water are considered the basis of a healthy diet. Doctors, on the other hand, warn against too much sugar and greasy ready meals, because they increase the risk of being overweight. Many working people, however, find it difficult to eat a balanced diet in their stressful everyday lives. A practical solution can be so-called meal prep: you cook several portions in advance at the weekend and take them to work. This saves not only time but also money. It is also important to eat slowly and mindfully instead of looking at your phone at the same time.",
 "De plus en plus de gens font attention à ce qu'il y a dans leur assiette. Les fruits et légumes frais, les produits complets et une quantité suffisante d'eau sont considérés comme la base d'une alimentation saine. Les médecins mettent en revanche en garde contre l'excès de sucre et les plats préparés gras, car ils augmentent le risque de surpoids. Beaucoup d'actifs trouvent toutefois difficile de manger de façon équilibrée dans un quotidien stressant. Une solution pratique peut être le « meal prep » : on prépare plusieurs portions à l'avance le week-end et on les emporte au travail. Cela fait gagner non seulement du temps, mais aussi de l'argent. Il est en outre important de manger lentement et en pleine conscience, au lieu de regarder son téléphone en même temps.",
 "يهتم عدد متزايد من الناس بما يوضع في أطباقهم. تُعدّ الفواكه والخضروات الطازجة ومنتجات الحبوب الكاملة وكمية كافية من الماء أساس التغذية الصحية. في المقابل يحذّر الأطباء من الإكثار من السكر والوجبات الجاهزة الدهنية، لأنها تزيد خطر الوزن الزائد. لكن كثيراً من العاملين يجدون صعوبة في التغذية المتوازنة وسط حياتهم اليومية المرهقة. ويمكن أن يكون ما يسمى «تحضير الوجبات مسبقاً» حلاً عملياً: تطبخ عدة حصص في عطلة نهاية الأسبوع وتأخذها معك إلى العمل. وهذا لا يوفّر الوقت فحسب، بل المال أيضاً. ومن المهم كذلك أن تأكل ببطء وبوعي بدلاً من النظر إلى الهاتف في الوقت نفسه."],
[["Frisches","frisch","fresh","طازج"],["ausreichend","ausreichend","sufficient, enough","كافٍ"],["gesunden","gesund","healthy","صحي"],["fettigen","fettig","greasy, fatty","دهني"],["schwierig","schwierig","difficult","صعب"],["stressigen","stressig","stressful","مرهق"],["ausgewogen","ausgewogen","balanced","متوازن"],["praktische","praktisch","practical","عملي"],["Wichtig","wichtig","important","مهم"],["langsam","langsam","slow(ly)","ببطء"],["bewusst","bewusst","conscious(ly), mindful(ly)","بوعي"]],
[["Was gilt als Grundlage einer gesunden Ernährung?","Frisches Obst und Gemüse, Vollkorn und Wasser","Fleisch und Süßigkeiten","Kaffee und Brot"],["Wovor warnen Ärzte?","Vor zu viel Zucker und fettigen Fertiggerichten","Vor zu viel Wasser","Vor Obst am Abend"],["Was ist das Problem vieler Berufstätiger?","Sie finden es schwierig, im stressigen Alltag ausgewogen zu essen.","Sie haben keine Küche.","Sie mögen kein Gemüse."],["Was ist Meal Prep?","Man kocht am Wochenende Portionen vor.","Man isst nur im Restaurant.","Man bestellt Essen online."],["Was soll man beim Essen nicht tun?","Nebenbei aufs Handy schauen","Langsam essen","Wasser trinken"]]),
RX("r-sprachen","B2","Was Sprachen verbinden",["ما الذي تجمعه اللغات","What languages connect"],
"Wer eine fremde Sprache lernt, erwirbt weit mehr als nur Vokabeln und Grammatikregeln. Sprachwissenschaftler betonen, dass jede Sprache eine eigene Sicht auf die Welt transportiert. So gibt es im Deutschen Begriffe wie „Fernweh“ oder „Feierabend“, die sich nur schwer in andere Sprachen übertragen lassen. Mehrsprachige Menschen berichten häufig, dass sie sich in jeder Sprache ein wenig anders fühlen – mal förmlicher, mal lockerer, mal humorvoller. Zudem deuten neuere Studien darauf hin, dass regelmäßiges Sprachenlernen das Gedächtnis trainiert und geistig flexibel hält. Entscheidend ist dabei weniger ein angeborenes Talent als vielmehr eine geduldige, kontinuierliche Beschäftigung mit der Sprache.",
["Anyone who learns a foreign language acquires far more than just vocabulary and grammar rules. Linguists stress that every language carries its own view of the world. German, for instance, has terms like “Fernweh” (longing for faraway places) or “Feierabend” (the end of the working day) that are hard to translate into other languages. Multilingual people often report that they feel slightly different in each language: sometimes more formal, sometimes more relaxed, sometimes more humorous. In addition, recent studies suggest that regular language learning trains the memory and keeps the mind flexible. What matters is not so much an innate talent as a patient, continuous engagement with the language.",
 "Celui qui apprend une langue étrangère acquiert bien plus que du vocabulaire et des règles de grammaire. Les linguistes soulignent que chaque langue véhicule sa propre vision du monde. L'allemand possède ainsi des mots comme « Fernweh » (l'envie d'ailleurs) ou « Feierabend » (la fin de la journée de travail), difficiles à traduire dans d'autres langues. Les personnes plurilingues racontent souvent qu'elles se sentent un peu différentes dans chaque langue : tantôt plus formelles, tantôt plus détendues, tantôt plus drôles. De plus, des études récentes indiquent qu'apprendre régulièrement des langues entraîne la mémoire et garde l'esprit flexible. L'essentiel n'est pas tant un talent inné qu'un travail patient et continu avec la langue.",
 "من يتعلم لغة أجنبية يكتسب أكثر بكثير من مجرد مفردات وقواعد نحوية. يؤكد علماء اللغة أن كل لغة تحمل نظرتها الخاصة إلى العالم. ففي الألمانية مثلاً كلمات مثل «Fernweh» (الحنين إلى الأماكن البعيدة) أو «Feierabend» (نهاية يوم العمل) يصعب نقلها إلى لغات أخرى. ويروي الأشخاص متعددو اللغات كثيراً أنهم يشعرون في كل لغة بأنهم مختلفون قليلاً: أحياناً أكثر رسمية، وأحياناً أكثر استرخاءً، وأحياناً أكثر مرحاً. كما تشير دراسات حديثة إلى أن تعلّم اللغات بانتظام يدرّب الذاكرة ويحافظ على مرونة الذهن. والحاسم في ذلك ليس موهبة فطرية بقدر ما هو انشغال صبور ومستمر باللغة."],
[["fremde","fremd","foreign","أجنبي"],["eigene","eigen","own","خاص"],["schwer","schwer","difficult","صعب"],["andere","ander","other","آخر"],["Mehrsprachige","mehrsprachig","multilingual","متعدد اللغات"],["förmlicher","förmlich","more formal","أكثر رسمية"],["lockerer","locker","more relaxed","أكثر استرخاءً"],["humorvoller","humorvoll","more humorous","أكثر مرحاً"],["neuere","neu","newer, recent","حديث"],["regelmäßiges","regelmäßig","regular","منتظم"],["geistig","geistig","mental(ly)","ذهني"],["flexibel","flexibel","flexible","مرن"],["Entscheidend","entscheidend","decisive, what matters","حاسم"],["angeborenes","angeboren","innate","فطري"],["geduldige","geduldig","patient","صبور"],["kontinuierliche","kontinuierlich","continuous","مستمر"]],
[["Was erwirbt man laut Text beim Sprachenlernen?","Mehr als nur Vokabeln und Grammatik","Nur neue Wörter","Vor allem bessere Noten"],["Warum werden „Fernweh“ und „Feierabend“ erwähnt?","Sie lassen sich schwer übersetzen.","Sie sind sehr alte Wörter.","Sie kommen aus dem Englischen."],["Was berichten mehrsprachige Menschen?","Sie fühlen sich in jeder Sprache etwas anders.","Sie vergessen ihre Muttersprache.","Sie träumen nur auf Deutsch."],["Was zeigen neuere Studien?","Sprachenlernen trainiert das Gedächtnis.","Sprachenlernen macht müde.","Nur Kinder können Sprachen lernen."],["Was ist laut Text entscheidend?","Geduldige, kontinuierliche Beschäftigung","Ein angeborenes Talent","Ein teurer Sprachkurs"]]),
RX("r-minimal","B2","Weniger ist mehr",["الأقل هو الأكثر","Less is more"],
"Angesichts überfüllter Kleiderschränke und wachsender Müllberge entscheiden sich immer mehr Menschen für einen minimalistischen Lebensstil. Sie trennen sich von überflüssigen Gegenständen und kaufen nur noch, was sie wirklich brauchen. Anhänger dieser Bewegung berichten, dass sie sich dadurch freier und weniger gestresst fühlen. Kritische Stimmen geben allerdings zu bedenken, dass Minimalismus häufig ein Privileg wohlhabender Menschen sei: Wer wenig Geld habe, könne es sich kaum leisten, Dinge wegzuwerfen und bei Bedarf hochwertige Produkte neu zu kaufen. Unbestritten ist jedoch, dass ein bewussterer Konsum die Umwelt entlastet, da weniger Ressourcen verbraucht und weniger Abfälle produziert werden.",
["Faced with overflowing wardrobes and growing mountains of waste, more and more people are choosing a minimalist lifestyle. They get rid of superfluous objects and only buy what they really need. Followers of this movement report that it makes them feel freer and less stressed. Critical voices, however, point out that minimalism is often a privilege of wealthy people: those with little money can hardly afford to throw things away and buy high-quality products new when needed. What is undisputed, though, is that more conscious consumption takes pressure off the environment, since fewer resources are used and less waste is produced.",
 "Face à des armoires débordantes et à des montagnes de déchets toujours plus hautes, de plus en plus de gens choisissent un mode de vie minimaliste. Ils se séparent des objets superflus et n'achètent plus que ce dont ils ont vraiment besoin. Les adeptes de ce mouvement disent se sentir ainsi plus libres et moins stressés. Des voix critiques font toutefois remarquer que le minimalisme serait souvent un privilège de personnes aisées : ceux qui ont peu d'argent pourraient difficilement se permettre de jeter des objets et d'en racheter de qualité en cas de besoin. Il est cependant incontestable qu'une consommation plus consciente soulage l'environnement, puisqu'on utilise moins de ressources et produit moins de déchets.",
 "في ظل خزائن الملابس المكتظة وجبال النفايات المتزايدة، يختار عدد متزايد من الناس أسلوب حياة قائماً على التقليل. فهم يتخلصون من الأشياء الزائدة عن الحاجة ولا يشترون إلا ما يحتاجونه فعلاً. ويقول أنصار هذه الحركة إنهم يشعرون بذلك بأنهم أكثر حرية وأقل توتراً. لكن أصواتاً ناقدة تنبّه إلى أن هذا الأسلوب كثيراً ما يكون امتيازاً للميسورين: فمن لديه مال قليل لا يستطيع أن يتخلص من الأشياء ثم يشتري منتجات عالية الجودة من جديد عند الحاجة. ولكن لا جدال في أن الاستهلاك الأكثر وعياً يخفف العبء عن البيئة، لأنه يستهلك موارد أقل وينتج نفايات أقل."],
[["überfüllter","überfüllt","overflowing, overcrowded","مكتظ"],["wachsender","wachsend","growing","متزايد"],["minimalistischen","minimalistisch","minimalist","قائم على التقليل"],["überflüssigen","überflüssig","superfluous","زائد عن الحاجة"],["freier","frei","freer","أكثر حرية"],["gestresst","gestresst","stressed","متوتر"],["Kritische","kritisch","critical","ناقد"],["wohlhabender","wohlhabend","wealthy","ميسور"],["hochwertige","hochwertig","high-quality","عالي الجودة"],["Unbestritten","unbestritten","undisputed","لا جدال فيه"],["bewussterer","bewusst","more conscious","أكثر وعياً"]],
[["Was tun Minimalisten?","Sie kaufen nur, was sie wirklich brauchen.","Sie sammeln viele Gegenstände.","Sie kaufen nur Markenkleidung."],["Wie fühlen sich Anhänger dieser Bewegung?","Freier und weniger gestresst","Einsamer","Ärmer"],["Was kritisieren manche am Minimalismus?","Er sei ein Privileg wohlhabender Menschen.","Er sei schlecht für die Umwelt.","Er sei zu teuer für Firmen."],["Welcher Punkt ist unbestritten?","Bewusster Konsum entlastet die Umwelt.","Minimalismus macht reich.","Alle Menschen sollten minimalistisch leben."],["Welche Form nutzt der Text für die Meinung der Kritiker?","Konjunktiv I","Imperativ","Perfekt"]]),
RX("r-schlaf","B2","Schlaf – unterschätzt und unverzichtbar",["النوم: مُستهان به ولا غنى عنه","Sleep: underrated and essential"],
"Obwohl wir etwa ein Drittel unseres Lebens schlafen, wird die Bedeutung des Schlafs oft unterschätzt. Dabei ist ausreichender Schlaf für zahlreiche Prozesse im Körper unverzichtbar: Während der Tiefschlafphasen werden neue Informationen im Gedächtnis gespeichert und beschädigte Zellen repariert. Wer dauerhaft zu wenig schläft, ist nicht nur müde und gereizt, sondern hat auch ein höheres Risiko für Herz-Kreislauf-Erkrankungen. Problematisch ist vor allem das blaue Licht von Bildschirmen, das die Produktion des Schlafhormons Melatonin hemmt. Experten empfehlen daher, abends auf elektronische Geräte zu verzichten und möglichst regelmäßige Schlafenszeiten einzuhalten – auch am Wochenende.",
["Although we sleep for about a third of our lives, the importance of sleep is often underestimated. Yet sufficient sleep is essential for numerous processes in the body: during the deep-sleep phases, new information is stored in the memory and damaged cells are repaired. Anyone who sleeps too little over a long period is not only tired and irritable but also has a higher risk of cardiovascular disease. The blue light from screens is particularly problematic, as it inhibits the production of the sleep hormone melatonin. Experts therefore recommend avoiding electronic devices in the evening and keeping to regular bedtimes as far as possible, even at the weekend.",
 "Bien que nous passions environ un tiers de notre vie à dormir, on sous-estime souvent l'importance du sommeil. Pourtant, un sommeil suffisant est indispensable à de nombreux processus du corps : pendant les phases de sommeil profond, les nouvelles informations sont stockées dans la mémoire et les cellules endommagées sont réparées. Celui qui dort trop peu de façon durable n'est pas seulement fatigué et irritable, il a aussi un risque plus élevé de maladies cardiovasculaires. La lumière bleue des écrans pose particulièrement problème, car elle freine la production de mélatonine, l'hormone du sommeil. Les experts recommandent donc de renoncer aux appareils électroniques le soir et de respecter autant que possible des heures de coucher régulières, même le week-end.",
 "رغم أننا نقضي نحو ثلث حياتنا في النوم، فإن أهمية النوم كثيراً ما يُستهان بها. والواقع أن النوم الكافي لا غنى عنه لعمليات عديدة في الجسم: ففي مراحل النوم العميق تُخزَّن المعلومات الجديدة في الذاكرة وتُصلَح الخلايا التالفة. ومن ينام قليلاً بشكل دائم لا يكون متعباً وسريع الانفعال فحسب، بل يكون أيضاً أكثر عرضة لأمراض القلب والدورة الدموية. والمشكلة الكبرى هي الضوء الأزرق الصادر عن الشاشات، لأنه يعيق إنتاج هرمون النوم الميلاتونين. لذلك ينصح الخبراء بالاستغناء عن الأجهزة الإلكترونية في المساء والالتزام قدر الإمكان بمواعيد نوم منتظمة، حتى في عطلة نهاية الأسبوع."],
[["ausreichender","ausreichend","sufficient","كافٍ"],["zahlreiche","zahlreich","numerous","عديد"],["unverzichtbar","unverzichtbar","essential, indispensable","لا غنى عنه"],["neue","neu","new","جديد"],["beschädigte","beschädigt","damaged","تالف"],["dauerhaft","dauerhaft","permanent(ly), long-term","دائم"],["müde","müde","tired","متعب"],["gereizt","gereizt","irritable","سريع الانفعال"],["höheres","hoch","higher","أعلى"],["Problematisch","problematisch","problematic","إشكالي"],["blaue","blau","blue","أزرق"],["elektronische","elektronisch","electronic","إلكتروني"],["regelmäßige","regelmäßig","regular","منتظم"]],
[["Welcher Teil unseres Lebens ist Schlaf?","Etwa ein Drittel","Etwa die Hälfte","Etwa ein Zehntel"],["Was passiert in den Tiefschlafphasen?","Informationen werden gespeichert und Zellen repariert.","Der Körper verbrennt viel Fett.","Man träumt am meisten."],["Welche Folge hat dauerhafter Schlafmangel?","Ein höheres Risiko für Herz-Kreislauf-Erkrankungen","Bessere Konzentration","Mehr Energie"],["Warum ist blaues Licht problematisch?","Es hemmt die Produktion von Melatonin.","Es schadet sofort den Augen.","Es macht die Haut trocken."],["Was empfehlen Experten?","Regelmäßige Schlafenszeiten einhalten","Am Wochenende lange schlafen","Abends Sport machen"]])
);
/* adjectives and title translations for the texts that were already in the app */
const R_OLD={
"r-tag":[["يومي","My day"],[["alt","alt","old (age)","عمره / كبير في السن"],["neue","neu","new","جديد"]]],
"r-party":[["دعوة","An invitation"],[["kleine","klein","small","صغير"],["Liebe","lieb","dear","عزيز"]]],
"r-hamburg":[["عطلة نهاية أسبوع في هامبورغ","A weekend in Hamburg"],[["Letztes","letzt","last","الماضي"],["schneller","schnell","faster","أسرع"],["kalt","kalt","cold","بارد"],["windig","windig","windy","عاصف"],["kleinen","klein","small","صغير"],["anstrengend","anstrengend","tiring","متعب"],["schön","schön","nice, beautiful","جميل"]]],
"r-arbeit":[["عمل جديد","A new job"],[["gut","gut","good, well","جيد"],["früh","früh","early","مبكر"],["nett","nett","nice, kind","لطيف"],["nächsten","nächst","next","القادم"]]],
"r-homeoffice":[["العمل من المنزل: نقمة أم نعمة؟","Working from home: curse or blessing?"],[["vollen","voll","full, crowded","مكتظ"],["flexibler","flexibel","more flexible","أكثر مرونة"],["einsam","einsam","lonely","وحيد"]]],
"r-beschwerde":[["شكوى","A complaint"],[["geehrte","geehrt","dear (formal)","المحترم"],["richtig","richtig","correct(ly), properly","صحيح"],["heiß","heiß","hot","ساخن"],["freundlichen","freundlich","friendly, kind","ودّي"]]],
"r-viertage":[["أسبوع العمل من أربعة أيام","The four-day week"],[["letzten","letzt","last, recent","الأخير"],["intensiv","intensiv","intensive(ly)","مكثّف"],["ausgeruhte","ausgeruht","rested","مرتاح"],["produktiver","produktiv","more productive","أكثر إنتاجية"],["krank","krank","ill","مريض"],["Erste","erst","first","الأول"],["teilnehmenden","teilnehmend","participating","مشارك"],["stabil","stabil","stable","مستقر"],["deutlich","deutlich","clear(ly)","بوضوح"],["kürzere","kurz","shorter","أقصر"]]],
"r-detox":[["التخلص من السموم الرقمية","Digital detox"],[["bewusst|bewusster","bewusst","conscious(ly), deliberate(ly)","واعٍ، عن قصد"],["ständige","ständig","constant","دائم"],["besser","gut","better","أفضل"],["digitale","digital","digital","رقمي"],["pauschal","pauschal","across the board, sweeping","بشكل مطلق"],["Entscheidend","entscheidend","decisive, what matters","حاسم"],["völlige","völlig","complete","تام"],["selbstbestimmter","selbstbestimmt","self-determined","مستقل"]]],
"r-markt":[["في السوبرماركت","At the supermarket"],[["teuer","teuer","expensive","غالٍ"],["gut","gut","good","جيد"]]],
"r-hamburg2":[["سارة وميا في هامبورغ","Sara and Mia in Hamburg"],[["Letztes","letzt","last","الماضي"],["schneller","schnell","faster","أسرع"],["billiger","billig","cheaper","أرخص"],["ganzen","ganz","whole","كامل"],["besser","gut","better","أفضل"]]],
"r-homeoffice2":[["العمل من البيت","Working from home"],[["flexibler","flexibel","more flexible","أكثر مرونة"],["leicht","leicht","easy","سهل"]]],
"r-viertage2":[["أربعة أيام عمل فقط؟","Working four days?"],[["europäischen","europäisch","European","أوروبي"],["ausgeruhte","ausgeruht","rested","مرتاح"],["produktiver","produktiv","more productive","أكثر إنتاجية"],["krank","krank","ill","مريض"],["Erste","erst","first","الأول"],["teilnehmenden","teilnehmend","participating","مشارك"],["stabil","stabil","stable","مستقر"],["deutlich","deutlich","clear(ly)","بوضوح"],["zusätzliches","zusätzlich","additional, extra","إضافي"],["möglich","möglich","possible","ممكن"]]]
};
RD.forEach(r=>{const o=R_OLD[r.id];if(o&&!r.adj){r.rt={ar:o[0][0],en:o[0][1]};r.adj=o[1]}});
RD.sort((a,b)=>lvIdx(a.level)-lvIdx(b.level));   /* keep each level's texts together (the list is filtered by level anyway) */

Object.assign(L.en,{rb_read:"Reading",rb_sub:"Read and understand",rb_trsub:"text with translation",rb_adj:"Adjectives in the text",rb_adjhint:"Tap a highlighted word to see what it means.",rb_trhide:"Hide translation",rb_trshow:"Show translation",rb_level:"Level"});
Object.assign(L.fr,{rb_read:"Lecture",rb_sub:"Lire et comprendre",rb_trsub:"texte avec traduction",rb_adj:"Les adjectifs du texte",rb_adjhint:"Touchez un mot surligné pour voir son sens.",rb_trhide:"Masquer la traduction",rb_trshow:"Afficher la traduction",rb_level:"Niveau"});
Object.assign(L.ar,{rb_read:"القراءة",rb_sub:"اقرأ وافهم",rb_trsub:"نص للقراءة مع الترجمة",rb_adj:"الصفات في النص",rb_adjhint:"المس كلمة ملوّنة لترى معناها.",rb_trhide:"إخفاء الترجمة",rb_trshow:"إظهار الترجمة",rb_level:"المستوى"});
const RB={id:null,sel:null,trl:store.get("rb_trl","ar"),hide:false};
const TRN={ar:"العربية",en:"English",fr:"Français"};
function adjText(text,adj){
  const map=new Map();(adj||[]).forEach((a,i)=>String(a[0]).split("|").forEach(f=>map.set(f.toLowerCase(),i)));
  return String(text).split(/([\p{L}]+)/u).map(seg=>{const i=map.get(seg.toLowerCase());
    return i===undefined?esc(seg):`<button type="button" class="rb-adj${RB.sel===i?" on":""}" data-adj="${i}" title="${esc(adj[i][2])} · ${esc(adj[i][3])}">${esc(seg)}</button>`}).join("");
}
renderReading=function(){
  $("r-levels").innerHTML=lvlChips();
  const texts=RD.filter(r=>r.level===state.level);
  const ri=Math.min(state.rtext[state.level]||0,texts.length-1);
  setTimeout(()=>centerChip($("r-texts")));
  $("r-texts").innerHTML=texts.map((r,i)=>`<button class="chip" data-rtext="${i}" aria-pressed="${i===ri}"><span lang="de">${esc(r.title)}</span><small>${topicDone(r.id)}/${r.q.length}</small></button>`).join("");
  const r=texts[ri];if(RB.id!==r.id){RB.id=r.id;RB.sel=null}
  const adj=r.adj||[],ans=state.answers[r.id]||{};
  const score=Object.entries(ans).filter(([qi,v])=>r.q[qi].a===v).length;
  const qs=r.q.map((q,qi)=>{
    const picked=ans[qi];const done=picked!==undefined;
    const opts=q.o.map((o,oi)=>{let c="opt";if(done&&oi===q.a)c+=" right";if(done&&oi===picked&&picked!==q.a)c+=" wrongpick";return `<button class="${c}" data-rid="${r.id}" data-q="${qi}" data-o="${oi}" ${done?"disabled":""}>${esc(o)}</button>`}).join("");
    const fb=done?(picked===q.a?`<p class="q-fb ok">✓ ${esc(t("correct"))}</p>`:`<p class="q-fb no">${esc(t("wrong"))} <span lang="de" dir="ltr">${esc(q.o[q.a])}</span></p>`):"";
    return `<div class="q${done?" done":""}${state.just===r.id+":"+qi?" just":""}"><p class="q-p de" lang="de" dir="ltr"><span class="qn">${qi+1}</span>${esc(q.p)}</p><div class="opts" lang="de" dir="ltr">${opts}</div>${fb}</div>`}).join("");
  const langs=state.lang==="fr"?["ar","en","fr"]:["ar","en"];const trl=langs.includes(RB.trl)?RB.trl:"ar";
  const s=RB.sel!=null&&adj[RB.sel];
  const pop=s?`<div class="rb-pop" role="status"><button type="button" class="say sm" data-say="${esc(s[1].split(" ")[0])}" aria-label="${esc(t("listen"))}">${SPK}</button><b lang="de" dir="ltr">${esc(s[0].split("|")[0])}</b>${s[1]!==s[0].split("|")[0].toLowerCase()?`<span class="base" lang="de" dir="ltr">(${esc(s[1])})</span>`:""}<span class="en" dir="ltr"><small class="lg">EN</small> ${esc(s[2])}</span><span class="ar" lang="ar" dir="rtl">${esc(s[3])}</span></div>`:"";
  $("r-panel").innerHTML=`<article class="rbook">
    <header class="rb-head"><div class="rb-top"><span dir="ltr">📖 Deutsch lesen</span><span lang="ar" dir="rtl">القراءة بالألمانية</span></div>
      <div class="rb-flag" aria-hidden="true"><i></i><i></i><i></i></div>
      <p class="rb-k" dir="ltr">Deutsch ${r.level} · Lesetext</p><h3 lang="de" dir="ltr">${esc(r.title)}</h3><p class="rb-sub" dir="ltr">Lesen und verstehen</p>
      ${r.rt?`<p class="rb-tt" lang="ar" dir="rtl">${esc(r.rt.ar)} – ${esc(L.ar.rb_trsub)}</p><p class="rb-tt en" dir="ltr">${esc(r.rt.en)}</p>`:""}</header>
    <div class="rb-body">
      <div class="rb-sec"><span class="rb-tag" dir="ltr">Deutsch</span><button class="tiny" data-say="${esc(r.de)}">${SPK}${esc(t("listen_text"))}</button></div>
      <p class="rb-de" lang="de" dir="ltr">${adjText(r.de,adj)}</p>
      ${pop}
      ${adj.length?`<details class="rb-adjs" open><summary><span class="dot" aria-hidden="true"></span>${esc(t("rb_adj"))} <small>· Adjektive · الصفات (${adj.length})</small></summary><p class="rb-hint">${esc(t("rb_adjhint"))}</p>
        <div class="rb-list">${adj.map((a,i)=>`<button type="button" class="rb-row${RB.sel===i?" on":""}" data-adj="${i}"><b lang="de" dir="ltr">${esc(a[0].split("|")[0])}</b><small lang="de" dir="ltr">${esc(a[1])}</small><span class="en" dir="ltr">${esc(a[2])}</span><span class="ar" lang="ar" dir="rtl">${esc(a[3])}</span></button>`).join("")}</div></details>`:""}
      <div class="rb-sec rb-trbar"><div class="rb-langs">${langs.map(k=>`<button type="button" class="rb-tag${k===trl?" on":""}" data-rbl="${k}" ${k==="ar"?'lang="ar"':""}>${TRN[k]}</button>`).join("")}</div><button type="button" class="linkbtn" data-rbhide="1">${esc(t(RB.hide?"rb_trshow":"rb_trhide"))}</button></div>
      ${RB.hide?"":`<p class="rb-tr${trl==="ar"?" ar":""}" lang="${trl}" dir="${trl==="ar"?"rtl":"ltr"}">${esc(r.tr[trl]||r.tr.en)}</p>`}
    </div>
    <footer class="rb-foot" dir="ltr"><span>Deutsch ↔ ${trl==="ar"?"Arabisch":trl==="fr"?"Französisch":"Englisch"}</span><span>Niveau ${r.level}</span></footer>
  </article>
  <div class="rqs"><div class="quiz-h"><h4>${esc(t("read_q"))}</h4><span class="score">${score} / ${r.q.length}</span>${Object.keys(ans).length?`<button class="linkbtn" data-reset="${r.id}">${esc(t("reset"))}</button>`:""}</div>${qs}</div>`;
};
document.addEventListener("click",e=>{
  if(!e.target.closest("#r-panel"))return;
  const a=e.target.closest("[data-adj]");if(a){const i=+a.dataset.adj;RB.sel=RB.sel===i?null:i;renderReading();return}
  const l=e.target.closest("[data-rbl]");if(l){RB.trl=l.dataset.rbl;RB.hide=false;store.set("rb_trl",RB.trl);renderReading();return}
  if(e.target.closest("[data-rbhide]")){RB.hide=!RB.hide;renderReading()}
});
document.head.insertAdjacentHTML("beforeend",`<style>
.rbook{--rb-peach:#f8c99a;--rb-ink:#1d2340;border-radius:22px;overflow:hidden;background:var(--surface);border:1px solid var(--line);box-shadow:var(--sh-1,0 10px 30px -18px rgba(0,0,0,.4))}
.rb-head{background:linear-gradient(160deg,#fbd7ae,var(--rb-peach));color:var(--rb-ink);padding:18px clamp(16px,4vw,32px) 20px}
.rb-top{display:flex;justify-content:space-between;align-items:center;gap:10px;font-weight:800;font-size:.95rem;padding-bottom:10px;border-bottom:1px solid rgba(29,35,64,.15)}
.rb-top [lang="ar"]{font-size:1.05rem}
.rb-flag{display:flex;width:110px;height:5px;margin:14px 0 10px}.rb-flag i{flex:1}.rb-flag i:nth-child(1){background:#1d2340}.rb-flag i:nth-child(2){background:#c8423b}.rb-flag i:nth-child(3){background:#e2b84a}
.rb-k{margin:0;font-size:.88rem;opacity:.75}
.rb-head h3{margin:2px 0 0;font-size:clamp(1.6rem,6vw,2.2rem);font-weight:800;line-height:1.15;color:var(--rb-ink)}
.rb-sub{margin:4px 0 0;opacity:.75}
.rb-tt{margin:8px 0 0;font-size:1.12rem;text-align:end}.rb-tt.en{margin-top:2px;font-size:.88rem;opacity:.7;text-align:start}
.rb-body{padding:16px clamp(16px,4vw,32px) 8px;display:grid;gap:14px}
.rb-sec{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;border-top:2px solid var(--ink);padding-top:12px}
.rb-tag{display:inline-block;background:#1d2340;color:#fbd7ae;box-shadow:0 0 0 1px rgba(251,215,174,.35);font-weight:800;border-radius:8px;padding:4px 12px;font-size:.95rem;border:0}
button.rb-tag{cursor:pointer;background:transparent;color:var(--ink);border:1.5px solid var(--line)}
button.rb-tag.on{background:#1d2340;color:#fbd7ae;border-color:#fbd7ae}
.rb-langs{display:flex;gap:6px;flex-wrap:wrap}
.rb-de{margin:0;font-size:1.12rem;line-height:1.75}
.rb-adj{display:inline;vertical-align:baseline;line-height:inherit;font:inherit;color:inherit;border:0;padding:0 2px;margin:0 -1px;border-radius:5px;cursor:pointer;background:linear-gradient(transparent 55%,color-mix(in srgb,#f0a43a 55%,transparent) 55%);font-weight:700}
.rb-adj:hover,.rb-adj.on{background:#f0a43a;color:#1d2340}
.rb-pop{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:10px 14px;border-radius:14px;background:color-mix(in srgb,#f0a43a 18%,var(--surface));border:1.5px solid #f0a43a;animation:fadeUp .2s ease both}
.rb-pop b{font-size:1.1rem}.rb-pop .lg{font-size:.7rem;font-weight:800;border:1px solid var(--line);border-radius:5px;padding:0 4px;color:var(--muted)}.rb-pop .base{color:var(--muted)}.rb-pop .ar{font-size:1.15rem;font-weight:700}
.rb-adjs{border:1px solid var(--line);border-radius:16px;padding:10px 14px;background:color-mix(in srgb,#f0a43a 6%,var(--surface))}
.rb-adjs summary{cursor:pointer;font-weight:800;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rb-adjs summary small{font-weight:600;color:var(--muted)}
.rb-adjs .dot{width:12px;height:12px;border-radius:4px;background:#f0a43a;flex:none}
.rb-hint{margin:6px 0 8px;font-size:.85rem;color:var(--muted)}
.rb-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px}
.rb-row{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"de ar" "base en";gap:0 10px;align-items:baseline;text-align:start;font:inherit;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:7px 10px;cursor:pointer}
.rb-row b{grid-area:de;color:#c9771a}.rb-row small{grid-area:base;color:var(--muted);font-size:.78rem}
.rb-row .ar{grid-area:ar;text-align:end;font-weight:700}.rb-row .en{grid-area:en;text-align:end;font-size:.85rem;color:var(--muted)}
.rb-row.on,.rb-row:hover{border-color:#f0a43a;box-shadow:0 0 0 2px color-mix(in srgb,#f0a43a 35%,transparent)}
.rb-tr{margin:0;font-size:1.02rem;line-height:1.75;color:var(--ink);opacity:.9}
.rb-tr.ar{font-size:1.2rem;line-height:2;font-style:italic;font-family:var(--f-ar,inherit)}
.rb-foot{display:flex;justify-content:space-between;padding:12px clamp(16px,4vw,32px) 16px;color:var(--muted);font-size:.88rem}
@media (max-width:640px){.rb-list{grid-template-columns:1fr}.rb-de{font-size:1.06rem}}
</style>`);

/* ---------------- free key guide: get a Gemini key in about a minute ---------------- */
Object.assign(L.en,{kg_btn:"How to get a free key (1 minute)",kg_title:"Your free key for Lena",kg_lead:"Lena needs a key from Google to think and answer. It's free, no credit card. Follow these 4 steps:",
 kg_s1:"Open Google AI Studio",kg_t1:"Tap the button below. Sign in with your Google (Gmail) account. The first time, accept the terms.",kg_open:"Open Google AI Studio ↗",
 kg_s2:"Create the key",kg_t2:"Tap the blue “Create API key” button. If it asks for a project, choose “Create API key in new project”.",
 kg_s3:"Copy the key",kg_t3:"Your key appears: a long code that starts with “AIza”. Tap the copy icon next to it.",
 kg_s4:"Paste it here",kg_t4:"Come back to Lernivo, tap “Paste”, then “Save and test”.",
 kg_paste:"Paste",kg_save:"Save and test",kg_ph:"AIza…",kg_safe:"🔒 The key is saved only on this device and sent only to Google. Don't share it with anyone.",
 kg_testing:"Testing your key…",kg_ok:"✓ It works! Lena is ready. You can start talking.",kg_bad:"✗ This key doesn't work. Copy it again from AI Studio (all of it) and paste it here.",kg_short:"That doesn't look like a Gemini key: it should start with “AIza”.",kg_net:"Saved. The key couldn't be tested right now (no internet?), Lena will try it when you talk.",kg_nopaste:"Paste didn't work here: long-press the box and choose “Paste”.",kg_close:"Close",kg_later:"Later"});
Object.assign(L.fr,{kg_btn:"Obtenir une clé gratuite (1 minute)",kg_title:"Votre clé gratuite pour Lena",kg_lead:"Lena a besoin d'une clé Google pour réfléchir et répondre. C'est gratuit, sans carte bancaire. Suivez ces 4 étapes :",
 kg_s1:"Ouvrir Google AI Studio",kg_t1:"Touchez le bouton ci-dessous. Connectez-vous avec votre compte Google (Gmail). La première fois, acceptez les conditions.",kg_open:"Ouvrir Google AI Studio ↗",
 kg_s2:"Créer la clé",kg_t2:"Touchez le bouton bleu « Create API key ». Si un projet est demandé, choisissez « Create API key in new project ».",
 kg_s3:"Copier la clé",kg_t3:"Votre clé apparaît : un long code qui commence par « AIza ». Touchez l'icône de copie à côté.",
 kg_s4:"La coller ici",kg_t4:"Revenez sur Lernivo, touchez « Coller », puis « Enregistrer et tester ».",
 kg_paste:"Coller",kg_save:"Enregistrer et tester",kg_ph:"AIza…",kg_safe:"🔒 La clé est enregistrée uniquement sur cet appareil et envoyée uniquement à Google. Ne la partagez avec personne.",
 kg_testing:"Test de votre clé…",kg_ok:"✓ Ça marche ! Lena est prête. Vous pouvez commencer à parler.",kg_bad:"✗ Cette clé ne fonctionne pas. Recopiez-la entièrement depuis AI Studio et collez-la ici.",kg_short:"Ce n'est pas une clé Gemini : elle doit commencer par « AIza ».",kg_net:"Enregistrée. La clé n'a pas pu être testée maintenant (pas d'internet ?), Lena l'essaiera quand vous parlerez.",kg_nopaste:"Le collage automatique ne marche pas ici : appuyez longuement sur la case et choisissez « Coller ».",kg_close:"Fermer",kg_later:"Plus tard"});
Object.assign(L.ar,{kg_btn:"احصل على مفتاح مجاني (دقيقة واحدة)",kg_title:"مفتاحك المجاني لِلينا",kg_lead:"تحتاج لينا إلى مفتاح من Google لكي تفكر وتجيب. إنه مجاني ولا يحتاج إلى بطاقة بنكية. اتبع هذه الخطوات الأربع:",
 kg_s1:"افتح Google AI Studio",kg_t1:"المس الزر أدناه. سجّل الدخول بحساب Google (Gmail). في المرة الأولى وافق على الشروط.",kg_open:"افتح Google AI Studio ↗",
 kg_s2:"أنشئ المفتاح",kg_t2:"المس الزر الأزرق «Create API key». إذا طُلب منك مشروع، اختر «Create API key in new project».",
 kg_s3:"انسخ المفتاح",kg_t3:"يظهر مفتاحك: رمز طويل يبدأ بـ «AIza». المس أيقونة النسخ بجانبه.",
 kg_s4:"الصقه هنا",kg_t4:"ارجع إلى Lernivo، المس «لصق» ثم «حفظ واختبار».",
 kg_paste:"لصق",kg_save:"حفظ واختبار",kg_ph:"AIza…",kg_safe:"🔒 يُحفظ المفتاح على هذا الجهاز فقط ولا يُرسل إلا إلى Google. لا تشاركه مع أحد.",
 kg_testing:"جارٍ اختبار مفتاحك…",kg_ok:"✓ يعمل! لينا جاهزة. يمكنك أن تبدأ الحديث.",kg_bad:"✗ هذا المفتاح لا يعمل. انسخه كاملاً مرة أخرى من AI Studio والصقه هنا.",kg_short:"هذا لا يبدو مفتاح Gemini: يجب أن يبدأ بـ «AIza».",kg_net:"تم الحفظ. لم نستطع اختبار المفتاح الآن (لا يوجد إنترنت؟)، ستجربه لينا عندما تتحدث.",kg_nopaste:"اللصق التلقائي لا يعمل هنا: اضغط مطولاً على الخانة واختر «لصق».",kg_close:"إغلاق",kg_later:"لاحقاً"});
/* tiny drawings of what the learner will see on Google's page */
const KG_ART=[
 `<div class="kg-mock"><div class="kg-bar"><i></i><i></i><i></i><span>aistudio.google.com</span></div><div class="kg-in"><div class="kg-g">G</div><div class="kg-line w60"></div><div class="kg-pill">Sign in</div></div></div>`,
 `<div class="kg-mock"><div class="kg-bar"><i></i><i></i><i></i><span>API keys</span></div><div class="kg-in"><div class="kg-line w80"></div><div class="kg-blue">🔑 Create API key</div><div class="kg-tap" aria-hidden="true">👆</div></div></div>`,
 `<div class="kg-mock"><div class="kg-bar"><i></i><i></i><i></i><span>API key generated</span></div><div class="kg-in"><div class="kg-key"><code>AIzaSy••••••••••••••</code><span class="kg-copy">⧉</span></div><div class="kg-tap r" aria-hidden="true">👆</div></div></div>`,
 `<div class="kg-mock wf"><div class="kg-in"><div class="kg-key"><code>AIzaSy…</code></div><div class="kg-ok">✓</div></div></div>`];
document.body.insertAdjacentHTML("beforeend",`<div class="kg-wrap" id="px-kg" hidden><div class="kg-sheet" role="dialog" aria-modal="true" aria-labelledby="px-kg-t"></div></div>`);
const KG={msg:"",cls:""};
function renderKG(){
  const box=document.querySelector("#px-kg .kg-sheet");const rtl=state.lang==="ar";
  box.setAttribute("dir",rtl?"rtl":"ltr");
  box.innerHTML=`<div class="kg-head"><h3 id="px-kg-t">🔑 ${esc(t("kg_title"))}</h3><button type="button" class="tiny iconic" data-kg="close" aria-label="${esc(t("kg_close"))}">✕</button></div>
   <p class="kg-lead">${esc(t("kg_lead"))}</p>
   <ol class="kg-steps">${[1,2,3,4].map(n=>`<li><span class="kg-n">${n}</span><div class="kg-txt"><b>${esc(t("kg_s"+n))}</b><p>${esc(t("kg_t"+n))}</p>
     ${n===1?`<a class="btn primary kg-go" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">${esc(t("kg_open"))}</a>`:""}
     ${n===4?`<div class="kg-form"><input id="px-kg-in" type="password" dir="ltr" autocomplete="off" spellcheck="false" placeholder="${esc(t("kg_ph"))}"><button type="button" class="tiny" data-kg="paste">📋 ${esc(t("kg_paste"))}</button></div>
       <button type="button" class="sendbtn kg-save" data-kg="save">${esc(t("kg_save"))}</button><p class="kg-msg ${KG.cls}" role="status">${esc(KG.msg)}</p>`:""}</div>
     <div class="kg-art" aria-hidden="true">${KG_ART[n-1]}</div></li>`).join("")}</ol>
   <p class="kg-safe">${esc(t("kg_safe"))}</p>
   <button type="button" class="linkbtn kg-later" data-kg="close">${esc(t("kg_later"))}</button>`;
}
function openKG(){KG.msg="";KG.cls="";renderKG();document.getElementById("px-kg").hidden=false;document.body.classList.add("sheet-open");store.set("kg_seen",true)}
function closeKG(){document.getElementById("px-kg").hidden=true;document.body.classList.remove("sheet-open")}
function kgMsg(k,cls){KG.msg=t(k);KG.cls=cls||"";const m=document.querySelector("#px-kg .kg-msg");if(m){m.textContent=KG.msg;m.className="kg-msg "+KG.cls}}
async function kgSave(){
  const inp=document.getElementById("px-kg-in");const v=(inp.value||"").trim().replace(/\s+/g,"");
  if(!/^AIza[\w-]{20,}$/.test(v)){kgMsg("kg_short","bad");return}
  kgMsg("kg_testing","");
  let ok=null;
  try{const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1",{headers:{"x-goog-api-key":v}});ok=r.ok?true:[400,401,403].includes(r.status)?false:null}catch(e){ok=null}
  if(ok===false){kgMsg("kg_bad","bad");return}
  store.set("ai_prov","gemini");renderKey();
  document.getElementById("keyin").value=v;
  document.getElementById("keyform").dispatchEvent(new Event("submit",{cancelable:true}));
  document.querySelector(".chat").classList.remove("cfg-open");document.getElementById("cfgbtn").setAttribute("aria-expanded","false");
  if(ok){kgMsg("kg_ok","ok");setTimeout(()=>{closeKG();if(state.screen==="chat")lenaOpen()},1400)}else kgMsg("kg_net","");
}
document.addEventListener("click",async e=>{
  if(e.target.closest("[data-keyguide]")){openKG();return}
  const k=e.target.closest("[data-kg]");if(!k)return;const a=k.dataset.kg;
  if(a==="close"){closeKG();return}
  if(a==="save"){kgSave();return}
  if(a==="paste"){const inp=document.getElementById("px-kg-in");try{const s=await navigator.clipboard.readText();if(s&&s.trim()){inp.value=s.trim();if(/^AIza/.test(inp.value)){KG.msg="";KG.cls="";const m=document.querySelector("#px-kg .kg-msg");if(m)m.textContent=""}else kgMsg("kg_short","bad")}else throw 0}catch(x){kgMsg("kg_nopaste","");inp.focus()}}
});
document.getElementById("px-kg").addEventListener("click",e=>{if(e.target.id==="px-kg")closeKG()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("px-kg").hidden)closeKG()});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="px-kg-in"){e.preventDefault();kgSave()}});
/* the guide button sits right inside the key box; it is shown for Google Gemini (the free choice) */
document.querySelector("#aikey .aitext").insertAdjacentHTML("afterend",`<button type="button" class="kg-btn" data-keyguide>🔑 <span data-i18n="kg_btn"></span></button>`);
const _renderKey=renderKey;renderKey=function(){_renderKey();const b=document.querySelector(".kg-btn");if(b)b.hidden=AI.prov!=="gemini";if(!document.getElementById("px-kg").hidden)renderKG()};
/* first visit to Lena without a key: show the guide once by itself */
const _go2=go;go=function(s,fromHash){_go2(s,fromHash);if(state.screen==="chat"&&!AI.key()&&!store.get("kg_seen",false))setTimeout(openKG,400)};
if(state.screen==="chat"&&!AI.key()&&!store.get("kg_seen",false))setTimeout(openKG,600);
const _note2=note;note=function(k){_note2(k);if((k==="no_key"||k==="bad_key")&&AI.prov==="gemini"&&document.getElementById("px-kg").hidden)setTimeout(openKG,200)};
document.head.insertAdjacentHTML("beforeend",`<style>
.kg-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:auto;max-width:100%;margin:10px 0;box-sizing:border-box;padding:12px 14px;border-radius:14px;border:0;background:var(--grad,linear-gradient(135deg,#f97362,#b44bd6));color:#fff;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 8px 20px -10px rgba(180,75,214,.7)}
.kg-wrap{position:fixed;inset:0;z-index:300;background:rgba(10,8,25,.6);backdrop-filter:blur(4px);display:grid;place-items:end center;padding:0}
.kg-wrap[hidden]{display:none}
.kg-sheet{width:min(640px,100%);max-height:92dvh;overflow-y:auto;background:var(--solid,var(--surface));color:var(--ink);border-radius:24px 24px 0 0;padding:18px 18px calc(18px + var(--sab,0px));box-shadow:0 -20px 50px -20px rgba(0,0,0,.6);animation:fadeUp .3s ease both}
@media (min-width:700px){.kg-wrap{place-items:center;padding:20px}.kg-sheet{border-radius:24px}}
.kg-head{display:flex;justify-content:space-between;align-items:center;gap:10px}
.kg-head h3{margin:0;font-family:var(--f-display);font-size:1.35rem}
.kg-lead{color:var(--muted);margin:6px 0 14px}
.kg-steps{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.kg-steps li{display:grid;grid-template-columns:auto minmax(0,1fr) 120px;gap:12px;align-items:start;padding:12px;border:1px solid var(--line);border-radius:18px;background:var(--surface)}
.kg-n{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#fff;background:var(--grad,linear-gradient(135deg,#f97362,#b44bd6))}
.kg-txt b{display:block;font-size:1.02rem}.kg-txt p{margin:4px 0 0;color:var(--muted);font-size:.92rem;line-height:1.45}
.kg-go{display:inline-flex;margin-top:10px;text-decoration:none}
.kg-form{display:flex;gap:8px;margin-top:10px}.kg-form input{flex:1;min-width:0;font:inherit;padding:10px 12px;border-radius:12px;border:1.5px solid var(--line);background:var(--paper,var(--surface));color:var(--ink)}
.kg-form input:focus{outline:none;border-color:var(--brand)}
.kg-save{margin-top:8px;width:100%;height:auto;padding:11px}
.kg-msg{margin:8px 0 0;font-weight:700;font-size:.92rem;min-height:1em}.kg-msg.ok{color:var(--ok)}.kg-msg.bad{color:var(--bad)}
.kg-safe{font-size:.85rem;color:var(--muted);margin:14px 0 4px}
.kg-later{display:block;margin:6px auto 0}
.kg-art{align-self:center}
.kg-mock{direction:ltr;border-radius:12px;overflow:hidden;background:#fff;color:#202124;border:1px solid #dadce0;font-size:.62rem;box-shadow:0 6px 14px -8px rgba(0,0,0,.4)}
.kg-bar{display:flex;align-items:center;gap:3px;padding:4px 6px;background:#f1f3f4;color:#5f6368}.kg-bar i{width:5px;height:5px;border-radius:50%;background:#c4c7c5}.kg-bar span{margin-inline-start:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kg-in{position:relative;padding:10px 8px;display:grid;gap:6px;justify-items:center;min-height:62px;align-content:center}
.kg-g{font-weight:800;font-size:1.1rem;background:linear-gradient(90deg,#4285f4,#ea4335,#fbbc05,#34a853);-webkit-background-clip:text;background-clip:text;color:transparent}
.kg-line{height:5px;border-radius:3px;background:#e8eaed}.kg-line.w60{width:60%}.kg-line.w80{width:80%}
.kg-pill{border:1px solid #1a73e8;color:#1a73e8;border-radius:10px;padding:2px 8px;font-weight:700}
.kg-blue{background:#1a73e8;color:#fff;border-radius:10px;padding:4px 8px;font-weight:700;white-space:nowrap}
.kg-key{display:flex;align-items:center;gap:4px;background:#f1f3f4;border-radius:6px;padding:3px 5px;max-width:100%}.kg-key code{font-size:.6rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kg-copy{font-size:.8rem;color:#1a73e8;font-weight:800}
.kg-tap{position:absolute;bottom:2px;right:14px;font-size:1rem;animation:kgTap 1.4s ease-in-out infinite}.kg-tap.r{right:4px}
@keyframes kgTap{50%{transform:translateY(-5px)}}
.kg-mock.wf{background:var(--paper,#f5f3ff)}.kg-ok{width:22px;height:22px;border-radius:50%;background:#1e9e5a;color:#fff;display:grid;place-items:center;font-weight:800}
@media (max-width:520px){.kg-steps li{grid-template-columns:auto minmax(0,1fr)}.kg-art{grid-column:2;max-width:200px}}
</style>`);

/* ---------------- Series "Neu in Leipzig": 12 episodes (3 per level) with questions after each episode ----------------
   Yara comes from Tunis to Leipzig. Line: [speaker, German, English, French, Arabic]. vo = recorded Piper voice per speaker. */
const CAST={
 yara:{name:"Yara",g:"f",skin:"#D9A47A",hair:"#2B1B14",style:"long",top:"#C8423B"},
 jonas:{name:"Jonas",g:"m",skin:"#F2C7A5",hair:"#C98A3B",style:"short",top:"#2E5BCC",glasses:true},
 lina:{name:"Lina",g:"f",skin:"#8D5A3B",hair:"#1F1A17",style:"curly",top:"#7A6BF0"},
 moeller:{name:"Frau Möller",g:"f",skin:"#F5D0B5",hair:"#A7A7B0",style:"bob",top:"#F5A623"},
 wagner:{name:"Dr. Wagner",g:"m",skin:"#E8B896",hair:"#6B6B6B",style:"short",top:"#F4F4F4",glasses:true,beard:true},
 krause:{name:"Herr Krause",g:"m",skin:"#F0C4A0",hair:"#3A2A1E",style:"short",top:"#D7263D",cap:true},
 emre:{name:"Herr Yilmaz",g:"m",skin:"#C68E63",hair:"#1F1A17",style:"short",top:"#3B4A6B",beard:true},
 becker:{name:"Frau Becker",g:"f",skin:"#F2C7A5",hair:"#B5651D",style:"bun",top:"#16855A"}};
const VO={yara:"f1",jonas:"m2",lina:"f2",moeller:"f2",wagner:"t",krause:"t",emre:"t",becker:"f2"};
const EP=(n,lv,bg,a,b,t,lines,q)=>({id:"ep"+n,lv,bg,ep:{n,series:"Neu in Leipzig"},t:{de:t[0],en:t[1],fr:t[2],ar:t[3]},cast:{a:CAST[a],b:CAST[b]},vo:{a:VO[a],b:VO[b]},lines,q:mkQ(q)});
const EPISODES=[
EP(1,"A1","station","yara","jonas",["Ankommen","Arriving","L'arrivée","الوصول"],[
 ["b","Hallo! Bist du Yara?","Hi! Are you Yara?","Salut ! Tu es Yara ?","مرحباً! هل أنتِ يارا؟"],
 ["a","Ja, ich bin Yara. Und du bist Jonas, oder?","Yes, I'm Yara. And you're Jonas, right?","Oui, je suis Yara. Et toi, tu es Jonas, c'est ça ?","نعم، أنا يارا. وأنت يوناس، صحيح؟"],
 ["b","Genau! Herzlich willkommen in Leipzig!","Exactly! Welcome to Leipzig!","Exactement ! Bienvenue à Leipzig !","بالضبط! أهلاً وسهلاً بكِ في لايبزيغ!"],
 ["a","Danke! Die Reise war sehr lang.","Thanks! The journey was very long.","Merci ! Le voyage était très long.","شكراً! كانت الرحلة طويلة جداً."],
 ["b","Woher kommst du?","Where are you from?","Tu viens d'où ?","من أين أنتِ؟"],
 ["a","Ich komme aus Tunesien, aus Tunis.","I'm from Tunisia, from Tunis.","Je viens de Tunisie, de Tunis.","أنا من تونس، من مدينة تونس."],
 ["b","Toll! Ist das dein Koffer?","Great! Is that your suitcase?","Super ! C'est ta valise ?","رائع! هل هذه حقيبتك؟"],
 ["a","Ja, er ist sehr schwer.","Yes, it's very heavy.","Oui, elle est très lourde.","نعم، إنها ثقيلة جداً."],
 ["b","Kein Problem, ich helfe dir. Unsere Wohnung ist nicht weit.","No problem, I'll help you. Our flat isn't far.","Pas de problème, je t'aide. Notre appartement n'est pas loin.","لا مشكلة، سأساعدك. شقتنا ليست بعيدة."],
 ["a","Super, vielen Dank!","Great, thank you so much!","Super, merci beaucoup !","رائع، شكراً جزيلاً!"]],
 [["Wo sind Yara und Jonas?","Am Bahnhof","Im Café","Im Büro"],["Woher kommt Yara?","Aus Tunesien","Aus Leipzig","Aus Marokko"],["Wie ist der Koffer?","Schwer","Klein","Neu"],["Was macht Jonas?","Er hilft Yara.","Er kauft eine Fahrkarte.","Er trinkt einen Kaffee."]]),
EP(2,"A1","flat","yara","jonas",["Die WG","The shared flat","La colocation","السكن المشترك"],[
 ["b","So, das ist unsere Wohnung.","So, this is our flat.","Alors, voici notre appartement.","حسناً، هذه شقتنا."],
 ["a","Oh, sie ist schön und hell!","Oh, it's nice and bright!","Oh, il est beau et lumineux !","أوه، إنها جميلة ومضيئة!"],
 ["b","Hier ist die Küche, und da ist das Bad.","Here's the kitchen, and there's the bathroom.","Ici, c'est la cuisine, et là, la salle de bains.","هنا المطبخ، وهناك الحمّام."],
 ["a","Und wo ist mein Zimmer?","And where's my room?","Et où est ma chambre ?","وأين غرفتي؟"],
 ["b","Dein Zimmer ist hier links. Es hat einen Balkon.","Your room is here on the left. It has a balcony.","Ta chambre est ici à gauche. Elle a un balcon.","غرفتك هنا على اليسار. فيها شرفة."],
 ["a","Wunderbar! Wohnen hier noch andere Leute?","Wonderful! Do other people live here too?","Génial ! D'autres personnes habitent ici ?","رائع! هل يسكن هنا أشخاص آخرون؟"],
 ["b","Ja, Lina wohnt auch hier. Sie arbeitet heute.","Yes, Lina lives here too. She's working today.","Oui, Lina habite aussi ici. Elle travaille aujourd'hui.","نعم، لينا تسكن هنا أيضاً. إنها تعمل اليوم."],
 ["a","Wann essen wir zusammen?","When do we eat together?","On mange ensemble quand ?","متى نأكل معاً؟"],
 ["b","Heute Abend um sieben. Ich koche Nudeln!","Tonight at seven. I'm cooking pasta!","Ce soir à sept heures. Je fais des pâtes !","الليلة في الساعة السابعة. سأطبخ المعكرونة!"],
 ["a","Lecker, ich freue mich!","Yummy, I'm looking forward to it!","Miam, j'ai hâte !","لذيذ، أنا متشوّقة!"]],
 [["Wie ist die Wohnung?","Schön und hell","Klein und dunkel","Alt und kalt"],["Was hat Yaras Zimmer?","Einen Balkon","Eine Küche","Ein Bad"],["Wer wohnt auch in der Wohnung?","Lina","Herr Yilmaz","Frau Becker"],["Was kocht Jonas heute Abend?","Nudeln","Pizza","Suppe"]]),
EP(3,"A1","shop","yara","moeller",["Beim Bäcker","At the bakery","À la boulangerie","عند الخبّاز"],[
 ["b","Guten Morgen! Was möchten Sie?","Good morning! What would you like?","Bonjour ! Qu'est-ce que vous désirez ?","صباح الخير! ماذا تريدين؟"],
 ["a","Guten Morgen! Ich möchte vier Brötchen, bitte.","Good morning! I'd like four bread rolls, please.","Bonjour ! Je voudrais quatre petits pains, s'il vous plaît.","صباح الخير! أريد أربعة أرغفة صغيرة من فضلك."],
 ["b","Gern. Sonst noch etwas?","Sure. Anything else?","Avec plaisir. Et avec ceci ?","بكل سرور. هل تريدين شيئاً آخر؟"],
 ["a","Ja, ein Croissant. Was kostet das?","Yes, a croissant. How much is it?","Oui, un croissant. Il coûte combien ?","نعم، كرواسون. كم ثمنه؟"],
 ["b","Das Croissant kostet einen Euro zwanzig.","The croissant costs one euro twenty.","Le croissant coûte un euro vingt.","ثمن الكرواسون يورو وعشرون سنتاً."],
 ["a","Gut, das nehme ich auch.","Good, I'll take that too.","Bien, je le prends aussi.","حسناً، سآخذه أيضاً."],
 ["b","Das macht zusammen drei Euro sechzig.","That's three euros sixty altogether.","Ça fait trois euros soixante en tout.","المجموع ثلاثة يوروهات وستون سنتاً."],
 ["a","Hier, bitte. Kann ich mit Karte zahlen?","Here you are. Can I pay by card?","Voilà. Je peux payer par carte ?","تفضّلي. هل يمكنني الدفع بالبطاقة؟"],
 ["b","Ja, natürlich. Schönen Tag noch!","Yes, of course. Have a nice day!","Oui, bien sûr. Bonne journée !","نعم، بالطبع. أتمنى لكِ يوماً جميلاً!"],
 ["a","Danke, Ihnen auch. Tschüss!","Thanks, you too. Bye!","Merci, à vous aussi. Au revoir !","شكراً، ولكِ أيضاً. مع السلامة!"]],
 [["Wie viele Brötchen kauft Yara?","Vier","Zwei","Sechs"],["Was kostet das Croissant?","1,20 Euro","2,40 Euro","3,60 Euro"],["Wie viel zahlt Yara zusammen?","3,60 Euro","1,20 Euro","4,00 Euro"],["Wie bezahlt Yara?","Mit Karte","Bar","Mit dem Handy"]]),
EP(4,"A2","doctor","yara","wagner",["Beim Arzt","At the doctor's","Chez le médecin","عند الطبيب"],[
 ["b","Guten Tag, Frau Haddad. Was fehlt Ihnen denn?","Hello, Ms Haddad. What seems to be the problem?","Bonjour, madame Haddad. Qu'est-ce qui ne va pas ?","نهارك سعيد يا سيدة حداد. ممّ تشكين؟"],
 ["a","Ich habe seit gestern Halsschmerzen und Fieber.","I've had a sore throat and a fever since yesterday.","J'ai mal à la gorge et de la fièvre depuis hier.","أعاني منذ أمس من ألم في الحلق وحمّى."],
 ["b","Haben Sie auch Husten?","Do you have a cough as well?","Vous toussez aussi ?","هل تسعلين أيضاً؟"],
 ["a","Ja, ein bisschen. Und ich bin sehr müde.","Yes, a little. And I'm very tired.","Oui, un peu. Et je suis très fatiguée.","نعم، قليلاً. وأنا متعبة جداً."],
 ["b","Machen Sie bitte mal den Mund auf. Der Hals ist ziemlich rot.","Please open your mouth. Your throat is quite red.","Ouvrez la bouche, s'il vous plaît. La gorge est assez rouge.","افتحي فمكِ من فضلك. الحلق أحمر إلى حدّ ما."],
 ["a","Ist es schlimm?","Is it bad?","C'est grave ?","هل الأمر خطير؟"],
 ["b","Nein, das ist eine Erkältung. Sie müssen viel trinken und sich ausruhen.","No, it's a cold. You need to drink a lot and rest.","Non, c'est un rhume. Vous devez beaucoup boire et vous reposer.","لا، إنها نزلة برد. يجب أن تشربي كثيراً وأن ترتاحي."],
 ["a","Muss ich Tabletten nehmen?","Do I have to take tablets?","Je dois prendre des comprimés ?","هل يجب أن آخذ أقراصاً؟"],
 ["b","Nehmen Sie diese Tabletten dreimal am Tag nach dem Essen.","Take these tablets three times a day after meals.","Prenez ces comprimés trois fois par jour après les repas.","خذي هذه الأقراص ثلاث مرات في اليوم بعد الأكل."],
 ["a","Kann ich morgen zum Deutschkurs gehen?","Can I go to my German course tomorrow?","Je peux aller au cours d'allemand demain ?","هل يمكنني الذهاب إلى درس الألمانية غداً؟"],
 ["b","Lieber nicht. Bleiben Sie zwei Tage zu Hause.","Better not. Stay at home for two days.","Plutôt pas. Restez deux jours à la maison.","الأفضل لا. ابقي في البيت يومين."]],
 [["Seit wann ist Yara krank?","Seit gestern","Seit einer Woche","Seit heute Morgen"],["Was hat Yara?","Eine Erkältung","Eine Grippe","Bauchschmerzen"],["Wie oft soll sie die Tabletten nehmen?","Dreimal am Tag","Einmal am Tag","Zweimal am Tag"],["Was soll Yara machen?","Zwei Tage zu Hause bleiben","Morgen zum Kurs gehen","Viel Sport machen"]]),
EP(5,"A2","cafe","yara","lina",["Pläne fürs Wochenende","Plans for the weekend","Projets pour le week-end","خطط لعطلة نهاية الأسبوع"],[
 ["b","Hast du am Samstag schon etwas vor?","Have you got any plans for Saturday?","Tu as déjà prévu quelque chose samedi ?","هل لديكِ خطط ليوم السبت؟"],
 ["a","Nein, noch nicht. Warum fragst du?","No, not yet. Why do you ask?","Non, pas encore. Pourquoi tu demandes ?","لا، ليس بعد. لماذا تسألين؟"],
 ["b","Ich möchte auf den Flohmarkt gehen. Kommst du mit?","I want to go to the flea market. Are you coming?","Je veux aller au marché aux puces. Tu viens ?","أريد الذهاب إلى سوق الأشياء المستعملة. هل تأتين معي؟"],
 ["a","Gern! Was kann man dort kaufen?","I'd love to! What can you buy there?","Avec plaisir ! Qu'est-ce qu'on peut y acheter ?","بكل سرور! ماذا يمكن أن نشتري هناك؟"],
 ["b","Alles Mögliche: alte Bücher, Kleidung, Lampen und Möbel.","All kinds of things: old books, clothes, lamps and furniture.","Plein de choses : de vieux livres, des vêtements, des lampes et des meubles.","كل شيء تقريباً: كتب قديمة وملابس ومصابيح وأثاث."],
 ["a","Ich brauche noch einen Tisch für mein Zimmer.","I still need a table for my room.","J'ai encore besoin d'une table pour ma chambre.","ما زلت أحتاج إلى طاولة لغرفتي."],
 ["b","Perfekt, da findest du bestimmt einen günstigen Tisch.","Perfect, you'll definitely find a cheap table there.","Parfait, tu trouveras sûrement une table pas chère.","ممتاز، ستجدين هناك بالتأكيد طاولة رخيصة."],
 ["a","Wann treffen wir uns?","When shall we meet?","On se retrouve à quelle heure ?","متى نلتقي؟"],
 ["b","Um zehn Uhr vor dem Café am Markt, okay?","At ten o'clock in front of the café on the market square, okay?","À dix heures devant le café sur la place du marché, d'accord ?","في الساعة العاشرة أمام المقهى في ساحة السوق، اتفقنا؟"],
 ["a","Abgemacht! Danach können wir zusammen frühstücken.","Deal! Afterwards we can have breakfast together.","Marché conclu ! Après, on pourra prendre le petit-déjeuner ensemble.","اتفقنا! بعد ذلك يمكننا أن نفطر معاً."]],
 [["Wohin möchte Lina am Samstag gehen?","Auf den Flohmarkt","Ins Kino","In den Supermarkt"],["Was braucht Yara?","Einen Tisch","Eine Lampe","Alte Bücher"],["Wann treffen sie sich?","Um zehn Uhr","Um neun Uhr","Um zwölf Uhr"],["Wo treffen sie sich?","Vor dem Café am Markt","Am Bahnhof","In der Wohnung"]]),
EP(6,"A2","station","yara","krause",["Zug verpasst!","Missed the train!","Train raté !","فاتني القطار!"],[
 ["b","Guten Tag, kann ich Ihnen helfen?","Hello, can I help you?","Bonjour, je peux vous aider ?","نهارك سعيد، هل أستطيع مساعدتكِ؟"],
 ["a","Ja, bitte. Ich habe meinen Zug nach Berlin leider verpasst.","Yes, please. Unfortunately I've missed my train to Berlin.","Oui, s'il vous plaît. J'ai malheureusement raté mon train pour Berlin.","نعم من فضلك. للأسف فاتني قطاري إلى برلين."],
 ["b","Kein Problem. Der nächste Zug fährt in vierzig Minuten.","No problem. The next train leaves in forty minutes.","Pas de problème. Le prochain train part dans quarante minutes.","لا مشكلة. القطار التالي ينطلق بعد أربعين دقيقة."],
 ["a","Kann ich mit meiner Fahrkarte fahren?","Can I travel with my ticket?","Je peux voyager avec mon billet ?","هل يمكنني السفر بتذكرتي؟"],
 ["b","Ja, Ihre Fahrkarte gilt auch für den nächsten Zug.","Yes, your ticket is also valid for the next train.","Oui, votre billet est aussi valable pour le prochain train.","نعم، تذكرتكِ صالحة أيضاً للقطار التالي."],
 ["a","Zum Glück! Von welchem Gleis fährt er ab?","Thank goodness! Which platform does it leave from?","Heureusement ! Il part de quel quai ?","الحمد لله! من أي رصيف ينطلق؟"],
 ["b","Von Gleis sieben. Aber er hat heute zehn Minuten Verspätung.","From platform seven. But it's ten minutes late today.","Du quai sept. Mais il a dix minutes de retard aujourd'hui.","من الرصيف رقم سبعة. لكنه متأخر اليوم عشر دقائق."],
 ["a","Ach so. Gibt es hier ein Café?","I see. Is there a café here?","Ah bon. Il y a un café ici ?","آه، فهمت. هل يوجد مقهى هنا؟"],
 ["b","Ja, gleich neben dem Eingang.","Yes, right next to the entrance.","Oui, juste à côté de l'entrée.","نعم، بجانب المدخل مباشرة."],
 ["a","Vielen Dank für Ihre Hilfe!","Thank you very much for your help!","Merci beaucoup pour votre aide !","شكراً جزيلاً على مساعدتك!"]],
 [["Wohin möchte Yara fahren?","Nach Berlin","Nach München","Nach Hamburg"],["Wann fährt der nächste Zug?","In vierzig Minuten","In zehn Minuten","Morgen früh"],["Muss Yara eine neue Fahrkarte kaufen?","Nein, ihre Fahrkarte gilt.","Ja, eine teure Fahrkarte.","Ja, aber sie ist billiger."],["Von welchem Gleis fährt der Zug?","Von Gleis sieben","Von Gleis zehn","Von Gleis vier"]]),
EP(7,"B1","office","yara","emre",["Das Vorstellungsgespräch","The job interview","L'entretien d'embauche","مقابلة العمل"],[
 ["b","Frau Haddad, warum möchten Sie gerade bei unserer Reiseagentur arbeiten?","Ms Haddad, why do you want to work at our travel agency in particular?","Madame Haddad, pourquoi voulez-vous travailler justement dans notre agence de voyages ?","سيدة حداد، لماذا تريدين العمل في وكالة السفر الخاصة بنا بالذات؟"],
 ["a","Ich reise selbst sehr gern, und ich habe in Tunis schon drei Jahre in einem Hotel gearbeitet.","I love travelling myself, and I've already worked in a hotel in Tunis for three years.","J'aime beaucoup voyager moi-même, et j'ai déjà travaillé trois ans dans un hôtel à Tunis.","أنا أحب السفر كثيراً، وقد عملت ثلاث سنوات في فندق في تونس."],
 ["b","Interessant. Welche Sprachen sprechen Sie?","Interesting. Which languages do you speak?","Intéressant. Quelles langues parlez-vous ?","مثير للاهتمام. ما اللغات التي تتحدثينها؟"],
 ["a","Arabisch, Französisch und Englisch, und mein Deutsch wird jeden Tag besser.","Arabic, French and English, and my German gets better every day.","L'arabe, le français et l'anglais, et mon allemand s'améliore chaque jour.","العربية والفرنسية والإنجليزية، ولغتي الألمانية تتحسّن كل يوم."],
 ["b","Das merkt man! Was sind Ihre Stärken?","That shows! What are your strengths?","Ça se voit ! Quels sont vos points forts ?","هذا واضح! ما هي نقاط قوتكِ؟"],
 ["a","Ich bin geduldig, arbeite gern im Team und bleibe auch bei Stress ruhig.","I'm patient, I like working in a team and I stay calm even under stress.","Je suis patiente, j'aime travailler en équipe et je reste calme même sous pression.","أنا صبورة، وأحب العمل ضمن فريق، وأبقى هادئة حتى تحت الضغط."],
 ["b","Und gibt es etwas, das Sie noch lernen möchten?","And is there something you would still like to learn?","Et y a-t-il quelque chose que vous aimeriez encore apprendre ?","وهل هناك شيء ما زلتِ تودّين تعلّمه؟"],
 ["a","Ja, ich möchte meine Deutschkenntnisse verbessern, besonders am Telefon.","Yes, I'd like to improve my German, especially on the phone.","Oui, je voudrais améliorer mon allemand, surtout au téléphone.","نعم، أريد تحسين لغتي الألمانية، خاصة في المكالمات الهاتفية."],
 ["b","Das ist ehrlich. Könnten Sie sich vorstellen, schon im nächsten Monat anzufangen?","That's honest. Could you imagine starting as early as next month?","C'est honnête. Pourriez-vous envisager de commencer dès le mois prochain ?","هذا صادق. هل يمكنكِ أن تبدئي العمل الشهر القادم؟"],
 ["a","Ja, sehr gern. Darauf würde ich mich freuen.","Yes, very much. I'd be delighted.","Oui, très volontiers. J'en serais ravie.","نعم، بكل سرور. سيسعدني ذلك."]],
 [["Wo möchte Yara arbeiten?","In einer Reiseagentur","In einem Hotel","In einer Bank"],["Wo hat Yara schon gearbeitet?","In einem Hotel in Tunis","In einem Café in Leipzig","In einer Schule"],["Was ist eine Stärke von Yara?","Sie bleibt bei Stress ruhig.","Sie spricht Japanisch.","Sie arbeitet lieber allein."],["Was möchte Yara noch verbessern?","Ihr Deutsch am Telefon","Ihr Englisch","Ihre Computerkenntnisse"]]),
EP(8,"B1","flat","yara","jonas",["Ärger in der WG","Trouble in the flat","Dispute dans la coloc","خلاف في السكن المشترك"],[
 ["b","Yara, hast du kurz Zeit? Ich muss mit dir über die Küche reden.","Yara, have you got a minute? I need to talk to you about the kitchen.","Yara, tu as une minute ? Je dois te parler de la cuisine.","يارا، هل لديكِ دقيقة؟ يجب أن أتحدث معكِ عن المطبخ."],
 ["a","Klar. Ist etwas passiert?","Sure. Has something happened?","Bien sûr. Il s'est passé quelque chose ?","طبعاً. هل حدث شيء؟"],
 ["b","Na ja, das Geschirr steht schon seit drei Tagen in der Spüle.","Well, the dishes have been in the sink for three days.","Eh bien, la vaisselle est dans l'évier depuis trois jours.","حسناً، الصحون موجودة في المغسلة منذ ثلاثة أيام."],
 ["a","Oh, das tut mir leid. Ich hatte diese Woche so viel Stress bei der Arbeit.","Oh, I'm sorry. I've had so much stress at work this week.","Oh, je suis désolée. J'ai eu tellement de stress au travail cette semaine.","أوه، أنا آسفة. كان لديّ ضغط كبير في العمل هذا الأسبوع."],
 ["b","Das verstehe ich, aber wir haben doch einen Putzplan gemacht.","I understand, but we did make a cleaning rota.","Je comprends, mais on a fait un planning de ménage.","أفهم ذلك، لكننا وضعنا جدولاً للتنظيف."],
 ["a","Du hast recht. Wie wäre es, wenn ich heute Abend alles sauber mache?","You're right. How about I clean everything this evening?","Tu as raison. Et si je nettoyais tout ce soir ?","معك حق. ما رأيك أن أنظف كل شيء هذا المساء؟"],
 ["b","Das wäre super. Vielleicht kaufen wir auch eine Spülmaschine?","That would be great. Maybe we could also buy a dishwasher?","Ce serait super. On pourrait peut-être aussi acheter un lave-vaisselle ?","سيكون ذلك رائعاً. ربما نشتري أيضاً غسالة صحون؟"],
 ["a","Gute Idee! Wenn wir das Geld teilen, ist sie nicht so teuer.","Good idea! If we split the cost, it won't be so expensive.","Bonne idée ! Si on partage les frais, ce ne sera pas si cher.","فكرة جيدة! إذا تقاسمنا المال فلن تكون غالية جداً."],
 ["b","Ich frage Lina, ob sie auch mitmacht.","I'll ask Lina if she wants to join in.","Je demande à Lina si elle participe aussi.","سأسأل لينا إن كانت ستشارك أيضاً."],
 ["a","Danke, dass du so offen mit mir sprichst.","Thanks for being so open with me.","Merci de me parler aussi franchement.","شكراً لأنك تتحدث معي بصراحة."]],
 [["Worüber möchte Jonas sprechen?","Über die Küche","Über die Miete","Über Linas Freund"],["Warum hat Yara nicht abgewaschen?","Sie hatte viel Stress bei der Arbeit.","Sie war im Urlaub.","Sie war krank."],["Was schlägt Yara vor?","Heute Abend alles sauber zu machen","Eine Putzhilfe zu suchen","Auszuziehen"],["Was möchten sie vielleicht kaufen?","Eine Spülmaschine","Einen Kühlschrank","Einen neuen Tisch"]]),
EP(9,"B1","flat","yara","becker",["Die Heizung ist kaputt","The heating is broken","Le chauffage est en panne","التدفئة معطّلة"],[
 ["b","Hausverwaltung Becker, guten Tag. Was kann ich für Sie tun?","Becker property management, good afternoon. What can I do for you?","Gestion immobilière Becker, bonjour. Que puis-je faire pour vous ?","إدارة العقارات بيكر، نهارك سعيد. كيف أستطيع مساعدتك؟"],
 ["a","Guten Tag, hier ist Yara Haddad aus der Goethestraße 14. Unsere Heizung funktioniert seit Montag nicht mehr.","Hello, this is Yara Haddad from Goethestraße 14. Our heating hasn't worked since Monday.","Bonjour, ici Yara Haddad, du 14 Goethestraße. Notre chauffage ne marche plus depuis lundi.","نهارك سعيد، معك يارا حداد من شارع غوته رقم 14. التدفئة عندنا لا تعمل منذ يوم الاثنين."],
 ["b","Oh, das ist unangenehm. Ist die ganze Wohnung kalt?","Oh, that's unpleasant. Is the whole flat cold?","Oh, c'est désagréable. Tout l'appartement est froid ?","أوه، هذا مزعج. هل الشقة كلها باردة؟"],
 ["a","Ja, besonders das Bad. Gestern waren es nur fünfzehn Grad.","Yes, especially the bathroom. Yesterday it was only fifteen degrees.","Oui, surtout la salle de bains. Hier, il faisait seulement quinze degrés.","نعم، خاصة الحمّام. أمس كانت درجة الحرارة خمس عشرة درجة فقط."],
 ["b","Ich schicke Ihnen so schnell wie möglich einen Techniker.","I'll send you a technician as quickly as possible.","Je vous envoie un technicien le plus vite possible.","سأرسل إليكم فنياً في أسرع وقت ممكن."],
 ["a","Wann könnte er denn kommen?","When could he come?","Quand pourrait-il venir ?","متى يمكنه أن يأتي؟"],
 ["b","Morgen zwischen acht und zwölf Uhr. Ist dann jemand zu Hause?","Tomorrow between eight and twelve. Will someone be at home then?","Demain entre huit heures et midi. Il y aura quelqu'un à la maison ?","غداً بين الساعة الثامنة والثانية عشرة. هل سيكون أحد في البيت؟"],
 ["a","Ja, mein Mitbewohner ist den ganzen Vormittag da.","Yes, my flatmate is there all morning.","Oui, mon colocataire est là toute la matinée.","نعم، زميلي في السكن موجود طوال الصباح."],
 ["b","Gut, dann trage ich den Termin ein. Entschuldigen Sie bitte die Unannehmlichkeiten.","Good, then I'll book the appointment. I'm sorry for the inconvenience.","Bien, je note le rendez-vous. Veuillez excuser le désagrément.","حسناً، سأسجّل الموعد إذن. نعتذر عن الإزعاج."],
 ["a","Kein Problem, vielen Dank für die schnelle Hilfe.","No problem, thank you for the quick help.","Pas de problème, merci pour votre aide rapide.","لا مشكلة، شكراً جزيلاً على المساعدة السريعة."]],
 [["Was ist das Problem?","Die Heizung funktioniert nicht.","Das Fenster ist kaputt.","Die Nachbarn sind laut."],["Seit wann gibt es das Problem?","Seit Montag","Seit gestern","Seit einer Woche"],["Wann kommt der Techniker?","Morgen zwischen acht und zwölf Uhr","Heute Abend","Am Wochenende"],["Wer ist zu Hause, wenn der Techniker kommt?","Yaras Mitbewohner","Yara","Niemand"]]),
EP(10,"B2","office","yara","emre",["Ein Gespräch mit dem Chef","A talk with the boss","Une discussion avec le chef","حديث مع المدير"],[
 ["a","Herr Yilmaz, hätten Sie einen Moment Zeit? Ich würde gern etwas mit Ihnen besprechen.","Mr Yilmaz, would you have a moment? I'd like to discuss something with you.","Monsieur Yilmaz, auriez-vous un moment ? J'aimerais discuter de quelque chose avec vous.","سيد يلماز، هل لديك لحظة؟ أودّ أن أناقش معك أمراً ما."],
 ["b","Natürlich, setzen Sie sich. Worum geht es denn?","Of course, have a seat. What's it about?","Bien sûr, asseyez-vous. De quoi s'agit-il ?","بالطبع، تفضّلي بالجلوس. ما الموضوع؟"],
 ["a","Seit ich im Team bin, habe ich gemerkt, dass ich zu Hause deutlich konzentrierter arbeite.","Since joining the team, I've noticed that I work much more efficiently at home.","Depuis que je suis dans l'équipe, j'ai remarqué que je suis nettement plus concentrée à la maison.","منذ انضمامي إلى الفريق لاحظت أنني أعمل في البيت بتركيز أكبر بكثير."],
 ["b","Sie denken also an Homeoffice?","So you're thinking about working from home?","Vous pensez donc au télétravail ?","إذن تفكرين في العمل من المنزل؟"],
 ["a","Genau. Ich würde gern zwei Tage pro Woche von zu Hause aus arbeiten, vorausgesetzt, das passt für das Team.","Exactly. I'd like to work from home two days a week, provided that works for the team.","Exactement. J'aimerais travailler deux jours par semaine depuis chez moi, à condition que ça convienne à l'équipe.","بالضبط. أودّ أن أعمل يومين في الأسبوع من البيت، بشرط أن يناسب ذلك الفريق."],
 ["b","Grundsätzlich bin ich offen dafür. Allerdings sind die Kundentermine meistens montags und dienstags.","In principle I'm open to it. However, client meetings are mostly on Mondays and Tuesdays.","En principe, j'y suis ouvert. Cependant, les rendez-vous clients ont lieu surtout le lundi et le mardi.","من حيث المبدأ أنا منفتح على ذلك. لكن مواعيد العملاء تكون غالباً يومي الاثنين والثلاثاء."],
 ["a","Das verstehe ich. Wie wäre es, wenn ich mittwochs und freitags zu Hause bliebe?","I understand. How would it be if I stayed at home on Wednesdays and Fridays?","Je comprends. Et si je restais à la maison le mercredi et le vendredi ?","أفهم ذلك. ما رأيك لو بقيت في البيت يومي الأربعاء والجمعة؟"],
 ["b","Das klingt vernünftig. Lassen Sie es uns zunächst drei Monate ausprobieren.","That sounds reasonable. Let's try it out for three months first.","Ça paraît raisonnable. Essayons d'abord pendant trois mois.","يبدو هذا معقولاً. لنجرّب ذلك أولاً لمدة ثلاثة أشهر."],
 ["a","Das ist ein fairer Vorschlag. Ich werde Ihnen regelmäßig berichten, wie es läuft.","That's a fair suggestion. I'll report to you regularly on how it's going.","C'est une proposition équitable. Je vous tiendrai régulièrement au courant.","هذا اقتراح عادل. سأبلغك بانتظام كيف تسير الأمور."],
 ["b","Prima. Dann schicke ich Ihnen die Vereinbarung bis Ende der Woche.","Great. Then I'll send you the agreement by the end of the week.","Parfait. Je vous envoie l'accord d'ici la fin de la semaine.","ممتاز. سأرسل إليكِ الاتفاق قبل نهاية الأسبوع."]],
 [["Was möchte Yara?","Zwei Tage pro Woche im Homeoffice arbeiten","Mehr Gehalt bekommen","Das Team wechseln"],["Warum möchte sie das?","Sie arbeitet zu Hause konzentrierter.","Sie wohnt sehr weit weg.","Sie ist oft krank."],["Warum passen Montag und Dienstag nicht?","Dann sind meistens Kundentermine.","Dann ist das Büro geschlossen.","Dann hat Herr Yilmaz Urlaub."],["Was schlägt Herr Yilmaz vor?","Eine Testphase von drei Monaten","Sofort jeden Tag Homeoffice","Erst im nächsten Jahr"]]),
EP(11,"B2","cafe","yara","jonas",["Streitgespräch: soziale Medien","Debate: social media","Débat : les réseaux sociaux","نقاش: وسائل التواصل الاجتماعي"],[
 ["b","Hast du gelesen? In manchen Ländern wird diskutiert, soziale Medien für Kinder unter sechzehn zu verbieten.","Did you read that? Some countries are discussing banning social media for children under sixteen.","Tu as lu ? Dans certains pays, on discute d'interdire les réseaux sociaux aux moins de seize ans.","هل قرأت؟ في بعض الدول يجري النقاش حول منع وسائل التواصل الاجتماعي للأطفال دون السادسة عشرة."],
 ["a","Ja, und ehrlich gesagt finde ich das gar nicht so falsch.","Yes, and honestly, I don't think that's wrong at all.","Oui, et franchement, je ne trouve pas ça si faux.","نعم، وبصراحة لا أرى ذلك خطأً على الإطلاق."],
 ["b","Wirklich? Ich halte ein Verbot für übertrieben. Jugendliche sollten lernen, verantwortungsvoll damit umzugehen.","Really? I think a ban is excessive. Young people should learn to use it responsibly.","Vraiment ? Je trouve une interdiction exagérée. Les jeunes devraient apprendre à s'en servir de façon responsable.","حقاً؟ أرى أن المنع مبالغ فيه. يجب أن يتعلّم الشباب استخدامها بمسؤولية."],
 ["a","Das stimmt schon, aber die Apps sind gerade darauf ausgelegt, dass man nicht aufhören kann.","That's true, but the apps are designed precisely so that you can't stop.","C'est vrai, mais les applis sont justement conçues pour qu'on ne puisse pas s'arrêter.","هذا صحيح، لكن التطبيقات مصمّمة تحديداً بحيث لا يستطيع المرء التوقف."],
 ["b","Trotzdem: Wenn man etwas verbietet, wird es für Jugendliche erst recht interessant.","Still: if you ban something, it becomes all the more interesting for young people.","Quand même : si on interdit quelque chose, ça devient encore plus intéressant pour les jeunes.","ومع ذلك: عندما تمنع شيئاً يصبح أكثر إثارة للشباب."],
 ["a","Da ist was dran. Vielleicht wäre es sinnvoller, Medienkompetenz schon in der Schule zu unterrichten.","There's something in that. Maybe it would make more sense to teach media literacy at school.","Il y a du vrai là-dedans. Ce serait peut-être plus utile d'enseigner l'éducation aux médias dès l'école.","في كلامك شيء من الصحة. ربما يكون من الأجدى تعليم الثقافة الإعلامية في المدرسة."],
 ["b","Genau das meine ich! Und die Eltern müssten mit gutem Beispiel vorangehen.","That's exactly what I mean! And parents would have to set a good example.","C'est exactement ce que je veux dire ! Et les parents devraient montrer l'exemple.","هذا بالضبط ما أقصده! ويجب على الآباء أن يكونوا قدوة حسنة."],
 ["a","Wobei viele Eltern selbst ständig am Handy hängen.","Although many parents are glued to their phones themselves.","Sauf que beaucoup de parents sont eux-mêmes collés à leur téléphone.","مع أن كثيراً من الآباء أنفسهم لا يتركون هواتفهم."],
 ["b","Touché. Da sollten wir uns vielleicht alle an die eigene Nase fassen.","Touché. Maybe we should all take a hard look at ourselves.","Touché. On devrait peut-être tous balayer devant notre porte.","معك حق. ربما يجب أن ننظر جميعاً إلى أنفسنا أولاً."],
 ["a","Also: Handys weg, und wir bestellen noch einen Kaffee?","So: phones away, and shall we order another coffee?","Alors : on range les portables et on commande encore un café ?","إذن: نبعد الهواتف ونطلب قهوة أخرى؟"]],
 [["Worüber diskutieren Jonas und Yara?","Über ein Verbot sozialer Medien für Kinder","Über neue Handys","Über ihre Arbeit"],["Was hält Jonas von einem Verbot?","Er findet es übertrieben.","Er findet es sehr gut.","Er hat keine Meinung."],["Was schlägt Yara vor?","Medienkompetenz in der Schule zu unterrichten","Handys ganz zu verbieten","Apps teurer zu machen"],["Was bedeutet „sich an die eigene Nase fassen“?","Zuerst das eigene Verhalten kritisch sehen","Eine Erkältung haben","Jemanden beleidigen"]]),
EP(12,"B2","street","yara","lina",["Ein Jahr in Leipzig","A year in Leipzig","Un an à Leipzig","عام في لايبزيغ"],[
 ["b","Kaum zu glauben, dass du schon ein Jahr in Leipzig bist!","Hard to believe you've already been in Leipzig for a year!","Difficile de croire que tu es déjà à Leipzig depuis un an !","يصعب تصديق أنكِ في لايبزيغ منذ عام كامل!"],
 ["a","Ja, die Zeit ist wie im Flug vergangen. Weißt du noch, wie nervös ich am Anfang war?","Yes, time has flown. Do you remember how nervous I was at the beginning?","Oui, le temps a filé. Tu te souviens comme j'étais nerveuse au début ?","نعم، مرّ الوقت بسرعة البرق. هل تتذكرين كم كنت متوترة في البداية؟"],
 ["b","Und ob! Du hast dich nicht einmal getraut, beim Bäcker zu bestellen.","And how! You didn't even dare to order at the bakery.","Et comment ! Tu n'osais même pas commander à la boulangerie.","وكيف لا! لم تجرئي حتى على الطلب عند الخبّاز."],
 ["a","Stimmt, heute kann ich mir das kaum noch vorstellen.","True, today I can hardly imagine that.","C'est vrai, aujourd'hui j'ai du mal à l'imaginer.","صحيح، اليوم بالكاد أستطيع تصوّر ذلك."],
 ["b","Was war für dich eigentlich die größte Herausforderung?","What was actually the biggest challenge for you?","Au fond, quel a été le plus grand défi pour toi ?","ما الذي كان في الحقيقة أكبر تحدٍّ بالنسبة لكِ؟"],
 ["a","Ehrlich gesagt nicht die Grammatik, sondern der Mut, Fehler zu machen und trotzdem weiterzusprechen.","Honestly, not the grammar, but the courage to make mistakes and keep talking anyway.","Honnêtement, pas la grammaire, mais le courage de faire des erreurs et de continuer à parler quand même.","بصراحة ليست القواعد، بل الشجاعة على ارتكاب الأخطاء ومواصلة الكلام رغم ذلك."],
 ["b","Das hast du hervorragend gemeistert. Würdest du es wieder genauso machen?","You mastered that brilliantly. Would you do it all the same way again?","Tu as brillamment relevé ce défi. Tu referais tout pareil ?","لقد نجحتِ في ذلك ببراعة. هل كنتِ ستفعلين الشيء نفسه مرة أخرى؟"],
 ["a","Auf jeden Fall, obwohl ich meine Familie natürlich oft vermisse.","Definitely, although of course I often miss my family.","Absolument, même si ma famille me manque souvent, bien sûr.","بالتأكيد، رغم أنني أشتاق إلى عائلتي كثيراً بالطبع."],
 ["b","Und was hast du dir für das nächste Jahr vorgenommen?","And what have you set yourself for next year?","Et qu'est-ce que tu t'es fixé pour l'année prochaine ?","وما الذي تنوين فعله في العام القادم؟"],
 ["a","Ich möchte die C1-Prüfung bestehen und endlich ein bisschen Sächsisch verstehen!","I want to pass the C1 exam and finally understand a bit of the Saxon dialect!","Je veux réussir l'examen C1 et enfin comprendre un peu le saxon !","أريد أن أنجح في امتحان C1 وأن أفهم أخيراً قليلاً من اللهجة الساكسونية!"],
 ["b","Na dann, viel Erfolg! Darauf stoßen wir an.","Well then, good luck! Let's drink to that.","Alors, bonne chance ! Trinquons à ça.","إذن، بالتوفيق! لنشرب نخب ذلك."]],
 [["Wie lange ist Yara schon in Leipzig?","Ein Jahr","Ein halbes Jahr","Zwei Jahre"],["Was war am Anfang schwierig für Yara?","Beim Bäcker zu bestellen","Eine Wohnung zu finden","Den Zug zu nehmen"],["Was war ihre größte Herausforderung?","Den Mut zu haben, Fehler zu machen","Die Grammatik","Das Wetter"],["Was möchte Yara im nächsten Jahr schaffen?","Die C1-Prüfung bestehen","Nach Tunis zurückgehen","Eine neue Wohnung finden"]])
];
SCENES.unshift(...EPISODES);P.epBest=store.get("epBest",{});
Object.assign(L.en,{ep_series:"Series",ep_quiz:"Questions about the episode",ep_q:"Question",ep_next:"Next question",ep_res:"Result",ep_again:"Try again",ep_right:"Correct!",ep_wrong:"Not quite. The answer is:",ep_listen:"Listen to the question",ep_more:"More scenes",ep_lead:"An original story in episodes: Yara moves from Tunis to Leipzig. Watch, read along, then answer the questions."});
Object.assign(L.fr,{ep_series:"Série",ep_quiz:"Questions sur l'épisode",ep_q:"Question",ep_next:"Question suivante",ep_res:"Résultat",ep_again:"Recommencer",ep_right:"Correct !",ep_wrong:"Pas tout à fait. La réponse est :",ep_listen:"Écouter la question",ep_more:"Autres scènes",ep_lead:"Une histoire originale en épisodes : Yara quitte Tunis pour Leipzig. Regardez, lisez, puis répondez aux questions."});
Object.assign(L.ar,{ep_series:"مسلسل",ep_quiz:"أسئلة عن الحلقة",ep_q:"السؤال",ep_next:"السؤال التالي",ep_res:"النتيجة",ep_again:"أعد المحاولة",ep_right:"صحيح!",ep_wrong:"ليس تماماً. الجواب هو:",ep_listen:"استمع إلى السؤال",ep_more:"مشاهد أخرى",ep_lead:"قصة أصلية في حلقات: يارا تنتقل من تونس إلى لايبزيغ. شاهد واقرأ ثم أجب عن الأسئلة."});
/* the quiz runs inside the player, one question at a time */
const QZ={s:null,i:0,score:0,picked:null};
function quizShow(){
  const s=QZ.s,view=document.getElementById("px-st-view");const n=s.q.length;
  if(QZ.i>=n){
    const best=P.epBest&&P.epBest[s.id]||0;P.epBest=P.epBest||{};P.epBest[s.id]=Math.max(best,QZ.score);save("epBest");
    view.innerHTML=`${bgSVG(s.bg)}<div class="sc-title"><div class="end ep-res"><div style="font-size:2.6rem">${QZ.score===n?"🏆":QZ.score>=n/2?"🎉":"💪"}</div><h2>${esc(t("ep_res"))}: ${QZ.score} / ${n}</h2>
      <div class="btns"><button class="btn primary" data-pl="quiz">↺ ${esc(t("ep_again"))}</button><button class="btn" data-pl="replay" style="color:#fff;border-color:rgba(255,255,255,.4)">▶ ${esc(t("pl_replay"))}</button></div></div></div>`;
    document.getElementById("px-st-prog").style.width="100%";setSub("","");return}
  const q=s.q[QZ.i],done=QZ.picked!==null;
  view.innerHTML=`${bgSVG(s.bg)}<div class="ep-quiz"><div class="ep-card">
    <div class="ep-k">❓ ${esc(t("ep_q"))} ${QZ.i+1} / ${n}</div>
    <p class="ep-qt" lang="de" dir="ltr"><button type="button" class="say sm" data-say="${esc(q.p)}" aria-label="${esc(t("ep_listen"))}">${SPK}</button>${esc(q.p)}</p>
    <div class="ep-opts" lang="de" dir="ltr">${q.o.map((o,i)=>`<button type="button" class="ep-opt${done&&i===q.a?" right":""}${done&&i===QZ.picked&&i!==q.a?" wrong":""}" data-qz="${i}" ${done?"disabled":""}>${esc(o)}</button>`).join("")}</div>
    ${done?`<p class="ep-fb ${QZ.picked===q.a?"ok":"no"}">${QZ.picked===q.a?"✓ "+esc(t("ep_right")):esc(t("ep_wrong"))+` <b lang="de">${esc(q.o[q.a])}</b>`}</p><button type="button" class="btn primary ep-next" data-pl="qnext">${esc(QZ.i+1<n?t("ep_next"):t("ep_res"))} →</button>`:""}
  </div></div>`;
  document.getElementById("px-st-prog").style.width=Math.round(100*(QZ.i+(done?1:0))/n)+"%";setSub("","");
  if(!done)TTS.speak(q.p);
}
document.addEventListener("click",e=>{
  const pl=e.target.closest('[data-pl="quiz"],[data-pl="qnext"]');
  if(pl&&PL.ctx&&PL.ctx.q){e.stopPropagation();if(pl.dataset.pl==="quiz"){PL.run++;TTS.stop();QZ.s=PL.ctx;QZ.i=0;QZ.score=0;QZ.picked=null}else{QZ.i++;QZ.picked=null}quizShow();return}
  const o=e.target.closest("[data-qz]");if(o&&QZ.s&&QZ.picked===null){QZ.picked=+o.dataset.qz;if(QZ.picked===QZ.s.q[QZ.i].a)QZ.score++;TTS.stop();quizShow()}
},true);
/* the series sits on top of the scenes list, filtered by the same level chips */
const _renderScenes=renderScenes;renderScenes=function(){
  _renderScenes();const list=document.getElementById("px-sclist");if(!list)return;const cur=SCLV||"all";
  const eps=EPISODES.filter(s=>cur==="all"||s.lv===cur);
  list.querySelectorAll('[data-scene^="ep"]').forEach(b=>b.remove());
  if(!eps.length)return;
  list.insertAdjacentHTML("beforebegin",`<div class="ep-head" id="px-ephead"><b>📺 ${esc(t("ep_series"))}: <span lang="de">Neu in Leipzig</span></b><small>${esc(t("ep_lead"))}</small></div><div class="px-scenes ep-list" id="px-eplist">${eps.map(s=>{const best=P.epBest&&P.epBest[s.id];return `<button class="px-scene ep-scene" data-scene="${s.id}"><span class="th">${bgSVG(s.bg)}${miniCast(s)}<span class="lvt">${s.lv}</span><span class="ep-n">Folge ${s.ep.n}</span>${P.scenesSeen[s.id]?`<span class="seen">✓ ${best!=null?best+"/"+s.q.length:esc(t("sc_seen"))}</span>`:""}</span><span class="meta"><b lang="de">${esc(s.t.de)}</b><small>${esc(tr(s.t))} · ${s.lines.length} ${esc(t("sc_lines"))} · ${s.q.length} ❓</small></span></button>`}).join("")}</div><h4 class="ep-more">${esc(t("ep_more"))}</h4>`);
};
{const clean=()=>{["px-ephead","px-eplist"].forEach(id=>{const x=document.getElementById(id);if(x)x.remove()});document.querySelectorAll(".ep-more").forEach(x=>x.remove())};const r2=renderScenes;renderScenes=function(){clean();r2()}}
document.head.insertAdjacentHTML("beforeend",`<style>
.ep-head{display:grid;gap:4px;margin:6px 0 12px;padding:14px 16px;border-radius:18px;background:var(--grad,linear-gradient(135deg,#f97362,#b44bd6));color:#fff}
.ep-head b{font-size:1.15rem}.ep-head small{opacity:.92;line-height:1.45}
.ep-list{margin-bottom:8px}
.ep-more{margin:18px 0 10px}
.ep-n{position:absolute;top:10px;inset-inline-end:10px;background:#1d2340;color:#fbd7ae;font-weight:800;font-size:.75rem;border-radius:8px;padding:3px 8px}
.ep-quiz{position:absolute;inset:0;display:grid;place-items:center;padding:14px;background:rgba(15,12,30,.45)}
.ep-card{width:min(520px,100%);background:var(--solid,#fff);color:var(--ink);border-radius:20px;padding:18px;display:grid;gap:12px;box-shadow:0 20px 50px -20px rgba(0,0,0,.6);animation:fadeUp .3s ease both;max-height:100%;overflow:auto}
.ep-k{font-weight:800;font-size:.85rem;color:var(--brand)}
.ep-qt{display:flex;gap:10px;align-items:center;margin:0;font-size:1.2rem;font-weight:800;line-height:1.35}
.ep-opts{display:grid;gap:8px}
.ep-opt{font:inherit;font-weight:700;text-align:start;padding:12px 14px;border-radius:14px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer}
.ep-opt:hover:not(:disabled){border-color:var(--brand)}
.ep-opt.right{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 18%,var(--surface))}
.ep-opt.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 15%,var(--surface))}
.ep-fb{margin:0;font-weight:700}.ep-fb.ok{color:var(--ok)}.ep-fb.no{color:var(--bad)}
.ep-next{justify-self:end}
.ep-res h2{color:#fff}
#px-st-sub .de{font-size:clamp(1.05rem,2.6vw,1.45rem);font-weight:700;letter-spacing:.01em}
</style>`);

/* ---------------- video lesson cards: thumbnails drawn by the app (always the current name, sharp on every screen) ---------------- */
renderVideos=function(){
  $("v-levels").innerHTML=lvlChips();
  $("vids").innerHTML=G.filter(g=>g.level===state.level).map(g=>`<button class="vcard" data-vid="${g.id}"><span class="vthumb lv-thumb"><span class="lt-top"><span class="lt-brand"><img src="favicon.png" alt="" width="18" height="18">Lernivo</span><span class="lt-lv">${g.level}</span></span><span class="lt-k">Video-Lektion</span><span class="lt-t" lang="de" dir="ltr">${esc(g.de)}</span><span class="lt-bar" aria-hidden="true"><i></i><i></i><i></i></span><span class="vplay">${PLAY}</span></span><span class="vmeta"><b lang="de" dir="ltr">${esc(g.de)}</b><small>${esc(g.t[state.lang])}</small></span></button>`).join("");
};
document.head.insertAdjacentHTML("beforeend",`<style>
.lv-thumb{display:flex!important;flex-direction:column;justify-content:flex-start;gap:6px;padding:12px 14px;background:linear-gradient(160deg,#FFF8F2,#FBE7DA)!important;color:#1d2340;text-align:start;position:relative;overflow:hidden}
.lv-thumb::after{content:"";position:absolute;right:-30px;bottom:-30px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(242,97,63,.18),transparent 70%)}
.lt-top{display:flex;justify-content:space-between;align-items:center}
.lt-brand{display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:.85rem}.lv-thumb .lt-brand img{width:18px!important;height:18px!important;position:static!important;inset:auto!important;object-fit:contain;border-radius:5px;flex:none}
.lt-lv{background:#2E5BCC;color:#fff;font-weight:800;font-size:.7rem;border-radius:999px;padding:2px 9px}
.lt-k{margin-top:auto;font-family:var(--f-mono,monospace);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#2E5BCC;font-weight:700}
.lt-t{font-family:Georgia,"Times New Roman",serif;font-size:1.15rem;line-height:1.2;color:#1d2340;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.lt-bar{display:flex;width:44px;height:4px;margin-bottom:4px}.lt-bar i{flex:1}.lt-bar i:nth-child(1){background:#1d2340}.lt-bar i:nth-child(2){background:#D7263D}.lt-bar i:nth-child(3){background:#F2C14E}
.vthumb.lv-thumb{aspect-ratio:16/10}
.lv-thumb .vplay{position:absolute;inset:auto 12px 12px auto!important;transform:none!important;z-index:1;width:42px;height:42px}
.lv-thumb .lt-t{padding-inline-end:52px}
@media (max-width:640px){.vthumb.lv-thumb{aspect-ratio:16/8}.lt-t{font-size:1.3rem}}
</style>`);

/* ---------------- Listening: solid, clearly separated boxes (no see-through glass over the background colours) ---------------- */
document.head.insertAdjacentHTML("beforeend",`<style>
#l-panel{background:var(--solid,var(--surface))!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;gap:16px}
#l-panel .lplayer{background:color-mix(in srgb,var(--brand) 10%,var(--solid,var(--surface)))!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:1.5px solid color-mix(in srgb,var(--brand) 35%,var(--line))!important;padding:16px;gap:16px}
#l-panel .lplayer b{font-size:1.15rem;color:var(--ink)}
#l-panel .lplayer small{color:var(--ink);opacity:.72;font-size:.88rem;line-height:1.4}
#l-panel .bigplay,#l-panel .lp-ic{width:64px;height:64px;background:var(--grad,linear-gradient(135deg,#f97362,#b44bd6))!important;color:#fff!important;box-shadow:0 10px 24px -10px color-mix(in srgb,var(--brand) 80%,transparent);font-size:1.7rem}
#l-panel .bigplay svg{width:30px;height:30px}
#l-panel .bigplay.speaking{animation:lxPulse 1s ease-in-out infinite}
#l-panel .tools .tiny{font-weight:700}
#l-panel .ltrans{background:var(--paper,var(--surface));border:1px solid var(--line)}
#l-panel .rqs{background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;box-shadow:none!important;padding:0!important;gap:12px}
#l-panel .quiz-h{margin:4px 0 0;padding:10px 14px;border-radius:14px;background:var(--paper,var(--surface));border:1px solid var(--line)}
#l-panel .quiz-h h4{margin:0;color:var(--ink);font-size:.8rem}
#l-panel .q{background:var(--paper,var(--surface))!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:1px solid var(--line)!important;border-radius:16px!important;padding:14px!important;box-shadow:none!important}
#l-panel .q.done{border-color:color-mix(in srgb,var(--ok) 45%,var(--line))!important}
#l-panel .q-p{display:flex;align-items:center;gap:10px;font-size:1.05rem;font-weight:700;margin:0}
#l-panel .qn{background:var(--grad,linear-gradient(135deg,#f97362,#b44bd6));color:#fff;font-weight:800;font-size:.8rem;min-width:28px;height:28px;transform:none}
#l-panel .opts{display:grid;gap:8px}
#l-panel .opt{text-align:start}
#l-panel .hq{color:var(--ink);opacity:.75}
</style>`);

/* ---------------- render hooks ---------------- */
function plusRender(){renderWords();renderGX();renderProgress();renderScenes();try{lenaLabels();renderStrip();renderLX()}catch(e){}}
/* the app opened directly on Lena's screen: start listening at the first touch (browsers need a tap first) */
document.addEventListener("pointerdown",()=>{if(state.screen==="chat")autoStart()},{once:true,capture:true});
const _renderAll=renderAll;renderAll=function(){_renderAll();try{plusRender()}catch(e){console.error(e)}};
const _setLevel=setLevel;setLevel=function(lv){_setLevel(lv);if(TQ&&!TQ.done&&TQ.L!==lv)TQ=null;try{renderGX();renderProgress()}catch(e){}};
const _openVideo=openVideo;openVideo=function(id){openLesson(id)};

/* ---------------- events ---------------- */
document.addEventListener("click",e=>{
  const el=e.target;
  const th=el.closest("[data-pxtheme]");if(th){W.theme=th.dataset.pxtheme||null;W.mode="list";W.deck=[];renderWords();document.getElementById("words").scrollIntoView({block:"start"});return}
  const wl=el.closest("[data-wlv]");if(wl){W.lv=wl.dataset.wlv;W.deck=[];renderWords();return}
  const wm=el.closest("[data-wmode]");if(wm){W.mode=wm.dataset.wmode;W.deck=[];renderWords();return}
  const lr=el.closest("[data-learn]");if(lr){const k=lr.dataset.learn;if(P.learned[k])delete P.learned[k];else P.learned[k]=1;save("learned");const row=lr.closest(".wrow");lr.setAttribute("aria-pressed",String(!!P.learned[k]));if(row)row.classList.toggle("on",!!P.learned[k]);return}
  const wc=el.closest("[data-wcard]");if(wc&&!el.closest("[data-say]")){const a=wc.dataset.wcard;
    if(a==="flip"){W.flip=!W.flip;const c=document.querySelector(".fcard");if(c)c.classList.toggle("flip",W.flip);return}
    if(a==="know"){const w=W.deck[W.di];if(w){P.learned[wkey(w)]=1;save("learned")}W.di++;W.flip=false}
    if(a==="again"){const w=W.deck[W.di];if(w)W.deck.push(w);W.di++;W.flip=false}
    if(a==="restart"){W.deck=[]}
    renderWords();return}
  const gm=el.closest("button[data-gmode]");if(gm){P.gmode=gm.dataset.gmode;save("gmode");renderGX();swap("px-gx");return}
  const rf=el.closest("[data-ref]");if(rf){R.id=rf.dataset.ref;renderGX();if(innerWidth<900)document.getElementById("px-refp").scrollIntoView({behavior:"smooth",block:"start"});return}
  const vb=el.closest("[data-verb]");if(vb){V.sel=vb.dataset.verb;const sc=document.getElementById("px-vlist");const top=sc?sc.scrollTop:0;renderGX();const sc2=document.getElementById("px-vlist");if(sc2)sc2.scrollTop=top;document.getElementById("px-vpanel").scrollIntoView({behavior:"smooth",block:"nearest"});return}
  const vl=el.closest("[data-vlv]");if(vl){V.lv=vl.dataset.vlv;renderGX();return}
  const tq=el.closest("[data-tq]");if(tq){const a=tq.dataset.tq;
    if(a==="start"){newRound()}
    else if(a==="home"){TQ=null}
    else if(a==="next"){TQ.i++;TQ.picked=null;TQ.build=[];TQ.typed="";TQ.tip="";if(TQ.i>=TQ.qs.length){TQ.done=true;P.trainBest[TQ.L]=Math.max(P.trainBest[TQ.L]||0,TQ.score);save("trainBest")}}
    else if(a==="check"){const q=TQ.qs[TQ.i];if(q.tokens){TQ.picked=-1;finishAnswer(normDe(TQ.build.map(i=>q.tokens[i]).join(" "))===normDe(q.ans));return}if(q.input){const ty=document.getElementById("px-ty");TQ.typed=ty?ty.value:TQ.typed;answerTyped();return}}
    renderGX();document.getElementById("px-gx").scrollIntoView({behavior:"smooth",block:"start"});return}
  const to=el.closest("[data-tqo]");if(to&&TQ&&TQ.picked===null){TQ.picked=+to.dataset.tqo;finishAnswer(TQ.picked===TQ.qs[TQ.i].ans);return}
  const tt=el.closest("[data-tqt]");if(tt&&TQ){TQ.build.push(+tt.dataset.tqt);renderGX();return}
  const tb=el.closest("[data-tqb]");if(tb&&TQ){TQ.build.splice(+tb.dataset.tqb,1);renderGX();return}
  const pr=el.closest("[data-pr]");if(pr){if(pr.dataset.pr==="save")exportProgress();else document.getElementById("px-prfile").click();return}
  const scl=el.closest("[data-sclv]");if(scl){SCLV=scl.dataset.sclv==="all"?"all":scl.dataset.sclv;renderScenes();return}
  const sc=el.closest("[data-scene]");if(sc){openScene(sc.dataset.scene);return}
  const pl=el.closest("[data-pl]");if(pl){const a=pl.dataset.pl;
    if(a==="replay"){PL.paused=false;document.getElementById("px-st-play").innerHTML=PAUSEI;playStep(0)}
    else if(a==="orig"){const id=PL.lessonId;closeStage();_openVideo(id)}
    else if(a==="chat"){closeStage();go("chat")}
    else if(a==="practice"){const lv=pl.dataset.tlevel,i=+pl.dataset.topicI;closeStage();if(lv!==state.level)setLevel(lv);state.topic[state.level]=i;store.set("topic",state.topic);P.gmode="lessons";save("gmode");renderGrammar();renderGX();go("grammar")}
    return}
},false);
document.addEventListener("input",e=>{
  if(e.target.id==="px-wq"){W.q=e.target.value;const pos=e.target.selectionStart;W.theme=W.q.trim()?W.theme:W.theme;renderWords();const n=document.getElementById("px-wq");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}}
  if(e.target.id==="px-vq"){V.q=e.target.value;const pos=e.target.selectionStart;renderGX();const n=document.getElementById("px-vq");if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}}
});
document.addEventListener("change",e=>{if(e.target.id==="px-prfile"&&e.target.files&&e.target.files[0])importProgress(e.target.files[0])});
document.addEventListener("keydown",e=>{
  if(document.getElementById("px-stage").hidden)return;
  if(e.key==="Escape")closeStage();
  if(e.key===" "&&e.target===document.body){e.preventDefault();setPaused(!PL.paused)}
  if(e.key==="ArrowRight")playStep(PL.i+1);if(e.key==="ArrowLeft")playStep(PL.i-1);
  const c=e.target.closest&&e.target.closest(".fcard");if(c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();c.click()}
});
document.getElementById("px-st-close").addEventListener("click",closeStage);
document.getElementById("px-stage").addEventListener("click",e=>{if(e.target.id==="px-stage")closeStage()});
document.getElementById("px-st-play").addEventListener("click",()=>setPaused(!PL.paused));
document.getElementById("px-st-next").addEventListener("click",()=>{if(PL.i<PL.steps.length-1)playStep(PL.i+1)});
document.getElementById("px-st-prev").addEventListener("click",()=>playStep(PL.i>0?PL.i-1:0));
document.getElementById("px-st-tr").addEventListener("click",e=>{P.stTr=!P.stTr;save("stTr");e.currentTarget.setAttribute("aria-pressed",String(P.stTr));const s=PL.steps[PL.i];if(s){const run=PL.run;s.show();PL.run=run}});
document.getElementById("px-st-orig").addEventListener("click",()=>{const id=PL.lessonId;closeStage();_openVideo(id)});
document.addEventListener("visibilitychange",()=>{if(document.hidden&&!document.getElementById("px-stage").hidden&&!PL.paused)setPaused(true)});

/* ---------------- start ---------------- */
applyLang();renderGX();
if(location.hash.slice(1)==="words")go("words",true);
})();
