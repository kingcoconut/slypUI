define(["marionette", "views/slyps/slyp_child_view", "isotope", 'imagesloaded'], function(Marionette, SlypView, Isotope, imagesloaded){
  var slypCollectionView = Backbone.Marionette.CompositeView.extend({
    childView: SlypView,
    template: '#js-slyp-container-tmpl',
    className: 'js-slyps js-isotope',

    ui: {
      form: "#js-add-new-slyp"
    },

    events: {
      "submit @ui.form"  : "addSlyp"
    },

    onShow: function(){
      this.setValidations();
      this.setupIso();
    },

    setValidations: function(){
      this.ui.form.validate({
        rules:{
          new_url:{
            required: true,
            url: true
          }
        },
        errorPlacement: function(error, element) {
          var el = error.insertAfter(element.parent().parent());
          setTimeout(function(){
            el.remove();
          },3000);
        }
      });
    },

    addSlyp: function(event) {
      var self = this;
      if(this.ui.form.valid()){
        slypUrl = this.ui.form.find("input[name=new_url]")[0].value;
        self.collection.createFromUrl(slypUrl);
        this.$el.find("input[name=new_url]")[0].value = '';
      }
      return false;
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
    },

    setupIso: function(){
      // setup isotope
      App.iso = new Isotope( ".js-slyps", {
        itemSelector: '.js-single-slyp',
        layoutMode: 'masonry',
        stamp: '.post-box'
      });
      App.iso._create();
      // shuffle the slyps once all the images have loaded on page
      imagesloaded(this.$el, function(){
        App.iso.shuffle();
      });
    }
  });

  return slypCollectionView;
});

