define(["marionette"], function(Mn){
  var signin = Backbone.Marionette.ItemView.extend({
    template: "#js-authenticate-tmpl",

    ui: {
      submit : ".js-auth-submit",
      emailInput : ".js-email-input"
    },

    events: {
      "click @ui.submit" : "submitForm",
    },

    submitForm: function() {
      var self = this;
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
    },

  });

  return signin;
});