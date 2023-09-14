/**
 * Cliente_ticket_venta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    idClienteTicketVenta : { type: "integer", primaryKey: true, autoIncrement: true },

    idClienteVenta : { model: 'cliente_venta' },

    idTicketVenta : { model: 'ticket_venta' }
  }
};

