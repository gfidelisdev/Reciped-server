const Author_List = require("../reciped-db/author_list")
const AuthorController = require("./AuthorController")

const AuthorListController = {
    async getByParams(params){
        let authors_list = await Author_List.findAll({
            where: params
        })
        authors_list = authors_list.map(author_list=>author_list.dataValues)
        console.log("🚀 ~ file: AuthorListController.js ~ line 10 ~ getByParams ~ authors_list", authors_list)

        authors_list = await Promise.all(authors_list.map(async (author_list, index)=>{
            let author = await AuthorController.getByPk(author_list.author_id)
            if(author) {
                author_list.author = author
                return author_list
            }
        }))

        authors_list.forEach(async (author_list, index)=>{
            if (!author_list) authors_list.splice(index,1)
        })
        return authors_list

    }
}

module.exports = AuthorListController