document.getElementsByClassName("btn btn-primary js-tooltip")[0].addEventListener("click", clickFunc);

function clickFunc(){
  var str = document.querySelectorAll("span.str");
  var ref_token = str.item(1).innerText.replace(/['"]+/g, '');
  var acs_token = str.item(3).innerText.replace(/['"]+/g, '');
  var json = {"refresh": ref_token, "access": acs_token};
  return json;
}

chrome.runtime.sendMessage({
  action: "getCheck",
  source: clickFunc(),
});
