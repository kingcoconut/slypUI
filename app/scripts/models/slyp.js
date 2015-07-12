define(["marionette", "collections/slyp_chats"], function(Marionette, SlypChats){
  var Slyp = Backbone.Model.extend({
    defaults: {
      urlRoot: window.blacksmithHost + "/slyps",
      title: "",
      url: "",
      raw_url:"",
      author: "",
      date: Date.now,
      text: "",
      description: "",
      top_image: "",
      sitename: "",
      video_url: "",
      id: 1
    },

    fetchChats: function(){
      this.slypChats = new SlypChats(this.get('id'));
      this.slypChats.reset([{id: 10, alertMsg: ''}, {id: 12, alertMsg: ''}])
      //this.slypChats.fetch();
    }

  });

  return Slyp;
});