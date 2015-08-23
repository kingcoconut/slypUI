define(["marionette", "views/slyps/slyp_child_view", "isotope", 'imagesloaded'], function(Marionette, SlypView, Isotope, imagesloaded){
  var slypCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: SlypView,
    className: 'js-slyps js-isotope',
    initialize: function(){
      this.on("show", this.setupIso, this);
    },
    setupIso: function(){
      // setup isotope
      App.iso = new Isotope( ".js-slyps", {
        itemSelector: '.js-single-slyp',
        layoutMode: 'masonry',
        getSortData: {
          engaged: '[data-engaged]',
          unread_messages: '[data-unread-messages]',
          created_at: '[data-created-at]'
        },
        sortBy: ['engaged', 'unread_messages', 'created_at'],
        sortAscending: {
          engaged: true,
          unread_messages: false,
          created_at: false
        }
      });
      App.iso._create();
      
      // reshuffle the slyps once all the images have loaded on page
      imagesloaded(this.$el, function(){
        App.iso.arrange();
      });
    }
  });

  return slypCollectionView;
});

