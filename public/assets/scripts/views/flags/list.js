define(["marionette", "views/flags/show", "views/flags/empty"], function(Marionette, flagView, emptyView){
  var flagsView = Backbone.Marionette.CompositeView.extend({
    template: "#js-flags-list-tmpl",
    childView: flagView,
    childViewContainer: "#flags-container",
    emptyView: emptyView
  });

  return flagsView;
});