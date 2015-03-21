var WebSocket = require('ws');

describe('Suite of unit tests', function () {

    var socket;

    beforeEach(function (done) {

        // Setup
        socket = new WebSocket('ws://localhost:8081');

        socket.on('open', function () {
            console.log('>>>> Opened');
            done();
        });

        socket.on('close', function () {
            console.log('<<<< Closed');
            done();
        });

    });

    afterEach(function (done) {

        // Cleanup
        if (socket) {
            socket.close();
            setTimeout(done);
        }
    });


    describe('Testing connection', function () {

        it('Socket should be defined', function () {
            expect(typeof socket).not.toBe(undefined);
        });

    });

    describe('Testing sending & receiving msg', function(){

        it('Socket shouldsend & receive msg', function (done) {
            expect(typeof socket).not.toBe(undefined);

            var messageToSend = 'Pawel';

            socket.on('message', function (msg) {
                if(typeof msg !== 'undefined'){
                    var parsedMsg = JSON.parse(msg);
                    // First msg is hello msg from the server.
                    if(parsedMsg.type === 'message') {
                        expect(parsedMsg.data.name).toBe(messageToSend);
                        done();
                    }
                }
            });

            socket.send(messageToSend);
        });

    });

});