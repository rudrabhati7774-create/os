const socket = io("https://backend-w1an.onrender.com/"); // ← apna URL

const messages = document.getElementById("messages");
const input = document.getElementById("msg");
const user = localStorage.getItem("user") || "User";

function time(){
  const d=new Date();
  return d.getHours()+":"+d.getMinutes().toString().padStart(2,"0");
}

function send(){
  if(!input.value.trim()) return;

  const msg = {
    text: input.value,
    user,
    time: time()
  };

  add(msg,"me");
  socket.emit("send-message", msg);

  input.value="";
}

socket.on("receive-message", (msg)=>{
  add(msg,"you");
});

function add(msg,type){
  const div=document.createElement("div");
  div.className="msg "+type;
  div.innerHTML = `
    ${msg.text}
    <div class="time">${msg.time}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop=messages.scrollHeight;
}
