const {Sequelize, Model} = require('sequelize');
const sequelize = require('./../db');

class Author extends Model{}
// const Author = database.define('author', {
Author.init({
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
    modelName: 'Author',
    timestamps: false,
})

// Author.hasMany(Author_List,{foreignKey:'author_id'})

module.exports = Author;