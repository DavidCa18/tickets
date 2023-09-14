module.exports = {

  attributes: {

    idNivel : { type: "integer", primaryKey: true, autoIncrement: true },

    descripcion : { type: 'string' },

    usuarios: {
      collection: 'usuario',
      via: 'idNivel'
    }
  }
};
