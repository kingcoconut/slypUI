define(["marionette", "collections/slyp_chats", "collections/users"], function(Marionette, SlypChats, usersCollection){
  var slyp = Backbone.Model.extend({
    defaults: {
      id: null,
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
      engaged: false,
      topic: ""
    },

    parse: function(response){
      this.response = response;
      this.set("users", new usersCollection(response.users));
      if(App.friends.length < 1){
        this.listenTo(App.friends, "sync", this.makeExcludedFriends, this);
      }else{
        this.makeExcludedFriends();
      }
      this.set("slyp_chats", new SlypChats(null, {slyp_id: response.id}));
      delete response.users;

      return response;
    },

    makeExcludedFriends: function(){
      var icons = [];
      var users = this.get("users");
      _.each(App.friends.models, function(user){
        if(typeof(users.get(user.id)) === "undefined"){
          // we only want to keep their icons, entire model is overkill
          icons.push(user.iconAttributes());
        }
      });
      this.set("excluded_friends", icons);

      // When a new friend is added make sure their icon is added to this list
      this.listenTo(App.friends, "addIcon", this.addExcludedFriend, this);
    },

    // This add a new friend icon to excluded friends
    addExcludedFriend: function(icon){
      this.get("excluded_friends").push(icon);
    },

    // remove a user from the exlucded_friends list
    excludeUser: function(user_id){
      // find the user from the App.friends and add it to the slyps users
      this.get("users").add(App.friends.get(user_id), {at:0});

      // remove the user from the excluded_friends list
      var excluded = this.get("excluded_friends");
      _.each(excluded, function(el, index){
        if(el && el.id == user_id){
          excluded.splice(index,1);
          return;
        }
      });
    },
    // check if an email is in the excluded_friends list and remove it if it is
    excludeUserByEmail: function(email){
      var match = _.select(this.get("excluded_friends"), function(el){ return el.email == email })[0];
      if(match)
        this.excludeUser(match.id);      
    },

    genUserIcons: function(){
      var self = this,
          arr = [];
      var users = this.get('users');          
      if(users.length > 0){
        _.each(users.models, function(user){
           arr.push(user.iconAttributes());
        })
      }
      return arr
    },

    fetchChats: function(){
      // only make a new collection if one doesn't yet exist for this slyp
      this.get("slyp_chats").fetch();
    },

    select: function(){
      if(this.collection)
        this.collection.setCurrent(this);
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