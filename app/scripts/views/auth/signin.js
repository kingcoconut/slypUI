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
      this.model.save(this.ui.emailInput.val(),{
        error: function(){ this.errorCb(req, resp); },
        success: function(){ this.successCb(resp); },
      });
    },

    errorcb: function(req, resp){
      alert("Auth failed");
    },

    success: function(resp){
      alert("check your email");
    }

  });

  return signin;
});