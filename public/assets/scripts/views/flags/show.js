define(["marionette"], function(Marionette){
  var flagView = Backbone.Marionette.ItemView.extend({
    template: "#js-flag-show-tmpl",
    ui: {
      deleteBtn: ".js-delete-flag",
      reviewBtn: ".js-review-flag"
    },
    events:{
      "click @ui.deleteBtn": "destroyModel",
      "click @ui.reviewBtn": "reviewFlag"
    },
    modelEvents: {
        'change': 'render'
    },
    destroyModel: function(e){
      e.preventDefault();
      this.model.destroy();
      toastr.success("Flag deleted");
    },
    reviewFlag: function(e){
      e.preventDefault();
      this.model.review();
    }
  });

  return flagView;
});