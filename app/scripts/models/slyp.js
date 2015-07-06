define(["marionette"], function(){
  var Slyp = Backbone.Model.extend({
    defaults: {
      title: "",
      author: "",
      date: Date.now,
      text: "",
      description: "",
      top_image: "",
      sitename: "",
      video_url: ""
    }
  });

  return Slyp;
});