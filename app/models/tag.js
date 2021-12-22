
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {};

Tag.init({
  name: DataTypes.TEXT,
  color: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "tag"
});

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Tag.sync({ force: true });
//console.log("==> The table for the Tag model was just (re)created!");

module.exports = Tag;