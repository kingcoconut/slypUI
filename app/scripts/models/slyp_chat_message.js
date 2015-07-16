define(["marionette"], function(){
  var slypChatMessage = Backbone.Model.extend({
    defaults: {
      id: null,
      slyp_chat_id: null,
      content: "",
      created_at: null,
      sender_email: ""
    },
    url: window.apiHost + "/slyp_chat_messages"
  });
  return slypChatMessage;
})