const {Sequelize, Model} = require('sequelize');
const sequelize = require('./../db');

// const Author_List = require('./author-list');
const Ingredient_List = require('./ingredient_list');
const Yield_Type = require('./yield_type');
// const Yield_Type = require('./yield_type');

// const Recipe = database.define('recipe', {
class Recipe extends Model {}
Recipe.init({    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    instructions: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    yield_amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    yield_amount_offset: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    prep_time: {
        type: Sequelize.TIME,
        allowNull: true,
    },
    photo: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    yield_type_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Yield_Type,
        },
    }
},{
    sequelize,
    modelName: 'Recipe',
    createdAt:'cTime',
    updatedAt:'mTime',
    timestamps:true
})

// Recipe.hasMany(Ingredient_List,{foreignKey:'recipe_id'})
// Recipe.hasOne(Yield_Type,{foreignKey:'yield_type_id'})
// Recipe.hasOne(Author_List, {foreignKey:'recipe_id'})
module.exports = Recipe;