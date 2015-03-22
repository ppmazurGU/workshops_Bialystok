(function server() {
    'use strict';

    var WebSocketServer = require('ws').Server,
        wssPort = 8081,
        wss = new WebSocketServer({port: wssPort}),
        history = [];

    wss.on('connection', function onConnection(connection) {
        console.log('Received connection');

        var userName;

        connection.send(JSON.stringify({type: 'info', data: 'Hello stranger! Type your name:'}));

        connection.on('message', function onMessage(message){
            console.log('Received message: ', message);

            if(!userName) {

                userName = message;

                if(history.length > 0) {
                    var historyJSONObj = JSON.stringify({type: 'history', data: history});
                    wss.broadcast(historyJSONObj);
                }

                var userJoinedObj = {
                    time: (new Date()).getTime(),
                    text: userName.concat(' has joined :)'),
                    author: '##server'
                };

                history.push(userJoinedObj);

                var userJoinedJSONMsg = JSON.stringify({type: 'message', data: userJoinedObj});
                wss.broadcast(userJoinedJSONMsg);

            } else {

                console.log(userName, ':', message);

                var messageObj = {
                    time: (new Date()).getTime(),
                    text: message,
                    author: userName
                };

                history.push(messageObj);

                var messageJSONObj = JSON.stringify({type: 'message', data: messageObj});
                wss.broadcast(messageJSONObj);
            }

        });

        connection.on('close', function onClose(){

            var userLeftObj = {
                time: (new Date()).getTime(),
                text: userName + ' has left :(',
                author: '##server'
            };

            history.push(userLeftObj);

            var userLeftJSONMsg = JSON.stringify({type: 'message', data: {name: userName}});
            wss.broadcast(userLeftJSONMsg);


            console.log('Bye bye', userName);
        });
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        })
    };

    console.log('Web socket on: ', wssPort);

})();
