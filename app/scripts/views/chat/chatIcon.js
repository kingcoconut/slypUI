define(["marionette"], function(Marionette){
  var ChatIcon = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-icon-tmpl",
    serializeData: function(){
      return {email: this.model.get("users")[1].email, id: this.model.get("users")[1].id};
    }
  });
  return ChatIcon;
});