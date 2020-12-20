window.onload = onWindowLoad;
function onWindowLoad(){
    var stored = localStorage.getItem('login');
    if(stored.localeCompare('true')==0){
        //user is logged in
        document.getElementById('first').style.display = 'none';
    }
    else{
        //user not logged in 
        document.getElementById('second').style.display = 'none';
    }
}