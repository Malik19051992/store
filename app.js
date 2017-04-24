const express = require('express');
const app = express();
const categoriesController = require('./controllers').categories;
const mainController = require('./controllers').main;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/categories/:id',categoriesController.categoryInfo);
app.get('/categories',categoriesController.categoryList);
app.get('/categoriesTree',categoriesController.categoryTree);
app.get('/createBase',mainController.createBase);





app.listen(8080);
console.log('Приложение запущено! Смотрите на http://localhost:8080');