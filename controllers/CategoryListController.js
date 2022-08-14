const Category_List = require("../reciped-db/category_list")
const CategoryController = require("./CategoryController")

const CategoryListController = {
    async getByParams(params){
        let categories_list = await Category_List.findAll({
            where: params
        })
        categories_list = categories_list.map(category_list=>category_list.dataValues)

        categories_list = await Promise.all(categories_list.map(async (category_list, index)=>{
            let category = await CategoryController.getByPk(category_list.category_id)
            if(category) {
                category_list.category = category
                return category_list
            }
        }))

        categories_list.forEach(async (category_list, index)=>{
            if (!category_list) categories_list.splice(index,1)
        })
        return categories_list

    }
}

module.exports = CategoryListController