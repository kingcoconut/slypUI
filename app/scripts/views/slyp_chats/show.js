define(["marionette", "views/slyp_chat_messages/show"], function(Marionette, SlypChatMessageView){
  var slypChatView = Backbone.Marionette.CompositeView.extend({
  	template: "#js-slypchat-show-tmpl",
    childViewContainer: ".js-slyp-chat-messages-container",
    childView: SlypChatMessageView,
    events: {
      "submit .js-slyp-chat-message-form": "createMessage",
      "keyup .js-new-slyp-chat-message": "chatInputUp"
    },
    initialize: function(){
      this.initAppVent();
      this.collection = this.model.get("slyp_chat_messages");
    },

    initAppVent: function(){
        App.vent.on("typing", this.alertMessage, this);
        App.vent.on("recChatMsg", this.receiveSockMsg, this);
        App.vent.on("recTypingUsr", this.recTypingUsr, this);
        App.vent.on("remTypingUsr", this.remTypingUsr, this);
    },

    createMessage: function(ev){
      ev.preventDefault();
      var message = {
        content: this.$(".js-new-slyp-chat-message").val(),
        slyp_chat_id: this.model.get('id'),
        sender_email: App.user.get('email'),
        users: this.model.get('users')
      }
      var that = this;
      // This will update the slyp_chat_messages view and request off to the grape api
      this.model.get("slyp_chat_messages").create(message, {
        success: function(response){
          that.hasAlert = false;
          var sockMessage = {
            content: response.get('content'),
            slyp_chat_id: response.get('slyp_chat_id'),
            id: response.get('id'),
            created_at: response.get('created_at'),
            sender_email: App.user.get('email'),
            users: that.model.get('users')
          }
          that.pushSockMsg(sockMessage);
        }
      });

      this.$(".js-new-slyp-chat-message").val('');
    },

    chatInputUp: function(evt) {
      if (evt.keyCode != 13){
        var data = {
          slyp_chat_id: this.model.get('id'),
          sender_email: App.user.get('email'),
          users: this.model.get('users'),
          keycode: evt.keyCode
        }
        if (evt.keyCode == 8){
          this.hasAlert = false;
          App.socketclient.pushTypingUsr(data);          
        }else if (!(this.hasAlert)){
          if (evt.keyCode.between(48, 90)){
            this.hasAlert = true;
            App.socketclient.pushTypingUsr(data);                      
          }
        }
      }
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

    // },
  });
  return slypChatView;
});