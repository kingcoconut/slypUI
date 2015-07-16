define(["marionette"], function(){
  var user = Backbone.Model.extend({
    defaults: {
      id: null,
      email: "",
      api_token: null
    }
  });
  return user;
});

