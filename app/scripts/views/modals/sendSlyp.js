define(["marionette", "jquery.validate"], function(Marionette, validate){
  var sendSlypView = Backbone.Marionette.ItemView.extend({
    template: "#js-send-slyp-modal-tmpl",
    className: "overlay",
    ui: {
      "input": "#js-send-slyp-email-input",
      "dupInput": ".input-dup",
      "form": "#js-send-slyp-form"
    },
    events:{
      "submit @ui.form": "parseInput",
      "keyup @ui.input": "autocomplete"
    },

    initialize: function(){
      this.friends = _.pluck(this.model.get("excluded_friends"), 'email');
    },

    autocomplete: function(e){
      if(e.keyCode == 8){
        this.ui.dupInput.attr("placeholder", '');
        this.lastMatch = false;
      }else if((e.keyCode == 39 || e.keyCode == 13) && this.lastMatch){
        this.ui.input.val(this.lastMatch);
        this.lastMatch = false;
      }else if(e.keyCode == 13){
        this.parseInput();
        this.lastMatch = false;
      }else{
        var patt = new RegExp('^' + this.ui.input.val() + '.*');
        var matches = _.select(this.friends, function(el){ return patt.test(el) });
        if(matches.length < 1){
          this.ui.dupInput.attr("placeholder", '');
          this.lastMatch = false;
        }else{
          this.ui.dupInput.attr("placeholder", matches[0]);
          this.lastMatch = matches[0];
        }
      }
    },

    onRender: function(){
      var that = this;
      setTimeout(function(){
        that.$("input").focus();

        that.ui.form.validate({
        rules:{
          email:{
            email: true,
            required: true
          },
          }
        });
      },750);
    },

    parseInput: function(){
      if(this.ui.form.valid()){
        var email = this.ui.input.val();
        this.model.sendTo([email]);
        this.ui.dupInput.attr("placeholder", '');
        this.ui.input.val('');
        this.model.excludeUserByEmail(email);
        this.friends = _.pluck(this.model.get("excluded_friends"), 'email');
      }
    },

  });

  return sendSlypView;
});