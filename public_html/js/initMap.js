/*
 * créé par Epilogue
 *  03Decembre 2020
 *  version : 1.0
 */

var macarte=null;
var apiKey = null;
function initMap(lat,lon){
    /*initialisation de la carte */
    macarte = new google.maps.Map(document.getElementById("map"),{
        center: new google.maps.LatLng(lat,lon),
        zoom: 11, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
        }                 
    )
    /*initialisation du marqueur de l'utilisateur*/
    var markerU = new google.maps.Marker({
        position :new google.maps.LatLng(lat,lon),
        title:"vous etes ici"
    });
    /* placement du marqueur sur la carte*/
    markerU.setMap(macarte);
    /*recuperation de l'apiKey*/
   $.getJSON("data/apiKey.json",function(json){
               $(json).each(function(i, api){
                   apiKey= api.googleApiKey;
                  console.log(apiKey);
               });
          });
         

};
 