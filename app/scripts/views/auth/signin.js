define(["marionette", "jquery.validate"], function(Mn, validate){
  var signin = Backbone.Marionette.ItemView.extend({
    template: "#js-authenticate-tmpl",

    ui: {
      submit : ".js-auth-submit",
      emailInput : ".js-email-input",
      form : ".js-form"
    },

    events: {
      "focusout @ui.emailInput" : "removePulse",
      "focusin @ui.emailInput" : "pulsateArrow",
      "click @ui.submit" : "submitForm",
      "submit @ui.form" : "submitForm",
      "keyup @ui.emailInput" : "checkKey"
    },

    onShow: function(){
      this.ui.form.validate({
        rules:{
          email:{
            email: true,
            required: true
          },
          tooltip_options: {
            email: {trigger:'focus', placement:'right'},
          },
        },
        showErrors: function(errorMap, errorList) {
          $.each(this.successList, function(index, value) {
            return $(value).popover("hide");
          });
          return $.each(errorList, function(index, value) {
            var _popover;
            _popover = $(value.element).popover({
              trigger: "manual",
              placement: "bottom",
              content: value.message,
              template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
            });
            _popover.data("bs.popover").options.content = value.message;
            return $(value.element).popover("show");
          });
        }
      });
    },

    pulsateArrow: function(){
      $(this.ui.submit).addClass('arrow--pulse');
    },

    removePulse: function(){
      $(this.ui.submit).removeClass('arrow--pulse');
    },

    checkKey: function(event){
      if (event.keyCode == 13){
        this.submitForm();
      }
    },

    submitForm: function() {
      var self = this;
      if (this.ui.form.valid()){
        data = {email: this.ui.emailInput.val() }
        $.ajax({
          type: 'POST',
          url: self.model.url,
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify(data),
          error: function(req, resp){
            alert("Auth failed");
          },
          success: function(resp){
            alert("check your email");
          },
        });
      }
      return false;
    },

  });

  return signin;
});