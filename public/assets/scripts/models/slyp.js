define(["marionette"], function(){
  var Slyp = Backbone.Model.extend({
    defaults: {
      title: "",
      author: "",
      date: Date.now,
      text: "",
      top_image: "",
      sitename: ""
    }
  });

  return Slyp;
});