define(["marionette"], function(Marionette){
  var addressView = Backbone.Marionette.ItemView.extend({
    template: "#js-address-show-tmpl"
  });

  return addressView;
});