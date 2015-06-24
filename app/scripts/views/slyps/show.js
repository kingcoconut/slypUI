define(["marionette", "moment", "slimscroll"], function(Marionette, moment, slimscroll){
  var slypView = Backbone.Marionette.ItemView.extend({
    template: "#js-slyp-show-tmpl",
    ui:{
      heading: '.panel-heading',
    },
    events:{
      "click @ui.heading": "fullScreen",
      "click @ui.close": "closeScreen"
    },
    fullScreen: function(){

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
      
      setTimeout(function(){
        var waypoint = new Waypoint({
          element: that.$el,
          offset: 56,
          handler: function(direction) {
            console.log('Scrolled to waypoint!');
            if(direction === "down"){
              that.$el.css("height", that.$el.css("height"));
              // that.$el.after('<div style="width:100%;height:'+ (window.innerHeight - 56) + 'px;"></div>');
              that.$el.find(".blog-article-box").addClass("fixed-slyp");
            }else{
              that.$el.css("padding-bottom", "0px");
              that.$el.find(".blog-article-box").removeClass("fixed-slyp");
            }
          }
        });
      }, 500);
    },
  });

  return slypView;
});