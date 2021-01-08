window.onload = loading;

function loading(){
  chrome.storage.sync.clear();
  chrome.storage.sync.set({'login' : 'true'}, function(){});
}

document.getElementById("alt-btn").addEventListener("click", textFunction);

function textFunction(){
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      receiveRequest(request.source);
    }
  });
  onWindowLoad();
}

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // if message passing isn't set up, you get a runtime error
    if (chrome.runtime.lastError) {
      alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });
}

document.getElementById("loginSubmit").addEventListener("click", sendRequest);

// local django server communication
function sendRequest() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/catalog/login/", true);
  req.responseType = 'json';
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        alert(JSON.stringify(req.response));
        document.write("OK");
      }
    }
  };
  req.send();
} 

function receiveRequest(msgPassedJson){
  console.log("Posting request");
  var req = new XMLHttpRequest();

  req.open("POST", "http://pachira.eba-zaetptb5.us-east-1.elasticbeanstalk.com/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }
  req.send(JSON.stringify(msgPassedJson));
}

// document.addEventListener('DOMContentLoaded', loginEvents, false);

// function myAction(femail,fpassword) {
//     //alert("femail=" + femail.value + "fpassword=" +fpassword.value);
//     var strLogin = "email=" + femail.value + "&password=" + fpassword.value;
//     if (femail.value == ""){
//         alert("Username must be filled out");
//         return false;
//     }
//     if (fpassword.value == ""){
//         alert("Password must be filled out");
//         return false;
//     }
//     var newxmlhttp = new XMLHttpRequest();
//     var theUrl = "http://127.0.0.1:8000/catalog/login/";
//     newxmlhttp.open("POST", theUrl, true);

//     newxmlhttp.onreadystatechange = function() {
//       if (newxmlhttp.readyState == 4){
//           // Alert response
//           alert(newxmlhttp.responseText);
//       }
//     };

//     newxmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
//     newxmlhttp.send(strLogin);
// }
// function loginEvents() {
//     console.log("entered console");
//     var loginSubmitButton = document.getElementById('loginSubmit')
//     loginSubmitButton.addEventListener('click', 
//     function(event) {
//         var userEmail = document.getElementById('email');
//         var userPassword = document.getElementById('password');
//         myAction(userEmail,userPassword);
//     });
// }