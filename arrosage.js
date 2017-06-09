var gpio = require('wpi-gpio');
var sleep = require('sleep');

var arrosage = function() {
    gpio.BCM_GPIO = true;
    gpio.output(5, 1).then(function() {
        console.log("*** Arrosage en cours de préparation ... ***");
        gpio.write(5, 0).then(function() {
            console.log("*** Arrosage activé ***");
            sleep.sleep(10);
            gpio.write(5, 1).then(function() {
                console.log("*** Arrosage terminé ***");
            });

        });

    });

}

exports.Arrosage = arrosage;