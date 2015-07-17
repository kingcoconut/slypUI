define(["marionette", "views/chat/sidebar", "collections/slyp_chats"], function(Marionette, ChatSidebar, SlypChats){
  var chatLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-chat-layout-tmpl",

    regions: {
      commandCenter : ".js-chat-command-center",
      main : ".js-chat-main",
      sideBar : ".js-chat-sidebar",
    },
    onBeforeShow: function(){
      this.sideBar.show(new ChatSidebar({collection: this.slyp.get("slyp_chats")}));
      // this.feedLeft.show(new SlypsView({collection: this.slyps}));
    },
    onShow: function(){
      // $('.js-chat-main').slimScroll({
      //   height: window.innerHeight - ($("#header").height() + $(".js-chat-sidebar").height())
      // });
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - $("#header").height()
      });
    },
    initialize: function(options){
      this.slyp = options.slyp;
      //listen to activate, slyps.currentSlyp change this.renderFeedRight
    }
  });

  return chatLayout;
});