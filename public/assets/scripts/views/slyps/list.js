define(["marionette", "views/slyps/show"], function(Marionette, slypView){
  var slypsView = Backbone.Marionette.CollectionView.extend({
    childView: slypView
  });

  return slypsView;
});

