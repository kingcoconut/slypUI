define(["marionette"], function(Marionette){
  var emptyView = Backbone.Marionette.ItemView.extend({
    template: "#js-flags-empty-tmpl"
  });

  return emptyView;
});