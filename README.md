Pikchat library
==================================

Getting Started
---------------

```sh
# install from npm 
npm i pikchat

```

```javascript

const pikchat = require('pikchat');
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);

pikchat.setConfig(pikchat.CONSTANTS.MYSQL_HOST, 'localhost');
pikchat.setConfig(pikchat.CONSTANTS.MYSQL_USERNAME, 'root');
pikchat.setConfig(pikchat.CONSTANTS.MYSQL_PASSWORD, 'root');
pikchat.setConfig(pikchat.CONSTANTS.MYSQL_DATABASE, 'chat');

pikchat.connectMySQL();
pikchat.startPikchatEngine(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});


```

1. Send chat message :

Event name : SINGLE_CHAT_MESSAGE

Params :

```json
{
    "senderId" : "1234", // logged in user's id
    "receiverId" : "1235", // receiver user's id,
    "message" : "hi siva", // message
    "messageType" : 1 // 1 - text message 2 - image 
}

```


License
-------

MIT