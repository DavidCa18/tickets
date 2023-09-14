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