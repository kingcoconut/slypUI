define(["marionette"], function(){
  var topNav = Backbone.Marionette.ItemView.extend({
    template: "#js-top-nav-tmpl",
    // className: "overlay",
    id: "js-top-nav",

    ui: {
      addSlyp: ".js-add-new-slip",
    },

    events: {
      "submit @ui.addSlyp"  : "addSlyp"
    },

    initialize: function(options){
      this.options = options;
      var that = this;
      this.render();
    },

    addSlyp: function(event) {
      event.preventDefault();
      alert(this.$el.find("input[name=search]")[0].value);
    }
  });

  return topNav;
});