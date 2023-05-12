const mysql = require("mysql");
const env_vars = process.env;

const connection = mysql.createConnection({
  host: env_vars.DB_HOST,
  user: env_vars.DB_USER,
  password: env_vars.DB_PASS,
  database: env_vars.DB_NAME,
  port: env_vars.DB_PORT,
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Conectado com o BD => ${env_vars.DB_NAME}\n\n\n`);
});

module.exports = connection;
