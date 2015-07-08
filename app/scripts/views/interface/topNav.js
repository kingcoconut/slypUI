define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var topNav = Backbone.Marionette.ItemView.extend({
    template: "#js-top-nav-tmpl",
    // className: "overlay",
    id: "js-top-nav",

    ui: {
      addSlyp: ".js-add-new-slyp",
    },

    events: {
      "submit @ui.addSlyp"  : "addSlyp"
    },

    logout: function(){
      FB.logout();
    },

    initialize: function(options){
      this.options = options;
      var that = this;
      this.render();
      this.slyps = options.slyps
      this.slyps.on("reset", function(){
        // alert("ddd");
      })
    },

    addSlyp: function(event) {
      event.preventDefault()
      slypUrl = this.$el.find("input[name=new_url]")[0].value
      if (this.validUrl(slypUrl)){
        this.slyps.createFromUrl(slypUrl);
        this.$el.find("input[name=new_url]")[0].value = ''
      }else{
        alert('Not a valid url. ' + slypUrl)
      }
    },

    validUrl: function(url) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!pattern.test(url)) {
        return false;
      } else {
        return true;
      }
    }
  });

  return topNav;
});