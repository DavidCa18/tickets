var ServicioEmail = require("sails-service-mailer");

module.exports.correo = ServicioEmail("smtp", {
   from: "plataforma.tickets@gmail.com",
   provider: {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: "plataforma.tickets@gmail.com",
         pass: "Pwdadm$2012"
      },
      ignoreTLS: true,
      name: 'gmail',
      connectionTimeout: 200000000,
      greetingTimeout: 200000000,
      socketTimeout: 200000000,
      authMethod: "PLAIN"
   }
});

/* Prueba con otro proveedor
from: 'dcarrillo@sstecec.com',
provider: {
   host: '107.180.41.251',
   port: 465,
   secure: true,
   auth: {
      user: 'dcarrillo@sstecec.com',
      pass: 'Pwdadm$2012'
   },
   ignoreTLS: false,
   name: 'sstecec.com',
   connectionTimeout: 200000000,
   greetingTimeout: 200000000,
   socketTimeout: 200000000,
   authMethod: 'PLAIN'
}

 */