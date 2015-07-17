define(["marionette", "views/slyps/list", "collections/slyp_chats", "layouts/chatLayout"], function(Marionette, SlypsView, SlypChats, ChatLayout){
  var feedLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onBeforeShow: function(){
      this.feedLeft.show(new SlypsView({collection: this.slyps}));
    },
    onShow: function(){
      $('.js-feed-left').slimScroll({
        height: window.innerHeight - 56
      });
    },
    initialize: function(options){
      this.slyps = options.slyps;
      this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
      //listen to activate, slyps.currentSlyp change this.renderFeedRight
    },

    renderFeedRight: function(){
      // only render the right feed if there are slyps
      if(this.slyps.length > 0){
        var slyp = this.slyps.getDockedSlyp();

        // don't re render the right feed if it has already been rendered for that slyp
        if(this.feedRight.currentView){
          if(slyp === this.feedRight.currentView.slyp)
            return;
        }

        var chatLayout = new ChatLayout({slyp: slyp});
        this.feedRight.show(chatLayout);
      }
    }
  });

  return feedLayout;
});