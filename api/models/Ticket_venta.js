module.exports = {
  attributes: {
    idTicketVenta: { type: "integer", primaryKey: true, autoIncrement: true },

    codigo: { type: "string" },

    asunto: { type: "text" },

    fechaApertura: { type: "datetime" },

    fechaCierre: { type: "datetime" },

    duracionVenta: { type: "string" },

    duracionVentaTiempo: { type: "string" },

    costo: { type: "string" },

    estado: { type: "string" },

    descripcion: { type: "string" },

    idUsuario: { type: "integer" },

    nombreUsuario: { type: "string" },

    idProductoVenta: { model: "producto_venta" },

    usuario_ticket_venta: {
      collection: "usuario_ticket_venta",
      via: "idTicketVenta"
    },

    incidencias_ventas: {
      collection: "incidencias_venta",
      via: "idTicketVenta"
    },

    cliente_ticket_venta: {
      collection: "cliente_ticket_venta",
      via: "idTicketVenta"
    }
  }
};
