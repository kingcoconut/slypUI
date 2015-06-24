define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var slypsCollection = Backbone.Collection.extend({
    url: "slyps",
    model: Slyp,
    parse: function(resp){
      return resp.response;
    },
    createFromUrl: function(url){
		$.ajax({
	      url: "/blacksmith/v1/slyps",
	      method: "POST",
	      contentType: "application/json",
	      data: JSON.stringify({slyp_url: url}),
	      collection: this,
	      success: function(response){

	      	this.collection.trigger("addingNewSlyp"); // to bump off the current first slyp in feed
	        this.collection.create(response, {at: 0});
	      },
	      error: function(status, response){
	        console.log(status)
	      }
	    });
    }
  });

  return slypsCollection;
});