module.exports = {
  attributes: {
    idClienteVenta: { type: "integer", primaryKey: true, autoIncrement: true },

    empresa: { type: "string" },

    nombre: { type: "string" },

    correo: { type: "string", unique: true },

    telefono: { type: "string" },

    cliente_ticket_venta: {
      collection: "cliente_ticket_venta",
      via: "idClienteVenta"
    }
  }
};
