module.exports = {
   ultimoCodigo: function(req, res) {
      Ticket_venta.query("SELECT Count(*) AS 'num' FROM ticket_venta", function(
         err,
         result
      ) {
         if (err) {
            return res.serverError(err);
         }
         return res.send(200, result[0].num + 1);
      });
   },

   updateTicketvendido: function(req, res) {
      Ticket_venta.query(
         "UPDATE `tickets`.`ticket_venta` SET `descripcion` = ?, `costo` = ?,  `estado` = 'VENTA CONCRETADA', `fechaCierre` = ?, `duracionVenta` = ?, `duracionVentaTiempo` = ? WHERE `idTicketVenta` = ? ", [
            req.body.descripcion,
            req.body.costo,
            req.body.fechaCierre,
            req.body.duracionVenta,
            req.body.duracionVentaTiempo,
            req.body.idTicketVenta
         ],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   updateTicketNoVendido: function(req, res) {
      Ticket_venta.query(
         "UPDATE `tickets`.`ticket_venta` SET `descripcion` = ?, `costo` = '0', `estado` = 'VENTA NO CONCRETADA', `fechaCierre` = ?, `duracionVenta` = ?, `duracionVentaTiempo` = ? WHERE `idTicketVenta` = ? ", [
            req.body.descripcion,
            req.body.fechaCierre,
            req.body.duracionVenta,
            req.body.duracionVentaTiempo,
            req.body.idTicketVenta
         ],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchTicketsSeguimiento: function(req, res) {
      Ticket_venta.query(
         "SELECT " +
         "ticket_venta.idTicketVenta, " +
         "ticket_venta.codigo, " +
         "ticket_venta.asunto, " +
         "ticket_venta.estado, " +
         "ticket_venta.fechaApertura, " +
         "ticket_venta.fechaCierre, " +
         "ticket_venta.duracionVenta, " +
         "(SELECT " +
         "GROUP_CONCAT(cliente_venta.empresa) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'empresaCliente', " +
         "(SELECT " +
         "GROUP_CONCAT(cliente_venta.nombre) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'nombreCliente', " +
         "(SELECT " +
         "GROUP_CONCAT(cliente_venta.telefono) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'telefonoCliente', " +
         "(SELECT " +
         "GROUP_CONCAT(cliente_venta.correo) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'correoCliente', " +
         "producto_venta.nombre AS 'nombreProducto', " +
         "(SELECT " +
         "GROUP_CONCAT(usuario.nombre) " +
         "FROM " +
         "usuario_ticket_venta " +
         "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'usuarios' " +
         "FROM " +
         "ticket_venta " +
         "INNER JOIN producto_venta ON ticket_venta.idProductoVenta = producto_venta.idProductoVenta " +
         "ORDER BY ticket_venta.codigo DESC ",
         function(err, result) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, result);
         }
      );
   },

   searchCodigosTicket: function(req, res) {
      Ticket_venta.query(
         "SELECT DISTINCT ticket_venta.codigo, ticket_venta.idTicketVenta FROM ticket_venta",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchCodigosTicketParametros: function(req, res) {
      Ticket_venta.query(
         "SELECT ticket_venta.codigo, ticket_venta.idTicketVenta FROM usuario_ticket_venta INNER JOIN ticket_venta ON usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario WHERE usuario.idUsuario = " +
         req.query.idUsuario +
         "",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchNombreClientesTicket: function(req, res) {
      Cliente_venta.query(
         "SELECT " +
         "cliente_venta.idClienteVenta, " +
         "cliente_venta.nombre " +
         "FROM " +
         "cliente_venta " +
         "WHERE " +
         "cliente_venta.empresa = ? ", [req.query.empresa],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchDatosClientesTicket: function(req, res) {
      Cliente_venta.query(
         "SELECT " +
         "cliente_venta.correo, " +
         "cliente_venta.telefono " +
         "FROM " +
         "cliente_venta " +
         "WHERE " +
         "cliente_venta.idClienteVenta = ? ", [req.body.idClienteVenta],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data[0]);
         }
      );
   },

   searchClientesTicket: function(req, res) {
      Ticket_venta.query(
         "SELECT DISTINCT cliente_venta.empresa, cliente_venta.idClienteVenta FROM cliente_venta",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchTicketVentaBusqueda: function(req, res) {
      var parametro = req.body.parametro;

      if (parametro == 1) {
         Ticket_venta.query(
            "SELECT " +
            "ticket_venta.idTicketVenta, " +
            "ticket_venta.codigo, " +
            "ticket_venta.asunto, " +
            "ticket_venta.estado, " +
            "ticket_venta.fechaApertura, " +
            "ticket_venta.fechaCierre, " +
            "ticket_venta.duracionVenta, " +
            "(SELECT " +
            "GROUP_CONCAT(cliente_venta.nombre) " +
            "FROM " +
            "cliente_ticket_venta " +
            "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
            "WHERE " +
            "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'nombreCliente', " +
            "producto_venta.nombre AS 'nombreProducto', " +
            "(SELECT " +
            "GROUP_CONCAT(usuario.nombre) " +
            "FROM " +
            "usuario_ticket_venta " +
            "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
            "WHERE " +
            "usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'usuarios' " +
            "FROM " +
            "ticket_venta " +
            "INNER JOIN producto_venta ON ticket_venta.idProductoVenta = producto_venta.idProductoVenta " +
            "ORDER BY ticket_venta.codigo DESC ",
            function(err, data) {
               if (err) {
                  return res.serverError(err);
               }
               return res.send(201, data);
            }
         );
      } else if (parametro == 2) {
         Ticket_venta.query(
            "SELECT " +
            "ticket_venta.idTicketVenta, " +
            "ticket_venta.codigo, " +
            "ticket_venta.asunto, " +
            "ticket_venta.estado, " +
            "ticket_venta.fechaApertura, " +
            "ticket_venta.fechaCierre, " +
            "ticket_venta.duracionVenta, " +
            "(SELECT " +
            "GROUP_CONCAT(cliente_venta.nombre) " +
            "FROM " +
            "cliente_ticket_venta " +
            "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
            "WHERE " +
            "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'nombreCliente', " +
            "producto_venta.nombre AS 'nombreProducto', " +
            "(SELECT " +
            "GROUP_CONCAT(usuario.nombre) " +
            "FROM " +
            "usuario_ticket_venta " +
            "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
            "WHERE " +
            "usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta) AS 'usuarios' " +
            "FROM " +
            "ticket_venta " +
            "INNER JOIN producto_venta ON ticket_venta.idProductoVenta = producto_venta.idProductoVenta WHERE " +
            req.body.sql +
            " " +
            " ORDER BY ticket_venta.codigo DESC ",
            function(err, data) {
               if (err) {
                  return res.serverError(err);
               }
               return res.send(201, data);
            }
         );
      } else {
         res.serverError("No Envió Parámetros");
      }
   },

   searchTicketVentaDocumentos: function(req, res) {
      Ticket_venta.query(
         "SELECT " +
         "ticket_venta.idTicketVenta, " +
         "ticket_venta.codigo, " +
         "ticket_venta.asunto, " +
         "ticket_venta.estado, " +
         "ticket_venta.descripcion, " +
         "ticket_venta.nombreUsuario, " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(usuario.nombre) " +
         "FROM " +
         "usuario_ticket_venta " +
         "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'usuarios', " +
         "ticket_venta.fechaApertura, " +
         "ticket_venta.fechaCierre, " +
         "ticket_venta.duracionVenta, " +
         "ticket_venta.costo, " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(cliente_venta.empresa) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'empresaCliente', " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(cliente_venta.nombre) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'nombreCliente', " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(cliente_venta.telefono) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'telefonoCliente', " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(cliente_venta.correo) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'correoCliente', " +
         "producto_venta.nombre AS 'nombreProducto' " +
         "FROM " +
         "ticket_venta " +
         "INNER JOIN producto_venta ON ticket_venta.idProductoVenta = producto_venta.idProductoVenta " +
         "WHERE " +
         "ticket_venta.idTicketVenta = ?", [req.body.idTicketVenta],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data[0]);
         }
      );
   },

   searchTicketVentasTiempo: function(req, res) {
      Ticket_venta.query(
         "SELECT " +
         "ticket_venta.codigo, " +
         "ticket_venta.estado, " +
         "ticket_venta.fechaApertura, " +
         "ticket_venta.fechaCierre, " +
         "ticket_venta.costo, " +
         "ticket_venta.duracionVenta, " +
         "ticket_venta.descripcion, " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT( cliente_venta.nombre ) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'cliente', " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT( cliente_venta.empresa ) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'empresa', " +
         "CONCAT(producto_venta.nombre) AS 'producto' " +
         "FROM " +
         "ticket_venta " +
         "INNER JOIN producto_venta ON ticket_venta.idProductoVenta = producto_venta.idProductoVenta " +
         "WHERE " +
         req.body.sql +
         "",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   reportTicketVentasTiempoSummary: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket_venta.estado, " +
         "COUNT( ticket_venta.duracionVentaTiempo ) AS 'numeroTickets', " +
         "SUM(ticket_venta.costo) AS 'costoTicket' " +
         "FROM " +
         "ticket_venta WHERE  " +
         req.body.sql +
         "  GROUP BY ticket_venta.estado",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   sendEmailTicketVenta: function(req, res) {
      var options = {
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "numeric",
         minute: "numeric",
         second: "numeric"
      };
      var fechaAperturaN = sails.moment(new Date(req.body.fechaApertura)).format("YYYY-MM-DD LTS");

      res.render(
         __dirname + "/email/InicioTicketVenta/html.ejs", {
            Codigo: req.body.codigo,
            Asunto: req.body.asunto,
            Fecha: fechaAperturaN.toString()
         },
         function(err, html) {
            if (err) {
               console.log(err);
               res.send(err);
            } else {
               ServicioEmailVentas.correo
                  .send({
                     to: req.body.correos,
                     subject: "[CINETO TELECOMUNICACIONES S.A] APERTURA DEL TICKET DE VENTAS | N° " +
                        req.body.codigo,
                     html: html
                  })
                  .then(res.send(201, "Enviado"))
                  .catch(res.negotiate);
            }
         }
      );
   },

   searchNumeroTicketsInicio: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket_venta.estado, " +
         "COUNT(ticket_venta.estado) AS 'numero', " +
         "SUM(ticket_venta.costo) AS 'costo' " +
         "FROM " +
         "ticket_venta " +
         "" +
         req.body.anio +
         " " +
         "GROUP BY " +
         "ticket_venta.estado " +
         "ORDER BY ticket_venta.estado DESC",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchTicketsPertenecientesUsuario: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket_venta.idTicketVenta, " +
         "ticket_venta.codigo, " +
         "ticket_venta.asunto, " +
         "ticket_venta.fechaApertura, " +
         "usuario.idUsuario " +
         "FROM " +
         "usuario_ticket_venta " +
         "INNER JOIN ticket_venta ON usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario.idUsuario = ? " +
         "AND " +
         "ticket_venta.estado = ? ", [req.body.usuario, req.body.estado],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchGraficoNumeroTicketsInicio: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket_venta.estado, " +
         "COUNT(ticket_venta.estado) AS 'numero', " +
         "DATE_FORMAT(ticket_venta.fechaApertura,'%M') AS 'mes', " +
         "MONTH(ticket_venta.fechaApertura) AS 'mesNumero' " +
         "FROM " +
         "ticket_venta " +
         "WHERE " +
         "YEAR(ticket_venta.fechaApertura) = '" +
         req.body.anio +
         "' " +
         "AND " +
         "ticket_venta.estado = '" +
         req.body.estado +
         "' " +
         "GROUP BY " +
         "ticket_venta.estado, " +
         "MONTH(ticket_venta.fechaApertura) " +
         "ORDER BY " +
         "MONTH(ticket_venta.fechaApertura)",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   }
};