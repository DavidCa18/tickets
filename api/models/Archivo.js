module.exports = {
  attributes: {
    idArchivo: { type: "integer", primaryKey: true, autoIncrement: true },
    nombre: { type: "string" },
    ubicacion: { type: "text" },
    tipo: { type: "string" },
    idIncidencia: { model: "incidencia" }
  }
};
