module.exports = {
  attributes: {
    idCargoUsuario: { type: "integer", primaryKey: true, autoIncrement: true },

    idCargo: { model: "cargo" },

    idUsuario: { model: "usuario" }
  }
};
