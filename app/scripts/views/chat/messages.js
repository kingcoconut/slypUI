define(["marionette", "views/chat/message"], function(Marionette, Message){
  var Messages = Backbone.Marionette.CompositeView.extend({
    template: "#js-chat-messages-tmpl",
    childView: Message,
    childViewContainer: ".js-chat-messages-container",
    collectionEvents: {
      "reset": "render"
    },
    events: {
      "submit #js-chat-message-form": "createMessage",
      "keyup #js-chat-message-input": "pushTypingUsr"
    },
    templateHelpers: function() {
      return { items: this.collection.toJSON() };
    },

    onShow: function(){
      $('.js-chat-messages-container').slimScroll({
        start: 'bottom',
        height: window.innerHeight - ($("#header").height() + $(".chat-input-section").outerHeight(true) + 20) // 20 is for the padding on the chat-left
      });
      this.$("input").focus();
    },

    initialize: function(){
      this.listenTo(App.vent, "recChatMsg", this.recSockMsg, this);
      this.listenTo(App.vent, "recTypingUsr", this.recTypingUsr, this);
      this.listenTo(App.vent, "recRemTypingUsr", this.remTypingUsr, this);
    },

    createMessage: function(ev){
      ev.preventDefault();
      var input = this.$("#js-chat-message-input");
      var message = {
        content: input.val(),
        slyp_chat_id: this.model.get('id'),
        sender_email: App.user.get('email'),
        users: this.model.get('users'),
        user_id: $.cookie("user_id"),
        created_at: Date.now()
      };
      var that = this;
      // This will update the slyp_chat_messages view and request off to the grape api
      this.collection.create(message, {
        success: function(response){
          var sockMessage = {
            content: response.get('content'),
            slyp_chat_id: response.get('slyp_chat_id'),
            id: response.get('id'),
            created_at: response.get('created_at'),
            sender_email: App.user.get('email'),
            users: that.model.get('users'),
            slyp_id: that.model.get('slyp_id')
          };
          that.pushSockMsg(sockMessage);

          // scroll down the slimscroll
          msgs = $(".js-chat-messages-container .message");
          lastMsg = msgs[msgs.length-1];
          $(".js-chat-messages-container").slimscroll({ scrollBy: $(lastMsg).outerHeight(true) });
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

    pushTypingUsr: function(evt){
      var keycode = evt.keyCode;
      if (keycode !== 13 && (keycode.between(48, 90) || keycode == 8)){
        var to_users = $.map(this.model.get('users').models, function(user) { return user.attributes })
        var data = {
          to_users: to_users,
          keycode: keycode,
          slyp_chat_id: this.model.get('id'),
          sender_email: App.user.get('email')
        }
        App.socketclient.pushTypingUsr(data);
      }
    },

    pushSockMsg: function(data){
      App.socketclient.pushChatMsg(data);
      this.remTypingUsr({slyp_chat_id: this.model.get('id')});
    },

    recSockMsg: function(data){
      if (this.model.get('id') == data.slyp_chat_id){
        this.model.get("slyp_chat_messages").add(data);
        // scroll down the slimscroll
        msgs = $(".js-chat-messages-container .message");
        lastMsg = msgs[msgs.length-1];
        $(".js-chat-messages-container").slimscroll({ scrollBy: $(lastMsg).outerHeight(true) });
      
      } else {
        var that = this;
        toastr.options.onclick = function() { 
          App.vent.trigger("changeChatMsg", data);
          toastr.options.onclick = null; 
        }
        toastr.success('Recieved chat message from ' + data.sender_email);
      }
    }
  });
  return Messages;
});














