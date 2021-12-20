const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    logging: false, //masquer les requetes SQL
    define: {}
});

module.exports = sequelize;
