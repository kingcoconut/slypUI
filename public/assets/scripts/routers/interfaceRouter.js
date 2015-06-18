define(["marionette", "routefilter"], function(){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "home",
      "signin": "signin"
    },
    before: function(route, params){
      $("html, body").animate({ scrollTop: 0 }, "fast");
      // if(!$.cookie("authentication_token")){
      //   if(App.layout){
      //     App.layout = undefined;
      //   }
      //   Backbone.history.navigate("/signin", true);
      //   if(route !== "signin")
      //     return false;
      // }else if(typeof(App.layout) === "undefined"){
      //   this.options.controller.renderLayout();
      // }
    }
  });

  return Router;
});