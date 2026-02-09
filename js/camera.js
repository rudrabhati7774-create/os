let video = document.getElementById("camera");
let currentFacing = "environment";
let stream = null;

/* START CAMERA */
async function startCamera(){
  if(stream){
    stream.getTracks().forEach(t=>t.stop());
  }

  try{
    stream = await navigator.mediaDevices.getUserMedia({
      video:{ facingMode: currentFacing }
    });
    video.srcObject = stream;
  }catch(e){
    alert("Camera permission denied");
  }
}

/* SWITCH FRONT / BACK */
function switchCamera(){
  currentFacing =
    currentFacing === "user" ? "environment" : "user";
  startCamera();
}

/* CAPTURE PHOTO */
function capturePhoto(){
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video,0,0);

  const imgData = canvas.toDataURL("image/jpeg");

  savePhoto(imgData);
  showToast("📸 Photo saved");
}

/* SAVE TO PHOTOS STORAGE */
function savePhoto(dataUrl){
  let photos = JSON.parse(localStorage.getItem("photos") || "[]");

  photos.unshift(dataUrl);  // newest first (real phone)
  localStorage.setItem("photos", JSON.stringify(photos));

  alert("Photo saved");
}


/* BACK */
function goBack(){
  if(stream){
    stream.getTracks().forEach(t=>t.stop());
  }
  history.back();
}

/* INIT */
startCamera();
