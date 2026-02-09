const grid = document.getElementById("videoGrid");
const player = document.getElementById("player");
const videoPlayer = document.getElementById("videoPlayer");

let videos = JSON.parse(localStorage.getItem("videos") || "[]");
let currentIndex = 0;

/* DEFAULT VIDEOS (OPTIONAL) */
if(videos.length === 0){
  videos = [
    "../assets/videos/1.mp4",
    "../assets/videos/2.mp4"
  ];
  localStorage.setItem("videos", JSON.stringify(videos));
}

/* RENDER */
function render(){
  grid.innerHTML = "";
  videos.forEach((src,i)=>{
    const vid = document.createElement("video");
    vid.src = src;
    vid.muted = true;
    vid.onclick = ()=>openPlayer(i);
    grid.appendChild(vid);
  });
}
render();

/* OPEN PLAYER */
function openPlayer(i){
  currentIndex = i;
  videoPlayer.src = videos[i];
  player.style.display = "flex";
  videoPlayer.play();
}

/* CLOSE */
function closePlayer(){
  videoPlayer.pause();
  player.style.display = "none";
}

/* DELETE */
function deleteVideo(){
  if(!confirm("Delete video?")) return;
  videos.splice(currentIndex,1);
  localStorage.setItem("videos", JSON.stringify(videos));
  closePlayer();
  render();
}
