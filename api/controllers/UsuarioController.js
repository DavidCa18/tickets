module.exports = {
   save: function(req, res) {
      Usuario.create({
         nombre: req.query.nombre,
         correo: req.query.correo,
         idNivel: "1",
         rol: req.query.rol,
         password: password()
      }).exec(function(err, result) {
         if (err) {
            return res.serverError(err);
         }

         return res.send(true);
      });
   },

   update: function(req, res) {
      Usuario.query(
         "UPDATE `usuario` SET `nombre`= UPPER('" +
         req.query.nombre +
         "'), `correo`='" +
         req.query.correo +
         "', `rol`='" +
         req.query.rol +
         "' WHERE (`idUsuario`='" +
         req.query.idUsuario +
         "')",
         function(err, result) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(true);
         }
      );
   },

   updateProfile: function(req, res) {
      Usuario.query(
         "UPDATE `usuario` SET `nombre`= UPPER('" +
         req.body.nombre +
         "'), `correo`='" +
         req.body.correo +
         "', `password`='" +
         req.body.password +
         "' WHERE (`idUsuario`='" +
         req.body.idUsuario +
         "')",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   delete: function(req, res) {
      Usuario.query(
         "DELETE FROM `usuario` WHERE (`idUsuario`='" + req.query.idUsuario + "')",
         function(err, result) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(true);
         }
      );
   },

   search: function(req, res) {
      Usuario.find().exec(function(err, data) {
         if (err) {
            return res.serverError(err);
         } else {
            return res.send(data);
         }
      });
   },

   searchUsuariosCargos: function(req, res) {
      Usuario.query(
         "SELECT " +
         "usuario.idUsuario, " +
         "usuario.nombre, " +
         "usuario.correo, " +
         "usuario.rol, " +
         "GROUP_CONCAT(cargo.nombre) AS 'cargo' " +
         "FROM " +
         "cargo_usuario " +
         "INNER JOIN usuario ON cargo_usuario.idUsuario = usuario.idUsuario " +
         "INNER JOIN cargo ON cargo_usuario.idCargo = cargo.idCargo " +
         "GROUP BY " +
         "usuario.idUsuario",
         function(err, result) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(result);
         }
      );
   },

   searchValidateUsuariosTicket: function(req, res) {
      Usuario.query(
         "SELECT usuario.idUsuario, usuario.nombre FROM usuario_ticket INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario WHERE usuario_ticket.idTicket = ? AND usuario.idUsuario = ?", [req.body.idTicket, req.body.idUsuario],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               if (data == "") {
                  return res.send(201, "false");
               } else {
                  return res.send(201, data[0]);
               }
            }
         }
      );
   },

   searchValidateUsuariosTicketVenta: function(req, res) {
      Usuario.query(
         "SELECT usuario.idUsuario, usuario.nombre FROM usuario_ticket_venta INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario WHERE usuario_ticket_venta.idTicketVenta = ? AND usuario.idUsuario = ?", [req.body.idTicketVenta, req.body.idUsuario],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               if (data == "") {
                  return res.send(201, "false");
               } else {
                  return res.send(201, data[0]);
               }
            }
         }
      );
   },

   searchUsuariosAsignadosTicket: function(req, res) {
      Usuario.query(
         "SELECT usuario.idUsuario, usuario.nombre FROM usuario_ticket INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario WHERE usuario_ticket.idTicket = ? ", [req.body.idTicket],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   login: function(req, res) {
      return res.login({
         correo: req.param("email"),
         password: req.param("password"),
         sistema: req.param("sistema"),
         cargo: req.param("cargo"),
         successRedirectAdmin: "/AdministradorInicio",
         successRedirectSuperAdmin: "/SuperAdministradorInicio",
         successRedirectAdminVentas: "/AdministradorVentasInicio",
         successRedirectSuperAdminVentas: "/SuperAdministradorVentasInicio",
         invalidRedirect: "/"
      });

   },

   logout: function(req, res) {
      req.session.me = null;

      if (req.wantsJSON) {
         return res.ok("Logged out successfully!");
      }

      return res.redirect("/");
   },

   inicioSesion: function(req, res) {
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
         "usuario.correo = ? " +
         "AND " +
         "usuario.`password` = ? ", [req.body.correo, req.body.password],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   searchCargos: function(req, res) {
      Usuario.query(
         "SELECT " +
         "cargo.nombre AS 'nombreCargo' " +
         "FROM " +
         "cargo_usuario " +
         "INNER JOIN usuario ON cargo_usuario.idUsuario = usuario.idUsuario " +
         "INNER JOIN cargo ON cargo_usuario.idCargo = cargo.idCargo " +
         "WHERE " +
         "usuario.correo = ? " +
         "AND " +
         "usuario.`password` = ? ", [req.body.correo, req.body.password],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   }
};

function password() {
   var chars =
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890?¿¡!";
   var lon = 10;
   code = "";
   for (x = 0; x < lon; x++) {
      rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand, 1);
   }
   return code;
}