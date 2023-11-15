const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "torder_test_review",
  password: "jhsong1376!",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getUsers = async () => {
  const promisePool = pool.promise();
  const [rows] = await promisePool.query(`
  SELECT *
  FROM menu
  INNER JOIN category ON menu.category_idx = category.category_idx;
`);
  console.log(rows);
  return rows;
};

module.exports = {
  getUsers,
};
