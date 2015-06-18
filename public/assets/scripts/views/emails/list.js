define(["marionette", "views/emails/show"], function(Marionette, emailView){
  var emailsView = Backbone.Marionette.CompositeView.extend({
    template: "#js-emails-list-tmpl",
    childView: emailView,
    childViewContainer: "#emails-container"
  });

  return emailsView;
});