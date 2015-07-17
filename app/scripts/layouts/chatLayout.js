define(["marionette", "views/chat/sidebar", "views/chat/commandCenter", "views/chat/messages", "collections/slyp_chats"], function(Marionette, ChatSidebar, CommandCenter, Messages, SlypChats){
  var chatLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-chat-layout-tmpl",

    regions: {
      commandCenter : ".js-chat-command-center",
      main : ".js-chat-main",
      sideBar : ".js-chat-sidebar",
    },
    onBeforeShow: function(){
      var that = this;
      this.sideBar.show(new ChatSidebar({collection: slypChats}));
      this.commandCenter.show(new CommandCenter({slyp: this.slyp}));
      this.renderChatMessages();
    },
    initialize: function(options){
      var that = this;
      this.slyp = options.slyp;
      this.slypChats = this.slyp.get("slyp_chats");

      // if slypchats were populated yet, make sure messages view gets created when there is a
      // slyp_chat_messages collection pulled in
      this.slypChats.on("sync", function(){
        that.renderChatMessages();
      });

      // when a chat is selected, make that chat's messages appear
      this.slypChats.on("model:select", function(id){
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