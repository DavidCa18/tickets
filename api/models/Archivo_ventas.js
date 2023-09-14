module.exports = {
  attributes: {
    idArchivoVenta: { type: "integer", primaryKey: true, autoIncrement: true },
    nombre: { type: "string" },
    ubicacion: { type: "text" },
    tipo: { type: "string" },
    idIncidenciaVenta: { model: "incidencias_venta" }
  }
};
