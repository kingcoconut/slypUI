define(["marionette", "views/slyps/slyp_child_view", "isotope"], function(Marionette, SlypView, Isotope){
  var slypCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: SlypView,
    className: 'js-slyps js-isotope',

    onShow: function(){
      // setup isotope
      App.iso = new Isotope( '.js-slyps', {
        itemSelector: '.js-single-slyp',
        layoutMode: 'masonry'
      });
    },

    createIsotope: function(){
      App.iso._create();
      App.iso.shuffle();
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

