define(["marionette", "views/slyp_chats/show", "waypoints"], function(Marionette, SlypChatView){
  var slypChatsView = Backbone.Marionette.CompositeView.extend({
    template: "#js-slypchats-tmpl",
    childViewContainer: "#js-slyp-chat-container",
  	childView: SlypChatView,
    collectionEvents:{
      "render":"render",
      "sync":"render"
    },
    ui:{
      rightSidebar: ".right-sidebar"
    },
    events: {
      "submit #slypbotform": "parseCommand"
    },

    initialize: function(options){
      this.slyp_id = options.slyp_id;
    },

    onRender: function(){
      $('#js-slyp-chat-container').slimScroll({
        height: window.innerHeight - 56
      });
    },

    parseInput: function(evt){
      evt.preventDefault();
      var query = this.$('#slypBotInput').val();
      if (query.indexOf('@') >= 0){
        var user_email = App.user.get('email');
        var emails = query.replace(user_email, '').split(' ');

        $.ajax({
          url: window.apiHost + "/slyp_chats",
          data: {slyp_id: this.slyp_id, emails: emails},
          method: "POST",
          success: function(){
            alert("slyp has been sent");
          },
          error: function(error, msg, status){
            alert(error.responseText);
            console.log(error);
          }
        });        
        this.$('#slypBotInput').val(''); 
      }else{
        alert('Ain\'t no @ symbol son.');
      }
    },
    slypBotInputUp: function(evt) {
      if (evt.keyCode == 8){
        //App.socketclient.notTyping()
      } else if (evt.keyCode != 13){
        App.socketclient.tyingAlert;
      }
    }

    // slypBotInputPressed: function(evt) {
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
  return slypChatsView;
});