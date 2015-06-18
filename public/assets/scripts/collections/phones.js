define(["marionette", "models/phone"], function(Marionette, Phone){
  var PhonesCollection = Backbone.Collection.extend({
    initialize: function(id){
      this.url = window.adminHost + 'phones/' + id;
    },
    model: Phone,
    parse: function(resp){
      return resp.response;
    }
  });

  return PhonesCollection;
});