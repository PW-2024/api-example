// mais info: https://github.com/sidorares/node-mysql2#history-and-why-mysql2
const mysql = require("mysql2");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// criação de um conjunto de conexões à base de dados, que permite ter várias queries a ser executadas por diferentes utilizadores ao mesmo tempo.
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = pool.promise();
