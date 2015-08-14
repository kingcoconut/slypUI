define(["marionette", "views/slyps/slyp_child_view", "waypoints", "isotope"], function(Marionette, SlypView, waypoints, Isotope){
  var slypCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: SlypView,
    className: 'js-slyps js-isotope',

    onSlypClicked: function (args) {
      alert('Clicked');
    },

    createIsotope: function(){
      App.iso._create();
      App.iso.shuffle();
      setTimeout(function() {
        App.iso.shuffle();
      }, 1000);
    },

    onAddChild : function() {
      var self = this;
      if ( this.children.length == this.collection.length ) {
        self.createIsotope();
      }
    }
  });

  return slypCollectionView;
});

