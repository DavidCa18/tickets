module.exports = {
  search: function(req, res) {
    Nivel.query(
      "SELECT nivel.idNivel AS 'value', nivel.descripcion AS 'text' FROM nivel",
      function(err, result) {
        if (err) {
          return res.serverError(err);
        }
        return res.send(result);
      }
    );
  }
};
