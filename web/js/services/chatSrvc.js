app.service('chatService', function ($timeout) {
  "use strict";

  var _that = this,
    serverUrl = 'ws://localhost:8081',
    ws = new window.WebSocket(serverUrl),
    chatObject = {
      messages: [],
      info: ''
    },
    handleParsedMessage = function (msg) {
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
    };

  ws.onopen = function () {
    console.info('Connection established on: ', serverUrl);
  };

  ws.onmessage = function (message) {
    console.log('Received message:', message.data);
    try {
      var json = JSON.parse(message.data);
    } catch (err) {
      console.error(err);
    }
    $timeout(function () {
        handleParsedMessage(json);
      }
    );
  };

  _that.getChatObject = function () {
    return chatObject;
  };

  _that.sendMessage = function (message) {
    if (message) {
      ws.send(message);
    }
  };

});