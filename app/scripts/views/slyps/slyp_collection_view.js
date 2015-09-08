define(["marionette", "views/slyps/slyp_child_view", "isotope", 'imagesloaded'], function(Marionette, SlypView, Isotope, imagesloaded){
  var slypCollectionView = Backbone.Marionette.CompositeView.extend({
    childView: SlypView,
    template: '#js-slyp-container-tmpl',
    className: 'js-slyps js-isotope',

    onShow: function(){
      this.setupIso();
    },

    setupIso: function(){
      // setup isotope
      App.iso = new Isotope( ".js-slyps", {
        itemSelector: '.js-single-slyp',
        layoutMode: 'masonry',
        getSortData: {
          engaged: '[data-engaged]',
          unread_messages: '[data-unread-messages]',
          created_at: '[data-created-at]',
          recently_added: '[data-recently-added]'
        },
        sortBy: ['recently_added', 'unread_messages', 'engaged', 'created_at'],
        sortAscending: {
          engaged: true,
          unread_messages: false,
          created_at: false
        },
        stamp: '.js-filter-bar'
      });
      App.iso._create();
      // reshuffle the slyps once all the images have loaded on page
      var that = this;
      imagesloaded(this.$el, function(){
        App.iso.arrange();
        that.isoSetup = true;
      });
    },

    onAddChild: function(e){
      if(this.isoSetup){
        App.iso.insert(e.$el);
        imagesloaded(e.$el, function(){
          App.iso.arrange();
        });
      }
    }
  });

  return slypCollectionView;
});

