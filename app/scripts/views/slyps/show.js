define(["marionette", "moment", "slimscroll"], function(Marionette, moment, slimscroll){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    ui:{
      container: '.list-view-slyp',
    },
    events:{
      "click @ui.container": "select",
    },
    modelEvents: {
      "change": "render"
    },
    select: function(){
      $(".slyp-text").hide();
      this.$el.find(".slyp-text").toggle();
      this.model.dock();
    }
  });

  return slypView;
});