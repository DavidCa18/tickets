module.exports = {
  updateTime: function(req, res) {
    Tiempo_incidencia.query(
      "UPDATE `tickets`.`tiempo_incidencia` SET `fechaFinal` = '" +
        req.body.fechFinal +
        "' WHERE `idTiempoIncidencia` = " +
        req.body.idTiempoIncidencia +
        "",
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  },

  checkFinalTime: function(req, res) {
    Tiempo_incidencia.query(
      "SELECT IFNULL(tiempo_incidencia.fechaFinal,'S/F') AS 'comprobacion' FROM tiempo_incidencia WHERE tiempo_incidencia.idTiempoIncidencia = " +
        req.body.idTiempoIncidencia +
        "",
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  },

  verifyFinalTime: function(req, res) {
    Tiempo_incidencia.query(
      "SELECT SEC_TO_TIME((TIMESTAMPDIFF(MINUTE , tiempo_incidencia.fechaInicio, tiempo_incidencia.fechaFinal ))*60) AS 'tiempo' FROM tiempo_incidencia WHERE tiempo_incidencia.idIncidencia = " +
        req.body.idTiempoIncidencia +
        "",
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  },

  insertFinalDateTime: function(req, res) {
    Tiempo_incidencia.query(
      "UPDATE `tickets`.`tiempo_incidencia` SET `fechaFinal` = ?, `tiempo` =  SEC_TO_TIME( ? ) WHERE `idTiempoIncidencia` = ? ",
      [req.body.fechaFinal, req.body.tiempo, req.body.idTiempoIncidencia],
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  },

  saveIncidencia: function(req, res) {
    Tiempo_incidencia.query(
      "INSERT INTO `tickets`.`tiempo_incidencia` (`fechaInicio`, `fechaFinal`, `idIncidencia`, `tiempo`) VALUES (?,?,?, SEC_TO_TIME( ? ))",
      [
        req.body.fechaInicio,
        req.body.fechaFinal,
        req.body.idIncidencia,
        req.body.tiempo
      ],
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  }
};
