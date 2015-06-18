define(["marionette"], function(){
  var userView = Backbone.Marionette.ItemView.extend({
    template: "#js-user-show-tmpl",
    modelEvents:{
      "change": "render"
    }
  });

  return userView;
});