// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
// ===================== DATA (present-based for all tenses) =====================
const PRESENT = {
  1: [
    { en: "I am Irish.", es: "Soy irlandés." },
    { en: "I am a student.", es: "Soy estudiante." },
    { en: "Where do you live?", es: "Dónde vives?" },
    { en: "I live in Dublin.", es: "Vivo en Dublín." },
    { en: "Where are you from?", es: "De dónde eres?" },
    { en: "I am from Ireland.", es: "Soy de Irlanda." },
    { en: "What is your name?", es: "Cómo te llamas?" },
    { en: "My name is Aoife.", es: "Me llamo Aoife." },
    { en: "Do you speak Spanish?", es: "Hablas español?" },
    { en: "I speak a little Spanish.", es: "Hablo un poco de español." },
    { en: "I don’t speak French.", es: "No hablo francés." },
    { en: "Do you have a pet?", es: "Tienes una mascota?" }
  ],
  2: [
    { en: "What time do you get up?", es: "A qué hora te levantas?" },
    { en: "I get up at seven.", es: "Me levanto a las siete." },
    { en: "Do you get up early?", es: "Te levantas temprano?" },
    { en: "I don’t get up late.", es: "No me levanto tarde." },
    { en: "I have a quick shower.", es: "Me ducho rápido." },
    { en: "Do you take a shower in the morning?", es: "Te duchas por la mañana?" },
    { en: "I brush my teeth.", es: "Me cepillo los dientes." },
    { en: "I don’t forget my uniform.", es: "No olvido mi uniforme." },
    { en: "Do you make your bed?", es: "Haces la cama?" },
    { en: "I get dressed quickly.", es: "Me visto rápidamente." },
    { en: "I prepare my school bag.", es: "Preparo mi mochila." }
  ],
  3: [
    { en: "What do you eat for breakfast?", es: "Qué desayunas?" },
    { en: "I eat cereal and fruit.", es: "Desayuno cereales y fruta." },
    { en: "Do you drink tea?", es: "Bebes té?" },
    { en: "I drink tea; I don’t drink coffee.", es: "Bebo té; no bebo café." },
    { en: "Do you eat with your family?", es: "Desayunas con tu familia?" },
    { en: "Sometimes I skip breakfast.", es: "A veces me salto el desayuno." },
    { en: "I set the table.", es: "Pongo la mesa." },
    { en: "Do you wash the dishes?", es: "Lavas los platos?" },
    { en: "I wash the dishes quickly.", es: "Lavo los platos rápidamente." },
    { en: "I leave the house at eight.", es: "Salgo de casa a las ocho." }
  ],
  4: [
    { en: "How do you go to school?", es: "Cómo vas al colegio?" },
    { en: "I go to school by bus.", es: "Voy al colegio en autobús." },
    { en: "Do you go by car?", es: "Vas en coche?" },
    { en: "I don’t go by train.", es: "No voy en tren." },
    { en: "I walk when it’s sunny.", es: "Camino cuando hace sol." },
    { en: "Do you listen to music on the way?", es: "Escuchas música por el camino?" },
    { en: "I chat with friends on the bus.", es: "Charlo con amigos en el autobús." },
    { en: "Do you use your phone on the way?", es: "Usas el móvil por el camino?" },
    { en: "I arrive at half eight.", es: "Llego a las ocho y media." },
    { en: "Sometimes I arrive late.", es: "A veces llego tarde." }
  ],
  5: [
    { en: "Do you study Spanish?", es: "Estudias español?" },
    { en: "I study six subjects.", es: "Estudio seis asignaturas." },
    { en: "Which subject do you prefer?", es: "Qué asignatura prefieres?" },
    { en: "I prefer English.", es: "Prefiero inglés." },
    { en: "I don’t like Maths.", es: "No me gustan las matemáticas." },
    { en: "Do you pay attention in class?", es: "Prestas atención en clase?" },
    { en: "I take notes in a notebook.", es: "Tomo apuntes en un cuaderno." },
    { en: "I ask questions when I don’t understand.", es: "Hago preguntas cuando no entiendo." },
    { en: "Do you use a laptop at school?", es: "Usas un portátil en el colegio?" },
    { en: "I work well in a team.", es: "Trabajo bien en equipo." }
  ],
  6: [
    { en: "Do you eat in the canteen?", es: "Comes en el comedor?" },
    { en: "I bring a packed lunch.", es: "Llevo un almuerzo de casa." },
    { en: "I don’t buy food at school.", es: "No compro comida en el colegio." },
    { en: "Do you eat fruit every day?", es: "Comes fruta todos los días?" },
    { en: "I drink water with lunch.", es: "Bebo agua con la comida." },
    { en: "I avoid junk food.", es: "Evito la comida basura." },
    { en: "Do you share snacks with friends?", es: "Compartes meriendas con amigos?" },
    { en: "I prefer a sandwich.", es: "Prefiero un bocadillo." },
    { en: "Do you have any allergies?", es: "Tienes alguna alergia?" },
    { en: "I finish lunch quickly.", es: "Termino de comer rápido." }
  ],
  7: [
    { en: "I do my homework in the evening.", es: "Hago los deberes por la tarde." },
    { en: "Do you study every day?", es: "Estudias todos los días?" },
    { en: "I study for two hours.", es: "Estudio durante dos horas." },
    { en: "I don’t procrastinate.", es: "No procrastino." },
    { en: "I revise for tests.", es: "Repaso para los exámenes." },
    { en: "Do you use online resources?", es: "Usas recursos en línea?" },
    { en: "I ask for help when I need it.", es: "Pido ayuda cuando la necesito." },
    { en: "I don’t copy homework.", es: "No copio los deberes." },
    { en: "Do you plan your week?", es: "Planificas tu semana?" },
    { en: "I take regular breaks.", es: "Hago descansos regulares." }
  ],
  8: [
    { en: "I help at home after school.", es: "Ayudo en casa después del colegio." },
    { en: "Do you set the table for dinner?", es: "Pones la mesa para la cena?" },
    { en: "I tidy my room on weekdays.", es: "Ordeno mi habitación entre semana." },
    { en: "Do you take out the rubbish?", es: "Sacas la basura?" },
    { en: "I look after my little brother.", es: "Cuido de mi hermano pequeño." },
    { en: "I don’t argue with my parents.", es: "No discuto con mis padres." },
    { en: "Do you water the plants?", es: "Riegas las plantas?" },
    { en: "I clean the bathroom at the weekend.", es: "Limpio el baño el fin de semana." },
    { en: "Do you iron your clothes?", es: "Planchas la ropa?" },
    { en: "I fold my clothes.", es: "Doblo mi ropa." }
  ],
  9: [
    { en: "I relax after dinner.", es: "Me relajo después de cenar." },
    { en: "Do you watch a series with your family?", es: "Ves una serie con tu familia?" },
    { en: "I don’t watch TV for many hours.", es: "No veo la tele muchas horas." },
    { en: "Do you read before bed?", es: "Lees antes de acostarte?" },
    { en: "I chat with friends online.", es: "Charlo con amigos en línea." },
    { en: "Do you play video games at night?", es: "Juegas a los videojuegos por la noche?" },
    { en: "I listen to music to relax.", es: "Escucho música para relajarme." },
    { en: "I don’t go out on school nights.", es: "No salgo entre semana." },
    { en: "Do you switch off your phone?", es: "Apagas el móvil?" },
    { en: "I prepare my uniform.", es: "Preparo mi uniforme." }
  ],
  10: [
    { en: "Do you set an alarm?", es: "Pones una alarma?" },
    { en: "I go to bed at half ten.", es: "Me acuesto a las diez y media." },
    { en: "Do you fall asleep quickly?", es: "Te duermes rápido?" },
    { en: "I need eight hours of sleep.", es: "Necesito ocho horas de sueño." },
    { en: "Do you follow a healthy routine?", es: "Sigues una rutina saludable?" },
    { en: "I balance school and hobbies.", es: "Equilibro el colegio y los pasatiempos." },
    { en: "I take care of my mental health.", es: "Cuido mi salud mental." },
    { en: "Do you manage your time well?", es: "Organizas bien tu tiempo?" },
    { en: "I try to improve every day.", es: "Intento mejorar cada día." },
    { en: "I don’t waste time at night.", es: "No pierdo el tiempo por la noche." }
  ]
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };
 
  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

