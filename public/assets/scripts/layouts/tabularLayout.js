define(["marionette"], function(Marionette){
  var tabularLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-tabular-layout-tmpl",

    el: "#js-main",

    regions: {
      navRegion : "#js-tabular-nav",
      mainRegion : "#js-tabular-content",
    },
  });

  return tabularLayout;
});