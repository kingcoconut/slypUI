define(["marionette", "models/flag"], function(Marionette, Flag){
  var FlagsCollection = Backbone.Collection.extend({
    initialize: function(id){
      if(id){
        this.url = window.adminHost + 'flags/' + id;
      }
    },
    url: window.adminHost + "flags",
    model: Flag,
    parse: function(resp){
      return resp.response;
    },
    convertForDataTable: function(){
      data = [];
      _.each(this.models, function(el,i){
        data.push(el.attributes);
      });
      return data;
    }
  });

  return FlagsCollection;
});