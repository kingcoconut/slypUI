define(["marionette"], function(){
  var topNav = Backbone.Marionette.ItemView.extend({
    template: "#js-top-nav-tmpl",
    // className: "overlay",
    id: "js-top-nav",

    ui: {
      options: ".js-top-nav-options",
    },

    events: {
      "click @ui.options"  : "showOptions"
    },

    initialize: function(options){
      this.options = options;
      var that = this;
      this.render();
    },

    showOptions: function(event) {
      alert("gimmie the options!");
    }
  });

  return topNav;
});