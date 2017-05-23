const AttributeCategory = require('../models').AttributeCategory;

module.exports = {
    saveAttributesCategory(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const rows = JSON.parse(data);
            return AttributeCategory.findAll({
                where: {CategoryId: +req.params.id}
            }).then(items => {
                const toDelete = [];
                const toSave = [];
                if (items !== null) {
                    const arrayItems = Array.from(items);
                    for (let i = 0; i < arrayItems.length; i++)
                        if (!rows.filter((item) => arrayItems[i].dataValues.AttributeId === item.AttributeId)[0])
                            toDelete.push(arrayItems[i].dataValues.AttributeId);

                    for (let i = 0; i < rows.length; i++)
                        if (!arrayItems.filter((item) => rows[i].AttributeId === item.dataValues.AttributeId)[0])
                            toSave.push(rows[i]);

                    if (toSave.length === 0 && toDelete.length === 0) {
                        return res.status(200).json({ok: true});
                    }
                    if (toDelete.length === 0) {
                        return saveData(toSave).then(answer => {
                            if (answer.ok)
                                return res.status(200).json(answer);
                            else
                                return res.status(400).json(answer);
                        })
                    }
                    return AttributeCategory.destroy({
                        where: {
                            CategoryId:  +req.params.id,
                            AttributeId: toDelete
                        }
                    })
                        .then(() => {
                            if (toSave.length === 0)
                                return res.status(200).json({ok: true});
                            else
                                return saveData(toSave).then(answer => {
                                    if (answer.ok)
                                        return res.status(200).json(answer);
                                    else
                                        return res.status(400).json(answer);
                                })
                        })

                } else {
                    return saveData(rows)
                        .then(answer => {
                            if (answer.ok)
                                return res.status(200).json(answer);
                            else
                                return res.status(400).json(answer);
                        })
                }
            }).catch(error => {
                return res.status(400).json({ok: false, error: error.message})
            })
        });
    }
}

function saveData(data) {

    if (data[0].AttributeId === 0) {
        return new Promise(() => {
            return {ok: true}
        })
    } else {
        return AttributeCategory.bulkCreate(data)
            .then(() => {
                return {ok: true}
            })
            .catch(error => {
                return {ok: false, error: error.message}
            })
    }
}