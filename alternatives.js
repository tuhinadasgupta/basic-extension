function logSubmit(event){
    var altCompany = event.submitter.innerText; 
    console.log(altCompany); //name of alternative company
    chrome.storage.local.set({'company' : altCompany}, function(){});
}
const form = document.getElementById("alt-form");
form.addEventListener('submit', logSubmit);
