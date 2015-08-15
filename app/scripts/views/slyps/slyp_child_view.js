define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp", "isotope"], function(Marionette, moment, slimscroll, sendSlypView, Isotope){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',
    ui: {
      singleSlyp: '.js-card',
      send : '.js-send-slyp',
      content: ".content"
    },

    events: {
      "click @ui.singleSlyp" : "chosenByUser",
      "click @ui.send" : 'sendSlyp'
    },

    onRender: function(){
      // add isotopes here
      App.iso.prepended('.js-single-slyp')
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
    chosenByUser: function(){
      if (this.$el.hasClass('gigante')) {
        this.filterAll();
      }
    
      App.iso.arrange({ filter: this.$el });
      this.$el.addClass('gigante')
      this.ui.content.html(this.model.get('text'))
      App.vent.trigger('slyp:picked', slyp_id)
    },

    // display all of the slyps again
    filterAll: function(){
      this.$el.removeClass('gigante');
      this.ui.content.html(this.model.get('summary'))
      App.iso.arrange({ filter: '.js-single-slyp' });
      event.stopPropogation();
    },

    sendSlyp: function(){
      var sendSlyp = new sendSlypView({model: this.model});
      $("#modals").append(sendSlyp.$el.show());
      sendSlyp.render();
    }

  });

  return slypView;
});