define(["marionette", "jquery.validate"], function(Marionette, validate){
  var sendSlypView = Backbone.Marionette.ItemView.extend({
    template: "#js-send-slyp-modal-tmpl",
    className: "overlay",
    events:{
      ".js-send-slyp": "parseInput",
      "submit #js-send-slyp-modal-form": "parseInput"
    },
    parseInput: function(evt){
      evt.preventDefault();
      var form = this.$("#js-send-slyp-modal-form");
      if(form.valid()){
        var input = form.find("[name=email]");

        var query = input.val();

        var user_email = App.user.get('email');
        var emails = query.replace(user_email, '').split(' ');
        this.model.sendTo(emails);
        this.$(".js-close-modal").click();
      }
    },
    onRender: function(){
      var that = this;
      $("#myModal").modal();
      $("#myModal").on("hidden.bs.modal", function(){
        that.trigger("closeMe");
      });
      setTimeout(function(){
        that.$("input").focus();

        that.$("#js-send-slyp-modal-form").validate({
        rules:{
          email:{
            email: true,
            required: true
          },
        }
      });
      },1000);
    },
    onShow: function(){
    }
  });

  return sendSlypView;
});