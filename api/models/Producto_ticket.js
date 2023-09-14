/**
 * Producto_ticket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    idProductoTicket: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true
    },

    idProducto: { model: "producto" },

    idTicket: { model: "ticket" },

    version: { type: "text" },

    comentario: { type: "text" }
  },

  beforeCreate(valores, callback) {
    valores.version = valores.version.toUpperCase();
    valores.comentario = valores.comentario.toUpperCase();
    callback();
  },

};
