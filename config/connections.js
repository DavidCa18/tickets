//Conexión Base de Datos
module.exports.connections = {
   MysqlConnection: {
      adapter: "sails-mysql",
      host: "localhost",
      port: "3306",
      user: "root",
      password: "root",
      database: "tickets"
   }
   /* MysqlConnection: {
      adapter: "sails-mysql",
      host: "107.180.41.251",
      port: "3306",
      user: "root_sstec",
      password: "12345",
      database: "tickets_sstec"
   } */
};