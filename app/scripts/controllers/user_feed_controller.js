define(["marionette", "layouts/content_layout", "collections/slyps", "mocks/slyps_mock" ], function(Mn, contentLayout, slyps){
  var userFeedController = Marionette.Object.extend({

    initialize: function() {
      App.slypCollection = new slyps();
      App.slypCollection.fetch();
      this.initViews();
    },

    initViews: function() {
      App.body.show(new contentLayout({collection: App.slypCollection}))
    }
  });

  return userFeedController;
});