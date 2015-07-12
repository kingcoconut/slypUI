define(["marionette", "views/slyps/list", "views/slypchats/list", "collections/slyp_chats"], function(Marionette, slypsView, slypChatsView, slypChats){
  var feedLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onRender: function(){
      this.feedLeft.show(new slypsView({collection: this.slyps}));
      if (this.slyps.length > 0){
        this.slyps.first().fetchChats();
        this.feedRight.show(new slypChatsView({collection: this.slyps.first().slypChats}));
      }
    },
    initialize: function(options){
    	this.slyps = options.slyps;
      this.listenTo(this.slyps, "reset", this.renderFeedRight, this);
    },

    renderFeedRight: function(){
      if (this.slyps.length > 0){
        this.slyps.first().fetchChats();
        debugger
        this.feedRight.show(new slypChatsView({collection: this.slyps.first().slypChats}));
      }      
    }
  });

  return feedLayout;
});