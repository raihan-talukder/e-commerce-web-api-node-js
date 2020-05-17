require("dotenv").config();

module.exports = {
  PORT: process.env.SERVER_PORT,
  DB_CON: process.env.DB_CON_STRING
};