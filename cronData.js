var CronJob = require('cron').CronJob;


var job = new CronJob('*/1 * * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */



  }, null, true
);

exports.job = job;
