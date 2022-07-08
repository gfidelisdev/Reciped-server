var express = require('express');
var cors = require('cors');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('./../db');
/**
 * Models import
 */
const Author = require("../reciped-db/author");
const Author_List = require("../reciped-db/author_list");
const Category = require("../reciped-db/category");
const Category_List = require("../reciped-db/category_list");
 const Ingredient = require("../reciped-db/ingredient");
 const Ingredient_Group = require("../reciped-db/ingredient_group");
 const Ingredient_List = require("../reciped-db/ingredient_list");
 const Prep_Method = require("../reciped-db/prep_method");
 const Prep_Method_List = require("../reciped-db/prep_method_list");
 const Recipe = require("../reciped-db/recipe");
 const Unit = require("../reciped-db/unit");
 const Unit_List = require("../reciped-db/unit_list");
 const Yield_Type = require('../reciped-db/yield_type');

function route(app){
    app.get('/teste',(req,res)=>{return res.send('teste')});
    app.get('/', (req, res) => res.send('Notes App'));

    /**
     * Bloco de listagem de dados de tabelas
     */
    app.get('/units', function(req, res) {
        Unit.findAll({
          order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC',]]})
          .then(unit => res.json(unit));
      });
    app.get('/ingredients', function(req, res) {
        Ingredient.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC',]]})
        .then(ingredients => res.json(ingredients));
    });
    app.get('/ingredient_groups', function(req, res) {
        Ingredient_Group.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC',]]})
        .then(ingredient_groups => res.json(ingredient_groups));
    });
    app.get('/prep_methods', function(req, res) {
        Prep_Method.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC',]]})
        .then(prep_methods => res.json(prep_methods));
    });
    app.get('/prep_method_list', function(req, res) {
        Prep_Method_List.findAll()
        .then(prep_method_list => res.json(prep_method_list));
    });
    app.get('/recipes', function(req, res) {
        Recipe.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('title')),'ASC',]],
        attributes:['id','title','instructions','yield_amount','prep_time',
                    'yield_type_id']
        })
        .then(recipes => res.json(recipes));
    });
    app.get('/authors', function(req,res){
        Author.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC']]})
        .then(authors=>res.json(authors))
    })  
    app.get('/yield_types', function(req,res){
        Yield_Type.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC']]})
        .then(yield_types=>res.json(yield_types))
    })  
    app.get('/categories', function(req,res){
        Category.findAll({
        order:[[Sequelize.fn('lower', Sequelize.col('name')),'ASC']]})
        .then(categories=>res.json(categories))
    })  

    /**
     * Fim do bloco de listagem de dados de tabelas
     */

    /**
     * Bloco de pesquisas de tabelas por id
     */
    app.get('/category/:id', function(req,res){
        Category.findByPk(req.params.id).then(category=>res.json(category))
    })
    app.get('/prep_method/:id', function(req,res){
        Prep_Method.findByPk(req.params.id).then(prep_method=>res.json(prep_method))
    })
    app.get('/unit/:id', function(req,res){
        Unit.findByPk(req.params.id).then(unit=>res.json(unit))
    })

    app.get('/ingredient_group/:id', function(req,res){
        Ingredient_Group.findByPk(req.params.id).then(ingredient_group=>res.json(ingredient_group))
    })

    app.get('/ingredient/:id', function(req,res){
        Ingredient.findByPk(req.params.id).then(ingredient=>res.json(ingredient))
    })

    /**
     * Fim do bloco de pesquisas de tabelas por id
     */

    /**
     * Bloco de pesquisa de registros relacionados
     */
    app.get('/ingredients/recipe/:id',function(req,res){
        sequelize.
        query(`select ingredients.* from ingredient_list left join
            ingredients on ingredient_list.ingredient_id=ingredients.id 
            where ingredient_list.recipe_id=${req.params.id}`, 
            {type: QueryTypes.SELECT})
        .then((i)=>res.json(i))
    })
    app.get('/ingredient_list/recipe/:id',function(req,res){
        sequelize.
        query(`select * from ingredient_list
        left outer join 
        (SELECT id as i_id,name as i_name from ingredients) i on ingredient_list.ingredient_id=i.i_id
        left outer join 
        (SELECT id as u_id, name as u_name from units) u on ingredient_list.unit_id=u.u_id
        left outer join 
        (SELECT id as g_id, name as g_name from ingredient_groups) g on ingredient_list.group_id=g.g_id
        left outer join
        (select prep_method_id as pm_id, ingredient_list_id as ild from prep_method_list) pml on pml.ild=ingredient_list.id
        left outer JOIN
        (select id as prm_id, name as prm_name FROM prep_methods) prm on prm.prm_id=pml.pm_id
        WHERE ingredient_list.recipe_id=${req.params.id} order by g_name`, 
            {type: QueryTypes.SELECT})
        .then((i)=>res.json(i))
        
        
    })
    app.get('/yield/recipe/:id',function(req,res){
        sequelize.
        query(`SELECT y.id,yield_amount, y.name from recipes r
            inner JOIN yield_types y
            on r.yield_type_id = y.id
            where r.id=${req.params.id}`, 
            {type: QueryTypes.SELECT})
        .then((i)=>res.json(i))
    })
    app.get('/recipes/author/:id', (req,res)=>{
        sequelize.
        query(`Select r.* from recipes r
            inner join author_list al
            on al.author_id = a.id and al.recipe_id=r.id
            inner join authors a
            where a.id=${req.params.id}`,
            {type: QueryTypes.SELECT})
        .then((r) => {
            res.json(r)
        }).catch((err) => {
            console.error(err)
        });

    })
    app.get('/author/recipe/:id', (req,res)=>{
        sequelize.
        query(`Select a.id, a.name from authors a
            inner join author_list al
            on al.author_id = a.id and al.recipe_id=r.id
            inner join recipes r
            where r.id=${req.params.id}`,
            {type: QueryTypes.SELECT})
        .then((r) => {
            res.json(r)
        }).catch((err) => {
            console.error(err)
        });
    })

    /**
     * Fim do bloco de pesquisa de registros relacionados
     */

    /**
     * Bloco de Criação de Novos Registros
     */
    app.post('/recipe/save', (req,res)=>{
        Recipe.create({
        title:req.body.title,
        yield_amount: req.body.yield_amount,
        yield_type_id: req.body.yield_type_id,
        instructions: req.body.instructions,
        prep_time: req.body.prep_time,
        })
        .then(recipe=>res.json(recipe))
        .catch(err=>res.json(err))
    })
    app.post('/ingredient_list/save', (req,res)=>{
        Ingredient_List.create({
        recipe_id:req.body.recipe_id,
        ingredient_id:req.body.ingredient_id,
        amount: req.body.amount,
        unit_id: req.body.unit_id,
        group_id: req.body.group_id,
        substitute_for: req.body.substitute_for
        })
        .then(il=>res.json(il))
        .catch(err=>res.json(err))
    })
    app.post('/author_list/save', (req,res)=>{
        Author_List.create({
        recipe_id:req.body.recipe_id,
        author_id:req.body.author_id,
        })
        .then(al=>res.json(al))
        .catch(err=>res.json(err))
    })
    app.post('/category_list/save', (req,res)=>{
        Category_List.create({
        recipe_id:req.body.recipe_id,
        category_id: req.body.category_id
        })
        .then(cl=>res.json(cl))
        .catch(err=>res.json(err))
    })
    app.post('/unit/save', (req,res)=>{
    console.log(req.body)
        Unit.create({
        name:req.body.name,
        name_abbrev:req.body.name_abbrev,
        plural:req.body.plural,
        plural_abbrev:req.body.plural_abbrev,
        })
        .then(unit=>res.json(unit))
        .catch(err=>res.json(err))
    })
    app.post('/category/save', (req,res)=>{
    console.log(req.body)
        Category.create({name:req.body.name, parent_id:req.body.parent_id})
        .then(category=>res.json(category))
        .catch(err=>res.json(err))
    })
    app.post('/ingredient/save', (req,res)=>{
        Ingredient.create({name:req.body.name})
        .then(ingredient=>res.json(ingredient))
        .catch(err=>res.json(err))
    })
    app.post('/ingredient_group/save', (req,res)=>{
        Ingredient_Group.create({name:req.body.name})
        .then(ingredient_group=>res.json(ingredient_group))
        .catch(err=>res.json(err))
    })
    app.post('/prep_method/save', (req,res)=>{
        Prep_Method.create({name:req.body.name})
        .then(prep_method=>res.json(prep_method))
        .catch(err=>res.json(err))
    })
    app.post('/prep_method_list/save', (req,res)=>{
        Prep_Method_List.create({
        ingredient_list_id:req.body.ingredient_list_id,
        prep_method_id:req.body.prep_method_id
        })
        .then(prep_method_list=>res.json(prep_method_list))
        .catch(err=>res.json(err))
    })
    app.post('/author/save', (req,res)=>{
        Author.create({name:req.body.name})
        .then(author=>res.json(author))
        .catch(err=>res.json(err))
    })

    app.post('/yield_type/save', (req,res)=>{
        Yield_Type.create({name:req.body.name})
        .then(yield_type=>res.json(yield_type))
        .catch(err=>res.json(err))
    })

    /**
     * Fim do bloco de criação de novos registros	
     */


    /**
     * Bloco de pesquisa textual
     */
    app.get('/authors/namelike/:value',(req,res)=>{
        sequelize.query(`Select * from authors
        where name like '%${req.params.value}%'`)  
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    })
    app.get('/recipes/namelike/:value',(req,res)=>{
        sequelize.query(`Select * from recipes
        where title like '%${req.params.value}%'`)  
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            });
    })
    /**
     * Fim do bloco de pesquisa textual
     */

    /**
     * Bloco de atualização de registros
     */
    app.put('/recipe/:id', (req,res)=>{
        Recipe.update({
            title:req.body.title,
            yield_amount: req.body.yield_amount,
            yield_type_id: req.body.yield_type_id,
            instructions: req.body.instructions,
            prep_time: req.body.prep_time
        },{
            where:{
                id:req.params.id
            }
        })
        .then(recipe=>res.json(recipe))
        .catch(err=>res.json(err))
    })

    app.put('/ingredient_list/:id', (req, res) => {
        console.log(req.body)
        console.log(req.params)
        Ingredient_List.update({
                amount: req.body.amount,
                unit_id: req.body.unit_id,
                group_id: req.body.group_id,
                substitute_for: req.body.substitute_for,
                ingredient_id: req.body.ingredient_id
            }, 
            {
                where: {
                    id: req.params.id
                }
            })
            .then(il => res.json(il))
            .catch(err => res.json(err))
    })

    app.put('/prep_method_list/:id', (req,res)=>{
        Prep_Method_List.update({
            prep_method_id:req.body.prep_method_id
        },{
            where:{
                ingredient_list_id:req.params.id
            }
        })
        .then(pml=>res.json(pml))
        .catch(err=>res.json(err))
    })
    /**
     * Fim do bloco de atualização de registros
     */

    /**
     * Bloco de exclusão de registros
     */
    app.delete('/recipe/:id', (req,res)=>{
        Recipe.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(recipe=>res.json(recipe))
        .catch(err=>res.json(err))
    })

    app.delete('/prep_method_list/:ingredient_list_id/:prep_method_id',(req,res)=>{
        Prep_Method_List.destroy({
            where:{
                ingredient_list_id:req.params.ingredient_list_id,
                prep_method_id:req.params.prep_method_id
                }
            })
            .then(pml=>res.json(pml))
            .catch(err=>res.json(err))
    })

    app.delete('ingredient_list/:id',(req,res)=>{
        Ingredient_List.destroy({
            where:{
                id:req.params.id
                }
            })
            .then(il=>res.json(il))
            .catch(err=>res.json(err))
    })
    /**
     * Fim do bloco de exclusão de registros
     */
}

module.exports = route