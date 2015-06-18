define(["marionette"], function(Marionette){
  var emailView = Backbone.Marionette.ItemView.extend({
    template: "#js-email-show-tmpl"
  });

  return emailView;
});