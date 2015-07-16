define(["marionette", "models/user"], function(Marionette, User){
  var users = Backbone.Collection.extend({
    model: User
  });
  return users
});