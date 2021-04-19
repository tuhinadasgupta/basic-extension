window.addEventListener('load', parsing);
function parsing(){
    console.log(localStorage.getItem("details"));
    var companyId = localStorage.getItem("details");
    var data;
    var sust_score; 
    if(companyId.localeCompare("company1")==0){
        data = JSON.parse(localStorage.getItem("company1"));
        sust_score = 12;
    }
    else if(companyId.localeCompare("company2")==0){
        data = JSON.parse(localStorage.getItem("company2"));
        sust_score = localStorage.getItem("sustscore2");
    }
    else if(companyId.localeCompare("company3")==0){
        data = JSON.parse(localStorage.getItem("company3"));
        sust_score = localStorage.getItem("sustscore3");
    }

    // visual stoplight
    if(sust_score<= 33 && sust_score>= 0){
        //red 
        document.getElementById("sust-score").style.color = "red";
    }
    else if(sust_score<= 66 && sust_score>= 34){
        // yellow
        document.getElementById("sust-score").style.color = "yellow";
    }
    else if(sust_score<= 100 && sust_score>= 67){
        // green
        document.getElementById("sust-score").style.color = "green";
    }

    console.log(data);
    document.getElementById("company-name").innerText = data.name;
    document.getElementById("star-count").innerHTML = data.stars + '<i class="far fa-star"></i>';
    document.getElementById("dollar-count").innerHTML = data.price;
    document.getElementById("company-address").innerHTML = '<i class="fas fa-map-marker-alt" id="location-marker"></i> ' + data.address;
    document.getElementById("url").href = data.url;

    document.getElementById("sust-score").innerText = "Sustainability Score: " + sust_score;
}