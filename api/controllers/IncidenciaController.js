module.exports = {
   idIncidencia: function(req, res) {
      return res.json({
         todo: "idIncidencia() is not implemented yet!"
      });
   },

   serchEmailTicket: function(req, res) {
      Incidencia.query(
         "SELECT " +
         'CONCAT((SELECT GROUP_CONCAT((SELECT cliente.correo FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente) SEPARATOR ",") FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket ) , ",", ' +
         '(SELECT GROUP_CONCAT((SELECT usuario.correo FROM usuario WHERE usuario.idUsuario = usuario_ticket.idUsuario) SEPARATOR ",") FROM usuario_ticket WHERE usuario_ticket.idTicket = ticket.idTicket), ",", ' +
         '(SELECT GROUP_CONCAT(usuario.correo SEPARATOR ",")  FROM usuario WHERE usuario.rol = "ADMINISTRADOR" LIMIT 1)) AS correos ' +
         "FROM " +
         "ticket " +
         "WHERE " +
         "ticket.idTicket = ?", [req.body.idTicket],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   searchIncidenciaEmail: function(req, res) {
      Incidencia.query(
         "SELECT " +
         "ticket.codigo, " +
         "ticket.fechaApertura, " +
         '(SELECT GROUP_CONCAT((SELECT usuario.nombre FROM usuario WHERE usuario.idUsuario = usuario_ticket.idUsuario) SEPARATOR ", ") FROM usuario_ticket WHERE usuario_ticket.idTicket = ticket.idTicket) AS staff, ' +
         "ticket.estado, " +
         "ticket.prioridad, " +
         "tiempo_incidencia.fechaInicio, " +
         "incidencia.cliente_usuario, " +
         '(SELECT GROUP_CONCAT((SELECT CONCAT( producto.marca,",",producto.modelo) FROM producto WHERE producto.idProducto = producto_ticket.idProducto) SEPARATOR ", ") FROM producto_ticket WHERE producto_ticket.idTicket = ticket.idTicket ) AS producto ' +
         "FROM " +
         "ticket " +
         "INNER JOIN incidencia ON ticket.idTicket = incidencia.idTicket " +
         "INNER JOIN tiempo_incidencia ON incidencia.idIncidencia = tiempo_incidencia.idIncidencia " +
         "WHERE " +
         "incidencia.idIncidencia = ? LIMIT 1", [req.body.idIncidencia],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   searchTicketEmail: function(req, res) {
      Ticket.query(
         "SELECT " +
         "ticket.codigo, " +
         "ticket.asunto, " +
         "ticket.fechaApertura, " +
         "ticket.fechaCierre, " +
         "ticket.tiempo_total, " +
         "ticket.estado, " +
         "ticket.prioridad, " +
         '(SELECT GROUP_CONCAT((SELECT usuario.nombre FROM usuario WHERE usuario.idUsuario = usuario_ticket.idUsuario) SEPARATOR ", ") FROM usuario_ticket WHERE usuario_ticket.idTicket = ticket.idTicket) AS staff, ' +
         'CONCAT(producto.marca,",",producto.modelo, "," , producto_ticket.version, "," , producto_ticket.comentario) AS "producto" ' +
         "FROM " +
         "ticket " +
         "INNER JOIN producto_ticket ON ticket.idTicket = producto_ticket.idTicket " +
         "INNER JOIN producto ON producto_ticket.idProducto = producto.idProducto " +
         "WHERE  " +
         "ticket.idTicket = ?", [req.body.idTicket],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   },

   sendEmailIncidencia: function(req, res) {

      var fechaAperturaN = sails.moment(new Date(req.body.datosEmail.fechaApertura)).format("YYYY-MM-DD LTS");
      var fechaInicioN = sails.moment(new Date(req.body.datosEmail.fechaInicio)).format("YYYY-MM-DD LTS");

      var producto = req.body.datosEmail.producto;
      var productoSeparado = producto.split(",");

      res.render(
         __dirname + "/email/IncidenciaTicket/html.ejs", {
            Ticket: req.body.datosEmail.codigo,
            Fecha: fechaAperturaN.toString(),
            Responsables: req.body.datosEmail.staff,

            Estado: req.body.datosEmail.estado,
            Priodidad: req.body.datosEmail.prioridad,
            InicioIncidencia: fechaInicioN.toString(),
            ResponsableIncidencia: req.body.datosEmail.cliente_usuario,
            Marca: productoSeparado[0],
            Modelo: productoSeparado[1]
         },
         function(err, html) {
            if (err) {
               console.log(err);
               res.send(err);
            } else {
               ServicioEmail.correo
                  .send({
                     to: req.body.destinatariosEmail.correos,
                     subject: "[INNOVACLOUD] INCIDENCIA DEL TICKET SOPORTE TÉCNICO | N° " +
                        req.body.datosEmail.codigo,
                     html: html
                  })
                  .then(res.send(201, "Enviado"))
                  .catch(res.negotiate);
            }
         }
      );
   },

   sendEmailTicket: function(req, res) {

      var fechaApertura = sails.moment(new Date(req.body.datosEmail.fechaApertura)).format("YYYY-MM-DD LTS");
      var fechaCierre = sails.moment(new Date(req.body.datosEmail.fechaCierre)).format("YYYY-MM-DD LTS");
      var fechaActual = sails.moment(new Date()).format("YYYY-MM-DD LTS");

      var producto = req.body.datosEmail.producto;
      var productoSeparado = producto.split(",");

      res.render(
         __dirname + "/email/FinTicket/html.ejs", {
            Ticket: req.body.datosEmail.codigo,
            Asunto: req.body.datosEmail.asunto,
            FechaApertura: fechaApertura.toString(),
            FechaCierre: fechaCierre.toString(),
            FechaActual: fechaActual.toString(),
            TiempoTotal: req.body.datosEmail.tiempo_total,
            Estado: req.body.datosEmail.estado,
            Priodidad: req.body.datosEmail.prioridad,
            Responsables: req.body.datosEmail.staff,
            Marca: productoSeparado[0],
            Modelo: productoSeparado[1],
            Version: productoSeparado[2],
            Comentario: productoSeparado[3]
         },
         function(err, html) {
            if (err) {
               console.log(err);
               res.send(err);
            } else {
               ServicioEmail.correo
                  .send({
                     to: req.body.destinatariosEmail.correos,
                     subject: "[INNOVACLOUD] FINALIZACIÓN DEL TICKET SOPORTE TÉCNICO | N° " +
                        req.body.datosEmail.codigo,
                     html: html
                  })
                  .then(res.send(201, "Enviado"))
                  .catch(res.negotiate);
            }
         }
      );
   },

   verifyUserEndIncidencia: function(req, res) {
      Incidencia.query(
         "SELECT incidencia.id_cliente_usuario FROM incidencia WHERE incidencia.id_cliente_usuario = ? AND incidencia.idIncidencia = ? LIMIT 1", [req.body.id_cliente_usuario, req.body.idIncidencia],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               if (data == '') {
                  return res.send(201, 'false');
               } else {
                  return res.send(201, data[0]);
               }

            }
         }
      );
   },

   incidenciasTicket: function(req, res) {
      var ticket = req.query.ticket;
      Incidencia.find({
            idTicket: "" + ticket + ""
         }, { sort: "createdAt ASC" })
         .populate("archivos")
         .populate("tiempo")
         .populate("idTicket")
         .exec(function(err, data) {
            res.send(201, data);
         });
   },

   updateDescription: function(req, res) {
      Incidencia.query(
         "UPDATE `incidencia` SET `descripcion`= ? WHERE (`idIncidencia`= ?)", [req.body.descripcion, req.body.idIncidencia],
         function(err, data) {
            if (err) {
               return res.send(err);
            } else {
               return res.send(201, data);
            }
         }
      );
   }
};