var ArtistView = function(artist){
  this.artist = artist;
  this.click = 0
}

ArtistView.prototype = {
  toggleSongs: function(songsDiv){
    button = songsDiv.siblings("button")
    if(songsDiv.children().length){
      // toggle display
      if(songsDiv.css("display") == "none"){
        songsDiv.show();
        songsDiv.siblings("button").text("Hide songs")
      }
      else{
        songsDiv.hide();
        songsDiv.siblings("button").text("Show Songs");
      }

    }
    else{
      var self = this
      // fetch and show
      this.artist.fetchSongs().then(function(songs){
        self.appendSongs(songs, songsDiv);
      });
      songsDiv.siblings("button").text("Hide Songs")
    }
  },
  appendSongs: function(songs, songsDiv){
    songs.forEach(function(song){
      var songView = new SongView(song);
      songsDiv.append(songView.render())
    })
  },
  render: function(){
    var self = this
    var artist = this.artist
    var $el = $("<div class='artist'><div>")
    $el.append("<h3>" + artist.name + "</h3>");
    $el.append("<img class='artist-photo' src='" + artist.photoUrl + "'>")
    $el.append("<button class='showSongs'>Show Songs</button>")
    $el.append("<div class='songs'></div>")
    $(".artists").append($el)
    var showButton = $el.find(".showSongs")
    showButton.on("click", function(){
      self.toggleSongs($(this).siblings("div.songs"))
    })
  }
}
