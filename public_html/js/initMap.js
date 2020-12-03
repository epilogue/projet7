var macarte = null;
 

/*Fonction d'initialisation de la carte*/

function initMap(lat,lon){
    // Création objet "macarte" et isertion dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    //récupération de la carte sur openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 10,
        maxZoom: 50
    }).addTo(macarte);
    //création du marqueur utilisateur et placcement sur la carte en fonction de la latitude et de la longitude récupérée
    var markerU = L.marker([lat,lon]).addTo(macarte);
}

/*fonction placement des restos  et marqueur personnalisé*/

function initResto(resto){
     /* function de filtre sur la note moyenne  entre x et y */
    $("#filtre").prepend("<p><label for='amont'>Filtrer les restaurants en fonction de leur étoiles</label><input type='text' id='amount'/></p><br><div id='slider-range'></div>");
    $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 1,
      max: 5,
      values: [ 1, 5 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "entre " + ui.values[ 0 ] +" étoile(s)" + " et " + ui.values[ 1 ]+" étoiles" );
      }
    });});
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
        /*ajout de l'id  du restaurant comme propriété du marqueur*/
        markerR.feature = {
            properties:{restoId :i}
        }; 
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
        $("#liste").append("<ul id='"+id+"'><span class='nomResto'>"+r.restaurantName+"</span>\n\
                                <li>"+r.address+"</li>\n\
                                <li><div class ='jq-stars'></div> </li>\n\
                            "+commentaire+"\n\
                            </ul>");
  
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
        $("#"+id+" li div.jq-stars").starRating({
        initialRating: moyenneRating,
        strokeColor: '#894A00',
        strokeWidth: 10,
        starSize:25
        });
        /*function qui permet devisualiser les commentaires  et note  du resto  sur lequel on clique à partir de la liste*/
        $("#"+id+" span.nomResto").click(function(){
            $("li.commentaireResto").removeClass('opened','opened');
            $("li.commentaireResto").css("display","none");
            $("#"+id+" li.commentaireResto").css("display","block");
            $("#"+id+" li.commentaireResto").addClass('opened','opened');
        });
       
       
    });
   
}


// à revoir  placement des restaurant par rapport à leurs adresse ca serait mieux 
