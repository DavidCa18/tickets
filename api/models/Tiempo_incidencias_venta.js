module.exports = {
  attributes: {

    idTiempoIncidenciaVenta: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true
    },

    fechaInicio: { type: "string" },

    fechaFinal: { type: "string" },

    tiempoTotal: { type: "string" },

    idIncidenciaVenta: { model: "incidencias_venta" }

  }
};
