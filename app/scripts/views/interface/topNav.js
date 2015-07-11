define(["marionette", "models/slyp"], function(Marionette, Slyp){
  var topNav = Backbone.Marionette.ItemView.extend({
    template: "#js-top-nav-tmpl",

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
      this.render();
      this.slyps = options.slyps
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

    validUrl: function(str) {
      //http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
      //http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url

      var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

      // var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      // '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      // '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      // '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      // '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      // '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    }
  });

  return topNav;
});