define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CompositeView.extend({
    template: "#js-chat-sidebar-tmpl",
    childView: ChatIcon,

    childViewContainer: ".js-chat-sidebar-icons",

    collectionEvents: {
      "reset": "render",
      "change": "render"
    },

    events: {
      "submit #js-sidebar-form": "parseInput"
    },

    initialize: function(options){
      this.slyp = this.options.slyp;
    },
    onRender: function(){
      var that = this;
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - $("#header").height()
      });

      this.$("#js-sidebar-form").validate({
        rules:{
          email:{
            email: true,
            required: true
          },
        },
        onfocusout: function(){
          that.$("#js-sidebar-form label.has-error").remove();
        },
        errorPlacement: function(error, element) {
          $(element).parent().prepend(error);
        }
      });
    },
    parseInput: function(evt){
      evt.preventDefault();
      var form = this.$("#js-sidebar-form");
      if(form.valid()){
        var input = form.find("[name=email]");
        var query = input.val();

        var user_email = App.user.get('email');
        var emails = query.replace(user_email, '').split(' ');
        this.slyp.sendTo(emails);
        input.val('');
      }
    }
  });
  return sidebarView;
});