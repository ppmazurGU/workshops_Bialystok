var ChatController = function (chatService) {
   "use strict";

   var _that = this;

   _that.hello = 'Hello Bialystok.';

   _that.msg = '';

   _that.chatObject = chatService.getChatObject();

   _that.sendMsg = function () {
      chatService.sendMessage(_that.msg);
      _that.msg = '';
   }
};

app.controller('ChatController', ChatController);
