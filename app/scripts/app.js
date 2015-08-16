define(["marionette",
  "routers/slyp_router",
  "controllers/socketclient",
  "models/user",
  "toastr",
  "collections/friends",
  "jquery.validate",
  "cookies"
  ], function(Marionette,
    slypRouter,
    SocketClient,
    User,
    toastr,
    Friends,
    validations){
  App = new Mn.Application();
  window.toastr = toastr;
  // window.typeahead = typeahead;

  App.on("start", function(options){
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  App.addInitializer(function(options){
    App.user = new User();
    if ($.cookie("user_id") && $.cookie("api_token")){
      App.user.fetch();

      App.friends = new Friends();
      App.friends.fetch();
      App.socketclient = new SocketClient();
      App.socketclient.connect();
    }
    App.initRoutes();
  });

  $.validator.setDefaults({ //override library defaults
    errorClass: "has-error",
    highlight: function(element, errorClass, validClass) {
      $(element).parent().addClass(errorClass);
    }
  });

  App.initRoutes = function(){
    App.mainRouter = new slypRouter({});
  };

  App.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  App.getCurrentRoute = function(){
    return Backbone.history.fragment;
  };

  App.addRegions({
    header: "#js-header",
    body: "#js-body",
    footer: "#js-footer",
  });

  App.vent.on("logout:to:landing", function(){
    App.navigate("");
  });

  App.vent.on("landing", function(){
    App.navigate("");
    App.mainRouter.controller.landingPage();
  });

  App.vent.on("myfeed", function(){
    App.navigate("myfeed");
    App.mainRouter.controller.myFeed();
  });

  App.vent.on("logout", function(){
    App.navigate("logout");
    App.mainRouter.controller.logout();
  });

  return App;
});