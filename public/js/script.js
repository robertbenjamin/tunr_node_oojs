$(document).ready(function(){
  Artist.fetch().then(function(artists){
    artists.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })
  new newArtistView();
});
