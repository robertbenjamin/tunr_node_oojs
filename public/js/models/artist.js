var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
}

Artist.fetch = function(){
  $.ajax({
     type: 'GET',
     dataType: 'json',
     url: "http://localhost:3000/artists"
   }).done(function(response) {
     artists = []
     for(var i = 0; i < response.length; i++){
       artists.push(new Artist(response[i]))
     }
   }).fail(function(response){
     console.log("js failed to load")
   })
}
