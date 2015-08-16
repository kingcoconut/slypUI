define(["marionette"], function(){
  var logoutController = Marionette.Object.extend({

    initialize: function() {
      $.removeCookie("api_token", {domain: ".slyp.io"});
      $.removeCookie("user_id", {domain: ".slyp.io"});
      // landing view is listening to change
      App.user.set(App.user.defaults)
      App.vent.trigger('logout:to:landing')
    },

  });

  return logoutController;
});
