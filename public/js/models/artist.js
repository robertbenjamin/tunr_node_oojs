var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id;
};

Artist.fetch = function(){
  var request = $.getJSON("http://localhost:3000/artists")
  .then(function(response) {
    var artists = [];
    for(var i = 0; i < response.length; i++){
      artists.push(new Artist(response[i]));
    }
    return artists;
    })
  .fail(function(response){
      console.log("js failed to load");
    });
  return request;
};

Artist.prototype.fetchSongs = function(){
  var url = "http://localhost:3000/artists/" + this.id + "/songs";
  var request = $.getJSON(url)
  .then(function(response){
    var songs = [];
    for(var i = 0; i < response.length; i++){
      songs.push(new Song(response[i]));
    }
    return songs;
   })
  .fail(function(repsonse){
    console.log("js failed to load");
  });
  return request;
};

Artist.prototype.update = function(artistData) {
  var self = this;

  var url = "http://localhost:3000/artists/" + this.id;
  var request = $.ajax({
    url: url,
    method: "patch",
    data: JSON.stringify(artistData),
    contentType : 'application/json'
  }).then(
    function(updatedArtistInfo) {self.reload(updatedArtistInfo);}
  );
  return request;
};

Artist.prototype.destroy = function() {
  var url = "http://localhost:3000/artists/" + this.id;
  var request = $.ajax( {url: url, method: "delete"} );
  return request;
}

Artist.prototype.reload = function(newData){
  for(var attrname in newData) {
    this[attrname] = newData[attrname];
  }
};
