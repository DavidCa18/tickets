
module.exports = {

  attributes: {

    idUsuarioTicketVenta : { type: "integer", primaryKey: true, autoIncrement: true },

    idUsuario : { model: 'usuario' },

    idTicketVenta : { model: 'ticket_venta' }
  }
};

