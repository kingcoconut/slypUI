define(["marionette"], function(){
  var user = Backbone.Model.extend({
    url: window.apiHost + "/users",
    defaults: {
      id: null,
      email: ""
    },

    iconAttributes: function(){
      return { id: this.id, user_color: this.getIconColor(), user_letter: this.get("email")[0], email: this.get("email"), unread_messages: this.get("unread_messages") };
    },

    getIconColor: function(){
    	var colors = ["green-light", "green-dark", "blue-light", "blue-dark", "orange", "purple", "violet"];
      var index = this.emailToInt() % colors.length;
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

