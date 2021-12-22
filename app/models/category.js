// on importe la connexion
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');

class Category extends Model {};

Category.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'category'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Category.sync({ force: true });
//console.log("==> The table for the Category model was just (re)created!");

module.exports = Category;