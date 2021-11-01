const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');
const Author = require('./author');
const Recipe = require('./recipe');

class Author_List extends Model{}
Author_List.init({
    recipe_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Recipe,
        },
        primaryKey: true
    },
    author_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Author,
        },
        primaryKey: true
    },
},{
    sequelize,
    modelName:'Author_List',
    tableName:'author_list',
    timestamps: false,
})

Author_List.belongsTo(Author, {foreignKey:{name:'author_id',allowNull:false}})
Author_List.belongsTo(Recipe, {foreignKey:{name:'recipe_id',allowNull:false}})
module.exports = Author_List;