define(["marionette", "views/chat/sidebar", "views/chat/commandCenter", "views/chat/messages", "collections/slyp_chats"], function(Marionette, ChatSidebar, CommandCenter, Messages, SlypChats){
  var chatLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-chat-layout-tmpl",

    regions: {
      commandCenter : ".js-chat-command-center",
      main : ".js-chat-main",
      sideBar : ".js-chat-sidebar",
    },

    initialize: function(options){
      var that = this;
      this.slyp_id =  Number(this.options.slyp_id);
      this.slypChats = App.slypCollection.findWhere({id: this.slyp_id}).get('slyp_chats');
      this.slypChatID = options.slypChatID;

      // when a chat is selected, make that chat's messages appear
      this.listenTo(this.slypChats, "model:select", this.setNewChatID, this);
      this.listenTo(this.slypChatID, "change", this.renderChatMessages, this);
    },

    onShow: function(){
      this.sideBar.show(new ChatSidebar({collection: this.slypChats, slyp: this.slyp_id}));
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
          this.slypChatMessages = this.slypChat.get("slyp_chat_messages");
          this.main.show(new Messages({collection: this.slypChatMessages, model: this.slypChat}));
        } 
      }
    }

  });

  return chatLayout;
});