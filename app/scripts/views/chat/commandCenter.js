define(["marionette"], function(Marionette){
  var CommandCenter = Backbone.Marionette.ItemView.extend({
    template: "#js-command-center-tmpl",
    events: {
      "submit #js-command-center-form": "parseInput"
    },
    initialize: function(options){
      this.slyp = this.options.slyp;
    },
    parseInput: function(evt){
      evt.preventDefault();
      var input = this.$el.find("#js-command-center-input");
      var query = input.val();

      var user_email = App.user.get('email');
      var emails = query.replace(user_email, '').split(' ');
      this.slyp.sendTo(emails);
      input.val('');
    },
  });
  return CommandCenter;
});