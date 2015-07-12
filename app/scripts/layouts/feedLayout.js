define(["marionette", "views/slyps/list", "views/slypchats/list", "collections/slyp_chats"], function(Marionette, SlypsView, SlypChatsView, SlypChats){
  var feedLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-feed-layout-tmpl",

    regions: {
      feedLeft : ".js-feed-left",
      feedRight : ".js-feed-right",
    },
    onRender: function(){
      this.feedLeft.show(new SlypsView({collection: this.slyps}));
      if (this.slyps.length > 0){
        this.slyps.first().fetchChats();
        this.feedRight.show(new SlypChatsView({collection: this.slyps.first().slypChats}));
      }
    },
    initialize: function(options){
    	this.slyps = options.slyps;
      this.renderFeedRight();
      this.listenTo(this.slyps, "sync", this.renderFeedRight, this);
    },

    renderFeedRight: function(){
      if (this.slyps.length > 0){
        this.slyps.first().fetchChats();
        this.feedRight.show(new SlypChatsView({collection: this.slyps.first().slypChats}));
      }      
    }
  });

  return feedLayout;
});