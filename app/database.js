const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    logging: true,
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
            return next()
          },
      },
    timezone: 'Europe/Paris',
});

module.exports = sequelize;
