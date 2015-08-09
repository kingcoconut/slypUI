define(["marionette", "views/auth/signin"], function(Mn, landingView){
  var landingController = Marionette.Object.extend({

    initialize: function() {
      this.listenTo(App.user, "change", this.refresh);
    },

    refresh: function(){
      if ( !_.isNull(App.user.get('id')) ){
         App.vent.trigger("myfeed");
      }
      this.initViews();
    },

    initViews: function() {
      App.body.show(new landingView({model: App.user}))
    }
  });

  return landingController;
});