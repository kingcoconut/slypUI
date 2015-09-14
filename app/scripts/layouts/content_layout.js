define(["marionette",
  'views/slyps/slyp_collection_view',
  'views/interface/grokBox',
  'views/interface/filterBox',
  './chatLayout',
  'bootstrap'], function(
    Mn,
    slypCollectionView,
    grokBox,
    filterBox,
    chatLayout,
    bootstrap
  ){
  var contentLayout = Backbone.Marionette.LayoutView.extend({
    template: "#js-interface-layout-tmpl",

    regions: {
      mainRegion : ".js-main-reg",
      chatRegion : '.js-chat-reg',
      grokRegion : '.js-grok-reg',
      filterRegion : '.js-filter-reg',
    },

    initialize: function(options){
      this.listenTo(App.vent, "showChat", this.showChatLayout, this);
      this.listenTo(App.slypCollection, "sync", this.onShow, this);
      this.listenTo(App.vent, "recChatMsg", this.recSockMsg, this);
      App.vent.on("closeChat", this.closeChat, this);
    },

    closeChat: function(){
      $('body').removeClass("no-scroll");
      if(this.chatRegion.currentView){
        this.chatRegion.currentView.destroy();
        App.slypCollection.currentSlypChat = undefined;
      }
    },

    onShow: function(){
      // Catch the user if they are coming with a slyp_id && they are on a mobile
      // redirect them to the slypURL
      if (getUrlParameter('slyp_id') && false){ // false placeholder for useragent == mobile
        var slypID = parseInt(getUrlParameter('slyp_id'));
        if (App.slypCollection.get(slypID)){
          var slypURL = App.slypCollection.get(slypID).get('raw_url');
          window.location.replace(slypURL);
        }

      }

      this.grokRegion.show(new grokBox({collection: App.slypCollection}));
      this.filterRegion.show(new filterBox({collection: App.slypCollection}));
      if(App.slypCollection.length > 0)
        this.mainRegion.show(new slypCollectionView({collection: App.slypCollection}));

        // ATTENTION: is there a better place that I should exist?
        if (getUrlParameter('slyp_id')){
          var slypID = getUrlParameter('slyp_id');
          App.vent.trigger("showChat", slypID)
        }
    },

    showChatLayout: function(slypID, slypChatID, slypChatEmail){
      App.slypCollection.get(slypID).select();
      this.closeChat();

      $('body').addClass("no-scroll");
      this.chatRegion.show(new chatLayout({slypID: slypID, slypChatID: slypChatID, slypChatEmail: slypChatEmail}));
    },

    recSockMsg: function(data){
      if (App.slypCollection.currentSlypChat && App.slypCollection.currentSlypChat.id == data.slyp_chat_id){
        App.slypCollection.currentSlypChat.get("slyp_chat_messages").add(data);
        // scroll down the slimscroll
        msgs = $(".js-chat-messages-container .message");
        lastMsg = msgs[msgs.length-1];
        $(".js-chat-messages-container").slimscroll({ scrollBy: $(lastMsg).outerHeight(true) });
        App.slypCollection.currentSlypChat.markAsRead();
      } else {
        var that = this;
        toastr.options.onclick = function() { 
          App.vent.trigger("changeChatMsg", data);
          toastr.options.onclick = null; 
        }
        toastr.success('Recieved chat message from ' + data.sender_email);
      }
    }
  });

  return contentLayout;
});
