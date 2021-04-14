document.getElementById("back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}

document.getElementById("close-btn").addEventListener("click", closeWindow);
function closeWindow() {
  // window.close('','_parent','');
  window.open(location, '_self').close();   
  //open(location, '_self').close();
}

document.getElementById("to-login").addEventListener("click", redirectToLogin);
function redirectToLogin() {
  chrome.tabs.update({url: "http://127.0.0.1:8000/accounts/login"});
  window.close();
}

document.getElementById("to-signup").addEventListener("click", redirectToSignUp);
function redirectToSignUp() {
  chrome.tabs.update({url: "http://127.0.0.1:8000/accounts/signup"});
  window.close();
}

window.addEventListener('load', onWindowLoading);
function onWindowLoading(){
  var stored = "";
  stored = localStorage.getItem("access_token");
  console.log(atob(stored));
  if(stored!=null){
    //user is logged in
    //document.getElementById('first').style.display = 'none';
    document.getElementById('second').style.display = 'none';
  }
  else{
    //user not logged in 
    document.getElementById('first').style.display = 'none';
    //document.getElementById('second').style.display = 'none';
  }
}