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
const ARTC=s=>esc(s).replace(/(^|[\s(„"])(der|die|das|den|dem|des|ein|eine|einen|einem|einer)(?=[\s.,!?])/gi,(m,p,a)=>{const k=a.toLowerCase();const c=k==="die"||k==="eine"||k==="einer"?"die":k==="das"?"das":"der";return `${p}<span class="ac-${c}">${a}</span>`});

/* ---------------- texts ---------------- */
Object.assign(L.en,{tab_words:"Words",words_title:"Vocabulary",words_lead:"Hundreds of everyday words sorted by topic, each with English and Arabic. Tap the speaker to hear a word, tick the words you know, or practise with flashcards.",w_search:"Search in German, English or Arabic…",w_all:"All",w_learned:"learned",w_list:"List",w_cards:"Flashcards",w_flip:"Tap the card to see the meaning",w_know:"I know it ✓",w_again:"Again",w_done:"Great, you went through all the cards!",w_back:"All topics",w_none:"No words found.",w_mark:"Mark as learned",w_restart:"Start again",
g_lessons:"Lessons",g_ref:"Overview",g_verbs:"Verbs",g_train:"Training",ref_lead:"The whole of German grammar, topic by topic: the rule, the tables and examples.",verbs_lead:"important verbs in every tense with ich, du, er/sie/es, wir, ihr, sie/Sie. Tap a verb to see all its forms.",verbs_search:"Search a verb in German, English or Arabic…",v_aux:"Perfekt with",v_sep:"separable",v_refl:"reflexive",v_hear:"Listen",
train_title:"Training",train_lead:"Mixed exercises from every topic of your level: grammar, articles, verb forms, plurals, word order, vocabulary, listening and spelling. Every round is new.",train_start:"Start a round",train_best:"Best",train_q:"Question",train_check:"Check",train_next:"Next",train_done:"Round finished!",train_again:"New round",train_review:"To review",train_of:"of",train_correct:"correct",
tq_gram:"Fill the gap",tq_art:"Which article?",tq_mean:"What does it mean?",tq_rev:"How do you say it in German?",tq_conj:"Choose the right verb form",tq_plural:"What is the plural?",tq_order:"Put the words in the right order",tq_type:"Write it in German",tq_hear:"Listen and choose the word you hear",tq_order_hint:"Tap the words in order. Tap a chosen word to take it back.",tq_type_ph:"Type in German…",tq_article_tip:"Remember the article:",
sc_title:"Scenes",sc_lead:"Animated everyday scenes: people talk in German, you read along and can show the translation. Pick a scene for your level.",sc_lines:"lines",sc_seen:"watched",
pl_tr:"Translation",pl_replay:"Replay",pl_orig:"Original video",pl_practice:"Do the exercises",pl_chat:"Practise this with Lena",pl_turn:"Your turn! Say it out loud.",pl_rule:"The rule",pl_forms:"Forms",pl_ex:"Example",pl_end:"Well done!",pl_end_sub:"Now practise what you heard.",pl_nat:"natural voice",pl_dev:"device voice",pl_lesson:"Video lesson",pl_scene:"Scene",pl_close:"Close",
pr_title:"Your progress",pr_lead:"Everything you do is saved automatically on this device. Save a backup file to keep it safe or move it to another phone.",pr_ex:"exercises done",pr_words:"words learned",pr_train:"best training score",pr_scenes:"scenes watched",pr_lessons:"lessons watched",pr_save:"Save progress file",pr_load:"Load progress file",pr_saved:"Saved! Keep this file to restore your progress later.",pr_loaded:"Progress loaded.",pr_bad:"This file isn't a Wortweg progress file.",pr_confirm:"Replace the progress on this device with the progress from this file?",pr_auto:"✓ Saved automatically on this device"});
Object.assign(L.fr,{tab_words:"Mots",words_title:"Vocabulaire",words_lead:"Des centaines de mots du quotidien classés par thème, avec l'anglais et l'arabe. Touchez le haut-parleur pour écouter, cochez les mots que vous connaissez ou entraînez-vous avec les cartes.",w_search:"Chercher en allemand, anglais ou arabe…",w_all:"Tous",w_learned:"appris",w_list:"Liste",w_cards:"Cartes",w_flip:"Touchez la carte pour voir le sens",w_know:"Je sais ✓",w_again:"Encore",w_done:"Bravo, vous avez vu toutes les cartes !",w_back:"Tous les thèmes",w_none:"Aucun mot trouvé.",w_mark:"Marquer comme appris",w_restart:"Recommencer",
g_lessons:"Leçons",g_ref:"Résumé",g_verbs:"Verbes",g_train:"Entraînement",ref_lead:"Toute la grammaire allemande, thème par thème : la règle, les tableaux et des exemples.",verbs_lead:"verbes importants à tous les temps avec ich, du, er/sie/es, wir, ihr, sie/Sie. Touchez un verbe pour voir toutes ses formes.",verbs_search:"Chercher un verbe en allemand, anglais ou arabe…",v_aux:"Parfait avec",v_sep:"séparable",v_refl:"pronominal",v_hear:"Écouter",
train_title:"Entraînement",train_lead:"Des exercices variés sur tous les thèmes de votre niveau : grammaire, articles, conjugaison, pluriels, ordre des mots, vocabulaire, écoute et orthographe. Chaque série est nouvelle.",train_start:"Commencer une série",train_best:"Meilleur",train_q:"Question",train_check:"Vérifier",train_next:"Suivant",train_done:"Série terminée !",train_again:"Nouvelle série",train_review:"À revoir",train_of:"sur",train_correct:"justes",
tq_gram:"Complétez",tq_art:"Quel article ?",tq_mean:"Que veut dire ce mot ?",tq_rev:"Comment dit-on en allemand ?",tq_conj:"Choisissez la bonne forme du verbe",tq_plural:"Quel est le pluriel ?",tq_order:"Mettez les mots dans le bon ordre",tq_type:"Écrivez en allemand",tq_hear:"Écoutez et choisissez le mot entendu",tq_order_hint:"Touchez les mots dans l'ordre. Touchez un mot choisi pour le retirer.",tq_type_ph:"Écrivez en allemand…",tq_article_tip:"N'oubliez pas l'article :",
sc_title:"Scènes",sc_lead:"Des scènes animées du quotidien : des personnes parlent allemand, vous lisez en même temps et pouvez afficher la traduction. Choisissez une scène de votre niveau.",sc_lines:"répliques",sc_seen:"vue",
pl_tr:"Traduction",pl_replay:"Revoir",pl_orig:"Vidéo d'origine",pl_practice:"Faire les exercices",pl_chat:"S'entraîner avec Lena",pl_turn:"À vous ! Dites-le à voix haute.",pl_rule:"La règle",pl_forms:"Les formes",pl_ex:"Exemple",pl_end:"Bravo !",pl_end_sub:"Entraînez-vous maintenant sur ce que vous avez entendu.",pl_nat:"voix naturelle",pl_dev:"voix de l'appareil",pl_lesson:"Leçon vidéo",pl_scene:"Scène",pl_close:"Fermer",
pr_title:"Votre progression",pr_lead:"Tout ce que vous faites est enregistré automatiquement sur cet appareil. Enregistrez un fichier de sauvegarde pour le garder ou le transférer sur un autre téléphone.",pr_ex:"exercices faits",pr_words:"mots appris",pr_train:"meilleur entraînement",pr_scenes:"scènes vues",pr_lessons:"leçons vues",pr_save:"Enregistrer ma progression",pr_load:"Charger une progression",pr_saved:"Enregistré ! Gardez ce fichier pour retrouver votre progression plus tard.",pr_loaded:"Progression chargée.",pr_bad:"Ce fichier n'est pas une sauvegarde Wortweg.",pr_confirm:"Remplacer la progression de cet appareil par celle du fichier ?",pr_auto:"✓ Enregistré automatiquement sur cet appareil"});
Object.assign(L.ar,{tab_words:"الكلمات",words_title:"المفردات",words_lead:"مئات الكلمات اليومية مرتبة حسب الموضوع، مع الإنجليزية والعربية. المس السماعة لسماع الكلمة، وضع علامة على الكلمات التي تعرفها، أو تدرّب بالبطاقات.",w_search:"ابحث بالألمانية أو الإنجليزية أو العربية…",w_all:"الكل",w_learned:"تم تعلمها",w_list:"القائمة",w_cards:"البطاقات",w_flip:"المس البطاقة لرؤية المعنى",w_know:"أعرفها ✓",w_again:"مرة أخرى",w_done:"رائع، أنهيت كل البطاقات!",w_back:"كل المواضيع",w_none:"لم يتم العثور على كلمات.",w_mark:"تعليم كمحفوظة",w_restart:"ابدأ من جديد",
g_lessons:"الدروس",g_ref:"ملخص القواعد",g_verbs:"الأفعال",g_train:"التدريب",ref_lead:"قواعد اللغة الألمانية كاملة، موضوعاً بموضوع: القاعدة والجداول والأمثلة.",verbs_lead:"فعلاً مهماً بكل الأزمنة مع ich و du و er/sie/es و wir و ihr و sie/Sie. المس فعلاً لرؤية كل صيغه.",verbs_search:"ابحث عن فعل بالألمانية أو الإنجليزية أو العربية…",v_aux:"الماضي التام مع",v_sep:"منفصل",v_refl:"انعكاسي",v_hear:"استمع",
train_title:"التدريب",train_lead:"تمارين متنوعة من كل مواضيع مستواك: القواعد والأدوات وتصريف الأفعال والجمع وترتيب الكلمات والمفردات والاستماع والإملاء. كل جولة جديدة.",train_start:"ابدأ جولة",train_best:"الأفضل",train_q:"السؤال",train_check:"تحقق",train_next:"التالي",train_done:"انتهت الجولة!",train_again:"جولة جديدة",train_review:"للمراجعة",train_of:"من",train_correct:"صحيحة",
tq_gram:"أكمل الفراغ",tq_art:"ما الأداة الصحيحة؟",tq_mean:"ما معنى هذه الكلمة؟",tq_rev:"كيف تقولها بالألمانية؟",tq_conj:"اختر صيغة الفعل الصحيحة",tq_plural:"ما صيغة الجمع؟",tq_order:"رتّب الكلمات ترتيباً صحيحاً",tq_type:"اكتبها بالألمانية",tq_hear:"استمع واختر الكلمة التي سمعتها",tq_order_hint:"المس الكلمات بالترتيب. المس كلمة مختارة لإرجاعها.",tq_type_ph:"اكتب بالألمانية…",tq_article_tip:"لا تنسَ الأداة:",
sc_title:"مشاهد",sc_lead:"مشاهد متحركة من الحياة اليومية: أشخاص يتحدثون بالألمانية، تقرأ معهم ويمكنك إظهار الترجمة. اختر مشهداً يناسب مستواك.",sc_lines:"جمل",sc_seen:"تمت المشاهدة",
pl_tr:"الترجمة",pl_replay:"إعادة",pl_orig:"الفيديو الأصلي",pl_practice:"حلّ التمارين",pl_chat:"تدرّب على هذا مع لينا",pl_turn:"دورك! قلها بصوت عالٍ.",pl_rule:"القاعدة",pl_forms:"الصيغ",pl_ex:"مثال",pl_end:"أحسنت!",pl_end_sub:"تدرّب الآن على ما سمعته.",pl_nat:"صوت طبيعي",pl_dev:"صوت الجهاز",pl_lesson:"درس فيديو",pl_scene:"مشهد",pl_close:"إغلاق",
pr_title:"تقدّمك",pr_lead:"كل ما تنجزه يُحفظ تلقائياً على هذا الجهاز. احفظ ملفاً احتياطياً للحفاظ عليه أو لنقله إلى هاتف آخر.",pr_ex:"تمارين أُنجزت",pr_words:"كلمات تم تعلمها",pr_train:"أفضل نتيجة تدريب",pr_scenes:"مشاهد تمت مشاهدتها",pr_lessons:"دروس تمت مشاهدتها",pr_save:"حفظ ملف التقدم",pr_load:"تحميل ملف التقدم",pr_saved:"تم الحفظ! احتفظ بهذا الملف لاستعادة تقدمك لاحقاً.",pr_loaded:"تم تحميل التقدم.",pr_bad:"هذا الملف ليس ملف تقدم من Wortweg.",pr_confirm:"هل تريد استبدال التقدم على هذا الجهاز بالتقدم الموجود في الملف؟",pr_auto:"✓ يُحفظ تلقائياً على هذا الجهاز"});

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
.px-theme b{font-family:var(--f-display);font-weight:400;font-size:1.15rem;line-height:1.2}
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
.ffront .w{font-family:var(--f-display);font-weight:400;font-size:clamp(2rem,6vw,2.8rem);line-height:1.1}
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
.px-panel h3{font-family:var(--f-display);font-weight:400;font-size:clamp(1.6rem,3vw,2.2rem);letter-spacing:-.02em}
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
.px-stat b{font-family:var(--f-display);font-weight:400;font-size:1.9rem;line-height:1.1}
.px-stat small{color:var(--muted)}
.px-lvbars{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.px-lvbar{display:grid;gap:4px;font-family:var(--f-mono);font-size:.8rem}
.px-scenes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.px-scene{border:1px solid var(--line);background:var(--surface);border-radius:22px;overflow:hidden;text-align:start;display:grid;box-shadow:var(--sh-1);transition:transform .2s var(--ease),box-shadow .2s}
.px-scene:hover{transform:translateY(-4px);box-shadow:var(--sh-2)}
.px-scene .th{aspect-ratio:16/9;position:relative;overflow:hidden;background:var(--soft)}
.px-scene .th svg{position:absolute;inset:0;width:100%;height:100%}
.px-scene .meta{padding:12px 14px 16px;display:grid;gap:3px}
.px-scene .meta b{font-family:var(--f-display);font-weight:400;font-size:1.15rem}
.px-scene .meta small{color:var(--muted)}
.px-scene .seen{position:absolute;top:10px;inset-inline-end:10px;background:var(--das);color:#fff;font-size:.72rem;font-weight:700;padding:3px 8px;border-radius:99px}
.px-scene .lvt{position:absolute;top:10px;inset-inline-start:10px;background:rgba(0,0,0,.55);color:#fff;font-family:var(--f-mono);font-size:.72rem;padding:3px 8px;border-radius:99px}
/* player */
.stage-sheet{position:fixed;inset:0;z-index:60;background:color-mix(in srgb,#140D08 88%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:grid;place-items:center;padding:calc(10px + var(--sat,0px)) 10px calc(10px + var(--sab,0px));animation:fadeUp .25s var(--ease) both}
.stage-sheet[hidden]{display:none}
.stage-box{width:min(1040px,100%);max-height:100%;display:grid;grid-template-rows:auto minmax(0,1fr) auto auto auto;background:#241912;color:#fff;border-radius:28px;overflow:hidden;box-shadow:0 50px 100px -40px rgba(0,0,0,.8)}
.st-top{display:flex;align-items:center;gap:12px;padding:12px 16px}
.st-top .tt{display:grid;flex:1;min-width:0}
.st-top small{font-family:var(--f-mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#EDB56A}
.st-top b{font-family:var(--f-display);font-weight:400;font-size:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-voice{font-size:.72rem;color:#E8D8C4;border:1px solid rgba(255,255,255,.2);padding:3px 9px;border-radius:99px;white-space:nowrap}
.st-top .vclose{background:rgba(255,255,255,.12);color:#fff}
.st-view{position:relative;aspect-ratio:16/9;max-height:62dvh;overflow:hidden;background:#2E2118}
@media (max-width:640px){.st-view{aspect-ratio:4/5;max-height:58dvh}}
.st-sub{min-height:72px;padding:12px 18px;display:grid;gap:3px;align-content:center;text-align:center;background:#1A120D}
.st-sub .de{font-size:clamp(1.05rem,2.6vw,1.35rem);font-weight:700;line-height:1.35}
.st-sub .tr{font-size:.92rem;color:#E8D8C4}
.st-sub .tr[dir="rtl"]{font-family:var(--f-ar);font-size:1.02rem}
.st-bar{height:4px;background:rgba(255,255,255,.1)}.st-bar i{display:block;height:100%;width:0;background:var(--grad);transition:width .4s var(--ease)}
.st-ctrl{display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 14px 16px;flex-wrap:wrap}
.st-btn{width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;display:grid;place-items:center}
.st-btn svg{width:20px;height:20px}
.st-btn.big{width:58px;height:58px;background:var(--grad);border:0;color:#2E1F15}
.st-btn.big svg{width:24px;height:24px}
.st-pill{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:99px;padding:8px 14px;font-weight:700;font-size:.85rem}
.st-pill[aria-pressed="true"]{background:#fff;color:#2E1F15}
/* lesson slides */
.ls{position:absolute;inset:0;display:grid;place-items:center;padding:clamp(18px,4vw,48px);text-align:center;background:radial-gradient(800px 400px at 80% 0%,rgba(200,85,61,.45),transparent 60%),radial-gradient(700px 400px at 0% 100%,rgba(110,127,58,.35),transparent 60%),#2E2118;animation:lsIn .6s var(--ease) both}
@keyframes lsIn{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:none}}
.ls .k{font-family:var(--f-mono);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:#EDB56A}
.ls h2{font-family:var(--f-display);font-weight:400;font-size:clamp(2rem,6vw,3.8rem);line-height:1.05;letter-spacing:-.02em;margin:10px 0}
.ls .sub{font-size:clamp(1rem,2.4vw,1.3rem);color:#F1E4D3}
.ls .bars{display:flex;gap:6px;justify-content:center;margin-top:18px}.ls .bars i{width:10px;height:34px;border-radius:5px;animation:barUp .8s var(--ease) both}
.ls .bars i:nth-child(2){animation-delay:.1s}.ls .bars i:nth-child(3){animation-delay:.2s}
@keyframes barUp{from{transform:scaleY(0)}to{transform:none}}
.ls .rule{max-width:780px;font-size:clamp(1.05rem,2.5vw,1.45rem);line-height:1.6;text-align:start}
.ls .rule span{opacity:0;animation:fadeUp .5s var(--ease) both}
.ls table{border-collapse:separate;border-spacing:0;font-size:clamp(.85rem,2.2vw,1.15rem);background:rgba(255,255,255,.05);border-radius:16px;overflow:hidden;max-width:100%}
.ls th,.ls td{padding:clamp(6px,1.2vw,10px) clamp(8px,1.6vw,16px);border-bottom:1px solid rgba(255,255,255,.08);color:#fff;text-align:start;white-space:nowrap}
.ls th{background:rgba(255,255,255,.1);font-family:var(--f-mono);font-size:.75em;letter-spacing:.06em;text-transform:uppercase;color:#E8D8C4}
.ls td:first-child{color:#EDB56A}
.ls tr.hi td{background:rgba(255,180,60,.22)}
.ls tr.dim td{opacity:.45}
.ls .ex{font-family:var(--f-display);font-weight:400;font-size:clamp(1.7rem,5vw,3.1rem);line-height:1.2;max-width:900px}
.ls .ex .ac-der{color:#7FB7D1}.ls .ex .ac-die{color:#EE8B6B}.ls .ex .ac-das{color:#A9BB6A}
.ls .ext{margin-top:12px;font-size:clamp(1rem,2.4vw,1.3rem);color:#F1E4D3}
.ls .turn{margin-top:22px;display:inline-flex;gap:8px;align-items:center;background:var(--grad);color:#2E1F15;font-weight:800;border-radius:99px;padding:10px 18px;animation:pop .5s var(--ease) both}
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
.sc-name{position:absolute;bottom:4%;background:rgba(36,25,18,.82);color:#fff;font-weight:700;font-size:.8rem;padding:4px 10px;border-radius:99px}
.sc-name.a{left:10%}.sc-name.b{right:10%}
.sc-bub{position:absolute;top:6%;max-width:min(56%,520px);background:#fff;color:#2E1F15;border-radius:22px;padding:12px 16px;font-weight:700;font-size:clamp(.95rem,2.2vw,1.2rem);line-height:1.4;box-shadow:0 18px 40px -18px rgba(0,0,0,.6);animation:pop .35s var(--ease) both}
.sc-bub.a{left:6%;border-bottom-left-radius:6px}.sc-bub.b{right:6%;border-bottom-right-radius:6px}
.sc-bub small{display:block;font-weight:600;color:#C0532F;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:2px}
@media (max-width:640px){.sc-char{width:44%}.sc-char.a{left:2%}.sc-char.b{right:2%}.sc-bub{max-width:88%;left:6%!important;right:6%!important}}
.sc-title{position:absolute;inset:0;display:grid;place-items:center;background:rgba(36,25,18,.6);text-align:center;color:#fff;animation:fadeUp .4s var(--ease) both}
.sc-title h2{font-family:var(--f-display);font-weight:400;font-size:clamp(1.8rem,5vw,3rem)}
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
    body=`<div class="px-row"><button class="tiny" data-pxtheme="">← ${esc(t("w_back"))}</button><h3 style="font-family:var(--f-display);font-weight:400;font-size:1.5rem;margin-inline-end:auto">${th.icon} <span lang="de">${esc(th.de)}</span></h3>
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
    box.innerHTML=`<div class="px-card" style="display:grid;gap:16px"><div><p class="eyebrow">${state.level}</p><h3 style="font-family:var(--f-display);font-weight:400;font-size:clamp(1.7rem,3vw,2.3rem);margin-top:6px">${esc(t("train_title"))}</h3></div>
      <p class="lead" style="max-width:70ch">${esc(t("train_lead"))}</p>
      <div class="lvl-tabs" style="margin:0">${lvlChips()}</div>
      <div class="px-lvbars">${LEVELS.map(l=>`<div class="px-lvbar"><span>${l.id} · ${esc(t("train_best"))}: ${P.trainBest[l.id]!=null?P.trainBest[l.id]+"/12":"–"}</span><span class="px-meter"><i style="width:${Math.round(100*(P.trainBest[l.id]||0)/12)}%"></i></span></div>`).join("")}</div>
      <div><button class="btn primary" data-tq="start">${esc(t("train_start"))} · ${state.level}</button></div></div>`;
    return;
  }
  if(TQ.done){
    const n=TQ.qs.length;
    box.innerHTML=`<div class="px-card" style="display:grid;gap:16px;text-align:center;justify-items:center"><p class="eyebrow">${TQ.L}</p><h3 style="font-family:var(--f-display);font-weight:400;font-size:1.8rem">${esc(t("train_done"))}</h3>
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
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`wortweg-progress-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);
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
function say(text,opt,run){
  return new Promise(res=>{
    const lang=(opt&&opt.lang)||"de";
    if(lang!=="de"&&!TTS.natural&&!(TTS.engine()==="device"&&TTS.hasLang&&TTS.hasLang(lang))){res(false);return}
    let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(g);res(true)};
    const g=setTimeout(fin,(TTS.natural?9000:3500)+String(text).length*95/Math.max(.5,state.rate));
    PL.guard=g;
    try{TTS.speakLena(text,null,()=>{if(run===PL.run)fin()},opt||{})}catch(e){fin()}
  });
}
const wait=(ms,run)=>new Promise(res=>{PL.timer=setTimeout(()=>res(run===PL.run),ms)});
function setSub(de,trs){
  const showTr=P.stTr&&trs;
  document.getElementById("px-st-sub").innerHTML=de?`<span class="de" lang="de" dir="ltr">${ARTC(de)}</span>${showTr?`<span class="tr" dir="${state.lang==="ar"?"rtl":"ltr"}">${esc(trs)}</span>`:""}`:"";
}
function voiceLabel(){document.getElementById("px-st-voice").textContent="🔊 "+t(TTS.natural?"pl_nat":"pl_dev")}
async function playStep(i){
  const run=++PL.run;clearTimeout(PL.timer);TTS.stop();
  PL.i=Math.max(0,Math.min(i,PL.steps.length-1));const s=PL.steps[PL.i];
  document.getElementById("px-st-prog").style.width=Math.round(100*(PL.i+1)/PL.steps.length)+"%";
  s.show();voiceLabel();
  if(PL.paused){return}
  for(const it of (s.speak||[])){if(run!==PL.run)return;if(it.before)it.before();if(it.sub!==undefined)setSub(it.sub,it.tr);
    const spoke=await say(it.text,it.opt,run);if(run!==PL.run)return;
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
  document.getElementById("px-st-orig").hidden=kind!=="lesson";
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
  steps.push({end:true,show:()=>{view().innerHTML=`<div class="ls"><div class="end"><div class="ic">🎉</div><h2>${esc(t("pl_end"))}</h2><p class="sub">${esc(t("pl_end_sub"))}</p><div class="btns"><button class="btn primary" data-pl="practice" data-tlevel="${g.level}" data-topic-i="${idx}">${esc(t("pl_practice"))}</button><button class="btn" data-pl="replay">↺ ${esc(t("pl_replay"))}</button><button class="btn" data-pl="orig">▶ ${esc(t("pl_orig"))}</button></div></div></div>`;setSub("","")}});
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
  const steps=[{show:()=>{build();view().insertAdjacentHTML("beforeend",`<div class="sc-title"><div><div class="k">${t("pl_scene")} · ${s.lv}</div><h2 lang="de">${esc(s.t.de)}</h2><p>${esc(tr(s.t))}</p></div></div>`);setSub("","")},hold:2200}];
  s.lines.forEach((ln,i)=>{const [who,de,en,fr,ar]=ln;const trs={en,fr,ar}[state.lang]||en;
    steps.push({show:()=>{if(!document.getElementById("px-ca"))build();const tt=view().querySelector(".sc-title");if(tt)tt.remove();
      document.getElementById("px-bub").innerHTML=`<div class="sc-bub ${who}"><small>${esc(s.cast[who].name)}</small><span lang="de" dir="ltr">${ARTC(de)}</span></div>`;talk(null);setSub(de,trs)},
      speak:[{text:de,opt:vo[who],before:()=>talk(who),after:()=>talk(null)}],hold:450});
  });
  steps.push({end:true,show:()=>{talk(null);view().insertAdjacentHTML("beforeend",`<div class="sc-title"><div class="end" style="display:grid;gap:12px;justify-items:center"><div style="font-size:2.4rem">🎉</div><h2>${esc(t("pl_end"))}</h2><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn primary" data-pl="chat">${esc(t("pl_chat"))}</button><button class="btn" data-pl="replay" style="color:#fff;border-color:rgba(255,255,255,.4)">↺ ${esc(t("pl_replay"))}</button></div></div></div>`);setSub("","")}});
  openStage(`${t("pl_scene")} · ${s.lv}`,s.t.de,steps,"scene",s);
}

/* ---------------- render hooks ---------------- */
function plusRender(){renderWords();renderGX();renderProgress();renderScenes()}
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
