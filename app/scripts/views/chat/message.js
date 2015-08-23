define(["marionette", "moment"], function(Marionette, moment){
  var Message = Backbone.Marionette.ItemView.extend({
    template: "#js-chat-message-tmpl",
    className: "message-container",

    initialize: function(){
      this.calcTime();
    },

    serializeData: function(){
      owner_id = $.cookie("user_id");
      return {
        content: this.model.get("content"),
        owner: owner_id == this.model.get("user_id"),
        time_sent: this.model.get("time_sent"),
        day_created: this.model.get('day_created')
      }
    },

    calcTime: function(){
      _.each(this.model.collection.models, function(model, index){
        if (index == 0){
          model.set('time_sent', moment(model.get('created_at')).format('h:mm a'));
          model.set('day_created', moment(model.get('created_at')).format('ddd, MMMM Do'));
        } else {
          var stillToday = function(model, prev_moment){
            if (moment(model.get('created_at')).isSame(prev_moment, 'day')) {
              return true;
            }
            return false;
          };
          prev_moment = moment(model.collection.models[index- 1].get('created_at'))
          if (moment(model.get('created_at')).diff(prev_moment, 'minutes') > 10 && stillToday(model, prev_moment) ) {
            model.set('time_sent', moment(model.get('created_at')).format('h:mm a'));
          } else if (moment(model.get('created_at')).diff(prev_moment, 'minutes') > 10 && !stillToday(model, prev_moment)) {
            model.set('time_sent', moment(model.get('created_at')).format('h:mm a'));
            model.set('day_created', moment(model.get('created_at')).format('ddd, MMMM Do'));
          } else {
            model.set('time_sent', null);
          }
        }
      });
    },
  });
  return Message;
});