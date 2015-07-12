define(["marionette", "collections/slypchatmessages"], function(Marionette, SlypChatMessages){
  var SlypChat = Backbone.Model.extend({
  	defaults: {
  		id: null,
  		alertMsg: ""
  	},

  	fetchMessages: function(){
  		this.slypChatMessages = new SlypChatMessages(this.get('id'));
  		//this.slypChatMessages.fetch();
  	},

    initialize: function(options){
      this.slypChatMessages = [{ user_id: 3, user_name: "james", id: 1, message: "first message" }]  //options.slypChatMessages;
    }
  });
  return SlypChat;
});