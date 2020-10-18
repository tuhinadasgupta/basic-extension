document.getElementById("alt-btn").addEventListener("click", myFunction);

function myFunction(){
  console.log('HELLO');
}

document.getElementById("comm-btn").addEventListener("click", sendRequest);

function sendRequest() {
  console.log("Sending request");
  var req = new XMLHttpRequest();
    req.open("GET", "http://www.google.com/search?hl=en&q=ajax", true);
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
