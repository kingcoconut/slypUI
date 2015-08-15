define(["marionette", "views/interface/topNav", "layouts/content_layout", "collections/slyps" ], function(Mn, TopNav, contentLayout, slyps){
  var userFeedController = Marionette.Object.extend({

    initialize: function() {
      App.slypCollection = new slyps();
      App.slypCollection.fetch();
      this.initViews();
    },

    initViews: function() {
      App.header.show(new TopNav());
      App.body.show(new contentLayout());
    }
  });

  return userFeedController;
});