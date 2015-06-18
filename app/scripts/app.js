define(["marionette", "controllers/interfaceController", "routers/interfaceRouter"], function(Marionette, interfaceController, interfaceRouter){
  App = new Marionette.Application();

  // app initializer
  App.addInitializer(function(options){
    new interfaceRouter({
      controller: new interfaceController()
    });
    Backbone.history.start();
  });

  return App;
});