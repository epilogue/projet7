/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var iconResto ={ url  :'http://localhost:8383/googleMapsProject/img/icons/utensils.png',
                    scaledSize :new google.maps.Size(25,25),
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
    }
    calculMoyenne(){
        var moy=0;
         
        for(var note of this.ratings){
          
            moy += parseFloat(note.stars);
//             this.moyenne += note;
            moy = parseFloat((moy/this.ratings.length).toFixed(1));
        }
        this.moyenne = moy;
       
   }
    ajoutMarker(){
        this.marker = new google.maps.Marker({
            position :{lat :this.lat,lng:this.long},
            map:macarte,
            title:this.nom,
            icon:iconResto,
            id:this.id
            });
    }
    ajoutPopup(){
        var contenuPopup = this.nom +" : "+this.moyenne+"/5";
         this.popup= new google.maps.InfoWindow({
            content:contenuPopup,
            maxWidth: 300,
            maxHeight:100,
            id :this.id
        });
        
    }
    ajoutEvenementClick(){
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
           $("li.opened").css('display','none'); });
    }
    ajoutVisuel(){
        this.visuel = "'https://maps.googleapis.com/maps/api/streetview?size=200x100&location="+this.lat+","+this.long+"&fov=80&heading=70&pitch=0&key="+ apiKey +"'";
    }
    ajoutCommentaire(){
        
    }
}