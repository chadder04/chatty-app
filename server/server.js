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

// Return a random selection from the colorsArray for use
function getRandomUsernameColor() {
    let colorsArray = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    let rand = Math.floor(Math.random() * (colorsArray.length - 1)); 
    return colorsArray[rand];
}

// Broadcast msg to all connected clients
function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
        }
    });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

    // When a new connection is created, broadcast total online users to all connected clients
    broadcast({
        id: uuidv1(),
        type: 'incomingOnlineUser',
        usersOnline: wss.clients.size
    });

    // When a new client connects, assign a random username color and send that to the client
    ws.send(JSON.stringify({
        type: "incomingSetColor",
        color: getRandomUsernameColor()
    }));

    ws.onmessage = function (event) {
        // Parse incoming data as JSON object
        const outgoingMessage = JSON.parse(event.data);

        // Attach a UUID to each outgoing message
        outgoingMessage.id = uuidv1();

        switch (outgoingMessage.type) {
            case 'postMessage':
                // handle incoming message
                outgoingMessage.type = 'incomingMessage';
                break;
            case 'postNotification':
                // handle incoming notification
                outgoingMessage.type = 'incomingNotification';
                break;
            case 'postOnlineUser':
                outgoingMessage.type = 'incomingOnlineUser';
                outgoingMessage.color = getRandomUsernameColor();
                break;
            default:
                // show an error in the console if the message type is unknown
                throw new Error('Unknown event type ' + data.type);
        }

        // Broadcast to all.
        broadcast(outgoingMessage);
    }

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {

        // After a client has closed their socket connection, broadcast new number of online users to all clients
        broadcast({
            id: uuidv1(),
            type: 'incomingDisconnectedUser',
            usersOnline: wss.clients.size
        });
    });
});