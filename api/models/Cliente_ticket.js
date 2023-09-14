module.exports = {

  attributes: {

    idClienteTicket: { type: "integer", primaryKey: true, autoIncrement: true },

    idCliente: { model: 'cliente' },

    idTicket: { model: 'ticket' }
  }
};

