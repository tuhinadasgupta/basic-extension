document.getElementById("alt-btn").addEventListener("click", myFunction);

function myFunction(){
  console.log('HELLO');
}

let xhr = new XMLHttpRequest();
xhr.open('GET', "http://pachira.eba-dsv6itc5.us-west-2.elasticbeanstalk.com/", true);
xhr.send("10");

xhr.onreadystatechange = processRequest;

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response)
  }
  console.log('Hi')
}