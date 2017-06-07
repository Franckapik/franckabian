var Influx = require('influx');

//Configuration de la base de donnes
var db = new Influx.InfluxDB({
    host: '192.168.1.78',
    database: 'mydb',
    tags: 'jardin'
});


var Gpio = require('pigpio').Gpio,
    trigger = new Gpio(17, { mode: Gpio.OUTPUT }),
    echo = new Gpio(27, { mode: Gpio.INPUT, alert: true });

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var MICROSECDONDS_PER_CM = 1e6 / 34321;

trigger.digitalWrite(0); // Make sure trigger is low

var getDistance = function() {
    var startTick;

    echo.on('alert', function(level, tick) {
        var endTick,
            diff;

        if (level == 1) {
            startTick = tick;
        } else {
            endTick = tick;
            diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            distance = diff / 2 / MICROSECDONDS_PER_CM;
            pourcentage = 100 - (Math.round(distance) * 100 / 2000);

            if (distance >= 0 && distance <= 2000) {
                console.log(distance);

                db.writePoints([{
                    "measurement": "meteo",

                    "fields": {
                        "niveauEau": pourcentage
                    }
                }]);



                echo.disableAlert();


            } else {
                console.log("la valeur " + distance + "n'est pas acceptée !");

            }


        }
    });
};



exports.GetDistance = getDistance;

