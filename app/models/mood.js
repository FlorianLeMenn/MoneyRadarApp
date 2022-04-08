// on importe la connexion
const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Mood extends Model {};

Mood.init({
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: false,
        tableName: 'mood'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
// Mood.sync({ force: true });
// console.log("==> The table for the Mood model was just (re)created!");

module.exports = Mood;