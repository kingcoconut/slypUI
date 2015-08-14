define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp", "isotope"], function(Marionette, moment, slimscroll, sendSlypView, Isotope){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',
    ui: {
      singleSlyp: '.js-card',
      send : '.js-send-slyp'
    },

    events: {
      "click @ui.singleSlyp" : "chosenByUser",
      "click @ui.send" : 'sendSlyp'
    },

    onRender: function(){
      // set up our isotope object here
      if (_.isUndefined(App.iso)){
        App.iso = new Isotope( '.js-slyps', {
          itemSelector: '.js-single-slyp',
          layoutMode: 'masonry'
        });
        $(this.ui.singleSlyp).parent().addClass(this.model.get('id').toString());
      } else {
        App.iso.prepended('.js-single-slyp')
        $(this.ui.singleSlyp).parent().addClass(this.model.get('id').toString());
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

    chosenByUser: function(event){
      var targ = $(event.currentTarget).parent();
      if ($(event.currentTarget).parent().hasClass('gigante')) {
        this.filterAll(event);
      }
      var slyp_id = targ[0].classList[2]
      App.iso.arrange({ filter: ['.',slyp_id].join('') });
      targ.addClass('gigante')
      targ.find('.content').html(App.slypCollection.where({id: Number(slyp_id)})[0].get('text'))
      App.vent.trigger('slyp:picked', slyp_id)
    },

    filterAll: function(event){
      var targ = $(event.currentTarget).parent();
      var slyp_id = targ[0].classList[2]
      targ.removeClass('gigante');
      targ.find('.content').html(App.slypCollection.where({id: Number(slyp_id)})[0].get('summary'))
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