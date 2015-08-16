define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp", "isotope"], function(Marionette, moment, slimscroll, sendSlypView, Isotope){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',
    ui: {
      main: '.js-card-main',
      send : '.js-send-slyp',
      content: ".content",
      action: ".action"
    },

    events: {
      "click @ui.main" : "chosenByUser",
      "click .js-expand-slyp" : "chosenByUser",
      "click @ui.send" : 'sendSlyp'
    },

    onShow: function(){
      this.checkVideoPresence();
    },

    checkVideoPresence: function(){
      if ( _.size(this.model.get('video_url')) > 2 ) {
        this.ui.action.find('h4').addClass('hide--attr')
      }
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
    },

    // choose a slyp and expand it to right then open chat
    chosenByUser: function(event){
      $('body').addClass("no-scroll");
      this.model.select();
    },

    sendSlyp: function(){
      var sendSlyp = new sendSlypView({model: this.model});
      $("#modals").append(sendSlyp.$el.show());
      sendSlyp.render();
    }

  });

  return slypView;
});