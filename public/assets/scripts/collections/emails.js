define(["marionette", "models/email"], function(Marionette, Email){
  var EmailsCollection = Backbone.Collection.extend({
    initialize: function(id){
      this.url = window.adminHost + 'emails/' + id;
    },
    model: Email,
    parse: function(resp){
      return resp.response;
    }
  });

  return EmailsCollection;
});