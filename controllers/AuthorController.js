const Author = require("../reciped-db/author");

const AuthorController = {
    async getByPk(id){
        let author = await Author.findByPk(id)
        return author?.dataValues
    }
}

module.exports = AuthorController