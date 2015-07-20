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
    },

    initialize: function(options){
      this.on("sync", function(){
        var slyp = this.first();
        if(slyp){
          this.setDockedSlyp(slyp);
        }
      });
      this.listenTo(App.vent, "recSlyp", this.addSlyp);
    },

    addSlyp: function(data){
      this.collection.add(data, {at: 0});
    },

    setDockedSlyp: function(slyp){
      if(this.dockedSlypId != slyp.get("id")){
        this.dockedSlypId = slyp.get("id");
        slyp.fetchChats();
        this.trigger("slypDocked");
      }
    },

    getDockedSlyp: function(){
      return this.get(this.dockedSlypId);
    }

  });

  return slypsCollection;
});