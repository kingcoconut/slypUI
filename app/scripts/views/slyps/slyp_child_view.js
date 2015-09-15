define(["marionette", "moment", "slimscroll", "views/slyps/user_icons", "views/modals/sendSlyp", "isotope", "models/user"], function(Marionette, moment, slimscroll, userIconsView, addUserView, Isotope, User){
  var slypView = Backbone.Marionette.LayoutView.extend({
    template: "#js-slyp-show-tmpl",
    className: 'js-single-slyp card',

    ui: {
      main: '.js-card-main',
      send : '.js-send-slyp',
      content: ".content",
      action: ".action",
      addUser: ".excluded-friends-icons .user-icon"
    },

    events: {
      "click @ui.main" : "chosenByUser",
      "click .js-expand-slyp" : "chosenByUser",
      "click @ui.send" : 'showAddUser',
      "mouseenter @ui.send" : 'sendSlypHover',
      "mouseout @ui.send" : 'sendSlypHoverOut',
      "mouseenter @ui.addUser" : 'sendSlypHover',
      "mouseout @ui.addUser" : 'sendSlypHoverOut',
      "click @ui.addUser": "sendSlyp",
      "click .included-friends-icons .user-icon": "openSlypChat",
      "mouseleave": "removeSendSlyp",
      "click .itemIconStar" : "starSlyp",
      "click .itemIconStarred": "starSlyp",
      "click .itemIconDone" : "archiveSlyp",
      "click .itemIconMarkedDone" : "archiveSlyp",

    },

    initialize: function(){
      this.model.on('change', this.setDataAttributes, this);
      this.model.on('change:starred', this.toggleStar, this);
      this.model.on('change:archived', this.toggleArchived, this);
    },

    toggleStar: function(){
      //TODO: make this look nicer
      var STARRED = "itemIconStarred"
      var STAR = "itemIconStar"
      if (this.$('.'+STAR).length > 0){
        var el = this.$('.'+STAR);
        el.removeClass(STAR);
        el.addClass(STARRED);
      }else if (this.$('.'+STARRED).length>0){
        var el = this.$('.'+STARRED);
        el.removeClass(STARRED);
        el.addClass(STAR);
      }

      this.setDataAttributes();
    },

    toggleArchived: function(){
      //TODO: make this look nicer
      var DONE = "itemIconDone";
      var MARKED_DONE = "itemIconMarkedDone";
      if (this.$('.'+DONE).length > 0){
        var el = this.$('.'+DONE);
        el.removeClass(DONE);
        el.addClass(MARKED_DONE);
      }else if (this.$('.'+MARKED_DONE).length>0){
        var el = this.$('.'+MARKED_DONE);
        el.removeClass(MARKED_DONE);
        el.addClass(DONE);
      }
      this.setDataAttributes();
      App.iso.arrange();
    },

    starSlyp: function(){
      this.model.star();
    },

    archiveSlyp: function(){
      this.model.archive();
    },

    removeSendSlyp: function(){ 
      if(this.addUser){
        this.addUser.destroy();
        delete this.addUser;
      }
      this.render();
    },
    onRender: function(){
      this.$(".user-icon").popover({trigger: "hover"});      
      this.setDataAttributes();
    },  

    setDataAttributes: function(){
      this.$el.attr('data-engaged', +this.model.get("engaged"));
      this.$el.attr('data-archived', +this.model.get("archived"))
      this.$el.attr('data-starred', +this.model.get("starred"))
      this.$el.attr('data-unread-messages', this.model.get("unread_messages"));
      this.$el.attr('data-recently-added', this.model.get("recently_added"));
      this.$el.attr('data-created-at', moment(this.model.get("created_at")).format('X'));
    },

    checkVideoPresence: function(){
      if ( _.size(this.model.get('video_url')) > 2 ) {
        this.ui.action.find('h4').addClass('hide--attr')
      }
    },

    sendSlyp: function(event){
      this.model.sendTo([$(event.target).data("email")]);
      this.model.excludeUser($(event.target).data("id"));
      this.printIcon($(event.target));
      this.slypSent = true;
    },

    printIcon: function(icon){
      var icons = this.$(".included-friends-icons .user-icon");
      if(icons.length > 2){
        icons[2].remove(); 
      }
      icon.remove();
      this.$(".included-friends-icons").prepend(icon);
    },

    sendSlypHover: function(){
      clearTimeout(this.timeout);
      this.$(".excluded-friends-icons").addClass("show-icons");
    },

    sendSlypHoverOut: function(){
      var self = this;
      this.timeout = setTimeout(function(){
        self.$(".excluded-friends-icons").removeClass("show-icons");
      }, 300);
    },

    // FIXME- will remove this once we generate userIcons after fetching data
    serializeData: function(){
      return {
        id: this.model.id,
        title: this.model.get('title'),
        created_at: this.model.get('created_at'),
        site_name: this.model.get('site_name'),
        video: this.model.get('video_url'),
        image: this.model.get('top_image'),
        summary: this.model.get('summary'),
        description: this.model.get('description'),
        text: this.model.get('text'),
        url: this.model.get('url'),
        engaged: this.model.get('engaged'),
        users: this.model.genUserIcons(this.model.get('users')),
        excluded_friends: this.model.get("excluded_friends") ? this.model.get("excluded_friends").slice(0,8) : [],
        sender: new User(this.model.get("sender")).iconAttributes(),
        archived: this.model.get('archived'),
        starred: this.model.get('starred')
      }
    },

    // choose a slyp and popup modal
    chosenByUser: function(event){
      App.vent.trigger("showChat", this.model.id)
    },

    openSlypChat: function(ev){
      var slypChatID = $(ev.target).data('slyp-chat-id');
      var slypChatEmail = $(ev.target).data('content');

      // slypChatID can be "" when the icon got into the top section by clicking on it from the dropdown
      if(slypChatID != "")
        this.model.get("users").chatRead(slypChatID);
      App.vent.trigger("showChat", this.model.id, slypChatID, slypChatEmail);
    },

    showAddUser: function(){
      if(this.addUser){
        this.addUser.destroy();
        this.addUser = null;
      }else{
        this.addUser = new addUserView({model: this.model});
        this.$(".action").prepend(this.addUser.$el.show());
        this.addUser.render();
      }
    }
  });
  return slypView;
});