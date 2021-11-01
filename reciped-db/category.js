const {Sequelize, Model} = require('sequelize');
const sequelize = require('./../db');
// const Category_List = require('./category_list');

class Category extends Model{}
// const Category = database.define('category', {
Category.init({
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
    parent_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Category,
        }
    },
},{
    sequelize,
    modelName: 'Category',
    timestamps: false,
})

// Category.belongsTo(Category, {foreignKey:'parent_id'})
// Category.hasMany(Category, {foreignKey:'parent_id'})
// Category.hasMany(Category_List,{foreignKey:'category_id'})
module.exports = Category;