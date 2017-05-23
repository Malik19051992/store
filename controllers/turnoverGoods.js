const TurnoverGood = require('../models').TurnoverGood;
const Good = require('../models').Good;

module.exports = {

    getTurnoverGoodById(req, res){
        Good.findAll({
            attributes: ['id', 'name']
        })
            .then(goods => {
                return TurnoverGood.findById(+req.params.id)
                    .then(goodTurnover => {
                        console.log(goodTurnover);
                        res.status(200)
                            .json({
                                id: goodTurnover.dataValues.id,
                                name: goods.filter(item => item.dataValues.id === goodTurnover.dataValues.id)[0].name,
                                count: goodTurnover.dataValues.count,
                                dateAction: goodTurnover.dataValues.dateAction,
                                purchasePrice: goodTurnover.dataValues.purchasePrice,
                                sellingPrice: goodTurnover.dataValues.sellingPrice,
                            })
                    })
                    .catch(error => res.status(400).json({ok: false, error: error.message}));
            });

    },

    findTurnoverGoods(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const inputData = JSON.parse(data);
            let turnoverGoodConditions = {};
            if (inputData.typeList === 0)
                turnoverGoodConditions.count = {$gt: 0}
            else
                turnoverGoodConditions.count = {$lt: 0}

            if (inputData.dateAction) {
                const date1 = new Date(inputData.dateAction);
                turnoverGoodConditions.dateAction = {
                    $gte: date1,
                    $lt: new Date(date1.getTime() + 24 * 60 * 60 * 1000)
                }
            }
            let goodConditions = {};
            if (inputData.categoryId) {
                goodConditions.CategoryId = +inputData.categoryId;
            }
            return Good.findAll({
                attributes: ['id', 'name'],
                where: goodConditions
            })
                .then(goods => {
                    turnoverGoodConditions.GoodId = {$in: goods.map(item => item.dataValues.id)};
                    return TurnoverGood.findAll({
                        where: turnoverGoodConditions
                    })
                        .then(turnoverGoods => {

                            const goodsArray = [];
                            for (let i = 0; i < turnoverGoods.length; i++) {
                                const turnoverGood = {
                                    id: turnoverGoods[i].dataValues.id,
                                    name: goods.filter(item => item.dataValues.id === turnoverGoods[i].dataValues.GoodId)[0].name,
                                    dateAction: turnoverGoods[i].dataValues.dateAction
                                };
                                if (inputData.typeList === 0) {
                                    turnoverGood.count = turnoverGoods[i].dataValues.count;
                                    turnoverGood.purchasePrice = turnoverGoods[i].dataValues.purchasePrice;
                                }
                                else {
                                    turnoverGood.count = -turnoverGoods[i].dataValues.count;
                                    turnoverGood.sellingPrice = turnoverGoods[i].dataValues.sellingPrice;
                                }
                                goodsArray.push(turnoverGood);
                            }
                            return res.status(200).json(goodsArray);
                        })
                        .catch(error => res.status(400).json({ok: false, error: error.message}));
                })
                .catch(error => res.status(400).json({ok: false, error: error.message}));

        });
    },

    addTurnoverGoods(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {

            const inputData = JSON.parse(data);
            return TurnoverGood.bulkCreate(inputData)
                .then((good) => res.status(201).json({ok: true}))
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        });
    },

    updateTurnoverGoods(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return TurnoverGood.findById(+req.params.id)
                .then(turnoverGood => {
                        if (!turnoverGood)
                            return res.status(404).json({ok: false, error: 'TurnoverGood Not Found'});
                        return turnoverGood.update(JSON.parse(data))
                            .then(() => res.status(201).json({ok: true}))
                            .catch(error => res.status(400).json({ok: false, error: error.message}));
                    }
                )
        });
    },

    destroyTurnoverGood(req, res){
        return TurnoverGood.findById(+req.params.id)
            .then(item => {
                if (!item)
                    return res.status(404).json({ok: false, error: 'TurnoverGood Not Found'});
                return item.destroy()
                    .then(() => res.status(201).json({ok: true}))
                    .catch(error => res.status(400).json({ok: false, error: error.message}))
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    getAvailabilityGoods(req, res){
        return Good.findAll({
            attributes: ['id', 'name', 'price', 'CategoryId']
        })
            .then(goods => {
                return TurnoverGood.findAll()
                    .then(turnoversGoods => {
                        const goodsArray = [];
                        for (let i = 0; i < goods.length; i++) {
                            console.log
                            goodsArray.push({
                                id: goods[i].dataValues.id,
                                name: goods[i].dataValues.name,
                                price: goods[i].dataValues.price,
                                CategoryId: goods[i].dataValues.CategoryId,
                                count: turnoversGoods.filter(item => item.dataValues.GoodId === goods[i].dataValues.id).reduce((summ, current) => summ + current.dataValues.count, 0)
                            });
                        }
                        return res.status(200).json(goodsArray);
                    })
                    .catch(error => res.status(400).json({ok: false, error: error.message}));
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    }
}