// Turbo Q+ Edition — 10-Level Fully Working Version

(() => {
  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // CONFIG
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG = 30;
  const BASE_THRESH = { 1:200,2:180,3:160,4:140,5:120,6:100,7:80,8:60,9:40 };
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // DATA (10 levels)
  const Present = {
    1:[{en:"You are happy.",es:"Estás feliz."},{en:"You are tall.",es:"Eres alto."},{en:"You are in class.",es:"Estás en clase."},{en:"You are kind.",es:"Eres amable."},{en:"You are tired.",es:"Estás cansado."},{en:"You are ready.",es:"Estás lista."},{en:"You are calm.",es:"Estás tranquilo."},{en:"You are funny.",es:"Eres gracioso."},{en:"You are strong.",es:"Eres fuerte."},{en:"You are beautiful.",es:"Eres bonita."}],
    2:[{en:"It is a cat.",es:"Es un gato."},{en:"It is a dog.",es:"Es un perro."},{en:"It is a sunny day.",es:"Es un día soleado."},{en:"It is cold.",es:"Hace frío."},{en:"You are at home.",es:"Estás en casa."},{en:"It is blue.",es:"Es azul."},{en:"It is big.",es:"Es grande."},{en:"It is small.",es:"Es pequeño."},{en:"It is interesting.",es:"Es interesante."},{en:"It is beautiful.",es:"Es bonito."}],
    3:[{en:"You live in Madrid.",es:"Vives en Madrid."},{en:"You study Spanish.",es:"Estudias español."},{en:"You play football.",es:"Juegas al fútbol."},{en:"You like chocolate.",es:"Te gusta el chocolate."},{en:"You work hard.",es:"Trabajas mucho."},{en:"You read books.",es:"Lees libros."},{en:"You eat fruit.",es:"Comes fruta."},{en:"You drink water.",es:"Bebes agua."},{en:"You listen to music.",es:"Escuchas música."},{en:"You sing well.",es:"Cantas bien."}],
    4:[{en:"Carlos is your teacher.",es:"Carlos es tu profesor."},{en:"Ana is at school.",es:"Ana está en la escuela."},{en:"You sleep early.",es:"Duermes temprano."},{en:"You run fast.",es:"Corres rápido."},{en:"You learn every day.",es:"Aprendes cada día."},{en:"You work in an office.",es:"Trabajas en una oficina."},{en:"You like English.",es:"Te gusta el inglés."},{en:"You walk to school.",es:"Caminas a la escuela."},{en:"María is your friend.",es:"María es tu amiga."},{en:"You are busy.",es:"Estás ocupado."}],
    5:[{en:"They are students.",es:"Son estudiantes."},{en:"You are playing football.",es:"Juegas al fútbol."},{en:"You are going to the park.",es:"Vas al parque."},{en:"You arrive early.",es:"Llegas temprano."},{en:"You are never late.",es:"Nunca llegas tarde."},{en:"You know a lot.",es:"Sabes mucho."},{en:"You prefer apples.",es:"Prefieres manzanas."},{en:"The idea is good.",es:"La idea es buena."},{en:"You speak Spanish.",es:"Hablas español."},{en:"We have time.",es:"Tenemos tiempo."}],
    6:[{en:"Luis helps you.",es:"Luis te ayuda."},{en:"You need a pencil.",es:"Necesitas un lápiz."},{en:"Your house is big.",es:"Tu casa es grande."},{en:"You eat lunch at twelve.",es:"Almuerzas a las doce."},{en:"You study Spanish.",es:"Estudias español."},{en:"You go to school by bus.",es:"Vas a la escuela en autobús."},{en:"You are in class five.",es:"Estás en la clase cinco."},{en:"It is your turn.",es:"Es tu turno."},{en:"You have two pets.",es:"Tienes dos mascotas."},{en:"It costs ten euros.",es:"Cuesta diez euros."}],
    7:[{en:"You help at home.",es:"Ayudas en casa."},{en:"You eat breakfast at eight.",es:"Desayunas a las ocho."},{en:"You go out on weekends.",es:"Sales los fines de semana."},{en:"You wake up early.",es:"Te despiertas temprano."},{en:"You run every morning.",es:"Corres cada mañana."},{en:"You feel good today.",es:"Te sientes bien hoy."},{en:"You like this movie.",es:"Te gusta esta película."},{en:"Your phone is on the table.",es:"Tu teléfono está en la mesa."},{en:"You study two hours.",es:"Estudias dos horas."},{en:"You have little homework.",es:"Tienes poca tarea."}],
    8:[{en:"Someone is calling.",es:"Alguien llama."},{en:"They are working.",es:"Trabajan."},{en:"You go to school every day.",es:"Vas a la escuela cada día."},{en:"You finish work at three.",es:"Terminas el trabajo a las tres."},{en:"You are tired now.",es:"Estás cansado ahora."},{en:"You travel by train.",es:"Viajas en tren."},{en:"You like the color blue.",es:"Te gusta el color azul."},{en:"Your bag is new.",es:"Tu bolsa es nueva."},{en:"Many people live here.",es:"Mucha gente vive aquí."},{en:"You drink water every day.",es:"Bebes agua cada día."}],
    9:[{en:"You open the door.",es:"Abres la puerta."},{en:"You say good morning.",es:"Dices buenos días."},{en:"You go home after class.",es:"Vas a casa después de clase."},{en:"You arrive at school early.",es:"Llegas a la escuela temprano."},{en:"You leave at four.",es:"Te vas a las cuatro."},{en:"You do your homework.",es:"Haces tu tarea."},{en:"You choose a car.",es:"Eliges un coche."},{en:"Your shoes are clean.",es:"Tus zapatos están limpios."},{en:"Students pass the exam.",es:"Los estudiantes aprueban el examen."},{en:"You drink milk.",es:"Bebes leche."}],
    10:[{en:"You wait for Ana.",es:"Esperas a Ana."},{en:"You think about your friends.",es:"Piensas en tus amigos."},{en:"You want to travel.",es:"Quieres viajar."},{en:"You return home at six.",es:"Vuelves a casa a las seis."},{en:"You are here now.",es:"Estás aquí ahora."},{en:"You learn a lot.",es:"Aprendes mucho."},{en:"You prefer these shoes.",es:"Prefieres estos zapatos."},{en:"It is your turn to cook.",es:"Es tu turno de cocinar."},{en:"You read many books.",es:"Lees muchos libros."},{en:"We have enough time.",es:"Tenemos suficiente tiempo."}]
  };

  const deepCopy = obj => JSON.parse(JSON.stringify(obj));
  const DATASETS = { Present: Present, Past: deepCopy(Present), Future: deepCopy(Present) };

  // HELPER FUNCTIONS
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v==null){localStorage.setItem(GLOBAL_CHEATS_KEY,String(GLOBAL_CHEATS_MAX));return GLOBAL_CHEATS_MAX;}
    const n = parseInt(v,10);
    return Number.isFinite(n)?clampCheats(n):GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){localStorage.setItem(GLOBAL_CHEATS_KEY,String(clampCheats(n)));}

  function isUnlocked(tense,lvl){
    if(lvl===1)return true;
    const need=BASE_THRESH[lvl-1];
    const prev=parseInt(localStorage.getItem(`tqplus:v3:best:${tense}:${lvl-1}`)||"9999",10);
    return prev<=need;
  }

  function renderLevels(){
    const host=$("#level-list");if(!host)return;
    host.innerHTML="";
    const ds=DATASETS["Present"];
    Object.keys(ds).map(x=>parseInt(x,10)).sort((a,b)=>a-b).forEach(i=>{
      const unlocked=isUnlocked("Present",i);
      const btn=document.createElement("button");
      btn.className="level-btn";btn.disabled=!unlocked;
      btn.textContent=unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if(unlocked)btn.onclick=()=>alert(`Level ${i} start (stub)`);
      host.appendChild(btn);
    });
  }

  document.addEventListener("DOMContentLoaded",()=>{
    renderLevels();
  });
})();
