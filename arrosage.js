var gpio = require('wpi-gpio');
var Promise = require("bluebird");

console.log('--start5--');

Trig = 17 // Entree Trig du HC-SR04 branchee au GPIO 17 (wpi0)
Echo = 27 // Sortie Echo du HC-SR04 branchee au GPIO 27 


/**gpio.BCM_GPIO = true;

gpio.output(Trig, 0);
gpio.input(Echo, 0); 
*/

gpio.read(Trig).then(function(val) {

	if (val === 1) { console.log("Trig =" + val) ;}

	if (val === 0) { console.log("Trig =" + val) ;}

})

