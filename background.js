var msgPassedJson;
document.getElementById("alt-btn").addEventListener("click", myFunction);

function myFunction(){
  console.log('HELLO');
}

document.getElementById("comm-btn").addEventListener("click", receiveRequest);
// local django server communication
function sendRequest() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8000", true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200) {
            alert(req.responseText);
            document.write("OK");
          }
        }
      };
    req.send();
} 

function receiveRequest(){
  console.log("Posting request");
  var req = new XMLHttpRequest();

  req.open("POST", "http://0.0.0.0:8000/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  var json = msgPassedJson;

  req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }

  req.send(JSON.stringify(json));
}


document.getElementById("text-btn").addEventListener("click", textFunction);
function textFunction(){
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      msgPassedJson = request.source;
      alert(JSON.stringify(request.source));
    }
  });
  onWindowLoad();
}

function onWindowLoad() {
  
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // if message passing isn't set up, you get a runtime error
    if (chrome.runtime.lastError) {
      alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });

}

window.onload = onWindowLoad;
