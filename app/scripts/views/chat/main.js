
var HomeView = Backbone.View.extend({
    template: _.template($("#home-template").html()),

    events: {
	'keypress #chatInput': 'chatInputPressed',
	'keyup #chatInput': 'chatInputUp'
    },

    initialize: function(options) {

	console.log(options);
	this.vent = options.vent;

	var onlineUsers = this.model.get('onlineUsers');
	var userChats = this.model.get('userChats');
	
	this.listenTo(onlineUsers, "add", this.renderUser, this);
	this.listenTo(onlineUsers, "remove", this.renderUsers, this);
	this.listenTo(onlineUsers, "reset", this.renderUsers, this);

	this.listenTo(userChats, "add", this.renderChat, this);
	this.listenTo(userChats, "remove", this.renderChats, this);
	this.listenTo(userChats, "reset", this.renderChats, this);

	this.listenTo(this.model, "change:alertMsg", this.renderTypingAlert, this);
    },

    render: function() {

	var onlineUsers = this.model.get("onlineUsers");
	
	this.$el.html(this.template(this.model.toJSON()));

	this.renderUsers();
	this.renderChats();
	
	return this;
    },

    renderUsers: function() {
	this.$('#userList').empty();

	this.model.get("onlineUsers").each(function (user) {
	    this.renderUser(user);
	}, this);
    },


    renderUser: function(model) {
	var template = _.template("<a class='list-group-item'><%= name %></a>");

	this.$('#userList').append(template(model.toJSON()));

	this.$('#userCount').html(this.model.get("onlineUsers").length);

	
	this.$('.nano').nanoScroller();
    },

    renderChats: function() {
	this.$('#chatList').empty();

	this.model.get('userChats').each(function(chat) {
	    this.renderChat(chat);
	}, this);
    },

    renderChat: function(model) {
	var template = _.template("<a class='list-group-item'><span class='text-info'><%= sender %></span>:<%= message %></a>");

	var element = $(template(model.toJSON()));
	
	element.appendTo(this.$('#chatList')).hide().fadeIn().slideDown();

	this.$('.nano').nanoScroller();
	this.$('.nano').nanoScroller({ scroll: 'bottom' });
    },

    renderTypingAlert: function(){
    	var alertMsg = this.model.get('alertMsg');
    	this.$('#typingAlert').html(alertMsg);
    },

    // events

    chatInputPressed: function(evt) {

	if (evt.keyCode == 13) {
	    this.vent.trigger("chat", this.$('#chatInput').val());
	    this.$('#chatInput').val('');

	    return false;
	} 
    },

    chatInputUp: function(evt) {
    if (evt.keyCode == 8){
		this.vent.trigger("eraseTyping");
		return false;
	} else if (evt.keyCode != 13){
		this.vent.trigger("typing");
		return false;
	}
    }


    
    
});