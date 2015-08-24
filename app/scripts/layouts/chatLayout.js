define(["marionette", "views/chat/sidebar", "views/chat/commandCenter", "views/chat/messages", "collections/slyp_chats", "views/chat/slyp_container"], function(Marionette, ChatSidebar, CommandCenter, Messages, SlypChats, SlypContainer){
  var chatLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-chat-layout-tmpl",

    regions: {
      slypContainer: ".js-chat-slyp-container",
      main : ".js-chat-main",
      sideBar : ".js-chat-sidebar",
    },

    events: {
      "click .chat-container": "close",
      "click .close-button": "closeChat"
    },

    close: function(event){
      if($(event.target).parents(".chat-container").length == 0)
        this.closeChat();
    },

    closeChat: function(){
      this.slypChats.forEach(function(slyp_chat, index) {
        slyp_chat.set("selected", false);
      });
      App.vent.trigger("closeChat");
    },

    initialize: function(options){
      var that = this;
      this.slyp = App.slypCollection.get(options.slypID)
      this.slypChats = this.slyp.get('slyp_chats');
      this.slypChatID = options.slypChatID;
      this.slypChatEmail = options.slypChatEmail;

      // when a chat is selected, make that chat's messages appear
      this.listenTo(this.slypChats, "model:select", this.setNewChatID, this);
      this.listenTo(this.slypChats, "sync", this.renderChatMessages, this);
    },

    onShow: function(){
      this.slypContainer.show(new SlypContainer({model: this.slyp}))
      this.sideBar.show(new ChatSidebar({collection: this.slypChats, slyp: this.slyp}));
      this.renderChatMessages();
    },

    setNewChatID: function(id){
      this.slypChatID = id;
      this.renderChatMessages();
    },

    renderChatMessages: function(){
      // if slypChatEmail is set, then they have clicked on a user icon to open the chat
      // and the user icon does not have a slyp chat id because it was clicked on to send
      // to the user - when an icon is clicked on the send, it is moved to the top icons section
      // before it is assigned a slyp_chat_id from the backend
      if(this.slypChatEmail && this.slypChats){
        var self = this;
        var slypChat = this.slypChats.find(function(model) { 
          return model.get('users').first().get("email") == self.slypChatEmail;
        });
        this.slypChatEmail = false;
        if(slypChat)
          this.slypChatID = slypChat.id;
      }


      // if not chat_id was given, use the first slyp chat in the collection
      if (this.slypChats){
        this.slypChat = this.slypChats.get(this.slypChatID) || this.slypChats.first();
        if(this.slypChat){
          this.slypChat.set("selected", true);
          this.slypChat.markAsRead();
          this.slypChatMessages = this.slypChat.get("slyp_chat_messages");
          App.slypCollection.currentSlypChat = this.slypChat;
          this.main.show(new Messages({collection: this.slypChatMessages, model: this.slypChat}));
        } 
      }
    }

  });

  return chatLayout;
});