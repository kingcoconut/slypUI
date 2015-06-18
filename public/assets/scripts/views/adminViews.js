$(function(){
  views = {};

  views.userLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-user-layout",

    modelEvents: {
      "change:dataFetched" : "renderIntro"
    },

    regions: {
      nav: ".js-user-layout-nav",
      main: ".js-user-layout-main"
    },

    initialize: function() {
      this.VIEWS =

      this.listenTo(App.vent, "userLayoutNavigate", this.renderView);
    },

    onShow: function(){
      this.renderIntro();
    },

    renderView: function(view) {
      var status = this.model.getVerificationStatus();
      if (this.INTRO_STATES[status]) {
        this.intro.show(new this.INTRO_STATES[status]());
      }
    }
  });

  views.userShow = Backbone.Marionette.ItemView.extend({

    template: "#js-user-show-tmpl",
    // className: "overlay",
    id: "js-main",

    ui: {

    },

    events: {

    },

    modelEvents: {

    }
  });

  defineModule("views.admin", views);
});