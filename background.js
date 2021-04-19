var interval;
window.addEventListener("load", loading);
function loading() {
  //set alternatives data (hardcoded)
  var json1 = {
    name: "Target",
    address: "12 Drive",
    price: 2,
    stars: 3,
    url: "",
  };
  localStorage.setItem("company1", JSON.stringify(json1));
  var json2 = {
    name: "Walmart",
    address: "123 Drive",
    price: 1,
    stars: 4,
    url: "",
  };
  localStorage.setItem("company2", JSON.stringify(json2));
  var json3 = {
    name: "Thrift",
    address: "124 Drive",
    price: 3,
    stars: 5,
    url: "",
  };
  localStorage.setItem("company3", JSON.stringify(json3));
}

document.addEventListener("DOMContentLoaded", afterLoad);

function afterLoad() {
  // get user token
  interval = setInterval(determineIfParse, 5000);

  //get username, sust tier
  getAccInfo();

  //user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, null, {
      timeout: 20000,
      enableHighAccuracy: true,
      maximumAge: Infinity,
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

}

function getAccInfo() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/accounts/username/", true);
  var accessjwtoken = localStorage.getItem("access_token");
  accessjwtoken = atob(accessjwtoken);
  req.setRequestHeader("Authorization", "JWT " + accessjwtoken);
  req.setRequestHeader("Accept", "application/json");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        console.log(req.response);
        // var jsonStr = JSON.stringify(req.response);
        // var jsonParse = JSON.parse(jsonStr);
        var username = req.response.toString();
        console.log(username);
        //var sust_tier = jsonParse.susttier;
        localStorage.setItem("username", username);
        // localStorage.setItem("susttier", sust_tier);
      }
    }
  };
  req.send();
}

function stopFunc() {
  clearInterval(interval);
}

function determineIfParse() {
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getCheck") {
      console.log("Token: ", request.source);
      var json = request.source;
      var access_token = btoa(json.access); //encoding
      var refresh_token = btoa(json.refresh);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      stopFunc();
    }
  });
  onWindowLoadCheck();
}

function onWindowLoadCheck() {
  chrome.tabs.executeScript(
    null,
    {
      file: "getCheck.js",
    },
    function () {
      // if message passing isn't set up, you get a runtime error
      if (chrome.runtime.lastError) {
        alert(
          "There was an error injecting script : \n" +
            chrome.runtime.lastError.message
        );
      }
    }
  );
}

// send location
function sendLocation(position) {
  var coords = {
    username: localStorage.getItem("username"),
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  console.log(coords);
  console.log(JSON.stringify(coords));
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:8000/nlp/", true);
  req.setRequestHeader("Content-type", "application/json");
  var accessjwtoken = localStorage.getItem("access_token");
  accessjwtoken = atob(accessjwtoken);
  req.setRequestHeader("Authorization", "JWT " + accessjwtoken);
  console.log(req.toString());
  req.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("Got response 200!");
    }
  };
  req.send(JSON.stringify(coords));
}
// html pg display
document.getElementById("score-btn").addEventListener("click", replaceFunction);
function replaceFunction() {
  document.getElementById("second").style.display = "none";
  document.getElementById("third").style.display = "block";
  textFunction();
}

// parsing shopping cart
function textFunction() {
  console.log("here");
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
      console.log(request.source);
      receiveRequest(request.source); // send to aws eb
    }
  });
  onWindowLoad();
}
// content script - parsing shopping cart
function onWindowLoad() {
  chrome.tabs.executeScript(
    null,
    {
      file: "getPagesSource.js",
    },
    function () {
      // if message passing isn't set up, you get a runtime error
      if (chrome.runtime.lastError) {
        alert(
          "There was an error injecting script : \n" +
            chrome.runtime.lastError.message
        );
      }
    }
  );
}

// send cart contents
function receiveRequest(completeJSON) {
  console.log("Posting request");
  var req = new XMLHttpRequest();
  console.log(completeJSON);
  req.open("POST", "http://127.0.0.1:8000/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  var accessjwtoken = localStorage.getItem("access_token");
  accessjwtoken = atob(accessjwtoken);
  req.setRequestHeader("Authorization", "JWT " + accessjwtoken);
  console.log(req);
  req.onreadystatechange = function () {
    // Call a function when the state changes
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("Got response 200!");
    }
  };
  req.send(JSON.stringify(completeJSON));
}

function donothing() {
  //
}

//get suggested alternatives
document
  .getElementById("alt-btn")
  .addEventListener("click", alternativesFunctions);
function alternativesFunctions() {
  console.log('before');
  setTimeout(donothing, 7000); // run donothing after 7 seconds
  console.log('after'); 
  getAlternatives();
 // getCompanySustScores();
  //changeWindow();
}

function changeWindow(){
  window.location.href = "alt.html";
  console.log("in change window");
}
//gets alternatives
function getAlternatives() {
  console.log("in getAlternatives");
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/nlp/", true);
  var accessjwtoken = localStorage.getItem("access_token");
  accessjwtoken = atob(accessjwtoken);
  req.setRequestHeader("Authorization", "JWT " + accessjwtoken);
  req.setRequestHeader("Accept", "application/json");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        console.log(req.response);
        var jsonParse = JSON.parse(req.response);
        for (var i=0; i<jsonParse.length; i++) {
          var altCompany = jsonParse[i];
          if (i == 0) {
            localStorage.setItem("company1", JSON.stringify(altCompany));
          } else if (i == 1) {
            localStorage.setItem("company2", JSON.stringify(altCompany));
          } else if (i == 2) {
            localStorage.setItem("company3", JSON.stringify(altCompany));
          }
        }
      }
    }
  };
  req.send();
}

// django server communication
function getCompanySustScores() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:8000/sust/company/", true);
  req.responseType = "json";
  var accessjwtoken = localStorage.getItem("access_token");
  accessjwtoken = atob(accessjwtoken);
  req.setRequestHeader("Authorization", "JWT " + accessjwtoken);
  req.setRequestHeader("Accept", "application/json");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        alert(JSON.stringify(req.response));
        var jsonStr = JSON.stringify(req.response);
        var jsonParse = JSON.parse(jsonStr); //format [{sust_score: 12, sust_score: 13, sust_score: 14}]
        for (var i = 0; i < jsonParse.length; i++) {
          var score = jsonParse[i];
          if (i == 0) {
            localStorage.setItem("sustscore1", JSON.stringify(score));
          } else if (i == 1) {
            localStorage.setItem("sustscore2", JSON.stringify(score));
          } else if (i == 2) {
            localStorage.setItem("sustscore3", JSON.stringify(score));
          }
        }
      }
    }
  };
  req.send();
}