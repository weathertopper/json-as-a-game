'use strict';

const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Constants
const PORT = 3000;
const HOST = '127.0.0.1';

// App
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use('/media', express.static(__dirname + '/front/media'));
app.use('/js', express.static(__dirname + '/front/js'));
app.use('/js', express.static(__dirname + '/front/config'));
app.use('/css', express.static(__dirname + '/front/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/front/html/home.html'));
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);