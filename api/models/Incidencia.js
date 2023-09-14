module.exports = {
  attributes: {
    idIncidencia: { type: "integer", primaryKey: true, autoIncrement: true },

    descripcion: { type: "longtext" },

    lugarTrabajo: { type: "string" },

    id_cliente_usuario: { type: "integer" },

    cliente_usuario: { type: "string" },

    idTicket: { model: "ticket" },

    archivos: {
      collection: "archivo",
      via: "idIncidencia"
    },

    tiempo: {
      collection: "tiempo_incidencia",
      via: "idIncidencia"
    },
  }
};
