define(["marionette", "views/slyp_chats/show", "waypoints"], function(Marionette, SlypChatView){
  var slypChatsView = Backbone.Marionette.CompositeView.extend({
    template: "#js-slypchats-tmpl",
    childViewContainer: "#js-slypchat-container",
  	childView: SlypChatView,
    collectionEvents:{
      "render":"render",
      "sync":"render"
    },
    ui:{
      slypBotForm: "#slypbotform"
    },
    events: {
      "submit @ui.slypBotForm": "parseInput"
    },

    initialize: function(options){
      this.slyp_id = options.slyp_id;
    },

    parseInput: function(evt){
      evt.preventDefault();
      var emails = this.$('#slypBotInput').val().split(' ');
      $.ajax({
        url: window.apiHost + "/slyp_chats",
        data: {slyp_id: this.slyp_id, emails: emails},
        method: "POST",
        success: function(){
          alert("slyp has been sent");
        },
        error: function(error, msg, status){
          console.log(error);
        }
      });
      this.$('#slypBotInput').val('');
    }
  });
  return slypChatsView;
});