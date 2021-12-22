const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class List extends Model {}

List.init(
  {
    title: DataTypes.TEXT,
    order: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "list",
  }
);

module.exports = List;