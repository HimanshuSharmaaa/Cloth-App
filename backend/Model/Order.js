const { DataTypes } = require("sequelize");
const { connection } = require("../db"); // Your Sequelize instance
const User = require("./User");
const Product = require("./Product");

const Order = connection.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);

Order.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "CASCADE", // Optional: remove orders if user is deleted
});

Order.belongsTo(Product, {
  foreignKey: {
    name: "product_id",
    allowNull: false,
  },
  onDelete: "SET NULL", // Optional: handle product deletion
});

module.exports = Order;