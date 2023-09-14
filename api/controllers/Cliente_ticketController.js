module.exports = {

   saveClienteTicket: function(req, res) {

      Cliente_ticket.query('SELECT ' +
         'cliente_ticket.idClienteTicket AS "validacion" ' +
         'FROM ' +
         'cliente_ticket  ' +
         'INNER JOIN ticket ON cliente_ticket.idTicket = ticket.idTicket ' +
         'INNER JOIN cliente ON cliente_ticket.idCliente = cliente.idCliente ' +
         'WHERE ' +
         'cliente_ticket.idTicket = ? ' +
         'AND ' +
         'cliente_ticket.idCliente = ?', [req.body.idTicket, req.body.idCliente],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            } else {
               console.log(data);
               if (data == '') {
                  Cliente_ticket.create({ idCliente: req.body.idCliente, idTicket: req.body.idTicket }).exec(function(err, data) {
                     if (err) { return res.serverError(err); }

                     return res.send(201, data);
                  });

               } else {
                  return res.send(400, data);
               }
            }
         });

   },

   searchClienteTicket: function(req, res) {
      Cliente.query('SELECT cliente.idCliente, cliente.nombre FROM empresa INNER JOIN cliente ON empresa.idEmpresa = cliente.idEmpresa  WHERE  empresa.nombre = ?', [req.body.empresa], function(err, data) {
         if (err) { return res.serverError(err); }

         return res.send(201, data);
      });
   },

   searchEmailStartTicketCliente: function(req, res) {
      Cliente_ticket.query('SELECT ' +
         'ticket.idTicket, ' +
         'cliente.nombre, ' +
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
         'cliente.correo ' +
         'FROM ' +
         'cliente_ticket ' +
         'INNER JOIN ticket ON cliente_ticket.idTicket = ticket.idTicket ' +
         'INNER JOIN cliente ON cliente_ticket.idCliente = cliente.idCliente ' +
         'WHERE ' +
         'ticket.idTicket = ' + req.body.idTicket + '',
         function(err, data) {
            if (err) {
               console.log(err);
               return res.serverError(err);
            } else {
               return res.send(201, data);
            }
         });
   },

   sendEmailStartTicketCliente: function(req, res) {

      var fechaEnvio = sails.moment(req.body.datosEmail.fechaApertura).format('YYYY-MM-DD LTS');

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

         Fecha: fechaEnvio.toString(),

         Staff: '',
         Muestra: 'none'

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