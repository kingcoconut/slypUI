define(["marionette", "models/user"], function(Marionette, User){
  var users = Backbone.Collection.extend({
    model: User,
    chatRead: function(slypChatID){
    	_.each(this.models, function(user){
    		if(user.get("slyp_chat_id") == slypChatID){
    			user.set("unread_messages", 0)
    		}
    	});
    }
  });
  return users
});