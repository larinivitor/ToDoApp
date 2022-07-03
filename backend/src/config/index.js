const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 3001,
  databaseURL:
    process.env.DATABASE_URI || "mongodb://localhost:27017/todo-mongodb",
  authSecret: process.env.AUTH_SECRET || "AUTH_SECRET_TEST",
};
