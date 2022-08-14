const Category = require("../reciped-db/category");

const CategoryController = {
    async getByPk(id){
        let category = await Category.findByPk(id)
        return category?.dataValues
    }
}

module.exports = CategoryController