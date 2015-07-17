define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CollectionView.extend({
    childView: ChatIcon,
    collectionEvents: {
      "reset": "render",
      "sync": "render"
    },
    onRender: function(){
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - $("#header").height(),
        railColor: "#0DD100"
      });
    },
  });
  return sidebarView;
});