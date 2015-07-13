define(["marionette"], function(){
  var slypChatMessage = Backbone.Model.extend({
    defaults: {
      id: null,
      slyp_chat_id: null,
      content: ""
    },
    url: window.apiHost + "/slyp_chat_messages"
  });
  return slypChatMessage;
})