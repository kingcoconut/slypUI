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