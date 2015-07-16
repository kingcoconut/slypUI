define(["marionette", "views/slyps/list", "views/slyp_chats/list", "collections/slyp_chats"], function(Marionette, SlypsView, SlypChatsView, SlypChats){
  var feedLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onRender: function(){
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
      this.feedRight.show(new SlypChatsView({collection: slyp.slypChats, slyp_id: slyp.get("id")}));
    }
  });

  return feedLayout;
});