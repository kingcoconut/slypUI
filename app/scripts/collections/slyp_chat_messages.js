define(["marionette", "models/slyp_chat_message"], function(Marionette, SlypChatMessage){
  var slypChatMessages = Backbone.Collection.extend({
  	model: SlypChatMessage
  });
  return slypChatMessages
});