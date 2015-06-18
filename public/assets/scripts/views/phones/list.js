define(["marionette", "views/phones/show", "views/phones/empty"], function(Marionette, phoneView, emptyView){
  var phonesView = Backbone.Marionette.CompositeView.extend({
    template: "#js-phones-list-tmpl",
    childView: phoneView,
    childViewContainer: "#phones-container",
    emptyView: emptyView
  });

  return phonesView;
});