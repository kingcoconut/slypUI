define(["marionette", "models/user"], function(Marionette, User){
  var UserCollection = Backbone.Collection.extend({
    initialize: function(){
      this.url = window.adminHost + 'users';
    },
    model: User,
    parse: function(resp){
      return resp.response;
    },
    convertForDataTable: function(){
      data = [];
      _.each(this.models, function(el,i){
        data.push(el.attributes);
      });
      return data;
    },
    search: function(params){
      var that = this;
      $.ajax({
        url: window.adminHost + 'users/search',
        data: params,
        type: "POST",
        success: function(resp){
          that.reset(resp.response);
        },
        error: function(resp){

        }
      });
    }
  });
  return UserCollection;
});