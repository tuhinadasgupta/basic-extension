window.addEventListener('load', loading);
function loading(){
  chrome.storage.sync.clear();
  chrome.storage.sync.set({'login' : 'true'}, function(){});
  // user location
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(sendLocation);
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  // }
}
// send location
function sendLocation(position){
  var coords = {"lat": position.coords.latitude, "lon": position.coords.longitude};
  console.log(coords);
  console.log(JSON.stringify(coords));
  var req = new XMLHttpRequest();
  req.open("POST", "http://pachira.eba-zaetptb5.us-east-1.elasticbeanstalk.com/nlp/", true);
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }
  req.send(JSON.stringify(coords));
}
// html pg display
document.getElementById("score-btn").addEventListener("click", replaceFunction);
function replaceFunction(){
  document.getElementById('second').style.display = 'none';
  document.getElementById('third').style.display = 'block';
}

document.getElementById("alt-btn").addEventListener("click", textFunction);
// parsing shopping cart
function textFunction(){
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      receiveRequest(request.source); // send to aws eb
    }
  });
  onWindowLoad();
}
// content script - parsing shopping cart
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
// get login status
document.getElementById("loginSubmit").addEventListener("click", loginStatus);
function loginStatus() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/accounts/login/", true);
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

// get snippets
document.getElementById("snippetSubmit").addEventListener("click", snippetSubmit);
function snippetSubmit() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/snippets/", true);
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

// django server communication
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

function receiveRequest(completeJSON){
  console.log("Posting request");
  var req = new XMLHttpRequest();

  req.open("POST", "http://pachira.eba-zaetptb5.us-east-1.elasticbeanstalk.com/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange = function() { // Call a function when the state changes
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }
  req.send(JSON.stringify(completeJSON));
}