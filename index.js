const configExpress = require("./config/configExpress");
const connection = require("./infra/connection");
const Tabelas = require("./infra/Tabelas");

connection.connect((error) => {
  if (error) {
    throw error;
  }

  Tabelas.init(connection);
  //não precisa do const (?)
  app = configExpress();

  app.listen(3000, () => console.log("Server is running in port 3000"));
});
