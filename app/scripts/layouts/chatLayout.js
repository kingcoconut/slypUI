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
      // get what we need
      this.slypChats = this.slyp.get("slyp_chats");
      // display it
      this.sideBar.show(new ChatSidebar({collection: slypChats}));
      this.commandCenter.show(new CommandCenter({slyp: this.slyp}));

      if(slypChats.length > 0){
        this.slypChat = this.slypChats[0];
        this.slypChatMessages = slypChat.get("slyp_chat_messages");
        this.renderChat();
      }else{
        slypChats.on("sync", function(){
          if(this.length > 0){
            that.slypChatMessages = this.models[0].get("slyp_chat_messages");
            that.slypChat = this.models[0];
            that.renderChat();
          }
        });
      }
    },
    onShow: function(){
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - $("#header").height()
      });
    },
    initialize: function(options){
      var that = this;
      this.slyp = options.slyp;
      App.vent.on("select:chat", function(id){
        that.slypChat = that.slypChats.get(id);
        that.slypChatMessages = that.slypChat.get("slyp_chat_messages");
        that.renderChat();
      })
      //listen to activate, slyps.currentSlyp change this.renderFeedRight
    },
    renderChat: function(){
      this.main.show(new Messages({collection: this.slypChatMessages, model: this.slypChat}));
    }

  });

  return chatLayout;
});