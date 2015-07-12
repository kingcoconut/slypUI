define(["marionette", "collections/slyp_chat_messages"], function(Marionette, slypChatMessagesCollection){
  var SlypChat = Backbone.Model.extend({
  	defaults: {
  		id: 100,
  		alertMsg: "",
      user_name: "james"
  	},

  	fetchMessages: function(){
  		this.slypChatMessages = new slypChatMessagesCollection(this.get('id'));
      this.slypChatMessages.reset([{ user_id: 3, user_name: "james", id: 1, message: "first message", message_html: "<p> first message </p>" }]);
  		//this.slypChatMessages.fetch();
  	},

    initialize: function(options){
      this.fetchMessages();
      //this.slypChatMessages = [{ user_id: 3, user_name: "james", id: 1, message: "first message" }]  //options.slypChatMessages;
    }
  });
  return SlypChat;
});