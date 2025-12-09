// CONFIG
const YT_VIDEO_ID = "FocFked1TbQ"; // YouTube fallback
const LOCAL_MP3 = "music.mp3";     // put mp3 here for best audio

document.addEventListener("DOMContentLoaded", () => {
  setupPlayOverlay();
  setupSlides();
  runIntroType();
  setupFlowers();
  setupLovePopup();
  setupMessageBox();
});

// ---------- Play overlay & music ----------
function setupPlayOverlay(){
  const overlay = document.getElementById("playOverlay");
  const startBtn = document.getElementById("startBtn");
  const audioEl = document.getElementById("bgAudio");

  function startAll(){
    if(audioEl){
      audioEl.play().catch(()=>{});
    }
    if(overlay) overlay.style.display = "none";
  }

  if(startBtn) startBtn.addEventListener("click", startAll);
  if(overlay) overlay.addEventListener("click", (e)=>{
    if(e.target.id !== "startBtn") startAll();
  });
}

// ---------- Slides (fade + dots + swipe) ----------
function setupSlides(){
  const slides = Array.from(document.querySelectorAll(".slide"));
  if(slides.length === 0) return;
  let idx = 0;
  slides.forEach((s,i)=> s.classList.toggle("active", i===0));

  const dots = document.getElementById("dots");
  if(dots){
    slides.forEach((_,i)=>{
      const d = document.createElement("div");
      d.className = "dot";
      d.style.display = "inline-block";
      d.style.width = "8px";
      d.style.height = "8px";
      d.style.margin = "6px";
      d.style.borderRadius = "50%";
      d.style.background = i===0 ? "#ff5e8e" : "rgba(255,255,255,0.6)";
      d.addEventListener("click", ()=> goTo(i));
      dots.appendChild(d);
    });
  }

  function updateDots(){ if(!dots) return; Array.from(dots.children).forEach((d,i)=> d.style.background = i===idx ? "#ff5e8e" : "rgba(255,255,255,0.6)"); }
  function goTo(i){ slides[idx].classList.remove("active"); idx = i; slides[idx].classList.add("active"); updateDots(); resetTimer(); }
  function next(){ slides[idx].classList.remove("active"); idx = (idx+1) % slides.length; slides[idx].classList.add("active"); updateDots(); }

  let timer = setInterval(next, 3000);
  function resetTimer(){ clearInterval(timer); timer = setInterval(next, 3000); }

  let startX = 0;
  const wrapper = document.querySelector(".slideshow") || document.querySelector(".slideshow-container");
  if(wrapper){
    wrapper.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    wrapper.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - startX;
      if(Math.abs(dx) > 40){
        if(dx < 0) next(); else { slides[idx].classList.remove("active"); idx = (idx-1+slides.length)%slides.length; slides[idx].classList.add("active"); updateDots(); resetTimer(); }
      }
    });
  }
}

// ---------- Intro type on index ----------
function runIntroType(){
  const el = document.getElementById("intro");
  if(!el) return;
  const text = "...";
  let p = 0;
  function step(){ el.textContent += text.charAt(p++); if(p < text.length) setTimeout(step, 28); }
  setTimeout(step, 300);
}

// ---------- Poem typing ----------
function startPoemTyping(){
  const el = document.getElementById("poemText");
  if(!el) return;
  const poem = `Karina…\nNamamu adalah doa yang tak pernah selesai kusebut,\nadalah alasan mataku selalu punya arah untuk kembali.\n\nKehadiranmu seperti senyum pertama di pagi hari,\nyang membuat semua terasa layak untuk dijalani.\n\nAku mungkin bukan yang paling sempurna,\ntapi perasaanku untukmu selalu utuh\ntak pernah berkurang meski waktu berlalu.\n\nJika dunia bertanya mengapa aku bertahan,\naku akan menjawab,\n"Karena ada Karina… yang membuat aku selalu ingin pulang."\n\nDan jika kamu bertanya seberapa besar cintaku,\ncukup lihat langit malam… sebanyak itulah aku menyayangimu.\n\n— Sareja`;
  let k = 0;
  function typeChar(){ const c = poem.charAt(k++); el.innerHTML += c === "\\n" ? "<br>" : c; if(k < poem.length) setTimeout(typeChar, 28); }
  setTimeout(typeChar, 500);
}

// ---------- Flowers ----------
function setupFlowers(){
  const rootSelectors = document.querySelectorAll("#flowerRoot");
  if(rootSelectors.length===0) return;
  rootSelectors.forEach(root=>{
    function spawn(){
      const f = document.createElement("div");
      f.className = "flower";
      f.textContent = ["🌸","🌺","🌷","🌼"][Math.floor(Math.random()*4)];
      f.style.left = (Math.random()*100) + "vw";
      f.style.fontSize = (12 + Math.random()*28) + "px";
      const duration = 3500 + Math.random()*4000;
      root.appendChild(f);
      f.animate([{ transform: `translateY(0) rotate(0deg)`, opacity:1 }, { transform: `translateY(${90 + Math.random()*60}vh) rotate(${Math.random()*720-360}deg)`, opacity:0 }], { duration: duration, easing: "linear" });
      setTimeout(()=> f.remove(), duration+50);
    }
    for(let i=0;i<6;i++) setTimeout(spawn, i*300);
    setInterval(spawn, 700);
  });
}

// ---------- Love popup ----------
function setupLovePopup(){
  const loveBtn = document.getElementById("loveBtn");
  if(!loveBtn) return;
  loveBtn.addEventListener("click", ()=>{
    const pop = document.getElementById("lovePopup");
    if(!pop) return;
    pop.style.display = "block";
    setTimeout(()=> pop.style.display = "none", 2000);
    for(let i=0;i<8;i++){
      const c = document.createElement("div");
      c.className = "flower";
      c.textContent = ["💖","💘","✨"][Math.floor(Math.random()*3)];
      c.style.left = (50 + (Math.random()-0.5)*30) + "vw";
      c.style.fontSize = (10 + Math.random()*20) + "px";
      document.body.appendChild(c);
      c.animate([{ transform: 'translateY(0)', opacity:1 }, { transform: 'translateY(-80px)', opacity:0 }], { duration: 900 + Math.random()*400, easing: 'ease-out' });
      setTimeout(()=> c.remove(), 1200);
    }
  });
}

// ---------- Message box (index) ----------
function setupMessageBox(){
  const openMsg = document.getElementById("openMsg");
  const msgBox = document.getElementById("msgBox");
  if(openMsg) openMsg.addEventListener("click", ()=> { if(msgBox) msgBox.classList.toggle("hidden"); openMsg.style.display = "none"; });
}

// ---------- helpers ----------
function gotoPoem(){ window.location.href = "poem.html"; }
function home(){ window.location.href = "index.html"; }

// start poem typing if on poem page
document.addEventListener("DOMContentLoaded", ()=>{ if(document.getElementById("poemText")) startPoemTyping(); });

function pauseSlideshow(){
  if(slideshowInterval){
      clearInterval(slideshowInterval);
  }
}
document.getElementById("btnPuisi").addEventListener("click", () => {
  pauseSlideshow();
});
