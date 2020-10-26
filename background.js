document.getElementById("alt-btn").addEventListener("click", myFunction);

function myFunction(){
  console.log('HELLO');
}

document.getElementById("comm-btn").addEventListener("click", receiveRequest);

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

  req.open("POST", "http://127.0.0.1:8000/snippets/", true);
  req.setRequestHeader("Content-type", "application/json");
  var json = {
    code : "print(999)"
  };

  req.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log("Got response 200!");
    }
  }

  var data = JSON.stringify(json);
  req.send(data);
}
