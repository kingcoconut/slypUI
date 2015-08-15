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
          this.collection.trigger("addingNewSlyp"); // to bump off the current first slyp in feed
          this.collection.fetch();
        },
        error: function(status, response){
          console.log(status);
        }
      });
    },

    addSlyp: function(data){
      this.fetch();
      // this.collection.add(data, {at: 0});
    },

    setCurrent: function(slyp){
      if(this.currentSlypId != slyp.get("id")){
        this.currentSlypId = slyp.get("id");
        slyp.fetchChats();
      }
      this.trigger("slypSet");
    },

    currentSlyp: function(){
      return this.get(this.currentSlypId);
    }

  });

  return slypsCollection;
});