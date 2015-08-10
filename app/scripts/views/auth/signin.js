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
      this.model.save(this.ui.emailInput.val(),{
        wait: true,
        error: function(){ self.errorCb(req, resp); },
        success: function(){ self.successCb(resp); },
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