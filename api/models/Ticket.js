module.exports = {
  attributes: {
    idTicket: { type: "integer", primaryKey: true, autoIncrement: true },

    codigo: { type: "string" },

    asunto: { type: "string" },

    prioridad: { type: "string" },

    fechaApertura: { type: "datetime" },

    fechaCierre: { type: "datetime" },

    costo: { type: "float" },

    estado: { type: "string" },

    creador: { type: "string" },

    revision_fisica: { type: "text" },

    revision_logica: { type: "text" },

    tiempo_total: { type: "time" },

    producto_ticket: {
      collection: "producto_ticket",
      via: "idTicket"
    },

    cliente_ticket: {
      collection: "cliente_ticket",
      via: "idTicket"
    },

    usuario_ticket: {
      collection: "usuario_ticket",
      via: "idTicket"
    },

    incidencias: {
      collection: "incidencia",
      via: "idTicket"
    }
  },

  beforeCreate(valores, callback) {
    valores.asunto = valores.asunto.toUpperCase();
    valores.prioridad = valores.prioridad.toUpperCase();
    valores.estado = valores.estado.toUpperCase();
    callback();
  },

};
