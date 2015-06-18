define(["marionette", "moment", "slimscroll"], function(Marionette, moment, slimscroll){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    onRender: function(){
      this.$el.find(".panel-body").slimScroll({
        height: '550px'
      });
    }
  });

  return slypView;
});