var SongView = function(song){
  this.song = song;
}

SongView.prototype = {
  render: function(){
    var song = this.song
    var $el = $("<p>" + song.title + "</p>");
    return($el)
  }
}
