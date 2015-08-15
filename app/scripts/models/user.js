define(["marionette"], function(){
  var user = Backbone.Model.extend({
    url: window.apiHost + "/users",
    defaults: {
      id: null,
      email: ""
    },

    getIconColor: function(){
    	var index = this.emailToInt() % 8;
    	colors = ["red", "green-light", "green-dark", "blue-light", "blue-dark", "orange", "purple", "violet"];
    	return colors[index];
    },

    emailToInt: function(){
    	var str = this.get("email");
    	var length = str.length;
    	var val = str.charCodeAt(length-1) + str.charCodeAt(1) + str.charCodeAt(length/2)
    	return val;
    },

  });
  return user;
});

