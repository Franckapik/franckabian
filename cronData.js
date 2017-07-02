const CronJob = require('cron').CronJob;
var controller = require('./controller');
var config = require ('./config');

var jobniveau = new CronJob('0 */'+config.niveauHours+' * * *', function() {

    console.log("***Processus CronJob automatique [" + config.niveauHours + " heure(s)]***");
    controller.NiveauCuve();

}, null, true);

var jobarrosage = new CronJob(config.timeCycleHours + ' ' + config.timeCycleMinutes + ' * * * *', function() {

    console.log("***Processus Automatique [" + config.timeCycleHours + config.timeCycleMinutes + " ] ***");
    controller.Arrosage();

}, null, true);

exports.jobNiveau = jobniveau;
exports.jobArrosage = jobarrosage;

