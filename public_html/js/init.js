//$(document).ready(function(){
//    console.log('lorène');
//});
$(document).ready(function(){
   /*geolocalisation de l'utilisateur */
   /* vérifier que la geolocalisation est activée
    * si la géolocalisation est activée récupérer les coordonnées de l'utilisateur 
    * si le navigateur ne prend pas en charge la geolocalisation
    * si l'utilisateur refuse d'activer la géolocalisation alors le placer automatiquement au centre de la carte  
    * */
   const defaut={ centre: { lat: 48.852969, lon: 2.349903}};
 
   //const textInfoGeoloc = $('# textInfoGeoloc');
   if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(succes,erreur);
   }else{
        $('#textInfoGeoloc').text("votre navigateur ne prend pas en charge la géolocalisation");
   }
   function succes(position){
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       initMap(lat,lon);
       /*initialisation resto*/
        $.getJSON("data/resto.json",function(json){
//           initResto(json);
           initRestoBis(json);
        });
        $.getJSON("data/apiKey.json",function(json){
           $(json).each(function(i, api){
              var apiKey= api.googleApiKey;
           });
        });
        rangeSlider();
   }
   
   function erreur(){
        $('#textInfoGeoloc').text("impossible de vous géolocaliser");
        /*position par defaut */
        var lat = defaut.centre.lat;
        var lon = defaut.centre.lon;
        initMap(lat,lon);
   }
});


