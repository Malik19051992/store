const Good = require('../models').Good;
const sequelize = require('../models').sequelize;

module.exports = {
    getGoodsList(req, res){
        return Good.findAll({
            order: [['createdAt']]
        })
            .then(goods => res.status(200).json(goods))
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    getGoodsCategoryList(req, res){
        return Good.findAll({
            where: {CategoryId: +req.params.id},
            order: [['createdAt']]
        })
            .then(goods => res.status(200).json(goods))
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    getGoodInfo(req, res) {
        return Good.findById(+req.params.id)
            .then(good => {
                if (!good)
                    return res.status(404).json({ok: false, error: 'Good Not Found'});
                const goodResult = good.dataValues;
                return good.getProperties()
                    .then(properties => {
                            goodResult.properties = properties.map(item => ({
                                value: item.dataValues.PropertyGood.value,
                                attribute: item.dataValues
                            }))
                            return res.status(200).json(goodResult)
                        }
                    )

            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    addGood(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Good.create(JSON.parse(data))
                .then((good) => res.status(201).json({ok: true, goodId: good.id}))
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        });
    },

    updateGood(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Good.findById(+req.params.id)
                .then(good => {
                        if (!good)
                            return res.status(404).json({ok: false, error: 'Good Not Found'});
                        return good.update(JSON.parse(data))
                            .then(() => res.status(201).json({ok: true}))
                            .catch(error => res.status(400).json({ok: false, error: error.message}));
                    }
                )
        })
    },

    destroyGood(req, res){
        return Good.findById(+req.params.id)
            .then(item => {
                if (!item)
                    return res.status(404).json({ok: false, error: 'Good Not Found'});
                return item.destroy()
                    .then(() => res.status(201).json({ok: true}))
                    .catch(error => res.status(400).json({ok: false, error: error.message}))
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    getGoodsCategoryForPage(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const inputData = JSON.parse(data);
            const queryCondition = {CategoryId: +req.params.id}
            if (inputData.filterValue)
                queryCondition.name = {$iLike: `%${inputData.filterValue}%`}
            return Good.findAll({
                offset: +req.params.pageSize * (+req.params.pageNumber - 1),
                limit: +req.params.pageSize,
                where: queryCondition,
                order: [['createdAt']]
            })
                .then(goods =>
                    Good.count({where: queryCondition}).then(count =>
                        res.status(200).json({count: count, goods: goods})))
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        })
    },

    getGoodsForPage(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const inputData = JSON.parse(data);
            const queryCondition = {}
            if (inputData.filterValue)
                queryCondition.name = {$iLike: `%${inputData.filterValue}%`}
            return Good.findAll({
                offset: +req.params.pageSize * (+req.params.pageNumber - 1),
                limit: +req.params.pageSize,
                order: [['createdAt']],
                where: queryCondition
            })
                .then(goods =>
                    Good.count({where: queryCondition}).then(count =>
                        res.status(200).json({count: count, goods: goods})))
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        })
    }
}




