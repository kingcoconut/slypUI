define(["marionette", "moment"], function(Marionette, moment){
  var Message = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-message-tmpl",
    className: "message-container",
    serializeData: function(){
      owner_id = $.cookie("user_id");
      return {content: this.model.get("content"), owner: owner_id == this.model.get("user_id"), created_at: this.model.get("created_at")};
    }
  });
  return Message;
});