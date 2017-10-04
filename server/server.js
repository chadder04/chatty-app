const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

let onlineUsers = 0;

function getRandomUsernameColor() {
    let colorsArray = ['red','blue','green','purple'];
    let rand = Math.floor(Math.random() * (colorsArray.length - 1 + 1)) + 1; 
    console.log(colorsArray[rand]);
    return colorsArray[rand];
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    onlineUsers = onlineUsers + 1;

    ws.onmessage = function (event) {
        // Parse incoming data as JSON object
        const data = JSON.parse(event.data);

        // Craft outgoing message including a UUID
        const outgoingMessage = {
            id: uuidv1()
        }

        switch (data.type) {
            case 'postMessage':
                // handle incoming message
                outgoingMessage.type = 'incomingMessage';
                outgoingMessage.username = data.username;
                outgoingMessage.usernameColor = data.usernameColor;
                outgoingMessage.content = data.content;
                break;
            case 'postNotification':
                // handle incoming notification
                outgoingMessage.type = 'incomingNotification';
                outgoingMessage.content = data.content;
                break;
            case 'postOnlineUser':
                outgoingMessage.type = 'incomingOnlineUser';
                outgoingMessage.content = data.content;
                outgoingMessage.usersOnline = onlineUsers;
                outgoingMessage.usernameColor = getRandomUsernameColor();
                break;
            default:
                // show an error in the console if the message type is unknown
                throw new Error('Unknown event type ' + data.type);
        }


        // Broadcast to all.
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(outgoingMessage));
            }
        });
    }

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        onlineUsers = onlineUsers - 1;
    });
});