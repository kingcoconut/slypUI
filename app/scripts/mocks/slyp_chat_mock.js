define(["marionette", "mockjax"], function(Mn, mockjax){
  $.mockjax({
    type: 'GET',
    url: window.apiHost + "/slyp_chats",
    responseText: [
      {"id":50,"slyp_chat_messages":[{"id":145,"user_id":2,"slyp_chat_id":50,"content":"there we go","created_at":"2015-08-09T03:07:57.000Z","updated_at":"2015-08-09T03:07:57.000Z"}], "created_at":"2015-08-09T03:07:54.000Z","slyp_id":45,"users":[{"id":2,"email":"jamesgroeneveld@gmail.com"}]}
    ]
  });
});