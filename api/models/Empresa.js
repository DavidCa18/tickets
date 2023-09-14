module.exports = {
  attributes: {
    idEmpresa: {type: "integer", primaryKey: true, autoIncrement: true},

    nombre: { type: "string" },

    clientes: {
      collection: "cliente",
      via: "idEmpresa"
    }
  }
};
