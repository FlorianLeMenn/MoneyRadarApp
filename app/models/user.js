const {DataTypes, Model} = require('sequelize');

// on importe la connexion
const sequelize = require('./../database');

class User extends Model {
}

User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.JSON,
            default: {"roles":[{
                    "role_name":"ROLE_USER",
                }
            ]},
        },
        status: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        filename: DataTypes.STRING,
        activation_token: DataTypes.STRING,

    },
    {
        underscored: true,
        sequelize, //connexion a l'instance
        timestamps: true,
        tableName: 'user'
    }
);

//User.sync({ alter: true });
//console.log("==> The table for the User model was just (re)created!");

module.exports = User;