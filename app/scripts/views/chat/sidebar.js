define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CollectionView.extend({
    childView: ChatIcon,
    collectionEvents: {
      "reset": "render",
      "sync": "render"
    }
  });
  return sidebarView;
});