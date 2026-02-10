const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const popup = document.getElementById("popup");
const popupDate = document.getElementById("popupDate");
const noteText = document.getElementById("noteText");

let now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

/* saved notes */
let notes = JSON.parse(localStorage.getItem("loveNotes")||"{}");

/* render calendar */
function renderCalendar(){
  calendar.innerHTML="";
  const firstDay = new Date(currentYear,currentMonth,1).getDay();
  const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();
  monthYear.innerText = now.toLocaleString('default',{month:'long'})+" "+currentYear;

  for(let i=0;i<firstDay;i++){
    calendar.innerHTML += `<div class="day empty"></div>`;
  }

  for(let d=1;d<=daysInMonth;d++){
    const key = `${currentYear}-${currentMonth+1}-${d}`;
    let cls="day";
    if(d===now.getDate() && currentMonth===now.getMonth() && currentYear===now.getFullYear()) cls+=" today";
    if(notes[key]) cls+=" marked";
    calendar.innerHTML += `<div class="${cls}" onclick="openPopup(${d})">${d}</div>`;
  }
}

/* popup open */
let selectedDay="";
function openPopup(day){
  selectedDay = day;
  popup.style.display="flex";
  const key = `${currentYear}-${currentMonth+1}-${day}`;
  popupDate.innerText = `${day}/${currentMonth+1}/${currentYear}`;
  noteText.value = notes[key]||"";
}

/* close */
function closePopup(){
  popup.style.display="none";
}

/* save note */
function saveNote(){
  const key = `${currentYear}-${currentMonth+1}-${selectedDay}`;
  notes[key] = noteText.value;
  localStorage.setItem("loveNotes",JSON.stringify(notes));
  closePopup();
  renderCalendar();
}

/* month navigation */
function prevMonth(){ currentMonth--; if(currentMonth<0){currentMonth=11; currentYear--; } renderCalendar(); }
function nextMonth(){ currentMonth++; if(currentMonth>11){currentMonth=0; currentYear++; } renderCalendar(); }

/* init */
renderCalendar();
