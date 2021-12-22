const sequelize = require('./../database');
const Category = require('./category');
const {DataTypes, Model, Deferrable} = require('sequelize');

class Habit extends Model {};

Habit.init({
        // lire / ranger /préparer
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Type: lecture / Ecriture / Alimentaire

        start: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        end: { 
            type: DataTypes.DATE,
            allowNull: true
        },
        //Habitude positive / neutre / negative -1 / 0 / 1  
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        //Objectif récurrente ex: faire du sport
        recurrent:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        //permet de gérer les intervalle de temps : tous les 10 jours / 2 semaines / 3 mois /1 an
        intervall: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //granularité des dépenses récurrente jour/semaine/mois/année
        periodicity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'habit'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Habit.sync({ force: true });
//console.log("==> The table for the Habit model was just (re)created!");

module.exports = Habit;