window.addEventListener('load', loading);
function loading(){
  chrome.storage.sync.clear();
  chrome.storage.sync.set({'login' : 'true'}, function(){});
  //set alternatives data (hardcoded)
  var json1= {name: "Target", address: "12 Drive", price: 2, stars: 3, url: ""}
  localStorage.setItem("company1", JSON.stringify(json1));
  var json2= {name: "Walmart", address: "123 Drive", price: 1, stars: 4, url: ""}
  localStorage.setItem("company2", JSON.stringify(json2));  
  var json3= {name: "Thrift", address: "124 Drive", price: 3, stars: 5, url: ""}
  localStorage.setItem("company3", JSON.stringify(json3));

  //set jwt w/base64 encoding
  var token_plaintext = "token_string";
  var token_encoded = btoa(token_plaintext); //to decode atob()
  localStorage.setItem("token", token_encoded);

  // user location
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(sendLocation);
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  //}
  
}

document.getElementById("to-token").addEventListener("click", getToken);

// parsing token
function getToken(){
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getToken") {
      var json = request.source;
      var access_token = btoa(json.access); //encoding
      var refresh_token = btoa(json.refresh); 
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }
  });
  onWindowLoadToken();
}
// content script - parsing token
function onWindowLoadToken() {
  chrome.tabs.executeScript(null, {
    file: "getToken.js"
  }, function() {
    // if message passing isn't set up, you get a runtime error
    if (chrome.runtime.lastError) {
      alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });
}
// send location
function sendLocation(position){
  var coords = {"lat": position.coords.latitude, "lon": position.coords.longitude};
  console.log(coords);
  console.log(JSON.stringify(coords));
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:8000/nlp/", true);
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
  //textFunction();
}

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
// send cart contents
function receiveRequest(completeJSON){
  console.log("Posting request");
  var req = new XMLHttpRequest();

  req.open("POST", "http://127.0.0.1:8000/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange = function() { // Call a function when the state changes
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }
  req.send(JSON.stringify(completeJSON));
}

//get suggested alternatives
document.getElementById("alt-btn").addEventListener("click", getAlternatives);
//gets alternatives
function getAlternatives(){
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/nlp/", true);
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