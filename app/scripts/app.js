define(["marionette", "controllers/interfaceController", "routers/interfaceRouter"], function(Marionette, interfaceController, interfaceRouter){
  App = new Marionette.Application();

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