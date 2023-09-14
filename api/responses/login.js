module.exports = function login(inputs) {
   inputs = inputs || {};

   var req = this.req;
   var res = this.res;

   Usuario.attemptLogin({
         email: inputs.correo,
         password: inputs.password
      },
      function(err, user) {
         if (err) return res.negotiate(err);
         if (!user) {
            if (req.wantsJSON || !inputs.invalidRedirect) {
               return res.badRequest("Correo Electrónico y/o Contraseña Invalidas");
            }
            return res.send(inputs.invalidRedirect);
         }

         req.session.me = user[0];

         if (req.wantsJSON || !inputs.successRedirectAdmin) {
            if (user[0].rol == "USUARIO" && inputs.sistema == "tecnico") {
               return res.send(inputs.successRedirectAdmin);
            } else if (user[0].rol == "ADMINISTRADOR" && inputs.sistema == "tecnico") {
               return res.send(inputs.successRedirectSuperAdmin);
            } else if (user[0].rol == "ADMINISTRADOR" && inputs.sistema == "ventas") {
               return res.send(inputs.successRedirectSuperAdminVentas);
            } else if (user[0].rol == "USUARIO" && inputs.sistema == "ventas") {
               return res.send(inputs.successRedirectAdminVentas);
            } else {
               return res.send(inputs.invalidRedirect);
            }
         }
      }
   );
};