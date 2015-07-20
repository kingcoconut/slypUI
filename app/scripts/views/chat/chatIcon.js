define(["marionette"], function(Marionette){
  var ChatIcon = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-icon-tmpl",
    events: {
      "click .slyp-chat-user-container": "selectChat"
    },
    serializeData: function(){
      return {email: this.model.get("users").first().get("email"), id: this.model.get("users").first().get("id"), selected: this.model.get("selected")};
    },
    selectChat: function(){
      this.model.setSelected();
    }
  });
  return ChatIcon;
});