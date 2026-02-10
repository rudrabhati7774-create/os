const grid = document.getElementById("grid");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

const STORAGE_KEY = "photos";
let photos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentIndex = 0;

/* DEFAULT FOLDER PHOTOS (FIRST TIME ONLY) */
if (photos.length === 0) {
  photos = [
    "../assets/photos/1.jpeg",
    "../assets/photos/2.jpeg",
    "../assets/photos/3.jpeg",
    "../assets/photos/4.jpeg",
    "../assets/photos/5.jpeg",
    "../assets/photos/6.jpeg",
    "../assets/photos/7.jpeg",
    "../assets/photos/8.jpeg",
    "../assets/photos/9.jpeg",
    "../assets/photos/10.jpeg",
    "../assets/photos/11.jpeg",
    "../assets/photos/12.jpeg",
    "../assets/photos/13.jpeg",
    "../assets/photos/14.jpeg",
    "../assets/photos/15.jpeg",
    "../assets/photos/16.jpeg",
    "../assets/photos/17.jpeg",
    "../assets/photos/18.jpeg",
    "../assets/photos/19.jpeg",
    "../assets/photos/20.jpeg",
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

/* RENDER GRID */
function render() {
  grid.innerHTML = "";
  photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => openViewer(i);
    grid.appendChild(img);
  });
}

/* OPEN IMAGE */
function openViewer(index) {
  currentIndex = index;
  viewerImg.src = photos[index];
  viewer.style.display = "flex";
}

/* CLOSE */
function closeViewer() {
  viewer.style.display = "none";
}

/* DELETE */
function deletePhoto() {
  if (!confirm("Delete photo?")) return;
  photos.splice(currentIndex, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  closeViewer();
  render();
}

/* UPLOAD IMAGE */
function uploadImages(input) {
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      photos.push(e.target.result);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
      render();
    };
    reader.readAsDataURL(file);
  });
  input.value = "";
}

/* SET WALLPAPER (APP UI) */
function setWallpaper() {
  const wp = photos[currentIndex];
  localStorage.setItem("wallpaper", wp);
  applyWallpaper();
  alert("Wallpaper applied ❤️");
}

/* APPLY WALLPAPER ON LOAD */
function applyWallpaper() {
  const wp = localStorage.getItem("wallpaper");
  if (wp) {
    const phone = document.querySelector(".phone");
    if (phone) {
      phone.style.backgroundImage = `url(${wp})`;
      phone.style.backgroundSize = "cover";
      phone.style.backgroundPosition = "center";
    }
  }
}

/* INIT */
window.onload = () => {
  render();
  applyWallpaper();
};
