const { DataTypes } = require("sequelize");
const { connection } = require("../db");

const OfferList = connection.define("offerList", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  minCartVal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Optional: Default active to true
  },
}, {
  tableName: "OfferList",
  timestamps: true,
});

module.exports = OfferList;