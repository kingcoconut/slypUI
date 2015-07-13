define(["marionette", "collections/slyp_chat_messages"], function(Marionette, slypChatMessagesCollection){
  var SlypChat = Backbone.Model.extend({
  	defaults: {
  		id: null,
      slyp_id: null
  	},

    initialize: function(options){
      this.on("sync", function(){debugger});
    },

    parse: function(response){
      this.set("slyp_chat_messages", new slypChatMessagesCollection(response.slyp_chat_messages));
      delete response.slyp_chat_messages;
      return response;
    }
  });
  return SlypChat;
});