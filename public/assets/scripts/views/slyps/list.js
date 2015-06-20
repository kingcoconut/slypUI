define(["marionette", "views/slyps/show", "waypoints"], function(Marionette, slypView){
  var slypsView = Backbone.Marionette.CollectionView.extend({
    childView: slypView,
    onRender: function(){
      var that = this;
    }
  });

  return slypsView;
});

