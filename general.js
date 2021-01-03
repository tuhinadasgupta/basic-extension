document.getElementById("back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}

document.getElementById("close-btn").addEventListener("click", closeWindow);
function closeWindow() {
  window.close('','_parent','');
}

window.onload = onWindowLoading;
function onWindowLoading(){
  var stored = localStorage.getItem('login');
  if(stored.localeCompare('true')==0){
      //user is logged in
      document.getElementById('first').style.display = 'none';
  }
  else{
      //user not logged in 
      document.getElementById('second').style.display = 'none';
  }
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("location not available");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude);
}