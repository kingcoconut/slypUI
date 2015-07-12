define(["marionette", "models/slyp_chat"], function(Marionette, SlypChat){
  var SlypChats = Backbone.Collection.extend({
  	url: window.apiHost +  "/slyp/chats",
  	model: SlypChat,

  	initialize: function(slyp_id){
  		this.url += "/" + slyp_id;	
  	}
  });
  return SlypChats
});