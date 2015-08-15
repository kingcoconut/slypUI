define(["marionette"], function(Marionette){
  var SlypContainer = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-slyp-container-tmpl",
    className: "chat-slyp-container",
    events: {
      "click .close-button": "closeChat"
    },
    onRender: function(){
    	this.$el.find('.js-card').slimScroll({
        height: window.innerHeight - 80
      });
    },
    closeChat: function(){
    	App.vent.trigger("closeChat");
    	$('body').removeClass("no-scroll");
    },
    // FIXME- will remove this once we generate userIcons after fetching data
    serializeData: function(){
      return {
        title: this.model.get('title'),
        site_name: this.model.get('site_name'),
        video: this.model.get('video_url'),
        image: this.model.get('top_image'),
        summary: this.model.get('summary'),
        description: this.model.get('description'),
        text: this.model.get('text'),
        url: this.model.get('url'),
        users: this.model.genUserIcons(this.model.get('users'))
      }
    }
  });
  return SlypContainer;
});