define(["marionette", "views/slypchatmessages/show", "waypoints"], function(Marionette, slypChatMessageView){
  var slypChatMessagesView = Backbone.Marionette.CollectionView.extend({
    childView: slypChatMessageView
  });
  return slypChatsView;
});