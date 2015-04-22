var ChatService = function (socketService) {
   "use strict";

   var _that = this,
      chatObject = {
         messages: [],
         info: ''
      };

   function handleParsedMessage(msg) {
      switch (msg.type) {
         case 'message':
            chatObject.messages.push(msg.data);
            break;
         case 'info':
            chatObject.info = msg.data;
            break;
         case 'history':
            chatObject.messages = msg.data;
            break;
         default:
            console.log('Funny msg');
      }
      $('#chat').scrollTop($('#chat').prop("scrollHeight"));
   }

   (function init() {
      socketService.registerHandler(handleParsedMessage);
   })();

   _that.getChatObject = function () {
      return chatObject;
   };

   _that.sendMessage = socketService.send;

};

app.service('chatService', ChatService);
