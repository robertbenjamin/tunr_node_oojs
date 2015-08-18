var ArtistView = function(artist){
  this.artist = artist;
  this.click = 0
}

ArtistView.prototype = {
  toggleButton: function(songsDiv){
    if(songsDiv.is(":visible")){
      songsDiv.siblings("button").text("Hide Songs");
    } else {
      songsDiv.siblings("button").text("Show Songs")
    }
  },
  toggleSongs: function(songsDiv){
    var self = this
    // if not in DOM, populate
    if(songsDiv.children().length == 0){
      this.artist.fetchSongs().then(function(songs){
        self.appendSongs(songs, songsDiv);
      });
    }
    // toggle (note: songsDiv starts hidden)
    songsDiv.toggle();
    this.toggleButton(songsDiv);
  },
  appendSongs: function(songs, songsDiv){
    songs.forEach(function(song){
      var songView = new SongView(song);
      songsDiv.append(songView.render())
    })
  },
  render: function(){
    var self = this
    var $el = this.artistTemplate(this.artist)
    $(".artists").append($el)
    var showButton = $el.find(".showSongs")
    var songsDiv = $el.children("div.songs")
    songsDiv.hide() // hide div until its populated with songs
    showButton.on("click", function(){
      self.toggleSongs(songsDiv)
    })
  },
  artistTemplate: function(artist){
    var el = $("<div class='artist'><div>")
    el.append("<h3>" + artist.name + "</h3>");
    el.append("<img class='artist-photo' src='" + artist.photoUrl + "'>")
    el.append("<button class='showSongs'>Show Songs</button>")
    el.append("<div class='songs'></div>")
    return(el)
  }
}
