class RenduRestaurant {

    constructor(parent){
        this.parent = parent;
    }
   
    /* function qui affiche les infos d'un resto*/
    afficheMoi(){
        var restaurant = collectionRestaurant[this.parent];
        if(restaurant.distanceUser > maxDistance) {
            return;
        }
        var commentaire = [];
        for(var co of restaurant.ratings){
             commentaire +="<li class='commentaireResto' > note : "+co.stars + "/5 <br> "+co.comment+"</li>";
        }
        var monTrucResto = "<ul id='"+restaurant.id+"'>\n\
                                <li data-stars='"
                                + restaurant.moyenne +
                                "'> <span class='nomResto'></span>"
                                + restaurant.nom +
                                " <br><span class ='jq-stars' ></span></li>\n\
                                 <li class='image'><img src="+restaurant.visuel +"/></li>"
                                + commentaire +
                                "\n\</ul>";
        if($("#listeResto ul#"+restaurant.id).length > 0) {
           $("#listeResto ul#"+restaurant.id).replaceWith(monTrucResto);
        } else {
           $("#listeResto").append(monTrucResto);
        }
        $("#"+restaurant.id+" li span.jq-stars").starRating({
            initialRating: restaurant.moyenne,
            strokeColor: '#894A00',
            strokeWidth: 10,
            starSize:25
        });
        restaurant.clickListe();

    }

    static testClose() {
        var id = $(".AjoutCom").data('id');
        var newCom = $("#AjoutAvisForm").val();
        var newNote = $("#AjoutNoteForm").val();
        collectionRestaurant[id].ajoutCommentaire(id,newCom,newNote);
        afficheDetail(id);
        
        $("#FormAvis").trigger("reset");
        $("#modalAjoutCom").modal("hide");
    }
    
    static ajoutRestoMapClose() {
        var id = collectionRestaurant.length;
        var nom=$("#NomFormMarker").val();
        var com = $("#AvisFormMarker").val(); 
        var adresse =$('#AdresseFormMarker').val() ;
        var note = parseInt($("#NoteFormMarker").val());        
        var ratings =[{"stars":note,"comment":com}];
        var lat = parseFloat($("#LatFormMarker").val()) ;
        var long = parseFloat($("#LongFormMarker").val()) ;

        var restoMap = new Restaurant(id,nom,adresse,lat,long,ratings); 
        restoMap.initRestoSolo();
        $("#FormRestoMarker").trigger("reset");
        $("#modalAjoutResto").modal("hide");
    }
}
                                      
/*function pour cacher ou voir les commentaires et notes  en fonction au click  sur le marker du restaurant*/
function afficheDetail(idRestaurant){
    $("li.commentaireResto").removeClass('opened','opened')
                            .css("display","none");
    $("li.image").css("display","none")
                 .removeClass('opened','opened');
    $("#"+idRestaurant+" li.commentaireResto").css("display","block")
                                              .addClass('opened','opened');
    $("#"+idRestaurant+" li.image").css("display","block")
                                   .addClass('opened','opened');
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
                    if(currentPopup !==null){
                         currentPopup.close();
                    }
                   
                    $("li.opened").css('display','none');
                    showResto(minEtoiles, maxEtoiles); 
                }
        });
    $( "#nbreEtoile" ).val( "étoile" + $( "#slider-range" ).slider( "values", 0 ) +
      " - étoile" + $( "#slider-range" ).slider( "values", 1 ) );
               
    });
    
     
}

function showResto(minEtoiles,maxEtoiles){
    $("#listeResto li[data-stars]").filter(function(){
        var idResto = parseInt($(this).parent().attr('id'));
        var markerEtoile = collectionRestaurant[idResto].marker;
        var etoile = parseFloat($(this).data("stars"));

        if(etoile >=minEtoiles && etoile<=maxEtoiles){
            $(this).show(); 
             markerEtoile.setVisible(true);
        }else{
            $(this).hide();markerEtoile.setVisible(false);
        }
    });
}


