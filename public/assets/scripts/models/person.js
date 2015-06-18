define(["marionette"], function(){
  var Person = Backbone.Model.extend({
    initialize: function(id){
      this.url = window.adminHost + 'person/' + id;
      this.fetch();
    },
    parse: function(resp){
      return resp.response;
    }
  });

  return Person;
});