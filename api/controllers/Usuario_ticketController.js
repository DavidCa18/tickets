module.exports = {

   addUsers: function(req, res) {

      var idUsuario = '';

      Usuario.query('SELECT usuario.idUsuario FROM usuario WHERE usuario.correo = ?', [req.body.creador], function(err, data) {
         if (err) {
            return res.serverError(err);
         }

         idUsuario = data[0].idUsuario

         Usuario_ticket.query('SELECT IFNULL(usuario_ticket.idClienteTicket,"VACIO") AS "pertenecer" FROM usuario_ticket WHERE usuario_ticket.idUsuario = ? AND usuario_ticket.idTicket = ?', [idUsuario, req.body.idTicket], function(err, data) {
            if (err) {
               return res.serverError(err);
            }

            if (data == '') {
               Usuario_ticket.query('INSERT INTO `usuario_ticket` (`idUsuario`, `idTicket`) VALUES (?, ?)', [idUsuario, req.body.idTicket], function(err, data) {
                  if (err) {
                     return res.serverError(err);
                  }
                  return res.send(201, data);
               });

            } else {
               return res.send(200, 'Ya Pertenece al Ticket');
            }

         });

      });
   },

   guardarAsignacion: function(req, res) {
      var idQuerry = req.body.idQuerry;
      var idProductoTicket = req.body.idProductoTicket;
      Archivo.query(
         "INSERT INTO `usuario_ticket` (`idTicket`, `idUsuario`) VALUES " +
         idQuerry,
         function(err, result) {
            if (err) {
               return res.serverError(err);
            } else {
               return res.send(201, result);
            }
         }
      );
   },

   searchEmailStartTicketUsuario: function(req, res) {
      Cliente_ticket.query('SELECT ' +
         'ticket.idTicket, ' +
         'ticket.codigo, ' +
         'ticket.asunto, ' +
         'ticket.fechaApertura, ' +
         '(SELECT ' +
         'CONCAT(producto.marca,",",producto.modelo,",",producto_ticket.version,",",producto_ticket.comentario) ' +
         'FROM ' +
         'producto_ticket ' +
         'INNER JOIN producto ON producto_ticket.idProducto = producto.idProducto  ' +
         'INNER JOIN ticket ON producto_ticket.idTicket = ticket.idTicket ' +
         'WHERE ' +
         'ticket.idTicket = ' + req.body.idTicket + ' ' +
         'LIMIT 1) AS "producto", ' +
         'GROUP_CONCAT(usuario.correo) AS "correo", ' +
         'GROUP_CONCAT(usuario.nombre) AS "staff" ' +
         'FROM ' +
         'usuario_ticket ' +
         'INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario  ' +
         'INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket ' +
         'WHERE ' +
         'ticket.idTicket = ' + req.body.idTicket + ' ' +
         'LIMIT 1',
         function(err, data) {
            if (err) {
               console.log(err);
               return res.serverError(err);
            } else {
               return res.send(201, data);
            }

         });
   },

   sendEmailStartTicketUsuario: function(req, res) {

      var fechaAperturaN = sails.moment(new Date(req.body.datosEmail.fechaApertura)).format("YYYY-MM-DD LTS");

      var producto = req.body.datosEmail.producto;
      var productoSeparado = producto.split(",");

      res.render(__dirname + '/email/InicioTicket/html.ejs', {

         Persona: req.body.datosEmail.nombre,
         Ticket: req.body.datosEmail.codigo,
         Asunto: req.body.datosEmail.asunto,

         Marca: productoSeparado[0],
         Modelo: productoSeparado[1],
         Version: productoSeparado[2],
         Comentario: productoSeparado[3],

         Fecha: fechaAperturaN.toString(),

         Staff: req.body.datosEmail.staff,
         Muestra: 'block'

      }, function(err, html) {
         if (err) {
            console.log(err);
            res.send(err);
         } else {

         }
         ServicioEmail.correo.send({
            to: req.body.datosEmail.correo,
            subject: "[INNOVACLOUD] APERTURA DE TICKET SOPORTE TÉCNICO | N° " + req.body.datosEmail.codigo,
            html: html
         }).then(
            res.send(201, 'Enviado')
         ).catch(
            res.negotiate
         );
      });
   },
};