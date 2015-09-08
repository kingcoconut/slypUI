define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var topNav = Backbone.Marionette.ItemView.extend({
    template: "#js-top-nav-tmpl",
    className: 'blue--nav',
    id: "header",

    ui: {
      logout: '.js-logout'
    },

    events: {
      "click @ui.logout" : "logout"
    },

    initialize: function(options){
      this.options = options;
      this.render();
    },

    logout: function(event){
      event.preventDefault();
      App.vent.trigger("logout")
    },
  });

  return topNav;
});