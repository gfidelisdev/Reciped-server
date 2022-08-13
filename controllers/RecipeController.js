const { Sequelize, QueryTypes } = require('sequelize')
const Ingredient = require('../reciped-db/ingredient')
const Ingredient_List = require('../reciped-db/ingredient_list')
const db = require('./../db')
const Recipe = require('./../reciped-db/recipe')
const RecipeController = {
    async get(id){
        let recipe = await db
            .query(`Select  r.*, 
                            c.id as category_id, c.name as category_name, 
                            a.id as author_id, a.name as author_name from recipes r
            inner join category_list cl
            on cl.category_id = c.id and cl.recipe_id=r.id
            inner JOIN  categories c
            INNER JOIN author_list al
            ON al.recipe_id=r.id AND al.author_id=a.id
            INNER JOIN authors a
            where r.id=${id}`)
        return recipe
    },

    async superGet(id){
        let recipe = await Recipe.findByPk(id)
        recipe = recipe.dataValues
        let ingredients_list = await Ingredient_List.findAll({
            where: {
                recipe_id: id
            }
        })
        // ingredients_list = ingredients_list.dataValues
        ingredients_list = ingredients_list.map(ingredient_list => ingredient_list.dataValues)
        // ingredients_list = await ingredients_list.map(async ingredient_list=>{
        //     let ingredient = await Ingredient.findByPk(ingredient_list.ingredient_id)
        //     return {...ingredient_list, ...ingredient}
        // })

        ingredients_list = await Promise.all(ingredients_list.map(async (ingredient_list)=>{
            let ingredient = await Ingredient.findByPk(
                ingredient_list.ingredient_id,
                 {attributes:{
                    exclude: ['id']
                 }
                })
            ingredient = ingredient.dataValues
            return {...ingredient_list, ...ingredient}
        }))
        console.log("🚀 ~ file: RecipeController.js ~ line 30 ~ superGet ~ ingredients_list", await ingredients_list)
        return {}
    }
}

module.exports = RecipeController