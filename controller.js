var express = require('express');
var gpio = require('wpi-gpio');
var sleep = require('sleep');
var Influx = require('influx');
var Promise = require("bluebird");
var PythonShell = require('python-shell');

//Configuration de la base de donnes
var db = new Influx.InfluxDB({
    host: '192.168.1.78',
    database: 'mydb',
    tags: 'jardin'
});


console.log("Connection avec RPI46-arrosage effectuée");


var arrosage = function(req, res) {

    console.log("Fonction arrosage trouvée.");
    res.send('OK');

    gpio.BCM_GPIO = true;
    gpio.output(5, 1).then(function() {
        console.log("*** Arrosage en cours de préparation ... ***");
        gpio.sequence(5, [1, 0, 1 100]).then(function() {
        // GPIO pin 5 has values written in series, with a 100ms delay between values 
        console.log("arrosage terminé");
        });

    });

}

var niveauCuve = function(req, res) {

    console.log("Mesure du niveau d'eau en cours...");

    var options = {
        mode: 'text',
        pythonPath: '/usr/bin/python',
        pythonOptions: ['-u'],
        // make sure you use an absolute path for scriptPath
    }

    var pyshell = new PythonShell('niveauCuve.py');


    pyshell.on('message', function(message) {

        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);

    });

    
    // end the input stream and allow the process to exit
    pyshell.end(function(err) {
        if (err) throw err;
        console.log('finished');
    });

}


exports.Arrosage = arrosage;
exports.NiveauCuve = niveauCuve;
