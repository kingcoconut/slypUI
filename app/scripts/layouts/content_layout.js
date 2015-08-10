define(["marionette", 'views/slyps/slyp_collection_view', 'bootstrap'], function(Mn, slypCollectionView, bootstrap){
  var contentLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",

    regions: {
      mainRegion : ".js-main",
      // could have a chat region here if it makes sense
    },
    initialize: function(){
      // this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
      // this.listenTo(App.vent, "changeChatMsg", this.changeChatMsg, this);
    },

    onShow: function(){
      this.mainRegion.show(new slypCollectionView({collection: App.slypCollection}))
    }
  });

  return contentLayout;
});
