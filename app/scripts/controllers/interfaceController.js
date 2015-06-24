define(["marionette", "views/auth/signin", "views/interface/topNav", "cookies", "layouts/interfaceLayout", "layouts/feedLayout"], function(Marionette, signinView, topNav, cookie, interfaceLayout, feedLayout){

  var InterfaceController = Marionette.Object.extend({
    initialize: function(){
      if(App.authorized){
        this.renderLayout();
      }
    },

    layoutRendered: false,

    home: function(){
      // refetch users collection
      var feed = new feedLayout();
      App.layout.mainRegion.show(feed);
    },

    signin: function(){
      var view = new signinView();
    },

    logout: function(){
      $.removeCookie("api_token", {domain: ".slyp.io"});
      $.removeCookie("user_id", {domain: ".slyp.io"});
      window.location.href = "/";
    },

    renderLayout: function(){
      if(!this.layoutRendered){
        App.layout = new interfaceLayout();
        App.layout.render();
        App.layout.topRegion.show(new topNav());
        this.layoutRendered = true;
      }
    }
  });

  return InterfaceController;
});