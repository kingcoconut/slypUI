define(["marionette"], function(){
  var userView = Backbone.Marionette.ItemView.extend({
    template: "#js-user-photos-tmpl",
    events: {
      "click .js-delete-cover-photo": "deleteCover",
      "click .js-delete-profile-photo": "deleteProfile"
    },
    modelEvents:{
      "change": "render"
    },
    deleteProfile: function(e){
      e.preventDefault();
      this.model.deleteProfilePhoto();
    },
    deleteCover: function(e){
      e.preventDefault();
      this.model.deleteCoverPhoto();
    }
  });

  return userView;
});