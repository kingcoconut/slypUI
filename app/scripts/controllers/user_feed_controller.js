define(["marionette"], function(){
  var userFeedController = Marionette.Object.extend({

    initialize: function() {
      this.initViews();
    },

    initViews: function() {
      debugger;
      App.idCardRegion.show(new SharedViews.IDCardRenderer({model: App.coreInfo}));
      App.bottomModulesRegion.show(new SharedViews.SignedOutBottomLayout({model: App.coreInfo}));
      App.coverPhotoRegion.show(new PhotoViews.CoverPhoto({model: App.photos}));
    }
  });

  return userFeedController;
});