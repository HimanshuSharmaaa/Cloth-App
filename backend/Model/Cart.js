const { DataTypes } = require("sequelize");
const {connection} = require("../db"); // Import your Sequelize instance
const User = require("./User");
const Product = require("./Product");

const Cart = connection.define("Cart", {
    id: {
      type: DataTypes.UUID, // Unique ID
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product, 
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  },
  {
    tableName: "Cart", // Explicit table name
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Define the relationship
Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Cart;