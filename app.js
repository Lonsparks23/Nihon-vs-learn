
let kanaData = {
    hiragana:[
        {kana:'あ', romaji:'a', word:'あめ', translation:'pluie'},
        {kana:'か', romaji:'ka', word:'かさ', translation:'parapluie'},
        {kana:'きゃ', romaji:'kya', word:'きゃく', translation:'client'},
        {kana:'が', romaji:'ga', word:'がくせい', translation:'étudiant'}
    ],
    katakana:[
        {kana:'ア', romaji:'a', word:'アイス', translation:'glace'},
        {kana:'カ', romaji:'ka', word:'カメラ', translation:'appareil photo'},
        {kana:'キャ', romaji:'kya', word:'キャベツ', translation:'chou'},
        {kana:'ガ', romaji:'ga', word:'ゲーム', translation:'jeu'}
    ]
};

let score = 0;
let timer = 60;
let currentKana;
let gameInterval;

function startGame(mode){
    document.getElementById('mode-select').style.display='none';
    document.getElementById('game').style.display='block';
    score = 0;
    document.getElementById('score').textContent = score;
    timer = 60;
    document.getElementById('timer').textContent = timer;
    gameInterval = setInterval(()=>{
        timer--;
        document.getElementById('timer').textContent = timer;
        if(timer<=0){
            clearInterval(gameInterval);
            alert('Temps écoulé! Score: '+score);
            location.reload();
        }
    },1000);
    nextKana(mode);
}

function nextKana(mode){
    let data = kanaData[mode];
    currentKana = data[Math.floor(Math.random()*data.length)];
    document.getElementById('kana-display').textContent = currentKana.kana;
    // choix aléatoire
    let wrong = data[Math.floor(Math.random()*data.length)];
    while(wrong.kana===currentKana.kana){
        wrong = data[Math.floor(Math.random()*data.length)];
    }
    let choices = [currentKana, wrong];
    choices.sort(()=>Math.random()-0.5);
    let choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML='';
    choices.forEach(c=>{
        let btn = document.createElement('button');
        btn.textContent = c.romaji;
        btn.onclick = ()=>{
            if(c===currentKana) score++;
            document.getElementById('score').textContent=score;
            document.getElementById('example-word').textContent = 
                `Exemple : ${currentKana.word} (${currentKana.romaji}) - ${currentKana.translation}`;
            nextKana(mode);
        }
        choicesDiv.appendChild(btn);
    });
}
