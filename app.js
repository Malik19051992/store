const express = require('express');
const app = express();
const CategoriesController = require('./controllers/CategoriesController')
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:123@localhost:5432/shopTest");
 


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('pages/index');

});

app.get('/categories', function (req, res) {
    const categoriesController = new CategoriesController();
    categoriesController.getAllCategories(db).then((result) => {
        res.json(result);
    }).catch((err)=>{

    });
});

app.get('/categories/:id', function (req, res) {
    const categoriesController = new CategoriesController();
    categoriesController.getCategoryById(+req.params.id,db).then((result) => {
        res.render('pages/categoriesDetails', {category:result});
    }).catch((err)=>{
        res.render('pages/errorPage', {err});
    });;
});


app.post('/categories', function (req, res) {
    const categoriesController = new CategoriesController();
    categoriesController.addNewCategory()
    res.render('pages/categories').catch((err)=>{
        res.render('pages/errorPage', {err});
    });;

});


app.get('/attributties', function (req, res) {
    res.render('pages/attributties').catch((err)=>{
        res.render('pages/errorPage', {err});
    });;

});


app.listen(8080);
console.log('Приложение запущено! Смотрите на http://localhost:8080');