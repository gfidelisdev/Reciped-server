const {Sequelize, Model }= require('sequelize');
const sequelize = require('./../db');

class Ingredient extends Model{}
// const Ingredient = database.define('ingredient', {
Ingredient.init({
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
    modelName: 'Ingredient',
    timestamps: false
})

// Ingredient_List.hasOne(Ingredient, {foreignKey: 'ingredient_id'})
// Ingredient_List.hasOne(Ingredient, {foreignKey: 'substitute_for'})
// Ingredient.belongsToMany(Ingredient_List, {foreignKey:'ingredient_id'})
module.exports = Ingredient;