const Ingredient_List = require("../reciped-db/ingredient_list")
const IngredientController = require("./IngredientController")

const IngredientListController = {
    async getByParams(params){
        let ingredients_list = await Ingredient_List.findAll({
            where: params
        })
        ingredients_list = ingredients_list.map(ingredient_list => ingredient_list.dataValues)
        ingredients_list = await Promise.all(ingredients_list.map(async (ingredient_list)=>{
            let ingredient = await IngredientController.getByPk(ingredient_list.ingredient_id)
            console.log("🚀 ~ file: IngredientListController.js ~ line 12 ~ ingredients_list=awaitPromise.all ~ ingredient", ingredient)
            ingredient_list.ingredient = ingredient
            return ingredient_list
        }))

        return ingredients_list
    }
}

module.exports = IngredientListController