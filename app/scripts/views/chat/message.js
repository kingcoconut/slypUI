define(["marionette"], function(Marionette){
  var Message = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-message-tmpl",
  });
  return Message;
});