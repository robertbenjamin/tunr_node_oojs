var ArtistView = function(artist){
  this.artist = artist;
  this.click = 0;
  this.$el = $("<div class='artist'></div>");
  this.render();
  $(".artists").append(this.$el);
};

ArtistView.prototype = {
  toggleButton: function(songsDiv){
    if(songsDiv.is(":visible")){
      songsDiv.siblings("button.showSongs").text("Hide Songs");
    } else {
      songsDiv.siblings("button.showSongs").text("Show Songs");
    }
  },
  toggleSongs: function(songsDiv){
    var self = this;
    // if not in DOM, populate
    if(songsDiv.children().length === 0){
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
      songsDiv.append(songView.render());
    });
  },
  updateArtist: function() {
    var self = this;
    var data = {  name:     $('input[name=name]').val(),
                  photoUrl: $('input[name=photoUrl]').val() };
    this.artist.update(data).then(function() { self.render(); });
  },
  renderEditForm: function() {
    var self = this;
    self.$el.html(this.artistEditTemplate(this.artist));

    self.$el.find(".updateArtist").on("click", function() {
      self.updateArtist();
    });

    self.$el.find(".deleteArtist").on("click", function() {
      self.artist.destroy().then(function() { self.$el.fadeOut()});
    });
  },
  render: function(){
    var self = this;

    self.$el.html(self.artistTemplate(self.artist));

    var showButton = self.$el.find(".showSongs");
    var editButton = self.$el.find(".editArtist");
    var songsDiv   = self.$el.find("div.songs");

    songsDiv.hide(); // hide div until it's populated with songs

    showButton.on("click", function(){
      self.toggleSongs(songsDiv);
    });

    editButton.on("click", function() {
      self.renderEditForm();
    });
  },
  artistTemplate: function(artist){
    var html = $("<div>");
    html.append("<h3>" + artist.name + "</h3>");
    html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    html.append("<button class='showSongs'>Show Songs</button>");
    html.append("<button class='editArtist'>Edit Artist</button>");
    html.append("<div class='songs'></div>");
    return(html);
  },
  artistEditTemplate: function(artist) {
    var html = $("<div>");
    html.append("<input name='name' value='" + artist.name + "'>");
    html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    html.append("<input name='photoUrl' value='" + artist.photoUrl + "'>");
    html.append("<button class='updateArtist'>Update Artist</button>");
    html.append("<button class='deleteArtist'>Delete Artist</button>");
    return(html);
  }
};
