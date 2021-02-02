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
  chrome.storage.sync.get('login', function (result) {
    stored = result.login;
    console.log(stored);
    if(stored.localeCompare('true')==0){
      //user is logged in
      //document.getElementById('first').style.display = 'none';
      document.getElementById('second').style.display = 'none';
    }
    else{
      //user not logged in 
      document.getElementById('first').style.display = 'none';
      //document.getElementById('second').style.display = 'none';
    }
  });
}