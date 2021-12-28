
const pikchat = require('./index');
// const pikchat = require('pikchat');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');


app.use('/pikchat-client', express.static(path.join(__dirname, 'src/public')));

const server = http.createServer(app);



pikchat.setConfig(pikchat.CONSTANTS.MYSQL_HOST, 'localhost');
pikchat.setConfig(pikchat.CONSTANTS.MYSQL_USERNAME, 'root');
pikchat.setConfig(pikchat.CONSTANTS.MYSQL_PASSWORD, 'root');
// pikchat.setConfig(pikchat.CONSTANTS.MYSQL_DATABASE, 'chat');

pikchat.connectMySQL();
pikchat.startPikchatEngine(server);

server.listen(4200, () => {
    console.log('listening on *:4200');
});