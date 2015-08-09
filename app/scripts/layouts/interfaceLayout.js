define(["marionette", "views/interface/topNav", 'bootstrap'], function(Marionette, TopNav, bootstrap){
  var interfaceLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",
    el: "#js-body",

    regions: {
      topRegion : ".js-top-nav",
      mainRegion : ".js-main",
    },

    onRender: function(){
      debugger;
      $("#facebook-login").remove();
    }
  });

  return interfaceLayout;
});