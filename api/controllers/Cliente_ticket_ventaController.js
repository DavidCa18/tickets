/**
 * Cliente_ticket_ventaController
 *
 * @description :: Server-side logic for managing cliente_ticket_ventas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchClientesPertenecientesTicket: function(req, res) {
    Usuario.query(
      "SELECT " +
        "cliente_venta.nombre " +
        "FROM " +
        "cliente_ticket_venta " +
        "INNER JOIN ticket_venta ON cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
        "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
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
  }
};
