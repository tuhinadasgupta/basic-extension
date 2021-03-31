window.addEventListener('load', parsing);
function parsing(){
    console.log(localStorage.getItem("details"));
    var companyId = localStorage.getItem("details");
    var data;
    var sust_score; 
    if(companyId.localeCompare("company1")==0){
        data = JSON.parse(localStorage.getItem("company1"));
        sust_score = localStorage.getItem("sustscore1");
    }
    else if(companyId.localeCompare("company2")==0){
        data = JSON.parse(localStorage.getItem("company2"));
        sust_score = localStorage.getItem("sustscore2");
    }
    else if(companyId.localeCompare("company3")==0){
        data = JSON.parse(localStorage.getItem("company3"));
        sust_score = localStorage.getItem("sustscore3");
    }
    console.log(data);
    document.getElementById("company-name").innerText = data.name;
    document.getElementById("star-count").innerHTML = data.stars + ' <i class="fa fa-star"></i>';
    document.getElementById("dollar-count").innerHTML = data.price + ' <i class="fa fa-usd"></i>';
    document.getElementById("company-address").innerHTML = '<i class="fa fa-map-marker" id="location-marker"></i> ' + data.address;
    document.getElementById("url").href = data.url;

    document.getElementById("sust-score").innerText = "Sustainability Score: " + sust_score;
}