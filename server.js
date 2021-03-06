const express = require('express');
const http = require('http');
const app = express();
const routing = require('./routing.js')(app);

app.use('/static', express.static('static'));
app.use('/img', express.static('Pokemon-DB/img'));
app.use('/spr', express.static('./Pokemon-DB/spr'));

const server = new http.Server(app);

server.listen(3000);