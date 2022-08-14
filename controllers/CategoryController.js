const Category = require("../reciped-db/category");

const CategoryController = {
    async getByPk(id){
        console.log("🚀 ~ file: CategoryController.js ~ line 6 ~ getByPk ~ id", id)
        let category = await Category.findByPk(id)
        console.log("🚀 ~ file: CategoryController.js ~ line 6 ~ getByPk ~ category", category)
        return category?.dataValues
    }
}

module.exports = CategoryController