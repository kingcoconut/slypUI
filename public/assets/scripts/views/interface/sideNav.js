define(["marionette"], function(){
  var sideNav = Backbone.Marionette.ItemView.extend({

    template: "#js-side-nav-tmpl",
    // className: "overlay",
    id: "js-size-nav",

    ui: {
      users: "#js-side-nav-users",
      verification: "#js-side-nav-verification",
    },

    events: {
      "click @ui.users"  : "showAdmin",
      "click @ui.verification"  : "showVerification"
    },

    showAdmin: function() {
      App.vent.trigger("showAdmin");
    },
    showVerification: function() {
      alert("verifications please :)");
    }
  });

  return sideNav;
});