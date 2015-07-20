define(["marionette"], function(){
  var user = Backbone.Model.extend({
    url: window.apiHost + "/users",
    defaults: {
      id: null,
      email: ""
    }
  });
  return user;
});

