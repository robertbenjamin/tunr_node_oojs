var SongView = function(song){
  this.song = song;
}

SongView.prototype = {
  render: function(){
    var el = $("<p>" + this.song.title + "</p>");
    return(el)
  }
}
