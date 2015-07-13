define(["marionette", "views/slyp_chat_messages/show"], function(Marionette, SlypChatMessageView){
  var slypChatView = Backbone.Marionette.CompositeView.extend({
  	template: "#js-slypchat-show-tmpl",
    childViewContainer: ".js-slyp-chat-messages-container",
    childView: SlypChatMessageView,
    events: {
      "submit .js-slyp-chat-message-form": "createMessage"
    },
    initialize: function(){
      App.vent.on("typing", this.alertMessage, this);
      this.collection = this.model.get("slyp_chat_messages");
    },

    createMessage: function(ev){
      ev.preventDefault();
      var message = {
        content: this.$(".js-new-slyp-chat-message").val(),
        slyp_chat_id: this.model.get('id')
      }
      this.model.get("slyp_chat_messages").create(message);
    }





    // alertMessage: function(data){
    //   this.$('#typingAlert').html(data.alertMsg);
    // },
    // chatInputPressed: function(evt) {
    //   if (evt.keyCode == 13 && this.$('#chatInput').val() !== '') {
    //     evt.preventDefault();
    //     debugger
    //     var message = {
    //       message: this.$('#chatInput').val(),
    //       sender_name: App.user.get('user_name'),
    //       chat_id: this.model.get('id'),
    //       user_ids: this.model.get('user_ids')
    //     }
    //     App.socketclient.chat(message);
    //     this.$('#chatInput').val('');
    //     return false;
    //   } 
    // },
    // chatInputUp: function(evt) {
    //   if (evt.keyCode == 8){
    //     App.socketclient.eraseAlert();
    //     return false;
    //   } else if (evt.keyCode != 13){
    //     App.socketclient.typingAlert();
    //     return false;
    //   }
    // },

    // slypBotInputPressed: function(evt) {
    //   if (evt.keyCode == 13 && this.$('#slypBotInput').val() !== '') {
    //     evt.preventDefault();
    //     var commands = this.$('#slypBotInput').val().split(' ');
    //     commands.forEach(function(command){
    //       switch(command[0]){
    //         case '@':
    //           var email = command.substring(1);
    //           if (email.indexOf('@') > 0){
    //             // TODO: send ajax to grape server
    //             alert("TODO -- fire ajax to grape server: " + email);
    //           }
    //           break;
    //       }              
    //     });
    //     this.$('#slypBotInput').val('')
    //   } 
    // }
  });
  return slypChatView;
});