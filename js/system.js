/* =====================
   GLOBAL SYSTEM STATE
===================== */

let brightness = Number(localStorage.getItem("brightness") ?? 100);
let volume = Number(localStorage.getItem("volume") ?? 50);

/* =====================
   BRIGHTNESS SYSTEM
===================== */
function applyBrightness(){
  const layer = document.getElementById("brightnessLayer");
  if(!layer) return;

  // 100% = bright | 20% = very dark
  brightness = Math.max(20, Math.min(100, brightness));
  const opacity = 1 - (brightness / 100);
  layer.style.opacity = opacity.toFixed(2);
}

function changeBrightness(step){
  brightness += step;
  localStorage.setItem("brightness", brightness);
  applyBrightness();
}

/* =====================
   VOLUME SYSTEM (UI)
===================== */
function changeVolume(step){
  volume = Math.max(0, Math.min(100, volume + step));
  localStorage.setItem("volume", volume);
  showToast(`🔊 Volume ${volume}%`);
}

/* =====================
   START / RESET
===================== */
function startOS(){
  location.href="boot.html";
}

function resetOS(){
  if(confirm("Reset Romantic OS?")){
    localStorage.clear();
    alert("Device reset complete");
    location.href="../index.html";
  }
}

/* =====================
   TOAST MESSAGE
===================== */
function showToast(msg){
  let t = document.createElement("div");
  t.innerText = msg;
  t.style.cssText=`
    position:fixed;
    bottom:30px;
    left:50%;
    transform:translateX(-50%);
    background:rgba(0,0,0,.6);
    color:white;
    padding:10px 16px;
    border-radius:20px;
    z-index:10000;
    font-size:14px;
  `;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1200);
}
function applyWallpaper(){
  const phone = document.querySelector(".phone");
  if(!phone) return;

  const wp = localStorage.getItem("wallpaper");

  if(wp){
    phone.style.backgroundImage = `url(${wp})`;
  }else{
    phone.style.backgroundImage =
      "linear-gradient(135deg,#ff5fa2,#ff2e63)";
  }
}

document.addEventListener("DOMContentLoaded", applyWallpaper);



/* APPLY ON LOAD */
document.addEventListener("DOMContentLoaded", applyBrightness);
