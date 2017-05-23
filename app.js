const express = require('express');
const app = express();
const categoriesController = require('./controllers').categories;
const attributesController = require('./controllers').attributes;
const attributeCategoryController = require('./controllers').attributeCategory;
const goodsController = require('./controllers').goods;
const propertyGoodController = require('./controllers').propertiesGood;
const usersController = require('./controllers').users;
const turnoverGoodsController = require('./controllers').turnoverGoods
const mainController = require('./controllers').main;
const jwt = require('jsonwebtoken');
const jwtConfig = require(`./config/config.json`).jwtConfig;
const appConfig = require(`./config/config.json`).appConfig;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/categories/:id', verificationAccess(categoriesController.getCategoryInfo, [0, 1]));
app.get('/categories', verificationAccess(categoriesController.getCategoriesList, [0, 1]));
app.post('/categories', verificationAccess(categoriesController.addCategory, [0, 1]));
app.post('/categories/:id', verificationAccess(categoriesController.updateCategory, [0, 1]));
app.delete('/categories/:id', verificationAccess(categoriesController.destroyCategory, [0, 1]));
app.post('/categories/:id/attributes', verificationAccess(attributeCategoryController.saveAttributesCategory, [0, 1]));
app.get('/categories/:id/goods', goodsController.getGoodsCategoryList);

app.get('/categoriesTree', categoriesController.getCategoryTree);
app.get('/createBase', mainController.createBase);

app.get('/attributes/:id', verificationAccess(attributesController.getAttributeInfo, [0, 1]));
app.get('/attributes', verificationAccess(attributesController.getAttributesList, [0, 1]));
app.post('/attributes', verificationAccess(attributesController.addAttribute, [0, 1]));
app.post('/attributes/:id', verificationAccess(attributesController.updateAttribute, [0, 1]));
app.delete('/attributes/:id', verificationAccess(attributesController.destroyAttribute, [0, 1]));

app.get('/goods/:id', goodsController.getGoodInfo);
app.get('/goods', goodsController.getGoodsList);
app.post('/goods', verificationAccess(goodsController.addGood, [0, 1]));
app.post('/goods/:id', verificationAccess(goodsController.updateGood, [0, 1]));
app.delete('/goods/:id', verificationAccess(goodsController.destroyGood, [0, 1]));
app.post('/goods/:id/properties', verificationAccess(propertyGoodController.savePropertyGood, [0, 1]));

app.post('/login', usersController.loginUser);
app.get('/users/:id', verificationAccess(usersController.getUserInfo, [0]));
app.get('/users', verificationAccess(usersController.getUsersList, [0]));
app.post('/users', verificationAccess(usersController.addUser, [0]));
app.post('/users/:id', verificationAccess(usersController.updateUser, [0]));
app.delete('/users/:id', verificationAccess(usersController.destroyUser, [0]));
app.post('/changePassword/:id', verificationAccess(usersController.changePassword, [0, 1, 2]))



app.post('/turnoverGoods', verificationAccess(turnoverGoodsController.addTurnoverGoods, [0, 1]));
app.get('/turnoverGoods/:id', verificationAccess(turnoverGoodsController.getTurnoverGoodById, [0, 1]));
app.post('/turnoverGoods/:id', verificationAccess(turnoverGoodsController.updateTurnoverGoods, [0, 1]));
app.delete('/turnoverGoods/:id', verificationAccess(turnoverGoodsController.destroyTurnoverGood, [0]));
app.post('/turnoverGoodsSearch', verificationAccess(turnoverGoodsController.findTurnoverGoods, [0, 1]));
app.post('/turnoverGoodsSearch/:id', verificationAccess(turnoverGoodsController.getTurnoverGoodById, [0, 1]));

app.get('/availabilityGoods', verificationAccess(turnoverGoodsController.getAvailabilityGoods, [0, 1]));

app.listen(appConfig.port);
console.log(`Приложение запущено! Смотрите на http://localhost:${appConfig.port}`);

function verificationAccess(requestFunction, roleIndexArray) {
    return function (req, res) {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ok: false, error: "Authorization required"});
        } else {
            try {

                let decoded = jwt.verify(token, jwtConfig.secretKey);
                if (~roleIndexArray.indexOf(decoded.role)) {
                    return requestFunction(req, res);
                }
                else
                    return res.status(401).json({ok: false, error: "Insufficient user rights"});
            } catch (error) {
                return res.status(401).json({ok: false, error: error.message});
            }
        }
    }
}
