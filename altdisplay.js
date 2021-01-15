window.onload = onWindowLoading;
function onWindowLoading(){
    chrome.storage.local.get('company', function (result) {
        var write = document.getElementById("write-to");
        console.log(result.company);
        write.innerText = result.company;
    });
}