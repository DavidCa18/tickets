module.exports = {
  save: function(req, res) {
    Empresa.create({
      nombre: req.query.nombre
    }).exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }

      return res.send(true);
    });
  },

  update: function(req, res) {
    Empresa.query(
      "UPDATE `empresa` SET `nombre`='" +
        req.query.nombre +
        "' WHERE (`idEmpresa`='" +
        req.query.idEmpresa +
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
    Empresa.query(
      "DELETE FROM `empresa` WHERE (`idEmpresa`='" + req.query.idEmpresa + "')",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  search: function(req, res) {
    Empresa.query(
      "SELECT empresa.idEmpresa AS 'value', empresa.nombre AS 'text' FROM empresa",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(result);
      }
    );
  }

};
