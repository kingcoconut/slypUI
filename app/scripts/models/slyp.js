define(["marionette"], function(){
  var Slyp = Backbone.Model.extend({
    defaults: {
      title: "",
      author: "",
      date: Date.now,
      text: "",
      description: "",
      top_image: "",
      sitename: ""
    }
  });

  return Slyp;
});