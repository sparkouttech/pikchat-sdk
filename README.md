<h3 align="center">The JavaScript server library for Pikchat SDK implementations.</h3>
This library was developed by [https://www.pikchat.co](https://www.pikchat.co) 

<p align="center">
  <a href="https://github.com/RichardLitt/standard-readme"><img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" /></a>
  <a href=""><img src="https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square" /></a>
  <a href=""><img src="https://img.shields.io/badge/Node.js-%3E%3D10.0.0-orange.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/ipfs-http-client"><img src="https://img.shields.io/npm/dm/ipfs-http-client.svg" /></a>
  <br>
</p>

> A client library for the IPFS HTTP API, implemented in JavaScript. This client library implements the IPFS [Core API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) enabling applications to change between an embedded js-ipfs node and any remote IPFS node without having to change the code. In addition, this client library implements a set of utility functions.

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


## License

[MIT](/LICENSE)