const {Sequelize, Model} = require('sequelize');
const sequelize = require('./../db');
const Ingredient = require('./ingredient');
const Ingredient_Group = require('./ingredient_group');
const Recipe = require('./recipe');
const Unit = require('./unit');

class Ingredient_List extends Model{}
// const Ingredient_List = database.define('ingredient_list', {
Ingredient_List.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    amount_offset: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    order_index: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    recipe_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Recipe,
        }
    },
    unit_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Unit,
        }
    },
    group_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Ingredient_Group,
        }
    },
    ingredient_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Ingredient,
        }
    },
    substitute_for: {
        type: Sequelize.INTEGER,
        references: {
            model: Ingredient,
        }
    }
},{
    sequelize,
    modelName: 'Ingredient_List',
    tableName:'Ingredient_List',
    timestamps: false
})
// Ingredient_List.hasOne(Ingredient, {foreignKey: 'ingredient_id'})
// Ingredient_List.belongsTo(Recipe, {foreignKey:'recipe_id'})
// Ingredient_List.hasOne(Unit, {foreignKey: 'unit_id'})
// Ingredient_List.hasOne(Ingredient, {foreignKey: 'substitute_for'})
// Ingredient_List.belongsTo(Ingredient_Group, {foreignKey:'group_id'})
module.exports = Ingredient_List;