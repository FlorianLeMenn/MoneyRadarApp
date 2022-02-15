const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://moneyapp:moneyapp@localhost:5432/moneyapp', {
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
