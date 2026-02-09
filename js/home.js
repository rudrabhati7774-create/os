/* STATUS BAR TIME */
function updateStatus(){
  const now = new Date();
  document.getElementById("sb-time").innerText =
    now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  document.getElementById("sb-date").innerText =
    now.toLocaleDateString();
}
setInterval(updateStatus,1000);
updateStatus();

/* BATTERY (SIMULATED) */
let battery = Number(localStorage.getItem("battery") ?? 100);
document.getElementById("sb-battery").innerText = `🔋${battery}%`;

/* APP OPEN */
function openApp(url){
  document.body.style.opacity="0";
  setTimeout(()=>location.href=url,180);
}

/* GLOBAL WALLPAPER */
const wp = localStorage.getItem("wallpaper");
if(wp){
  document.body.style.background =
    `url(${wp}) center/cover no-repeat`;
}else{
  document.body.style.background =
    "linear-gradient(135deg,#ff5fa2,#ff9ecf)";
}
