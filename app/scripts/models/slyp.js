define(["marionette", "collections/slyp_chats"], function(Marionette, SlypChats){
  var slyp = Backbone.Model.extend({
    defaults: {
      id: 1,
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
      engaged: false
    },

    fetchChats: function(){
      // only make a new collection if one doesn't yet exist for this slyp
      if(!this.get("slyp_chats")){
        this.set("slyp_chats", new SlypChats({slyp_id: this.get("id")}));
      }
      this.get("slyp_chats").fetch();
    },

    dock: function(){
      if(this.collection){
        this.collection.setDockedSlyp(this);
        if (!this.get('engaged')) {
          var that = this;
          $.ajax({
            url: window.apiHost + "/slyps/engaged/"+this.get("id"),
            method: "PUT",
            success: function(resp){
              that.set("engaged", true);
            },
            error: function(error, msg, status){
              console.log(errror);
            }
          });
        }
      }
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