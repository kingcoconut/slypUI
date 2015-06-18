define(["marionette", "layouts/tabularLayout", "views/users/nav", "views/users/show", "views/users/photos", "views/people/show", "views/addresses/list", "views/phones/list", "views/emails/list", "views/flags/list"], function(Marionette, tabularLayout, userNav, userView, photosView, personView, addressesView, phonesView, emailsView, flagsView){
  var UserController = Marionette.Object.extend({
    initialize: function(){
      var that = this;
      App.vent.on("userNavigate", function(view){
        that[view]();
      });
    },

    user: function(){
      this.layout.mainRegion.show(new userView({model: this.model}));
    },

    photos: function(){
      this.layout.mainRegion.show(new photosView({model: this.model}));
    },

    person: function(){
      this.layout.mainRegion.show(new personView({model: this.model.person}));
    },

    emails: function(){
      this.layout.mainRegion.show(new emailsView({collection: this.model.emails}));
    },

    addresses: function(){
      this.layout.mainRegion.show(new addressesView({collection: this.model.addresses}));
    },

    phones: function(){
      this.layout.mainRegion.show(new phonesView({collection: this.model.phones}));
    },

    flags: function(){
      this.layout.mainRegion.show(new flagsView({collection: this.model.flags}));
    },

    verifications: function(){

    },

    displayLayout: function(view){
      this.layout = new tabularLayout();
      this.layout.render();
      this.layout.navRegion.show(new userNav({active: view}));
    }
  });

  return UserController;
});