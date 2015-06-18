define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var slypsCollection = Backbone.Collection.extend({
    url: "slyps",
    model: Slyp,
    parse: function(resp){
      return resp.response;
    }
  });

  return slypsCollection;
});