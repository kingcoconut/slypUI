define(["marionette"], function(){
  var user = Backbone.Model.extend({
    defaults: {
      user_id: null,
      user_name: "billy",
      api_token: null
    }
  });
  return user;
});

