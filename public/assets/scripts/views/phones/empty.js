define(["marionette"], function(Marionette){
  var phoneView = Backbone.Marionette.ItemView.extend({
    template: "#js-phones-empty-tmpl"
  });

  return phoneView;
});