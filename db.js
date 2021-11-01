const {Sequelize, QueryTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './reciped.sqlite'
  })

module.exports = sequelize;