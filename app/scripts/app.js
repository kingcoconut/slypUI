define(["marionette", "controllers/interfaceController", "routers/interfaceRouter", "controllers/socketclient", "models/user", "toastr", "typeahead", "collections/friends", "jquery.validate"], function(Marionette, InterfaceController, InterfaceRouter, SocketClient, User, toastr, typeahead, Friends, validations){
  App = new Marionette.Application();
  window.toastr = toastr;
  window.typeahead = typeahead;

  // app initializer
  App.addInitializer(function(options){
    if ($.cookie("user_id") && $.cookie("api_token")){
      App.authorized = true;
      
      App.user = new User();
      App.user.fetch();
      App.friends = new Friends();
      App.friends.fetch();

      App.vent = _.extend({}, Backbone.Events);
      App.socketclient = new SocketClient();
      App.socketclient.connect();
    }else{
      App.authorized = false;
    }
    new InterfaceRouter({
      controller: new InterfaceController()
    });


    Backbone.history.start();
  });

  $.validator.setDefaults({ //override library defaults
    errorClass: "has-error",
    highlight: function(element, errorClass, validClass) {
      $(element).parent().addClass(errorClass);
    }
  });

  return App;
});