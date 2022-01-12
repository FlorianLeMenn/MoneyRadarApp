// on importe la connexion
const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Vocabulary extends Model {};

Vocabulary.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: false,
        tableName: 'vocabulary'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Category.sync({ force: true });
//console.log("==> The table for the Category model was just (re)created!");

module.exports = Vocabulary;