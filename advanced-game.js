"use strict";

const PLANETS = {
  space:{name:"الفضاء المفتوح",en:"SOLAR SYSTEM FLIGHT",icon:"🚀",gravity:0,type:"ملاحة فضائية",color:"#63e6f5",sky:["#01030b","#06142a"],ground:"#020713",fact:"قد المركبة بحرية واختر وجهتك.",detail:"اقترب من أي كوكب واضغط E لبدء المهمة.",mode:"space"},
  moon:{name:"القمر",en:"MOON",icon:"🌙",gravity:.165,type:"تابع الأرض",color:"#aeb7bf",sky:["#01040b","#080d18"],ground:"#777b80",fact:"جاذبيتي تقريبًا سدس جاذبية الأرض، عشان كده إنت بتنط بخفة زي الفراشة!",detail:"أنا تابع الأرض الطبيعي، مش كوكب.",personality:"هاي! أنا القمر! نورت فوهاتي يا رائد الفضاء.",hasRing:false,ringReply:"ولأ، أنا معنديش حلقات... ومفيش حلقة من حلقات زحل مستخبية هنا.",clue:"لكن شوف! واحدة من حلقات زحل بتجري ناحية المريخ!",tool:"scoop",mode:"surface"},
  mercury:{name:"عطارد",en:"MERCURY",icon:"☿",gravity:.38,type:"كوكب صخري",color:"#918b82",sky:["#040405","#171617"],ground:"#625f5a",fact:"أنا أصغر كوكب وأقرب كواكب المجموعة الشمسية إلى الشمس.",detail:"أدور حول محوري ببطء خلال نحو 59 يومًا أرضيًا، ولا أملك غلافًا جويًا كثيفًا.",personality:"أنا عطارد! صغير وسريع، لكن شمسي قوية جدًا.",hasRing:true,ringReply:"أيوه! شفت واحدة من حلقات زحل هنا.",clue:"دور عليها بعد موقع قياس الحرارة في الناحية البعيدة.",ringLine:"أنا فضلت هنا شوية وعرفت إن عطارد أقرب كوكب للشمس، وحرارته بتتغير جدًا بين النهار والليل!",tool:"temperatureProbe",mode:"surface"},
  venus:{name:"الزهرة",en:"VENUS",icon:"🟡",gravity:.9,type:"كوكب صخري",color:"#d7c07f",sky:["#29271f","#77705a"],ground:"#8c8066",fact:"سحبي تعكس ضوء الشمس فأبدو شديدة اللمعان، لكن غلافي الكثيف يحبس حرارة هائلة.",detail:"أدور عكس اتجاه معظم الكواكب، ونستكشف منطقة صخرية آمنة بعيدًا عن أشد الحرارة والضغط.",personality:"أنا الزهرة! لامعة وجميلة، لكن الجو عندي حار جدًا. 🔥",hasRing:true,ringReply:"أيوه! لمحت واحدة من حلقات زحل هنا.",clue:"دور عليها بعد موقع العينة البركانية في آخر المسار.",ringLine:"وأنا هنا عرفت إن الزهرة من أسخن الكواكب بسبب غلافها الجوي الكثيف!",tool:"rockHammer",mode:"surface"},
  earth:{name:"الأرض",en:"EARTH",icon:"🌍",gravity:1,type:"كوكب صخري",color:"#2789b8",sky:["#4aaee0","#e5f4df"],ground:"#c9b77f",fact:"يغطي الماء نحو 71% من سطحي، وغلافي الجوي يجعل الحياة ممكنة.",detail:"تتكون بنيتي من القشرة والوشاح واللب الخارجي واللب الداخلي.",personality:"أنا الأرض، بيتك الأزرق! أهلًا بك عند الساحل.",hasRing:true,ringReply:"أيوه! بريق واحدة من حلقات زحل دخل البحر واختفى تحت السطح.",clue:"ادخل من الشاطئ، اغوص نحو المنارة الصوتية، وبعدها اتبع الإشارة إلى القاع.",ringLine:"وأنا هنا عرفت إن المحيطات والماء السائل يوفران مواطن كثيرة للحياة!",tool:"hydrophone",mode:"surface"},
  mars:{name:"المريخ",en:"MARS",icon:"🔴",gravity:.38,type:"كوكب صخري",color:"#a5573d",sky:["#6f5050","#d0aa82"],ground:"#8b5a42",fact:"أنا كوكب صخري ذو غلاف جوي رقيق، ولوني من معادن الحديد.",detail:"جاذبيتي 38% من جاذبية الأرض، وعندي أكبر بركان معروف.",personality:"أهلًا يا رائد الفضاء! أنا المريخ، الكوكب الأحمر. 🔴",hasRing:true,ringReply:"أيوه! شفت واحدة من حلقات زحل هنا.",clue:"دور عليها بعد موقع العينة الصخرية في الناحية البعيدة.",ringLine:"أنا فضلت هنا شوية وعرفت إن المريخ مشهور بلونه الأحمر بسبب معادن الحديد!",tool:"drill",mode:"surface"},
  jupiter:{name:"المشتري",en:"JUPITER ORBIT",icon:"🟠",gravity:2.53,type:"عملاق غازي",color:"#c88f68",sky:["#020715","#10182c"],ground:"#18243c",fact:"أنا أكبر كواكب المجموعة الشمسية، ويستغرق يومي نحو 9.9 ساعات فقط.",detail:"أنا عملاق غازي بلا سطح صلب، وتتم مهمتك مداريًا فوق سحبي والبقعة الحمراء الكبرى.",personality:"أنا المشتري! ضخم جدًا، بس متحاولش تهبط عليّ! 😄",hasRing:true,ringReply:"أيوه! شفت واحدة من حلقات زحل تتسابق قرب سحبي.",clue:"دور عليها بعد ممر الإشعاع في آخر المدار.",ringLine:"وأنا هنا عرفت إن المشتري أكبر كواكب المجموعة الشمسية، وهو عملاق غازي!",tool:"radiation",mode:"orbit"},
  uranus:{name:"أورانوس",en:"URANUS ORBIT",icon:"⛢",gravity:.89,type:"عملاق جليدي",color:"#72ced5",sky:["#020c16","#153b4c"],ground:"#325f6a",fact:"أنا عملاق جليدي بارد، ويمنحني غاز الميثان لوني الأزرق.",detail:"أدور على جانبي تقريبًا، وتتم مهمتك مداريًا قرب حلقاتي الخافتة.",personality:"أنا أورانوس! دوراني المائل يجعل منظري مختلفًا جدًا.",hasRing:true,ringReply:"أيوه! شفت واحدة من حلقات زحل تمر من هنا.",clue:"دور عليها بعد منارات الملاحة المائلة في آخر المسار.",ringLine:"وأنا هنا عرفت إن أورانوس عملاق جليدي بيدور على جانبه تقريبًا!",tool:"navigation",mode:"orbit"},
  neptune:{name:"نبتون",en:"NEPTUNE ORBIT",icon:"♆",gravity:1.14,type:"عملاق جليدي",color:"#315fcb",sky:["#010616","#10245a"],ground:"#1f3f83",fact:"أنا أبعد الكواكب عن الشمس، ورياحي من الأسرع في المجموعة الشمسية.",detail:"حولّي حلقات خافتة وأقواس، وتتم مهمتك مداريًا حيث تحتاج أجهزتك إلى الدفء.",personality:"أنا نبتون! أزرق، بعيد، ورياحي سريعة جدًا.",hasRing:true,ringReply:"أيوه! شفت واحدة من حلقات زحل في الفضاء المظلم.",clue:"دور عليها بعد أجهزة التدفئة في آخر المسار.",ringLine:"وأنا هنا عرفت إن نبتون أبعد كوكب عن الشمس، ورياحه من أسرع الرياح!",tool:"heater",mode:"orbit"},
  saturn:{name:"زحل",en:"SATURN ORBIT",icon:"🪐",gravity:1.06,type:"عملاق غازي",color:"#d0a35c",sky:["#070714","#2d2430"],ground:"#4d3e45",fact:"أنا سادس كوكب من الشمس وثاني أكبر كواكب المجموعة الشمسية.",detail:"غلافي من الهيدروجين والهيليوم، ولا أملك سطحًا صلبًا يمكن الوقوف عليه.",personality:"أنا زحل! سعيد بوصولك إلى مداري. هل وجدت حلقاتي السبع؟",hasRing:false,ringReply:"لا توجد حلقة هاربة هنا؛ عد إليّ عندما تجمع الحلقات السبع.",clue:"استكشف الكواكب ثم عد إلى زحل بالحلقات السبع.",tool:"magnetometer",mode:"orbit"}
};
const ORDER = ["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];
const DESTINATIONS = ORDER.flatMap(id=>id==="earth"?[id,"moon"]:[id]);
const SOLAR_PATHS={mercury:[260,.62],venus:[420,2.55],earth:[580,4.05],mars:[740,1.15],jupiter:[900,3.35],saturn:[1060,5.55],uranus:[1220,2.05],neptune:[1380,.15]};
const SYSTEM_MOONS={
  jupiter:[{id:"io",radius:5,orbit:150,phase:.2,tone:"#d9b06d"},{id:"europa",radius:4,orbit:235,phase:2.4,tone:"#d9d2bd"},{id:"ganymede",radius:7,orbit:330,phase:4.1,tone:"#8b8176"}],
  saturn:[{id:"titan",radius:7,orbit:220,phase:.9,tone:"#d7a762"},{id:"rhea",radius:4,orbit:330,phase:3.6,tone:"#c8c6bd"}],
  uranus:[{id:"ariel",radius:3,orbit:145,phase:.4,tone:"#d7e5e8"},{id:"titania",radius:5,orbit:245,phase:2.2,tone:"#afbdc1"},{id:"oberon",radius:4,orbit:350,phase:4.5,tone:"#8f999e"}],
  neptune:[{id:"triton",radius:6,orbit:250,phase:2.7,tone:"#c9d4cf"}]
};
const PLANET_DIALOGUES = {
  mercury:[
    {astronaut:true,text:"السماء سوداء تمامًا والفوهات في كل مكان! يا عطارد، شفت واحدة من حلقات زحل؟"},
    {text:"أيوه، شفتها ناحية الفوهة الكبيرة في المنطقة البعيدة، لكن ضوء الشمس القوي بيخلي الطريق قاسيًا."},
    {astronaut:true,text:"أقيس فرق الحرارة الحقيقي بين الصخر المشمس والظل إزاي؟"},
    {text:"خذ مسبار الحرارة. ضع طرفه على الصخر المشمس حتى تثبت القراءة، وبعدها كرر القياس داخل الظل."},
    {astronaut:true,text:"تمام، هقارن القراءتين بدل ما أخمّن من شكل السطح."},
    {text:"لما تسجل الفرق، كمّل ناحية الفوهة الكبيرة في المنطقة البعيدة."}
  ],
  venus:[
    {astronaut:true,text:"إيه الحرارة دي؟ الجو هنا مختلف تمامًا... كأني دخلت فرنًا عملاقًا! يا زهرة، مرت واحدة من حلقات زحل من هنا؟"},
    {text:"أيوه، لمحتها بعد الصخور البعيدة. خذ المطرقة الجيولوجية والملاقط وحاوية العينات قبل ما تكمل."},
    {astronaut:true,text:"أستخدم الأدوات دي بالترتيب إزاي من غير ما ألوث العينة؟"},
    {text:"ثبّت وقفتك واضرب الصخرة ثلاث ضربات، التقط الشظية بالملاقط، ثم أغلق الحاوية وثبّت بطاقة الموقع."},
    {astronaut:true,text:"شايف جبالًا وصخورًا بركانية وسط السحب... هل ده هو الاتجاه اللي مرت منه الحلقة؟"},
    {text:"نعم. اتبع بريقها بعد الصخور البعيدة بمجرد ما تتأكد إن العينة محفوظة بأمان."}
  ],
  earth:[
    {astronaut:true,text:"النهار منور والبحر قدامي! يا أرض، شفتِ واحدة من حلقات زحل عند الساحل؟"},
    {text:"أيوه، بريقها اتحرك من الساحل ناحية البحر، وبعدها اختفى تحت السطح."},
    {astronaut:true,text:"أدخل البحر وأتبعها إزاي من غير ما أضيّع الإشارة؟"},
    {text:"خذ مستشعر الصوت المائي وادخل من الشاطئ ناحية اليمين. اغوص قرب القاع، وجّه الحساس بعيدًا عن البدلة، وقارن قوة النبضات."},
    {astronaut:true,text:"تمام! هسبح ناحية اليمين، وأغوص للمنارة، وبعدها أتبع النبضات."},
    {text:"بعد المنارة كمّل ناحية البريق الذهبي في أعمق جزء من المسار."}
  ],
  moon:[
    {text:"أهلًا بيك على القمر! عارف إن جاذبيتي حوالي سدس جاذبية الأرض؟ يعني جاذبيتي أضعف بكتير، وده هيخليك تحس إنك أخف هنا!"},
    {astronaut:true,text:"آه! عشان كده حركتي أخف وبنط أعلى هنا؟"},
    {text:"بالضبط! كتلتك لسه زي ما هي، لكن وزنك أقل بسبب جاذبيتي الأضعف. عشان كده هتحس إن حركتك مختلفة وتقدر تنط أعلى من الأرض!"},
    {astronaut:true,text:"وأنا بستكشف المجموعة الشمسية عشان أساعد زحل وأرجّع له حلقاته السبع. شفت واحدة منهم هنا؟"},
    {text:"أنا تابع الأرض الطبيعي، مش كوكب، ومفيش حلقة مستخبية على القمر. لكني شفت بريق واحدة من حلقات زحل متجه ناحية المريخ. خلّص فحص تربة الفوهة، وبعدها اتبع البريق للمريخ."},
    {astronaut:true,text:"هفحص التربة بإيه، وأجهّز الأداة إزاي؟"},
    {text:"خد مغرفة العينات واجمع طبقة رقيقة من تربة الفوهة، وبعدها استخدم حاوية العينات عشان تنقل العينة وتقفلها وتثبّت بطاقة الموقع. جهّز الأداة المطلوبة من الحقيبة، واقترب من علامة العمل واضغط E."},
    {astronaut:true,text:"تمام! هجمع التربة وأحفظها صح، وبعدها هتبع بريق الحلقة ناحية المريخ."}
  ],
  mars:[
    {astronaut:true,text:"يا مريخ، الحوض الجاف والقنوات دي شكلهم غريب... مشفتش واحدة من حلقات زحل؟"},
    {text:"أيوه، بريقها عدى من هنا ناحية الوادي البعيد، واستقر قرب فوهة ضحلة بعده."},
    {astronaut:true,text:"هو المكان ده كان فيه ميه زمان؟ نقدر نفحص الطبقات من غير ما نخمن؟"},
    {text:"خذ مثقاب العينات إلى الصخر المكشوف عند حافة الحوض. ثبّته جيدًا واستخرج قلبًا داخل الأنبوب."},
    {astronaut:true,text:"تمام، هفحص الطبقات اللي جوه الصخر وأحافظ على العينة زي ما هي."},
    {text:"بعد الاستخراج أغلق الأنبوب وثبّت بطاقة الحوض، ثم اتبع البريق بعد الوادي إلى الفوهة الضحلة."}
  ],
  jupiter:[
    {astronaut:true,text:"يا مشتري، شوفت حلقة من حلقات زحل مرّت من هنا؟"},
    {text:"أيوه! كانت بتتسابق قرب سحبي واتجهت ناحية الممر البعيد."},
    {astronaut:true,text:"أقدر أوصل لها بأمان منين؟"},
    {text:"فعّل كاشف الإشعاع عند المسبار الأول، وقارن القراءة بالممر البعيد عشان تحدد الطريق الآمن لأثر الحلقة."},
    {astronaut:true,text:"تمام، هقارن القراءات وأتبع المسار الآمن."},
    {text:"قرار ذكي؛ الأحزمة حولي قوية جدًا."}
  ],
  saturn:[
    {astronaut:true,text:"يا زحل، وصلت لمدارك. هل في حلقة من حلقاتك رجعت هنا؟"},
    {text:"لسه لأ... الحلقات السبع ما زالت موزعة بين الكواكب."},
    {astronaut:true,text:"هكمل البحث، لكن إيه اللي يميزك عن باقي العمالقة؟"},
    {text:"أنا ثاني أكبر كواكب المجموعة الشمسية، وقطري نحو تسعة أضعاف قطر الأرض، وغلافي أساسه الهيدروجين والهيليوم."},
    {astronaut:true,text:"معلومة مدهشة! وهفحص المجال حول مدارك قبل ما أتحرك."},
    {text:"افحصه بأمان، وبعد ما تجمع السبع حلقات ارجع لي هنا. أنا أكمل دورتي حول الشمس في نحو 29.5 سنة أرضية."},
    {astronaut:true,text:"وعد. مش هوقف قبل ما أرجعهم كلهم."}
  ],
  uranus:[
    {astronaut:true,text:"أورانوس، مشفتش حلقة من حلقات زحل بتعدي من هنا؟"},
    {text:"أيوه، شفت واحدة وهي بتتحرك ناحية المنطقة البعيدة."},
    {astronaut:true,text:"المسار هنا مائل... أوصل لها إزاي؟"},
    {text:"فعّل حاسوب الملاحة، واتبع المنارات المائلة واحدة وراء الثانية، ثم ثبّت المسار لحد آخر المدار."},
    {astronaut:true,text:"تمام، هثبّت المسار وأكمل وراها."},
    {text:"راقب اتجاهك كويس، لأن المشهد هنا ممكن يضللك."}
  ],
  neptune:[
    {astronaut:true,text:"يا نبتون، شفت آخر حلقة من حلقات زحل في المنطقة دي؟"},
    {text:"شفت بريق حلقة في الفضاء المظلم، واتجهت ناحية أجهزة الرصد البعيدة."},
    {astronaut:true,text:"إزاي أتبعها وسط الظلام والبرد؟"},
    {text:"استخدم المصباح ودفّئ الأجهزة، وبعدها فتّش في آخر المسار."},
    {astronaut:true,text:"تمام، هجهز المعدات وأكمل البحث."},
    {text:"شغّل المصباح، وحافظ على تدفئة الأجهزة، وبعدها اتبع الإشارة لآخر المسار."}
  ]
};
const RING_DIALOGUES = {
  mercury:[
    {speaker:"astronaut",text:"أخيرًا لقيتك! إنتي واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! أنا واحدة من حلقات زحل! فضلت هنا شوية، وشفت حاجات غريبة جدًا."},
    {speaker:"astronaut",text:"كنتِ فين طول الوقت ده؟ وإيه اللي اكتشفتيه؟"},
    {speaker:"ring",text:"اكتشفت إن عطارد أصغر كوكب وأقربهم للشمس، ومعندوش أقمار أو حلقات. سنته 88 يومًا أرضيًا، لكنه بيدور حول نفسه ببطء في نحو 59 يومًا، وغلافه الجوي شبه منعدم."},
    {speaker:"astronaut",text:"يعني قربه من الشمس مش معناه إن حرارته ثابتة؟ ولاحظت بقعًا فاتحة جوه حفرة مظلمة كمان. إيه دي؟"},
    {speaker:"ring",text:"بالضبط! سطحه مليان فوهات قديمة، ووجد العلماء دليلًا على جليد ماء داخل بعض الفوهات القطبية التي لا تصلها الشمس تقريبًا."},
    {speaker:"astronaut",text:"دي بداية قوية. واحدة معايا، ولازم ألاقي باقي الحلقات وأرجعهم كلهم لزحل."}
  ],
  venus:[
    {speaker:"astronaut",text:"لقيتك وسط السحب! إنتي فعلًا واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! واستنى بس، لازم أحكيلك اللي اكتشفته هنا!"},
    {speaker:"astronaut",text:"كنتِ فين؟ وإيه سر الحرارة الشديدة دي؟"},
    {speaker:"ring",text:"اكتشفت إن غلاف الزهرة مليان ثاني أكسيد الكربون، والغاز ده بيحبس الحرارة بقوة. عشان كده حرارة سطحه بتقارب 470 درجة مئوية، والضغط هناك حوالي 92 مرة ضغط الأرض."},
    {speaker:"astronaut",text:"معقول الغلاف الجوي يعمل كل ده؟ وشايف جبالًا وصخورًا غريبة وسط السحب... إيه حكايتها؟"},
    {speaker:"ring",text:"أيوه! عند الزهرة أكثر من ألف بركان معروف، وبعض جباله يتجاوز 11 كيلومترًا. سحبه تعكس ضوء الشمس فيبدو لامعًا، وهو بيدور عكس اتجاه معظم الكواكب، ويومه أطول من سنته التي تقارب 225 يومًا أرضيًا."},
    {speaker:"astronaut",text:"الزهرة مليانة مفاجآت. حلقة تانية اتجمعت، ولسه لازم أكمل المهمة."}
  ],
  earth:[
    {speaker:"astronaut",text:"لقيتك جنب المرجان في قاع البحر! إنتي واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! أنا واحدة من حلقات زحل، وفضلت أستكشف المحيط؛ الأرض فيها ماء سائل كتير."},
    {speaker:"astronaut",text:"المحيط واسع أوي! هو واخد مساحة كبيرة من الأرض؟"},
    {speaker:"ring",text:"جداً! المحيطات تغطي نحو 71% من سطح الأرض؛ عشان كده الأرض بتبان زرقاء من الفضاء."},
    {speaker:"astronaut",text:"وكل السمك والنباتات اللي قابلتهم عايشين في العالم الكبير ده؟"},
    {speaker:"ring",text:"بالضبط! المحيطات بتوفر موطنًا للحياة، وغلافها الجوي يساعد الماء يفضل سائلًا. وداخل الأرض أربع طبقات رئيسية: القشرة والوشاح واللب الخارجي واللب الداخلي."},
    {speaker:"astronaut",text:"المكان أجمل وأغنى مما توقعت. يلا نكمل ونرجّع السبع حلقات لزحل!"}
  ],
  mars:[
    {speaker:"astronaut",text:"لقيتك جوه الفوهة! إنتي واحدة من حلقات زحل، صح؟"},
    {speaker:"ring",text:"صح! عديت جنب أوليمبوس مونس بميوله الواسعة، وشفت واديًا هائلًا وحوضًا جافًا مليان طبقات وقنوات قديمة."},
    {speaker:"astronaut",text:"هو الميه كانت موجودة هنا قبل كده؟ وليه التراب أحمر كده؟"},
    {speaker:"ring",text:"المريخ القديم كان أدفأ وأرطب، والقنوات ورواسب البحيرات الجافة دليل على مياه سائلة قديمة. واللون الأحمر من معادن الحديد اللي اتأكسدت زي الصدأ."},
    {speaker:"astronaut",text:"هو التراب هنا ممكن يطير بالعواصف؟ وإيه النقطتين الصغيرين في السما؟"},
    {speaker:"ring",text:"غلافه الجوي رقيق ومعظمه ثاني أكسيد الكربون، والرياح ترفع الغبار والحرارة تتغير بشدة. جاذبيته نحو 38% من جاذبية الأرض، والنقطتان فوبوس وديموس قمراه؛ واليوم هنا اسمه سول ومدته نحو 24.6 ساعة."},
    {speaker:"astronaut",text:"المكان جاف دلوقتي لكنه حافظ تاريخه. كويس إنك معايا؛ لسه حلقات ناقصة ولازم أكمل."}
  ],
  jupiter:[
    {speaker:"astronaut",text:"لقيتك قرب السحب! إنتي واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! أخيرًا وصلت، وأنا شوفت عاصفة ضخمة بشكل مش طبيعي!"},
    {speaker:"astronaut",text:"تقصدي العلامة الحمراء الكبيرة اللي شايفها وسط السحب؟"},
    {speaker:"ring",text:"بالضبط! دي البقعة الحمراء العظيمة، عاصفة أكبر من الأرض واستمرت لمئات السنين."},
    {speaker:"astronaut",text:"واضح إن المشتري مش بيحب الهدوء! وإيه كمان؟"},
    {speaker:"ring",text:"هو أكبر كواكب المجموعة الشمسية وصاحب أقصر يوم بينها؛ يومه نحو 9.9 ساعات، يعني حوالي عشر ساعات بس. وبيكمل دورته حول الشمس في قرابة 12 سنة أرضية، وعنده مجال مغناطيسي شديد القوة."},
    {speaker:"astronaut",text:"معلومة ممتازة. واحدة كمان معايا، ويلا أكمل البحث عن الباقي."}
  ],
  uranus:[
    {speaker:"astronaut",text:"لقيتك! إنتي واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! وعلى فكرة، الكوكب ده غريب جدًا!"},
    {speaker:"astronaut",text:"إيه اللي اكتشفتيه؟"},
    {speaker:"ring",text:"أورانوس عملاق جليدي شديد البرودة، وغاز الميثان بيساعد في ظهور لونه الأزرق، وحواليه حلقات خافتة داكنة. والأغرب إنه مائل على جانبه بنحو 98 درجة."},
    {speaker:"astronaut",text:"يعني فعلًا بيلف كأنه نايم على جنبه؟"},
    {speaker:"ring",text:"تقريبًا! وده بيخلي فصوله شديدة وطويلة، وكل فصل ممكن يستمر حوالي 21 سنة أرضية."},
    {speaker:"astronaut",text:"دي معلومة مش هنساها. هضمّك للباقي وأكمل لحد ما أرجع السبع حلقات لزحل."}
  ],
  neptune:[
    {speaker:"astronaut",text:"أخيرًا لقيتك في الظلام! إنتي واحدة من حلقات زحل؟"},
    {speaker:"ring",text:"أيوه! وعندي معلومة هتعجبك؛ نبتون مش هادي زي ما شكله يوحي."},
    {speaker:"astronaut",text:"إيه اللي اكتشفتيه هنا؟"},
    {speaker:"ring",text:"رياحه من أسرع الرياح في المجموعة الشمسية، وسرعتها ممكن تتجاوز 2000 كيلومتر في الساعة."},
    {speaker:"astronaut",text:"مذهل! ولونه الأزرق جاي منين؟"},
    {speaker:"ring",text:"غاز الميثان بيمتص جزءًا من الضوء الأحمر، لكن تفاصيل اللون الأزرق العميق لسه بيدرسها العلماء. حول نبتون حلقات وأقواس خافتة، وسنته حوالي 165 سنة أرضية!"},
    {speaker:"astronaut",text:"دي الحلقة السابعة! دلوقتي دوري أرجع السبع حلقات لزحل وأكمل المهمة."}
  ]
};
const DISCOVERY_MOMENTS = {
  mercury:{title:"ANCIENT IMPACT CRATER",fact:"واو... الفوهات في كل مكان! عطارد بلا أقمار أو حلقات، ودورانه حول نفسه يستغرق نحو 59 يومًا أرضيًا."},
  venus:{title:"DENSE CLOUD LAYERS",fact:"سحب الزهرة الكثيفة تعكس ضوء الشمس، لذلك يبدو لامعًا جدًا رغم غلافه الحار."},
  earth:{title:"THE LIVING OCEAN",fact:"المحيطات تغطي نحو 71% من سطح الأرض، وداخل الكوكب قشرة ووشاح ولب خارجي ولب داخلي."},
  moon:{title:"EARTHRISE",fact:"الأرض من الأفق القمري تبدو بعيدة ومختلفة تمامًا."},
  mars:{title:"OLYMPUS MONS",fact:"أوليمبوس مونس واحد من أعظم البراكين المعروفة في المجموعة الشمسية."},
  jupiter:{title:"THE GREAT RED SPOT",fact:"البقعة الحمراء عاصفة عملاقة، والمشتري يكمل يومه السريع في نحو 9.9 ساعات."},
  saturn:{title:"RINGS IN PERSPECTIVE",fact:"يمكن رؤية زحل كنقطة مضيئة بالعين المجردة، لكن رؤية حلقاته بوضوح تحتاج إلى تلسكوب."},
  uranus:{title:"AN EXTREME TILT",fact:"أورانوس عملاق جليدي أزرق بسبب الميثان، ويدور مائلًا على جانبه تقريبًا."},
  neptune:{title:"SUPERSONIC WINDS",fact:"سحب نبتون تكشف بعض أقوى الرياح، وحوله حلقات وأقواس خافتة."}
};
const SPACE_REFERENCE = [
  {title:"أساسيات الكون",code:"COSMIC BASICS",entries:[
    ["المجرة","نظام هائل يضم مليارات النجوم مع الغاز والغبار والمادة المظلمة، وتربط الجاذبية مكوناته معًا."],
    ["المجموعة الشمسية","الشمس نجم في مركز نظامنا، وتدور حولها ثمانية كواكب مع أقمار وكويكبات ومذنبات وكواكب قزمة."],
    ["النجم والكوكب","النجم جسم شديد الحرارة ينتج الضوء والطاقة من داخله، أما الكوكب فيدور حول نجم ويعكس ضوءه ولا يصدر ضوءًا من ذاته."],
    ["الجاذبية","قوة تجذب الأجسام بعضها إلى بعض؛ تثبتنا على الأرض، وتحفظ الأقمار حول الكواكب والكواكب حول الشمس."]
  ]},
  {title:"أجرام وأدوات فضائية",code:"OBJECTS & TOOLS",entries:[
    ["المذنب والكويكب","المذنب غني بالجليد والغبار وقد يظهر له ذيل قرب الشمس، بينما الكويكب جسم صخري أو معدني، ويوجد كثير منها بين المريخ والمشتري."],
    ["الشهاب والحجر النيزكي","عندما يدخل جرم صغير غلاف الأرض الجوي ويسخن يظهر كشهاب مضيء، وإذا وصل جزء منه إلى السطح يسمى حجرًا نيزكيًا."],
    ["الكوكب القزم","يدور حول الشمس وله شكل شبه كروي، لكنه لم ينظف المنطقة المحيطة بمداره؛ ومن أشهر أمثلته بلوتو."],
    ["الثقب الأسود","منطقة ذات جاذبية شديدة لا يستطيع حتى الضوء الإفلات منها بعد عبور أفق الحدث."],
    ["الأقمار والتلسكوب","القمر الطبيعي يدور حول كوكب، والقمر الصناعي جهاز يصنعه الإنسان للاتصالات والطقس والملاحة والبحث. ويساعد التلسكوب في دراسة الأجرام البعيدة."]
  ]},
  {title:"محطات الاستكشاف",code:"SPACE MILESTONES",entries:[
    ["1957 · سبوتنيك 1","أول قمر صناعي من صنع الإنسان يدور حول الأرض."],
    ["1961 · يوري جاجارين","أول إنسان يصل إلى الفضاء، على متن فوستوك 1."],
    ["1969 · أبولو 11","أصبح نيل أرمسترونج أول إنسان يطأ سطح القمر في 20 يوليو."],
    ["مركبات الفضاء","الصاروخ يوفر قوة الدفع للإطلاق، والمركبة الفضائية تعمل مأهولة أو غير مأهولة، والمحطة الفضائية مختبر مداري يعيش ويعمل فيه الرواد."]
  ]},
  {title:"حياة رائد الفضاء",code:"ASTRONAUT LIFE",entries:[
    ["التدريب والمهام","يتدرب الرواد سنوات على العلوم والمعدات والعمل الجماعي والطوارئ والجاذبية الصغرى، ثم يجرون التجارب ويصونون الأنظمة ويشغلون المركبات."],
    ["بدلة الفضاء","نظام دعم حياة يوفر الأكسجين والضغط وتنظيم الحرارة والاتصال، ويحمي من البيئة القاسية والإشعاع."],
    ["النوم والنظافة","ينام الرائد نحو ثماني ساعات داخل كيس نوم مثبت، ويستخدم إسفنجة مبللة ومناشف وشامبو جافًا ومعجون أسنان مناسبًا للبيئة الفضائية."],
    ["الرياضة والتواصل","يخصص الرواد نحو ساعتين يوميًا للرياضة لحماية العضلات والعظام، ويتواصلون لاسلكيًا؛ وخارج المركبة يوجد الميكروفون والراديو والسماعات داخل الخوذة."],
    ["المخاطر","تشمل الإشعاع وضعف العضلات والعظام والعزلة وصعوبة وصول الإمدادات كلما ابتعدت المهمة عن الأرض."]
  ]},
  {title:"زحل الحقيقي",code:"SATURN FACTS",entries:[
    ["الموقع والحجم","زحل سادس كوكب من الشمس وثاني أكبر كواكب المجموعة الشمسية. قطره نحو تسعة أضعاف قطر الأرض، ويكمل مداره في نحو 29.5 سنة أرضية."],
    ["الغلاف الجوي","هو عملاق غازي بلا سطح صلب، ويتكون غلافه أساسًا من الهيدروجين والهيليوم مع آثار من الأمونيا والميثان وبخار الماء. وتشهد سحبه رياحًا وعواصف قوية."],
    ["نظام الحلقات","تتكون الحلقات من مليارات قطع الجليد والصخور والغبار، من حبيبات دقيقة إلى قطع قد تقارب حجم منزل. تُسمى الحلقات الرئيسية A وB وC، ومعها D وE وF وG وآلاف النطاقات الأصغر."],
    ["اللون والرؤية","يعكس الجليد المائي ضوء الشمس فتبدو الحلقات فاتحة. يمكن رؤية زحل كنقطة مضيئة بالعين المجردة، أما تفاصيل الحلقات فتحتاج إلى تلسكوب."],
    ["الأقمار","حتى أغسطس 2026 كان عدد أقمار زحل المؤكدة 293 قمرًا، ومنها تيتان وإنسيلادوس وريا وديون وإيابيتوس."],
    ["بايونير 11","كانت بايونير 11 أول مركبة تحلق قرب زحل في 1 سبتمبر 1979، وأرسلت صورًا وبيانات عن الكوكب وحلقاته وأقماره."]
  ]}
];
const ITEMS = {
  rockHammer:{name:"مطرقة جيولوجية",icon:"RH",purpose:"تكشف مادة صخرية جديدة من غير ما تجمع صخرة كاملة.",use:"أمسك المقبض واضرب الصخرة ثلاث ضربات متحكم فيها.",weight:1,condition:100},
  scoop:{name:"مغرفة عينات",icon:"SC",purpose:"تجمع التربة والحبيبات السائبة من السطح.",use:"اخفض المغرفة، اجمع التربة، ثم ارفعها للحاوية.",weight:1,condition:100},
  tongs:{name:"ملاقط عينات",icon:"TG",purpose:"تلتقط الشظايا الصغيرة من غير لمسها بالقفاز.",use:"افتح الملاقط حول العينة، اقفلها، ثم انقل العينة.",weight:1,condition:100},
  sampleContainer:{name:"حاوية عينات",icon:"CAN",purpose:"تحفظ العينة وتمنع اختلاطها بمواد أخرى.",use:"انقل العينة للداخل، اقفل الغطاء، ثم ثبّت بطاقة الاسم.",weight:1,condition:100},
  temperatureProbe:{name:"مسبار حرارة",icon:"TEMP",purpose:"يقيس حرارة سطح محدد بدل تخمينها.",use:"وجّه طرف المسبار للسطح وانتظر ثبات القراءة.",weight:1,condition:100},
  drill:{name:"مثقاب عينات",icon:"DRL",purpose:"يأخذ قلبًا صغيرًا من الصخر داخل أنبوب نظيف.",use:"ثبّت المثقاب عموديًا، احفر ببطء، ثم اسحب أنبوب العينة.",weight:2,condition:100},
  hydrophone:{name:"مستشعر صوت مائي",icon:"HYD",purpose:"يلتقط النبضات الصوتية تحت الماء ويحدد اتجاهها.",use:"وجّه الحساس بعيدًا عن البدلة وانتظر أقوى نبضة.",weight:1,condition:100},
  camera:{name:"كاميرا علمية",icon:"CAM",purpose:"توثق الموقع والعينة قبل تغييرهما.",use:"ثبّتها أمام الخوذة ووجّه العدسة نحو الهدف.",weight:1,condition:100},
  flashlight:{name:"مصباح ميداني",icon:"LAMP",purpose:"يكشف تفاصيل الأجهزة والسحب في المناطق المظلمة.",use:"ثبّته في اليد ووجّه الضوء نحو الهدف.",weight:1,condition:100},
  navigation:{name:"حاسوب ملاحة",icon:"NAV",purpose:"يقارن اتجاه المنارات ويثبت المسار المداري.",use:"وجّه الحساس نحو كل منارة وانتظر تثبيت الاتجاه.",weight:2,condition:100},
  radiation:{name:"كاشف إشعاع",icon:"RAD",purpose:"يقيس الجسيمات المشحونة ويحدد الممر الأقل تعرضًا.",use:"مد الحساس بعيدًا عن البدلة وانتظر القراءة.",weight:2,condition:100},
  heater:{name:"وحدة تدفئة أجهزة",icon:"HEAT",purpose:"تعيد الجهاز البارد إلى حرارة التشغيل الآمنة.",use:"ثبّتها على الجهاز وشغّلها حتى تستقر القراءة.",weight:2,condition:100},
  magnetometer:{name:"مقياس مجال مغناطيسي",icon:"MAG",purpose:"يقيس المجال من ذراع بعيدة عن معادن البدلة.",use:"مد الحساس نحو الكوكب وانتظر استقرار القياس.",weight:2,condition:100}
};
const LEGACY_TOOL_IDS={geology:"scoop",thermal:"temperatureProbe",sample:"sampleContainer",communicator:"hydrophone",repair:"drill"};
const TOOL_WORKFLOWS={
  rockHammer:{pose:"hammer",duration:3.4,phases:[{id:"aim",label:"ثبّت قدميك وحدد موضع الضربة",at:0},{id:"strike-1",label:"الضربة 1 من 3",at:.16,sound:"impact"},{id:"strike-2",label:"الضربة 2 من 3",at:.35,sound:"impact"},{id:"strike-3",label:"الضربة 3 من 3",at:.54,sound:"impact"},{id:"reveal",label:"ظهرت شظية صخرية جديدة",at:.72},{id:"inspect",label:"العينة جاهزة للالتقاط",at:.88}]},
  scoop:{pose:"scoop",duration:3.2,phases:[{id:"lower",label:"اخفض المغرفة نحو التربة",at:0},{id:"collect",label:"اجمع طبقة رقيقة من السطح",at:.25,sound:"soil"},{id:"lift",label:"ارفع المغرفة بثبات",at:.53},{id:"transfer",label:"انقل التربة إلى الحاوية",at:.76,sound:"transfer"},{id:"ready",label:"العينة جاهزة للإغلاق",at:.92}]},
  tongs:{pose:"tongs",duration:3.1,phases:[{id:"reach",label:"قرّب الملاقط من الشظية",at:0},{id:"open",label:"افتح طرفي الملاقط",at:.22},{id:"grip",label:"أمسك العينة برفق",at:.42,sound:"click"},{id:"transfer",label:"انقلها إلى الحاوية",at:.68,sound:"transfer"},{id:"ready",label:"العينة داخل الحاوية",at:.9}]},
  sampleContainer:{pose:"container",duration:2.9,phases:[{id:"transfer",label:"ضع العينة داخل الحاوية",at:0,sound:"transfer"},{id:"seal",label:"أغلق الغطاء المحكم",at:.38,sound:"seal"},{id:"label",label:"ثبّت بطاقة العينة",at:.68,sound:"label"},{id:"ready",label:"محفوظة وجاهزة للتحليل",at:.9}]},
  temperatureProbe:{pose:"probe",duration:3.2,phases:[{id:"aim",label:"وجّه طرف المسبار",at:0},{id:"contact",label:"ضع الحساس على السطح",at:.25},{id:"measure",label:"انتظر ثبات القراءة",at:.46,sound:"measure"},{id:"reading",label:"تم تسجيل درجة الحرارة",at:.82,sound:"reading"}]},
  drill:{pose:"drill",duration:3.6,phases:[{id:"brace",label:"ثبّت المثقاب فوق الصخر",at:0},{id:"drill",label:"احفر ببطء داخل السطح",at:.2,sound:"drill"},{id:"extract",label:"اسحب أنبوب العينة",at:.62,sound:"extract"},{id:"ready",label:"قلب صخري داخل الأنبوب",at:.86}]},
  hydrophone:{pose:"sensor",duration:3.1,phases:[{id:"aim",label:"وجّه الحساس داخل الماء",at:0},{id:"listen",label:"استمع للنبضات",at:.26,sound:"measure"},{id:"compare",label:"قارن شدة الإشارة",at:.55},{id:"reading",label:"تم تحديد اتجاه المنارة",at:.82,sound:"reading"}]},
  radiation:{pose:"sensor",duration:3,phases:[{id:"aim",label:"وجّه الكاشف بعيدًا عن البدلة",at:0},{id:"measure",label:"اجمع قراءة الإشعاع",at:.32,sound:"measure"},{id:"reading",label:"تم تسجيل المستوى",at:.78,sound:"reading"}]},
  navigation:{pose:"sensor",duration:2.8,phases:[{id:"aim",label:"وجّه الحاسوب نحو المنارة",at:0},{id:"measure",label:"قارن اتجاه المسار",at:.34,sound:"measure"},{id:"reading",label:"تم تثبيت الاتجاه",at:.78,sound:"reading"}]},
  flashlight:{pose:"sensor",duration:2.6,phases:[{id:"aim",label:"وجّه المصباح نحو السحب",at:0},{id:"measure",label:"اكشف الطبقات المظلمة",at:.35,sound:"measure"},{id:"reading",label:"الصورة واضحة",at:.8}]},
  heater:{pose:"service",duration:3,phases:[{id:"aim",label:"ثبّت الوحدة على الجهاز",at:0},{id:"measure",label:"ارفع الحرارة تدريجيًا",at:.34,sound:"measure"},{id:"reading",label:"حرارة التشغيل مستقرة",at:.8,sound:"reading"}]},
  magnetometer:{pose:"sensor",duration:3.1,phases:[{id:"aim",label:"مد الحساس بعيدًا عن البدلة",at:0},{id:"measure",label:"انتظر استقرار المجال",at:.32,sound:"measure"},{id:"reading",label:"تم تسجيل المجال",at:.8,sound:"reading"}]}
};
const STORAGE_KEY="saturnSevenRingsV3";
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const lerp=(from,to,amount)=>from+(to-from)*amount;

class SaveManager {
  static defaults(){return {version:9,started:false,difficulty:"explorer",location:"base",rings:[],visited:[],explored:[],discoveries:[],scienceLogged:[],missionSteps:[],observations:[],conversations:[],dialogueProgress:{},clues:[],moonSighting:false,sightingPending:false,earthOceanReaction:false,finalReturnPending:false,waypoint:null,locker:[],inventory:["camera"],conditions:{camera:100},equipped:"camera",oxygen:100,health:100,thrusterCharges:5,knowledge:0,elapsed:0,sound:true,complete:false,positions:{}}}
  static normalize(raw){
    const state=this.defaults();
    if(raw&&typeof raw==="object"&&!Array.isArray(raw))for(const key of Object.keys(state))if(Object.hasOwn(raw,key))state[key]=raw[key];
    for(const key of ["inventory","locker"])if(Array.isArray(state[key]))state[key]=state[key].map(id=>LEGACY_TOOL_IDS[id]||id);
    state.equipped=LEGACY_TOOL_IDS[state.equipped]||state.equipped;
    if((!Number.isFinite(raw?.version)||raw.version<7)&&state.location==="moon")state.location="space";
    for(const key of ["rings","visited","explored","discoveries","scienceLogged","observations","conversations","clues"]){state[key]=[...new Set(Array.isArray(state[key])?state[key]:[])].filter(id=>DESTINATIONS.includes(id)&&(key!=="rings"||PLANETS[id].hasRing))}
    for(const id of state.rings){for(const key of ["scienceLogged","explored","discoveries"])if(!state[key].includes(id))state[key].push(id)}
    for(const id of state.conversations)for(const key of ["observations","clues","visited"])if(!state[key].includes(id))state[key].push(id);
    for(const id of state.explored)if(!state.visited.includes(id))state.visited.push(id);
    state.dialogueProgress=Object.fromEntries(Object.entries(state.dialogueProgress||{}).filter(([id,index])=>DESTINATIONS.includes(id)&&Number.isInteger(index)&&index>=0&&index<(PLANET_DIALOGUES[id]?.length||0)&&!state.conversations.includes(id)));
    if(!DESTINATIONS.includes(state.waypoint))state.waypoint=null;
    state.moonSighting=state.moonSighting===true;state.sightingPending=state.sightingPending===true&&state.moonSighting&&!state.rings.includes("mars");
    for(const key of ["inventory","locker"])state[key]=[...new Set(Array.isArray(state[key])?state[key]:[])].filter(id=>Object.hasOwn(ITEMS,id));
    state.inventory=["camera",...state.inventory.filter(id=>id!=="camera")];
    state.locker=[...new Set([...state.locker,...state.inventory.splice(6)])].filter(id=>!state.inventory.includes(id));
    state.missionSteps=[...new Set(Array.isArray(state.missionSteps)?state.missionSteps:[])].filter(value=>typeof value==="string");
    if(!["explorer","scientist","commander"].includes(state.difficulty))state.difficulty="explorer";
    if(state.location!=="base"&&!Object.hasOwn(PLANETS,state.location))state.location="space";
    for(const key of ["oxygen","health"])state[key]=Number.isFinite(state[key])?clamp(state[key],0,100):100;
    state.thrusterCharges=Number.isFinite(state.thrusterCharges)?clamp(Math.floor(state.thrusterCharges),0,state.difficulty==="explorer"?5:state.difficulty==="scientist"?4:3):3;
    for(const key of ["elapsed","knowledge"])state[key]=Number.isFinite(state[key])?Math.max(0,state[key]):0;
    for(const key of ["started","sound","complete","earthOceanReaction"])state[key]=typeof state[key]==="boolean"?state[key]:this.defaults()[key];
    state.missionSteps=state.missionSteps.filter(key=>DESTINATIONS.some(id=>MISSIONS[id].steps.some((step,index)=>key===`${id}:${index}`)));
    state.positions=Object.fromEntries(Object.entries(state.positions||{}).filter(([id,position])=>Object.hasOwn(PLANETS,id)&&position&&Number.isFinite(position.x)&&Number.isFinite(position.y)));
    state.conditions=Object.fromEntries([...state.inventory,...state.locker].map(id=>[id,Number.isFinite(state.conditions?.[id])?clamp(state.conditions[id],0,100):100]));
    if(!state.inventory.includes(state.equipped))state.equipped="camera";
    state.complete=Boolean(state.complete&&state.rings.length===7&&state.location==="saturn");
    state.finalReturnPending=Boolean(state.rings.length===7&&!state.complete&&state.location!=="saturn");
    state.version=9;return state;
  }
  static load(){try{return this.normalize(JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"))}catch{return this.defaults()}}
  static save(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(this.normalize(state)));return true}catch{return false}}
  static reset(){try{localStorage.removeItem(STORAGE_KEY);return true}catch{return false}}
}

class Inventory {
  constructor(game){this.game=game;this.capacity=6;this.essential=["camera"]}
  owned(id){return this.game.state.inventory.includes(id)||this.game.state.locker.includes(id)}
  carry(id){
    const state=this.game.state;
    if(!this.owned(id))return false;
    if(state.inventory.includes(id))return true;
    if(state.inventory.length>=this.capacity){
      const removable=[...state.inventory].reverse().find(item=>!this.essential.includes(item)&&item!==this.game.planet?.tool&&item!=="flashlight");
      if(!removable)return false;this.store(removable);
    }
    state.locker=state.locker.filter(item=>item!==id);state.inventory.push(id);return true;
  }
  acquire(id){if(!this.owned(id))this.game.state.locker.push(id);this.game.state.conditions[id]=100;for(const tool of [this.game.world?.tool,...(this.game.world?.extraTools||[])])if(tool&&(tool.item||this.game.planet?.tool)===id)tool.active=false;return this.carry(id)}
  store(id){const state=this.game.state;if(this.essential.includes(id)||id===this.game.planet?.tool)return false;state.inventory=state.inventory.filter(item=>item!==id);if(!state.locker.includes(id))state.locker.push(id);if(state.equipped===id)state.equipped="camera";return true}
  equip(id){if(!this.carry(id))return false;this.game.state.equipped=id;return true}
}

const MISSIONS={
  moon:{title:"LUNAR REGOLITH SAMPLE",kit:[["sampleContainer",1540]],steps:[["اجمع تربة سطحية بالمغرفة",1250,485,"scoop"],["انقل العينة وأغلق الحاوية",1820,465,"sampleContainer"]],ring:[3000,460]},
  mercury:{title:"SURFACE TEMPERATURE",steps:[["قس حرارة الصخر المشمس",1360,480,"temperatureProbe"],["قس حرارة الصخر داخل الظل",1860,465,"temperatureProbe"]],ring:[2840,480]},
  venus:{title:"VENUS ROCK SAMPLE",kit:[["tongs",1510],["sampleContainer",1810]],steps:[["اكشف شظية صخرية بالمطرقة",1220,240,"rockHammer"],["التقط الشظية بالملاقط",1640,410,"tongs"],["أغلق الحاوية وثبّت البطاقة",2050,410,"sampleContainer"]],ring:[2810,330]},
  earth:{title:"OCEAN SIGNAL DIVE",steps:[["قس اتجاه المنارة الصوتية تحت الماء",2050,290,"hydrophone"]],ring:[2950,225]},
  mars:{title:"ANCIENT LAKEBED CORE",kit:[["sampleContainer",1580]],steps:[["استخرج قلبًا من صخر حافة الحوض الجاف",1290,485,"drill"],["أغلق أنبوب العينة وثبّت بطاقة الحوض",1810,475,"sampleContainer"]],ring:[3030,480]},
  jupiter:{title:"RADIATION CORRIDOR",steps:[["قس الإشعاع عند المسبار الأول",1270,250,"radiation"],["قس الممر البعيد عن الأحزمة",1840,440,"radiation"]],ring:[2870,190]},
  uranus:{title:"TILTED NAVIGATION",steps:[["اتبع المنارة الأولى",1170,430,"navigation"],["اتبع المنارة الثانية",1670,210,"navigation"],["ثبّت المسار المائل",2030,360,"navigation"]],ring:[3040,270]},
  neptune:{title:"DARK RELAY",kit:[["flashlight",1110]],steps:[["أضئ مرصد الفضاء المظلم",1400,330,"flashlight"],["دفّئ أجهزة المسبار",1900,230,"heater"]],ring:[2980,390]},
  saturn:{title:"HOME ORBIT",steps:[["افحص مرجع المدار",820,310,"magnetometer"]],ring:[3050,260]}
};

const TASK_SCIENCE={
  "moon:0":{subject:"طبقة رقيقة من تربة حافة الفوهة",measure:"العينة التي جمعتها",result:"SURFACE REGOLITH · تربة سطحية ناعمة",meaning:"تربة القمر تحتفظ بآثار اصطدامات صغيرة حدثت عبر زمن طويل.",button:"اجمع بالمغرفة",sample:"تربة قمرية",sampleStage:"collected"},
  "moon:1":{subject:"التربة داخل حاوية العينة",measure:"حالة العينة",result:"SEALED & LABELED · محفوظة باسم الموقع",meaning:"الغلق والبطاقة يحافظان على هوية العينة عشان العلماء يعرفوا مكان جمعها.",button:"أغلق وثبّت البطاقة",sample:"تربة قمرية",sampleStage:"sealed"},
  "mercury:0":{subject:"صخر معرض مباشرة لضوء الشمس",measure:"حرارة السطح",result:"EXTREME HEAT · سطح شديد السخونة",meaning:"قرب عطارد من الشمس يجعل الصخور المكشوفة تستقبل طاقة كبيرة.",button:"ضع مسبار الحرارة"},
  "mercury:1":{subject:"صخر داخل ظل دائم",measure:"حرارة السطح",result:"SHADOW COOLER · أبرد كثيرًا من الصخر المشمس",meaning:"الغلاف الجوي شبه منعدم، فلا ينقل الحرارة من المنطقة المشمسة إلى الظل.",button:"قارن بالظل"},
  "venus:0":{subject:"صخرة بركانية مناسبة لأخذ جزء صغير",measure:"ما كشفته المطرقة",result:"FRESH ROCK CHIP · شظية صخرية جديدة",meaning:"المادة الجديدة أقل تعرضًا للسطح، فتساعد على دراسة أصل الصخرة.",button:"اضرب ثلاث ضربات",sample:"شظية بركانية",sampleStage:"released"},
  "venus:1":{subject:"الشظية البركانية الساخنة",measure:"ما تم التقاطه",result:"CHIP TRANSFERRED · الشظية داخل الحاوية",meaning:"الملاقط تبعد العينة عن القفاز وتقلل تلوثها.",button:"التقط بالملاقط",sample:"شظية بركانية",sampleStage:"collected"},
  "venus:2":{subject:"الشظية داخل حاوية العينة",measure:"حالة العينة",result:"SEALED & LABELED · عينة بركانية محفوظة",meaning:"الحاوية المحكمة والبطاقة تحفظان العينة ومكانها للتحليل.",button:"أغلق وثبّت البطاقة",sample:"شظية بركانية",sampleStage:"sealed"},
  "earth:0":{subject:"نبضات المنارة تحت الماء",measure:"اتجاه أقوى نبضة",result:"ACOUSTIC LOCK · اتجاه الحلقة محدد",meaning:"الصوت ينتقل خلال الماء، ومقارنة قوة النبضات تكشف اتجاه مصدرها.",button:"وجّه المستشعر واستمع"},
  "mars:0":{subject:"صخر طبقي مكشوف عند حافة حوض جاف",measure:"ما استخرجه المثقاب",result:"LAYERED CORE · قلب صخري متعدد الطبقات",meaning:"اختلاف الحبيبات والطبقات يساعد العلماء على اختبار إن كانت المياه القديمة نقلت الرواسب إلى هذا الحوض.",button:"استخرج أنبوب العينة",sample:"قلب صخري مريخي",sampleStage:"collected"},
  "mars:1":{subject:"أنبوب القلب الصخري من الحوض",measure:"حالة العينة",result:"SEALED & LABELED · عينة الحوض جاهزة للتحليل",meaning:"الغلق يمنع غبار السطح من الاختلاط بالطبقات الداخلية، والبطاقة تحفظ موقع الدليل الجيولوجي.",button:"أغلق وثبّت البطاقة",sample:"قلب صخري مريخي",sampleStage:"sealed"},
  "jupiter:0":{subject:"الإشعاع قرب المشتري",measure:"مستوى الإشعاع",result:"مرتفع قرب أحزمة المشتري",meaning:"مجال المشتري القوي يحبس جسيمات مشحونة حوله.",button:"ابدأ القياس"},
  "jupiter:1":{subject:"الممر البعيد",measure:"مستوى الإشعاع",result:"أقل من نقطة القياس الأولى",meaning:"الابتعاد عن الأحزمة يجعل مسار الاستكشاف أكثر أمانًا.",button:"قارن القراءة"},
  "uranus:0":{subject:"المنارة الأولى",measure:"اتجاه المسار",result:"الميل واضح ناحية مدار أورانوس",meaning:"ميل أورانوس الشديد بيغيّر شكل مساره في السماء.",button:"فعّل الملاحة"},
  "uranus:1":{subject:"المنارة الثانية",measure:"اتجاه المسار",result:"المسار متوافق مع الميل",meaning:"مقارنة منارتين تساعد على تحديد الاتجاه بدقة.",button:"قارن الاتجاه"},
  "uranus:2":{subject:"المسار المداري",measure:"ثبات الاتجاه",result:"NAVIGATION LOCKED · المسار ثابت",meaning:"الملاحة الدقيقة مهمة قرب كوكب بيدور وهو مائل على جانبه.",button:"ثبّت المسار"},
  "neptune:0":{subject:"منطقة مظلمة في الغلاف الجوي",measure:"وضوح السحب",result:"سحب عميقة سريعة الحركة",meaning:"الضوء بيكشف طبقات سحب نبتون البعيدة.",button:"شغّل المصباح"},
  "neptune:1":{subject:"أجهزة الرصد الباردة",measure:"حرارة الجهاز",result:"OPERATING TEMPERATURE · حرارة التشغيل مناسبة",meaning:"نبتون بعيد جدًا عن الشمس، لذلك الأجهزة تحتاج تدفئة.",button:"شغّل التدفئة"},
  "saturn:0":{subject:"المجال حول زحل",measure:"قوة المجال المغناطيسي",result:"حوالي 21 ميكروتسلا قرب السحب",meaning:"المجال المغناطيسي يوجّه الجسيمات المشحونة حول زحل.",button:"ابدأ القياس"}
};
const SAMPLE_RECORDS=[
  {planet:"moon",name:"تربة قمرية",available:"moon:0",collected:"moon:0",sealed:"moon:1"},
  {planet:"venus",name:"شظية بركانية",available:"venus:0",collected:"venus:1",sealed:"venus:2"},
  {planet:"mars",name:"قلب صخري مريخي",available:"mars:0",collected:"mars:0",sealed:"mars:1"}
];

class MissionManager {
  constructor(game){this.game=game}
  configure(world){
    const config=MISSIONS[world.id];world.steps=[];world.extraTools=[];if(!config)return;
    const orbitTaskY=450;
    world.steps=config.steps.map(([label,x,,tool],index)=>({type:"task",label,x,y:world.planet.mode==="orbit"?orbitTaskY:world.groundAt(x)-35,tool,index,key:`${world.id}:${index}`,active:!this.game.state.missionSteps.includes(`${world.id}:${index}`)}));
    [world.ring.x,world.ring.y]=config.ring;
    world.ring.y=world.planet.mode==="orbit"?450:world.groundAt(world.ring.x)-(world.id==="earth"?18:world.id==="mars"?22:35);
    world.science[0].x=world.id==="uranus"?2100:world.id==="saturn"?735:1550;world.science[0].y=world.planet.mode==="orbit"?orbitTaskY:world.groundAt(world.science[0].x)-35;
    for(const [item,x] of config.kit||[])world.extraTools.push({type:"tool",item,x,y:world.planet.mode==="orbit"?450:world.groundAt(x)-35,active:!this.game.inventory.owned(item)});
    world.tool.item=world.planet.tool;if(world.id==="saturn")world.tool.x=675;
    world.tool.y=world.planet.mode==="orbit"?450:world.groundAt(world.tool.x)-35;world.ship.y=world.planet.mode==="orbit"?450:world.groundAt(world.ship.x)-53;
    world.pathHints=[];
    const observationX=world.id==="saturn"?510:620,contactX=world.id==="saturn"?540:740;
    world.observation={type:"observation",x:observationX,y:world.planet.mode==="orbit"?450:world.groundAt(observationX)-35,active:true};
    world.contact={type:"talk",x:contactX,y:world.planet.mode==="orbit"?450:world.groundAt(contactX)-35,active:true};
  }
  remaining(){return (this.game.world.steps||[]).filter(step=>!this.game.state.missionSteps.includes(step.key))}
  useStep(step){
    const game=this.game;if(!step.active||!game.world.steps.includes(step)||Math.hypot(game.player.x-step.x,game.player.y-step.y)>=165)return;
    if(this.remaining()[0]!==step){game.ui.toast("اتبع المنارة السابقة أولًا");return}
    if(!game.state.inventory.includes(step.tool)||game.state.equipped!==step.tool){if(game.ui.requiredTool)game.ui.requiredTool(step.tool);else game.ui.toast(`جهّز ${ITEMS[step.tool].name} من الحقيبة`);return}
    game.ui.toolAction(step,TASK_SCIENCE[step.key]);
  }
  completeStep(key){const game=this.game,step=game.world.steps.find(step=>step.key===key);if(!step||!step.active||game.state.missionSteps.includes(key))return false;game.state.missionSteps.push(key);step.active=false;game.state.knowledge+=3;game.audio.play("success");game.save();return true}
  canReveal(){const game=this.game;return Boolean(game.planet?.hasRing&&game.state.conversations.includes(game.state.location)&&this.remaining().length===0&&!game.state.rings.includes(game.state.location))}
}

const JUPITER_FLOW_LAYERS=[
  {y:.16,thickness:92,frequency:.0048,amplitude:19,speed:.28,direction:1,depth:.22,phase:.4,color:"126,92,78",alpha:.11},
  {y:.31,thickness:76,frequency:.0062,amplitude:15,speed:.25,direction:-1,depth:.38,phase:2.1,color:"211,166,126",alpha:.13},
  {y:.46,thickness:104,frequency:.0054,amplitude:22,speed:.4,direction:1,depth:.54,phase:4.2,color:"244,211,174",alpha:.12},
  {y:.62,thickness:70,frequency:.0081,amplitude:12,speed:.3,direction:-1,depth:.7,phase:5.5,color:"165,116,88",alpha:.1}
];
const jupiterFlowState=seconds=>{const swell=.5+.5*Math.sin(seconds*.23-.7),pulse=Math.pow(.5+.5*Math.sin(seconds*.47+1.2),6),clock=seconds*1.25-Math.cos(seconds*.23-.7)*.055/.23-Math.cos(seconds*.47+1.2)*.03/.47;return{clock,speed:1.25+.055*Math.sin(seconds*.23-.7)+.03*Math.sin(seconds*.47+1.2),amplitude:1.03+.06*swell+.11*pulse,turbulence:1.04+.1*swell+.24*pulse}};

const MARS_GEOLOGY={
  lakebed:{center:1680,width:430,level:564},
  canyon:{center:2520,width:345,depth:78,leftRim:2130,rightRim:2900},
  craters:[
    {x:420,rx:38,ry:10,age:.35},{x:790,rx:25,ry:7,age:.82},{x:1110,rx:54,ry:14,age:.5},
    {x:1510,rx:31,ry:8,age:.72},{x:1900,rx:64,ry:16,age:.88},{x:2260,rx:42,ry:11,age:.44},
    {x:3030,rx:82,ry:20,age:.63},{x:3380,rx:35,ry:9,age:.78}
  ],
  channels:[
    [[1180,-2],[1280,5],[1390,2],[1500,8],[1620,4]],
    [[2870,-3],[2970,4],[3070,1],[3190,7],[3310,3]]
  ],
  rockFields:[
    {x:560,count:5,spread:170,tone:"#76503f"},{x:1220,count:6,spread:210,tone:"#9a6042"},
    {x:2030,count:5,spread:190,tone:"#55423a"},{x:3260,count:6,spread:220,tone:"#68483b"}
  ],
  moons:[
    {name:"phobos",x:.73,y:.18,radius:7,tone:"#66564d",phase:.35},
    {name:"deimos",x:.84,y:.27,radius:4.5,tone:"#8a6c59",phase:2.1}
  ]
};

const ATMOSPHERE_PROFILES={
  venus:{kind:"dense",haze:"rgba(205,194,151,.27)",cloud:"rgba(255,239,190,.21)",drift:.42,layers:6,gust:.07,gustRate:.08,phase:.4,flow:{count:5,drift:.32,width:235,height:54,sway:6,color:"238,224,181",alpha:.075,motes:0,directions:[1,1,-1,1,-1]}},
  earth:{kind:"temperate",haze:"rgba(74,151,192,.08)",cloud:"rgba(210,238,244,.08)",drift:.9,layers:2,gust:.04,gustRate:.08,phase:1.3,flow:{count:5,drift:.8,width:130,height:27,sway:7,color:"202,235,239",alpha:.045,motes:0,directions:[1,1,-1,1,-1]}},
  mars:{kind:"dust",haze:"rgba(172,101,70,.065)",cloud:"rgba(218,151,102,.045)",drift:6,layers:2,gust:.42,gustRate:.17,phase:2.2,flow:{count:6,drift:58,width:128,height:23,sway:13,turbulence:8,burst:.55,color:"194,113,72",alpha:.052,motes:3,directions:[1,1,1,1,1,1]}},
  jupiter:{kind:"jets",layers:4,drift:1.25,gust:.3,gustRate:.23},
  saturn:{kind:"soft-bands",haze:"rgba(202,168,102,.1)",cloud:"rgba(240,220,170,.13)",drift:.8,layers:5,gust:.09,gustRate:.1,phase:3.1,flow:{count:5,drift:.7,width:220,height:48,sway:10,color:"239,220,174",alpha:.055,motes:0,directions:[1,-1,1,-1,1]}},
  uranus:{kind:"cold-calm",haze:"rgba(102,202,218,.1)",cloud:"rgba(194,240,244,.11)",drift:.35,layers:4,gust:.035,gustRate:.07,phase:4.4,flow:{count:5,drift:.3,width:180,height:38,sway:7,color:"182,234,239",alpha:.04,motes:0,directions:[1,1,-1,1,-1]}},
  neptune:{kind:"fast-ice",haze:"rgba(42,88,190,.16)",cloud:"rgba(147,190,242,.14)",drift:42,layers:7,gust:.52,gustRate:.38,phase:5.2,flow:{count:6,drift:148,width:235,height:42,sway:22,turbulence:16,burst:.72,color:"132,182,239",alpha:.09,motes:2,directions:[1,1,1,-1,1,1]}}
};

const AUDIO_PROFILES={
  space:{hum:.022,air:.001,frequency:82,filter:900,modulation:0,modRate:.08,phase:0,filterMod:0},
  moon:{hum:.012,air:.0004,frequency:84,filter:620,modulation:0,modRate:.07,phase:.6,filterMod:0},
  mercury:{hum:.016,air:.0005,frequency:88,filter:760,modulation:0,modRate:.09,phase:1.1,filterMod:0},
  venus:{hum:.023,air:.061,frequency:48,filter:220,modulation:.035,modRate:.08,phase:.4,filterMod:.018},
  earth:{hum:.008,air:.03,frequency:90,filter:1250,modulation:.3,modRate:.32,phase:1.3,filterMod:.08},
  mars:{hum:.011,air:.036,frequency:72,filter:520,modulation:.34,modRate:.17,phase:2.2,filterMod:.12},
  jupiter:{hum:.026,air:.068,frequency:52,filter:340,modulation:.2,modRate:.23,phase:.9,filterMod:.075},
  saturn:{hum:.021,air:.049,frequency:57,filter:320,modulation:.075,modRate:.1,phase:3.1,filterMod:.03},
  uranus:{hum:.011,air:.023,frequency:64,filter:420,modulation:.04,modRate:.07,phase:4.4,filterMod:.02},
  neptune:{hum:.03,air:.072,frequency:43,filter:390,modulation:.4,modRate:.21,phase:5.2,filterMod:.14}
};
const AUDIO_LEVELS={ambience:1.35,environment:2.6,tool:2.5,equipment:1.8};
const EARTH_UNDERWATER_AUDIO={hum:.014,air:.026,frequency:58,filter:180,modulation:.12,modRate:.18,phase:2.1,filterMod:.04};
const modulateAudioProfile=(profile,seconds)=>{const wave=Math.sin(seconds*profile.modRate+profile.phase),gust=Math.pow(.5+.5*Math.sin(seconds*profile.modRate*1.7+profile.phase*.73),4);return{air:profile.air*(1+profile.modulation*(wave*.25+gust*.75)),filter:profile.filter*(1+profile.filterMod*wave)}};

class AudioManager {
  constructor(game){this.game=game;this.context=null;this.voices=new Set();this.lastSound={};this.environment=null;this.ambience=null;this.mixKey="";this.modulationKey="";this.resumePromise=null;this.lastEarthDetail=0}
  ensureContext(){if(this.context)return this.context;try{this.context=new(window.AudioContext||window.webkitAudioContext)();return this.context}catch{return null}}
  unlock(){if(!this.game.state.sound||this.game.suspended||document.hidden||this.resumePromise)return;const context=this.ensureContext();if(!context)return;const activate=()=>{if(!this.game.state.sound||document.hidden)return;this.createAmbience();this.updateAmbience()};if(context.state==="suspended")this.resumePromise=context.resume().then(activate).catch(()=>{}).finally(()=>{this.resumePromise=null});else activate()}
  createAmbience(){const context=this.context;if(!context||this.ambience)return;try{const master=context.createGain(),humGain=context.createGain(),airGain=context.createGain(),hum=context.createOscillator(),air=context.createBufferSource(),filter=context.createBiquadFilter(),buffer=context.createBuffer(1,context.sampleRate*16,context.sampleRate),data=buffer.getChannelData(0);let brown=0;for(let index=0;index<data.length;index++){const white=Math.random()*2-1;brown=(brown+white*.02)/1.02;data[index]=brown*3.2*(.82+.18*Math.sin(index/context.sampleRate*Math.PI*.16))}const crossfade=Math.floor(context.sampleRate*.5);for(let index=0;index<crossfade;index++){const mix=index/(crossfade-1);data[data.length-crossfade+index]=lerp(data[data.length-crossfade+index],data[index],mix)}master.gain.value=.0001;humGain.gain.value=.0001;airGain.gain.value=.0001;hum.type="triangle";hum.frequency.value=82;air.buffer=buffer;air.loop=true;filter.type="lowpass";filter.frequency.value=900;filter.Q.value=.35;hum.connect(humGain).connect(master);air.connect(filter).connect(airGain).connect(master);master.connect(context.destination);hum.start();air.start();this.ambience={master,humGain,airGain,hum,air,filter}}catch{}}
  setEnvironment(id){this.environment=id;this.mixKey="";this.modulationKey="";if(this.game.state.sound)this.updateAmbience()}
  ambientMix(){const id=this.environment||this.game.state.location,base=AUDIO_PROFILES[id]||{hum:0,air:0,frequency:70,filter:500,modulation:0,modRate:.1,phase:0,filterMod:0},keys=["hum","air","frequency","filter","modulation","modRate","phase","filterMod"];if(id==="earth"&&this.game.world?.water&&this.game.player){const blend=Math.round(this.game.world.waterImmersion(this.game.player)*20)/20;if(blend>0){const profile=Object.fromEntries(keys.map(key=>[key,lerp(base[key],EARTH_UNDERWATER_AUDIO[key],blend)]));return{id:`earth>water:${blend}`,profile}}}if(id!=="space"||!this.game.world?.planetNodes||!this.game.player)return{id,profile:base};const nearest=this.game.world.planetNodes.map(node=>({node,distance:Math.hypot(this.game.player.x-node.x,this.game.player.y-node.y)-node.radius})).sort((first,second)=>first.distance-second.distance)[0],amount=nearest?clamp((500-nearest.distance)/395,0,1):0;if(!nearest||amount<=0)return{id,profile:base};const blend=Math.round(amount*20)/20,target=AUDIO_PROFILES[nearest.node.id]||base,profile=Object.fromEntries(keys.map(key=>[key,lerp(base[key],target[key],blend)]));return{id:`space>${nearest.node.id}:${blend}`,profile}}
  updateAmbience(){if(!this.game.state.sound||this.game.suspended||document.hidden||!this.context||this.context.state!=="running")return;this.createAmbience();if(!this.ambience)return;const {id,profile}=this.ambientMix(),dialogue=Boolean(this.game.dialogue||this.game.pendingRing||(this.game.restorationReady&&this.game.paused)),duck=dialogue?.18:1,key=`${id}:${duck}`,now=this.context.currentTime,modulationKey=`${id}:${Math.floor(now*4)}`,mixChanged=key!==this.mixKey,modulationChanged=modulationKey!==this.modulationKey;if(!mixChanged&&!modulationChanged)return;this.mixKey=key;this.modulationKey=modulationKey;const ramp=(param,value,duration=1.1)=>{param.cancelScheduledValues(now);param.setValueAtTime(Math.max(.0001,param.value),now);param.exponentialRampToValueAtTime(Math.max(.0001,value),now+duration)},modulated=modulateAudioProfile(profile,now);if(mixChanged){ramp(this.ambience.master.gain,AUDIO_LEVELS.ambience*duck,.55);ramp(this.ambience.humGain.gain,profile.hum*AUDIO_LEVELS.environment);this.ambience.hum.frequency.cancelScheduledValues(now);this.ambience.hum.frequency.linearRampToValueAtTime(profile.frequency,now+1.1)}ramp(this.ambience.airGain.gain,modulated.air*AUDIO_LEVELS.environment,.45);this.ambience.filter.frequency.cancelScheduledValues(now);this.ambience.filter.frequency.linearRampToValueAtTime(modulated.filter,now+.45);this.updateEarthDetail(id,now,dialogue)}
  updateEarthDetail(id,now,dialogue){if(!id.startsWith("earth")||dialogue)return;const immersion=this.game.world?.waterImmersion?.(this.game.player)||0,underwater=immersion>.18,interval=underwater?5.8:9.5;if(now-this.lastEarthDetail<interval)return;this.lastEarthDetail=now;const alternate=Math.floor(now/interval)%2;if(underwater)this.tone(alternate?215:245,.09,"sine",.007,alternate?75:95);else this.tone(alternate?1120:1360,.11,"sine",.009,alternate?160:-120)}
  stop(){for(const voice of this.voices){try{voice.oscillator.stop();voice.oscillator.disconnect();voice.gain.disconnect()}catch{}}this.voices.clear();if(this.ambience){try{this.ambience.hum.stop();this.ambience.air.stop();for(const node of Object.values(this.ambience))node.disconnect?.()}catch{}this.ambience=null;this.mixKey="";this.modulationKey=""}}
  tone(frequency,duration=.12,type="sine",volume=.055,slide=0){if(!this.game.state.sound||this.game.suspended||document.hidden||this.voices.size>=4)return;const now=performance.now();if(now-(this.lastSound[frequency]??-Infinity)<100)return;this.lastSound[frequency]=now;try{const context=this.ensureContext();if(!context)return;if(context.state==="suspended")context.resume().catch(()=>{});this.createAmbience();const oscillator=context.createOscillator(),gain=context.createGain(),voice={oscillator,gain};this.voices.add(voice);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();this.voices.delete(voice)};oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,context.currentTime);oscillator.frequency.linearRampToValueAtTime(frequency+slide,context.currentTime+duration);gain.gain.setValueAtTime(volume,context.currentTime);gain.gain.exponentialRampToValueAtTime(.001,context.currentTime+duration);oscillator.connect(gain).connect(context.destination);oscillator.start();oscillator.stop(context.currentTime+duration);this.updateAmbience()}catch{}}
  play(name){const sounds={click:[260,.05,"square",.025,30],step:[110,.04,"triangle",.018,-15],scan:[420,.22,"sine",.04,500],item:[620,.25,"triangle",.05,260],ring:[520,.8,"sine",.07,700],warning:[190,.32,"square",.035,-50],launch:[90,1.4,"sawtooth",.04,430],success:[700,.45,"triangle",.05,250]},tone=[...(sounds[name]||sounds.click)];if(name==="item")tone[3]=Math.min(.1,tone[3]*AUDIO_LEVELS.equipment);this.tone(...tone)}
  playStep(id){const step={moon:[105,.045,"triangle",.012,-18],mercury:[118,.04,"triangle",.013,-22],venus:[82,.055,"sine",.012,-9],earth:[126,.04,"triangle",.011,-15],mars:[72,.055,"triangle",.012,-8],saturn:[176,.035,"square",.006,-32]}[id];if(step)this.tone(...step)}
  playTool(tool){const sounds={rockHammer:[165,.09,"triangle",.025,-25],scoop:[118,.12,"triangle",.018,-20],tongs:[620,.06,"square",.014,-80],sampleContainer:[410,.08,"triangle",.018,-35],temperatureProbe:[480,.12,"sine",.02,90],drill:[105,.2,"sawtooth",.018,35],hydrophone:[285,.18,"sine",.018,80],radiation:[510,.12,"sine",.022,110],navigation:[390,.14,"sine",.022,70],flashlight:[680,.06,"sine",.018,-40],heater:[120,.18,"sine",.02,55],magnetometer:[330,.16,"sine",.022,120]},tone=[...(sounds[tool]||[420,.18,"sine",.025,180])];tone[3]=Math.min(.1,tone[3]*AUDIO_LEVELS.tool);this.tone(...tone)}
  playToolPhase(sound){const sounds={impact:[118,.08,"triangle",.032,-38],soil:[86,.16,"triangle",.017,-25],transfer:[430,.07,"triangle",.018,-45],click:[680,.045,"square",.015,-95],seal:[310,.09,"triangle",.021,-70],label:[720,.055,"square",.012,35],measure:[390,.12,"sine",.018,150],reading:[760,.13,"sine",.024,160],drill:[92,.28,"sawtooth",.018,28],extract:[170,.11,"triangle",.022,85]},tone=sounds[sound]?[...sounds[sound]]:null;if(tone){tone[3]=Math.min(.1,tone[3]*AUDIO_LEVELS.tool);this.tone(...tone)}}
}

