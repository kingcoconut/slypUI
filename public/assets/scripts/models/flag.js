define(["marionette"], function(){
  var Flag = Backbone.Model.extend({
    defaults: {
      id: null,
      reporter_id: null,
      reporter_email: null,
      item: null,
      reason: null,
      reviewed: false
    },
    urlRoot: window.adminHost + "flag",
    review: function(){
      var that = this;
      $.ajax({
        url: window.adminHost + "flag/" + this.get("id") + "/review",
        type: "GET",
        success: function(){
          toastr.success("Flag has been reviewed");
          that.set("reviewed", true);
        }
      });
    }
  });

  return Flag;
});