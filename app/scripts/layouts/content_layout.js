define(["marionette", "views/interface/topNav", 'views/slyps/slyp_collection_view', 'bootstrap'], function(Mn, TopNav, slypCollectionView, bootstrap){
  var contentLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",

    regions: {
      topRegion : ".js-top-nav",
      mainRegion : ".js-main",
    },

    onShow: function(){
      this.topRegion.show(new TopNav());
      this.mainRegion.show(new slypCollectionView({collection: App.slypCollection}))
    }
  });

  return contentLayout;
});

// define(["marionette", "views/slyps/list", "collections/slyp_chats", "layouts/chatLayout", "isotope"], function(Marionette, SlypsView, SlypChats, ChatLayout){
//   var feedLayout = Backbone.Marionette.ItemView.extend({
//     template: "#js-feed-layout-tmpl",
//     className: 'row',

//     initialize: function(options){
//       debugger;
//       this.slyps = options.slyps;
//       this.listenTo(this.slyps, "slypDocked", this.renderFeedRight, this);
//       this.listenTo(App.vent, "changeChatMsg", this.changeChatMsg, this);
//     },

//     onShow: function(){
//       new SlypsView({collection: this.slyps});
//       $('.js-feed-left').slimScroll({
//         height: window.innerHeight - 56
//       });
//     },

//   });

//   return feedLayout;
// });