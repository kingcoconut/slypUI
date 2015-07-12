define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var slypsCollection = Backbone.Collection.extend({
    url: window.apiHost + "/slyps",

    model: Slyp,

    createFromUrl: function(slyp_url){
      $.ajax({
        url: window.blacksmithHost + "/slyps",
        method: "POST",
        contentType: "application/json",
        crossDomain: true,
        data: JSON.stringify({slyp_url: slyp_url}),
        collection: this,
        success: function(response){
          this.collection.trigger("addingNewSlyp"); // to bump off the current first slyp in feed
          this.collection.add(response, {at: 0});
        },
        error: function(status, response){
          console.log(status);
        }
      });
    }
  });

  return slypsCollection;
});