// ===================== Compare =====================
const norm = s => (s || "").trim();
const endsWithQM = s => norm(s).endsWith("?");

// Accents REQUIRED; ñ ≡ n; case ignored; ignore punctuation like final . or leading ¿
function coreKeepAccents(s) {
  let t = norm(s);

  // Remove leading inverted question mark if user adds it
  if (t.startsWith("¿")) t = t.slice(1);

  // Remove ONLY a final ? or . if present
  if (t.endsWith("?") || t.endsWith(".")) {
    t = t.slice(0, -1);
  }

  // Treat ñ as n so both are accepted
  t = t.replace(/ñ/gi, "n");

  // Lowercase + collapse spaces
  return t.replace(/\s+/g, " ").toLowerCase();
}

// Require ? only if the expected Spanish is a question
function cmpAnswer(user, expected) {
  const expIsQ = endsWithQM(expected);
  if (expIsQ && !endsWithQM(user)) return false;
  return coreKeepAccents(user) === coreKeepAccents(expected);
}


  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input, onStatus, requireQM = false){
  const r = ensureRecognizer(); if(!r){ onStatus&&onStatus(false); return; }
  if(recActive){ try{ r.stop(); }catch{} recActive=false; onStatus&&onStatus(false); }
  try{
    r.onresult = e => {
      const txt = (e.results[0] && e.results[0][0] && e.results[0][0].transcript) || "";
      let v = txt.trim();
      // Only add ? if this item is actually a question
      if (requireQM && !v.endsWith("?")) v += "?";
      // If not a question and the recognizer adds punctuation, gently trim a trailing ?
      if (!requireQM && v.endsWith("?")) v = v.slice(0,-1);
      input.value = v;
      input.dispatchEvent(new Event("input", { bubbles:true }));
    };
    r.onend = ()=>{ recActive=false; onStatus&&onStatus(false); };
    recActive=true; onStatus&&onStatus(true); r.start();
  }catch{ onStatus&&onStatus(false); }
}

  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

 // ===================== REPLACE FROM HERE (startDictationFor + renderQuiz) =====================

