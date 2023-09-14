module.exports = {
  attributes: {
    idCargo: { type: "integer", primaryKey: true, autoIncrement: true },

    nombre: { type: "string" },

    cargo_usuario: {
      collection: "cargo_usuario",
      via: "idCargo"
    }
  }
};
