define(["marionette", "models/slyp_chat"], function(Marionette, SlypChat){
  var SlypChats = Backbone.Collection.extend({
  	url: window.apiHost +  "/slyp_chats",
  	model: SlypChat
  });
  return SlypChats
});