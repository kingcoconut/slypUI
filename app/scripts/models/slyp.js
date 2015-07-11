define(["marionette"], function(){
  var Slyp = Backbone.Model.extend({
    defaults: {
      urlRoot: window.blacksmithHost + "/slyps",
      title: "",
      url: "",
      raw_url:"",
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