/*
 * créé par Epilogue
 *  03Decembre 2020
 *  version : 1.0
 */
var iconU ={ url  :'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    scaledSize :new google.maps.Size(50,50),
                    origin : new google.maps.Point(0,0),
                    anchor : new google.maps.Point(25,50)
                };
var apiKey = null;
var macarte=null;
var userPos  = {'lat': 0, 'long': 0};
var maxDistance = 2000;
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
    }
    else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                    dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="M") { dist = (dist * 1.609344) * 1000 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
    }
}
function initMap(lat,lon){
    /*initialisation de la carte */
    macarte = new google.maps.Map(document.getElementById("map"),{
        center: new google.maps.LatLng(lat,lon),
        zoom: 16, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          }
        ]       
    });
  

    /*initialisation du marqueur de l'utilisateur*/
    var markerU = new google.maps.Marker({
        position :new google.maps.LatLng(lat,lon),
        title:"vous etes ici",
        icon:iconU
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
            } 
            $('#modalAjoutResto #AdresseFormMarker').val(address);
        });

        $('#modalAjoutResto #LatFormMarker').val(lat);
        $('#modalAjoutResto #LongFormMarker').val(long);
        $('#modalAjoutResto').modal().show();
    });
    var userPosition = new google.maps.LatLng(lat,lon);
    var service;
    var request = {
        location:userPosition,
        radius : maxDistance,
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
 
