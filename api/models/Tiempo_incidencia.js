module.exports = {
  attributes: {
    idTiempoIncidencia: { type: "integer", primaryKey: true, autoIncrement: true },

    fechaInicio: { type: "datetime" },

    fechaFinal: { type: "datetime" },

    idIncidencia: { model: "incidencia" },

    tiempo: { type: "time" }
  }
};
