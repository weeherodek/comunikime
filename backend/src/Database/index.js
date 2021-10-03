const { Pool } = require("pg");

let config;

if (process.env.NODE_ENV == "production") {
  config = {
    connectionString: process.env.DB_URI,
    ssl: { rejectUnauthorized: false },
  };
} else {
  config = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "admin",
    port: 5432,
  };
}

const pool = new Pool(config);

pool
  .connect()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error DB Connection");
    console.log(err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
