const { DataTypes } = require("sequelize");
const { connection } = require("../db"); // Import your Sequelize connection

const Product = connection.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    new_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    old_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    },
    isNewLaunch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Product", // Explicit table name
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = Product;