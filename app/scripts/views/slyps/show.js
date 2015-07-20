define(["marionette", "moment", "slimscroll", "views/modals/sendSlyp"], function(Marionette, moment, slimscroll, sendSlypView){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    ui:{
      container: '.list-view-slyp',
    },
    events:{
      "click .js-slyp-delete": "deleteSlyp",
      "click @ui.container": "select"
    },
    modelEvents: {
      // "change": "render"
    },
    deleteSlyp: function(){
      this.model.destroy();
    },
    initialize: function(){
      var that = this;
      this.model.collection.on("addingNewSlyp", function(){
        that.$el.find(".blog-article-box").removeClass("fixed-slyp");
      });
    },
    onRender: function(){
      var that = this;
      this.$el.find('.panel-body').slimScroll({
             height: '500px'
         });
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