/*function pour afficher la liste  des restos,leur moyenne,le visuel de la moyenne (étoiles) leur visuel et les commentaires et notes  */
function afficheListe(){
    var commentaire = [];
    $(collectionRestaurant).each(function(i,restaurant){
       
         for(var co of restaurant.ratings){
             commentaire +="<li class='commentaireResto' id='"+this.id+"'> note : "+co.stars + "/5 <br> "+co.comment+"</li>";
        }
        $("#listeResto").append("<ul id='"+restaurant.id+"'>\n\
                                <li data-stars='"
                                + restaurant.moyenne +
                                "'> <span class='nomResto'></span>"
                                + restaurant.nom +
                                " <br><span class ='jq-stars' ></span></li>\n\
                                 <li class='image'><img src="+restaurant.visuel +"/></li>"
                                + commentaire +
                                "\n\</ul>"
                                ); 
        $("#"+restaurant.id+" li span.jq-stars").starRating({
        initialRating: restaurant.moyenne,
        strokeColor: '#894A00',
        strokeWidth: 10,
        starSize:25
        });
    }); 
}
/*function pour cacher ou voir les commentaires et notes  en fonction au click  sur le marker du restaurant*/
function afficheDetail(idRestaurant){
//            $(collectionRestaurant).each(function(i,restaurant){
            $("li.commentaireResto").removeClass('opened','opened');
            $("li.commentaireResto").css("display","none");
            $("li.image").css("display","none");
            $("li.image").removeClass('opened','opened');
            //var id=markerR.feature.properties.restoId;
            $("#"+idRestaurant+" li.commentaireResto").css("display","block");
            $("#"+idRestaurant+" li.commentaireResto").addClass('opened','opened');
            $("#"+idRestaurant+" li.image").css("display","block");
            $("#"+idRestaurant+" li.image").addClass('opened','opened');
//            }); 
        }       

function rangeSlider(){
    
     $("#filtre").prepend(
               "<label for='nbreEtoile'>filtrer les restaurants en fonction de leur nombre d'étoiles :</label>\n\
  <input type='text' id='nbreEtoile'readonly >\n\
             <div class='slider' id='slider-range'></div>");
      $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 1,
      max: 5,
      values: [ 1, 5 ],
      slide: function( event, ui ) {
          
        $( "#nbreEtoile" ).val( "étoile" + ui.values[ 0 ] + " - étoile" + ui.values[ 1 ] );
         
      },
      change: function( event, ui ) {
                var minEtoiles = ui.values[0];
                var maxEtoiles = ui.values[1];
                showResto(minEtoiles, maxEtoiles); 
            }
    });
    $( "#nbreEtoile" ).val( "étoile" + $( "#slider-range" ).slider( "values", 0 ) +
      " - étoile" + $( "#slider-range" ).slider( "values", 1 ) );
    
    
//      showResto(minEtoiles, maxEtoiles); 
                
  } );
}

function showResto(minEtoiles,maxEtoiles){
        $("#listeResto li[data-stars]").filter(function(){
            var idResto = parseInt($(this).parent().attr('id'));
            var markerEtoile = collectionRestaurant[idResto].marker;
            var etoile = parseInt($(this).data("stars"));
            
            if(etoile >=minEtoiles && etoile<= maxEtoiles){
                $(this).show(); 
                 markerEtoile.setVisible(true);
            }else{
                $(this).hide();markerEtoile.setVisible(false);
            }
        });
    }
