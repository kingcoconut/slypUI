define(["marionette", "views/auth/signin", "views/interface/topNav", "cookies", "layouts/interfaceLayout", "layouts/feedLayout", "collections/slyps"], function(Marionette, signinView, topNav, cookie, interfaceLayout, feedLayout, slypsCollection){
  var InterfaceController = Marionette.Object.extend({
    initialize: function(){
      if(App.authorized){
        this.renderLayout();
      }
    },

    layoutRendered: false,

    home: function(){
      var feed = new feedLayout({slyps: this.slyps});
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
        _this = this;
        this.slyps = new slypsCollection();
        this.slyps.fetch();
        App.layout = new interfaceLayout();
        App.layout.render();
        App.layout.topRegion.show(new topNav({slyps: _this.slyps}));
        this.layoutRendered = true;
      }
    }
    });
  return InterfaceController;
});












