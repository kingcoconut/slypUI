define(["marionette", "socket.io"], function(Marionette, io){
  var socketClient = function(options) {
    var self = this;

    self.connect = function() {
      self.socket = io.connect("http://127.0.0.1:3000");
      self.socket.on("connect", function () {
        console.log("Connected to chat server!");
        self.socket.emit("user", {user_id: App.user.get('id')});
      });
      self.setResponseListeners(self.socket);
    }

    self.pushChatMsg = function(data) {
      self.socket.emit("pushChatMsg", data);
    }

    self.pushSlyp = function(data) {
      self.socket.emit("pushSlyp", data);
    }

    self.pushTypingUsr = function(data){
      self.socket.emit("pushTypingUsr", data);
    }

    self.pushRemTypingUsr = function(data){
      self.socket.emit("pushRemTypingUsr", data);
    }

    self.eraseAlert = function(){
      self.socket.emit("eraseAlert");
    }

    self.setResponseListeners = function(socket) {
      socket.on('recSlyp', function(data){
        toastr.success('Recieved ' + data.slyp_title + ' from ' + data.sender_email);
        App.vent.trigger("recSlyp", data);
      });

      socket.on('recChatMsg', function(data) {
        toastr.success('Recieved chat message from ' + data.sender_email);
        App.vent.trigger("recChatMsg", data);
      });

      socket.on('recTypingUsr', function(data){
        App.vent.trigger("recTypingUsr", data);
      });

      socket.on('recRemTypingUsr', function(data){
        App.vent.trigger("remTypingUsr", data);
      })
    }
}
return socketClient;

});
