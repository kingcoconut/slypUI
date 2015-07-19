define(["marionette", "views/slyps/show", "waypoints"], function(Marionette, SlypView){
  var slypsView = Backbone.Marionette.CollectionView.extend({
    childView: SlypView,
    onRender: function(){
      var that = this;
    },
    collectionEvents: {
      "sync" : "render"
    }
  });

  return slypsView;
});

