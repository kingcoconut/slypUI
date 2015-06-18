define(["marionette", "views/addresses/show", "views/addresses/empty"], function(Marionette, addressView, emptyView){
  var addressesView = Backbone.Marionette.CompositeView.extend({
    template: "#js-addresses-list-tmpl",
    childView: addressView,
    childViewContainer: "#addresses-container",
    emptyView: emptyView
  });

  return addressesView;
});