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

  //set jwt
  localStorage.setItem("token", "token_string");

  // user location
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(sendLocation);
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  //}
  // init(cfg, log);
  // login(config);
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
  textFunction();
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
//oauth2 code from: https://github.com/michaeloryl/oauth2-angularjs-chrome-extension-demo/blob/master/app/scripts/background.js
var cfg = {
  "implicitGrantUrl": "http://127.0.0.1:8000/api/token/",
  "logoutUrl": "https://accounts.google.com/logout",
  "tokenInfoUrl": "https://www.googleapis.com/oauth2/v3/tokeninfo",
  "userInfoUrl": "https://www.googleapis.com/plus/v1/people/me",
  "userInfoNameField": "displayName",
  "clientId": "814368925475-75jkn9a9t3l2hq25vidrqt9f6ibulku9.apps.googleusercontent.com",
  "scopes": "https://www.googleapis.com/auth/userinfo.profile",
  "logoutWarningSeconds": 60,
  "autoReLogin": true
};
var token = null;
var log = console;
var config = {};
var logger;

function init(cfg, log) {
  config = cfg;
  logger = log;
}

function getLastToken() {
  return token;
}

function login(config, callback) {
  var authUrl = config.implicitGrantUrl
      + '?response_type=token&client_id=' + config.clientId
      + '&scope=' + config.scopes
      + '&redirect_uri=' + chrome.identity.getRedirectURL("oauth2");

  logger.debug('launchWebAuthFlow:', authUrl);

  chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function (redirectUrl) {
    if (redirectUrl) {
      logger.debug('launchWebAuthFlow login successful: ', redirectUrl);
      var parsed = parse(redirectUrl.substr(chrome.identity.getRedirectURL("oauth2").length + 1));
      token = parsed.access_token;
      logger.debug('Background login complete');
      return callback(redirectUrl); // call the original callback now that we've intercepted what we needed
    } else {
      logger.debug("launchWebAuthFlow login failed. Is your redirect URL (" + chrome.identity.getRedirectURL("oauth2") + ") configured with your OAuth2 provider?");
      return (null);
    }
  });
}

function logout(config, callback) {
  var logoutUrl = config.logoutUrl;

  chrome.identity.launchWebAuthFlow({'url': logoutUrl, 'interactive': false}, function (redirectUrl) {
    logger.debug('launchWebAuthFlow logout complete');
    return callback(redirectUrl)
  });
}

function parse(str) {
  if (typeof str !== 'string') {
    return {};
  }
  str = str.trim().replace(/^(\?|#|&)/, '');
  if (!str) {
    return {};
  }
  return str.split('&').reduce(function (ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined;
    key = decodeURIComponent(key);
    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);
    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    }
    else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    }
    else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});
}