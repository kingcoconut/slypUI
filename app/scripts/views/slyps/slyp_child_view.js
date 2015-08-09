define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp", "isotope"], function(Marionette, moment, slimscroll, sendSlypView, Isotope){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',

    ui:{
      container: '.list-view-slyp',
    },

    events:{
      "click .js-slyp-delete": "deleteSlyp",
      "click @ui.container": "select"
    },

    // modelEvents: {
    //   "change": "render"
    // },

    deleteSlyp: function(){
      this.model.destroy();
    },

    onRender: function(){
      // set up our isotope object here
      if (_.isUndefined(App.iso)){
        App.iso = new Isotope( '.js-slyps', {
          itemSelector: '.js-single-slyp',
          layoutMode: 'fitRows'
        });
      } else {
        App.iso.insert('.js-single-slyp')
      }
    },

    select: function(ev){
      $(".list-view-slyp").removeClass("active");
      this.$(".list-view-slyp").addClass("active");
      $(".slyp-text").hide();
      this.$el.find(".slyp-text").toggle();
      this.model.dock();
      if($(ev.target).hasClass("send-slyp")){
        var sendSlyp = new sendSlypView({model: this.model});
        $("#modals").append(sendSlyp.$el.show());
        sendSlyp.render();
        sendSlyp.on("closeMe", function(){
          this.destroy();
          $("#modals").html('');
        });
      }
    }
  });

  return slypView;
});