define(["marionette"], function(){
  var signin = Backbone.View.extend({

    template: "#js-authenticate-tmpl",

    el: "#js-body",

    events: {
      "click .js-authenticate-submit"  : "submit",
      "submit form": "submit",
      "click .js-facebook-connect": "fbLogin",
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

    submit: function(event) {
      event.preventDefault();
      var self = this;
      var data = {
        email: $("#signin-page [name=email]", this.el).val()
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
          alert("check your email");
        }
      });
    },

    close: function(){
      alert("successful authentication");
    }
  });

  return signin;
});