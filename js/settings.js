function factoryReset(){
  if(confirm("Erase all data?")){
    localStorage.clear();
    location.href = "../index.html";
  }
}
