define(["marionette"], function(){
  var personView = Backbone.Marionette.ItemView.extend({
    template: "#js-person-show-tmpl",
    modelEvents:{
      "change": "render"
    }
  });

  return personView;
});