$(document).ready(function(){
    if(!navigator.geolocation){
        
        alert("votre navigateur ne prend pas en charge la géolocalisation");
    }
    else{
    navigator.geolocation.getCurrentPosition(success,error);
    }
    /* function qui lance l'initialisation de la carte  et placement resto utilisateur  si  geolocalisation ok*/
    function success(position) {
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       /*initialisation carte+utilisateur*/
       initMap(lat,lon);
       /*initialisation resto*/
       $.getJSON("data/resto.json",function(json){
            initResto(json);
           
        });
    }
    function error(){
        alert("veuillez activer la géolocalisation");
    } 



});


