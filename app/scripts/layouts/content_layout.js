define(["marionette", 'views/slyps/slyp_collection_view', './chatLayout', 'bootstrap'], function(Mn, slypCollectionView, chatLayout, bootstrap){
  var contentLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",

    regions: {
      mainRegion : ".js-main",
      chatRegion : '.js-chat'
      // could have a chat region here if it makes sense
    },
    initialize: function(){
      // this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
      // this.listenTo(App.vent, "changeChatMsg", this.changeChatMsg, this);
      this.listenTo(App.vent, 'slyp:picked', this.showChatLayout);
    },

    onShow: function(){
      this.mainRegion.show(new slypCollectionView({collection: App.slypCollection}))
    },

    showChatLayout: function(slyp_id){
      this.chatRegion.show(new chatLayout({slyp_id: slyp_id}));
    }
  });

  return contentLayout;
});
