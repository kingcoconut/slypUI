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
      $('.js-feed-right').slimScroll({
        height: window.innerHeight - 56
      });
    },
    initialize: function(options){
      this.slyps = options.slyps;
      this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
      //listen to activate, slyps.currentSlyp change this.renderFeedRight
    },

    renderFeedRight: function(){
      var slyp = this.slyps.getDockedSlyp();
      if(this.feedRight.currentView){
        this.feedRight.currentView.slyp = slyp;
        this.feedRight.currentView.onBeforeShow();
      }else{
        var chatLayout = new ChatLayout({slyp: slyp});
        this.feedRight.show(chatLayout);
      }
    }
  });

  return feedLayout;
});