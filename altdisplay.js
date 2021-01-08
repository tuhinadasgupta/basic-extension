window.onload = onWindowLoading;
function onWindowLoading(){
    chrome.storage.local.get('company', function (result) {
        var write = document.getElementById("write-to");
        console.log(result.company);
        write.innerText = result.company;
    });
}
document.getElementById("yelp").addEventListener("click", yelpSearch);
function yelpSearch(){
    console.log("here");
    const API_KEY = "xTZ919YYvEM8Vkbokanma_70T7M30ojZbKRP1uA8RznY87MnOaPv9KKaMWnqxeSTfKouV3xnyBUVP-7djTK6xkI7dXQZInsp3KzNphRif-_0uDIv3dbgqb4FWzr1X3Yx";
    var req = new XMLHttpRequest();
    req.open("GET", "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", true);
    req.setRequestHeader("Authorization", 'Bearer'+ API_KEY);
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          alert(JSON.stringify(req.response));
          document.write("OK");
        }
      }
    };
}