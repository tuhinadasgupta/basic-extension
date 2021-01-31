window.addEventListener('load', parsing);
function parsing(){
    console.log("here");
    var data = {
        name: "Walgreens",
        address: "1234 Drive Rd Cupertino, CA",
        price: 2, // number of dollar signs
        stars: 3, // rating: number of stars 
        url: "https://en.wikipedia.org/wiki/Pachira",
    };
    
    document.getElementById("company-name").innerText = data.name;
    document.getElementById("star-count").innerHTML = data.stars + '<i class="fa fa-star"></i>';
    document.getElementById("dollar-count").innerHTML = data.price + '<i class="fa fa-usd"></i>';
    document.getElementById("company-address").innerHTML = '<i class="fa fa-map-marker" id="location-marker"></i>' + data.address;
    document.getElementById("url").href = data.url;
}