function startDictationFor(input, onStatus, requireQM = false){
  const r = ensureRecognizer(); 
  if (!r){ onStatus && onStatus(false); return; }

  if (recActive){ 
    try { r.stop(); } catch{} 
    recActive = false; 
    onStatus && onStatus(false); 
  }

  try{
    r.onresult = e => {
      const txt = (e.results[0] && e.results[0][0] && e.results[0][0].transcript) || "";
      let v = txt.trim();

      // Only enforce ? for question items
      if (requireQM && !v.endsWith("?")) v += "?";
      if (!requireQM && v.endsWith("?")) v = v.slice(0, -1);

      input.value = v;
      input.dispatchEvent(new Event("input", { bubbles:true }));
    };
    r.onend = () => { recActive = false; onStatus && onStatus(false); };

    recActive = true; 
    onStatus && onStatus(true); 
    r.start();
  } catch {
    onStatus && onStatus(false);
  }
}

function renderQuiz(){
  const qwrap = $("#questions"); 
  if (!qwrap) return; 
  qwrap.innerHTML = "";

  quiz.forEach((q, i) => {
    const row = document.createElement("div"); 
    row.className = "q";

    const p = document.createElement("div"); 
    p.className = "prompt"; 
    p.textContent = `${i+1}. ${q.prompt}`;

    const controls = document.createElement("span");
    Object.assign(controls.style, { display:"inline-block", marginLeft:"6px", verticalAlign:"middle" });

    const enBtn = miniBtn("🔈 EN", "Read English prompt");
    enBtn.onclick = () => speak(q.prompt, "en-GB");

    const esBtn = miniBtn("🔊 ES", "Read Spanish target (uses 1 this attempt)");
    esBtn.setAttribute("data-role","es-tts");
    esBtn.onclick = () => { 
      if (attemptRemaining() <= 0){ 
        updateESButtonsState(qwrap); 
        return; 
      } 
      speak(q.answer, "es-ES"); 
      cheatsUsedThisRound += 1; 
      updateESButtonsState(qwrap); 
    };

    // Is this item a question? (expected Spanish ends with ?)
    const requiresQM = /\?\s*$/.test((q.answer || "").trim());

    const micBtn = miniBtn("🎤", "Dictate into this answer");
    micBtn.onclick = () => { 
      startDictationFor(
        input, 
        (on) => { 
          micBtn.style.borderColor = on ? "#f39c12" : "#ddd"; 
          micBtn.style.boxShadow   = on ? "0 0 0 2px rgba(243,156,18,0.25)" : "none"; 
        }, 
        requiresQM
      );
    };

    controls.appendChild(enBtn); 
    controls.appendChild(esBtn); 
    controls.appendChild(micBtn); 
    p.appendChild(controls);

    // Input hint shows "(end with ?)" ONLY for real questions
    const input = document.createElement("input"); 
    input.type = "text"; 
    input.placeholder = requiresQM ? "Type the Spanish here (end with ?)" : "Type the Spanish here";
    input.oninput = e => { quiz[i].user = e.target.value; };

    // Hotkeys: Alt+R EN, Alt+S ES, Alt+M Mic
    input.addEventListener("keydown", (e) => { 
      if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ 
        if (e.code === "KeyR"){ e.preventDefault(); enBtn.click(); } 
        else if (e.code === "KeyS"){ e.preventDefault(); esBtn.click(); } 
        else if (e.code === "KeyM"){ e.preventDefault(); micBtn.click(); } 
      }
    });

    row.appendChild(p); 
    row.appendChild(input); 
    qwrap.appendChild(row);
  });

  updateESButtonsState(qwrap);

  const submit = $("#submit"); 
  if (submit){ 
    submit.disabled = false; 
    submit.textContent = "Finish & Check"; 
    submit.onclick = finishAndCheck; 
  }

  const back = $("#back-button"); 
  if (back){ 
    back.style.display = "inline-block"; 
    back.onclick = backToLevels; 
  }
}

// ===================== REPLACE UNTIL HERE (startDictationFor + renderQuiz) =====================

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    renderLevels();
  });
})();
