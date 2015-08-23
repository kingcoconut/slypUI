define(["marionette", "models/user"], function(Marionette, User){
  var users = Backbone.Collection.extend({
    url: window.apiHost + "/users/friends",
    model: User,
    initialize: function(options){
    	this.on("add", this.propagateIcon, this);
    },
    getEmails: function(){
      return $.map(this.models, function(user){ return user.get('email') });
    },

    // this propagates to new users icon to all the slyps
    // 		=> it is added to their excluded_friends list
    propagateIcon: function(model, collection, options){
    	this.trigger("addIcon", model.iconAttributes());
    }
  });
  return users
});