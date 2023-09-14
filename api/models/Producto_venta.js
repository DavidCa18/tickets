module.exports = {
  attributes: {
    idProductoVenta: { type: "integer", primaryKey: true, autoIncrement: true },

    nombre: { type: "longtext" },

    ticket_venta: {
      collection: "ticket_venta",
      via: "idProductoVenta"
    }
  }
};
