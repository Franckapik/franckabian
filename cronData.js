const CronJob = require('cron').CronJob;
const ultrasonic = require('./ultrasonic');
var repetition = 30;

var job = new CronJob('*/'+repetition+' * * * *', function() {

    console.log("***Processus CronJob automatique [" + repetition + " minute(s)]***");
    ultrasonic.GetDistance();
}, null, true);

exports.job = job;
