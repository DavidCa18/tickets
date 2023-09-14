//Modelo de la entidad producto
module.exports = {
  attributes: {
    idProducto: { type: "integer", primaryKey: true, autoIncrement: true },

    marca: { type: "string" },

    modelo: { type: "string" },

    producto_ticket: {
      collection: "producto_ticket",
      via: "idProducto"
    }
  },

  beforeCreate(valores, callback) {
    valores.marca = valores.marca.toUpperCase();
    valores.modelo = valores.modelo.toUpperCase();
    callback();
  }
};
