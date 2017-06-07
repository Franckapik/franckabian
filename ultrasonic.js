console.log("chargement du module ultrasonic");

var Influx = require('influx');

//Configuration de la base de donnes
var db = new Influx.InfluxDB({
    host: '192.168.1.78',
    database: 'mydb',
    tags: 'jardin'
});


var Gpio = require('pigpio').Gpio,
    trigger = new Gpio(17, { mode: Gpio.OUTPUT }), //ecriture
    echo = new Gpio(27, { mode: Gpio.INPUT, alert: true }); //lecture

MICROSECDONDS_PER_CM = 1e6 / 34321;

trigger.digitalWrite(0); // Niveau bas de trigger.

var startTick;
var pourcentage;
var currentCalc;

echo.on('alert', function(level, tick) {
    var endTick, //variables definies.
        diff;

    if (level == 1) { //si echo est niveau 
        startTick = tick;

    } else {
        endTick = tick;
        diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
        distance = diff / 2 / MICROSECDONDS_PER_CM;

        if (distance >= 0 && distance <= 2000) {
            currentCalc = 100 - (Math.round(distance) * 100 / 2000);
            
        } else {
            console.log("la valeur " + distance + "n'est pas acceptée !");
        }
    }

    if ((pourcentage - currentCalc) >= 1) {
        pourcentage = currentCalc;
        console.log("Ecriture dans la base de donnée :" + pourcentage);
        db.writePoints([{
            "measurement": "meteo",
            "fields": {
                "niveauEau": pourcentage
            }
        }]);

    } else {
        
    }
});

var getDistance = function() {
    
    trigger.trigger(10, 1);
    
};

getDistance();

exports.GetDistance = getDistance;