module.exports = {
  attributes: {
    idUsuario: { type: "integer", primaryKey: true, autoIncrement: true },

    nombre: { type: "string" },

    correo: { type: "string", unique: true },

    password: { type: "string" },

    rol: { type: "string" },

    idNivel: { model: "nivel" },

    usuario_ticket: {
      collection: "usuario_ticket",
      via: "idUsuario"
    },

    usuario_ticket_venta: {
      collection: "usuario_ticket_venta",
      via: "idUsuario"
    },

    cargo_usuario: {
      collection: "cargo_usuario",
      via: "idUsuario"
    }
  },

  beforeCreate(valores, callback) {
    valores.nombre = valores.nombre.toUpperCase();
    valores.rol = valores.rol.toUpperCase();
    callback();
  },

  attemptLogin: function(inputs, cb) {
    Usuario.query(
      "SELECT " +
        "usuario.idUsuario, " +
        "usuario.nombre, " +
        "usuario.correo, " +
        "usuario.`password`, " +
        "usuario.rol, " +
        "usuario.idNivel, " +
        "GROUP_CONCAT(cargo.nombre) AS 'cargo' " +
        "FROM " +
        "cargo_usuario " +
        "INNER JOIN usuario ON cargo_usuario.idUsuario = usuario.idUsuario " +
        "INNER JOIN cargo ON cargo_usuario.idCargo = cargo.idCargo " +
        "WHERE " +
        "usuario.correo = '" +
        inputs.email +
        "' " +
        "AND " +
        "usuario.`password` = '" +
        inputs.password +
        "' ",
      cb
    );
  }
};
