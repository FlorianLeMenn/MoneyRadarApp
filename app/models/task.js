const sequelize = require('./../database');
const Goal = require('./goal');
const {DataTypes, Model, Deferrable} = require('sequelize');


class Task extends Model {
}

Task.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        position:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'task'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Task.sync({ alter: true });
//console.log("==> The table for the Task model was just (re)created!");

module.exports = Task;