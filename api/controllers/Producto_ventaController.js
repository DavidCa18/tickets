module.exports = {
  update: function(req, res) {
    Producto_venta.query(
      "UPDATE `tickets`.`producto_venta` SET `nombre` = UPPER( ? ) WHERE `idProductoVenta` = ? ",
      [req.query.nombre, req.query.idProductoVenta],
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  }
};
