define(["marionette"], function(){
  var logoutController = Marionette.Object.extend({

    initialize: function() {
      $.removeCookie("api_token", {domain: ".slyp.io"});
      $.removeCookie("user_id", {domain: ".slyp.io"});
      App.vent.trigger("landing")
    },

  });

  return logoutController;
});
