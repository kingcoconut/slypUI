define(["marionette", 'views/slyps/slyp_collection_view', './chatLayout', 'bootstrap'], function(Mn, slypCollectionView, chatLayout, bootstrap){
  var contentLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",

    regions: {
      mainRegion : ".js-main",
      chatRegion : '.js-chat'
      // could have a chat region here if it makes sense
    },
    initialize: function(options){
      this.listenTo(App.slypCollection, "slypSet", this.showChatLayout, this);
      this.listenTo(App.slypCollection, "sync", this.onShow, this);
      // this.listenTo(App.vent, "changeChatMsg", this.changeChatMsg, this);
      // this.listenTo(App.vent, 'slyp:picked', this.showChatLayout);
      App.vent.on("closeChat", this.closeChat, this);
    },

    closeChat: function(){
      if(this.chatRegion.currentView){
        this.chatRegion.currentView.destroy();
      }
    },

    onShow: function(){
      if(App.slypCollection.length > 0)
        this.mainRegion.show(new slypCollectionView({collection: App.slypCollection}));
    },

    showChatLayout: function(){
      this.chatRegion.show(new chatLayout());
    }
  });

  return contentLayout;
});
