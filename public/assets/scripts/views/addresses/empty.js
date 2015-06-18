define(["marionette"], function(Marionette){
  var emptyView = Backbone.Marionette.ItemView.extend({
    template: "#js-addresses-empty-tmpl"
  });

  return emptyView;
});