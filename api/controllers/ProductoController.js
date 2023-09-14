//Controladores de la entidad producto
module.exports = {
  save: function(req, res) {
    var marca = req.query.marca;
    var marcaR = marca.replaceAll(",", " - ");

    var modelo = req.query.modelo;
    var modeloR = modelo.replaceAll(",", " - ");

    Producto.create({
      marca: marcaR,
      modelo: modeloR
    }).exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }

      return res.send(true);
    });
  },

  update: function(req, res) {
    var marca = req.query.marca;
    var marcaR = marca.replaceAll(",", "-");

    var modelo = req.query.modelo;
    var modeloR = modelo.replaceAll(",", "-");

    Producto.query(
      "UPDATE `producto` SET `marca`='" +
        marcaR +
        "', `modelo`='" +
        modeloR +
        "' WHERE (`idProducto`='" +
        req.query.idProducto +
        "')",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  delete: function(req, res) {
    Producto.query(
      "DELETE FROM `producto` WHERE (`idProducto`='" +
        req.query.idProducto +
        "')",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  search: function(req, res) {
    Producto.find().exec(function(err, data) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(data);
      }
    });
  }
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