class Camera {
  constructor(){this.x=0;this.y=0;this.zoom=1;this.shake=0}
  follow(target,viewportWidth,viewportHeight,worldWidth,worldHeight,dt){const viewportWorldWidth=viewportWidth/this.zoom,viewportWorldHeight=viewportHeight/this.zoom;const desiredX=viewportWorldWidth>=worldWidth?(worldWidth-viewportWorldWidth)/2:clamp(target.x-viewportWorldWidth/2,0,worldWidth-viewportWorldWidth);const desiredY=viewportWorldHeight>=worldHeight?(worldHeight-viewportWorldHeight)/2:clamp(target.y-viewportWorldHeight/2,0,worldHeight-viewportWorldHeight);this.x=lerp(this.x,desiredX,1-Math.pow(.08,dt));this.y=lerp(this.y,desiredY,1-Math.pow(.08,dt));this.shake=Math.max(0,this.shake-dt*18)}
  apply(ctx){const sx=this.shake?(Math.random()-.5)*this.shake:0,sy=this.shake?(Math.random()-.5)*this.shake:0;ctx.scale(this.zoom,this.zoom);ctx.translate(-this.x+sx,-this.y+sy)}
}

class Player {
  constructor(){this.x=240;this.y=420;this.vx=0;this.vy=0;this.width=38;this.height=96;this.onGround=false;this.wasGrounded=false;this.groundedExpedition=false;this.swimming=false;this.submerged=false;this.facing=1;this.walkPhase=0;this.near=null;this.coyoteTimer=0;this.jumpBufferTimer=0;this.thrusterCooldown=0;this.thrusterFx=0}
  reset(mode){this.x=mode==="space"?520:260;this.y=mode==="space"?1100:mode==="orbit"?350:380;this.vx=0;this.vy=0;this.onGround=false;this.groundedExpedition=false;this.swimming=false;this.submerged=false;this.coyoteTimer=0;this.jumpBufferTimer=0;this.thrusterCooldown=0;this.thrusterFx=0}
  update(game,dt){const keys=game.keys,planet=game.planet,flight=planet?.mode==="space",space=flight,easy=game.state.difficulty==="explorer";this.groundedExpedition=["saturn","uranus"].includes(game.world?.id);const axisX=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0),axisY=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0),swimming=!flight&&game.world?.isWaterAt?.(this.x);this.swimming=Boolean(swimming);const sprint=keys.shift;const maxSpeed=space?(sprint?470:340):swimming?(sprint?205:150):(sprint?285:185);const groundedAcceleration=axisX?1050:1350,airAcceleration=easy?720:610,flightAcceleration=axisX||axisY?240:120,acceleration=space?flightAcceleration:swimming?420:this.onGround?groundedAcceleration:airAcceleration;this.vx=this.approach(this.vx,axisX*maxSpeed,acceleration*dt);if(axisX)this.facing=axisX;
    this.jumpBufferTimer=Math.max(0,this.jumpBufferTimer-dt);if(this.jumpBufferTimer===0)game.jumpRequested=false;this.coyoteTimer=this.onGround?(easy?.15:.13):Math.max(0,this.coyoteTimer-dt);this.thrusterCooldown=Math.max(0,this.thrusterCooldown-dt);this.thrusterFx=Math.max(0,this.thrusterFx-dt);
    if(flight){this.vy=this.approach(this.vy,axisY*maxSpeed,acceleration*dt);if(game.consumeJumpRequest())this.useThruster(game,true)}
    else if(swimming){this.vy=this.approach(this.vy,axisY*(sprint?175:125)-(axisY?0:8),acceleration*dt);if(game.jumpRequested)game.consumeJumpRequest();this.jumpBufferTimer=0;this.coyoteTimer=0}
    else{this.vy+=920*planet.gravity*dt;if(this.jumpBufferTimer>0&&this.coyoteTimer>0){this.jump(game,planet);this.jumpBufferTimer=0;this.coyoteTimer=0}else if(game.jumpRequested&&!this.onGround&&!this.nearLanding(game.world)){game.consumeJumpRequest();this.jumpBufferTimer=0;this.useThruster(game,false)}if(!game.jumpHeld&&this.vy<0)this.vy+=320*planet.gravity*dt}
    const previousY=this.y;this.x+=this.vx*dt;this.y+=this.vy*dt;this.resolveCollisions(game.world,flight,previousY);this.submerged=Boolean(this.swimming&&game.world.isSubmerged(this));if(this.onGround&&this.jumpBufferTimer>0){this.jump(game,planet);this.jumpBufferTimer=0}this.walkPhase+=(Math.abs(this.vx)+Math.abs(this.vy)*.35)*dt*.055;if(Math.abs(this.vx)>60&&this.onGround&&Math.floor(this.walkPhase)%7===0&&Math.floor(this.walkPhase-dt*Math.abs(this.vx)*.055)%7!==Math.floor(this.walkPhase)%7)game.audio.playStep(game.state.location);
  }
  queueJump(duration){this.jumpBufferTimer=Math.max(this.jumpBufferTimer,duration)}
  nearLanding(world){if(this.vy<0)return false;const feet=this.y+this.height/2,surfaces=[world.groundAt(this.x)];for(const obstacle of world.obstacles){if(obstacle.passable)continue;if(this.x+this.width/2>obstacle.x-5&&this.x-this.width/2<obstacle.x+obstacle.w+5)surfaces.push(obstacle.y)}return surfaces.some(surface=>surface-feet>=-4&&surface-feet<42)}
  jump(game,planet){const height=clamp(95/Math.pow(planet.gravity,.35),62,155);this.vy=-Math.sqrt(2*920*planet.gravity*height);this.onGround=false;this.coyoteTimer=0;game.jumpRequested=false;game.audio.tone(180,.12,"triangle",.025,100)}
  useThruster(game,orbit){if(this.thrusterCooldown>0)return false;this.vy=Math.min(this.vy,0)-(orbit?115:150);this.thrusterCooldown=.32;this.thrusterFx=.22;game.audio.tone(240,.18,"sawtooth",.035,180);return true}
  approach(current,target,amount){return current<target?Math.min(current+amount,target):Math.max(current-amount,target)}
  resolveCollisions(world,orbit,previousY){
    this.x=clamp(this.x,30,world.width-30);this.y=clamp(this.y,this.height/2,world.height-this.height/2);
    this.wasGrounded=this.onGround;this.onGround=false;if(orbit)return;
    if(this.swimming){const surface=world.water.surfaceY-this.height*.22,floor=world.groundAt(this.x)-this.height/2;if(this.y<surface){this.y=surface;this.vy=Math.max(0,this.vy)}if(this.y>floor){this.y=floor;this.vy=Math.min(0,this.vy)}return}
    const floor=world.groundAt(this.x)-this.height/2;
    if(this.y>=floor-3&&this.vy>=0){this.y=floor;this.vy=0;this.onGround=true}
    for(const obstacle of world.obstacles){
      if(obstacle.passable)continue;
      const left=this.x-this.width/2,right=this.x+this.width/2,top=this.y-this.height/2,bottom=this.y+this.height/2,previousBottom=previousY+this.height/2;
      const horizontal=right>obstacle.x&&left<obstacle.x+obstacle.w;
      if(horizontal&&this.vy>=0&&previousBottom<=obstacle.y+12&&bottom>=obstacle.y){this.y=obstacle.y-this.height/2;this.vy=0;this.onGround=true;continue}
      if(horizontal&&bottom>obstacle.y+10&&top<obstacle.y+obstacle.h){
        if(this.vx>0)this.x=obstacle.x-this.width/2;
        else if(this.vx<0)this.x=obstacle.x+obstacle.w+this.width/2;
        else{this.y=obstacle.y-this.height/2;this.vy=0;this.onGround=true}
        this.vx=0;
      }
    }
  }
  taskPose(animation,step){
    if(animation?.type!=="tool"||!step||animation.key!==step.key)return null;const workflow=TOOL_WORKFLOWS[step.tool],duration=animation.duration||workflow?.duration;if(!workflow||!duration)return null;
    const progress=clamp(animation.time/duration,0,1),phaseIndex=Math.max(0,workflow.phases.findLastIndex(phase=>progress>=phase.at)),phase=workflow.phases[phaseIndex],nextAt=workflow.phases[phaseIndex+1]?.at??1,phaseProgress=clamp((progress-phase.at)/Math.max(.001,nextAt-phase.at),0,1),smooth=phaseProgress*phaseProgress*(3-2*phaseProgress),pose={progress,phase,phaseIndex,phaseProgress,facing:this.facing||1,crouch:0,hand:{x:25,y:2},support:{x:13,y:8},toolAngle:0,toolScale:1};
    if(workflow.pose==="hammer"){const striking=phase.id.startsWith("strike"),swing=striking?smooth:phase.id==="aim"?0:1;pose.crouch=4;pose.hand={x:24+9*swing,y:-25+34*swing};pose.support={x:11,y:-1};pose.toolAngle=lerp(-1.08,.52,swing)}
    else if(workflow.pose==="scoop"){const reach=phase.id==="lower"?smooth:phase.id==="collect"?1:Math.max(0,1-smooth*.55);pose.crouch=9;pose.hand={x:27+7*reach,y:5+18*reach};pose.support={x:13,y:7};pose.toolAngle=.42+.34*reach}
    else if(workflow.pose==="tongs"){const reach=phase.id==="reach"?smooth:phase.id==="ready"?1-smooth*.45:1;pose.crouch=5;pose.hand={x:25+10*reach,y:3+8*reach};pose.support={x:12,y:7};pose.toolAngle=.12}
    else if(workflow.pose==="container"){pose.crouch=3;pose.hand={x:18,y:8};pose.support={x:8,y:phase.id==="seal"?-1:5};pose.toolScale=1.05}
    else if(workflow.pose==="probe"||workflow.pose==="sensor"){const reach=phase.id==="aim"?smooth:1;pose.crouch=this.swimming?0:3;pose.hand={x:24+10*reach,y:this.swimming?-2:2};pose.support={x:12,y:8};pose.toolAngle=this.swimming?-.08:.08}
    else if(workflow.pose==="drill"){pose.crouch=10;pose.hand={x:28,y:9};pose.support={x:18,y:-1};pose.toolAngle=.05;pose.toolScale=1.08}
    else if(workflow.pose==="service"){pose.crouch=4;pose.hand={x:29,y:4};pose.support={x:15,y:9};pose.toolAngle=.08}
    pose.handWorld={x:this.x+pose.facing*pose.hand.x,y:this.y+pose.hand.y};return pose;
  }
  drawLimb(ctx,shoulder,elbow,hand,width=7){ctx.strokeStyle="#dbe8ec";ctx.lineWidth=width;ctx.lineCap="round";ctx.lineJoin="round";ctx.beginPath();ctx.moveTo(shoulder.x,shoulder.y);ctx.lineTo(elbow.x,elbow.y);ctx.lineTo(hand.x,hand.y);ctx.stroke();ctx.fillStyle="#eef6f5";ctx.strokeStyle="#6d8792";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(hand.x,hand.y,width*.62,0,Math.PI*2);ctx.fill();ctx.stroke()}
  draw(ctx,time,mode,animation=null,step=null){
    if(mode==="space"){this.drawSpacecraft(ctx,time);return}const orbit=mode==="orbit",task=this.taskPose(animation,step),moving=Math.abs(this.vx)>15||Math.abs(this.vy)>15,bob=(task||this.groundedExpedition)?0:moving?Math.sin(this.walkPhase)*1.8:Math.sin(time*.003)*.8,walk=Math.sin(this.walkPhase),swim=this.swimming&&!task,crouch=task?.crouch||0;
    ctx.save();ctx.translate(this.x,this.y+bob);ctx.scale(this.facing,1);if(swim)ctx.rotate(Math.PI*.43);else if(orbit&&!task&&!this.groundedExpedition)ctx.rotate(Math.sin(time*.0017)*.035);ctx.shadowColor="#76e8ff";ctx.shadowBlur=orbit?11:3;
    ctx.fillStyle="#718894";ctx.strokeStyle="#334957";ctx.lineWidth=2;ctx.fillRect(-20,-17+crouch,12,39);ctx.strokeRect(-20,-17+crouch,12,39);ctx.fillStyle="#9eb2ba";ctx.fillRect(-22,-10+crouch,4,21);
    const hipY=20+crouch,leftKnee={x:-9+(swim?walk*3:task?-5:walk*4),y:33+crouch-(task?3:0)},rightKnee={x:9+(swim?-walk*3:task?4:-walk*4),y:33+crouch+(task?2:0)},leftFoot={x:-11+(swim?walk*7:task?-9:walk*8),y:47+crouch-(task?7:0)},rightFoot={x:11+(swim?-walk*7:task?9:-walk*8),y:47+crouch-(task?2:0)};
    this.drawLimb(ctx,{x:-8,y:hipY},leftKnee,leftFoot,8);this.drawLimb(ctx,{x:8,y:hipY},rightKnee,rightFoot,8);ctx.fillStyle="#aebfc5";ctx.strokeStyle="#536d79";ctx.lineWidth=1.5;for(const foot of [leftFoot,rightFoot]){ctx.beginPath();ctx.moveTo(foot.x-5,foot.y-2);ctx.lineTo(foot.x+8,foot.y-2);ctx.lineTo(foot.x+10,foot.y+4);ctx.lineTo(foot.x-5,foot.y+4);ctx.closePath();ctx.fill();ctx.stroke()}
    const torsoTop=-12+crouch,torsoBottom=23+crouch;ctx.fillStyle="#dbe8ec";ctx.strokeStyle="#687f89";ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(-18,torsoTop);ctx.lineTo(18,torsoTop);ctx.lineTo(14,torsoBottom);ctx.lineTo(-14,torsoBottom);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#edf4f3";ctx.fillRect(-12,-7+crouch,24,18);ctx.fillStyle="#263f50";ctx.fillRect(-8,-3+crouch,16,8);ctx.fillStyle="#ffae47";ctx.fillRect(-6,7+crouch,5,4);ctx.fillStyle="#61d9d5";ctx.fillRect(2,7+crouch,5,4);
    const frontHand=task?.hand||{x:22,y:8-walk*3},supportHand=task?.support||{x:-22,y:8+walk*3},frontElbow={x:lerp(16,frontHand.x,.48),y:lerp(-5+crouch,frontHand.y,.48)+(task?3:0)},supportElbow={x:lerp(-16,supportHand.x,.5),y:lerp(-5+crouch,supportHand.y,.5)+3};this.drawLimb(ctx,{x:16,y:-6+crouch},frontElbow,frontHand,7);this.drawLimb(ctx,{x:-16,y:-6+crouch},supportElbow,supportHand,7);
    ctx.fillStyle="#dce8eb";ctx.strokeStyle="#708893";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,-27+crouch,21,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#15384a";ctx.beginPath();ctx.ellipse(3,-28+crouch,15,12,0,0,Math.PI*2);ctx.fill();const visor=ctx.createLinearGradient(-7,-38,12,-20);visor.addColorStop(0,"rgba(155,230,239,.72)");visor.addColorStop(.55,"rgba(39,107,132,.5)");visor.addColorStop(1,"rgba(5,28,43,.9)");ctx.fillStyle=visor;ctx.beginPath();ctx.ellipse(3,-29+crouch,12,9.5,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(218,249,248,.65)";ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(0,-27+crouch,17,3.7,5.9);ctx.stroke();
    if((orbit&&moving&&!this.groundedExpedition)||this.thrusterFx>0){ctx.fillStyle=this.thrusterFx>0?"rgba(255,185,74,.9)":"rgba(91,220,255,.62)";ctx.beginPath();ctx.moveTo(-19,13+crouch);ctx.lineTo(-28-Math.random()*10,29+crouch);ctx.lineTo(-14,19+crouch);ctx.fill();ctx.fillStyle="rgba(91,220,255,.8)";ctx.beginPath();ctx.moveTo(-19,15+crouch);ctx.lineTo(-24-Math.random()*7,25+crouch);ctx.lineTo(-15,19+crouch);ctx.fill()}ctx.restore();
  }
  drawSpacecraft(ctx,time){const moving=Math.abs(this.vx)>12||Math.abs(this.vy)>12,angle=moving?Math.atan2(this.vy,this.vx):0;ctx.save();ctx.translate(this.x,this.y);ctx.rotate(angle);ctx.shadowColor="#63e6f5";ctx.shadowBlur=18;ctx.fillStyle="#dcecf1";ctx.strokeStyle="#658da0";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(38,0);ctx.lineTo(-22,-22);ctx.lineTo(-12,0);ctx.lineTo(-22,22);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#173d5a";ctx.beginPath();ctx.ellipse(5,0,12,9,0,0,Math.PI*2);ctx.fill();if(moving){ctx.fillStyle="#ffad52";ctx.beginPath();ctx.moveTo(-18,-10);ctx.lineTo(-45-Math.random()*18,0);ctx.lineTo(-18,10);ctx.fill();ctx.fillStyle="#74eaff";ctx.beginPath();ctx.moveTo(-18,-5);ctx.lineTo(-34-Math.random()*12,0);ctx.lineTo(-18,5);ctx.fill()}ctx.restore()}
}

