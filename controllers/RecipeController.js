const { Sequelize, QueryTypes } = require('sequelize')
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
    }
}

module.exports = RecipeController