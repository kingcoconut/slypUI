define(["marionette"], function(Marionette){
  var slypChatMessageView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-chat-message-show-tmpl"
  });
  return slypChatMessageView;
});