module.exports = {
  update: function(req, res) {
    Cliente_venta.query(
      "UPDATE `tickets`.`cliente_venta` SET `empresa` = UPPER( ? ), `nombre` = UPPER( ? ), `correo` = ?, `telefono` = ? WHERE `idClienteVenta` = ? ",
      [
        req.query.empresa,
        req.query.nombre,
        req.query.correo,
        req.query.telefono,
        req.query.idClienteVenta
      ],
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },
  search: function(req, res) {
    Cliente_venta.query(
      "SELECT * FROM cliente_venta ORDER BY cliente_venta.empresa, cliente_venta.nombre ASC",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(result);
      }
    );
  }
};
