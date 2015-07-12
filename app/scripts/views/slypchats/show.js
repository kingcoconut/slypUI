define(["marionette"], function(Marionette){
  var slypChatView = Backbone.Marionette.ItemView.extend({
  	template: "#js-slypchat-show-tmpl",
    events: {
      'keypress #chatInput': 'chatInputPressed',
      'keyup #chatInput': 'chatInputUp'
    },
    chatInputPressed: function(evt) {
      if (evt.keyCode == 13) {
        debugger
        this.vent.trigger("chat", this.$('#chatInput').val());
        this.$('#chatInput').val('');
        return false;
      } 
    },

    chatInputUp: function(evt) {
      if (evt.keyCode == 8){
        this.vent.trigger("eraseTyping");
        return false;
      } else if (evt.keyCode != 13){
        this.vent.trigger("typing");
        return false;
      }
    }
  });
  return slypChatView;
});