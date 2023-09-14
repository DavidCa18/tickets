module.exports = {
   ultimoCodigo: function(req, res) {
      Archivo.query("SELECT Count(*) AS 'num' FROM ticket", function(
         err,
         result
      ) {
         if (err) {
            return res.serverError(err);
         }
         return res.send(200, result[0].num + 1);
      });
   },

   searchTicketCode: function(req, res) {
      Ticket.query(
         "SELECT ticket.idTicket, ticket.codigo FROM usuario_ticket INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario WHERE usuario.idUsuario = ? ", [req.body.idUsuario],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   ticketsCreados: function(req, res) {
      Ticket.query(
         "SELECT " +
         "ticket.idTicket, " +
         "ticket.codigo, " +
         "ticket.asunto, " +
         "ticket.prioridad, " +
         "ticket.fechaApertura, " +
         "ticket.fechaCierre, " +
         "ticket.costo, " +
         "ticket.estado, " +
         "ticket.creador, " +
         "ticket.revision_fisica, " +
         "ticket.revision_logica " +
         "FROM " +
         "ticket " +
         "WHERE " +
         "ticket.creador = '" +
         req.body.creador +
         "' " +
         "AND  " +
         "ticket.estado = '" +
         req.body.estado +
         "' " +
         "ORDER BY " +
         "ticket.fechaApertura DESC",
         function(err, data) {
            if (err) {
               console.log(err);
               res.send(500, err);
            } else {
               res.send(201, data);
            }
         }
      );
   },

   ticketsAsignados: function(req, res) {
      Ticket.query(
         "SELECT " +
         "ticket.idTicket, " +
         "ticket.codigo, " +
         "ticket.asunto, " +
         "ticket.prioridad, " +
         "ticket.fechaApertura, " +
         "ticket.fechaCierre, " +
         "ticket.costo, " +
         "ticket.estado, " +
         "ticket.creador, " +
         "ticket.revision_fisica, " +
         "ticket.revision_logica " +
         "FROM " +
         "usuario_ticket " +
         "INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario.nombre = '" +
         req.body.correo +
         "' " +
         "AND  " +
         "ticket.estado = '" +
         req.body.estado +
         "' " +
         "ORDER BY " +
         "ticket.fechaApertura DESC",
         function(err, data) {
            if (err) {
               console.log(err);
               res.send(500, err);
            } else {
               res.send(201, data);
            }
         }
      );
   },
   ticketsParams: function(req, res) {
      if (req.body.consulta != "") {
         Ticket.query(
            "SELECT " +
            "ticket.idTicket, " +
            "ticket.codigo, " +
            "ticket.asunto, " +
            "ticket.prioridad, " +
            "ticket.estado, " +
            "ticket.fechaApertura, " +
            "ticket.fechaCierre, " +
            "ticket.tiempo_total, " +
            //"(SELECT TIMEDIFF(ticket.fechaCierre,ticket.fechaApertura)) AS 'tiempo_total', " +
            "(SELECT GROUP_CONCAT( ( SELECT cliente.nombre FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente ) SEPARATOR ',' )  FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket ) AS 'nombreCliente', " +
            "CONCAT(producto.marca,' ', " +
            "producto.modelo,' ', " +
            "producto_ticket.version) AS 'nombreProducto', " +
            "ticket.creador, " +
            "producto.marca, " +
            "producto.modelo, " +
            "producto_ticket.version, " +
            "producto_ticket.comentario " +
            "FROM " +
            "producto_ticket " +
            "INNER JOIN ticket ON producto_ticket.idTicket = ticket.idTicket " +
            "INNER JOIN producto ON producto_ticket.idProducto = producto.idProducto " +
            "WHERE " +
            req.body.consulta +
            " ORDER BY " +
            " ticket.codigo DESC",
            function(err, data) {
               if (err) {
                  console.log(err);
                  res.send(500, err);
               } else {
                  res.send(201, data);
               }
            }
         );
      } else {
         Ticket.query(
            "SELECT " +
            "ticket.idTicket, " +
            "ticket.codigo, " +
            "ticket.asunto, " +
            "ticket.prioridad, " +
            "ticket.estado, " +
            "ticket.fechaApertura, " +
            "ticket.fechaCierre, " +
            "ticket.tiempo_total, " +
            "(SELECT GROUP_CONCAT( ( SELECT cliente.nombre FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente ) SEPARATOR ',' )  FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket ) AS 'nombreCliente', " +
            "CONCAT(producto.marca,' ', " +
            "producto.modelo,' ', " +
            "producto_ticket.version) AS 'nombreProducto', " +
            "ticket.creador, " +
            "producto.marca, " +
            "producto.modelo, " +
            "producto_ticket.version, " +
            "producto_ticket.comentario " +
            "FROM " +
            "producto_ticket " +
            "INNER JOIN ticket ON producto_ticket.idTicket = ticket.idTicket " +
            "INNER JOIN producto ON producto_ticket.idProducto = producto.idProducto " +
            "ORDER BY " +
            "ticket.codigo DESC",
            function(err, data) {
               if (err) {
                  console.log(err);
                  res.send(500, err);
               } else {
                  res.send(201, data);
               }
            }
         );
      }
   },

   endTicket: function(req, res) {
      Ticket.query(
         "UPDATE `tickets`.`ticket` SET `estado` = '" +
         req.body.estado +
         "', `fechaCierre` = '" +
         req.body.fechaCierre +
         "' WHERE `idTicket` = " +
         req.body.ticket +
         "",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   updateTime: function(req, res) {
      var tiempoTotal = "";

      Ticket.query(
         'SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(tiempo_incidencia.tiempo))) AS "tiempoTotal" FROM ticket INNER JOIN incidencia ON ticket.idTicket = incidencia.idTicket INNER JOIN tiempo_incidencia ON incidencia.idIncidencia = tiempo_incidencia.idIncidencia WHERE ticket.idTicket = ?', [req.body.idTicket],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            tiempoTotal = data[0].tiempoTotal;
            Ticket.query(
               "UPDATE `ticket` SET `tiempo_total`= ? WHERE (`idTicket`= ?)", [tiempoTotal, req.body.idTicket],
               function(err, data) {
                  if (err) {
                     return res.serverError(err);
                  }

                  return res.send(201, data);
               }
            );
         }
      );
   },

   searchTicketQuery: function(req, res) {
      Ticket.findOne({ idTicket: req.body.idTicket }).exec(function(err, data) {
         if (err) {
            console.log(err);
            return res.send(err);
         }
         return res.send(201, data);
      });
   },

   searchIncidenciaQuery: function(req, res) {
      Incidencia.find({ idTicket: req.body.idTicket })
         .populate("archivos")
         .populate("tiempo")
         .exec(function(err, data) {
            if (err) {
               console.log(err);
               return res.send(err);
            }
            return res.send(201, data);
         });
   },

   searchProductoQuery: function(req, res) {
      Ticket.query(
         "SELECT producto.marca, producto.modelo, producto_ticket.version FROM producto_ticket " +
         "INNER JOIN ticket ON producto_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN producto ON producto_ticket.idProducto = producto.idProducto " +
         "WHERE ticket.idTicket = ?", [req.body.idTicket],
         function(err, data) {
            if (err) {
               console.log(err);
               return res.send(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchEmpresaClienteStaffQuery: function(req, res) {
      Ticket.query(
         "SELECT (SELECT DISTINCT(SELECT empresa.nombre FROM empresa INNER JOIN cliente ON empresa.idEmpresa = cliente.idEmpresa WHERE cliente.idCliente = cliente_ticket.idCliente LIMIT 1) FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket) AS empresa, " +
         '(SELECT GROUP_CONCAT((SELECT cliente.nombre FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente) SEPARATOR ", ") FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket ) AS clientes, ' +
         '(SELECT GROUP_CONCAT((SELECT usuario.nombre FROM usuario WHERE usuario.idUsuario = usuario_ticket.idUsuario) SEPARATOR ", ") FROM usuario_ticket WHERE usuario_ticket.idTicket = ticket.idTicket) AS staff ' +
         "FROM " +
         "ticket " +
         "WHERE " +
         "ticket.idTicket = ?", [req.body.idTicket],
         function(err, data) {
            if (err) {
               console.log(err);
               return res.send(err);
            }
            return res.send(201, data);
         }
      );
   },

   createTicketRevision: function(req, res) {
      if (req.body.seleccion == 1) {
         Ticket.query(
            "UPDATE `ticket` SET `revision_fisica`= UPPER( ? ) WHERE (`idTicket`= ?)", [req.body.revisionFisica, req.body.idTicket],
            function(err, data) {
               if (err) {
                  return res.serverError(err);
               }
               return res.send(201, data);
            }
         );
      } else if (req.body.seleccion == 2) {
         Ticket.query(
            "UPDATE `ticket` SET `revision_logica`= UPPER( ? ) WHERE (`idTicket`= ?)", [req.body.revisionLogica, req.body.idTicket],
            function(err, data) {
               if (err) {
                  return res.serverError(err);
               }
               return res.send(201, data);
            }
         );
      }
   },

   verifyAssignedStaffs: function(req, res) {
      Archivo.query(
         "SELECT COUNT(*) AS numero, usuario.nombre FROM usuario_ticket " +
         "INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario " +
         "WHERE ticket.estado = 'VIGENTE' GROUP BY usuario.correo " +
         "ORDER BY COUNT(*) DESC",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   reportTicketMonth: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket.idTicket, " +
         "ticket.creador, " +
         "ticket.codigo, " +
         "ticket.asunto, " +
         "ticket.fechaApertura, " +
         "ticket.fechaCierre, " +
         "ticket.estado, " +
         "ticket.tiempo_total, " +
         "(SELECT GROUP_CONCAT(empresa.nombre) FROM empresa INNER JOIN cliente ON empresa.idEmpresa = cliente.idEmpresa WHERE empresa.idEmpresa = (SELECT GROUP_CONCAT((SELECT cliente.idEmpresa FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente) SEPARATOR ',') FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket)) AS 'empresa', " +
         "(SELECT GROUP_CONCAT((SELECT cliente.nombre FROM cliente WHERE cliente.idCliente = cliente_ticket.idCliente) SEPARATOR ', ') FROM cliente_ticket WHERE cliente_ticket.idTicket = ticket.idTicket) AS 'contacto' " +
         "FROM " +
         "ticket WHERE " +
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

   reportTicketMonthSummary: function(req, res) {
      Archivo.query(
         "SELECT " +
         "COUNT( ticket.tiempo_total ) AS 'numeroTickets', " +
         "SEC_TO_TIME(SUM(TIME_TO_SEC(ticket.tiempo_total))) AS 'tiempoTotal' " +
         "FROM " +
         "ticket " +
         "WHERE  " +
         req.body.sql +
         " ",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchNumeroTicketsInicio: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket.estado, " +
         "COUNT( ticket.estado ) AS 'numero', " +
         "SUM( ticket.costo ) AS 'costo' " +
         "FROM " +
         "ticket " +
         "" +
         req.body.anio +
         " " +
         "GROUP BY " +
         "ticket.estado " +
         "ORDER BY " +
         "ticket.estado DESC",
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
         "ticket.idTicket, " +
         "ticket.codigo, " +
         "ticket.asunto, " +
         "ticket.fechaApertura, " +
         "ticket.estado, " +
         "usuario.idUsuario " +
         "FROM " +
         "usuario_ticket " +
         "INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario.idUsuario = ? " +
         "AND ticket.estado = ? ", [req.body.usuario, req.body.estado],
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
         "ticket.estado, " +
         "COUNT( ticket.estado ) AS 'numero', " +
         "DATE_FORMAT( ticket.fechaApertura, '%M' ) AS 'mes', " +
         "MONTH ( ticket.fechaApertura ) AS 'mesNumero' " +
         "FROM " +
         "ticket " +
         "WHERE " +
         "YEAR ( ticket.fechaApertura ) = '" +
         req.body.anio +
         "' " +
         "AND ticket.estado = '" +
         req.body.estado +
         "' " +
         "GROUP BY " +
         "ticket.estado, " +
         "MONTH ( ticket.fechaApertura ) " +
         "ORDER BY " +
         "MONTH ( ticket.fechaApertura )",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchListaTicketsUsuarios: function(req, res) {
      Archivo.query(
         "SELECT " +
         "usuario.nombre, " +
         "ticket.prioridad, " +
         "ticket.estado, " +
         "COUNT(ticket.estado) AS 'numero' " +
         "FROM " +
         "usuario_ticket " +
         "INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "ticket.estado = '" +
         req.body.estado +
         "' " +
         "GROUP BY " +
         "ticket.estado, " +
         "ticket.prioridad " +
         "ORDER BY " +
         "usuario.nombre,ticket.estado DESC",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   searchListaTicketsEstadoPorUsuarios: function(req, res) {
      Archivo.query(
         "SELECT " +
         "ticket.estado, " +
         "COUNT( ticket.estado ) AS 'numero' " +
         "FROM " +
         "usuario_ticket " +
         "INNER JOIN ticket ON usuario_ticket.idTicket = ticket.idTicket " +
         "INNER JOIN usuario ON usuario_ticket.idUsuario = usuario.idUsuario " +
         "WHERE " +
         "usuario.idUsuario = " +
         req.body.idUsuario +
         " " +
         "GROUP BY " +
         "ticket.estado " +
         "ORDER BY " +
         "ticket.estado DESC",
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   },

   saveCostoTotalTickets: function(req, res) {
      Archivo.query(
         "UPDATE `tickets`.`ticket` SET `costo` = ?, `estado` = UPPER( ? ) WHERE `idTicket` = ? ", [req.body.costo, req.body.estado, req.body.idTicket],
         function(err, data) {
            if (err) {
               return res.serverError(err);
            }
            return res.send(201, data);
         }
      );
   }
};