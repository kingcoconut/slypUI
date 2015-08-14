define(["marionette", "collections/slyp_chats"], function(Marionette, SlypChats){
  var slyp = Backbone.Model.extend({
    defaults: {
      urlRoot: window.apiHost + "/slyps",
      title: "",
      url: "",
      raw_url:"",
      author: "",
      date: Date.now,
      text: "",
      summary: "",
      description: "",
      top_image: "",
      sitename: "",
      video_url: "",
      id: 1,
      engaged: false,
      users: []
    },

    genUserIcons: function(){
      var self = this,
          arr = [];
      _.each(this.get('users'), function(user){
         arr.push({ user_color: self.getIconColor(user.email), user_letter: user.email[0] })
      })
      return arr
    },

    getIconColor: function(email){
      var index = this.emailToInt(email) % 8;
      colors = ["red", "green-light", "green-dark", "blue-light", "blue-dark", "orange", "purple", "violet"];
      return colors[index];
    },

    emailToInt: function(str){
      var length = str.length;
      var val = str.charCodeAt(length-1) + str.charCodeAt(1) + str.charCodeAt(length/2)
      return val;
    },

    fetchChats: function(){
      // only make a new collection if one doesn't yet exist for this slyp
      if(!this.get("slyp_chats")){
        this.set("slyp_chats", new SlypChats({slyp_id: this.get("id")}));
      }
      this.get("slyp_chats").fetch();
    },

    dock: function(){
      if(this.collection)
        this.collection.setDockedSlyp(this);
    },
    sendTo: function(emails){
      var that = this;
      $.ajax({
        url: window.apiHost + "/slyp_chats",
        data: {slyp_id: this.get("id"), emails: emails},
        method: "POST",
        success: function(resp){
          resp.forEach(function(slypChat){
            slypChat.users.forEach(function(user){
              if (user.email == App.user.get('email')) { return }
              var sockSlyp = {
                slyp_id: that.get('id'),
                user_id: user.id,
                sender_email: App.user.get('email'),
                slyp_title: that.get('title')
              }
              App.socketclient.pushSlyp(sockSlyp);  
            })
          });

          var slypChats = that.get("slyp_chats");
          slypChats.add(resp, {parse: true, at: 0});
          slypChats.first().setSelected();
        },
        error: function(error, msg, status){
          alert(error.responseText);
          console.log(error);
        }
      });
    }
  });
  return slyp;
});