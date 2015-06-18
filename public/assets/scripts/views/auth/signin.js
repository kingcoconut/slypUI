define(["marionette"], function(){
  var signin = Backbone.View.extend({

    template: "#js-authenticate-tmpl",

    el: "body",

    events: {
      "click .js-authenticate-submit"  : "submit",
      "submit": "submit",
      "click .asdf": "test"
    },

    initialize: function(){
      $("body").removeClass().addClass("login");
      this.render();
    },

    render: function(){
      $("body").html($(this.template).html());
    },

    submit: function(event) {
      event.preventDefault();
      var self = this;
      var data = {
        username: $("[name=username]", this.el).val(),
        password: $("[name=password]", this.el).val()
      };

      $.ajax({
        type: "POST",
        url: window.authHost + "/auth",
        data: data,
        error: function(req, resp){
          alert("Auth failed");
        },
        success: function(resp){
          if(resp.token){
            $.cookie("authentication_token", resp.token, {domain: ".identity.com"});
          }
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