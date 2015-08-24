define(["marionette"], function(Marionette){
  var ChatIcon = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-icon-tmpl",
    events: {
      "click .slyp-chat-user-container": "selectChat"
    },
    serializeData: function(){
      var email = this.model.get("users").first().get("email");
      var icon_data = {
        email: email, 
        id: this.model.get("users").first().get("id"), 
        selected: this.model.get("selected"),
        icon_color: this.model.get("users").first().getIconColor(),
        icon_letter: email[0],
      };
      return icon_data;
    },
    selectChat: function(){
      this.model.setSelected();
    }
  });
  return ChatIcon;
});