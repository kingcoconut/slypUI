define(["marionette", "socket.io"], function(Marionette, io){
  var socketClient = function(options) {
    var self = this;

    self.connect = function() {
      self.socket = io.connect("http://127.0.0.1:3000");
      self.socket.on("connect", function () {
        console.log("Connected to chat server!");
        self.socket.emit("user", {user_id: App.user.get('user_id')});
      });
      self.setResponseListeners(self.socket);
    }

    self.chat = function(data) {
      self.socket.emit("chat", data);
    }

    self.typingAlert = function(){
      self.socket.emit("typingAlert");
    }

    self.eraseAlert = function(){
      self.socket.emit("eraseAlert");
    }

    self.setResponseListeners = function(socket) {

      socket.on('chat', function(data) {
          App.vent.trigger("chat", data);
      });

      socket.on('typing', function(data){
        App.vent.trigger("typingAlert", data);
      })
    }
}
return socketClient;

});
