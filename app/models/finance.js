// on importe la connexion
const sequelize = require('./../database');
const {DataTypes, Model, Deferrable} = require('sequelize');

class Finance extends Model {};

Finance.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //Type: dépense / gain / crédit /recette/ éparge /investissement
        cost: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        //dépenses récurrente ex: facture de téléphone, internet
        recurrent:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        //permet de gérer les interval de temps : tous les 10 jours / 2 semaines / 3 mois /1 an
        interval: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //granularité des dépenses récurrente jour/semaine/mois/année
        periodicity: {
            type: DataTypes.INTEGER,
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
        timestamps: true,
        tableName: 'finance'
    }
);

// Cela vérifie quel est l'état actuel de la table dans la BDD effectue les modifications nécessaires .
//Finance.sync({ force: true });
//console.log("==> The table for the Finance model was just (re)created!");


module.exports = Finance;