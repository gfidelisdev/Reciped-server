const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');
const Recipe = require('./recipe');
const Category = require('./category');

class Category_List extends Model{}
Category_List.init({
    recipe_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Recipe,
        },
        primaryKey: true
    },
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Category,
        },
        primaryKey: true
    },
},{
    sequelize,
    modelName:'Category_List',
    tableName:'Category_List',
    timestamps: false,
})
// Category_List.belongsTo(Category, {foreignKey: {name:'category_id',allowNull:false}})
// Category_List.belongsTo(Recipe, {foreignKey:{name:'recipe_id',allowNull:false}})
module.exports = Category_List;