define(["marionette"], function(Marionette, moment, slimscroll){
  var sendSlypView = Backbone.Marionette.ItemView.extend({
    template: "#js-send-slyp-modal-tmpl",
    className: "overlay",
    events:{
      ".js-send-slyp": "parseInput",
      "submit #js-send-slyp-modal-form": "parseInput"
    },
    parseInput: function(evt){
      evt.preventDefault();
      var input = this.$el.find("#js-send-slyp-input");
      var query = input.val();

      var user_email = App.user.get('email');
      var emails = query.replace(user_email, '').split(' ');
      this.model.sendTo(emails);
      this.$(".js-close-modal").click();
    },
    onRender: function(){
      var that = this;
      $("#myModal").modal();
      $("#myModal").on("hidden.bs.modal", function(){
        that.trigger("closeMe");
      });
      setTimeout(function(){
        that.$("input").focus();
      },1000);
    }
  });

  return sendSlypView;
});