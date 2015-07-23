define(["marionette", "views/slyps/list", "collections/slyp_chats", "layouts/chatLayout"], function(Marionette, SlypsView, SlypChats, ChatLayout){
  var feedLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onShow: function(){
      this.feedLeft.show(new SlypsView({collection: this.slyps}));
      if(this.slyps.length > 0){
        this.renderFeedRight();
      }
      $('.js-feed-left').slimScroll({
        height: window.innerHeight - 56
      });
    },
    initialize: function(options){
      this.slyps = options.slyps;
      this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
      this.listenTo(App.vent, "changeChatMsg", this.changeChatMsg, this);
    },

    renderFeedRight: function(){
      this.slyp = this.slyps.getDockedSlyp();
      this.slypChats = this.slyp.get("slyp_chats");

      if(this.slypChats.fetched){
        this.renderChat();
      }else{
        this.slypChats.on("sync", function(){
          this.renderChat();
        }, this);
      }
    },

    changeChatMsg: function(data) {
      var newSlyp = this.slyps.get(data.slyp_id);
      this.slyps.setDockedSlyp(newSlyp);
    },

    renderChat: function(slypChatID){
      this.feedRight.show(new ChatLayout({slypChats: this.slypChats, slyp: this.slyp, slypChatID: slypChatID}));
    }
  });

  return feedLayout;
});