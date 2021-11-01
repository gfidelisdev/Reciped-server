const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');
const Ingredient_List = require('./ingredient_list');
const Prep_Method = require('./prep_method');

class Prep_Method_List extends Model{}
Prep_Method_List.init({
    ingredient_list_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Ingredient_List,
        },
        primaryKey: true
    },
    prep_method_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Prep_Method,
        },
        primaryKey: true
    },
    order_index: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
},{
    sequelize,
    modelName:'Prep_Method_List',
    tableName:'Prep_Method_List',
    timestamps: false,
})
// Prep_Method_List.belongsTo(Prep_Method, {foreignKey: {name:'prep_method_id',allowNull:false}})
// Prep_Method_List.belongsTo(Ingredient_List, {foreignKey:{name:'ingredient_list_id',allowNull:false}})
module.exports = Prep_Method_List;