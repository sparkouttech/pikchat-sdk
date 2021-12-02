<h3 align="center">The JavaScript server library for Pikchat SDK implementations.</h3>
 

<p align="center">
  <a href=""><img src="https://img.shields.io/github/license/sparkouttech/pikchat-sdk.svg" /></a>
  <a href=""><img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" /></a>
  <a href=""><img src="https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square" /></a>
  <a href=""><img src="https://img.shields.io/badge/Node.js-%3E%3D10.0.0-orange.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/pikchat-sdk"><img src="https://img.shields.io/npm/dm/pikchat-sdk.svg" /></a>
  <br>
</p>


> This library was developed by [https://www.pikchat.co](https://www.pikchat.co). Pik Chat, an instant messaging solution (SDK, API and App) for your business website and application to engage your users effectively and efficiently to scale the impact.

Pikchat SDK
==================================


## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
npm install pikchat-sdk
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