class World {
  constructor(id){
    this.id=id;this.planet=PLANETS[id];
    if(id==="space"){
      this.width=3000;this.height=2200;this.ship={x:-500,y:-500,active:false};this.tool={active:false};this.ring={active:false};this.science=[];this.obstacles=[];this.pathHints=[];
      const tilt=.68;
      this.sun={x:1500,y:1100,radius:125};this.orbits=ORDER.map(id=>({rx:SOLAR_PATHS[id][0],ry:SOLAR_PATHS[id][0]*tilt}));this.moonOrbit={rx:170,ry:125,angle:-.8};
      const positions={};for(const id of ORDER)positions[id]=[this.sun.x+Math.cos(SOLAR_PATHS[id][1])*SOLAR_PATHS[id][0],this.sun.y+Math.sin(SOLAR_PATHS[id][1])*SOLAR_PATHS[id][0]*tilt];
      positions.moon=[positions.earth[0]+Math.cos(this.moonOrbit.angle)*this.moonOrbit.rx,positions.earth[1]+Math.sin(this.moonOrbit.angle)*this.moonOrbit.ry];
      this.planetNodes=DESTINATIONS.map(destination=>({id:destination,type:"destination",parent:destination==="moon"?"earth":null,x:positions[destination][0],y:positions[destination][1],radius:destination==="jupiter"?105:destination==="saturn"?90:destination==="moon"?40:65,active:true}));
      this.stars=Array.from({length:520},(_,index)=>({x:(index*431)%this.width,y:(index*277)%this.height,r:(index%3)+.5,d:(index%4+1)*.16}));this.meteors=this.makeMeteors();this.dust=[];return;
    }
    this.width=3600;this.height=id==="earth"?1180:720;
    this.water=id==="earth"?{shoreX:1220,surfaceY:552}:null;
    this.ship={x:250,y:470,w:145,h:120};
    this.tool={x:930,y:450,type:"tool",active:true};
    this.ring={x:3100,y:450,type:"ring",active:Boolean(this.planet.hasRing)};
    this.science=[{x:1500,y:450,type:"science",active:true}];
    this.obstacles=this.makeObstacles();this.pathHints=[];
    const starCount={mercury:115,venus:72,earth:0,moon:205,mars:135,jupiter:185,saturn:210,uranus:230,neptune:245}[id],seed=id.length*37+id.charCodeAt(0);
    this.stars=Array.from({length:starCount},(_,index)=>({x:(index*(397+seed)%this.width),y:(index*(157+seed*3)%503),r:.45+(index+seed)%3*.55,d:(index%4+1)*.16}));this.meteors=this.makeMeteors();this.dust=Array.from({length:55},(_,index)=>({x:(index*307)%this.width,y:320+(index*79)%300,r:1+index%3}));this.marineLife=this.makeMarineLife();this.geology=id==="mars"?MARS_GEOLOGY:null;
  }
  makeMarineLife(){if(this.id!=="earth")return null;return{
    schools:[
      {count:8,y:630,speed:34,size:5.4,spacing:19,phase:.04,direction:1,body:"#d4a94b",accent:"#526f7b",variant:0},
      {count:7,y:705,speed:28,size:6.2,spacing:23,phase:.2,direction:-1,body:"#7fa9a2",accent:"#d8c99b",variant:1},
      {count:9,y:790,speed:44,size:4.3,spacing:16,phase:.37,direction:1,body:"#bd7754",accent:"#e3bd72",variant:2},
      {count:6,y:855,speed:24,size:7,spacing:28,phase:.54,direction:-1,body:"#7893a1",accent:"#d4d0b8",variant:1},
      {count:8,y:915,speed:40,size:4.8,spacing:20,phase:.71,direction:1,body:"#b49a61",accent:"#465f6e",variant:0},
      {count:6,y:750,speed:31,size:5.8,spacing:24,phase:.87,direction:-1,body:"#638e8c",accent:"#c78d5d",variant:2}
    ],
    individuals:[
      {y:650,speed:18,size:14,phase:.11,body:"#668c9b",accent:"#d8b45d",variant:0},
      {y:735,speed:14,size:11,phase:.29,body:"#a96d5c",accent:"#dfc99d",variant:1},
      {y:825,speed:22,size:10,phase:.46,body:"#6e9d88",accent:"#cb9851",variant:2},
      {y:900,speed:16,size:13,phase:.63,body:"#667f94",accent:"#b9c1b0",variant:1},
      {y:775,speed:25,size:9,phase:.78,body:"#af8a58",accent:"#425d69",variant:0},
      {y:950,speed:12,size:15,phase:.91,body:"#5f8985",accent:"#be7956",variant:2}
    ],
    corals:[
      {x:1515,height:37,tone:"#a86155",tip:"#cf8065"},{x:1870,height:51,tone:"#91675c",tip:"#c79075"},{x:2310,height:42,tone:"#bd7658",tip:"#dc9a72"},{x:2640,height:33,tone:"#9e6b5a",tip:"#d29272"},{x:3060,height:48,tone:"#b76f5a",tip:"#dfa07a"},{x:3380,height:39,tone:"#8e675b",tip:"#c58d78"}
    ],
    plants:[[1430,34,"#477e66"],[1630,48,"#568d6b"],[1975,31,"#39776a"],[2410,44,"#54876a"],[2720,37,"#3f806f"],[3160,55,"#557f69"],[3440,32,"#39756c"]],
    anemones:[[1735,14,"#bd765e"],[2140,17,"#a96c70"],[2870,16,"#c08462"],[3250,13,"#9f7180"]],
    crabs:[[1590,8,.4],[2490,10,2.3],[3220,7,4.7]],
    starfish:[[1360,7,-.2,"#c97955"],[2200,8,.25,"#d29561"],[2920,7,-.35,"#b96e58"],[3470,6,.18,"#d2a064"]],
    shells:[[1280,6,"#e2d0ac"],[1810,5,"#c7a884"],[2555,7,"#e1c49b"],[3005,5,"#d8b58c"],[3340,6,"#bd9c7c"]]
  }}
  makeMeteors(){if(this.id==="earth")return[];return Array.from({length:4},(_,index)=>({delay:index*5.3+(this.id.length%4),duration:1.4+index*.34,depth:.28+index*.15,y:.1+((index*2+this.id.length)%5)*.1,size:.6+index*.27,direction:(index+this.id.length)%2?1:-1,slope:((index+this.id.charCodeAt(0))%3-1)*.1+.12}))}
  makeObstacles(){
    if(this.id==="saturn")return[];
    if(this.planet.mode==="orbit")return[1180,1780,2470].map((x,index)=>({x,y:this.groundAt(x)-(38+index*7),w:180+index*50,h:38+index*7}));
    if(this.id==="earth")return[1650,2320,2860].map((x,index)=>({x,y:this.groundAt(x)-(38+index*7),w:180+index*50,h:38+index*7}));
    const heights=this.id==="moon"?[38,55,45]:this.id==="mercury"?[40,45,55]:[45,55,60];
    return heights.map((height,index)=>{const x=1050+index*700;return{x,y:this.groundAt(x)-height,w:180+index*50,h:height}});
  }
  groundAt(x){if(this.id==="uranus")return 548+Math.sin(x*.0034+1.7)*13+Math.sin(x*.0091-.8)*5+Math.sin(x*.023+2.1)*2;if(this.planet.mode==="orbit")return 550;if(this.id==="earth"){const beach=538+Math.sin(x*.006)*7+Math.sin(x*.019)*2,seabed=980+Math.sin(x*.0041+1.2)*24+Math.sin(x*.013)*8,progress=clamp((x-this.water.shoreX)/1450,0,1),slope=progress*progress*(3-2*progress);return lerp(beach,seabed,slope)}if(this.id==="mars"){const geology=this.geology||MARS_GEOLOGY,base=548+Math.sin(x*.0037+.8)*13+Math.sin(x*.011-1.1)*5+Math.sin(x*.027)*2,lakeWeight=Math.pow(clamp(1-Math.abs(x-geology.lakebed.center)/geology.lakebed.width,0,1),2),lakebed=lerp(base,geology.lakebed.level+Math.sin(x*.036)*1.4,lakeWeight*.88),canyon=geology.canyon.depth*Math.exp(-Math.pow((x-geology.canyon.center)/geology.canyon.width,4)),leftRim=31*Math.exp(-Math.pow((x-geology.canyon.leftRim)/145,2)),rightRim=39*Math.exp(-Math.pow((x-geology.canyon.rightRim)/160,2));return lakebed+canyon-leftRim-rightRim}const roughness={moon:21,mercury:25,venus:18}[this.id]||16,phase=this.id.length*.7;return 555+Math.sin(x*.0031+phase)*roughness+Math.sin(x*.0087-phase)*roughness*.42+Math.sin(x*.021+phase)*roughness*.14}
  waterDepthAt(x){return this.water?Math.max(0,this.groundAt(x)-this.water.surfaceY):0}
  isWaterAt(x){return Boolean(this.water&&x>=this.water.shoreX&&this.waterDepthAt(x)>34)}
  isSubmerged(player){return Boolean(this.water&&this.isWaterAt(player.x)&&player.y-player.height/2>this.water.surfaceY+6)}
  waterImmersion(player){return this.water&&this.isWaterAt(player.x)?clamp((player.y-this.water.surfaceY+20)/190,0,1):0}
  objects(){if(this.id==="space")return this.planetNodes;return[this.ship,this.tool,this.ring,this.observation,this.contact,...this.science,...(this.steps||[]),...(this.extraTools||[])].filter(object=>object&&object.active!==false)}
  drawBackground(ctx,camera,time,canvas){
    if(this.id==="earth"){this.drawEarthBackground(ctx,camera,time,canvas);return}
    if(this.id==="mars"){this.drawMarsBackground(ctx,camera,time,canvas);this.drawAtmosphere(ctx,camera,time,canvas);this.drawAtmosphericFlow(ctx,camera,time,canvas);return}
    const gradient=ctx.createLinearGradient(0,0,0,canvas.height);gradient.addColorStop(0,this.planet.sky[0]);gradient.addColorStop(1,this.planet.sky[1]);ctx.fillStyle=gradient;ctx.fillRect(0,0,canvas.width,canvas.height);
    for(const star of this.stars){const x=((star.x-camera.x*star.d)%canvas.width+canvas.width)%canvas.width,y=((star.y-camera.y*.12)%canvas.height+canvas.height)%canvas.height;ctx.globalAlpha=.25+star.d;ctx.fillStyle="#d8f5ff";ctx.beginPath();ctx.arc(x,y,star.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
    this.drawMeteors(ctx,camera,time,canvas);
    if(this.id==="mercury"){const seconds=time/1000;ctx.save();for(let index=0;index<10;index++){const x=((index*197+seconds*(2.2+index%3))%(canvas.width+100))-50,y=95+(index*83)%390;ctx.globalAlpha=.06+(index%4)*.025;ctx.fillStyle=index%3?"#ffe6a8":"#d8f5ff";ctx.beginPath();ctx.arc(x,y,.45+(index%3)*.3,0,Math.PI*2);ctx.fill()}ctx.restore()}
    if(this.planet.mode==="surface"){
      const solarDistance={mercury:.35,venus:.5,earth:.7,moon:.7,mars:1}[this.id]||.7,sunX=canvas.width*(.13+solarDistance*.08),sunY=canvas.height*.17,mercury=this.id==="mercury",venus=this.id==="venus",sunRadius=mercury?15:9-3*solarDistance,glowRadius=mercury?330:venus?245:170-60*solarDistance;
      const sunlight=ctx.createRadialGradient(sunX,sunY,mercury?2:venus?22:3,sunX,sunY,glowRadius);sunlight.addColorStop(0,mercury?"rgba(255,255,232,1)":venus?"rgba(255,222,151,.24)":"rgba(255,248,205,.95)");sunlight.addColorStop(mercury?.16:venus?.5:.12,mercury?"rgba(255,199,74,.68)":venus?"rgba(239,159,79,.1)":`rgba(255,211,112,${.5-.18*solarDistance})`);sunlight.addColorStop(1,"rgba(255,190,80,0)");ctx.fillStyle=sunlight;ctx.fillRect(0,0,canvas.width,canvas.height);
      if(!venus){ctx.fillStyle=mercury?"#fffdec":"#fff4c7";ctx.shadowColor=mercury?"#ffc34f":"transparent";ctx.shadowBlur=mercury?28:0;ctx.beginPath();ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
      if(mercury){const exposure=ctx.createLinearGradient(0,0,canvas.width,canvas.height);exposure.addColorStop(0,"rgba(255,218,125,.19)");exposure.addColorStop(.38,"rgba(255,185,72,.045)");exposure.addColorStop(1,"rgba(13,8,7,.22)");ctx.fillStyle=exposure;ctx.fillRect(0,0,canvas.width,canvas.height);const glare=ctx.createRadialGradient(sunX,sunY,10,sunX,sunY,canvas.width*.42);glare.addColorStop(0,"rgba(255,246,195,.16)");glare.addColorStop(.22,"rgba(255,202,92,.055)");glare.addColorStop(1,"rgba(255,190,80,0)");ctx.fillStyle=glare;ctx.fillRect(0,0,canvas.width,canvas.height)}
      if(this.id==="moon")this.drawDistantBody(ctx,"earth",canvas.width*.78-camera.x*.008,canvas.height*.19-camera.y*.006,24);
      else if(this.id==="earth")this.drawMoon(ctx,{radius:8,tone:"#b9bcc1"},canvas.width*.78-camera.x*.008,canvas.height*.22-camera.y*.006);
      else this.drawDistantSolarBody(ctx,camera,canvas);
      const horizon=canvas.height*.72-camera.y*.05;ctx.save();ctx.translate(-camera.x*.1,0);ctx.fillStyle=this.id==="mars"?"#54271f":this.id==="venus"?"#625d4e":this.id==="earth"?"#263b38":"#292b2d";
      ctx.beginPath();ctx.moveTo(-300,horizon+100);for(let index=0;index<18;index++){const x=index*280-300,peak=horizon-28-(index%4)*18;ctx.lineTo(x, horizon+35);ctx.quadraticCurveTo(x+105,peak,x+280,horizon+35)}ctx.lineTo(4800,canvas.height);ctx.lineTo(-300,canvas.height);ctx.fill();ctx.restore();
      if(this.id==="mercury")this.drawMercuryHorizon(ctx,camera,canvas);
      else if(this.id==="venus")this.drawVenusHorizon(ctx,camera,canvas);
    }else this.drawOrbitalContext(ctx,camera,time,canvas);
    this.drawAtmosphere(ctx,camera,time,canvas);
    this.drawAtmosphericFlow(ctx,camera,time,canvas);
  }
  drawMarsBackground(ctx,camera,time,canvas){
    const seconds=time/1000,horizon=canvas.height*.7-camera.y*.045,sky=ctx.createLinearGradient(0,0,0,Math.max(horizon+80,canvas.height*.72));
    sky.addColorStop(0,"#6f5050");sky.addColorStop(.48,"#aa7866");sky.addColorStop(1,"#d0aa82");ctx.fillStyle=sky;ctx.fillRect(0,0,canvas.width,canvas.height);
    const sunX=canvas.width*.22-camera.x*.003,sunY=canvas.height*.16,sunRadius=6,glow=ctx.createRadialGradient(sunX,sunY,2,sunX,sunY,145);glow.addColorStop(0,"rgba(255,244,205,.9)");glow.addColorStop(.18,"rgba(255,213,147,.3)");glow.addColorStop(1,"rgba(255,190,118,0)");ctx.fillStyle=glow;ctx.fillRect(sunX-145,sunY-145,290,290);ctx.fillStyle="#fff1c4";ctx.beginPath();ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.translate(-camera.x*.055,0);ctx.fillStyle="rgba(91,70,62,.3)";ctx.beginPath();ctx.moveTo(-300,horizon+45);ctx.lineTo(20,horizon+35);ctx.quadraticCurveTo(330,horizon-22,560,horizon-96);ctx.quadraticCurveTo(820,horizon-174,1100,horizon-101);ctx.quadraticCurveTo(1340,horizon-35,1660,horizon+32);ctx.lineTo(4300,horizon+48);ctx.lineTo(4300,canvas.height);ctx.lineTo(-300,canvas.height);ctx.closePath();ctx.fill();
    ctx.fillStyle="rgba(61,53,52,.52)";ctx.beginPath();ctx.moveTo(-300,canvas.height);ctx.lineTo(-300,horizon+42);for(let ridge=0;ridge<13;ridge++){const x=ridge*360-220,peak=horizon-18-(ridge%4)*15;ctx.lineTo(x,horizon+38);ctx.quadraticCurveTo(x+95,peak,x+190,horizon+16);ctx.quadraticCurveTo(x+275,horizon-9,x+360,horizon+39)}ctx.lineTo(4300,canvas.height);ctx.closePath();ctx.fill();ctx.restore();
    for(const moon of MARS_GEOLOGY.moons){const x=canvas.width*moon.x-camera.x*.004+Math.sin(seconds*.006+moon.phase)*8,y=canvas.height*moon.y-camera.y*.003;ctx.save();ctx.translate(x,y);ctx.rotate(moon.phase+seconds*.0008);ctx.fillStyle=moon.tone;ctx.beginPath();for(let point=0;point<8;point++){const angle=point*Math.PI/4,radius=moon.radius*(.78+(point%3)*.12);ctx.lineTo(Math.cos(angle)*radius,Math.sin(angle)*radius*.72)}ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(42,31,29,.5)";ctx.lineWidth=1;ctx.stroke();ctx.restore()}
    const horizonFade=ctx.createLinearGradient(0,horizon-95,0,horizon+80);horizonFade.addColorStop(0,"rgba(196,139,96,0)");horizonFade.addColorStop(.7,"rgba(196,139,96,.12)");horizonFade.addColorStop(1,"rgba(196,139,96,.2)");ctx.fillStyle=horizonFade;ctx.fillRect(0,horizon-95,canvas.width,175);
  }
  drawEarthBackground(ctx,camera,time,canvas){
    const seconds=time/1000,surface=(this.water.surfaceY-camera.y)*(camera.zoom||1),shore=(this.water.shoreX-camera.x)*(camera.zoom||1),sunX=canvas.width*.18-camera.x*.006,sunY=Math.max(64,Math.min(150,surface*.2)),sunRadius=8;
    const sky=ctx.createLinearGradient(0,0,0,Math.max(surface,canvas.height*.58));sky.addColorStop(0,"#4aaee0");sky.addColorStop(.52,"#8ed2e8");sky.addColorStop(1,"#e5f4df");ctx.fillStyle=sky;ctx.fillRect(0,0,canvas.width,canvas.height);
    const glow=ctx.createRadialGradient(sunX,sunY,sunRadius,sunX,sunY,190);glow.addColorStop(0,"rgba(255,253,218,.95)");glow.addColorStop(.18,"rgba(255,235,151,.42)");glow.addColorStop(1,"rgba(255,239,183,0)");ctx.fillStyle=glow;ctx.fillRect(sunX-190,sunY-190,380,380);ctx.fillStyle="#fffbd8";ctx.beginPath();ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2);ctx.fill();
    ctx.save();for(let index=0;index<7;index++){const width=115+index%3*36,x=((index*257+seconds*(5+index%2))%(canvas.width+width*2))-width,y=68+(index*71)%205;ctx.globalAlpha=.24+index%3*.07;ctx.fillStyle="#f8ffff";ctx.beginPath();ctx.ellipse(x,y,width*.42,15+index%2*4,0,0,Math.PI*2);ctx.ellipse(x-width*.22,y+5,width*.28,11,0,0,Math.PI*2);ctx.ellipse(x+width*.26,y+4,width*.32,12,0,0,Math.PI*2);ctx.fill()}ctx.restore();
    ctx.save();ctx.strokeStyle="rgba(31,78,91,.38)";ctx.lineWidth=1.5;for(let index=0;index<5;index++){const x=((index*293-seconds*(8+index))%(canvas.width+80)+canvas.width+80)% (canvas.width+80)-40,y=115+(index%3)*34;ctx.beginPath();ctx.arc(x-7,y,8,3.45,5.85);ctx.arc(x+7,y,8,3.58,6);ctx.stroke()}ctx.restore();
    const farHorizon=Math.max(0,surface-2),farOceanLeft=Math.min(canvas.width,Math.max(-30,shore-24)),farOcean=ctx.createLinearGradient(shore,0,shore+620,0);farOcean.addColorStop(0,"rgba(92,194,205,0)");farOcean.addColorStop(.18,"rgba(92,194,205,.18)");farOcean.addColorStop(.55,"rgba(52,168,187,.52)");farOcean.addColorStop(1,"rgba(26,139,169,.78)");ctx.fillStyle=farOcean;ctx.fillRect(farOceanLeft,farHorizon,canvas.width-farOceanLeft,Math.max(0,surface-farHorizon+8));ctx.strokeStyle="rgba(232,255,239,.5)";ctx.lineWidth=1.5;ctx.beginPath();for(let x=farOceanLeft+76;x<=canvas.width+30;x+=38)ctx.lineTo(x,farHorizon+Math.sin(x*.035+seconds*.5)*1.5);ctx.stroke();
    const oceanTop=Math.max(-20,surface-5),oceanLeft=Math.min(canvas.width,Math.max(-30,shore-24)),ocean=ctx.createLinearGradient(shore,0,shore+720,0);ocean.addColorStop(0,"rgba(125,218,211,0)");ocean.addColorStop(.14,"rgba(102,207,205,.14)");ocean.addColorStop(.36,"rgba(55,172,190,.48)");ocean.addColorStop(.68,"rgba(20,112,151,.82)");ocean.addColorStop(1,"rgba(8,66,103,.96)");ctx.fillStyle=ocean;ctx.fillRect(oceanLeft,oceanTop,canvas.width-oceanLeft,canvas.height-oceanTop);
    ctx.save();ctx.beginPath();ctx.rect(oceanLeft,oceanTop,canvas.width-oceanLeft,canvas.height-oceanTop);ctx.clip();for(let index=0;index<12;index++){const y=oceanTop+8+index*14,xOffset=Math.sin(seconds*.7+index)*24;ctx.strokeStyle=`rgba(224,252,238,${.26-index*.012})`;ctx.lineWidth=index<3?2:1;ctx.beginPath();for(let x=oceanLeft-80;x<canvas.width+100;x+=95){const waveY=y+Math.sin(x*.025+seconds*(1.1+index*.03)+index)*2.5;ctx.moveTo(x+xOffset,waveY);ctx.quadraticCurveTo(x+24+xOffset,waveY-3,x+48+xOffset,waveY)}ctx.stroke()}const reflection=ctx.createLinearGradient(sunX-85,0,sunX+120,0);reflection.addColorStop(0,"rgba(255,248,195,0)");reflection.addColorStop(.5,"rgba(255,248,195,.2)");reflection.addColorStop(1,"rgba(255,248,195,0)");ctx.fillStyle=reflection;ctx.beginPath();ctx.moveTo(sunX-18,oceanTop);ctx.lineTo(sunX+90,canvas.height);ctx.lineTo(sunX-120,canvas.height);ctx.closePath();ctx.fill();ctx.restore();
    if(surface<canvas.height){const depth=ctx.createLinearGradient(0,Math.max(0,surface),0,canvas.height);depth.addColorStop(0,"rgba(23,151,177,.18)");depth.addColorStop(.45,"rgba(4,92,128,.48)");depth.addColorStop(1,"rgba(2,45,76,.76)");ctx.fillStyle=depth;ctx.fillRect(0,Math.max(0,surface),canvas.width,canvas.height-Math.max(0,surface))}
  }
  drawMercuryHorizon(ctx,camera,canvas){
    const horizon=canvas.height*.72-camera.y*.045,offset=-camera.x*.045;ctx.save();ctx.translate(offset,0);ctx.fillStyle="rgba(24,23,23,.72)";for(const [x,radius,depth] of [[250,150,30],[1120,240,48],[2250,185,37],[3330,280,52]]){ctx.beginPath();ctx.ellipse(x,horizon+depth*.72,radius,depth,0,Math.PI,Math.PI*2);ctx.lineTo(x+radius,horizon+55);ctx.lineTo(x-radius,horizon+55);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(180,176,164,.22)";ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,horizon+depth*.55,radius,depth,0,Math.PI,Math.PI*2);ctx.stroke()}ctx.strokeStyle="rgba(137,131,121,.34)";ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-200,horizon+20);for(let x=-200;x<4300;x+=430)ctx.lineTo(x,horizon-18-((x/430)%3)*12);ctx.stroke();ctx.restore();
  }
  drawVenusHorizon(ctx,camera,canvas){
    const horizon=canvas.height*.69-camera.y*.04,offset=-camera.x*.035;ctx.save();ctx.translate(offset,0);ctx.fillStyle="rgba(50,47,41,.44)";ctx.beginPath();ctx.moveTo(-300,canvas.height);ctx.lineTo(-300,horizon+30);for(let index=0;index<11;index++){const x=index*390-240,peak=horizon-55-(index%3)*24;ctx.lineTo(x,horizon+28);ctx.quadraticCurveTo(x+105,peak,x+205,horizon+8);ctx.quadraticCurveTo(x+290,horizon-24,x+390,horizon+32)}ctx.lineTo(4400,canvas.height);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(58,52,44,.5)";for(const [x,width,height] of [[520,240,105],[1710,330,145],[2860,270,120]]){ctx.beginPath();ctx.moveTo(x-width,horizon+42);ctx.quadraticCurveTo(x-width*.42,horizon-height*.2,x-width*.18,horizon-height*.72);ctx.quadraticCurveTo(x,horizon-height,x+width*.18,horizon-height*.72);ctx.quadraticCurveTo(x+width*.42,horizon-height*.2,x+width,horizon+42);ctx.closePath();ctx.fill()}ctx.restore();
  }
  solarPosition(id){const [distance,angle]=SOLAR_PATHS[id];return{x:Math.cos(angle)*distance,y:Math.sin(angle)*distance*.68}}
  nearestSolarNeighbor(){if(!SOLAR_PATHS[this.id])return null;const here=this.solarPosition(this.id);return ORDER.filter(id=>id!==this.id).map(id=>{const there=this.solarPosition(id);return{id,distance:Math.hypot(there.x-here.x,there.y-here.y),dx:there.x-here.x,dy:there.y-here.y}}).sort((first,second)=>first.distance-second.distance)[0]}
  drawDistantBody(ctx,id,x,y,radius){ctx.save();ctx.translate(x,y);if(id==="saturn")this.drawSaturnRings(ctx,radius,false);this.paintPlanet(ctx,id,radius);if(id==="saturn")this.drawSaturnRings(ctx,radius,true);ctx.restore()}
  drawMoon(ctx,moon,x,y){ctx.save();ctx.translate(x,y);ctx.fillStyle=moon.tone;ctx.beginPath();ctx.arc(0,0,moon.radius,0,Math.PI*2);ctx.fill();const shade=ctx.createRadialGradient(-moon.radius*.35,-moon.radius*.35,1,moon.radius*.2,moon.radius*.1,moon.radius*1.4);shade.addColorStop(0,"#ffffff42");shade.addColorStop(1,"#000000a8");ctx.fillStyle=shade;ctx.beginPath();ctx.arc(0,0,moon.radius,0,Math.PI*2);ctx.fill();ctx.restore()}
  drawDistantSolarBody(ctx,camera,canvas){const neighbor=this.nearestSolarNeighbor();if(!neighbor||neighbor.distance>950)return;const edgeX=neighbor.dx>=0?.88:.12,edgeY=clamp(.23+neighbor.dy/2400,.12,.38),radius=clamp(8-neighbor.distance/170,2,5);this.drawDistantBody(ctx,neighbor.id,canvas.width*edgeX-camera.x*.004,canvas.height*edgeY-camera.y*.003,radius)}
  drawOrbitalContext(ctx,camera,time,canvas){
    const distance=SOLAR_PATHS[this.id]?.[0]||1000,sunX=canvas.width*.1-camera.x*.002,sunY=canvas.height*.13-camera.y*.002,sunRadius=clamp(12-distance/150,3,8),glow=ctx.createRadialGradient(sunX,sunY,1,sunX,sunY,sunRadius*9);glow.addColorStop(0,"rgba(255,245,190,.8)");glow.addColorStop(1,"rgba(255,193,83,0)");ctx.fillStyle=glow;ctx.fillRect(sunX-sunRadius*9,sunY-sunRadius*9,sunRadius*18,sunRadius*18);ctx.fillStyle="#fff1bd";ctx.beginPath();ctx.arc(sunX,sunY,sunRadius,0,Math.PI*2);ctx.fill();
    this.drawDistantSolarBody(ctx,camera,canvas);
    const moons=SYSTEM_MOONS[this.id]||[];for(let index=0;index<moons.length;index++){const moon=moons[index],angle=moon.phase+time*.000015*(index%2?1:-1),x=canvas.width*(.5+Math.cos(angle)*moon.orbit/Math.max(canvas.width,700)),y=canvas.height*(.26+Math.sin(angle)*.13)-camera.y*.003;this.drawMoon(ctx,moon,x,y)}
    if(this.id==="saturn"){ctx.save();ctx.translate(canvas.width*.72-camera.x*.006,canvas.height*.23);ctx.rotate(-.22);for(let band=0;band<7;band++){ctx.strokeStyle=`rgba(232,210,164,${.08+band*.018})`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,canvas.width*(.18+band*.013),canvas.height*(.025+band*.004),0,0,Math.PI*2);ctx.stroke()}ctx.restore()}
    if(["uranus","neptune"].includes(this.id)){ctx.save();ctx.translate(canvas.width*(this.id==="uranus"?.76:.68)-camera.x*.004,canvas.height*.25);ctx.rotate(this.id==="uranus"?1.25:-.18);for(let band=0;band<3;band++){ctx.strokeStyle=this.id==="uranus"?`rgba(151,225,230,${.1-band*.02})`:`rgba(99,135,211,${.08-band*.018})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,90+band*11,13+band*2,0,-2.5,.6);ctx.stroke()}ctx.restore()}
  }
  drawMeteors(ctx,camera,time,canvas){const cycle=27,seconds=time/1000;ctx.save();ctx.lineCap="round";for(const meteor of this.meteors){const local=(seconds-meteor.delay+cycle)%cycle;if(local>meteor.duration)continue;const progress=local/meteor.duration,start=meteor.direction>0?-canvas.width*.12:canvas.width*1.12,x=start+meteor.direction*progress*canvas.width*1.24-camera.x*.012*meteor.depth,y=canvas.height*meteor.y+progress*canvas.height*meteor.slope-camera.y*.008*meteor.depth,alpha=Math.sin(progress*Math.PI)*(.18+meteor.depth*.28),length=(30+meteor.depth*48)*meteor.size,tailX=x-meteor.direction*length,tailY=y-meteor.slope*length;const tail=ctx.createLinearGradient(x,y,tailX,tailY);tail.addColorStop(0,`rgba(255,249,220,${alpha})`);tail.addColorStop(1,"rgba(255,205,125,0)");ctx.strokeStyle=tail;ctx.lineWidth=meteor.size;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tailX,tailY);ctx.stroke();ctx.fillStyle=`rgba(255,250,225,${alpha})`;ctx.beginPath();ctx.arc(x,y,meteor.size*1.2,0,Math.PI*2);ctx.fill()}ctx.restore()}
  drawJupiterFlowField(ctx,camera,time,canvas){
    const seconds=time/1000,state=jupiterFlowState(seconds),step=Math.max(110,canvas.width/10);ctx.save();ctx.fillStyle="rgba(163,116,83,.09)";ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let index=0;index<JUPITER_FLOW_LAYERS.length;index++){const layer=JUPITER_FLOW_LAYERS[index],base=canvas.height*layer.y,flow=state.clock*layer.speed*layer.direction,wave=(x,bottom=false)=>{const worldX=x+camera.x*layer.depth,local=.42+.58*(.5+.5*Math.sin(worldX*.0023-seconds*.18+layer.phase)),amplitude=layer.amplitude*(1+(state.amplitude-1)*local),primary=Math.sin(worldX*layer.frequency-flow+layer.phase)*amplitude,curl=Math.sin(worldX*layer.frequency*2.17+flow*.58+layer.phase*1.6)*amplitude*.36,swell=Math.sin(worldX*.0017-flow*.24+layer.phase)*amplitude*.24,turbulence=Math.sin(worldX*.0031+seconds*(.16+index*.021)+layer.phase)*3.2*state.turbulence,edge=bottom?layer.thickness+Math.sin(worldX*.0042-flow*.31+layer.phase)*5*state.amplitude:0;return base+primary+curl+swell+turbulence+edge},gradient=ctx.createLinearGradient(0,base-layer.amplitude*2,0,base+layer.thickness+layer.amplitude*2);gradient.addColorStop(0,`rgba(${layer.color},0)`);gradient.addColorStop(.28,`rgba(${layer.color},${layer.alpha*.58})`);gradient.addColorStop(.52,`rgba(${layer.color},${layer.alpha})`);gradient.addColorStop(.78,`rgba(${layer.color},${layer.alpha*.48})`);gradient.addColorStop(1,`rgba(${layer.color},0)`);ctx.fillStyle=gradient;ctx.beginPath();let previous=-step;ctx.moveTo(previous,wave(previous));for(let x=0;x<=canvas.width+step;x+=step){const third=(x-previous)/3;ctx.bezierCurveTo(previous+third,wave(previous+third),x-third,wave(x-third),x,wave(x));previous=x}previous=canvas.width+step;ctx.bezierCurveTo(previous,wave(previous),previous,wave(previous,true),previous,wave(previous,true));for(let x=canvas.width;x>=-step;x-=step){const third=(previous-x)/3;ctx.bezierCurveTo(previous-third,wave(previous-third,true),x+third,wave(x+third,true),x,wave(x,true));previous=x}ctx.bezierCurveTo(previous,wave(previous,true),previous,wave(previous),previous,wave(previous));ctx.closePath();ctx.fill()}
    ctx.restore();
  }
  drawJupiterGreatRedSpot(ctx,camera,time,canvas){
    const seconds=time/1000,radiusX=clamp(canvas.width*.095,72,132),radiusY=radiusX*.43,x=760-camera.x*.82,y=canvas.height*.49+Math.sin(seconds*.18)*3;if(x+radiusX*2<0||x-radiusX*2>canvas.width)return;ctx.save();
    const wake=ctx.createLinearGradient(x-radiusX*1.9,y,x+radiusX*1.9,y);wake.addColorStop(0,"rgba(174,103,76,0)");wake.addColorStop(.28,"rgba(194,119,82,.13)");wake.addColorStop(.5,"rgba(229,161,112,.2)");wake.addColorStop(.72,"rgba(172,94,72,.12)");wake.addColorStop(1,"rgba(174,103,76,0)");ctx.fillStyle=wake;
    for(const direction of [-1,1]){const bandY=y+direction*radiusY*.58+Math.sin(seconds*.14+direction)*3;ctx.beginPath();ctx.moveTo(x-radiusX*1.9,bandY);ctx.bezierCurveTo(x-radiusX*.9,bandY-direction*7,x-radiusX*.55,bandY-direction*12,x,bandY-direction*9);ctx.bezierCurveTo(x+radiusX*.55,bandY-direction*12,x+radiusX*.9,bandY-direction*5,x+radiusX*1.9,bandY);ctx.bezierCurveTo(x+radiusX*.8,bandY+direction*8,x-radiusX*.8,bandY+direction*8,x-radiusX*1.9,bandY);ctx.closePath();ctx.fill()}
    ctx.translate(x,y);ctx.rotate(-.07+Math.sin(seconds*.11)*.012);ctx.beginPath();ctx.ellipse(0,0,radiusX,radiusY,0,0,Math.PI*2);ctx.clip();const depth=ctx.createRadialGradient(-radiusX*.2,-radiusY*.18,radiusY*.08,0,0,radiusX*1.04);depth.addColorStop(0,"rgba(247,190,137,.78)");depth.addColorStop(.48,"rgba(199,105,73,.72)");depth.addColorStop(.82,"rgba(151,70,58,.58)");depth.addColorStop(1,"rgba(125,66,58,.18)");ctx.fillStyle=depth;ctx.fillRect(-radiusX,-radiusY,radiusX*2,radiusY*2);
    for(let layer=0;layer<7;layer++){const direction=layer%2?-1:1,phase=seconds*(.045+layer*.006)*direction+layer*1.27,offsetX=Math.cos(phase)*radiusX*(.08+layer*.012),offsetY=Math.sin(phase*1.3)*radiusY*(.09+layer*.009),width=radiusX*(.82-layer*.065),height=radiusY*(.22+layer%3*.055);ctx.fillStyle=`rgba(${layer%3===0?"245,188,136":layer%3===1?"169,79,62":"220,132,87"},${.18+layer*.018})`;ctx.beginPath();ctx.ellipse(offsetX,offsetY,width,height,Math.sin(phase)*.14,0,Math.PI*2);ctx.fill()}
    ctx.fillStyle="rgba(116,57,54,.4)";ctx.beginPath();ctx.ellipse(Math.sin(seconds*.055)*radiusX*.035,Math.cos(seconds*.047)*radiusY*.04,radiusX*.3,radiusY*.28,-seconds*.012,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  drawAtmosphere(ctx,camera,time,canvas){if(this.id==="space"||["moon","mercury"].includes(this.id))return;if(this.id==="jupiter"){this.drawJupiterFlowField(ctx,camera,time,canvas);this.drawJupiterGreatRedSpot(ctx,camera,time,canvas);return}const seconds=time/1000,styles=ATMOSPHERE_PROFILES[this.id];if(!styles)return;const pulse=Math.pow(.5+.5*Math.sin(seconds*styles.gustRate+styles.phase),4),clock=seconds*(1+styles.gust*.5)-Math.cos(seconds*styles.gustRate+styles.phase)*styles.gust/(2*styles.gustRate);ctx.save();ctx.fillStyle=styles.haze;ctx.fillRect(0,0,canvas.width,canvas.height);for(let layer=0;layer<styles.layers;layer++){const y=canvas.height*(.18+layer*.105),direction=layer%2?-.55:1,depth=.35+(layer%4)*.22,drift=clock*styles.drift*direction*depth,amplitude=1+styles.gust*pulse*(.35+depth*.25),thickness=38+layer%3*9;ctx.fillStyle=styles.cloud;ctx.beginPath();ctx.moveTo(-140,y+Math.sin(drift*.009+layer)*12*amplitude);for(let x=-140;x<=canvas.width+140;x+=120){const top=y+Math.sin((x+drift)*.009+layer)*15*amplitude+Math.sin((x-drift*.3)*.021-layer)*5;ctx.quadraticCurveTo(x+60,top-12,x+120,top)}for(let x=canvas.width+140;x>=-140;x-=120){const bottom=y+thickness+Math.sin((x-drift*.65)*.007-layer)*13*amplitude+Math.sin((x+drift*.2)*.018+layer)*5;ctx.quadraticCurveTo(x-60,bottom+10,x-120,bottom)}ctx.closePath();ctx.fill()}if(this.id==="venus"){ctx.globalAlpha=.06+.012*Math.sin(seconds*.18);ctx.fillStyle="#fff1c2";ctx.fillRect(0,0,canvas.width,canvas.height)}ctx.restore()}
  drawAtmosphericFlow(ctx,camera,time,canvas){
    if(["space","moon","mercury","jupiter"].includes(this.id))return;
    const environment=ATMOSPHERE_PROFILES[this.id],profile=environment?.flow;if(!profile)return;
    const seconds=time/1000,pulse=Math.pow(.5+.5*Math.sin(seconds*environment.gustRate+environment.phase),4),clock=seconds*(1+environment.gust*.5)-Math.cos(seconds*environment.gustRate+environment.phase)*environment.gust/(2*environment.gustRate),margin=profile.width,range=canvas.width+margin*2;ctx.save();
    for(let index=0;index<profile.count;index++){const depth=.32+(index%3)*.25,direction=profile.directions[index%profile.directions.length],gustSpeed=1+(profile.burst||0)*pulse*(.45+depth*.4),speed=profile.drift*(.28+(index%4)*.17)*gustSpeed,seed=(index*.271+this.id.length*.083)%1,travel=((seed*range+clock*speed*direction)%range+range)%range,x=travel-margin-camera.x*(.0015+depth*.0015),curveRate=(profile.turbulence?.14:.025)+index*(profile.turbulence?.012:.004),sway=profile.sway*(1+environment.gust*pulse),turbulence=(profile.turbulence||0)*Math.sin(seconds*(.48+index*.019)+index*2.3),y=canvas.height*(.19+((index*31+this.id.length*7)%51)/100)+Math.sin(seconds*curveRate+index*1.9)*sway+Math.sin(seconds*(profile.turbulence?.31:.011)+index)*sway*.35+turbulence,width=profile.width*(.72+depth*.38)*(1+(profile.burst||0)*pulse*.12),height=profile.height*(.72+depth*.32),life=.62+.38*Math.sin(seed*Math.PI+seconds*(profile.turbulence?.21:.018)),alpha=profile.alpha*life*(.7+depth*.3)*(1+environment.gust*pulse*.3);ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(seconds*(profile.turbulence?.24:.013)+index*1.4)*.055);const cloud=ctx.createRadialGradient(-width*.12,-height*.08,height*.08,0,0,width*.58);cloud.addColorStop(0,`rgba(${profile.color},${alpha})`);cloud.addColorStop(.62,`rgba(${profile.color},${alpha*.52})`);cloud.addColorStop(1,`rgba(${profile.color},0)`);ctx.fillStyle=cloud;ctx.beginPath();ctx.moveTo(-width*.52,0);ctx.bezierCurveTo(-width*.35,-height*.7,width*.3,-height*.72,width*.52,0);ctx.quadraticCurveTo(width*.28,height*.62,0,height*.45);ctx.quadraticCurveTo(-width*.32,height*.68,-width*.52,0);ctx.closePath();ctx.fill();ctx.restore();
      for(let mote=0;mote<profile.motes;mote++){const motePhase=seconds*(.018+mote*.006)+index*1.7,moteX=x+Math.cos(motePhase)*width*.32,moteY=y+Math.sin(motePhase*.73)*height*.8;ctx.fillStyle=`rgba(${profile.color},${alpha*.55})`;ctx.beginPath();ctx.arc(moteX,moteY,.8+depth*1.1,0,Math.PI*2);ctx.fill()}
    }ctx.restore();
  }
  paintPlanet(ctx,id,radius){
    const planet=PLANETS[id];ctx.save();ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.clip();ctx.fillStyle=planet.color;ctx.fillRect(-radius,-radius,radius*2,radius*2);
    if(id==="uranus"){
      const ice=ctx.createRadialGradient(-radius*.38,-radius*.4,radius*.05,radius*.12,radius*.16,radius*1.2);ice.addColorStop(0,"#d8fbf7");ice.addColorStop(.42,"#8fdde0");ice.addColorStop(.78,"#58b8c3");ice.addColorStop(1,"#2d7383");ctx.fillStyle=ice;ctx.fillRect(-radius,-radius,radius*2,radius*2);ctx.fillStyle="rgba(225,255,252,.09)";for(const [x,y,size] of [[-.2,-.36,.72],[.18,.02,.9],[-.08,.43,.68]]){ctx.beginPath();ctx.ellipse(radius*x,radius*y,radius*size,radius*.12,.08,0,Math.PI*2);ctx.fill()}
    }else if(["venus","jupiter","saturn","neptune"].includes(id)){
      for(let band=-5;band<6;band++){ctx.fillStyle=band%2?"#ffffff26":"#281c3526";ctx.fillRect(-radius,band*radius/5,radius*2,radius*.1)}
      if(id==="jupiter"){ctx.fillStyle="#ae513b";ctx.beginPath();ctx.ellipse(radius*.3,radius*.3,radius*.26,radius*.12,-.12,0,Math.PI*2);ctx.fill()}
    }else if(id==="earth"){
      ctx.fillStyle="#62aa85";for(const [offsetX,offsetY,rotation] of [[-.4,-.3,.6],[.15,.1,-.4],[.5,-.45,.7]]){ctx.beginPath();ctx.ellipse(radius*offsetX,radius*offsetY,radius*.23,radius*.4,rotation,0,Math.PI*2);ctx.fill()}ctx.strokeStyle="#ffffffa0";ctx.lineWidth=radius*.07;ctx.beginPath();ctx.ellipse(0,-radius*.2,radius*.9,radius*.2,-.4,0,Math.PI);ctx.stroke();
    }else{
      for(let index=0;index<15;index++){ctx.fillStyle=index%2?"#00000030":"#ffffff25";ctx.beginPath();ctx.arc(Math.sin(index*17)*radius*.8,Math.cos(index*7)*radius*.8,radius*(.045+index%3*.03),0,Math.PI*2);ctx.fill()}
    }
    const light=ctx.createRadialGradient(-radius*.4,-radius*.4,radius*.05,radius*.3,radius*.2,radius*1.4);light.addColorStop(0,"#ffffff30");light.addColorStop(.55,"#00000000");light.addColorStop(1,"#000000b0");ctx.fillStyle=light;ctx.fillRect(-radius*2,-radius*2,radius*4,radius*4);ctx.restore();
  }
  draw(ctx,game,time){if(this.id==="space"){this.drawSolarSystem(ctx,game,time);return}const orbit=this.planet.mode==="orbit";if(this.id==="uranus")this.drawUranusIce(ctx,time);else if(!orbit){const tones={moon:["#8c8d8d","#4d5054"],mercury:["#9a958d","#282727"],venus:["#aaa081","#5f594b"],earth:["#d9c78e","#746f5c"],mars:["#a06d50","#40383a"]}[this.id]||[this.planet.ground,"#2b2524"],terrain=ctx.createLinearGradient(0,500,0,this.height);terrain.addColorStop(0,tones[0]);terrain.addColorStop(1,tones[1]);ctx.fillStyle=terrain;ctx.beginPath();ctx.moveTo(0,this.groundAt(0));for(let x=0;x<=this.width;x+=35)ctx.lineTo(x,this.groundAt(x));ctx.lineTo(this.width,this.height);ctx.lineTo(0,this.height);ctx.fill();for(const dust of this.id==="mars"?[]:this.dust){const ground=this.groundAt(dust.x),wide=7+dust.r*5;ctx.fillStyle=this.id==="mercury"?(dust.r%2?"rgba(255,228,174,.2)":"rgba(8,7,7,.4)"):this.id==="venus"?(dust.r%2?"rgba(255,246,207,.13)":"rgba(58,52,42,.18)"):this.id==="earth"?(dust.r%2?"rgba(255,240,190,.18)":"rgba(92,78,57,.14)"):dust.r%2?"rgba(255,235,205,.12)":"rgba(22,14,12,.2)";ctx.beginPath();ctx.ellipse(dust.x,ground-dust.r,wide,dust.r*2.2,-.18,Math.PI,Math.PI*2);ctx.fill();if(["moon","mercury","mars"].includes(this.id)&&dust.r===3){ctx.strokeStyle=this.id==="mercury"?"rgba(8,7,7,.52)":"rgba(20,14,12,.24)";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(dust.x,ground+3,wide*1.7,wide*.38,0,0,Math.PI*2);ctx.stroke()}}}else this.drawCloudDeck(ctx,time);
    this.drawEnvironment(ctx,game,time);
    for(const obstacle of this.obstacles)this.drawObstacle(ctx,obstacle,orbit);this.drawShip(ctx,this.ship,time);
    for(const tool of [this.tool,...(this.extraTools||[])])if(tool.active)this.drawEquipment(ctx,tool,tool.item||this.planet.tool);
    if(this.contact){ctx.save();ctx.translate(this.contact.x,this.contact.y);ctx.fillStyle=this.planet.color;ctx.beginPath();ctx.arc(0,0,27,0,Math.PI*2);ctx.fill();ctx.fillStyle="#122332";ctx.font="20px Changa";ctx.textAlign="center";ctx.fillText("•ᴗ•",0,7);ctx.fillStyle="#eaffff";ctx.font="13px Changa";ctx.fillText(this.planet.name,0,-40);ctx.restore()}
    for(const step of this.steps||[]){
      const complete=game.state.missionSteps.includes(step.key);this.drawTaskTarget(ctx,step,game,time,complete);if(complete)continue;
      if(!game.cinematic&&game.missions.remaining()[0]===step&&Math.hypot(game.player.x-step.x,game.player.y-step.y)<420){ctx.fillStyle="#fff1c2";ctx.font="13px Changa";ctx.textAlign="center";ctx.fillText("USE TOOL HERE · استخدم الأداة هنا",step.x,step.y-78)}
    }
    if(this.ring.active&&game.missions.canReveal()&&Math.hypot(game.player.x-this.ring.x,game.player.y-this.ring.y)<420)this.drawRing(ctx,this.ring,time);
    for(const object of this.science)if(object.active)this.drawSpecimen(ctx,object);
  }
  drawUranusIce(ctx,time){const seconds=time/1000,ice=ctx.createLinearGradient(0,500,0,this.height);ice.addColorStop(0,"#bfeef0");ice.addColorStop(.3,"#78c4ce");ice.addColorStop(1,"#285e72");ctx.fillStyle=ice;ctx.beginPath();ctx.moveTo(0,this.groundAt(0));for(let x=0;x<=this.width;x+=30)ctx.lineTo(x,this.groundAt(x));ctx.lineTo(this.width,this.height);ctx.lineTo(0,this.height);ctx.closePath();ctx.fill();ctx.lineCap="round";for(let ridge=0;ridge<9;ridge++){const x=310+ridge*405,y=this.groundAt(x);ctx.fillStyle=ridge%2?"rgba(221,251,248,.38)":"rgba(77,151,166,.45)";ctx.beginPath();ctx.moveTo(x-85,y);ctx.quadraticCurveTo(x-45,y-17-ridge%3*5,x-12,y-9);ctx.quadraticCurveTo(x+22,y-29-ridge%2*7,x+78,y);ctx.closePath();ctx.fill()}ctx.strokeStyle="rgba(32,91,112,.58)";ctx.lineWidth=2;for(let crack=0;crack<12;crack++){const x=180+crack*285,y=this.groundAt(x)+3;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+18,y+10);ctx.lineTo(x+8,y+22);ctx.lineTo(x+31,y+34);ctx.moveTo(x+18,y+10);ctx.lineTo(x+34,y+14);ctx.stroke()}ctx.fillStyle="rgba(239,255,252,.22)";for(let frost=0;frost<18;frost++){const x=90+frost*203,y=this.groundAt(x)-2;ctx.beginPath();ctx.ellipse(x,y,38+frost%4*9,3+Math.sin(seconds*.08+frost),-.04,0,Math.PI*2);ctx.fill()}}
  drawCloudDeck(ctx,time){
    const seconds=time/1000;if(this.id==="saturn"){const colors=["rgba(117,88,67,.22)","rgba(203,166,105,.2)","rgba(244,219,164,.18)","rgba(153,112,77,.17)","rgba(238,211,154,.14)"];ctx.save();for(let layer=0;layer<5;layer++){const base=430+layer*55,thickness=34+layer%3*7,phase=seconds*(.12+layer*.025),wave=(x,bottom=false)=>base+(bottom?thickness:0)+Math.sin(x*.0054+layer*1.7-phase)*(13+layer%2*4)+Math.sin(x*.013-layer+phase*.42)*5+Math.sin(seconds*.15+layer)*5;ctx.fillStyle=colors[layer];ctx.beginPath();ctx.moveTo(-120,wave(-120));for(let x=-120;x<=this.width+120;x+=120)ctx.quadraticCurveTo(x+60,wave(x+60)-8,x+120,wave(x+120));for(let x=this.width+120;x>=-120;x-=120)ctx.quadraticCurveTo(x-60,wave(x-60,true)+7,x-120,wave(x-120,true));ctx.closePath();ctx.fill()}ctx.restore();return}if(this.id==="uranus"){const layers=["rgba(35,112,132,.28)","rgba(177,239,238,.08)","rgba(102,205,211,.11)","rgba(218,251,248,.06)"];for(let layer=0;layer<4;layer++){const base=500+layer*62,phase=seconds*.035+layer*1.4,wave=(x,bottom=false)=>base+(bottom?100+layer*12:0)+Math.sin(x*.0028+phase)*6+Math.sin(x*.006-layer)*3;ctx.fillStyle=layers[layer];ctx.beginPath();ctx.moveTo(-120,wave(-120));for(let x=-120;x<=this.width+120;x+=120)ctx.quadraticCurveTo(x+60,wave(x+60)-4,x+120,wave(x+120));for(let x=this.width+120;x>=-120;x-=120)ctx.quadraticCurveTo(x-60,wave(x-60,true)+4,x-120,wave(x-120,true));ctx.closePath();ctx.fill()}return}const palette={jupiter:["rgba(129,76,51,.34)","rgba(226,174,126,.48)","rgba(250,217,177,.3)"],neptune:["rgba(18,45,112,.38)","rgba(53,104,196,.48)","rgba(151,197,245,.28)"]}[this.id],fast=this.id==="neptune";ctx.save();for(let layer=0;layer<3;layer++){const base=515+layer*48,phase=fast?seconds*(1.05+layer*.18):0,drift=fast?Math.sin(seconds*.48+layer)*7:Math.sin(time*.00015*(layer+1)+layer)*18;ctx.fillStyle=palette[layer];ctx.beginPath();ctx.moveTo(0,this.height);ctx.lineTo(0,base);for(let x=0;x<=this.width;x+=120){const y=base+Math.sin(x*.006+layer*1.7-phase)*18+Math.sin(x*.017-layer+phase*.37)*7+drift;ctx.quadraticCurveTo(x+60,y-20-layer*3,x+120,y)}ctx.lineTo(this.width,this.height);ctx.closePath();ctx.fill()}ctx.restore()}
  drawEnvironment(ctx,game,time){
    ctx.save();
    if(this.id==="earth")this.drawEarthEnvironment(ctx,game,time);
    if(this.id==="moon"){for(let index=0;index<12;index++){const x=(index*307+index*index*31)%this.width,radius=35+(index*17)%38,y=this.groundAt(x)+8;ctx.fillStyle="#282c3255";ctx.beginPath();ctx.ellipse(x+8,y+3,radius,radius*.27,-.08,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#a9b1bc55";ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x,y,radius,radius*.25,-.08,0,Math.PI*2);ctx.stroke()}}
    if(this.id==="venus"){const seconds=time/1000;ctx.lineWidth=2;for(let ridge=0;ridge<9;ridge++){const x=430+ridge*365,y=this.groundAt(x)-3;ctx.strokeStyle=ridge%2?"rgba(218,203,157,.18)":"rgba(45,39,32,.32)";ctx.beginPath();ctx.moveTo(x-95,y);ctx.lineTo(x-42,y-13-ridge%3*4);ctx.lineTo(x+8,y-5);ctx.lineTo(x+82,y-19+ridge%2*7);ctx.stroke()}ctx.fillStyle="rgba(52,47,40,.68)";for(const [x,width,height] of [[690,54,25],[1420,72,34],[2180,60,29],[2670,82,38],[3260,65,31]]){const y=this.groundAt(x);ctx.beginPath();ctx.moveTo(x-width,y);ctx.lineTo(x-width*.58,y-height*.55);ctx.lineTo(x-width*.12,y-height);ctx.lineTo(x+width*.32,y-height*.72);ctx.lineTo(x+width,y);ctx.closePath();ctx.fill()}const shimmer=ctx.createLinearGradient(0,455,0,575);shimmer.addColorStop(0,"rgba(255,239,188,0)");shimmer.addColorStop(.55,`rgba(255,239,188,${.018+.006*Math.sin(seconds*.9)})`);shimmer.addColorStop(1,"rgba(255,239,188,0)");ctx.fillStyle=shimmer;for(let band=0;band<3;band++){const y=475+band*27+Math.sin(seconds*.55+band)*3;ctx.fillRect(0,y,this.width,8)}}
    if(this.id==="mercury"){const seconds=time/1000;for(let index=0;index<16;index++){const x=330+(index*613)%3050,radius=13+(index*19)%43,y=this.groundAt(x)+3,erosion=.42+(index%4)*.12;ctx.fillStyle=`rgba(18,17,17,${.26+erosion*.25})`;ctx.beginPath();ctx.ellipse(x+radius*.1,y,radius,radius*(.24+index%3*.035),-.04,0,Math.PI*2);ctx.fill();ctx.strokeStyle=`rgba(181,176,164,${.18+erosion*.16})`;ctx.lineWidth=1.5+index%3;ctx.beginPath();ctx.ellipse(x,y-2,radius,radius*(.22+index%3*.035),-.04,Math.PI,Math.PI*2);ctx.stroke();if(index%5===0){ctx.strokeStyle="rgba(120,115,106,.16)";ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,radius*1.65,radius*.38,0,Math.PI,Math.PI*2);ctx.stroke()}}for(let index=0;index<10;index++){const x=470+(index*347)%2900,y=this.groundAt(x);ctx.fillStyle=index%2?"#57534e":"#706b63";ctx.beginPath();ctx.moveTo(x-9-index%3*3,y);ctx.lineTo(x-5,y-10-index%4*3);ctx.lineTo(x+7+index%2*4,y-6);ctx.lineTo(x+12,y);ctx.closePath();ctx.fill()}for(let index=0;index<8;index++){const x=1180+index*210,y=this.groundAt(x);ctx.strokeStyle="rgba(255,222,157,.3)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-55,y-4);ctx.lineTo(x-20,y-19-index%3*4);ctx.lineTo(x+3,y-6);ctx.stroke();ctx.strokeStyle="rgba(15,13,12,.76)";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+3,y-6);ctx.lineTo(x+38,y-14+index%2*5);ctx.stroke()}const polarX=2540,polarY=this.groundAt(polarX)+5;ctx.fillStyle="rgba(9,12,16,.8)";ctx.beginPath();ctx.ellipse(polarX,polarY,108,27,-.03,0,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(159,157,151,.38)";ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(polarX-4,polarY-5,112,28,-.03,Math.PI,Math.PI*2);ctx.stroke();ctx.fillStyle="rgba(210,220,220,.32)";for(const [dx,dy,rx] of [[-43,-2,18],[7,6,13],[45,-4,10]]){ctx.beginPath();ctx.ellipse(polarX+dx,polarY+dy,rx,3,0,0,Math.PI*2);ctx.fill()}const shimmer=ctx.createLinearGradient(0,470,0,565);shimmer.addColorStop(0,"rgba(255,221,148,0)");shimmer.addColorStop(.55,`rgba(255,221,148,${.012+.004*Math.sin(seconds*1.1)})`);shimmer.addColorStop(1,"rgba(255,221,148,0)");ctx.fillStyle=shimmer;for(let band=0;band<2;band++){const y=490+band*34+Math.sin(seconds*.7+band)*2;ctx.fillRect(0,y,this.width,6)}}
    if(this.id==="mars")this.drawMarsEnvironment(ctx,game,time);
    if(this.id==="neptune"){
      const lit=game.state.equipped==="flashlight"||game.state.missionSteps.includes("neptune:0");ctx.fillStyle=lit?"#bad9ef12":"#01030b50";ctx.beginPath();ctx.moveTo(1120,220);ctx.quadraticCurveTo(1370,105,1640,175);ctx.quadraticCurveTo(1920,105,2260,235);ctx.quadraticCurveTo(2180,430,2280,555);ctx.quadraticCurveTo(1900,615,1570,550);ctx.quadraticCurveTo(1290,620,1080,485);ctx.quadraticCurveTo(1190,350,1120,220);ctx.closePath();ctx.fill();
      if(lit){const lamp=ctx.createRadialGradient(1400,330,10,1400,330,260);lamp.addColorStop(0,"#fff3b24d");lamp.addColorStop(1,"#fff3b200");ctx.fillStyle=lamp;ctx.fillRect(1140,70,520,520)}
    }
    ctx.restore();
  }
  drawMarsEnvironment(ctx,game,time){
    const geology=this.geology,seconds=time/1000,profile=ATMOSPHERE_PROFILES.mars,gust=Math.pow(.5+.5*Math.sin(seconds*profile.gustRate+profile.phase),6),lake=geology.lakebed,canyon=geology.canyon;
    ctx.save();ctx.beginPath();ctx.moveTo(0,this.groundAt(0));for(let x=0;x<=this.width;x+=30)ctx.lineTo(x,this.groundAt(x));ctx.lineTo(this.width,this.height);ctx.lineTo(0,this.height);ctx.closePath();ctx.clip();
    const regolith=ctx.createLinearGradient(0,0,this.width,0);regolith.addColorStop(0,"rgba(194,137,91,.17)");regolith.addColorStop(.28,"rgba(116,82,68,.15)");regolith.addColorStop(.5,"rgba(205,160,104,.19)");regolith.addColorStop(.72,"rgba(48,49,49,.28)");regolith.addColorStop(1,"rgba(142,91,65,.15)");ctx.fillStyle=regolith;ctx.fillRect(0,470,this.width,this.height-470);
    ctx.fillStyle="rgba(41,43,44,.24)";for(const [x,width,height] of [[720,150,23],[1180,105,16],[2070,190,31],[2740,235,38],[3440,120,20]]){const y=this.groundAt(x);ctx.beginPath();ctx.ellipse(x,y+height*.55,width,height,-.05,Math.PI,Math.PI*2);ctx.fill()}
    const basin=ctx.createRadialGradient(lake.center,lake.level,35,lake.center,lake.level,lake.width);basin.addColorStop(0,"rgba(205,167,111,.27)");basin.addColorStop(.68,"rgba(165,119,80,.16)");basin.addColorStop(1,"rgba(117,77,61,0)");ctx.fillStyle=basin;ctx.fillRect(lake.center-lake.width,lake.level-30,lake.width*2,180);
    const canyonShade=ctx.createLinearGradient(canyon.leftRim,0,canyon.rightRim,0);canyonShade.addColorStop(0,"rgba(42,33,31,.08)");canyonShade.addColorStop(.38,"rgba(38,31,30,.35)");canyonShade.addColorStop(.64,"rgba(28,27,28,.42)");canyonShade.addColorStop(1,"rgba(65,42,35,.12)");ctx.fillStyle=canyonShade;ctx.fillRect(canyon.leftRim-180,450,canyon.rightRim-canyon.leftRim+360,this.height-450);ctx.restore();

    ctx.save();ctx.lineCap="round";
    for(let band=0;band<5;band++){ctx.strokeStyle=band%2?"rgba(106,72,56,.34)":"rgba(222,177,112,.25)";ctx.lineWidth=1.5+band%2;ctx.beginPath();for(let x=lake.center-lake.width+45+band*11;x<=lake.center+lake.width-35-band*9;x+=28)ctx.lineTo(x,this.groundAt(x)+5+band*7+Math.sin(x*.018+band)*1.5);ctx.stroke()}
    ctx.strokeStyle="rgba(70,50,43,.5)";ctx.lineWidth=1.4;for(const root of [1390,1515,1660,1785,1920]){const y=this.groundAt(root)+1;ctx.beginPath();ctx.moveTo(root,y);ctx.lineTo(root-8,y+9);ctx.lineTo(root+2,y+16);ctx.lineTo(root-11,y+26);ctx.moveTo(root-8,y+9);ctx.lineTo(root-20,y+14);ctx.moveTo(root+2,y+16);ctx.lineTo(root+15,y+22);ctx.stroke()}
    const strata=["rgba(213,150,94,.3)","rgba(96,62,51,.38)","rgba(176,104,71,.3)","rgba(224,174,108,.24)","rgba(72,55,50,.4)","rgba(153,91,67,.32)"];
    for(let layer=0;layer<strata.length;layer++){ctx.strokeStyle=strata[layer];ctx.lineWidth=3+layer%2;ctx.beginPath();for(let x=canyon.leftRim-120;x<=canyon.rightRim+100;x+=28)ctx.lineTo(x,this.groundAt(x)+10+layer*12+Math.sin(x*.012+layer)*2);ctx.stroke()}
    for(const channel of geology.channels){ctx.strokeStyle="rgba(72,50,43,.4)";ctx.lineWidth=10;ctx.beginPath();for(const [x,offset] of channel)ctx.lineTo(x,this.groundAt(x)+offset);ctx.stroke();ctx.strokeStyle="rgba(205,151,94,.28)";ctx.lineWidth=3;ctx.beginPath();for(const [x,offset] of channel)ctx.lineTo(x,this.groundAt(x)+offset-2);ctx.stroke()}
    ctx.restore();

    for(const crater of geology.craters){const y=this.groundAt(crater.x)+2,shadow=.24+crater.age*.22;ctx.fillStyle=`rgba(48,34,31,${shadow})`;ctx.beginPath();ctx.ellipse(crater.x+crater.rx*.08,y+crater.ry*.12,crater.rx,crater.ry,-.04,0,Math.PI*2);ctx.fill();ctx.strokeStyle=`rgba(218,155,101,${.2+(1-crater.age)*.24})`;ctx.lineWidth=1.5+(1-crater.age)*2.5;ctx.beginPath();ctx.ellipse(crater.x,y-2,crater.rx,crater.ry,-.04,Math.PI,Math.PI*2);ctx.stroke();ctx.strokeStyle=`rgba(93,56,45,${.14+crater.age*.16})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(crater.x,y+1,crater.rx*1.42,crater.ry*1.55,-.04,.1,Math.PI-.1);ctx.stroke();if(crater.age<.6){ctx.fillStyle="rgba(181,112,73,.2)";for(let ejecta=0;ejecta<5;ejecta++){const angle=.35+ejecta*.58,side=ejecta%2?1:-1;ctx.beginPath();ctx.ellipse(crater.x+Math.cos(angle)*crater.rx*(1.3+ejecta*.08)*side,y-Math.sin(angle)*crater.ry*.8,5+ejecta%3*2,1.5,angle,0,Math.PI*2);ctx.fill()}}}

    for(let fieldIndex=0;fieldIndex<geology.rockFields.length;fieldIndex++){const field=geology.rockFields[fieldIndex];for(let rock=0;rock<field.count;rock++){const offset=((rock*67+fieldIndex*41)%field.spread)-field.spread/2,x=field.x+offset,size=4+((rock*5+fieldIndex*3)%10),y=this.groundAt(x);ctx.fillStyle="rgba(31,25,24,.28)";ctx.beginPath();ctx.ellipse(x+size*.45,y+1,size*1.15,size*.32,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=rock%3===0?"#4c4140":field.tone;ctx.beginPath();ctx.moveTo(x-size,y);ctx.lineTo(x-size*.55,y-size*.7);ctx.lineTo(x+size*.05,y-size);ctx.lineTo(x+size*.78,y-size*.45);ctx.lineTo(x+size,y);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(221,163,111,.18)";ctx.beginPath();ctx.moveTo(x-size*.55,y-size*.7);ctx.lineTo(x+size*.05,y-size);ctx.lineTo(x+size*.2,y-size*.45);ctx.closePath();ctx.fill()}}

    const dustClock=seconds*(46+gust*82);for(let particle=0;particle<28;particle++){const speed=.55+(particle%5)*.13,range=this.width+260,x=((particle*173+dustClock*speed)%range+range)%range-130,lift=10+(particle*37)%92,y=this.groundAt(clamp(x,0,this.width))-lift-Math.sin(seconds*(.7+particle%4*.09)+particle)*5,alpha=(.08+(particle%4)*.025)*(1+gust*.9);ctx.fillStyle=`rgba(205,132,82,${alpha})`;ctx.beginPath();ctx.ellipse(x,y,1.2+particle%3*.65,.8+particle%2*.35,.18,0,Math.PI*2);ctx.fill()}
    if(game.player?.onGround&&Math.abs(game.player.vx)>28){const direction=game.player.vx>0?-1:1,strength=clamp(Math.abs(game.player.vx)/185,.25,1);for(let particle=0;particle<8;particle++){const age=(seconds*2.4+particle*.17)%1,x=game.player.x+direction*(12+age*34)+Math.sin(game.player.walkPhase+particle)*5,y=this.groundAt(game.player.x)-2-age*(8+particle%3*3);ctx.fillStyle=`rgba(199,126,76,${(1-age)*.16*strength})`;ctx.beginPath();ctx.arc(x,y,1+particle%3*.65,0,Math.PI*2);ctx.fill()}}
  }
  drawMarineFish(ctx,x,y,size,direction,body,accent,variant,tilt=0){const length=variant===2?2.05:variant===1?1.58:1.82,height=variant===2?.72:variant===1?1.15:1;ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(direction,1);ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(0,0,size*length,size*height,variant===1?.08:variant===2?-.06:0,0,Math.PI*2);ctx.fill();ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(-size*length*.76,0);ctx.lineTo(-size*(length+1),-size*height*(variant===2?.7:1));ctx.lineTo(-size*(length+.86),size*height*(variant===1?.68:1));ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(-size*.45,-size*height*.72);ctx.lineTo(size*.02,-size*height*(variant===1?1.48:1.28));ctx.lineTo(size*.48,-size*height*.7);ctx.closePath();ctx.fill();ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(size*.22,size*height*.25);ctx.lineTo(-size*.25,size*height*1.12);ctx.lineTo(size*.62,size*height*.52);ctx.closePath();ctx.fill();ctx.globalAlpha=1;if(variant===0){ctx.fillStyle=accent;ctx.fillRect(-size*.35,-size*height*.82,size*.35,size*height*1.64)}else if(variant===1){ctx.strokeStyle=accent;ctx.lineWidth=Math.max(1,size*.16);ctx.beginPath();ctx.arc(size*.1,0,size*.66,-1.18,1.18);ctx.stroke()}else{ctx.fillStyle=accent;ctx.beginPath();ctx.arc(-size*.42,-size*.1,size*.3,0,Math.PI*2);ctx.fill()}ctx.strokeStyle="rgba(25,52,56,.42)";ctx.lineWidth=Math.max(.7,size*.1);ctx.beginPath();ctx.arc(size*length*.48,0,size*height*.54,-1.1,1.1);ctx.stroke();ctx.fillStyle="#142b31";ctx.beginPath();ctx.arc(size*length*.62,-size*height*.28,Math.max(.85,size*.12),0,Math.PI*2);ctx.fill();ctx.restore()}
  drawMarineLife(ctx,seconds){const life=this.marineLife;if(!life)return;const shore=this.water.shoreX,fishStart=shore+340,span=this.width-fishStart-70,surface=this.water.surfaceY;
    for(let schoolIndex=0;schoolIndex<life.schools.length;schoolIndex++){const school=life.schools[schoolIndex],spread=1+Math.max(0,Math.sin(seconds*.31+schoolIndex*2.1))*.42,base=((school.phase*span+seconds*school.speed*school.direction)%span+span)%span;for(let member=0;member<school.count;member++){const offset=base-member*school.spacing*spread*school.direction,x=fishStart+((offset%span+span)%span),floor=this.groundAt(x),desired=school.y+Math.sin(seconds*(.72+member*.03)+member*1.7+schoolIndex)*9+Math.sin(seconds*.22+member)*spread*5,y=clamp(desired,surface+28,floor-18),tilt=Math.sin(seconds*.65+member+schoolIndex)*.08,depthScale=clamp((floor-surface)/180,.72,1);this.drawMarineFish(ctx,x,y,school.size*(.84+member%3*.09)*depthScale,school.direction,school.body,school.accent,(school.variant+member)%3,tilt)}}
    for(const fish of life.individuals){const cycle=((seconds*fish.speed/span+fish.phase)%2+2)%2,forward=cycle<1,progress=forward?cycle:2-cycle,x=fishStart+progress*span,direction=forward?1:-1,floor=this.groundAt(x),desired=fish.y+Math.sin(seconds*.38+fish.phase*9)*18,y=clamp(desired,surface+35,floor-24),tilt=Math.sin(seconds*.44+fish.phase*7)*.11;this.drawMarineFish(ctx,x,y,fish.size,direction,fish.body,fish.accent,fish.variant,tilt)}
    ctx.lineCap="round";for(const coral of life.corals){const ground=this.groundAt(coral.x);ctx.strokeStyle=coral.tone;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(coral.x,ground);ctx.quadraticCurveTo(coral.x-3,ground-coral.height*.55,coral.x,ground-coral.height);ctx.moveTo(coral.x-1,ground-coral.height*.42);ctx.quadraticCurveTo(coral.x-18,ground-coral.height*.65,coral.x-20,ground-coral.height*.82);ctx.moveTo(coral.x+1,ground-coral.height*.58);ctx.quadraticCurveTo(coral.x+18,ground-coral.height*.73,coral.x+20,ground-coral.height*.94);ctx.stroke();ctx.strokeStyle=coral.tip;ctx.lineWidth=3;for(const [dx,dy] of [[0,-1],[-20,-.82],[20,-.94]]){ctx.beginPath();ctx.arc(coral.x+dx,ground+coral.height*dy,4,0,Math.PI*2);ctx.stroke()}}
    for(const [x,height,tone] of life.plants){const ground=this.groundAt(x);ctx.strokeStyle=tone;ctx.lineWidth=4;for(let stem=0;stem<3;stem++){ctx.beginPath();ctx.moveTo(x+stem*8-8,ground);ctx.quadraticCurveTo(x-8+stem*8+Math.sin(seconds*.65+x*.01+stem)*8,ground-height*.55,x-4+stem*7+Math.sin(seconds*.5+stem)*6,ground-height);ctx.stroke()}}
    for(const [x,height,tone] of life.anemones){const ground=this.groundAt(x);ctx.fillStyle=tone;ctx.beginPath();ctx.ellipse(x,ground-4,13,6,0,Math.PI,Math.PI*2);ctx.fill();ctx.strokeStyle=tone;ctx.lineWidth=2;for(let arm=0;arm<7;arm++){const root=x-9+arm*3;ctx.beginPath();ctx.moveTo(root,ground-6);ctx.quadraticCurveTo(root+Math.sin(seconds*.7+arm)*5,ground-height*.62,root+Math.sin(seconds*.55+arm)*7,ground-height);ctx.stroke()}}
    for(const [baseX,size,phase] of life.crabs){const x=baseX+Math.sin(seconds*.42+phase)*15,ground=this.groundAt(x),lift=Math.abs(Math.sin(seconds*1.7+phase))*1.5;ctx.save();ctx.translate(x,ground-4-lift);ctx.strokeStyle="#8e5544";ctx.lineWidth=1.5;for(const side of [-1,1])for(let leg=0;leg<3;leg++){ctx.beginPath();ctx.moveTo(side*(size*.35+leg),1);ctx.lineTo(side*(size+leg*2),5+leg);ctx.stroke()}ctx.fillStyle="#a9624c";ctx.beginPath();ctx.ellipse(0,0,size,size*.58,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#c98566";ctx.beginPath();ctx.moveTo(-size*.7,-2);ctx.lineTo(-size*1.25,-size*.7);ctx.moveTo(size*.7,-2);ctx.lineTo(size*1.25,-size*.7);ctx.stroke();ctx.restore()}
    for(const [x,size,rotation,tone] of life.starfish){const ground=this.groundAt(x);ctx.save();ctx.translate(x,ground-3);ctx.rotate(rotation);ctx.fillStyle=tone;ctx.beginPath();for(let point=0;point<10;point++){const angle=-Math.PI/2+point*Math.PI/5,radius=point%2?size*.42:size;ctx.lineTo(Math.cos(angle)*radius,Math.sin(angle)*radius)}ctx.closePath();ctx.fill();ctx.restore()}for(const [x,size,tone] of life.shells){const ground=this.groundAt(x);ctx.fillStyle=tone;ctx.beginPath();ctx.arc(x,ground-2,size,Math.PI,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(89,74,62,.45)";ctx.lineWidth=1;for(let ridge=-1;ridge<=1;ridge++){ctx.beginPath();ctx.moveTo(x,ground-size-1);ctx.lineTo(x+ridge*size*.55,ground-2);ctx.stroke()}}
  }
  drawEarthEnvironment(ctx,game,time){
    const seconds=time/1000,surface=this.water.surfaceY,shore=this.water.shoreX;
    const water=ctx.createLinearGradient(shore,0,shore+980,0);water.addColorStop(0,"rgba(102,211,204,0)");water.addColorStop(.16,"rgba(63,193,201,.16)");water.addColorStop(.42,"rgba(18,143,171,.46)");water.addColorStop(.7,"rgba(7,94,132,.7)");water.addColorStop(1,"rgba(3,55,88,.84)");ctx.fillStyle=water;ctx.fillRect(shore-24,surface,this.width-shore+24,this.height-surface);
    ctx.save();ctx.beginPath();ctx.moveTo(0,this.groundAt(0));for(let x=0;x<=this.width;x+=30)ctx.lineTo(x,this.groundAt(x));ctx.lineTo(this.width,this.height);ctx.lineTo(0,this.height);ctx.closePath();ctx.clip();const coast=ctx.createLinearGradient(0,0,this.width,0);coast.addColorStop(0,"#decf9c");coast.addColorStop(.2,"#d4c28b");coast.addColorStop(.28,"#b9ad7c");coast.addColorStop(.36,"#a69d78");coast.addColorStop(.62,"#8b886f");coast.addColorStop(1,"#6f786b");ctx.fillStyle=coast;ctx.fillRect(0,480,this.width,this.height-480);const wetSand=ctx.createLinearGradient(shore-300,0,shore+90,0);wetSand.addColorStop(0,"rgba(92,113,98,0)");wetSand.addColorStop(.58,"rgba(92,113,98,.18)");wetSand.addColorStop(1,"rgba(64,103,105,.36)");ctx.fillStyle=wetSand;ctx.fillRect(shore-300,490,this.width-shore+300,this.height-490);const seabedShade=ctx.createLinearGradient(0,surface,0,this.height);seabedShade.addColorStop(0,"rgba(226,211,156,.08)");seabedShade.addColorStop(1,"rgba(4,35,50,.3)");ctx.fillStyle=seabedShade;ctx.fillRect(shore,surface,this.width-shore,this.height-surface);ctx.restore();
    ctx.save();ctx.beginPath();ctx.rect(shore-80,surface,this.width-shore+80,this.height-surface);ctx.clip();for(let ray=0;ray<7;ray++){const x=shore+170+ray*390+Math.sin(seconds*.16+ray)*45,spread=115+ray%3*28,rayFade=ctx.createLinearGradient(0,surface,0,surface+330);rayFade.addColorStop(0,"rgba(220,255,229,.13)");rayFade.addColorStop(1,"rgba(220,255,229,0)");ctx.fillStyle=rayFade;ctx.beginPath();ctx.moveTo(x-18,surface);ctx.lineTo(x+spread,surface+330);ctx.lineTo(x-spread*.32,surface+330);ctx.closePath();ctx.fill()}for(let current=0;current<6;current++){const y=surface+80+current*48,drift=seconds*(13+current*2);ctx.strokeStyle=`rgba(174,239,225,${.055+current%2*.018})`;ctx.lineWidth=2;ctx.beginPath();for(let x=shore-100;x<this.width+120;x+=90){const px=x+((drift+current*67)%180),py=y+Math.sin(x*.008+seconds*.35+current)*13;ctx.lineTo(px,py)}ctx.stroke()}for(let mote=0;mote<58;mote++){const baseX=shore+((mote*173)%(this.width-shore)),baseY=surface+28+((mote*79)%(this.height-surface-45)),x=baseX+Math.sin(seconds*.28+mote)*9,y=surface+((baseY-surface-seconds*(2+mote%3))%(this.height-surface-35)+this.height-surface-35)%(this.height-surface-35);ctx.fillStyle=`rgba(218,250,228,${.1+(mote%4)*.035})`;ctx.beginPath();ctx.arc(x,y,.8+mote%3*.45,0,Math.PI*2);ctx.fill()}ctx.restore();
    ctx.strokeStyle="rgba(239,255,231,.75)";ctx.lineWidth=2.4;ctx.beginPath();for(let x=shore-105;x<=this.width;x+=42){const y=surface+Math.sin(x*.031+seconds*1.8)*3+Math.sin(x*.013-seconds)*1.5;ctx.lineTo(x,y)}ctx.stroke();ctx.strokeStyle="rgba(26,119,136,.42)";ctx.lineWidth=1.2;for(let band=0;band<3;band++){ctx.beginPath();for(let x=shore-70;x<=this.width;x+=48)ctx.lineTo(x,surface+8+band*8+Math.sin(x*.024-seconds*(1.15+band*.13)+band)*2.2);ctx.stroke()}const wash=Math.pow(.5+.5*Math.sin(seconds*.9),2);for(let foam=0;foam<2;foam++){ctx.strokeStyle=`rgba(242,255,239,${.34-foam*.11})`;ctx.lineWidth=1.8-foam*.45;ctx.beginPath();for(let x=shore-170+foam*24;x<=shore+65;x+=16){const y=this.groundAt(x)-2-wash*(4+foam*2)+Math.sin(x*.065-seconds*1.5+foam)*1.4;ctx.lineTo(x,y)}ctx.stroke()}
    ctx.lineCap="round";for(const [x,size,tone] of [[355,5,"#f0ddad"],[515,4,"#e7c990"],[690,6,"#8c8069"],[835,4,"#f4e6bd"],[995,5,"#807660"]]){const ground=this.groundAt(x);ctx.fillStyle=tone;ctx.beginPath();ctx.ellipse(x,ground-2,size,size*.45,-.25,0,Math.PI*2);ctx.fill()}
    for(const [x,width,height] of [[910,34,17],[1080,24,12],[1390,31,18],[2260,42,22],[3290,35,18]]){const ground=this.groundAt(x);ctx.fillStyle=x<shore?"#6f7566":"#405e5d";ctx.beginPath();ctx.moveTo(x-width,ground);ctx.quadraticCurveTo(x-width*.5,ground-height,x,ground-height*.72);ctx.quadraticCurveTo(x+width*.55,ground-height*1.15,x+width,ground);ctx.closePath();ctx.fill();ctx.strokeStyle="rgba(219,235,208,.16)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-width*.45,ground-height*.62);ctx.quadraticCurveTo(x,ground-height,x+width*.5,ground-height*.55);ctx.stroke()}
    this.drawMarineLife(ctx,seconds);
    for(let caustic=0;caustic<18;caustic++){const x=shore+70+caustic*145,y=this.groundAt(x)-5;ctx.strokeStyle=`rgba(199,243,213,${.09+caustic%3*.025})`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x+Math.sin(seconds*.8+caustic)*8,y,28+caustic%3*7,5,0,0,Math.PI);ctx.stroke()}
    if(game.player?.submerged){for(let bubble=0;bubble<9;bubble++){const travel=(seconds*(18+bubble%3*4)+bubble*31)%145,x=game.player.x+8+Math.sin(seconds*1.1+bubble)*18,y=game.player.y-18-travel;ctx.strokeStyle=`rgba(227,255,244,${.2+bubble%3*.1})`;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,2+bubble%3,0,Math.PI*2);ctx.stroke()}}
  }
  drawSolarSystem(ctx,game,time){ctx.save();ctx.strokeStyle="rgba(99,230,245,.2)";ctx.lineWidth=2;for(const orbit of this.orbits){ctx.beginPath();ctx.ellipse(this.sun.x,this.sun.y,orbit.rx,orbit.ry,0,0,Math.PI*2);ctx.stroke()}const earth=this.planetNodes.find(node=>node.id==="earth");ctx.beginPath();ctx.ellipse(earth.x,earth.y,this.moonOrbit.rx,this.moonOrbit.ry,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#ffd66b";ctx.shadowColor="#ffb347";ctx.shadowBlur=55;ctx.beginPath();ctx.arc(this.sun.x,this.sun.y,this.sun.radius,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#ffe7a3";ctx.font="16px Share Tech Mono";ctx.textAlign="center";ctx.fillText("SUN",this.sun.x,this.sun.y+this.sun.radius+35);for(const node of this.planetNodes)this.drawPlanetNode(ctx,node,game,time);ctx.restore()}
  drawPlanetNode(ctx,node,game,time){const planet=PLANETS[node.id],explored=game.state.explored.includes(node.id),distance=game.player?Math.hypot(game.player.x-node.x,game.player.y-node.y):Infinity,approach=clamp((560-distance)/420,0,1),radius=node.radius*(1+approach*.8);ctx.save();ctx.translate(node.x,node.y);if(node.id==="saturn")this.drawSaturnRings(ctx,radius,false);this.paintPlanet(ctx,node.id,radius);if(node.id==="saturn")this.drawSaturnRings(ctx,radius,true);if(game.waypoint===node.id){ctx.strokeStyle="#ffd166";ctx.lineWidth=2;ctx.setLineDash([6,8]);ctx.beginPath();ctx.arc(0,0,radius+18,0,Math.PI*2);ctx.stroke();ctx.setLineDash([])}ctx.fillStyle="#eaffff";ctx.font="bold 15px Share Tech Mono";ctx.textAlign="center";ctx.fillText(planet.en,0,radius+42);ctx.fillStyle=explored?"#61efad":"#a8bfca";ctx.font="10px Share Tech Mono";ctx.fillText(explored?"EXPLORED ✓":"UNEXPLORED",0,radius+60);ctx.restore()}
  drawObstacle(ctx,o,orbit){if(this.id==="uranus"){ctx.fillStyle="#5fa9b8";ctx.strokeStyle="rgba(220,252,249,.55)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(o.x,o.y+o.h);ctx.quadraticCurveTo(o.x+o.w*.12,o.y+o.h*.35,o.x+o.w*.27,o.y+o.h*.22);ctx.quadraticCurveTo(o.x+o.w*.4,o.y-o.h*.18,o.x+o.w*.53,o.y+o.h*.12);ctx.quadraticCurveTo(o.x+o.w*.72,o.y-o.h*.08,o.x+o.w*.86,o.y+o.h*.4);ctx.quadraticCurveTo(o.x+o.w*.96,o.y+o.h*.55,o.x+o.w,o.y+o.h);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="rgba(229,255,252,.32)";ctx.beginPath();ctx.moveTo(o.x+o.w*.27,o.y+o.h*.22);ctx.lineTo(o.x+o.w*.53,o.y+o.h*.12);ctx.lineTo(o.x+o.w*.44,o.y+o.h*.56);ctx.closePath();ctx.fill();return}if(orbit){const color={jupiter:"rgba(245,203,162,.22)",saturn:"rgba(242,222,174,.2)",neptune:"rgba(145,190,242,.22)"}[this.id];ctx.fillStyle=color;ctx.beginPath();for(let puff=0;puff<5;puff++){const x=o.x+o.w*(.12+puff*.2),y=o.y+o.h*(.62+(puff%2)*.12);ctx.moveTo(x+o.h*.45,y);ctx.arc(x,y,o.h*(.35+puff%3*.08),0,Math.PI*2)}ctx.fill();return}const colors={moon:["#777b80","#484b4f"],mercury:["#817d76","#3d3b39"],venus:["#aaa080","#625c4c"],earth:["#596658","#303e36"],mars:["#8a5a44","#3e3533"]}[this.id]||["#79685a","#432f2d"];ctx.fillStyle=colors[1];ctx.strokeStyle="rgba(20,15,14,.38)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(o.x,o.y+o.h);ctx.quadraticCurveTo(o.x+o.w*.08,o.y+o.h*.38,o.x+o.w*.24,o.y+o.h*.25);ctx.quadraticCurveTo(o.x+o.w*.38,o.y-o.h*.08,o.x+o.w*.54,o.y+o.h*.12);ctx.quadraticCurveTo(o.x+o.w*.72,o.y+o.h*.02,o.x+o.w*.84,o.y+o.h*.38);ctx.quadraticCurveTo(o.x+o.w*.96,o.y+o.h*.5,o.x+o.w,o.y+o.h);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle=colors[0];ctx.beginPath();ctx.moveTo(o.x+o.w*.24,o.y+o.h*.25);ctx.lineTo(o.x+o.w*.54,o.y+o.h*.12);ctx.lineTo(o.x+o.w*.42,o.y+o.h*.58);ctx.closePath();ctx.fill()}
  drawShip(ctx,s,time){ctx.save();ctx.translate(s.x,s.y);ctx.fillStyle="#d7e5e9";ctx.strokeStyle="#5d8396";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-65,40);ctx.lineTo(-42,-42);ctx.quadraticCurveTo(0,-78,42,-42);ctx.lineTo(68,40);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#123c59";ctx.beginPath();ctx.arc(0,-28,21,0,Math.PI*2);ctx.fill();ctx.fillStyle="#ff9e47";ctx.fillRect(-45,40,24,12);ctx.fillRect(21,40,24,12);ctx.shadowColor="#60eaff";ctx.shadowBlur=18;ctx.fillStyle="#63eaff";ctx.fillRect(-27,8,54,7);ctx.restore()}
  drawTaskTarget(ctx,step,game,time,complete){
    if(!step.active||complete||game.cinematic?.type==="tool")return;
    const seconds=time/1000,current=game.missions.remaining()[0]===step,pulse=.5+.5*Math.sin(seconds*2.6+step.index*.8),radius=15+pulse*3,alpha=current?.68+pulse*.2:.3+pulse*.08;
    ctx.save();ctx.translate(step.x,step.y);ctx.shadowColor="#63e6f5";ctx.shadowBlur=current?8+pulse*7:4;ctx.lineWidth=current?1.8:1.2;
    ctx.save();ctx.rotate(seconds*(step.index%2?-.32:.32));ctx.setLineDash([4,6]);ctx.lineDashOffset=-seconds*6;ctx.strokeStyle=`rgba(99,230,245,${alpha*.68})`;ctx.beginPath();ctx.arc(0,0,radius+8,0,Math.PI*2);ctx.stroke();ctx.restore();
    ctx.setLineDash([]);ctx.strokeStyle=`rgba(214,248,251,${alpha})`;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.stroke();
    if(current){const sweep=seconds*1.4;ctx.strokeStyle=`rgba(97,239,173,${.42+pulse*.35})`;ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(0,0,radius-5,sweep,sweep+Math.PI*.72);ctx.stroke()}
    ctx.fillStyle=`rgba(234,255,255,${alpha})`;for(let spark=0;spark<4;spark++){const angle=Math.PI*.5*spark+seconds*.12,distance=radius+10,size=1.7+pulse*1.2,x=Math.cos(angle)*distance,y=Math.sin(angle)*distance;ctx.beginPath();ctx.moveTo(x,y-size*1.7);ctx.lineTo(x+size,y);ctx.lineTo(x,y+size*1.7);ctx.lineTo(x-size,y);ctx.closePath();ctx.fill()}
    ctx.fillStyle=`rgba(99,230,245,${.55+pulse*.35})`;ctx.beginPath();ctx.arc(0,0,2.2+pulse,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  drawEquipment(ctx,object,id,options={}){
    ctx.save();ctx.translate(object.x,object.y);if(options.facing)ctx.scale(options.facing,1);if(options.angle)ctx.rotate(options.angle);if(options.scale)ctx.scale(options.scale,options.scale);
    const shell="#d5dee3",metal="#8fa5b4",dark="#28394a",warm="#ff9e47";ctx.lineWidth=2;ctx.strokeStyle=dark;
    if(!options.held){ctx.fillStyle="rgba(7,16,24,.35)";ctx.beginPath();ctx.ellipse(0,31,31,7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle="#344955";ctx.fillRect(-29,14,58,17);ctx.strokeStyle="#8299a3";ctx.strokeRect(-29,14,58,17);ctx.fillStyle="#ffad4a";ctx.fillRect(-23,18,5,4);ctx.translate(0,-5)}
    if(id==="rockHammer"){ctx.strokeStyle="#765035";ctx.lineWidth=5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(-20,4);ctx.lineTo(20,-2);ctx.stroke();ctx.fillStyle=metal;ctx.beginPath();ctx.moveTo(14,-13);ctx.lineTo(26,-11);ctx.lineTo(27,8);ctx.lineTo(17,10);ctx.closePath();ctx.fill();ctx.strokeStyle=dark;ctx.lineWidth=2;ctx.stroke()}
    else if(id==="scoop"){ctx.strokeStyle=metal;ctx.lineWidth=4;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(25,0);ctx.stroke();ctx.fillStyle="#aebfc5";ctx.beginPath();ctx.moveTo(24,-8);ctx.quadraticCurveTo(40,-5,43,2);ctx.quadraticCurveTo(37,12,24,8);ctx.closePath();ctx.fill();ctx.stroke()}
    else if(id==="tongs"){ctx.strokeStyle=metal;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-17,-4);ctx.lineTo(28,-8);ctx.quadraticCurveTo(37,-7,39,-1);ctx.moveTo(-17,4);ctx.lineTo(28,8);ctx.quadraticCurveTo(37,7,39,1);ctx.stroke();ctx.fillStyle=warm;ctx.beginPath();ctx.arc(-16,0,4,0,Math.PI*2);ctx.fill()}
    else if(id==="sampleContainer"){ctx.fillStyle="#dce9ec";ctx.fillRect(-11,-15,22,28);ctx.strokeRect(-11,-15,22,28);ctx.fillStyle="#3b6674";ctx.fillRect(-9,-3,18,12);ctx.fillStyle=metal;ctx.fillRect(-14,-19,28,7);ctx.strokeRect(-14,-19,28,7);ctx.fillStyle="#fff1c2";ctx.fillRect(-6,1,12,5)}
    else if(id==="temperatureProbe"){ctx.fillStyle=shell;ctx.fillRect(-17,-11,28,22);ctx.strokeRect(-17,-11,28,22);ctx.fillStyle="#173548";ctx.fillRect(-12,-6,15,8);ctx.fillStyle="#63e6f5";ctx.fillRect(-9,-4,9,4);ctx.strokeStyle=metal;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(11,0);ctx.lineTo(42,0);ctx.stroke();ctx.fillStyle=warm;ctx.beginPath();ctx.arc(43,0,3,0,Math.PI*2);ctx.fill()}
    else if(id==="drill"){ctx.fillStyle=shell;ctx.beginPath();ctx.moveTo(-18,-12);ctx.lineTo(14,-12);ctx.lineTo(20,-4);ctx.lineTo(20,8);ctx.lineTo(-18,8);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle=dark;ctx.fillRect(-9,8,9,15);ctx.strokeStyle=metal;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(20,1);ctx.lineTo(42,1);ctx.stroke();ctx.strokeStyle=warm;ctx.lineWidth=2;for(let bit=24;bit<42;bit+=5){ctx.beginPath();ctx.moveTo(bit,-3);ctx.lineTo(bit+4,5);ctx.stroke()}}
    else if(id==="hydrophone"){ctx.fillStyle=shell;ctx.fillRect(-18,-8,25,16);ctx.strokeRect(-18,-8,25,16);ctx.fillStyle="#173548";ctx.fillRect(-13,-4,11,8);ctx.strokeStyle=metal;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(32,0);ctx.stroke();ctx.fillStyle="#5f7f89";ctx.beginPath();ctx.ellipse(37,0,7,10,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle="#63e6f5";ctx.beginPath();ctx.arc(37,0,3,0,Math.PI*2);ctx.stroke()}
    else if(id==="camera"){ctx.fillStyle=shell;ctx.fillRect(-18,-11,36,23);ctx.strokeRect(-18,-11,36,23);ctx.fillStyle=dark;ctx.fillRect(-7,-16,14,5);ctx.fillStyle=metal;ctx.beginPath();ctx.arc(2,1,8,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#2b6f8f";ctx.beginPath();ctx.arc(2,1,4,0,Math.PI*2);ctx.fill();ctx.fillStyle=warm;ctx.fillRect(-15,-7,6,4)}
    else if(id==="flashlight"){ctx.fillStyle="#ffe9a840";ctx.beginPath();ctx.moveTo(14,-4);ctx.lineTo(44,-18);ctx.lineTo(44,12);ctx.lineTo(14,4);ctx.fill();ctx.fillStyle=shell;ctx.fillRect(-18,-6,28,12);ctx.strokeRect(-18,-6,28,12);ctx.fillStyle=metal;ctx.beginPath();ctx.moveTo(10,-10);ctx.lineTo(15,-10);ctx.lineTo(15,10);ctx.lineTo(10,10);ctx.closePath();ctx.fill();ctx.stroke()}
    else if(id==="repair"){ctx.strokeStyle=metal;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-13,13);ctx.lineTo(9,-9);ctx.stroke();ctx.lineWidth=6;ctx.beginPath();ctx.arc(13,-13,7,.7,5.1);ctx.stroke();ctx.strokeStyle=dark;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(13,-13,7,.7,5.1);ctx.stroke()}
    else if(id==="communicator"){ctx.fillStyle=shell;ctx.fillRect(-11,-12,22,26);ctx.strokeRect(-11,-12,22,26);ctx.beginPath();ctx.moveTo(6,-12);ctx.lineTo(13,-25);ctx.stroke();ctx.fillStyle=dark;for(let row=0;row<3;row++)ctx.fillRect(-7,-7+row*5,14,3);ctx.fillStyle="#61efad";ctx.fillRect(-7,8,5,3)}
    else if(id==="sample"){ctx.fillStyle="#e3eef3";ctx.fillRect(-7,-13,14,26);ctx.strokeRect(-7,-13,14,26);ctx.fillStyle="#5fc9a5";ctx.fillRect(-6,2,12,10);ctx.fillStyle=metal;ctx.fillRect(-9,-18,18,6);ctx.strokeRect(-9,-18,18,6)}
    else if(id==="geology"){ctx.strokeStyle="#7b5433";ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-14,14);ctx.lineTo(7,-7);ctx.stroke();ctx.fillStyle=metal;ctx.fillRect(1,-19,22,11);ctx.strokeStyle=dark;ctx.lineWidth=2;ctx.strokeRect(1,-19,22,11)}
    else if(id==="thermal"){ctx.fillStyle="#e8c98a";ctx.beginPath();ctx.moveTo(-17,-14);ctx.lineTo(17,-14);ctx.lineTo(13,14);ctx.lineTo(-13,14);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle="#a9884f";for(let rib=-7;rib<12;rib+=7){ctx.beginPath();ctx.moveTo(-15,rib);ctx.lineTo(15,rib);ctx.stroke()}}
    else if(id==="radiation"){ctx.fillStyle=shell;ctx.fillRect(-14,-12,28,24);ctx.strokeRect(-14,-12,28,24);ctx.fillStyle="#0f2230";ctx.fillRect(-9,-8,18,11);ctx.strokeStyle="#ffd166";ctx.beginPath();ctx.moveTo(0,-2);ctx.lineTo(6,-7);ctx.stroke();ctx.fillStyle=metal;ctx.fillRect(-5,6,10,5)}
    else if(id==="heater"){ctx.fillStyle=shell;ctx.fillRect(-15,-11,30,22);ctx.strokeRect(-15,-11,30,22);ctx.strokeStyle=warm;ctx.lineWidth=3;ctx.beginPath();for(let coil=0;coil<4;coil++){ctx.moveTo(-11+coil*7,-5);ctx.lineTo(-7+coil*7,5)}ctx.stroke()}
    else if(id==="navigation"){ctx.fillStyle=shell;ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#c9463b";ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(4,0);ctx.lineTo(0,10);ctx.lineTo(-4,0);ctx.closePath();ctx.fill()}
    else if(id==="magnetometer"){ctx.strokeStyle=metal;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,15);ctx.lineTo(0,-3);ctx.stroke();ctx.lineWidth=6;ctx.strokeStyle="#c9463b";ctx.beginPath();ctx.arc(0,-7,9,Math.PI,0);ctx.stroke();ctx.fillStyle=metal;ctx.fillRect(-12,-7,5,8);ctx.fillRect(7,-7,5,8)}
    else{ctx.fillStyle=shell;ctx.fillRect(-14,-11,28,22);ctx.strokeRect(-14,-11,28,22);ctx.strokeStyle=metal;ctx.beginPath();ctx.moveTo(-14,-2);ctx.lineTo(14,-2);ctx.stroke()}
    ctx.restore();
  }
  drawSpecimen(ctx,object){ctx.save();ctx.translate(object.x,object.y+6);if(this.id==="saturn"){ctx.fillStyle="#3e484c";ctx.fillRect(-19,-10,38,22);ctx.strokeStyle="#a5adae";ctx.lineWidth=2;ctx.strokeRect(-19,-10,38,22);ctx.fillStyle="#171f23";ctx.fillRect(-11,-5,22,9);ctx.fillStyle="#c7a45e";ctx.fillRect(-7,-2,9,3);ctx.strokeStyle="#757f81";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,12);ctx.lineTo(-15,24);ctx.moveTo(12,12);ctx.lineTo(15,24);ctx.stroke();ctx.fillStyle="#b5aa8d";ctx.beginPath();ctx.ellipse(0,-15,14,5,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#696f70";ctx.stroke();ctx.restore();return}ctx.fillStyle="#8d8377";ctx.beginPath();ctx.moveTo(-17,11);ctx.lineTo(-9,-8);ctx.lineTo(4,-14);ctx.lineTo(16,-2);ctx.lineTo(12,11);ctx.closePath();ctx.fill();ctx.strokeStyle="#4b4640";ctx.lineWidth=2;ctx.stroke();ctx.fillStyle="#b9b0a4";ctx.beginPath();ctx.moveTo(-9,-8);ctx.lineTo(4,-14);ctx.lineTo(2,-2);ctx.closePath();ctx.fill();ctx.restore()}
  drawSaturnRings(ctx,radius,front){
    ctx.save();ctx.rotate(-.3);
    for(const [inner,outer,color] of [[1.22,1.38,"rgba(198,178,140,.45)"],[1.42,1.72,"rgba(238,222,183,.85)"],[1.8,2.02,"rgba(214,196,158,.7)"]]){
      const mid=radius*(inner+outer)/2;ctx.lineWidth=radius*(outer-inner);ctx.strokeStyle=color;
      ctx.beginPath();ctx.ellipse(0,0,mid,mid*.3,0,front?0:Math.PI,front?Math.PI:Math.PI*2);ctx.stroke();
    }
    ctx.restore();
  }
  drawRing(ctx,object,time){const seabed=this.id==="earth",settled=seabed||this.id==="mars";ctx.save();ctx.translate(object.x,object.y+Math.sin(time*.002)*(settled?1.5:8));for(let index=0;index<10;index++){const angle=time*.001+index*Math.PI/5;ctx.fillStyle="#fff1bba0";ctx.beginPath();ctx.arc(Math.cos(angle)*67,Math.sin(angle)*35,2,0,Math.PI*2);ctx.fill()}ctx.rotate(Math.sin(time*.001)*(settled?.035:.14));ctx.strokeStyle="#ffe48a";ctx.shadowColor="#ffd85b";ctx.shadowBlur=26;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(0,0,52,22,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle="#fff4bf";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,44,16,0,0,Math.PI*2);ctx.stroke();if(settled){ctx.shadowBlur=0;ctx.fillStyle=seabed?"rgba(126,116,88,.72)":"rgba(103,66,49,.78)";ctx.beginPath();ctx.ellipse(0,21,33,6,0,0,Math.PI*2);ctx.fill()}ctx.restore()}
}

class UIManager {
  constructor(game){this.game=game;this.modal=$("#modal");this.content=$("#modal-content");this.card=$(".modal-card");this.onContinue=null;this.ringIndex=null}
  instrumentVisual(id,complete=false){return `<div class="tool-action-visual ${complete?"complete":""}" data-tool="${id}" aria-label="${ITEMS[id].name}"><i></i></div>`}
  open(html,wide=false,ringDialogue=null){if(this.locked||this.game.cinematic)return;this.onContinue=null;this.game.clearInput();this.content.innerHTML=html;this.modal.classList.add("open");this.modal.classList.toggle("ring-dialogue",Boolean(ringDialogue));this.modal.setAttribute("aria-hidden","false");this.card.classList.toggle("tech-wide",wide);this.card.classList.toggle("astronaut-bubble",ringDialogue?.speaker==="astronaut");this.card.classList.toggle("object-bubble",Boolean(ringDialogue&&ringDialogue.speaker!=="astronaut"));if(ringDialogue)this.positionDialogue(ringDialogue);this.card.scrollTop=0;this.game.paused=true;this.game.audio.play("click");this.content.querySelector("button,input")?.focus({preventScroll:true})}
  positionDialogue({speaker,object}){const game=this.game,target=speaker==="astronaut"?game.player:object==="ring"?game.world?.ring:game.world?.contact;if(!target)return;const zoom=game.camera?.zoom||1,width=game.viewWidth||globalThis.innerWidth||1366,height=game.viewHeight||globalThis.innerHeight||900,screenX=(target.x-(game.camera?.x||0))*zoom,screenY=(target.y-(game.camera?.y||0))*zoom,gutter=width<=600?16:32,half=Math.min(width<=600?220:260,(width-gutter)/2);this.card.style.setProperty?.("--bubble-x",`${clamp(screenX,half,width-half)}px`);this.card.style.setProperty?.("--bubble-y",`${clamp(screenY-70,170,height-90)}px`)}
  close(){if(this.locked)return;this.modal.classList.remove("open","ring-dialogue");this.modal.setAttribute("aria-hidden","true");this.card.classList.remove("tech-wide","astronaut-bubble","object-bubble");this.game.paused=Boolean(this.game.cinematic);this.onContinue=null;this.ringIndex=null;this.game.dialogue=null;this.game.pendingRing=null;this.game.camera.zoom=1;this.game.clearInput();document.activeElement?.blur?.()}
  toast(text){const element=$("#toast");element.textContent=text;element.classList.add("show");clearTimeout(element.timer);element.timer=setTimeout(()=>element.classList.remove("show"),2200)}
  requiredTool(id){const item=ITEMS[id],current=ITEMS[this.game.state.equipped],location=this.game.state.inventory.includes(id)?"من الحقيبة":this.game.state.locker.includes(id)?"من خزانة المركبة":"من صندوق الموقع";this.toast(`الأداة الحالية ${current.name} لا تناسب هذه الخطوة. جهّز ${item.name} ${location}؛ ${item.purpose}`);for(const element of [$("#backpack-btn"),$("#equipped-readout")]){if(!element)continue;clearTimeout(element.toolTimer);element.dataset.required=item.name;element.classList.add("tool-needed");element.toolTimer=setTimeout(()=>element.classList.remove("tool-needed"),2300)}}
  map(){
    if(this.locked||this.game.cinematic||this.game.dialogue)return;
    const button=id=>{const planet=PLANETS[id],explored=this.game.state.explored.includes(id);return `<button class="destination ${explored?"complete":""}" data-destination="${id}" title="Set waypoint: ${planet.en}" style="--planet:${planet.color}"><span class="map-orb">${id==="saturn"?"•ᴗ•":planet.icon}</span><b>${planet.en}</b><small>${this.game.destinationStatus(id)}</small></button>`};
    const buttons=ORDER.map(id=>`<div class="map-system">${button(id)}${id==="earth"?`<div class="moon-branch"><small>EARTH'S MOON</small>${button("moon")}</div>`:""}</div>`).join("");
    this.open(`<div class="tech-title"><div><small>SUN → MERCURY → NEPTUNE</small><h2>خريطة المجموعة الشمسية</h2></div><b>PLANETS ${this.game.exploredPlanets()}/8</b></div><div class="map-grid">${buttons}</div><div class="modal-actions"><button class="tech-button" id="load-game">↩ RETURN</button><button class="tech-button danger-text" id="reset-game">NEW MISSION</button></div>`,true);
    $$('[data-destination]').forEach(button=>button.onclick=()=>{this.game.waypoint=button.dataset.destination;this.game.save();this.close()});$("#load-game").onclick=()=>this.close();$("#reset-game").onclick=()=>this.game.resetMission();
  }
  backpack(){
    if(this.locked||this.game.cinematic||this.game.dialogue)return;const state=this.game.state;
    const slot=id=>{const equipped=state.equipped===id;return`<button class="inventory-slot ${equipped?"equipped":""}" data-item="${id}" aria-pressed="${equipped}"><span class="equipment-code">${ITEMS[id].icon}</span><b>${ITEMS[id].name}</b><small>${state.locker.includes(id)?"LOCKER":`${Math.round(state.conditions[id]??100)}%`}</small>${equipped?'<span class="equipped-indicator">✓ EQUIPPED</span>':""}</button>`};
    const slots=state.inventory.map(slot).join("")+Array.from({length:6-state.inventory.length},()=>'<div class="inventory-slot empty">+</div>').join("");
    const sampleRows=SAMPLE_RECORDS.filter(record=>state.missionSteps.includes(record.available)).map(record=>{const sealed=state.missionSteps.includes(record.sealed),collected=state.missionSteps.includes(record.collected),status=sealed?"محفوظة ومثبت عليها بطاقة":collected?"داخل الحاوية · تحتاج الغلق والبطاقة":"مكشوفة في الموقع · تحتاج الالتقاط";return `<div class="sample-row ${sealed?"sealed":""}"><span>${sealed?"✓":collected?"→":"◇"}</span><div><b>${record.name}</b><small>${PLANETS[record.planet].name} · ${status}</small></div></div>`}).join(""),samples=sampleRows?`<div class="sample-list"><h3>SAMPLES · العينات</h3>${sampleRows}</div>`:"";
    this.open(`<div class="tech-title"><div><small>SUIT EQUIPMENT</small><h2>حقيبة الفضاء</h2></div><b>${state.inventory.length} / 6 · ${this.game.inventoryWeight()} KG</b></div><div class="inventory-layout"><div><div class="inventory-slots">${slots}</div>${samples}<h3>SPACECRAFT LOCKER · ${state.locker.length}</h3><div class="inventory-slots">${state.locker.map(slot).join("")}</div></div><div id="item-inspector" class="item-inspector"></div></div>`,true);
    $$('[data-item]').forEach(button=>button.onclick=()=>this.inspectItem(button.dataset.item));this.inspectItem(state.equipped);
  }
  inspectItem(id){
    if(!this.game.inventory.owned(id))return;const item=ITEMS[id],state=this.game.state,carried=state.inventory.includes(id),condition=state.conditions[id]??100;
    $("#item-inspector").innerHTML=`<span class="large-icon">${item.icon}</span><h3>${item.name}</h3><p>${item.purpose}</p><p>${item.weight} KG</p><div class="condition"><i style="width:${condition}%"></i></div><small>CONDITION ${Math.round(condition)}%</small><br><button class="tech-button" id="equip-item">${state.equipped===id?"✓ EQUIPPED":carried?"EQUIP":"RETRIEVE + EQUIP"}</button>${carried&&!this.game.inventory.essential.includes(id)&&id!==this.game.planet?.tool?'<button class="tech-button" id="store-item">↓ STORE</button>':""}`;
    $("#equip-item").onclick=()=>{if(!this.game.inventory.equip(id)){this.toast("PACK FULL: STORE AN OPTIONAL TOOL");return}this.game.audio.play("item");this.game.save();this.backpack()};
    if($("#store-item"))$("#store-item").onclick=()=>{this.game.inventory.store(id);this.game.save();this.backpack()};
  }
  toolAction(step,science){const item=ITEMS[step.tool];this.open(`<div class="tool-science"><small>${PLANETS[this.game.state.location].en} · SCIENCE TOOL</small>${this.instrumentVisual(step.tool)}<h2>${item.name}</h2><p><strong>إيه دي؟</strong> ${item.purpose}</p><p><strong>هستخدمها إزاي؟</strong> ${item.use}</p><div class="science-subject"><small>هنتعامل مع</small><b>${science.subject}</b></div><button id="use-mission-tool" class="primary-btn">${science.button} [E]</button></div>`);this.onContinue=()=>this.game.beginToolAction(step.key);$("#use-mission-tool").onclick=this.onContinue}
  toolResult(step,science){const sampleState={released:["◇","تم كشفها في موقع العمل"],collected:["→","داخل الحاوية وتحتاج الغلق"],sealed:["✓","محفوظة ومثبت عليها بطاقة"]}[science.sampleStage],sample=science.sample&&sampleState?`<div class="sample-confirm ${science.sampleStage}"><span>${sampleState[0]}</span><div><small>العينة · ${sampleState[1]}</small><b>${science.sample}</b></div></div>`:"",done=this.game.world.steps.filter(entry=>this.game.state.missionSteps.includes(entry.key)).length,total=this.game.world.steps.length;this.open(`<div class="tool-science result"><small>FIELD STEP COMPLETE · اكتملت الخطوة</small>${this.instrumentVisual(step.tool,true)}<h2>${PLANETS[this.game.state.location].name}</h2><div class="field-report"><section><small>WHAT I DID · ماذا فعلت</small><b>${step.label}</b></section><section><small>WHAT I FOUND · ماذا وجدت</small><b>${science.measure}</b><strong>${science.result}</strong></section><section><small>WHY IT MATTERS · لماذا يهم</small><p>${science.meaning}</p></section></div>${sample}<div class="mission-step-progress"><span>MISSION PROGRESS</span><b>${done} / ${total}</b></div><button id="close-tool-result" class="primary-btn">CONTINUE MISSION [E]</button></div>`);this.onContinue=()=>this.close();$("#close-tool-result").onclick=this.onContinue}
  journal(){if(this.locked||this.game.cinematic||this.game.dialogue)return;const entries=DESTINATIONS.map(id=>{const planet=PLANETS[id],discovered=this.game.state.discoveries.includes(id),moment=DISCOVERY_MOMENTS[id];return `<article class="journal-entry ${discovered?"":"locked"}"><span style="--planet:${planet.color}">${discovered?"✓":"○"}</span><div><h3>${planet.en} · ${planet.name}</h3><small>${discovered?"PLANET DISCOVERED":"AWAITING DISCOVERY"}</small>${discovered?`<p><strong>${moment.title}</strong></p><p>${moment.fact}</p>`:""}</div></article>`}).join(""),reference=SPACE_REFERENCE.map((section,index)=>`<details class="reference-group"${index===0?" open":""}><summary><span>${section.code}</span><b>${section.title}</b></summary><div>${section.entries.map(([term,fact])=>`<p><strong>${term}</strong>${fact}</p>`).join("")}</div></details>`).join("");this.open(`<div class="tech-title"><div><small>SOLAR SYSTEM EXPLORATION</small><h2>MISSION LOG · سجل المهمة</h2></div><b>DISCOVERED ${this.game.state.discoveries.length} / 9</b></div><div class="journal-grid">${entries}<section class="space-reference"><header><small>SPACE REFERENCE</small><h2>دليل الفضاء ورائد الفضاء</h2></header>${reference}</section></div>`,true)}
  pause(){if(this.locked||this.game.cinematic||this.game.dialogue)return;this.open(`<div class="tech-title"><div><small>MISSION CONTROL</small><h2>المهمة متوقفة</h2></div></div><div class="pause-grid"><button class="tech-button" id="resume">RESUME</button><button class="tech-button" id="save-now">SAVE GAME</button><button class="tech-button" id="pause-map">STAR MAP</button><button class="tech-button danger-text" id="pause-reset">NEW MISSION</button></div>`);$("#resume").onclick=()=>this.close();$("#save-now").onclick=()=>this.toast(this.game.save()?"MISSION SAVED":"SAVE UNAVAILABLE");$("#pause-map").onclick=()=>this.map();$("#pause-reset").onclick=()=>this.game.resetMission()}
  launch(planet){this.open(`<div class="launch-panel"><small>${planet.en}</small><h2>${planet.mode==="space"?"DEPARTURE":planet.mode==="orbit"?"ORBITAL APPROACH":"LANDING APPROACH"}</h2><span class="launch-ship">▲</span><div class="launch-track"><i></i></div></div>`)}
  planetIntro(){
    const dialogue=this.game.dialogue;if(!dialogue)return;const planet=PLANETS[dialogue.id],line=dialogue.lines[dialogue.index];
    this.open(`<div class="planet-dialogue" style="--planet:${planet.color}"><small>${dialogue.index+1} / ${dialogue.lines.length}</small><div class="talking-planet" aria-hidden="true">${planet.icon}</div><h2 id="dialogue-speaker">${line.astronaut?"رائد الفضاء":planet.name}</h2><div class="planet-speech" aria-live="polite"><p id="dialogue-line">«${line.text}»</p></div><button id="continue-planet" class="primary-btn" aria-label="${dialogue.index===dialogue.lines.length-1?"إنهاء المحادثة":"الجملة التالية"}">${dialogue.index===dialogue.lines.length-1?"✓":"›"}</button></div>`);
    this.onContinue=()=>this.game.advanceDialogue();$("#continue-planet").onclick=this.onContinue;
  }
  ring(planet,index,lineIndex=0){const toast=$("#toast"),lines=RING_DIALOGUES[this.game.state.location]||[],line=lines[lineIndex];if(!line)return;clearTimeout(toast.timer);toast.classList.remove("show");if(lineIndex===0)this.game.audio.play("ring");this.ringIndex=lineIndex;const astronaut=line.speaker==="astronaut";this.open(`<div class="ring-discovery world-speech ${line.speaker}" style="--planet:${planet.color}"><small>${lineIndex+1} / ${lines.length} · RING ${index} / 7</small><h2>${astronaut?"رائد الفضاء":"حلقة زحل"}</h2><div class="planet-speech" aria-live="polite"><p class="ring-line ${line.speaker}">«${line.text}»</p></div><button id="confirm-ring" class="bubble-next" aria-label="${lineIndex===lines.length-1?"ضم الحلقة للمهمة":"الجملة التالية"}">${lineIndex===lines.length-1?"✓":"›"}</button></div>`,false,{speaker:astronaut?"astronaut":"ring",object:"ring"});this.onContinue=()=>{if(this.ringIndex<lines.length-1)this.ring(planet,index,this.ringIndex+1);else this.game.confirmRing()};$("#confirm-ring").onclick=this.onContinue}
  saturnFinal(){
    const lines=[
      {astronaut:true,text:"زحل! رجعتلك كل حلقاتك السبع!"},
      {text:"أخيرًا! رجعتولي! شكرًا يا رائد الفضاء إنك كملت المهمة."},
      {astronaut:true,text:"بعد كل اللي اتعلمته، عايز أفهم حلقاتك الحقيقية أكتر."},
      {text:"حلقاتي مش قرصًا صلبًا؛ هي مليارات من قطع الجليد والصخور والغبار، من حبيبات صغيرة إلى قطع قد تقارب حجم منزل."},
      {astronaut:true,text:"وليه بتبان واضحة ولامعة بالشكل ده؟"},
      {text:"الجليد المائي بيعكس ضوء الشمس بقوة. بنسمي الحلقات الرئيسية A وB وC، ومعاها D وE وF وG ونطاقات أصغر كثيرة بينها فجوات."},
      {text:"الحلقات واسعة جدًا لكن رفيعة مقارنة بعرضها، وهي نظام ديناميكي معقد من آلاف النطاقات؛ مش سبع حلقات منفصلة بس زي شخصيات قصتنا."},
      {astronaut:true,text:"دلوقتي فهمت. المهمة اكتملت، والحلقات رجعت مكانها!"}
    ],index=this.game.finalDialogueIndex||0,line=lines[index];
    this.open(`<div class="planet-dialogue" style="--planet:${PLANETS.saturn.color}"><small>${index+1} / ${lines.length}</small><div class="talking-planet" aria-hidden="true">${PLANETS.saturn.icon}</div><h2>${line.astronaut?"رائد الفضاء":"زحل"}</h2><div class="planet-speech" aria-live="polite"><p>«${line.text}»</p></div><button id="continue-saturn" class="primary-btn" aria-label="${index===lines.length-1?"إكمال المهمة":"الجملة التالية"}">${index===lines.length-1?"✓":"›"}</button></div>`);this.onContinue=()=>this.game.advanceSaturnFinal(lines.length);$("#continue-saturn").onclick=this.onContinue;
  }
}

class Game {
  constructor(){
    this.canvas=$("#game-canvas");this.ctx=this.canvas.getContext("2d");this.state=SaveManager.load();
    this.inventory=new Inventory(this);this.missions=new MissionManager(this);this.audio=new AudioManager(this);this.ui=new UIManager(this);this.camera=new Camera();this.player=new Player();
    this.world=null;this.planet=null;this.keys={};this.paused=false;this.jumpRequested=false;this.jumpHeld=false;this.lastTime=performance.now();this.near=null;this.cinematic=null;this.oceanReaction=null;this.transitioning=false;this.autosave=0;
    this.bind();window.addEventListener("blur",()=>{this.suspended=true;this.clearInput();this.audio.stop()});window.addEventListener("focus",()=>{this.suspended=false;this.lastTime=performance.now()});document.addEventListener("visibilitychange",()=>{if(document.hidden){this.clearInput();this.audio.stop();if(this.state.started)this.save()}else this.lastTime=performance.now()});window.addEventListener("pagehide",()=>{this.audio.stop();if(this.state.started)this.save()});
    this.resize();this.restore();requestAnimationFrame(time=>this.loop(time));
  }
  clearInput(){this.keys={};this.jumpHeld=false;this.jumpRequested=false;this.player.jumpBufferTimer=0}
  get waypoint(){return this.state.waypoint}
  set waypoint(id){this.state.waypoint=DESTINATIONS.includes(id)?id:null}
  destinationStatus(id){if(this.state.rings.includes(id))return "RING RECOVERED";if(this.state.explored.includes(id))return PLANETS[id].hasRing?"EXPLORED":"NO RING FOUND";return this.state.visited.includes(id)?"SEARCH IN PROGRESS":"UNEXPLORED"}
  canTalk(){const contact=this.world?.contact;return Boolean(contact&&this.state.observations.includes(this.state.location)&&Math.hypot(this.player.x-contact.x,this.player.y-contact.y)<125)}
  startDialogue(){
    if(this.paused||this.dialogue||this.cinematic||this.transitioning||!this.canTalk())return;
    const id=this.state.location,planet=this.planet,recovered=this.state.rings.includes(id),replay=this.state.conversations.includes(id);
    const lines=recovered&&planet.hasRing?[
      {astronaut:true,text:`يا ${planet.name}، رجعت أتأكد إن كل شيء تمام بعد ما لقيت الحلقة.`},
      {text:"أيوه، الحلقة بقت معاك بأمان، وأثرها اختفى من هنا."},
      {astronaut:true,text:"ممتاز. المعلومة اللي شاركتها معايا هتفضل في سجل المهمة."},
      {text:"كمّل استكشافك بنفس الدقة، فكل عالم عنده شيء مختلف تكتشفه."},
      {astronaut:true,text:"هكمل لحد ما أجمع باقي الحلقات وأرجعهم كلهم لزحل."}
    ]:PLANET_DIALOGUES[id].map(line=>({...line}));
    const savedIndex=this.state.dialogueProgress[id]||0;this.dialogue={id,lines,index:replay?0:Math.min(savedIndex,lines.length-1),replay,nextAt:performance.now()+250};this.ui.planetIntro();
  }
  advanceDialogue(){
    const dialogue=this.dialogue;if(!dialogue||dialogue.id!==this.state.location||performance.now()<dialogue.nextAt)return;dialogue.nextAt=performance.now()+250;
    if(dialogue.index<dialogue.lines.length-1){dialogue.index++;if(!dialogue.replay)this.state.dialogueProgress[dialogue.id]=dialogue.index;this.save();this.ui.planetIntro();return}
    const id=dialogue.id;if(!this.state.conversations.includes(id))this.state.conversations.push(id);if(!this.state.clues.includes(id))this.state.clues.push(id);delete this.state.dialogueProgress[id];
    this.ui.close();this.dialogue=null;
    if(id==="moon"&&!this.state.moonSighting){this.state.moonSighting=true;if(!this.state.rings.includes("mars")){this.state.sightingPending=true;this.sighting={time:0};this.waypoint="mars"}}
    if(!this.planet.hasRing)this.completeNoRing();this.save();this.updateHUD();
  }
  bind(){
    window.addEventListener("resize",()=>this.resize());window.addEventListener("pointerdown",()=>this.audio.unlock(),{passive:true});window.addEventListener("keydown",event=>this.keyDown(event));window.addEventListener("keyup",event=>{const key=this.inputKey(event);this.keys[key]=false;if(key===" "||key==="w"||key==="arrowup")this.jumpHeld=false});
    $("#start-btn").onclick=()=>this.start();$("#map-btn").onclick=()=>this.ui.map();$("#backpack-btn").onclick=()=>this.ui.backpack();$("#journal-btn").onclick=()=>this.ui.journal();$("#pause-btn").onclick=()=>this.ui.pause();
    $("#save-btn").onclick=()=>this.ui.toast(this.save()?"MISSION SAVED":"SAVE UNAVAILABLE");$("#sound-btn").onclick=()=>{this.state.sound=!this.state.sound;if(!this.state.sound)this.audio.stop();else{this.audio.setEnvironment(this.state.location);this.audio.unlock()}this.save();$("#sound-btn small").textContent=this.state.sound?"ON":"OFF"};
    $("#modal-close").onclick=()=>this.ui.close();$("#modal").onclick=event=>{if(event.target.id==="modal")this.ui.close()};$("#play-again-btn").onclick=()=>this.resetMission(true);$("#home-btn").onclick=()=>this.home();
    if($("#new-mission-btn"))$("#new-mission-btn").onclick=()=>this.resetMission();
    $$('[data-difficulty]').forEach(button=>button.onclick=()=>{if(this.state.started)return;$$('[data-difficulty]').forEach(node=>node.classList.remove("selected"));button.classList.add("selected");this.state.difficulty=button.dataset.difficulty});
    $$("[data-control]").forEach(button=>{
      const key={left:"a",right:"d",up:"w",down:"s"}[button.dataset.control];
      if(key){button.onpointerdown=event=>{event.preventDefault();if(this.paused)return;button.setPointerCapture(event.pointerId);this.keys[key]=true;if(key==="w"&&this.planet?.mode==="surface")this.requestJump()};const release=()=>{this.keys[key]=false;if(key==="w")this.jumpHeld=false};button.onpointerup=button.onpointercancel=button.onlostpointercapture=release}
      else button.onclick=()=>this.interact();
    });
    $("#sound-btn small").textContent=this.state.sound?"ON":"OFF";
    $$(".quick-bar button").forEach(button=>{const label=button.querySelector("b").textContent;button.title=label;button.setAttribute("aria-label",label);button.addEventListener("click",()=>button.blur())});
    $$('[data-difficulty]').forEach(button=>{button.classList.toggle("selected",button.dataset.difficulty===this.state.difficulty);button.disabled=this.state.started});
  }
  inputKey(event){return event.code?.startsWith("Key")?event.code.slice(3).toLowerCase():event.key.toLowerCase()}
  resize(){const ratio=Math.min(devicePixelRatio||1,2),rect=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,rect.width*ratio);this.canvas.height=Math.max(1,rect.height*ratio);this.ctx.setTransform(ratio,0,0,ratio,0,0);this.viewWidth=rect.width;this.viewHeight=rect.height}
  restore(){this.showScreen("intro");$("#start-btn").hidden=this.state.complete;$("#start-btn").textContent=this.state.started?"CONTINUE MISSION":"ابدأ المهمة 🚀";this.updateHUD()}
  resumeMission(){this.showScreen("game");if(this.state.complete){this.showScreen("final");return}if(DESTINATIONS.includes(this.state.location))this.enterPlanet(this.state.location,false);else this.enterSpace(false);if(this.state.finalReturnPending)this.beginFinalReturn()}
  showScreen(name){$$('.screen').forEach(screen=>screen.classList.remove("active"));$(`#${name}-screen`).classList.add("active");if(name==="game")this.resize();if(name==="final"){this.audio.setEnvironment(null);this.updateFinal()}}
  start(){if(this.state.started){this.resumeMission();return}this.state.started=true;this.showScreen("game");this.audio.play("success");this.enterSpace(false)}
  keyDown(event){
    this.audio.unlock();
    const key=this.inputKey(event),modal=this.ui.modal.classList.contains("open");
    if(modal){
      if(key==="escape"){event.preventDefault();this.ui.close()}
      else if(key==="e"&&!event.repeat&&this.ui.onContinue){event.preventDefault();this.ui.onContinue()}
      else if(key==="tab"){const controls=[...this.ui.modal.querySelectorAll('button:not(:disabled),input')];const current=controls.indexOf(document.activeElement);event.preventDefault();controls[(current+(event.shiftKey?-1:1)+controls.length)%controls.length]?.focus()}
      return;
    }
    if(!this.world||this.state.complete||this.cinematic||this.transitioning)return;
    if(["tab"," ","arrowup","arrowdown","arrowleft","arrowright"].includes(key))event.preventDefault();
    if(event.repeat&&["e","m","j","tab","escape"," ","arrowup","w"].includes(key))return;
    if(key==="tab")this.ui.backpack();else if(key==="m")this.ui.map();else if(key==="j")this.ui.journal();else if(key==="e")this.interact();else if(key===" "){event.preventDefault();if(this.planet.mode!=="space")this.requestJump()}else if(key==="escape")this.ui.pause();else{this.keys[key]=true;if(["w","arrowup"].includes(key)&&this.planet.mode==="surface")this.requestJump()}
  }
  requestJump(){if(this.paused)return;if(this.state.location==="saturn"){this.jumpRequested=false;this.jumpHeld=false;this.player.jumpBufferTimer=0;return}this.jumpRequested=true;this.jumpHeld=true;this.player.queueJump(this.state.difficulty==="explorer"?.15:.13)}
  consumeJumpRequest(){if(!this.jumpRequested)return false;this.jumpRequested=false;return true}
  selectDestination(id){
    if(this.paused||this.state.location!=="space"||!DESTINATIONS.includes(id))return;
    const node=this.world.planetNodes.find(node=>node.id===id);
    if(Math.hypot(this.player.x-node.x,this.player.y-node.y)>node.radius+105){this.waypoint=id;this.ui.close();return}
    this.transition(id);
  }
  transition(id){if(this.paused||this.dialogue||this.transitioning||this.cinematic||!Object.hasOwn(PLANETS,id))return;this.save();this.clearInput();this.transitioning=true;this.ui.launch(PLANETS[id]);this.ui.locked=true;this.audio.play("launch");this.transitionTimer=setTimeout(()=>{this.transitionTimer=null;this.ui.locked=false;this.transitioning=false;this.ui.close();if(id==="space")this.enterSpace(true);else this.enterPlanet(id,true)},1400)}
  launchToSpace(){this.departure=this.state.location;this.transition("space")}
  resetScene(){this.clearInput();this.audio.setEnvironment(this.state.location);this.near=null;this.pendingRing=null;this.oceanReaction=null;this.camera.zoom=this.planet.mode==="space"?Math.min(this.viewWidth/this.world.width,this.viewHeight/this.world.height)*.92:1;const viewportWorldWidth=this.viewWidth/this.camera.zoom,viewportWorldHeight=this.viewHeight/this.camera.zoom;this.camera.x=viewportWorldWidth>=this.world.width?(this.world.width-viewportWorldWidth)/2:clamp(this.player.x-viewportWorldWidth/2,0,this.world.width-viewportWorldWidth);this.camera.y=viewportWorldHeight>=this.world.height?(this.world.height-viewportWorldHeight)/2:clamp(this.player.y-viewportWorldHeight/2,0,this.world.height-viewportWorldHeight);$("#interaction-prompt").classList.remove("visible")}
  enterSpace(fresh){
    if(this.dialogue||this.cinematic)return;
    this.state.location="space";this.planet=PLANETS.space;this.world=new World("space");this.player.reset("space");
    const node=this.world.planetNodes.find(node=>node.id===this.departure),saved=this.state.positions.space;
    if(fresh&&node){this.player.x=node.x-node.radius-140;this.player.y=node.y}else if(saved){this.player.x=clamp(saved.x,40,this.world.width-40);this.player.y=clamp(saved.y,40,this.world.height-40)}
    this.resetScene();this.save();this.updateHUD();this.ui.toast("FREE FLIGHT");
  }
  enterPlanet(id,fresh){
    if(this.dialogue||this.cinematic||!Object.hasOwn(PLANETS,id)||id==="space")return;this.state.location=id;this.planet=PLANETS[id];this.world=new World(id);this.missions.configure(this.world);this.player.reset(this.planet.mode);
    const saved=this.state.positions[id];if(saved&&!fresh){this.player.x=clamp(saved.x,40,this.world.width-40);this.player.y=clamp(saved.y,40,this.world.height-40)}
    if(this.inventory.owned(this.planet.tool))this.inventory.carry(this.planet.tool);
    this.world.tool.active=!this.inventory.owned(this.planet.tool);this.world.ring.active=Boolean(this.planet.hasRing&&!this.state.rings.includes(id));this.world.science[0].active=!this.state.scienceLogged.includes(id);
    this.resetScene();const firstVisit=DESTINATIONS.includes(id)&&!this.state.visited.includes(id);if(firstVisit)this.state.visited.push(id);this.save();this.updateHUD();
    const environmentNotice={mercury:"تحذير تعليمي: ضوء الشمس شديد ولا يوجد غلاف جوي فعّال",venus:"تحذير تعليمي: غلاف جوي كثيف وحار يقلل الرؤية",mars:"تنبيه تعليمي: غبار يتحرك في الغلاف الجوي الرقيق",jupiter:"تنبيه تعليمي: سحب كثيفة ورياح شديدة أسفل منطقة الاستكشاف",saturn:"تنبيه تعليمي: طبقات سحب كثيفة تحيط بزحل",uranus:"تنبيه تعليمي: غلاف جوي بارد وضباب أزرق باهت",neptune:"تنبيه تعليمي: رياح شديدة في الغلاف الجوي الأزرق",moon:"تنبيه تعليمي: لا غلاف جوي والسماء شديدة الوضوح",earth:"ساحل نهاري · تحرك يمينًا للسباحة واستخدم أعلى وأسفل للغوص"}[id];
    this.ui.toast(environmentNotice||"EVA READY · EXPLORE");
  }
  loop(time){
    const dt=Math.max(0,Math.min((time-this.lastTime)/1000,.034));this.lastTime=time;
    if(!this.suspended&&!document.hidden){
      if(this.cinematic)this.updateCinematic(dt);
      if(!this.paused&&this.state.started&&!this.state.complete&&this.world){
        this.state.elapsed+=dt;this.player.update(this,dt);
        this.observeNearby();this.updateOceanReaction(dt);this.detectNearby();this.updateSighting(dt);this.updateDiscoveryMoment(dt);this.updateSpaceApproach(dt);this.camera.follow(this.player,this.viewWidth,this.viewHeight,this.world.width,this.world.height,dt);
        this.autosave+=dt;if(this.autosave>=8){this.save();this.autosave=0}
      }
    }
    this.audio.updateAmbience();this.draw(time);this.updateHUD();requestAnimationFrame(next=>this.loop(next));
  }
  updateSighting(dt){
    if(!this.state.sightingPending){this.sighting=null;return}this.sighting||={time:0};this.sighting.time+=dt;
    if(this.sighting.time>=5){this.state.sightingPending=false;this.sighting=null;this.save()}
  }
  drawSighting(ctx,time){
    const hidden=this.cinematic?.type==="tool";$("#game-screen").classList.toggle("ring-sighting",Boolean(this.sighting&&!hidden));
    if(!this.sighting||hidden)return;
    const compact=this.viewHeight<500,besideTouch=compact&&this.viewWidth<=900;
    const width=Math.min(this.viewWidth-(besideTouch?190:24),650),left=besideTouch?12:(this.viewWidth-width)/2,top=compact?Math.min(190,this.viewHeight-200):Math.max(290,this.viewHeight*.42),progress=clamp(this.sighting.time/4,0,1);
    ctx.save();ctx.fillStyle="rgba(1,8,17,.94)";ctx.fillRect(left,top,width,compact?140:154);ctx.textAlign="center";ctx.fillStyle="#ffe48a";ctx.font="14px Share Tech Mono";ctx.fillText("RING SIGHTING",left+width/2,top+23);ctx.font="12px Share Tech Mono";ctx.fillText("DESTINATION: MARS",left+width/2,top+43);
    const start=left+46,end=left+width-46,flightY=top+(compact?86:94);
    ctx.strokeStyle="#c6e8ed66";ctx.setLineDash([4,8]);ctx.beginPath();ctx.moveTo(start,flightY);ctx.lineTo(end,flightY);ctx.stroke();ctx.setLineDash([]);
    ctx.save();ctx.translate(start,flightY);this.world.paintPlanet(ctx,"moon",23);ctx.restore();ctx.save();ctx.translate(end,flightY);this.world.paintPlanet(ctx,"mars",26);ctx.restore();
    ctx.save();ctx.translate(lerp(start+30,end-28,progress),flightY-18*Math.sin(progress*Math.PI));ctx.scale(.5,.5);this.world.drawRing(ctx,{x:0,y:0},time);ctx.restore();
    ctx.fillStyle="#eaffff";ctx.font="11px Share Tech Mono";ctx.fillText("MOON",start,top+(compact?130:139));ctx.fillText("MARS",end,top+(compact?130:139));ctx.restore();
  }
  draw(time){
    const ctx=this.ctx;if(!ctx||!this.viewWidth||!this.viewHeight)return;$("#game-screen").classList.toggle("tool-action",this.cinematic?.type==="tool");ctx.setTransform(this.canvas.width/this.viewWidth,0,0,this.canvas.height/this.viewHeight,0,0);ctx.clearRect(0,0,this.viewWidth,this.viewHeight);if(!this.world)return;
    this.world.drawBackground(ctx,this.camera,time,{width:this.viewWidth,height:this.viewHeight});ctx.save();this.camera.apply(ctx);this.world.draw(ctx,this,time);
    const toolAnimation=this.cinematic?.type==="tool"?this.cinematic:null,toolStep=toolAnimation?this.world.steps.find(step=>step.key===toolAnimation.key):null;this.player.draw(ctx,time,this.planet.mode,toolAnimation,toolStep);
    this.drawToolAction(ctx,time);
    if(this.cinematic?.type==="ring"){const animation=this.cinematic,progress=clamp(animation.time/1.4,0,1),ease=progress*progress*(3-2*progress);this.world.drawRing(ctx,{x:lerp(animation.x,this.player.x,ease),y:lerp(animation.y,this.player.y-25,ease)-Math.sin(progress*Math.PI)*70},time)}
    if(this.planet.mode==="space"&&this.waypoint){const target=this.world.planetNodes.find(node=>node.id===this.waypoint);if(target){const angle=Math.atan2(target.y-this.player.y,target.x-this.player.x);ctx.save();ctx.translate(this.player.x,this.player.y);ctx.rotate(angle);ctx.strokeStyle="#ffd166";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(65,-9);ctx.lineTo(80,0);ctx.lineTo(65,9);ctx.stroke();ctx.restore()}}
    ctx.restore();this.drawSighting(ctx,time);this.drawDiscoveryMoment(ctx);this.drawOceanReaction(ctx);this.drawFinalReturn(ctx);this.drawFinale(ctx,time);
  }
  drawToolAction(ctx,time){const animation=this.cinematic;if(animation?.type!=="tool")return;const step=this.world.steps.find(step=>step.key===animation.key),pose=this.player.taskPose(animation,step),workflow=step&&TOOL_WORKFLOWS[step.tool];if(!step||!pose||!workflow)return;this.world.drawEquipment(ctx,pose.handWorld,step.tool,{held:true,facing:pose.facing,angle:pose.toolAngle,scale:pose.toolScale});const phase=workflow.phases.find(entry=>entry.id===animation.phase)||workflow.phases[0],width=228,zoom=this.camera.zoom||1,viewLeft=this.camera.x+8/zoom,viewRight=this.camera.x+this.viewWidth/zoom-width-8/zoom,x=clamp((this.player.x+step.x)/2-width/2,viewLeft,Math.max(viewLeft,viewRight)),y=Math.min(this.player.y,step.y)-94;ctx.save();ctx.fillStyle="rgba(2,13,27,.88)";ctx.fillRect(x,y,width,36);ctx.strokeStyle="rgba(99,230,245,.5)";ctx.strokeRect(x,y,width,36);ctx.fillStyle="#eaffff";ctx.font="12px Changa";ctx.direction="rtl";ctx.textAlign="center";ctx.fillText(phase.label,x+width/2,y+17,width-16);ctx.fillStyle="#17364a";ctx.fillRect(x+8,y+27,width-16,3);ctx.fillStyle="#61efad";ctx.fillRect(x+8,y+27,(width-16)*pose.progress,3);ctx.restore()}
  updateSpaceApproach(dt){if(this.planet.mode!=="space"||this.cinematic)return;const base=Math.min(this.viewWidth/this.world.width,this.viewHeight/this.world.height)*.92,nearest=Math.min(...this.world.planetNodes.map(node=>Math.hypot(this.player.x-node.x,this.player.y-node.y)-node.radius)),approach=clamp((500-nearest)/420,0,1),target=lerp(base,.68,approach);this.camera.zoom=lerp(this.camera.zoom,target,1-Math.pow(.18,dt))}
  updateDiscoveryMoment(dt){if(!this.discoveryMoment)return;this.discoveryMoment.time+=dt;if(this.discoveryMoment.time>=5)this.discoveryMoment=null}
  drawDiscoveryMoment(ctx){const moment=this.discoveryMoment;if(!moment||this.cinematic||this.dialogue)return;const detail=DISCOVERY_MOMENTS[moment.id],progress=clamp(moment.time/.7,0,1),fade=clamp((5-moment.time)/.9,0,1),alpha=progress*fade,width=Math.min(420,this.viewWidth-32),top=this.viewHeight<700?this.viewHeight*.58:this.viewHeight*.68;ctx.save();ctx.globalAlpha=alpha;ctx.textAlign="center";ctx.fillStyle="rgba(1,8,17,.72)";ctx.fillRect((this.viewWidth-width)/2,top,width,58);ctx.fillStyle="#eaffff";ctx.font="15px Changa";ctx.direction="rtl";ctx.fillText(`رائد الفضاء: «إيه ده؟ ${detail.title} شكله مدهش!»`,this.viewWidth/2,top+35,width-28);ctx.restore()}
  updateOceanReaction(dt){if(this.oceanReaction){this.oceanReaction.time+=dt;if(this.oceanReaction.time>=5)this.oceanReaction=null;return}if(this.state.location!=="earth"||this.state.earthOceanReaction||!this.player.submerged||this.player.x<this.world.water.shoreX+180)return;this.state.earthOceanReaction=true;this.oceanReaction={time:0};this.audio.play("success");this.save()}
  drawOceanReaction(ctx){const reaction=this.oceanReaction;if(!reaction||this.cinematic||this.dialogue)return;const zoom=this.camera.zoom||1,anchorX=(this.player.x-this.camera.x)*zoom,anchorY=(this.player.y-this.camera.y-this.player.height*.68)*zoom,width=Math.min(350,this.viewWidth-24),height=72,left=clamp(anchorX-width/2,12,this.viewWidth-width-12),top=clamp(anchorY-height-24,86,this.viewHeight-height-18),fade=clamp(reaction.time/.35,0,1)*clamp((5-reaction.time)/.7,0,1);ctx.save();ctx.globalAlpha=fade;ctx.fillStyle="rgba(255,255,255,.96)";ctx.strokeStyle="#63e6f5";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(left+10,top);ctx.lineTo(left+width-10,top);ctx.quadraticCurveTo(left+width,top,left+width,top+10);ctx.lineTo(left+width,top+height-10);ctx.quadraticCurveTo(left+width,top+height,left+width-10,top+height);ctx.lineTo(left+28,top+height);ctx.lineTo(clamp(anchorX,left+18,left+width-18),top+height+12);ctx.lineTo(clamp(anchorX,left+18,left+width-18)+8,top+height);ctx.lineTo(left+10,top+height);ctx.quadraticCurveTo(left,top+height,left,top+height-10);ctx.lineTo(left,top+10);ctx.quadraticCurveTo(left,top,left+10,top);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle="#08778c";ctx.font="12px Changa";ctx.textAlign="right";ctx.direction="rtl";ctx.fillText("رائد الفضاء",left+width-15,top+20);ctx.fillStyle="#10283a";ctx.font="14px Changa";ctx.textAlign="center";ctx.fillText("«واو! كل السمك ده عايش هنا؟",left+width/2,top+43,width-24);ctx.fillText("المكان تحت الميه جميل أوي!»",left+width/2,top+63,width-24);ctx.restore()}
  drawFinalReturn(ctx){const animation=this.cinematic;if(animation?.type!=="return")return;const flight=animation.phase==="flight",compact=this.viewWidth<520,top=Math.max(150,this.viewHeight*.18),width=Math.min(460,this.viewWidth-24),left=(this.viewWidth-width)/2,trackWidth=width-100;ctx.save();ctx.fillStyle="rgba(1,8,17,.84)";ctx.fillRect(left,top,width,flight?106:92);ctx.textAlign="center";ctx.fillStyle="#ffe48a";ctx.font=`bold ${compact?18:24}px Share Tech Mono`;ctx.fillText(flight&&compact?"SATURN APPROACH":flight?"AUTOPILOT · SATURN APPROACH":"7/7 RINGS COLLECTED",this.viewWidth/2,top+40,width-24);ctx.fillStyle="#eaffff";ctx.font="14px Changa";ctx.fillText(flight?"المركبة تعيد الحلقات السبع إلى زحل":"الحلقات السبع آمنة... حان وقت العودة إلى زحل!",this.viewWidth/2,top+68,width-24);if(flight){ctx.fillStyle="#17394a";ctx.fillRect(this.viewWidth/2-trackWidth/2,top+84,trackWidth,5);ctx.fillStyle="#63e6f5";ctx.fillRect(this.viewWidth/2-trackWidth/2,top+84,trackWidth*clamp(animation.time/5.5,0,1),5)}ctx.restore()}
  drawFinale(ctx,time){const animation=this.cinematic;if(animation?.type!=="finale")return;const progress=clamp(animation.time/4,0,1),pullback=1-Math.pow(1-progress,3),world=this.finaleWorld;if(!world)return;ctx.save();world.drawBackground(ctx,{x:0,y:0},time,{width:this.viewWidth,height:this.viewHeight});const finalScale=Math.min(this.viewWidth/world.width,this.viewHeight/world.height)*.9,scale=lerp(finalScale*2.1,finalScale,pullback),finaleGame={state:this.state,player:null,waypoint:null};ctx.translate((this.viewWidth-world.width*scale)/2,(this.viewHeight-world.height*scale)/2);ctx.scale(scale,scale);world.drawSolarSystem(ctx,finaleGame,time);ctx.restore();if(progress>.55){const width=Math.min(440,this.viewWidth-24),top=this.viewWidth<600?this.viewHeight*.61:this.viewHeight*.72;ctx.save();ctx.globalAlpha=clamp((progress-.55)/.2,0,1);ctx.fillStyle="rgba(1,8,17,.82)";ctx.fillRect((this.viewWidth-width)/2,top,width,64);ctx.textAlign="center";ctx.fillStyle="#ffe48a";ctx.font="bold 18px Share Tech Mono";ctx.fillText("A JOURNEY ACROSS THE SOLAR SYSTEM",this.viewWidth/2,top+28,width-24);ctx.fillStyle="#eaffff";ctx.font="13px Changa";ctx.fillText("رحلة عبر المجموعة الشمسية كلها",this.viewWidth/2,top+51,width-24);ctx.restore()}}
  detectNearby(){
    const priority={ring:0,talk:1,tool:2,task:3,science:4,destination:5};
    this.near=this.world.objects().map(object=>({object,distance:Math.hypot(object.x-this.player.x,object.y-this.player.y)})).filter(entry=>entry.object.type!=="observation"&&entry.distance<(entry.object.type==="destination"?entry.object.radius+105:165)&&(entry.object.type!=="ring"||this.missions.canReveal())&&(entry.object.type!=="talk"||this.canTalk())).sort((first,second)=>(priority[first.object.type]??6)-(priority[second.object.type]??6)||first.distance-second.distance)[0]?.object||null;
    const prompt=$("#interaction-prompt");prompt.classList.toggle("visible",Boolean(this.near));if(this.near){const labels={talk:"TALK · تحدث",tool:"التقط الأداة",task:"USE TOOL HERE · استخدم الأداة هنا",ring:"تحدث إلى الحلقة",science:"وثّق بالكاميرا"};prompt.querySelector("span").textContent=this.near.type==="destination"?PLANETS[this.near.id].en:labels[this.near.type]||"المركبة: دعم الحياة وإقلاع"}
  }
  interact(){
    if(this.paused||!this.world||this.cinematic||this.transitioning)return;this.detectNearby();if(!this.near){if(this.planet.mode!=="space")this.ui.toast("اقترب من نقطة المهمة لاستخدام الأداة");return}const object=this.near;
    if(object===this.world.ship){this.state.health=100;for(const id of [...this.state.inventory,...this.state.locker])this.state.conditions[id]=100;this.save();this.audio.play("success");if(this.state.location==="saturn"&&this.state.rings.length===7)this.restoreSaturn();else this.launchToSpace();return}
    if(object.type==="destination")this.selectDestination(object.id);
    else if(object.type==="talk")this.startDialogue();
    else if(object.type==="tool")this.collectTool(object);
    else if(object.type==="task")this.missions.useStep(object);
    else if(object.type==="ring")this.discoverRing();
    else if(object.type==="science"){
      if(this.state.equipped!=="camera"){this.ui.toast("جهّز الكاميرا من الحقيبة");return}
      object.active=false;if(!this.state.scienceLogged.includes(this.state.location)){this.state.scienceLogged.push(this.state.location);this.state.knowledge+=5;this.audio.play("item");this.ui.toast("PHOTO LOGGED +5 XP")}
    }
    this.save();
  }
  collectTool(object){
    if(!object.active||Math.hypot(object.x-this.player.x,object.y-this.player.y)>=165)return;
    const id=object.item||this.planet.tool,item=ITEMS[id];object.active=false;const carried=this.inventory.acquire(id);if(carried)this.inventory.equip(id);this.audio.play("item");this.save();
    const button=id==="sampleContainer"?"خذ حاوية العينات":"خذ الأداة";this.ui.open(`<div class="item-found"><small>أداة للمهمة الحالية</small>${this.ui.instrumentVisual(id)}<h2>${item.name}</h2><p><strong>إيه دي؟</strong> ${item.purpose}</p><p><strong>هستخدمها إزاي؟</strong> ${item.use}</p><b>${carried?"جاهزة في حقيبة الفضاء":"محفوظة في خزانة المركبة"} · 100%</b><button class="primary-btn" id="continue-item">${button} [E]</button></div>`);this.ui.onContinue=()=>this.ui.close();$("#continue-item").onclick=this.ui.onContinue;this.updateHUD();
  }
  beginToolAction(key){const step=this.world?.steps?.find(step=>step.key===key);if(!step||!step.active||this.missions.remaining()[0]!==step||this.state.equipped!==step.tool||Math.hypot(this.player.x-step.x,this.player.y-step.y)>=165)return;const workflow=TOOL_WORKFLOWS[step.tool];if(!workflow)return;this.ui.close();this.clearInput();$("#interaction-prompt").classList.remove("visible");const toast=$("#toast");clearTimeout(toast.timer);toast.classList.remove("show");const facing=this.player.x===step.x?this.player.facing:(step.x>this.player.x?1:-1);this.player.facing=facing;this.player.x=clamp(step.x-facing*68,30,this.world.width-30);this.cinematic={type:"tool",key,time:0,duration:workflow.duration,phase:workflow.phases[0].id,playedPhases:[]};this.paused=true;this.audio.playTool(step.tool);for(const phase of workflow.phases)if(phase.at===0&&phase.sound){this.audio.playToolPhase?.(phase.sound);this.cinematic.playedPhases.push(phase.id)}}
  completeNoRing(){const id=this.state.location;if(this.planet.hasRing||this.state.explored.includes(id)||!this.state.conversations.includes(id))return;this.state.explored.push(id);if(!this.state.discoveries.includes(id))this.state.discoveries.push(id);this.state.knowledge+=10;this.save();this.ui.toast("EXPLORATION LOGGED")}
  discoverRing(){const id=this.state.location;if(this.paused||!this.missions.canReveal()||Math.hypot(this.player.x-this.world.ring.x,this.player.y-this.world.ring.y)>=165)return;this.pendingRing=id;this.ui.ring(this.planet,this.state.rings.length+1)}
  confirmRing(){const id=this.pendingRing;if(id!==this.state.location||this.cinematic||!this.missions.canReveal()||this.state.rings.length>=7||Math.hypot(this.player.x-this.world.ring.x,this.player.y-this.world.ring.y)>=165)return;this.ui.close();this.world.ring.active=false;this.pendingRing=null;this.clearInput();this.cinematic={type:"ring",id,time:0,x:this.world.ring.x,y:this.world.ring.y};this.paused=true;this.audio.play("ring")}
  updateCinematic(dt){
    const animation=this.cinematic;if(!animation)return;animation.time+=dt;
    if(animation.type==="ring"){
      this.camera.zoom=1+.08*Math.sin(Math.min(1,animation.time/1.4)*Math.PI);
      if(animation.time<1.4)return;this.cinematic=null;this.paused=false;this.camera.zoom=1;
      if(animation.id!==this.state.location||this.state.rings.includes(animation.id))return;
      this.state.rings.push(animation.id);for(const key of ["explored","discoveries"])if(!this.state[key].includes(animation.id))this.state[key].push(animation.id);
      this.state.knowledge+=15;if(this.state.rings.length===7)this.state.finalReturnPending=true;this.save();this.updateHUD();this.audio.play("success");this.ui.toast(this.state.rings.length===7?"7 / 7 · RETURN TO SATURN":`RING RECOVERED · ${this.state.rings.length} / 7`);if(this.state.rings.length===7)this.beginFinalReturn();
    }else if(animation.type==="tool"){
      const step=this.world.steps.find(step=>step.key===animation.key),workflow=step&&TOOL_WORKFLOWS[step.tool];if(!step||!workflow){this.cinematic=null;this.paused=false;this.camera.zoom=1;return}for(const phase of workflow.phases)if(animation.time>=phase.at*animation.duration&&!animation.playedPhases.includes(phase.id)){animation.playedPhases.push(phase.id);animation.phase=phase.id;if(phase.sound)this.audio.playToolPhase?.(phase.sound);if(phase.sound==="impact")this.camera.shake=3}this.camera.zoom=lerp(this.camera.zoom,1.1,1-Math.pow(.08,dt));if(animation.time<animation.duration)return;const science=TASK_SCIENCE[animation.key];this.cinematic=null;this.camera.zoom=1;if(!science||!this.missions.completeStep(animation.key)){this.paused=false;return}this.ui.toolResult(step,science);this.updateHUD();
    }else if(animation.type==="return")this.updateFinalReturn(animation,dt);
    else if(animation.type==="finale"){this.camera.zoom=lerp(1,.55,clamp(animation.time/1.8,0,1));if(animation.time>=4){this.cinematic=null;this.camera.zoom=1;this.finish()}}
    else if(animation.time>=3.8){this.cinematic=null;this.restorationReady=true;this.ui.locked=false;this.finalDialogueIndex=0;this.ui.saturnFinal()}
  }
  beginFinalReturn(){if(this.state.rings.length!==7||this.state.complete||this.cinematic)return;this.state.finalReturnPending=true;this.waypoint="saturn";this.paused=true;this.clearInput();this.cinematic={type:"return",phase:"celebrate",time:0,origin:this.state.location};this.save()}
  updateFinalReturn(animation,dt){
    if(animation.phase==="celebrate"&&animation.time>=2){const origin=animation.origin;this.cinematic=null;this.departure=origin;this.enterSpace(true);const target=this.world.planetNodes.find(node=>node.id==="saturn");if(!target)return;Object.assign(animation,{phase:"flight",time:0,startX:this.player.x,startY:this.player.y,targetX:target.x,targetY:target.y});this.cinematic=animation;this.waypoint="saturn";this.paused=true;this.clearInput();this.save();this.ui.toast("AUTOPILOT · RETURNING TO SATURN");return}
    if(animation.phase!=="flight")return;const duration=5.5,progress=clamp(animation.time/duration,0,1),ease=progress*progress*(3-2*progress),dx=animation.targetX-animation.startX,dy=animation.targetY-animation.startY,distance=Math.hypot(dx,dy)||1,arc=Math.sin(progress*Math.PI)*Math.min(210,distance*.22),previousX=this.player.x,previousY=this.player.y;this.player.x=lerp(animation.startX,animation.targetX,ease)-dy/distance*arc;this.player.y=lerp(animation.startY,animation.targetY,ease)+dx/distance*arc;this.player.vx=(this.player.x-previousX)/Math.max(dt,.001);this.player.vy=(this.player.y-previousY)/Math.max(dt,.001);const base=Math.min(this.viewWidth/this.world.width,this.viewHeight/this.world.height)*.92,approach=clamp((progress-.55)/.45,0,1),zoomEase=approach*approach*(3-2*approach);this.camera.zoom=lerp(base,.68,zoomEase);this.camera.follow(this.player,this.viewWidth,this.viewHeight,this.world.width,this.world.height,dt);if(progress<1)return;this.cinematic=null;this.state.finalReturnPending=false;this.enterPlanet("saturn",true);Object.assign(this.player,{x:this.world.ship.x,y:this.world.ship.y,vx:0,vy:0});this.save();this.restoreSaturn()
  }
  advanceSaturnFinal(length){if(!this.restorationReady||this.state.location!=="saturn")return;if((this.finalDialogueIndex||0)<length-1){this.finalDialogueIndex=(this.finalDialogueIndex||0)+1;this.ui.saturnFinal();return}this.finaleWorld=new World("space");this.cinematic={type:"finale",time:0};this.ui.close();this.paused=true}
  observeNearby(){
    if(!this.world)return;const id=this.state.location,observation=this.world.observation;
    if(!observation||Math.hypot(this.player.x-observation.x,this.player.y-observation.y)>=180||Math.hypot(this.player.x-this.world.ship.x,this.player.y-this.world.ship.y)<=260)return;
    let changed=false;if(!this.state.observations.includes(id)){this.state.observations.push(id);changed=true}
    if(!this.state.discoveries.includes(id)){this.state.discoveries.push(id);this.discoveryMoment={id,time:0};this.audio.play("success");this.ui.toast(`PLANET DISCOVERED · ${PLANETS[id].en}`);changed=true}
    if(changed)this.save();
  }
  warn(message){const banner=$("#warning-banner");banner.textContent=message;banner.classList.toggle("show",Boolean(message))}
  missionStatus(){
    if(!this.planet)return{code:"MISSION READY",text:"استكشف الكواكب وأعِد حلقات زحل السبع",progress:0};
    if(this.state.location==="space")return{code:this.state.rings.length===7?"RETURN TO SATURN":this.state.clues.includes("moon")&&!this.state.rings.includes("mars")?"FOLLOW THE RING → MARS":"FREE FLIGHT",text:this.state.rings.length===7?"المركبة عائدة إلى زحل":this.waypoint?`الوجهة: ${PLANETS[this.waypoint].name}`:"اختر مسارك بين الكواكب",progress:this.exploredPlanets()/8*100};
    const id=this.state.location,item=ITEMS[this.planet.tool];
    if(id==="saturn"&&this.state.rings.length===7)return{code:"FINAL APPROACH",text:"عد إلى المركبة لإعادة الحلقات",progress:100};
    if(!this.state.observations.includes(id))return{code:"EXPLORE",text:"ابتعد عن المركبة وابحث عن أثر غريب",progress:5};
    if(!this.state.conversations.includes(id))return{code:"CONTACT",text:`اقترب من إشارة ${this.planet.name} وتحدث بالزر E`,progress:15};
    const step=this.missions.remaining()[0];if(step&&!this.inventory.owned(step.tool))return{code:"EQUIPMENT",text:`اعثر على ${ITEMS[step.tool].name}`,progress:10};
    if(step)return{code:MISSIONS[id].title,text:`${step.label} · ${ITEMS[step.tool].name}`,progress:30};
    if(id==="moon"&&!this.state.rings.includes("mars"))return{code:"FOLLOW THE RING → MARS",text:"شوهدت الحلقة باتجاه المريخ. المركبة جاهزة عندما تختار الرحيل",progress:100};
    if(this.state.explored.includes(id))return{code:"EXPLORED",text:this.state.rings.length===7?"الحلقات السبع معك: الوجهة زحل":"المركبة جاهزة للإقلاع",progress:100};
    return{code:"RING SEARCH",text:"تابع البحث في الشرق عن الحلقة",progress:85};
  }
  updateHUD(){
    const planet=this.planet,status=this.missionStatus();
    $("#rings-stat").textContent=`${this.state.rings.length}/7`;$("#planets-stat").textContent=`${this.exploredPlanets()}/8`;$("#tools-stat").textContent=`${this.state.inventory.length} / 6`;
    $("#location-readout").textContent=planet?planet.en:"ORBITAL BASE";$("#gravity-readout").textContent=planet?.mode==="space"?"FLIGHT ASSIST ON":`GRAVITY: ${Math.round((planet?.gravity||0)*100)}% EARTH`;
    $("#mode-readout").textContent=this.environmentMode();
    $("#objective-code").textContent=status.code;$("#objective-text").textContent=status.text;$("#objective-progress i").style.width=`${status.progress}%`;
    $("#mission-clock").textContent=[Math.floor(this.state.elapsed/3600),Math.floor(this.state.elapsed%3600/60),Math.floor(this.state.elapsed%60)].map(value=>String(value).padStart(2,"0")).join(":");
    if($("#equipped-readout"))$("#equipped-readout").textContent=`${ITEMS[this.state.equipped].icon} ${ITEMS[this.state.equipped].name}`;
  }
  environmentMode(){return this.planet?.mode==="space"?"SPACECRAFT":this.planet?.mode==="orbit"?"ATMOSPHERIC ORBIT":this.state.location==="earth"?(this.player?.submerged?"UNDERWATER DIVE":this.player?.swimming?"COAST SWIM":"COAST EVA"):"SURFACE EVA"}
  exploredPlanets(){return this.state.explored.filter(id=>ORDER.includes(id)).length}
  inventoryWeight(){return this.state.inventory.reduce((total,id)=>total+(ITEMS[id]?.weight||0),0)}
  save(){if(this.world&&this.state.location!=="base")this.state.positions[this.state.location]={x:this.player.x,y:this.player.y};const saved=SaveManager.save(this.state);if(!saved&&!this.saveWarning){this.saveWarning=true;this.ui.toast("LOCAL SAVE UNAVAILABLE")}return saved}
  resetMission(skipConfirm=false){if(!skipConfirm&&!confirm("START A NEW MISSION AND RESET CURRENT PROGRESS?"))return;if(!SaveManager.reset()){this.ui.toast("LOCAL STORAGE UNAVAILABLE");return}clearTimeout(this.transitionTimer);this.audio.stop();this.ui.locked=false;this.ui.close();this.state=SaveManager.defaults();this.world=null;this.planet=null;this.cinematic=null;this.dialogue=null;this.restorationReady=false;this.finalDialogueIndex=0;this.restore()}
  home(){this.ui.locked=false;this.ui.close();this.restore()}
  restoreSaturn(){if(this.state.location!=="saturn"||this.state.rings.length!==7||this.cinematic||Math.hypot(this.player.x-this.world.ship.x,this.player.y-this.world.ship.y)>=165)return;this.audio.play("ring");this.ui.open(`<div class="saturn-restoration"><small>FINAL ORBIT · 7 / 7</small><div class="restoration-system"><span class="restoration-planet"></span>${Array.from({length:7},(_,index)=>`<i style="--ring-index:${index}"></i>`).join("")}</div><h2>الحلقات تعود إلى زحل!</h2></div>`);this.ui.locked=true;this.cinematic={type:"restoration",time:0};this.paused=true;this.clearInput()}
  finish(){if(!this.restorationReady||this.state.complete||this.state.rings.length!==7||this.state.location!=="saturn")return;this.state.complete=true;if(!this.state.explored.includes("saturn"))this.state.explored.push("saturn");this.save();this.audio.play("success");this.ui.close();this.showScreen("final")}
  updateFinal(){const values={"final-rings":`${this.state.rings.length} / 7`,"final-tools":new Set([...this.state.inventory,...this.state.locker]).size,"final-planets":`${this.exploredPlanets()} / 8`,"final-knowledge":this.state.knowledge};for(const [id,value] of Object.entries(values))if($(`#${id}`))$(`#${id}`).textContent=value}
}

window.game=new Game();
