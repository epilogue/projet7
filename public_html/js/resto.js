/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var restaurantMarker=[];

function initResto(resto){

//  création  du marqueur personnalisé pour resto
    var restoMarker = L.AwesomeMarkers.icon({
        icon:'utensils',
        prefix: 'fa',
        markerColor:'red',
        spin:false
    });
  
    //on boucle sur les données du fichier json pour créer la liste  et placer les restos sur la carte  en fonction de leurs latitude et longitude
    $.each(resto, function(i, r){
        /*creation du marqueur pour les restos*/
        var markerR = L.marker([r.lat, r.long], {icon:restoMarker}).addTo(macarte);
       
          restaurantMarker.push(markerR);
        /*ajout de l'id  du restaurant comme propriété du marqueur*/
        markerR.feature = {properties:{restoId :i}}; 
        var id =markerR.feature.properties.restoId;
        var moyenneRating =0;/*moyenne note*/
        var comment=[];/*tableau des commentaires*/
        var commentaire="";/*commentaires*/
        /*pour chaque resto on fait la somme des notes et on ajoute les commentaires et les notes dans le tableau comment*/
        for(var rat of(r.ratings)){
            moyenneRating+=Number(rat['stars']);
            comment.push("note: "+rat.stars+"/5",rat.comment);   
        }
        /* on calcule la moyenne */
        moyenneRating =(moyenneRating /r.ratings.length).toFixed(1);
        /*  pour chaque resto code html pour affichage  ligne par ligne des commentaires et notes */
        for(var co of(comment)){
            commentaire +="<li class='commentaireResto' id='"+id+"'>"+co+"</li>";
        }
        /* affichage de la liste */
        $("#listeResto").append("<ul id='"+id+"'>\n\
                                <li data-stars='"
                                + moyenneRating +
                                "'> <span class='nomResto'></span>"
                                + r.restaurantName +
                                "<span class ='jq-stars' ></span>"
                                + commentaire +
                                "</li>\n\</ul>");
  
        markerR.bindPopup("<p>"+r.restaurantName+"</p>");
        /* function qui permet de visualiser les commentaires  et note  du resto  sur lequel on clique à partir de la carte*/
        function afficheDetail(e){
           
            $("li.commentaireResto").removeClass('opened','opened');
            $("li.commentaireResto").css("display","none");
            var id=markerR.feature.properties.restoId;
            $("#"+id+" li.commentaireResto").css("display","block");
            $("#"+id+" li.commentaireResto").addClass('opened','opened');
            
        }
       /* appelle de la fonction pour l'affichage à partir de la function click du marqueur*/
        markerR.on('click',afficheDetail);
        /* affichage des étoiles en fonction de la note moyenne*/
        $("#"+id+" li span.jq-stars").starRating({
        initialRating: moyenneRating,
        strokeColor: '#894A00',
        strokeWidth: 10,
        starSize:25
        });
        /*function qui permet devisualiser les commentaires  et note  du resto  sur lequel on clique à partir de la liste*/
        $("ul#"+id+" ").click(function(){
            $("li.commentaireResto").removeClass('opened','opened');
            $("li.commentaireResto").css("display","none");
            $("#"+id+" li.commentaireResto").css("display","block");
            $("#"+id+" li.commentaireResto").addClass('opened','opened');
        });
       
 
    });
    function showResto(minEtoiles,maxEtoiles){
        $("#listeResto li[data-stars]").filter(function(){
            var idResto = parseInt($(this).parent().attr('id'));
            var etoile = parseInt($(this).data("stars"));
            restaurantMarker[idResto].remove();
            if(etoile >=minEtoiles && etoile<= maxEtoiles){
                $(this).show(); 
               restaurantMarker[idResto].addTo(macarte);
            }else{
                $(this).hide();
            }
        });
    }

    /* function de filtre sur la note moyenne  entre x et y */
    $("#filtre").prepend("<div class='slider' id='filtres'></div>");
    $(function() {
        var options = {
            range: true,
            min: 1,
            max: 5,
            values: [ 1, 5 ],
            change: function( event, ui ) {
                var minEtoiles = ui.values[0];
                var maxEtoiles = ui.values[1];
                showResto(minEtoiles, maxEtoiles); 
            }
        };
        $( "#filtres" ).slider(options);
    });  
}
