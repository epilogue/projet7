$(document).ready(function(){
   /*geolocalisation de l'utilisateur */
   /* vérifier que la geolocalisation est activée
    * si la géolocalisation est activée récupérer les coordonnées de l'utilisateur 
    * si le navigateur ne prend pas en charge la geolocalisation
    * si l'utilisateur refuse d'activer la géolocalisation alors le placer automatiquement au centre de la carte  
    * */
   jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


   const defaut={ centre: { lat: 48.852969, lon: 2.349903}};
   
   if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(succes,erreur);
   }else{
       alert("votre navigateur ne prend pas en charge la géolocalisation");
   }
   function succes(position){
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       userPos.lat = lat;
       userPos.long = lon;
       initMap(lat,lon);
      /*initialisation resto*/
      // travail a faire sur le fichier json pour que n'apparaissent sur la carte  que les restaurants dans le perimetre de l'utilisateur
        $.getJSON("data/resto.json",function(json){
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
       alert("vous n'avez pas accepté d'être géolocalisé, la carte sera centrée par défaut sur Paris");
        /*position par defaut */
        var lat = defaut.centre.lat;
        var lon = defaut.centre.lon;
        userPos.lat = lat;
        userPos.long = lon;
        initMap(lat,lon);
        $.getJSON("data/apiKey.json",function(json){
            $(json).each(function(i, api){
              var apiKey= api.googleApiKey;
            });
        });
         rangeSlider();
   }
   $("#btnValid").click(function(e){
       e.preventDefault();
       RenduRestaurant.testClose();
   });
   $("#btnValidFormMarker").click(function(e){
       e.preventDefault();
       $("#AdresseFormMarker").attr('disabled',false);
        $("#LatFormMarker").attr('disabled',false);
         $("#LongFormMarker").attr('disabled',false);
       RenduRestaurant.ajoutRestoMapClose();
   });   
});


