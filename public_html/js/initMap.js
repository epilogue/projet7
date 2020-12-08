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
        zoom: 16, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
        }                 
    );
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
        });
    });
    google.maps.event.addListener(macarte, 'click', function (event) {
        var coords1 = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        var coords =coords1.toJSON();
        var lat =(coords.lat).toString();
        var long = (coords.lng).toString();
        var geocoder = new google.maps.Geocoder;
            var latlng = new google.maps.LatLng(lat, long);

            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if(status == google.maps.GeocoderStatus.OK) {
                    if(results[0]) {
                        var address =results[0].formatted_address;
                    } else {
                        alert("pas d'adresse");
                    }
                } else {
                    var error = {
                        'ZERO_RESULTS': 'pas de résultat'
                    }
                
            $('#address_new').html('<span class="color-red">' + error[status] + '</span>');
        } $('#modalAjoutResto #AdresseFormMarker').val(address);
});
        

       
        $('#modalAjoutResto #LatFormMarker').val(lat);
        $('#modalAjoutResto #LongFormMarker').val(long);
        $('#modalAjoutResto').modal().show();
    });
    var userPosition = new google.maps.LatLng(lat,lon);
    var service;
    var request = {
        location:userPosition,
        radius : '1200',
        type :['restaurant']
    };
   service = new google.maps.places.PlacesService(macarte);

    service.nearbySearch(request, callback);
    function callback(results,status){
        if (status == google.maps.places.PlacesServiceStatus.OK){
             initRestoMap(results);
        }
    }
}   
 
