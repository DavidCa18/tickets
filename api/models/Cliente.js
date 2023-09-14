module.exports = {
  attributes: {
    idCliente: { type: "integer", primaryKey: true, autoIncrement: true },

    cargo: { type: "string" },

    nombre: { type: "string" },

    correo: { type: "string", unique: true },

    idEmpresa: { model: "empresa" },

    cliente_ticket: {
      collection: "cliente_ticket",
      via: "idCliente"
    }
  },

  beforeCreate(valores, callback) {
    valores.nombre = valores.nombre.toUpperCase();
    callback();
  }
};
