define(["marionette"], function(){
  var signin = Backbone.View.extend({

    template: "#js-authenticate-tmpl",

    el: "#js-body",

    events: {
      "click .js-authenticate-submit"  : "submit",
      "submit form": "submit",
      "click .js-sign-in": "signin",
      "click .js-facebook-connect": "fbLogin",
      "click .js-signup-submit"  : "submitSignup",
      "click .js-sign-up": "signup",
      "click .js-sign-in": "signin",
    },

    initialize: function(){
      window.checkLoginState = function() {
        FB.getLoginStatus(function(response) {
          if(response.status === "connected"){
            App.authorized = true;
            Backbone.history.navigate("/", true);
            $("#facebook-login").remove();
          }
          statusChangeCallback(response);
        });
      };
      $("body").removeClass().addClass("login");
      this.render();
    },

    render: function(){
      $("#js-body").html($(this.template).html());
      $("#facebook-login").appendTo("#facebook-button-on-form");
    },

    signup: function(e){
      e.preventDefault();
      this.$el.find("#signin-page").hide();
      this.$el.find("#signup-page").show();
    },

    signin: function(e){
      e.preventDefault();
      this.$el.find("#signin-page").show();
      this.$el.find("#signup-page").hide();
    },

    submit: function(event) {
      event.preventDefault();
      var self = this;
      var data = {
        email: $("#signin-page [name=email]", this.el).val(),
        password: $("#signin-page [name=password]", this.el).val()
      };

      $.ajax({
        type: "POST",
        url: window.apiHost + "/users/auth",
        data: data,
        error: function(req, resp){
          alert("Auth failed");
        },
        success: function(resp){
          App.authorized = true;
          Backbone.history.navigate("", {trigger: true});
        }
      });
    },
    submitSignup: function(event) {
      event.preventDefault();
      var self = this;
      var data = {
        email: $("#signup-page [name=email]", this.el).val(),
        password: $("#signup-page [name=password]", this.el).val()
      };

      $.ajax({
        type: "POST",
        url: window.apiHost + "/users",
        data: data,
        error: function(req, resp){
          alert("Auth failed");
        },
        success: function(resp){
          App.authorized = true;
          Backbone.history.navigate("", {trigger: true});
        }
      });
    },
    close: function(){
      alert("successful authentication");
    }
  });

  return signin;
});