define(["marionette", "collections/slyp_chat_messages", "collections/users"], function(Marionette, slypChatMessagesCollection, userCollection){
  var SlypChat = Backbone.Model.extend({
  	defaults: {
  		id: null,
      slyp_id: null,
      selected: false
  	},

    parse: function(response){
      this.set("slyp_chat_messages", new slypChatMessagesCollection(response.slyp_chat_messages));
      this.set("users", new userCollection(response.users));
      delete response.slyp_chat_messages;
      delete response.users;

      return response;
    },

    setSelected: function(){
      if(this.collection){
        this.collection.forEach(function(slyp_chat, index) {
          slyp_chat.set("selected", false);
        });
      }
      this.set("selected", true);
      this.collection.trigger("model:select", this.get("id"));
      this.markAsRead()
    },

    markAsRead: function(){
      $.ajax({
        url: window.apiHost + "/slyp_chats/read/"+this.get('id'),
        method: "PUT",
        success: function(response){
          
        },
        error: function(status, response){
          console.log(response);
        }
      });
    }
  });
  return SlypChat;
});