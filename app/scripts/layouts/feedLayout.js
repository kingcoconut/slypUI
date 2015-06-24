define(["marionette", "views/slyps/list"], function(Marionette, slypsView){
  var interfaceLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onRender: function(){
      this.feedLeft.show(new slypsView({collection: this.slyps}));
    },
    initialize: function(options){
    	this.slyps = options.slyps
    }
  });

  return interfaceLayout;
});