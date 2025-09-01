
// Kana Duel — full pack (hiragana + katakana + dakuten/handakuten + combos + examples)

const HIRAGANA = [
  ['あ','a','あお','ao','bleu'],['い','i','いえ','ie','maison'],['う','u','うみ','umi','mer'],['え','e','えき','eki','gare'],['お','o','おかね','okane','argent'],
  ['か','ka','かさ','kasa','parapluie'],['き','ki','き','ki','(ki) arbre'],['く','ku','くるま','kuruma','voiture'],['け','ke','けし','keshi','gomme'],['こ','ko','こども','kodomo','enfant'],
  ['さ','sa','さかな','sakana','poisson'],['し','shi','しろ','shiro','blanc'],['す','su','すし','sushi','sushi'],['せ','se','せかい','sekai','monde'],['そ','so','そら','sora','ciel'],
  ['た','ta','たまご','tamago','œuf'],['ち','chi','ちいさい','chiisai','petit'],['つ','tsu','つき','tsuki','lune'],['て','te','てがみ','tegami','lettre'],['と','to','とり','tori','oiseau'],
  ['な','na','なつ','natsu','été'],['に','ni','にほん','nihon','Japon'],['ぬ','nu','ぬま','numa','marais'],['ね','ne','ねこ','neko','chat'],['の','no','のり','nori','algue'],
  ['は','ha','はな','hana','fleur'],['ひ','hi','ひと','hito','personne'],['ふ','fu','ふね','fune','bateau'],['へ','he','へや','heya','pièce'],['ほ','ho','ほん','hon','livre'],
  ['ま','ma','まど','mado','fenêtre'],['み','mi','みず','mizu','eau'],['む','mu','むし','mushi','insecte'],['め','me','めがね','megane','lunettes'],['も','mo','もり','mori','forêt'],
  ['や','ya','やま','yama','montagne'],['ゆ','yu','ゆき','yuki','neige'],['よ','yo','よる','yoru','nuit'],
  ['ら','ra','らいおん','raion','lion'],['り','ri','りんご','ringo','pomme'],['る','ru','るす','rusu','absence'],['れ','re','れいぞうこ','reizouko','frigo'],['ろ','ro','ろうそく','rousoku','bougie'],
  ['わ','wa','わに','wani','crocodile'],['を','o','をかし','okashi','drôle (archaïque)'],['ん','n','ねん','nen','année']
];
const HIRAGANA_DAKU = [
  ['が','ga','がっこう','gakkou','école'],['ぎ','gi','ぎんこう','ginkou','banque'],['ぐ','gu','ぐんたい','guntai','armée'],['げ','ge','げんき','genki','en forme'],['ご','go','ごはん','gohan','repas'],
  ['ざ','za','ざっし','zasshi','magazine'],['じ','ji','じかん','jikan','temps'],['ず','zu','ずし','zushi','sushi (var)'],['ぜ','ze','ぜんぶ','zenbu','tout'],['ぞ','zo','ぞう','zou','éléphant'],
  ['だ','da','だれ','dare','qui'],['ぢ','ji','ぢから','jikara','force (rare)'],['づ','zu','づけ','zuke','mariné (suffixe, rare)'],['で','de','でんしゃ','densha','train'],['ど','do','どようび','doyoubi','samedi'],
  ['ば','ba','ばら','bara','rose'],['び','bi','びょういん','byouin','hôpital'],['ぶ','bu','ぶた','buta','cochon'],['べ','be','べんとう','bentou','bento'],['ぼ','bo','ぼうし','boushi','chapeau']
];
const HIRAGANA_HANDA = [
  ['ぱ','pa','ぱん','pan','pain'],['ぴ','pi','ぴあの','piano','piano'],['ぷ','pu','ぷーる','puuru','piscine'],['ぺ','pe','ぺん','pen','stylo'],['ぽ','po','ぽすと','posuto','boîte aux lettres']
];
const HIRAGANA_COMBO = [
  ['きゃ','kya','きゃく','kyaku','client'],['きゅ','kyu','きゅうり','kyuuri','concombre'],['きょ','kyo','きょう','kyou','aujourd\'hui'],
  ['ぎゃ','gya','ぎゃく','gyaku','inverse'],['ぎゅ','gyu','ぎゅうにゅう','gyuunyuu','lait'],['ぎょ','gyo','ぎょかい','gyokai','industrie du poisson'],
  ['しゃ','sha','しゃしん','shashin','photo'],['しゅ','shu','しゅくだい','shukudai','devoirs'],['しょ','sho','しょくどう','shokudou','cantine'],
  ['じゃ','ja','じゃがいも','jagaimo','pomme de terre'],['じゅ','ju','じゅう','juu','dix'],['じょ','jo','じょせい','josei','femme'],
  ['ちゃ','cha','ちゃわん','chawan','bol'],['ちゅ','chu','ちゅうがっこう','chuugakkou','collège'],['ちょ','cho','ちょきん','chokin','épargne'],
  ['にゃ','nya','にゃんこ','nyanko','chaton'],['にゅ','nyu','にゅうがく','nyuugaku','entrée à l\'école'],['にょ','nyo','にょうぼう','nyoubou','épouse (archaïque)'],
  ['ひゃ','hya','ひゃく','hyaku','cent'],['ひゅ','hyu','ひゅうが','hyuuga','nom propre'],['ひょ','hyo','ひょう','hyou','tableau'],
  ['びゃ','bya','びゃく','byaku','cent (var)'],['びゅ','byu','びゅう','byuu','courant'],['びょ','byo','びょいん','byoin','hôpital'],
  ['ぴゃ','pya','ぴゃく','pyaku','cent (son)'],['ぴゅ','pyu','ぴゅう','pyuu','onomatopée'],['ぴょ','pyo','ぴょん','pyon','saut'],
  ['みゃ','mya','みゃく','myaku','pouls'],['みゅ','myu','みゅう','myuu','son'],['みょ','myo','みょん','myon','onomatopée'],
  ['りゃ','rya','りゃく','ryaku','abréviation'],['りゅ','ryu','りゅう','ryuu','dragon'],['りょ','ryo','りょこう','ryokou','voyage']
];
const KATAKANA = [
  ['ア','a','アイス','aisu','glace'],['イ','i','イヌ','inu','chien'],['ウ','u','ウミ','umi','mer'],['エ','e','エア','ea','air'],['オ','o','オト','oto','son'],
  ['カ','ka','カメラ','kamera','appareil photo'],['キ','ki','キ','ki','(ki)'],['ク','ku','クツ','kutsu','chaussures'],['ケ','ke','ケーキ','keeki','gâteau'],['コ','ko','コーラ','koora','cola'],
  ['サ','sa','サラダ','sarada','salade'],['シ','shi','シカ','shika','cerf'],['ス','su','スープ','suupu','soupe'],['セ','se','セーター','seetaa','pull'],['ソ','so','ソファ','sofa','canapé'],
  ['タ','ta','タクシー','takushii','taxi'],['チ','chi','チーズ','chiizu','fromage'],['ツ','tsu','ツナ','tsuna','thon'],['テ','te','テーブル','teeburu','table'],['ト','to','トマト','tomato','tomate'],
  ['ナ','na','ナイフ','naifu','couteau'],['ニ','ni','ニンジン','ninjin','carotte'],['ヌ','nu','ヌードル','nuudoru','nouille'],['ネ','ne','ネコ','neko','chat'],['ノ','no','ノート','nooto','carnet'],
  ['ハ','ha','ハサミ','hasami','ciseaux'],['ヒ','hi','ヒト','hito','personne'],['フ','fu','フルーツ','furuutsu','fruits'],['ヘ','he','ヘア','hea','cheveux'],['ホ','ho','ホット','hotto','chaud'],
  ['マ','ma','マスク','masuku','masque'],['ミ','mi','ミルク','miruku','lait'],['ム','mu','ムービー','muubii','film'],['メ','me','メモ','memo','note'],['モ','mo','モーター','mootaa','moteur'],
  ['ヤ','ya','ヤク','yaku','médicament'],['ユ','yu','ユニット','yunitto','unité'],['ヨ','yo','ヨーグルト','yooguruto','yaourt'],
  ['ラ','ra','ラジオ','rajio','radio'],['リ','ri','リング','ringu','anneau'],['ル','ru','ルール','ruuru','règle'],['レ','re','レストラン','resutoran','restaurant'],['ロ','ro','ロボット','robotto','robot'],
  ['ワ','wa','ワイン','wain','vin'],['ヲ','o','ヲタ','ota','otaku'],['ン','n','ンゴ','ngo','onomatopée']
];
const KATAKANA_DAKU = [
  ['ガ','ga','ガソリン','gasorin','essence'],['ギ','gi','ギター','gitaa','guitare'],['グ','gu','グラス','gurasu','verre'],['ゲ','ge','ゲート','geeto','porte'],['ゴ','go','ゴミ','gomi','ordures'],
  ['ザ','za','ザリガニ','zarigani','écrevisse'],['ジ','ji','ジム','jimu','salle de sport'],['ズ','zu','ズボン','zubon','pantalon'],['ゼ','ze','ゼロ','zero','zéro'],['ゾ','zo','ゾウ','zou','éléphant'],
  ['ダ','da','ダンス','dansu','danse'],['ヂ','ji','ヂェット','djetto','jet (rare)'],['ヅ','zu','ヅケ','dzuke','mariné (rare)'],['デ','de','デパート','depaato','grand magasin'],['ド','do','ドア','doa','porte'],
  ['バ','ba','バス','basu','bus'],['ビ','bi','ビール','biiru','bière'],['ブ','bu','ブーツ','buutsu','bottes'],['ベ','be','ベッド','beddo','lit'],['ボ','bo','ボタン','botan','bouton']
];
const KATAKANA_HANDA = [
  ['パ','pa','パーティー','paatii','fête'],['ピ','pi','ピザ','piza','pizza'],['プ','pu','プール','puuru','piscine'],['ペ','pe','ペン','pen','stylo'],['ポ','po','ポスト','posuto','boîte']
];
const KATAKANA_COMBO = [
  ['キャ','kya','キャット','kyatto','chat'],['キュ','kyu','キュウリ','kyuuri','concombre'],['キョ','kyo','キョウ','kyou','aujourd\'hui'],
  ['ギャ','gya','ギャラリー','gyararii','galerie'],['ギュ','gyu','ギュウニュウ','gyuunyuu','lait'],['ギョ','gyo','ギョウザ','gyouza','gyoza'],
  ['シャ','sha','シャツ','shatsu','chemise'],['シュ','shu','シュート','shuuto','tir'],['ショ','sho','ショッピング','shoppingu','shopping'],
  ['ジャ','ja','ジャム','jamu','confiture'],['ジュ','ju','ジュース','juusu','jus'],['ジョ','jo','ジョギング','jogingu','jogging'],
  ['チャ','cha','チャーハン','chaahan','riz sauté'],['チュ','chu','チューブ','chuubu','tube'],['チョ','cho','チョコ','choko','chocolat'],
  ['ニャ','nya','ニャー','nyaa','onomatopée'],['ニュ','nyu','ニュース','nyuusu','nouvelles'],['ニョ','nyo','ニョロ','nyoro','onomatopée'],
  ['ヒャ','hya','ヒャク','hyaku','cent'],['ヒュ','hyu','ヒューマン','hyuuman','humain'],['ヒョ','hyo','ヒョウ','hyou','tableau'],
  ['ビャ','bya','ビャク','byaku','cent (var)'],['ビュ','byu','ビューティー','byuutii','beauté'],['ビョ','byo','ビョウイン','byouin','hôpital'],
  ['ピャ','pya','ピャット','pyatto','onomatopée'],['ピュ','pyu','ピュア','pyua','pur'],['ピョ','pyo','ピョン','pyon','saut'],
  ['ミャ','mya','ミャク','myaku','pouls'],['ミュ','myu','ミュージック','myuujikku','musique'],['ミョ','myo','ミョウ','myou','nom propre'],
  ['リャ','rya','リャリョ','ryaryo','(ex)'],['リュ','ryu','リュウ','ryuu','dragon'],['リョ','ryo','リョコウ','ryokou','voyage']
];

