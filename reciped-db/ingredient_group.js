const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');

class Ingredient_Group extends Model{}
Ingredient_Group.init({
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
    modelName: 'Ingredient_Group',
    timestamps: false,
})
// Ingredient_Group.hasMany(Ingredient_List, {foreignKey:'group_id'})
module.exports = Ingredient_Group;