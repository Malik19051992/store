const express = require('express');
const app = express();
const categoriesController = require('./controllers').categories;
const attributesController = require('./controllers').attributes;
const attributeCategoryController = require('./controllers').attributeCategory;
const goodsController = require('./controllers').goods;
const propertyGoodController = require('./controllers').propertiesGood;
const mainController = require('./controllers').main;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/categories/:id',categoriesController.getCategoryInfo);
app.get('/categories',categoriesController.getCategoriesList);
app.post('/categories',categoriesController.addCategory);
app.post('/categories/:id',categoriesController.updateCategory);
app.delete('/categories/:id',categoriesController.destroyCategory);
app.post('/categories/:id/attributes',attributeCategoryController.saveAttributesCategory);
app.get('/categories/:id/goods',goodsController.getGoodsCategoryList);

app.get('/categoriesTree',categoriesController.getCategoryTree);
app.get('/createBase',mainController.createBase);

app.get('/attributes/:id',attributesController.getAttributeInfo);
app.get('/attributes',attributesController.getAttributesList);
app.post('/attributes',attributesController.addAttribute);
app.post('/attributes/:id',attributesController.updateAttribute);
app.delete('/attributes/:id',attributesController.destroyAttribute);

app.get('/goods/:id',goodsController.getGoodInfo);
app.get('/goods',goodsController.getGoodsList);
app.post('/goods',goodsController.addGood);
app.post('/goods/:id',goodsController.updateGood);
app.delete('/goods/:id',goodsController.destroyGood);
app.post('/goods/:id/properties',propertyGoodController.savePropertyGood);

app.listen(8080);
console.log('Приложение запущено! Смотрите на http://localhost:8080');