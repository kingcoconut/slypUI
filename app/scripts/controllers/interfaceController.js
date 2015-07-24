define(["marionette", "views/auth/signin", "views/interface/topNav", "cookies", "layouts/interfaceLayout", "layouts/feedLayout", "collections/slyps", "collections/slyp_chats"], function(Marionette, SigninView, TopNav, cookie, InterfaceLayout, FeedLayout, SlypsCollection, SlypChatsCollection){
  var InterfaceController = Marionette.Object.extend({
    initialize: function(){
      this.slyps = new SlypsCollection();
      this.slyps.fetch();
      App.layout = new InterfaceLayout();
      App.layout.render();
      App.layout.topRegion.show(new TopNav({slyps: this.slyps}));
    },

    layoutRendered: false,

    home: function(){
      var feed = new FeedLayout({slyps: this.slyps});
      App.layout.mainRegion.show(feed);
    },

    signin: function(){
      var view = new SigninView();
    },

    logout: function(){
      $.removeCookie("api_token", {domain: ".slyp.io"});
      $.removeCookie("user_id", {domain: ".slyp.io"});
      window.location.href = "/";
    }
  });
  return InterfaceController;
});












