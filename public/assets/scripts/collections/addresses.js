define(["marionette", "models/address"], function(Marionette, Address){
  var AddressesCollection = Backbone.Collection.extend({
    initialize: function(id){
      this.url = window.adminHost + 'addresses/' + id;
    },
    model: Address,
    parse: function(resp){
      return resp.response;
    }
  });

  return AddressesCollection;
});