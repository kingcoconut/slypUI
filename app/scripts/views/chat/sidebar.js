define(["marionette", "views/chat/chatIcon"], function(Marionette, ChatIcon){
  var sidebarView = Backbone.Marionette.CompositeView.extend({
    template: "#js-chat-sidebar-tmpl",
    childView: ChatIcon,

    childViewContainer: ".js-chat-sidebar-icons",

    collectionEvents: {
      "reset": "render",
      "change": "render"
    },

    initialize: function(options){
      this.slyp = this.options.slyp;
    },
    onRender: function(){
      var that = this;
      $('.js-chat-sidebar').slimScroll({
        height: window.innerHeight - (parseInt(($(".chat-container .row.chat-elements").css("margin"))) * 2)
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
    }
  });
  return sidebarView;
});