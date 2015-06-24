define(["marionette", "views/interface/topNav", 'jquery-ui', 'icheck', 'bootstrap'], function(Marionette, jqueryui, topNav, icheck, bootstrap){
  var interfaceLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",
    el: "#js-body",

    regions: {
      topRegion : ".js-top-nav",
      mainRegion : ".js-main",
    },

    onRender: function(){
      $("body").removeClass().addClass("fixed-navbar");
      $("#facebook-login").remove();
    }
  });

  return interfaceLayout;
});