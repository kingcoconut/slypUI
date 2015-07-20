define(["marionette", "views/chat/message"], function(Marionette, Message){
  var Messages = Backbone.Marionette.CompositeView.extend({
    template: "#js-chat-messages-tmpl",
    childView: Message,
    childViewContainer: ".js-chat-messages-container",
    collectionEvents: {
      "reset": "render"
    },
    events: {
      "submit #js-chat-message-form": "createMessage"
    },
    templateHelpers: function() {
      return { items: this.collection.toJSON() };
    },

    onShow: function(){
      $('.js-chat-messages-container').slimScroll({
        height: window.innerHeight - ($("#header").height() + $(".chat-input-section").outerHeight(true) + 20) // 20 is for the padding on the chat-left
      });
      this.$("input").focus();
    },

    createMessage: function(ev){
      ev.preventDefault();
      var input = this.$("#js-chat-message-input");
      var message = {
        content: input.val(),
        slyp_chat_id: this.model.get('id'),
        sender_email: App.user.get('email'),
        users: this.model.get('users')
      };
      var that = this;
      // This will update the slyp_chat_messages view and request off to the grape api
      this.collection.create(message, {
        success: function(response){
          that.hasAlert = false;
          var sockMessage = {
            content: response.get('content'),
            slyp_chat_id: response.get('slyp_chat_id'),
            id: response.get('id'),
            created_at: response.get('created_at'),
            sender_email: App.user.get('email'),
            users: that.model.get('users')
          };
          that.pushSockMsg(sockMessage);
        }
      });

      input.val('');
    },
    recTypingUsr: function(data){
      if (this.model.get('id') == data.slyp_chat_id){
        this.$(".js-typing-alert").html('<b>' + data.sender_email + '</b> is typing');
      }
    },

    remTypingUsr: function(data){
      if (this.model.get('id') == data.slyp_chat_id){
        this.$(".js-typing-alert").html('');
      }
    },

    pushSockMsg: function(data){
      App.socketclient.pushChatMsg(data);
    },

    receiveSockMsg: function(data){
      if (this.model.get('id') == data.slyp_chat_id){
        this.model.get("slyp_chat_messages").add(data);
      } else{
        //TODO: notify of sockMsg for different slyp_chat_id
      }
    }
  });
  return Messages;
});