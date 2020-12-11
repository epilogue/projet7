var iconResto ={ url  :'/googleMapsProject/img/icons/restaurant.jpg',
                    scaledSize :new google.maps.Size(50,50),
                    origin : new google.maps.Point(0,0),
                    anchor : new google.maps.Point(25,50)
                };
/*creer la class  le constructeur ajouter les methodes  ajouter un marker ajouter un infowindow   créer un resto, ajouter un commentaire*/
class Restaurant {

    constructor(id,nom,adresse,lat,long,ratings,moyenne,visuel,marker,popup){
        this.id = id;
        this.nom = nom;
        this.adresse=adresse;
        this.lat = lat;
        this.long = long;
        this.ratings = ratings;
        this.moyenne = moyenne;
        this.visuel = visuel;
        this.marker = marker;
        this.popup = popup;
        this.rendu = new RenduRestaurant(id);
        this.distanceUser = Math.abs(distance(this.lat, this.long, userPos.lat, userPos.long, 'M'));
        //console.log(this.distanceUser);
    }
    
    calculMoyenne(){
        var moy=parseInt(0);
        for(var note of this.ratings){
            moy += parseInt(note.stars);
        }
        moy = parseFloat((moy/this.ratings.length).toFixed(1));
        this.moyenne = moy;  
    }
    
    ajoutMarker(){
        if(this.distanceUser <= maxDistance) {
            this.marker = new google.maps.Marker({
                position :{lat :this.lat,lng:this.long},
                map:macarte,
                title:this.nom,
                icon:iconResto,
                id:this.id
            });
        }
    }
    
    ajoutPopup(){
        var contenuPopup = "<h4>"+this.nom +"</h4> <br><button type='button' class='AjoutCom btn btn-info' data-toggle='modal' data-target='#modalAjoutCom' data-id='"+this.id+"'>Ajouter un avis</button>";
         this.popup= new google.maps.InfoWindow({
            content:contenuPopup,
            maxWidth: 300,
            maxHeight:100,
            id :this.id
        });    
    }
    
    ajoutEvenementClick(){
        if(typeof this.marker == 'undefined') {
            return;
        }
        this.marker.addListener("click", () => {
            if(currentPopup !== null){
                currentPopup.close(); 
                currentPopup=null;
            }
            this.popup.open(macarte, this.marker);
            currentPopup = this.popup;
            afficheDetail(this.id); 

        });
        return(currentPopup);
    }
    
    fermetureClick(){
        google.maps.event.addListener(this.popup,'closeclick',function(){
           $("li.opened").css('display','none');
        });
    }
    
    ajoutVisuel(){
        this.visuel = "'https://maps.googleapis.com/maps/api/streetview?size=200x100&location="+this.lat+","+this.long+"&fov=80&heading=70&pitch=0&key="+ apiKey +"'";
    }
    
    ajoutCommentaire(id,com,note){
        this.ratings.push({ stars: parseInt(note), comment: com});
        this.calculMoyenne();
        this.rendu.afficheMoi();
    }
    
    initRestoSolo(){
        this.calculMoyenne();
        this.ajoutMarker();
        this.ajoutPopup();
        this.ajoutEvenementClick();
        this.fermetureClick();
        this.ajoutVisuel();
        collectionRestaurant.push(this); 
        this.rendu.afficheMoi();
    }
}
