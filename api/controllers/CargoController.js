module.exports = {
  save: function(req, res) {
    var nombreCargo = req.query.nombre;
    Cargo.create({
      nombre: nombreCargo.toUpperCase()
    }).exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }

      return res.send(true);
    });
  },

  update: function(req, res) {
    Cargo.query(
      "UPDATE `tickets`.`cargo` SET `nombre` = UPPER( ? ) WHERE `idCargo` = ? ",
      [req.query.nombre, req.query.idCargo],
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  delete: function(req, res) {
    Cargo.query(
      "DELETE FROM `tickets`.`cargo` WHERE `idCargo` = ? ",
      [req.query.idCargo],
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  }
};
