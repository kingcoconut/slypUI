define(["marionette", "models/user"], function(Marionette, User){
  var users = Backbone.Collection.extend({
    url: window.apiHost + "/users/friends",
    model: User,
    getEmails: function(){
      return $.map(this.models, function(user){ return user.get('email') })
    }
  });
  return users
});