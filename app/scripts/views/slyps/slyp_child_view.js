define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp", "isotope"], function(Marionette, moment, slimscroll, sendSlypView, Isotope){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',


    initialize: function(){
      $(this.el).on("click", this.chosenByUser);
    },

    onRender: function(){
      // set up our isotope object here
      if (_.isUndefined(App.iso)){
        App.iso = new Isotope( '.js-slyps', {
          itemSelector: '.js-single-slyp',
          layoutMode: 'masonry'
        });
      } else {
        App.iso.prepended('.js-single-slyp')
      }
    },
    // FIXME- will remove this once i generate userIcons after fetching data
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
      App.iso.on( 'click', '.js-single-slyp', function() {
        $(this).toggleClass('gigante');
        // trigger layout after item size changes
        $grid.isotope('layout');
      });
    },

    // select: function(ev){
    //   $(".list-view-slyp").removeClass("active");
    //   this.$(".list-view-slyp").addClass("active");
    //   $(".slyp-text").hide();
    //   this.$el.find(".slyp-text").toggle();
    //   this.model.dock();
    //   if($(ev.target).hasClass("send-slyp")){
    //     var sendSlyp = new sendSlypView({model: this.model});
    //     $("#modals").append(sendSlyp.$el.show());
    //     sendSlyp.render();
    //     sendSlyp.on("closeMe", function(){
    //       this.destroy();
    //       $("#modals").html('');
    //     });
    //   }
    // }
  });

  return slypView;
});