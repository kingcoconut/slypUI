define(["marionette", "views/chat/sidebar", "views/chat/commandCenter", "views/chat/messages", "collections/slyp_chats"], function(Marionette, ChatSidebar, CommandCenter, Messages, SlypChats){
  var chatLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-chat-layout-tmpl",

    regions: {
      commandCenter : ".js-chat-command-center",
      main : ".js-chat-main",
      sideBar : ".js-chat-sidebar",
    },
    onShow: function(){
      this.sideBar.show(new ChatSidebar({collection: this.slypChats, slyp: this.slyp}));
      this.renderChatMessages();
    },
    initialize: function(options){
      var that = this;
      this.slyp = this.options.slyp;
      this.slypChats = options.slypChats;

      // when a chat is selected, make that chat's messages appear
      this.listenTo(this.slypChats, "model:select", function(id){
        this.renderChatMessages(id);
      }, this);
    },
    renderChatMessages: function(chat_id){
      // if not chat_id was given, use the first slyp chat in the collection
      this.slypChat = this.slypChats.get(chat_id) || this.slypChats.first();
      if(this.slypChat){
        this.slypChatMessages = this.slypChat.get("slyp_chat_messages");
        this.main.show(new Messages({collection: this.slypChatMessages, model: this.slypChat}));
      }
    }

  });

  return chatLayout;
});