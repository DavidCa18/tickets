/**
 * Usuario_ticket_ventaController
 *
 * @description :: Server-side logic for managing usuario_ticket_ventas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchUsuarioPertenecientesTicket: function(req, res) {
    Usuario.query(
      "SELECT " +
        "usuario.nombre " +
        "FROM " +
        "usuario_ticket_venta " +
        "INNER JOIN ticket_venta ON usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
        "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
        "WHERE " +
        "ticket_venta.idTicketVenta = ? ",
      [req.body.idTicketVenta],
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(201, data);
      }
    );
  },

  addUsers: function(req, res) {
    Usuario_ticket_venta.query(
      'SELECT IFNULL(usuario_ticket_venta.idUsuarioTicketVenta,"VACIO") AS "pertenecer" FROM usuario_ticket_venta WHERE usuario_ticket_venta.idUsuario = ? AND usuario_ticket_venta.idTicketVenta = ?',
      [req.body.idUsuario, req.body.idTicketVenta],
      function(err, data) {
        if (err) {
          return res.serverError(err);
        }

        if (data == "") {
          Usuario_ticket_venta.query(
            "INSERT INTO `usuario_ticket_venta` (`idUsuario`, `idTicketVenta`) VALUES (?, ?)",
            [req.body.idUsuario, req.body.idTicketVenta],
            function(err, data) {
              if (err) {
                return res.serverError(err);
              }
              return res.send(201, data);
            }
          );
        } else {
          return res.send(200, "Ya Pertenece al Ticket de Venta ");
        }
      }
    );
  }
};
