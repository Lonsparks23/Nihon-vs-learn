// Kana Duel — app.js

// --- Kana data (basic gojuon, no dakuten/handakuten or combos) ---
const HIRAGANA = [
  ['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],
  ['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],
  ['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],
  ['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],
  ['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],
  ['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],
  ['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],
  ['や','ya'],['ゆ','yu'],['よ','yo'],
  ['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],
  ['わ','wa'],['を','o'],['ん','n']
];
const KATAKANA = [
  ['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o'],
  ['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko'],
  ['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so'],
  ['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to'],
  ['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no'],
  ['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho'],
  ['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo'],
  ['ヤ','ya'],['ユ','yu'],['ヨ','yo'],
  ['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro'],
  ['ワ','wa'],['ヲ','o'],['ン','n']
];

// Look-alike traps to increase difficulty
const LOOK_ALIKE = new Map([
  ['さ','ち'], ['ち','さ'],
  ['そ','ん'], ['ん','そ'],
  ['シ','ツ'], ['ツ','シ'],
  ['ソ','ン'], ['ン','ソ'],
  ['ラ','フ'], ['フ','ラ'],
  ['ク','ケ'], ['ケ','ク'],
  ['リ','ン'], ['ン','リ'],
  ['ス','ヌ'], ['ヌ','ス'],
  ['シ','ン'], ['ン','シ'],
  ['タ','ナ'], ['ナ','タ'],
  ['え','ろ'], ['ろ','え'],
]);

// --- DOM elements ---
const $ = (q) => document.querySelector(q);
const kanaEl = $('#kana');
const choiceA = $('#choiceA');
const choiceB = $('#choiceB');
const scoreEl = $('#score');
const streakEl = $('#streak');
const bestEl = $('#best');
const timerEl = $('#timer');
const gameEl = $('#game');
const modeSelectEl = $('#mode-select');
const resultsEl = $('#results');
const summaryEl = $('#summary');
const historyEl = $('#history');
const againBtn = $('#again');
const backBtn = $('#back');
const skipBtn = $('#skip');
const endBtn = $('#end');
const exportLink = $('#export');

const modal = $('#modal');
$('#howto').addEventListener('click', () => modal.showModal());
$('#close-modal').addEventListener('click', () => modal.close());

// Theme & sound toggles
const themeBtn = $('#toggle-theme');
const soundBtn = $('#toggle-sound');
let soundOn = true;
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? '🔊' : '🔇';
  ding(660, 0.04);
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('kana_theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// restore theme
if(localStorage.getItem('kana_theme') === 'light') document.body.classList.add('light');

// Game state
let MODE = 'hiragana'; // 'hiragana' | 'katakana' | 'mix'
let withTimer = false;
let hardMode = false;
let pool = [];
let current = null;
let score = 0;
let streak = 0;
let best = Number(localStorage.getItem('kana_best') || 0);
let t0 = 0;
let countdown = null;
let history = [];

bestEl.textContent = String(best);

// Mode selection
document.querySelectorAll('.mode-select .pill').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const mode = e.currentTarget.dataset.mode;
    start(mode);
  });
});
$('#opt-timer').addEventListener('change', e => withTimer = e.target.checked);
$('#opt-hard').addEventListener('change', e => hardMode = e.target.checked);

function start(mode){
  MODE = mode;
  pool = buildPool(mode);
  score = 0; streak = 0; history = [];
  scoreEl.textContent = '0';
  streakEl.textContent = '0';
  timerEl.textContent = withTimer ? '60' : '∞';
  bestEl.textContent = String(best);
  modeSelectEl.classList.add('hide');
  resultsEl.classList.add('hide');
  gameEl.classList.remove('hide');
  next();
  if(withTimer){
    if(countdown) clearInterval(countdown);
    let remain = 60;
    t0 = Date.now();
    countdown = setInterval(() => {
      const left = Math.max(0, remain - Math.floor((Date.now() - t0)/1000));
      timerEl.textContent = String(left);
      if(left <= 0){
        clearInterval(countdown);
        finish();
      }
    }, 200);
  }
}

function buildPool(mode){
  if(mode === 'hiragana') return HIRAGANA.map(([k,r]) => ({k,r,type:'hiragana'}));
  if(mode === 'katakana') return KATAKANA.map(([k,r]) => ({k,r,type:'katakana'}));
  // mix
  return [...HIRAGANA.map(([k,r])=>({k,r,type:'hiragana'})),
          ...KATAKANA.map(([k,r])=>({k,r,type:'katakana'}))];
}

// pick a kana and a plausible wrong answer
function makeQuestion(){
  const item = pool[Math.floor(Math.random()*pool.length)];
  // Wrong option strategy: either look-alike (hard mode) or random different romaji from same vowel group
  let wrongRomaji = null;
  if(hardMode && LOOK_ALIKE.has(item.k)){
    const trapKana = LOOK_ALIKE.get(item.k);
    // find romaji for trapKana in either set
    const set = item.type === 'hiragana' ? HIRAGANA : KATAKANA;
    const pair = set.find(([k,r]) => k === trapKana);
    wrongRomaji = pair ? pair[1] : null;
  }
  if(!wrongRomaji){
    const vowel = item.r.slice(-1); // a,i,u,e,o or n
    let candidates = pool.filter(x => x.r !== item.r && (x.r.endsWith(vowel) || x.r[0] === item.r[0]));
    if(candidates.length === 0) candidates = pool.filter(x => x.r !== item.r);
    wrongRomaji = candidates[Math.floor(Math.random()*candidates.length)].r;
  }
  // shuffle choices
  const choices = Math.random() < 0.5 ? [item.r, wrongRomaji] : [wrongRomaji, item.r];
  return {kana: item.k, answer: item.r, choices};
}

function next(){
  current = makeQuestion();
  kanaEl.textContent = current.kana;
  choiceA.textContent = current.choices[0];
  choiceB.textContent = current.choices[1];
  // reset styles
  [choiceA, choiceB].forEach(btn => btn.classList.remove('correct','wrong'));
}

function handleChoice(which){
  const btn = which === 'A' ? choiceA : choiceB;
  const val = btn.textContent;
  const correct = val === current.answer;
  const other = which === 'A' ? choiceB : choiceA;
  if(correct){
    score += 1;
    streak += 1;
    visualBurst('ok');
    if(soundOn) ding(880, .05);
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
  history.push({kana: current.kana, answer: current.answer, picked: val, ok: correct});
  // small delay before next
  setTimeout(next, 420);
}

choiceA.addEventListener('click', () => handleChoice('A'));
choiceB.addEventListener('click', () => handleChoice('B'));
skipBtn.addEventListener('click', () => { streak = 0; streakEl.textContent = '0'; next(); if(soundOn) ding(520,.03) });
endBtn.addEventListener('click', finish);
againBtn.addEventListener('click', () => start(MODE));
backBtn.addEventListener('click', () => {
  resultsEl.classList.add('hide');
  modeSelectEl.classList.remove('hide');
});

function finish(){
  gameEl.classList.add('hide');
  resultsEl.classList.remove('hide');
  const corrects = history.filter(h=>h.ok).length;
  const rate = history.length ? Math.round(corrects*100/history.length) : 0;
  summaryEl.textContent = `Score ${score} — ${rate}% de bonnes réponses (${corrects}/${history.length}).`;
  if(score > best){
    best = score;
    localStorage.setItem('kana_best', String(best));
  }
  bestEl.textContent = String(best);
  // render small history
  historyEl.innerHTML = '';
  history.slice(-24).reverse().forEach(h => {
    const div = document.createElement('div');
    div.className = 'hitem';
    div.innerHTML = `<div class="big">${h.kana}</div>
                     <div class="small">${h.ok ? '✓' : '✕'} ${h.picked} ${h.ok ? '' : `→ ${h.answer}`}</div>`;
    historyEl.appendChild(div);
  });
}

// export history
exportLink.addEventListener('click', (e) => {
  e.preventDefault();
  const blob = new Blob([JSON.stringify({mode: MODE, withTimer, hardMode, at: new Date().toISOString(), history}, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kana-duel-history.json';
  a.click();
  URL.revokeObjectURL(url);
});

// --- Tiny audio (WebAudio API) ---
const ctx = new (window.AudioContext || window.webkitAudioContext)();
function ding(freq=660, dur=0.06){
  if(!soundOn) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  o.connect(g).connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + dur + 0.02);
}
function buzz(){
  if(!soundOn) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'square';
  o.frequency.value = 110;
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  o.connect(g).connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime + 0.14);
}

// --- Simple confetti / burst ---
const fx = document.getElementById('fx');
const ctx2 = fx.getContext('2d');
let particles = [];
function resizeCanvas(){
  fx.width = window.innerWidth;
  fx.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function visualBurst(kind='ok'){
  const x = window.innerWidth/2;
  const y = window.innerHeight*0.36;
  const count = kind === 'ok' ? 26 : 18;
  for(let i=0;i<count;i++){
    particles.push({
      x, y,
      vx: (Math.random()*2-1)* (kind==='ok'? 6:4),
      vy: (Math.random()*2-1)* (kind==='ok'? 6:4),
      life: 24 + Math.random()*16,
      size: 3 + Math.random()*4
    });
  }
}

function tick(){
  ctx2.clearRect(0,0,fx.width,fx.height);
  particles.forEach(p => {
    p.life -= 1;
    p.x += p.vx;
    p.y += p.vy + 0.15; // gravity
    ctx2.globalAlpha = Math.max(0, p.life/40);
    ctx2.fillStyle = '#ffffff';
    ctx2.fillRect(p.x, p.y, p.size, p.size);
  });
  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(tick);
}
tick();

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if(e.key === '1' || e.key.toLowerCase() === 'a') choiceA.click();
  if(e.key === '2' || e.key.toLowerCase() === 'b') choiceB.click();
  if(e.key === ' ') skipBtn.click();
});

// Touch-friendly active feedback (iOS)
[choiceA, choiceB].forEach(btn => {
  btn.addEventListener('touchstart', () => btn.classList.add('touchdown'), {passive:true});
  btn.addEventListener('touchend', () => btn.classList.remove('touchdown'), {passive:true});
});