const LOOK_ALIKE = new Map([
  ['さ','ち'],['ち','さ'],['そ','ん'],['ん','そ'],['シ','ツ'],['ツ','シ'],['ソ','ン'],['ン','ソ'],['ラ','フ'],['フ','ラ'],
  ['ク','ケ'],['ケ','ク'],['リ','ン'],['ン','リ'],['ス','ヌ'],['ヌ','ス'],['シ','ン'],['ン','シ'],['タ','ナ'],['ナ','タ']
]);

const $ = q => document.querySelector(q);
const kanaEl = $('#kana'), exampleEl = $('#example');
const choiceA = $('#choiceA'), choiceB = $('#choiceB');
const scoreEl = $('#score'), streakEl = $('#streak'), bestEl = $('#best'), timerEl = $('#timer');
const gameEl = $('#game'), modeSelectEl = $('#mode-select'), resultsEl = $('#results');
const summaryEl = $('#summary'), historyEl = $('#history');
const againBtn = $('#again'), backBtn = $('#back'), skipBtn = $('#skip'), endBtn = $('#end'), exportLink = $('#export');
const modal = $('#modal');
$('#howto').addEventListener('click', () => modal.showModal());
$('#close-modal').addEventListener('click', () => modal.close());
const themeBtn = $('#toggle-theme'), soundBtn = $('#toggle-sound');
let soundOn = true;
soundBtn.addEventListener('click', () => { soundOn = !soundOn; soundBtn.textContent = soundOn ? '🔊' : '🔇'; ding(660,0.04); });
if(localStorage.getItem('kana_theme') === 'light') document.body.classList.add('light');
themeBtn.addEventListener('click', () => { document.body.classList.toggle('light'); localStorage.setItem('kana_theme', document.body.classList.contains('light') ? 'light' : 'dark'); });
let MODE = 'hiragana';
let withTimer = false, hardMode = false;
let pool = [], current = null, score = 0, streak = 0, best = Number(localStorage.getItem('kana_best')||0);
let history = [], countdown = null;
function withExamples(set){ return set.map(item => ({k:item[0], r:item[1], word:item[2], wordR:item[3], wordFR:item[4]})); }
function buildPool(mode){
  let out = [];
  if(mode === 'hiragana') out = out.concat(withExamples(HIRAGANA), withExamples(HIRAGANA_DAKU), withExamples(HIRAGANA_HANDA), withExamples(HIRAGANA_COMBO));
  else if(mode === 'katakana') out = out.concat(withExamples(KATAKANA), withExamples(KATAKANA_DAKU), withExamples(KATAKANA_HANDA), withExamples(KATAKANA_COMBO));
  else out = out.concat(withExamples(HIRAGANA), withExamples(HIRAGANA_DAKU), withExamples(HIRAGANA_HANDA), withExamples(HIRAGANA_COMBO),
                        withExamples(KATAKANA), withExamples(KATAKANA_DAKU), withExamples(KATAKANA_HANDA), withExamples(KATAKANA_COMBO));
  return out;
}
document.querySelectorAll('.mode-select .pill').forEach(btn => { btn.addEventListener('click', e=> start(e.currentTarget.dataset.mode)); });
$('#opt-timer').addEventListener('change', e => withTimer = e.target.checked);
$('#opt-hard').addEventListener('change', e => hardMode = e.target.checked);
function start(mode){
  MODE = mode;
  pool = buildPool(mode);
  score = 0; streak = 0; history = [];
  scoreEl.textContent = '0'; streakEl.textContent = '0'; bestEl.textContent = String(best);
  timerEl.textContent = withTimer ? '60' : '∞';
  modeSelectEl.classList.add('hide');
  resultsEl.classList.add('hide');
  gameEl.classList.remove('hide');
  next();
  if(withTimer){
    if(countdown) clearInterval(countdown);
    let remain = 60; const t0 = Date.now();
    countdown = setInterval(()=>{
      const left = Math.max(0, remain - Math.floor((Date.now()-t0)/1000));
      timerEl.textContent = String(left);
      if(left<=0){ clearInterval(countdown); finish(); }
    },200);
  }
}
function pickWrong(item){
  if(hardMode && LOOK_ALIKE.has(item.k)){
    const trap = LOOK_ALIKE.get(item.k);
    const found = pool.find(p => p.k === trap);
    if(found) return found.r;
  }
  const vowel = item.r.slice(-1);
  let candidates = pool.filter(x => x.r !== item.r && (x.r.endsWith(vowel) || x.r[0] === item.r[0]));
  if(candidates.length === 0) candidates = pool.filter(x => x.r !== item.r);
  return candidates[Math.floor(Math.random()*candidates.length)].r;
}
function makeQuestion(){
  const item = pool[Math.floor(Math.random()*pool.length)];
  const wrong = pickWrong(item);
  const choices = Math.random() < 0.5 ? [item.r, wrong] : [wrong, item.r];
  return {kana:item.k, answer:item.r, choices, example:{word:item.word, wordR:item.wordR, wordFR:item.wordFR}};
}
function next(){
  current = makeQuestion();
  kanaEl.textContent = current.kana;
  exampleEl.textContent = '';
  choiceA.textContent = current.choices[0];
  choiceB.textContent = current.choices[1];
  [choiceA, choiceB].forEach(b => b.classList.remove('correct','wrong'));
}
function handleChoice(which){
  const btn = which === 'A' ? choiceA : choiceB;
  const val = btn.textContent;
  const correct = val === current.answer;
  const other = which === 'A' ? choiceB : choiceA;

  if(correct){
    score++; streak++;
    visualBurst('ok');
    if(soundOn) ding(880,.05);
    btn.classList.add('correct');
  } else {
    streak = 0;
    visualBurst('no');
    if(soundOn) buzz();
    btn.classList.add('wrong');
    other.classList.add('correct');
  }

  scoreEl.textContent = String(score);
  streakEl.textContent = String(streak);

  history.push({
    kana: current.kana,
    answer: current.answer,
    picked: val,
    ok: correct,
    example: current.example
  });

  // 👉 Affiche l'exemple immédiatement
  exampleEl.innerHTML = current.example.word
    ? `<strong>${current.example.word}</strong> — ${current.example.wordR} : ${current.example.wordFR}`
    : '';

  // 👉 Attend 2 secondes avant d'afficher la suite
  setTimeout(next, 2000);
}
choiceA.addEventListener('click', ()=> handleChoice('A'));
choiceB.addEventListener('click', ()=> handleChoice('B'));
skipBtn.addEventListener('click', ()=> { streak = 0; streakEl.textContent = '0'; next(); if(soundOn) ding(520,.03); });
endBtn.addEventListener('click', finish);
againBtn.addEventListener('click', ()=> start(MODE));
backBtn.addEventListener('click', ()=> { resultsEl.classList.add('hide'); modeSelectEl.classList.remove('hide'); });
function finish(){
  gameEl.classList.add('hide'); resultsEl.classList.remove('hide');
  const corrects = history.filter(h=>h.ok).length;
  const rate = history.length ? Math.round(corrects*100/history.length) : 0;
  summaryEl.textContent = `Score ${score} — ${rate}% de bonnes réponses (${corrects}/${history.length}).`;
  if(score>best){ best=score; localStorage.setItem('kana_best',String(best)); }
  bestEl.textContent = String(best);
  historyEl.innerHTML='';
  history.slice(-24).reverse().forEach(h=>{
    const div = document.createElement('div'); div.className='hitem';
    div.innerHTML = `<div class="big">${h.kana}</div><div class="small">${h.ok ? '✓' : '✕'} ${h.picked} ${h.ok ? '' : `→ ${h.answer}`}<br><em>${h.example.word || ''}</em></div>`;
    historyEl.appendChild(div);
  });
}
exportLink.addEventListener('click', e=>{
  e.preventDefault();
  const blob = new Blob([JSON.stringify({mode:MODE,withTimer,hardMode,at:new Date().toISOString(),history},null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download='kana-duel-history.json'; a.click(); URL.revokeObjectURL(url);
});
const ctx = new (window.AudioContext||window.webkitAudioContext)();
function ding(freq=660,dur=0.06){ if(!soundOn) return; const o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine'; o.frequency.value=freq; g.gain.setValueAtTime(0.0001,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.2,ctx.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur+0.02); }
function buzz(){ if(!soundOn) return; const o=ctx.createOscillator(), g=ctx.createGain(); o.type='square'; o.frequency.value=110; g.gain.setValueAtTime(0.0001,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.3,ctx.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.12); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.14); }
const fx = document.getElementById('fx'); const ctx2 = fx.getContext('2d'); let particles=[];
function resizeCanvas(){ fx.width = window.innerWidth; fx.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas); resizeCanvas();
function visualBurst(kind='ok'){ const x = window.innerWidth/2, y = window.innerHeight*0.36, count = kind==='ok'?26:18; for(let i=0;i<count;i++){ particles.push({x,y,vx:(Math.random()*2-1)*(kind==='ok'?6:4),vy:(Math.random()*2-1)*(kind==='ok'?6:4),life:24+Math.random()*16,size:3+Math.random()*4}); } }
function tick(){ ctx2.clearRect(0,0,fx.width,fx.height); particles.forEach(p=>{ p.life-=1; p.x += p.vx; p.y += p.vy + 0.15; ctx2.globalAlpha = Math.max(0,p.life/40); ctx2.fillStyle = '#ffffff'; ctx2.fillRect(p.x,p.y,p.size,p.size); }); particles = particles.filter(p=>p.life>0); requestAnimationFrame(tick); }
tick();
window.addEventListener('keydown', e=>{ if(e.key==='1' || e.key.toLowerCase()==='a') choiceA.click(); if(e.key==='2' || e.key.toLowerCase()==='b') choiceB.click(); if(e.key===' ') skipBtn.click(); });
[choiceA,choiceB].forEach(btn=>{ btn.addEventListener('touchstart', ()=> btn.classList.add('touchdown'), {passive:true}); btn.addEventListener('touchend', ()=> btn.classList.remove('touchdown'), {passive:true}); });
