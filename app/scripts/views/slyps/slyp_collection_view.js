define(["marionette", "views/slyps/slyp_child_view", "waypoints"], function(Marionette, SlypView){
  var slypCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: SlypView,
  });

  return slypCollectionView;
});

