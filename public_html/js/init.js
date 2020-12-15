$(document).ready(function(){
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
        /*récupération des coordonnées de l'utilisateur*/
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        userPos.lat = lat;
        userPos.long = lon;
        initMap(lat,lon);
        /*initialisation resto*/
        $.getJSON("data/resto.json",function(json){
            initResto(json);
        });
        /*récupération api key pour les images*/
        $.getJSON("data/apiKey.json",function(json){
            $(json).each(function(i, api){
                var apiKey= api.googleApiKey;
            });
        });
        /* appel du filtre*/
        rangeSlider(); 
    }
  
    function erreur(){
        alert("vous n'avez pas accepté d'être géolocalisé, la carte sera centrée par défaut sur Paris");
        /*position par défaut */
        var lat = defaut.centre.lat;
        var lon = defaut.centre.lon;
        userPos.lat = lat;
        userPos.long = lon;
        initMap(lat,lon);
        /*initialisation resto*/
        $.getJSON("data/resto.json",function(json){
            initResto(json);
        });
        /*récupération api key pour les images*/
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
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode( { 'address':  $("#AdresseFormMarker").val()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) { 
                $("#LatFormMarker").val(results[0].geometry.location.lat());
                $("#LongFormMarker").val(results[0].geometry.location.lng());
            } 
            RenduRestaurant.ajoutRestoMapClose();
        });   
    });   
    $("#validDistance").click(function(e){
        e.preventDefault();
        maxDistance=parseInt($("#choixDistance").val());

        $(collectionRestaurant).each(function (i, restaurant) {
            var idResto = parseInt(restaurant.id    );
            if(typeof restaurant.marker != 'undefined') {
                var marker = restaurant.marker;
                marker.setVisible(false);
            } 
            $("ul#"+idResto+" li").hide();
            delete collectionRestaurant[i]; 
        });
        collectionRestaurant = [];
        var userPosition = new google.maps.LatLng(userPos.lat,userPos.long);
        var service;
        var request = {
            location:userPosition,
            radius : maxDistance,
            type :['restaurant']
        };
        service = new google.maps.places.PlacesService(macarte);

        service.nearbySearch(request, function (results,status){
            if (status == google.maps.places.PlacesServiceStatus.OK){
                 initRestoMap(results);           
            }
        }); 
        $('#choixDistance').prop('selectedIndex',0);   
   });
   
});
   

