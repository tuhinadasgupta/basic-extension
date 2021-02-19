document.getElementById("back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}

document.getElementById("close-btn").addEventListener("click", closeWindow);
function closeWindow() {
  window.close('','_parent','');
}

window.addEventListener('load', onWindowLoading);
function onWindowLoading(){
  var stored = "";
  stored = localStorage.getItem("token");
  console.log(stored);
  if(stored!=null){
    //user is logged in
    document.getElementById('first').style.display = 'none';
  }
  else{
    //user not logged in 
    document.getElementById('second').style.display = 'none';
  }
}