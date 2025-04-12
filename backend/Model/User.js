const { DataTypes } = require("sequelize");
const { connection } = require("../db"); // Import our Sequelize connection
const Role = require("./Role");

const User = connection.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Ensures self-incrementing IDs
      primaryKey: true, // Sets this as the primary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      // Foreign key for Role
      type: DataTypes.INTEGER,
      allowNull: false, // Change to false if role is mandatory
      references: {
        model: Role,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Users",
  }
);

// Define the relationship
User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;