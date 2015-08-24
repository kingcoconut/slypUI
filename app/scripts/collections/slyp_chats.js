define(["marionette", "models/slyp_chat"], function(Marionette, SlypChat){
  var SlypChats = Backbone.Collection.extend({
  	url: window.apiHost +  "/slyp_chats",
  	model: SlypChat,
    initialize: function(models, options){
      this.slyp_id = options.slyp_id;
      // track the fetch status of collection
      this.fetched = false;
      this.on("sync", function(){
        this.fetched = true;
      });
    },
    fetch: function(options) {
      // call generic fetch but with slyp_id
      return Backbone.Collection.prototype.fetch.call(this, {data: $.param({slyp_id: this.slyp_id})});
    }
  });
  return SlypChats;
});