var SocketService = function ($timeout) {
   "use strict";

   var _that = this,
      serverUrl = 'ws://localhost:8081',
      ws = new window.WebSocket(serverUrl),
      messageHandler;

   ws.onopen = function () {
      console.info('Connection established on: ', serverUrl);
   };

   ws.onmessage = function (message) {
      console.log('Received message:', message.data);
      if(!messageHandler){
         console.log('No message handler');
          return;
      }
      try {
         var json = JSON.parse(message.data);
      } catch (err) {
         console.error(err);
      }
      $timeout(function () {
            messageHandler(json);
         }
      );
   };

   _that.send = function(msg){
      if(msg){
         ws.send(msg);
      }
   };

   _that.registerHandler = function (callback) {
      messageHandler = callback;
   };

};

app.service('socketService', SocketService);
