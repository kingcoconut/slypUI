define(["marionette", "views/slypchats/show", "waypoints"], function(Marionette, slypChatView){
  var slypChatsView = Backbone.Marionette.CollectionView.extend({
  	childView: slypChatView
  });
  return slypChatsView;
});