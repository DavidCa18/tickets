/*var child_process = require("child_process");
module.exports.cron = {
  myFirstJob: {
    schedule: '00 30 21 * * 1-5',
    onTick: function() {
      var direccion = "C:\\Tickets\\respaldo\\respaldo.bat";
      child_process.exec("cmd /c start " + direccion + "", function(
        error,
        data
      ) {
        if (error) {
          console.log("No se realizo el backup");
          console.log(error);
        } else {
          console.log("Si se realizao el backup");
          console.log(data);
        }
      });
    }
  }
};*/
