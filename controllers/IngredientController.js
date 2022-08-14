const Ingredient = require("../reciped-db/ingredient")

const IngredientController = {
    async getByPk(id){
        let ingredient = await Ingredient.findByPk(id)
        return ingredient.dataValues
    }
}

module.exports = IngredientController