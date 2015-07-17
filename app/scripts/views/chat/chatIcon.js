define(["marionette"], function(Marionette){
  var ChatIcon = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-icon-tmpl",
    events: {
      "click .slyp-chat-user-container": "selectChat"
    },
    serializeData: function(){
      return {email: this.model.get("users")[1].email, id: this.model.get("users")[1].id};
    },
    selectChat: function(){
      this.model.collection.trigger("model:select", this.model.get("id"));
    }
  });
  return ChatIcon;
});