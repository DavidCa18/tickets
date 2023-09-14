module.exports = {
  attributes: {
    idIncidenciaVenta: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true
    },

    fecha: { type: "datetime" },

    descripcion: { type: "longtext" },

    idUsuario: { type: "integer" },

    nombreUsuario: { type: "string" },

    idTicketVenta: { model: "ticket_venta" },

    archivos: {
      collection: "archivo_ventas",
      via: "idIncidenciaVenta"
    },

    tiempo: {
      collection: "tiempo_incidencias_venta",
      via: "idIncidenciaVenta"
    }
  }
};
