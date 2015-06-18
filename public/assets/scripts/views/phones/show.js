define(["marionette"], function(Marionette){
  var phoneView = Backbone.Marionette.ItemView.extend({
    template: "#js-phone-show-tmpl"
  });

  return phoneView;
});