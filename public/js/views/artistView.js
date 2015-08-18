var ArtistView = function(artist){
  this.artist = artist;
}

ArtistView.prototype = {
  render: function(){
    var $el = $("<div class='artist'><div>")
    $el.append("<h3>" + this.artist.name + "</h3>");
    $(".artists").append($el)
  }
}
