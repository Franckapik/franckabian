const express = require('express');
const http = require('http');
const os = require('os');
const path = require('path');

const cronData = require('./cronData'); //cronData.js permets d'écrire la base de donnée en arrière plan.

const app = express();
const ultrasonic = require('./ultrasonic');

//routes
app.get ('/essai', ultrasonic.GetDistance);

app.listen(8080);
console.log("Le site du garage est disponible sur le port 8080");

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(__dirname + '/public'));
