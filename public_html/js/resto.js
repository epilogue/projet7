/*
 * créé par Epilogue
 *  04Decembre 2020
 *  version : 1.0
 */
/*création de l'icone */

var iconResto ={ url  :'http://localhost:8383/googleMapsProject/img/icons/utensils.png',
                    scaledSize :new google.maps.Size(25,25),
                    origin : new google.maps.Point(0,0),
                    anchor : new google.maps.Point(25,50)
                };
                
var currentPopup=null;
var collectionRestaurant=[];
/* créer un objet restaurant global  qui  prend  resto + markerR + popup*/
function initRestoBis(restos){
    $(restos).each(function(i, resto){
        var restoC=new Restaurant(i,resto.restaurantName,resto.address,resto.lat,resto.long,resto.ratings);
        restoC.initRestoSolo();
    });
}
/*creer ine fonction redto solo  et l'utiliser dans initResto pour tous les restos du fichiers*/