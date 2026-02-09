const grid = document.getElementById("grid");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let photos = JSON.parse(localStorage.getItem("photos") || "[]");
let currentIndex = 0;

/* DEFAULT PHOTOS */
if(photos.length === 0){
  photos = [
    "../assets/photos/1.jpg",
    "../assets/photos/2.jpg",
    "../assets/photos/3.jpg"
  ];
  localStorage.setItem("photos", JSON.stringify(photos));
}

/* RENDER GRID */
function render(){
  grid.innerHTML = "";
  photos.forEach((src,i)=>{
    const img = document.createElement("img");
    img.src = src;
    img.onclick = ()=>openViewer(i);
    grid.appendChild(img);
  });
}
render();

/* OPEN */
function openViewer(i){
  currentIndex = i;
  viewerImg.src = photos[i];
  viewer.style.display = "flex";
}

/* CLOSE */
function closeViewer(){
  viewer.style.display = "none";
}

/* DELETE */
function deletePhoto(){
  if(!confirm("Delete photo?")) return;
  photos.splice(currentIndex,1);
  localStorage.setItem("photos", JSON.stringify(photos));
  closeViewer();
  render();
}

/* SET WALLPAPER – REAL FIX */
function setWallpaper(){
  const wp = photos[currentIndex];
  localStorage.setItem("wallpaper", wp);
  applyWallpaper();   // 🔥 THIS WAS MISSING
  alert("Wallpaper applied");
}
