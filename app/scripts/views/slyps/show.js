define(["marionette", "moment", "slimscroll"], function(Marionette, moment, slimscroll){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    ui:{
      heading: '.panel-heading',
    },
    events:{
      "click @ui.heading": "fullScreen",
      "click @ui.close": "closeScreen",
      "click .js-slyp-delete": "deleteSlyp"
    },
    modelEvents: {
      "change": "render"
    },
    fullScreen: function(){

    },
    deleteSlyp: function(){
      this.model.destroy();
    },
    initialize: function(){
      var that = this;
      this.model.collection.on("addingNewSlyp", function(){
        that.$el.find(".blog-article-box").removeClass("fixed-slyp");
      })
    },
    onRender: function(){
      var that = this;
      this.$el.find('.panel-body').slimScroll({
             height: '500px'
         });
    },
  });

  return slypView;
});