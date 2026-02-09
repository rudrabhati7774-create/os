/* TIME + DATE */
function updateTime(){
  const now = new Date();
  document.getElementById("lockTime").innerText =
    now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  document.getElementById("lockDate").innerText =
    now.toDateString();
}
setInterval(updateTime,1000);
updateTime();

/* BATTERY */
navigator.getBattery().then(b=>{
  document.getElementById("battery").innerText =
    "🔋 " + Math.floor(b.level*100) + "%";
});

/* UNLOCK LOGIC */
function unlock(){
  const saved = localStorage.getItem("password");
  const input = document.getElementById("passInput").value;

  if(!saved){
    location.href="home.html";   // no password first time
    return;
  }

  if(input === saved){
    location.href="home.html";
  }else{
    alert("Wrong password");
  }
}
