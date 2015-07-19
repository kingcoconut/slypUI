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
      $(".slyp-chat-user-container").removeClass("active");
      this.$(".slyp-chat-user-container").addClass("active");

      this.model.collection.trigger("model:select", this.model.get("id"));
    }
  });
  return ChatIcon;
});