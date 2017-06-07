var CronJob = require('cron').CronJob;
var ultrasonic = require('./ultrasonic');



var job = new CronJob('*/1 * * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
console.log("***Automatisme réglé sur 30 minute***");
ultrasonic.GetDistance();


  }, null, true
);

exports.job = job;
