module.exports = {
  save: function(req, res) {
    Cliente.create({
      identificacion: req.query.identificacion,
      cargo: req.query.cargo,
      nombre: req.query.nombre,
      correo: req.query.correo,
      idEmpresa: req.query.idEmpresa
    }).exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }

      return res.send(true);
    });
  },

  update: function(req, res) {
    Cliente.query(
      "UPDATE `cliente` SET " +
        "`nombre` = '" +
        req.query.nombre +
        "', `correo` = '" +
        req.query.correo +
        "', `idEmpresa` = '" +
        req.query.idEmpresa +
        "', `cargo` = '" +
        req.query.cargo +
        "' WHERE `idCliente` = " +
        req.query.idCliente +
        "",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  delete: function(req, res) {
    Cliente.query(
      "DELETE FROM `cliente` WHERE (`idCliente`='" + req.query.idCliente + "')",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(true);
      }
    );
  },

  search: function(req, res) {
    Cliente.find().exec(function(err, data) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(data);
      }
    });
  },

  searchClientesAsignadoTicket: function(req, res) {

    Cliente.query(
      "SELECT cliente.idCliente, cliente.nombre FROM cliente_ticket INNER JOIN cliente ON cliente_ticket.idCliente = cliente.idCliente WHERE cliente_ticket.idTicket = ?",
      [req.body.idTicket],
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, result);
      }
    );
  }
};
