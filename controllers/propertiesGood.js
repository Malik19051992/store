const PropertyGood = require('../models').PropertyGood;

module.exports = {
    savePropertyGood(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const rows = JSON.parse(data);
            return PropertyGood.findAll({
                where: {GoodId: +req.params.id}
            }).then(items => {
                const toSave = [];
                const toUpdate = [];
                //const toDelete = [];
                if (items !== null) {
                    const arrayItems = Array.from(items);
                    //for (let i = 0; i < arrayItems.length; i++)
                        //if (!rows.filter((item) => arrayItems[i].dataValues.AttributeId === item.AttributeId)[0])
                            //toDelete.push(arrayItems[i].dataValues.AttributeId);
                    for (let i = 0; i < rows.length; i++)
                        if (arrayItems.filter((item) => rows[i].AttributeId === item.dataValues.AttributeId)[0])
                            toUpdate.push(rows[i])
                        else
                            toSave.push(rows[i]);
                    if (toSave.length === 0 && toUpdate.length === 0)
                        return res.status(200).json({ok: true});

                    if (toUpdate.length === 0) {
                        return saveData(toSave).then(answer => {
                            if (answer.ok)
                                return res.status(200).json(answer);
                            else
                                return res.status(400).json(answer);
                        })
                    }
                    return updateData(toUpdate)
                        .then((answer) => {
                            if (!answer.ok)
                                return res.status(400).json(answer);
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
                    return saveData(rows).then(answer => {
                        if (answer.ok)
                            return res.status(200).json(answer);
                        else
                            return res.status(400).json(answer);
                    })
                }
            }).catch(error => {
                console.log(error);
                return res.status(400).json({ok: false, error: error.message})
            })
        })
    }
}

function saveData(data) {
    return PropertyGood.bulkCreate(data)
        .then(() => {
            return {ok: true}
        })
        .catch(error => {
            return {ok: false, error: error}
        })
}

function updateData(data) {
    const firstElem = data.shift();
    if (data.length > 0) {
        return PropertyGood.update({value: firstElem.value}, {
            where: {GoodId: firstElem.GoodId, AttributeId: firstElem.AttributeId}
        }).then(() => {
            return updateData(data)
        })
            .catch(error => {
                console.log(error);
                return new Promise(() => {
                    return {ok: false, error: error.message}
                });
            })
    }
    else {
        return PropertyGood.update(firstElem, {
            where: {GoodId: firstElem.GoodId, AttributeId: firstElem.AttributeId}
        }).then(() => {
            return {ok: true}
        })
            .catch(error => {
                console.log(error);
                return new Promise(() => {
                    return {ok: false, error: error.message}
                });
            })
    }
}