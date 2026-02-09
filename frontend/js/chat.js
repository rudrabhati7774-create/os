const socket = io("http://localhost:3000");
const user = localStorage.getItem("user");
const box = document.getElementById("messages");

socket.emit("join", user);

socket.on("message", data => {
  const div = document.createElement("div");
  div.className = "msg " + (data.user === user ? "me" : "other");
  div.innerHTML = `<b>${data.user}</b><br>${data.text}<br><small>${data.time}</small>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});

function send(){
  socket.emit("message", msg.value);
  msg.value="";
}
