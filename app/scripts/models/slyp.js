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
      id: 1
    },

    fetchChats: function(){
      var slyp_id = this.get('id');
      slypChats = new SlypChats();
      slypChats.fetch({data: $.param({slyp_id: slyp_id})});
      this.set("slyp_chats", slypChats);
    },

    dock: function(){
      if(this.collection)
        this.collection.setDockedSlyp(this);
    }
  });
  return slyp;
});