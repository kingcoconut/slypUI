define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var slypsCollection = Backbone.Collection.extend({
    url: window.apiHost + "/slyps",

    model: Slyp,

    initialize: function(options){
      this.listenTo(App.vent, "recSlyp", this.addSlyp);
    },

    createFromUrl: function(slyp_url){
      $.ajax({
        url: window.blacksmithHost + "/slyps",
        method: "POST",
        contentType: "application/json",
        crossDomain: true,
        data: JSON.stringify({slyp_url: slyp_url}),
        collection: this,
        success: function(response){
          response.users = [];
          response.recently_added = 0;
          App.slypCollection.add(new Slyp(response, {parse: true}));
        },
        error: function(status, response){
          console.log(status);
        }
      });
    },

    addSlyp: function(data){
      //FIXME: make a new Slyp model from the data (do we get enough data from the socket here?) 
      // and then add the slyp to position 0
      s = new Slyp(data, {parse: true});
      // this.fetch();
      this.collection.add(s, {at: 0});
    }

  });

  return slypsCollection;
});