const { Sequelize, QueryTypes } = require('sequelize')
const Category = require('../reciped-db/category')
const Category_List = require('../reciped-db/category_list')
const Ingredient = require('../reciped-db/ingredient')
const Ingredient_List = require('../reciped-db/ingredient_list')
const db = require('./../db')
const Recipe = require('./../reciped-db/recipe')
const IngredientListController = require('./IngredientListController')
const CategoryListController = require('./CategoryListController')
const sequelize = require('sequelize')
const AuthorListController = require('./AuthorListController')

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
        return await this.superGet(id)
    },

    async featured(limit){
        let recipes = await Recipe.findAll({
            order: sequelize.random(),
            limit
        })
        recipes = recipes.map(recipe=>recipe.dataValues)
    },

    async getRelations(recipe){
        let ingredients_list = await IngredientListController.getByParams({recipe_id:recipe.id})
        let categories_list = await CategoryListController.getByParams({recipe_id:recipe.id})
        let authors_list = await AuthorListController.getByParams({recipe_id:recipe.id})
        recipe.categories_list = categories_list
        recipe.ingredients_list = ingredients_list
        recipe.authors_list = authors_list
        return recipe
    },
    async superGet(id){
        let recipe = await Recipe.findByPk(id)
        recipe = recipe.dataValues
        // let ingredients_list = await IngredientListController.getByParams({recipe_id:id})
        // let categories_list = await CategoryListController.getByParams({recipe_id:id})
        // recipe.categories_list = categories_list
        // recipe.ingredients_list = ingredients_list
        // return recipe
        recipe = await this.getRelations(recipe)
        return recipe
        
    }
}

module.exports = RecipeController