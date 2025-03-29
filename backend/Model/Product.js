const { DataTypes } = require("sequelize");
const { connection } = require("../db"); // Import your Sequelize connection

const Product = connection.define("Product",{
    id: {
      type: DataTypes.UUID, // Universally Unique Identifier
      defaultValue: DataTypes.UUIDV4,
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
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Product", // Explicit table name
    // timestamps: false, // restrict the columns(createdAt,updatedAt)
  }
);

module.exports = Product;