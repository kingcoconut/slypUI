define(["marionette"], function(Marionette){
  var slypChatView = Backbone.Marionette.ItemView.extend({
  	template: "#js-slypchat-show-tmpl"
  });
  return slypChatView;
});