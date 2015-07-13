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
      description: "",
      top_image: "",
      sitename: "",
      video_url: "",
      id: 1
    },

    fetchChats: function(){
      var slyp_id = this.get('id');
      this.slypChats = new SlypChats();
      this.slypChats.fetch({data: $.param({slyp_id: slyp_id})});
    },

    dock: function(){
      if(this.collection)
        this.collection.setDockedSlyp(this);
    }
  });
  return slyp;
});