window.addEventListener('load', loadNames);
var com1;
var com2;
var com3;
function loadNames(){
    com1 = JSON.parse(localStorage.getItem("company1"));
    com2 = JSON.parse(localStorage.getItem("company2"));
    com3 = JSON.parse(localStorage.getItem("company3"));

    document.getElementById("btn1").innerHTML = '<span>' + com1.name + ' </span>';
    document.getElementById("btn2").innerHTML = '<span>' + com2.name + ' </span>';
    document.getElementById("btn3").innerHTML = '<span>' + com3.name + ' </span>';
}
function logSubmit(event){
    var nameWSpace = event.submitter.innerText; 
    var name = nameWSpace.trim();
    if(name.localeCompare(com1.name)==0){
        localStorage.setItem("details", "company1");
    }
    else if(name.localeCompare(com2.name)==0){
        localStorage.setItem("details", "company2");
    }
    else if(name.localeCompare(com3.name)==0){
        localStorage.setItem("details", "company3");
    }
    else{
        document.write(name);
    }
}
const form = document.getElementById("alt-form");
form.addEventListener('submit', logSubmit);
