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
      // set the list of users that will be used for autocomplete
      // do this here so we don't recaculate it all the time
      this.friends = _.pluck(this.model.get("excluded_friends"), 'email');
    },

    autocomplete: function(e){
      if(e.keyCode == 8){
        // when backspace is pressed, clear the placeholder text on the duplicate input
        this.ui.dupInput.attr("placeholder", '');
        this.lastMatch = false;
      }else if((e.keyCode == 39 || e.keyCode == 13) && this.lastMatch){
        // when there is a matched email address and the user presses right arrow or enter
        // fill the input field with the matched address
        this.ui.input.val(this.lastMatch);
        // remove the match
        this.lastMatch = false;
      }else if(e.keyCode == 13){
        // if enter is pressed and there isn't a matched address then we expect the input
        // to be filled with a new email address the user wants to send to
        this.parseInput();
        this.lastMatch = false;
      }else{
        // if we get here, then the user is just typing normally
        // so see if we can find a match
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
      
      // we need this timeout because this function fires before view in in DOM
      setTimeout(function(){
        // focus on the input field
        that.ui.input.focus();

        // setup the validation
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

    // try to use the string in the input field to send the slyp
    parseInput: function(){
      if(this.ui.form.valid()){
        var email = this.ui.input.val();
        this.model.sendTo([email]);
        this.clearInputField(email)
      }
    },

    // clear the email address out of the input field and remove it from the 
    // excluded friends list - if it exists on that list
    clearInputField: function(email){
      // clear the input field
      this.ui.input.val('');
      
      // clear the placeholder of the duplicate input
      this.ui.dupInput.attr("placeholder", '');
      
      // remove the email from the excluded friends list - this checks if email is in list
      this.model.excludeUserByEmail(email);
      
      // recalculate the friend for autocomplete
      this.friends = _.pluck(this.model.get("excluded_friends"), 'email');

      // remove the users icon if it was in the excluded users dropdown
      var icon = this.$el.parent().find(".excluded-friends-icons [data-email='" + email + "']");
      if(icon)
        icon.remove();
    }
  });
  return sendSlypView;
});