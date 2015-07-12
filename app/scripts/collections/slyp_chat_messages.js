define(["marionette", "models/slyp_chat_message"], function(Marionette, SlypChatMessage){
  var slypChats = Backbone.Collection.extend({
  	urlRoot: window.apiHost + "/slyp/chats/messages",
  	model: SlypChatMessage,

  	initialize: function(id){
  		this.url += "/" + id;
  	}
  });
  return slypChats
});