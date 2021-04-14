window.addEventListener('load', parsing);
function parsing(){
    var username = localStorage.getItem("username");
    var sust = localStorage.getItem("susttier");
    var sust_tier;
    if(sust != null){
        sust_tier = "seedling";
    }
    var path="";
    if(sust_tier.localeCompare("blossom")==0){
        path = "avatars/blossom.png"
    }
    else if(sust_tier.localeCompare("garden")==0){
        path = "avatars/garden.png"
    }
    else if(sust_tier.localeCompare("mother-earth")==0){
        path = "avatars/mother-earth.png"
    }
    else if(sust_tier.localeCompare("rose-bud")==0){
        path = "avatars/rose-bud.png"
    }
    else if(sust_tier.localeCompare("seed-packet")==0){
        path = "avatars/seed-packet.png"
    }
    else if(sust_tier.localeCompare("sprout")==0){
        path = "avatars/sprout.png"
    }
    else{
        path = "generic-user.png"
    }
    console.log(path);
    document.getElementById("user-name").innerText = username;
    document.getElementById("sust-tier").innerText = sust_tier;
    document.getElementById("user-avatar").src = path;
}