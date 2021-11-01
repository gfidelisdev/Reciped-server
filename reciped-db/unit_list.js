const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');
const Ingredient = require('./ingredient');
const Unit = require('./unit');
class Unit_List extends Model{}
Unit_List.init({
    ingredient_id: {
        type: Sequelize.INTEGER,
        references: {
            model:Ingredient,
        },
        primaryKey: true
    },
    unit_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Unit,
        },
        primaryKey: true
    },
},{
    sequelize,
    modelName:'Unit_List',
    tableName:'Unit_List',
    timestamps: false,
})
// Unit_List.belongsTo(Ingredient, {foreignKey: {name:'ingredient_id',allowNull:false}})
// Unit_List.belongsTo(Unit, {foreignKey:{name:'unit_id',allowNull:false}})
module.exports = Unit_List;