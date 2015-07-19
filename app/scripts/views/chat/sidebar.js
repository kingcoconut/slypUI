define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CompositeView.extend({
    template: "#js-chat-sidebar-tmpl",
    childView: ChatIcon,
    childViewContainer: ".js-chat-sidebar-icons",
    collectionEvents: {
      "reset": "render"
    },
    events: {
      "submit #js-command-center-form": "parseInput"
    },
    initialize: function(options){
      this.slyp = this.options.slyp;
    },
    onRender: function(){
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - $("#header").height()
      });
    },
    parseInput: function(evt){
      evt.preventDefault();
      var input = this.$el.find("#js-command-center-input");
      var query = input.val();

      var user_email = App.user.get('email');
      var emails = query.replace(user_email, '').split(' ');
      this.slyp.sendTo(emails);
      input.val('');
    }
  });
  return sidebarView;
});