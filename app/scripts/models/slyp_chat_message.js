define(["marionette"], function(){
  var SlypChatMessage = Backbone.Model.extend({
    defaults: {
      user_id: 1,
      user_name: "james",
      id: 10,
      message: "This is a message.",
      message_html: "<p> This is a message. </p"
    }
  });
  return SlypChatMessage;
})