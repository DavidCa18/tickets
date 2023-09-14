module.exports = {
   updateDescription: function(req, res) {
      Incidencia.query(
         "UPDATE `incidencias_venta` SET `descripcion`= ? WHERE (`idIncidenciaVenta`= ?)", [req.body.descripcion, req.body.idIncidenciaVenta],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   sendEmailTicketVentaSeguimiento: function(req, res) {

      var fechaAperturaN = sails.moment(new Date(req.body.fechaApertura)).format("YYYY-MM-DD LTS");

      res.render(
         __dirname + "/email/SeguimientoTicketVenta/html.ejs", {
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
                     subject: "[CINETO TELECOMUNICACIONES S.A] SEGUIMIENTO DEL TICKET DE VENTAS | N° " +
                        req.body.codigo,
                     html: html
                  })
                  .then(res.send(201, "Enviado"))
                  .catch(res.negotiate);
            }
         }
      );
   },

   searchEmailTicketVentaSeguimiento: function(req, res) {
      Incidencia.query(
         "SELECT " +
         "ticket_venta.fechaApertura, " +
         "ticket_venta.asunto, " +
         "ticket_venta.codigo, " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT( cliente_venta.correo ) " +
         "FROM " +
         "cliente_ticket_venta " +
         "INNER JOIN cliente_venta ON cliente_ticket_venta.idClienteVenta = cliente_venta.idClienteVenta " +
         "WHERE " +
         "cliente_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'correo', " +
         "( " +
         "SELECT " +
         "GROUP_CONCAT(usuario.correo) " +
         "FROM " +
         "cargo_usuario " +
         "INNER JOIN usuario ON cargo_usuario.idUsuario = usuario.idUsuario " +
         "INNER JOIN cargo ON cargo_usuario.idCargo = cargo.idCargo " +
         "WHERE " +
         "cargo.nombre = 'VENDEDOR' " +
         ") AS 'usuarios', " +
         "( " +
         "SELECT  " +
         "GROUP_CONCAT( usuario.correo ) " +
         "FROM " +
         "usuario_ticket_venta " +
         "INNER JOIN usuario ON usuario_ticket_venta.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario_ticket_venta.idTicketVenta = ticket_venta.idTicketVenta " +
         ") AS 'usuarioAsigandos' " +
         "FROM " +
         "ticket_venta " +
         "WHERE " +
         "ticket_venta.idTicketVenta = '" +
         req.body.idTicketVenta +
         "'",
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data[0]);
            }
         }
      );
   }
};