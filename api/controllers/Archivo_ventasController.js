module.exports = {
  guardarArchivo: function(req, res) {
    var modulo = req.body.idModulo;

    if (req.method === "GET")
      return res.json({ status: "Error al Subir Archivo - GET" });

    var incidenciaAsignada = 0;
    incidenciaAsignada = req.body.idIncidencia;

    console.log(modulo);

    req.file("archivo").upload(
      {
        dirname: require("path").resolve(
          sails.config.appPath,
          "assets/adjuntos"
        ),
        maxBytes: 999999999999999
      },
      function(err, uploads) {
        if (err) {
          return res.serverError(err);
        }
        if (uploads.length === 0) {
          return res.badRequest("No se Proceso el Archivo");
        }

        var query = "";
        for (var i = 0; i < uploads.length; i++) {
          var cadena = uploads[i].fd,
            separador = "\\",
            vectorCadenaSeparada = cadena.split(separador);

          var ruta = vectorCadenaSeparada[vectorCadenaSeparada.length - 1];

          query +=
            "('" +
            uploads[i].filename +
            "','/adjuntos/" +
            ruta +
            "','" +
            uploads[i].type +
            "','" +
            incidenciaAsignada +
            "'),";
        }

        Archivo.query(
          "INSERT INTO `archivo_ventas` (`nombre`, `ubicacion`, `tipo`, `idIncidenciaVenta`) VALUES " +
            query.substr(0, query.length - 1),
          function(err, result) {
            if (err) {
              return res.serverError(err);
            }
            return res.redirect("/" + modulo + "");
          }
        );
      }
    );
  }
};
