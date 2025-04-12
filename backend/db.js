const { Sequelize } = require("sequelize");

// Database connection
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

const connectToPostgres = async () => {
  try {
    await connection.authenticate();
    console.log("Connected to postgres successfully!");
  } catch (err) {
    console.log("Error connecting to postgres : ", err);
  }
};

// Sync models with the database
const syncDatabase = async () => {
  try {
    await connection.sync({ alter: true }); // Auto-updates schema if changed
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Error syncing database : ", error);
  }
};

module.exports = { connection, connectToPostgres, syncDatabase };