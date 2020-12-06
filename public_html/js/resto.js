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
var restaurantcol = [];
var collectionRestaurant=[];
/* créer un objet restaurant global  qui  prend  resto + markerR + popup*/
function initRestoBis(restos){
    $(restos).each(function(i, resto){
        var restoC=
//                [
            new Restaurant(i,resto.restaurantName,resto.address,resto.lat,resto.long,resto.ratings)
//        ]
        ;
        restoC.calculMoyenne();
        restoC.ajoutMarker();
        restoC.ajoutPopup();
        restoC.ajoutEvenementClick();
        restoC.fermetureClick();
        restoC.ajoutVisuel();
        
        collectionRestaurant.push(restoC); 
        

    });
   
   afficheListe();
     
    
}
//function initResto(restos){
//    
//    $(restos).each(function(i, resto){
      

//         /*function qui permet devisualiser les commentaires  et note  du resto  sur lequel on clique à partir de la liste*/
//        $("ul#"+id+" ").click(function(){
//            $("li.commentaireResto").removeClass('opened','opened');
//            $("li.commentaireResto").css("display","none");
//            $("li.image").css("display","none");
//            $("li.image").removeClass('opened','opened');
//            $("#"+id+" li.commentaireResto").css("display","block");
//            $("#"+id+" li.commentaireResto").addClass('opened','opened');
//            $("#"+id+" li.image").css("display","block");
//            $("#"+id+" li.image").addClass('opened','opened');
//        });
//    });
 
    
    
 /* function de filtre sur la note moyenne  entre x et y */
     
//    console.log(restaurantcol);
//}
//

