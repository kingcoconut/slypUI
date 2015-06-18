define(["marionette", "collections/addresses", "collections/phones", "collections/emails", "models/person", "collections/flags"], function(Marionette, Addresses, Phones, Emails, Person, Flags){
  User = Backbone.Model.extend({
    defaults: {
      name: "",
      id: "",
      email: "",
      funnel: "",
      created_at: Date.now(),
      vanity_slug: "",
      flagged: false
    },

    urlRoot: window.adminHost + "/user",

    initialize: function(options){
      this.addresses = new Addresses(options.id);
      this.phones = new Phones(options.id);
      this.emails = new Emails(options.id);
      this.person = new Person(options.id);
      this.flags = new Flags(options.id);
    },

    fetchRelated: function(){
      this.addresses.fetch();
      this.phones.fetch();
      this.emails.fetch();
      this.person.fetch();
      this.flags.fetch();
    },

    parse: function(resp){
      if(resp.response){
        return resp.response;
      }else{
        return resp;
      }
    },

    deleteCoverPhoto: function(){
      var that = this;
      $.ajax({
        url: window.adminHost + "user/" + this.get("id") + "/delete_cover_photo",
        method: "DELETE",
        success:function(){
          toastr.success("Cover photo deleted");
          that.fetch();
        }
      });
    },

    deleteProfilePhoto: function(){
      var that = this;
      $.ajax({
        url: window.adminHost + "user/" + this.get("id") + "/delete_profile_photo",
        method: "DELETE",
        success:function(){
          toastr.success("Profile photo deleted");
          that.fetch();
        }
      });
    }
  });
  return User;
});