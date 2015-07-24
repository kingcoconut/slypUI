define(["marionette", "routefilter"], function(){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "home",
      "signin": "signin",
      "logout": "logout"
    },
    before: function(route, params){
      $("html, body").animate({ scrollTop: 0 }, "fast");
      if((document.cookie.indexOf("email") < 0) && (document.cookie.indexOf("api_token") < 0)){
        window.location.href = "/";
      }
    }
  });

  return Router;
});