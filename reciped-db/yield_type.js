const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');

// const Yield_Type = database.define('yield_type', {
class Yield_Type extends Model{}
Yield_Type.init({
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
},{
    sequelize,
    modelName:'Yield_Type',
    tableName:'Yield_Types',
    timestamps:false
})

// yield_type.hasMany(Recipe, {foreignKey:'yield_type_id'})
module.exports = Yield_Type;