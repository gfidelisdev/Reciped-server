const {Sequelize,Model} = require('sequelize');
const sequelize = require('../db');

class Unit extends Model{}
Unit.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name_abbrev: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    plural: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    plural_abbrev: {
        type: Sequelize.STRING,
        allowNull: true,
    },
},{
    sequelize,
    modelName: 'Unit',
    tableName: 'units',
    timestamps: false    
})


module.exports = Unit;