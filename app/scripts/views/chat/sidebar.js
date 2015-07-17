define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CollectionView.extend({
    childView: ChatIcon
  });
  return sidebarView;
});