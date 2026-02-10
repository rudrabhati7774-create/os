const player = document.getElementById("player");

function play(){
  player.play();
}

function pause(){
  player.pause();
}

function next(){
  player.currentTime = 0;
  player.play();
}

function prev(){
  player.currentTime = 0;
}
