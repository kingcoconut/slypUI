
define(["marionette", "controllers/interfaceController", "routers/interfaceRouter", "socket.io"], function(Marionette, interfaceController, interfaceRouter, io){
  App = new Marionette.Application();

  var socket = io.connect("http://127.0.0.1:3000");
  socket.on("connect", function () {
    console.log("Connected to chat server!");
  });
  socket.on("slyp", function(slyp) {

    console.log("slyp from", slyp.username);
    console.log("contents:", slyp.text);
  });

  // app initializer
  App.addInitializer(function(options){
    // if(options.facebook_status == "not_authorized" || options.facebook_status == "unknown"){
    //   App.authorized = false;
    // }else
    if ($.cookie("user_id") && $.cookie("api_token")){
      App.authorized = true;
    }else{
      App.authorized = false;
    }
    new interfaceRouter({
      controller: new interfaceController()
    });

    Backbone.history.start();
  });

  return App;
});