define(["marionette"], function(){
  var navView = Backbone.Marionette.ItemView.extend({
    template: "#js-user-nav-tmpl",
    ui: {
      tab: ".nav-tabs li",
    },
    events:{
      "click @ui.tab": "clickTab"
    },
    clickTab: function(e){
      e.preventDefault();
      var tab = $(e.target).parent().data("view");
      this.toggleTab(tab);
      App.vent.trigger("userNavigate", tab);
    },
    toggleTab: function(view){
      // select correct tab
      _.each($(".nav-tabs li"), function(el,i){
        $(el).removeClass("active");
      });

      $(".nav-tabs li[data-view="+view+"]").addClass("active");
    },
    intialize: function(options){
      this.options = options;
    },
    onShow: function(){
      this.toggleTab(this.options.active);
    }
  });

  return navView;
});