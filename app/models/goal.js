// on importe la connexion
const sequelize = require('./../database');
const Category = require('./category');
const {DataTypes, Model, Deferrable} = require('sequelize');

class Goal extends Model {};

Goal.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Type: habitude / routine / crédit / realisation / projet
        start: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        end: { 
            type: DataTypes.DATE,
            allowNull: true
        },
        //Organiser les objectifs par ordre de priorités
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'goal'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Goal.sync({ force: true });
//console.log("==> The table for the Goal model was just (re)created!");

module.exports = Goal;