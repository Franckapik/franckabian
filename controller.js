var express = require('express');
var gpio = require('wpi-gpio');
var sleep = require('sleep');
var Influx = require('influx');
var Promise = require("bluebird");
var PythonShell = require('python-shell');
var math = require('mathjs');
var config = require('./config');
var moment = require('moment');

//Configuration de la base de donnes
var db = new Influx.InfluxDB({
    host: config.host,
    database: config.database,
    tags: config.tags
});


console.log("Controller PI46 connecté");

var flag = 'free';

var arrosage = function(req, res) {
res.send('temps :' +  req.params.time);

    if (flag == 'free') {

        flag = 'blocking';
        moment.locale('fr');

        gpio.BCM_GPIO = true;

        Promise.try(() => {
            return gpio.output(5, 1)
        }).then(() => {
            console.log("*** Arrosage en cours de préparation ... ***");

            return gpio.write(5, 0)
        }).then(() => {
            console.log("*** Arrosage activé ***");

            db.writePoints([{
                "measurement": "arrosage",
                "fields": {
                    "open": moment().format('MMMM Do, h:mm a')
                }
            }]);

            return Promise.delay(req.params.time * 1000);
        }).then(() => {
            
            return gpio.write(5, 1)
        }).then(() => {
            console.log("*** Arrosage terminé ***");

            db.writePoints([{
                "measurement": "arrosage",
                "fields": {
                    "close": moment().format('MMMM Do, h:mm a')
                }
            }]);

            flag = 'free';
        })

    } else {
        console.log('Arrosage déjà en cours...');
    }

}
const niveauCuve = function(req, res) {
        new Promise((resolve, reject) => {
            console.log("[Mesure Niveau Eau]");

            var options = {
                mode: 'text',
                pythonPath: '/usr/bin/python',
                pythonOptions: ['-u'],
                scriptPath: '/home/pi/garage/'

            }

            PythonShell
                .run('niveauCuve.py', options, function(err, results) {
                    if (err) reject(err);
                    if (results) {
                        var mediane = [math.median(results)];
                        console.log('Impulsions :' + results)
                        console.log('Médiane :' + mediane);
                        res.send(mediane)
                    } else {
                        console.log('niveauCuve - Aucune donnée')
                        res.send(0)
                    }

                });
        })

    }
    /**
    var niveauCuve = function(req, res) {

        console.log("Mesure du niveau d'eau en cours...");

        var options = {
            mode: 'text',
            pythonPath: '/usr/bin/python',
            pythonOptions: ['-u'],
            scriptPath: '/home/pi/garage/'
            // make sure you use an absolute path for scriptPath
        }

        PythonShell.run('niveauCuve.py', options, function (err, results) {
            
            var mediane = [math.median(results)];
            console.log('Niveau Cuve :' + results)
            console.log('Médiane :' + mediane);
            res.send(mediane);
            if (err) throw err;
    }); 


    }*/


exports.Arrosage = arrosage;
exports.NiveauCuve = niveauCuve;
