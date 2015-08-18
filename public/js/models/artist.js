var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
}

Artist.fetch = function(){
  var request = $.getJSON("http://localhost:3000/artists").then(function(response) {
    var artists = []
    for(var i = 0; i < response.length; i++){
      artists.push(new Artist(response[i]))
    }
    return artists
    }).fail(function(response){
      console.log("js failed to load")
    })
  return request
}
