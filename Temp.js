const AttributeCategory = require('../models').AttributeCategory;
const sequelize = require('../models').sequelize;


module.exports = {
    addattributesCategory(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const rows = JSON.parse(data);
            return AttributeCategory.find({
                where: {
                    CategoryId: rows[0].CategoryId
                }
            }).then(items => {
                if (items !== null)
                    items.destroy()
                        .then(() =>
                            saveData(rows)
                        )
                else
                    return saveData(rows)
            })
                .then(()=>res.status(200).json({ok:'ok'}))
                .catch(error => res.status(400).json({error: error.message}))
        });
    }
}

function saveData(data) {
    if (data[0].AttributeId !== 0) {
        return AttributeCategory.bulkCreate(data)
    }
}

