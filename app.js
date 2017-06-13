const express = require('express');
const http = require('http');
const os = require('os');
const path = require('path');

/**const cronData = require('./cronData'); //cronData.js permets d'écrire la base de donnée en arrière plan.*/

const app = express();
const controller = require('./controller');

//routes
/**app.get ('/cuve', ultrasonic.GetDistance);*/
app.get ('/arrosage', controller.Arrosage);
app.get ('/niveaucuve', controller.NiveauCuve);

app.listen(8080);
console.log("Le site du garage est disponible sur le port 8080");

