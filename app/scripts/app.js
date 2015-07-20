define(["marionette", "controllers/interfaceController", "routers/interfaceRouter", "controllers/socketclient", "models/user", "toastr"], function(Marionette, InterfaceController, InterfaceRouter, SocketClient, User, toastr){
  App = new Marionette.Application();
  window.toastr = toastr;
  // app initializer
  App.addInitializer(function(options){
    if ($.cookie("user_id") && $.cookie("api_token")){
      App.authorized = true;
      App.user = new User({
        id: $.cookie("user_id"), 
        api_token: $.cookie("api_token"),
        email: $.cookie("email")
      });
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

  return App;
});