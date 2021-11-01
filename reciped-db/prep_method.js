const {Sequelize,Model} = require('sequelize');
const sequelize = require('./../db');

class Prep_Method extends Model{}
Prep_Method.init({
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
    modelName:'Prep_Method',
    timestamps:false
})

// Prep_Method.hasMany(Prep_Method_List, {foreignKey:'prep_method_id'})
module.exports = Prep_Method;