const express = require('express');
const http = require('http');
const app = express();
const routing = require('./routing.js')(app);

const server = new http.Server(app);

server.listen(3000);