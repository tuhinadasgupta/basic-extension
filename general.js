document.getElementById("back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}

document.getElementById("close-btn").addEventListener("click", closeWindow);
function closeWindow() {
  window.close('','_parent','');
}