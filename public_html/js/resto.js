/*
 * créé par Epilogue
 *  04Decembre 2020
 *  version : 1.0
 */
/*création de l'icone */


var currentPopup=null;
var collectionRestaurant=[];

function initResto(restos){
    $(restos).each(function(i, resto){
        var restoC=new Restaurant(i,resto.restaurantName,resto.address,resto.lat,resto.long,resto.ratings);
        restoC.initRestoSolo();
    });
}

function initRestoMap(resultSearchMap){
    $(resultSearchMap).each(function(i,restoMap){
        var restoPlaceId = restoMap.place_id;
        var restoFields = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+restoPlaceId+"&fields=rating,photo,reviews&key="+apiKey+"";
        var mesInfosValables = [];
        $.getJSON(restoFields,function(data){
            if(data.result.hasOwnProperty('reviews')){
                for(var rating of data.result.reviews) {
                    mesInfosValables.push({'stars': rating.rating, 'comment': rating.text})
                }
                var latRestoMap = restoMap.geometry.location.lat();
                var longRestoMap = restoMap.geometry.location.lng(); 
                var restoM = new Restaurant(collectionRestaurant.length, restoMap.name,restoMap.vicinity,latRestoMap,longRestoMap,mesInfosValables);
                
                restoM.initRestoSolo();
            }
        });
    });   
};
