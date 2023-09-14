module.exports = {
  attributes: {
    idClienteTicket: { type: "integer", primaryKey: true, autoIncrement: true },

    idUsuario: { model: "usuario" },

    idTicket: { model: "ticket" }
  }
};
