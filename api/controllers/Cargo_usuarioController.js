module.exports = {
  save: function(req, res) {
    var validacion = "";
    Producto_venta.query(
      "SELECT cargo_usuario.idCargoUsuario FROM cargo_usuario WHERE cargo_usuario.idUsuario = ? AND cargo_usuario.idCargo = ? ",
      [req.body.idUsuario, req.body.idCargo],
      function(err, data) {
        if (err) {
          return res.serverError(err);
        } else {
          validacion = data;

          if (validacion == "") {
            Cargo_usuario.create({
              idCargo: req.body.idCargo,
              idUsuario: req.body.idUsuario
            }).exec(function(err, result) {
              if (err) {
                return res.serverError(err);
              }

              return res.send(201, true);
            });
          } else {
            return res.send(404, false);
          }
        }
      }
    );
  }
};
