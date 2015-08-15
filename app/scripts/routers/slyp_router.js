define(["marionette",
  "controllers/landing_controller",
  "controllers/logout_controller",
  "controllers/user_feed_Controller"
  ], function(
    Mn,
    landingController,
    logoutController,
    userFeedController){

  var slypRouter = Marionette.AppRouter.extend({

    appRoutes: {
      "": "landingPage",
      "myfeed": "myFeed",
      "logout": "logout"
    },

    controller: {
      landingPage: function(){
        new landingController();
      },

      myFeed: function(){
        new userFeedController();
      },

      logout: function(){
        new logoutController();
      }
    }
  });

  return slypRouter;
});