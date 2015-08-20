var newArtistView = function(artist){
  var self = this;
  self.$el = $(".newArtistView");
  self.$el.find("form").hide();

  var showFormButton    = self.$el.find(".addArtist");
  var submitFormButton  = self.$el.find(".createArtist");

  showFormButton.on("click", function() {
    self.$el.find("form").slideToggle();
  });

  submitFormButton.on("click", function(event) {
    event.preventDefault();
    self.createArtist();
  });

};

newArtistView.prototype = {
  createArtist: function() {
    var self = this;
    var data = {  name:     self.$el.find('input[name=name]').val(),
                  photoUrl: self.$el.find('input[name=photoUrl]').val() };

    Artist.create(data).then(function(newArtist) {
      self.$el.find("input").val();  // clear the inputs
      self.$el.find("form").hide();  // hide the form

      var view = new ArtistView(newArtist); // create the new artist view (renders)
    });
  }
};
