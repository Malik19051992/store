const Attribute = require('../models').Attribute;

module.exports = {
    getAttributesList(req, res){
        return Attribute.findAll({
            order: [['createdAt']]
        })
            .then(attributes => res.status(200).json(attributes))
            .catch(error => res.status(400).json({ok: true, error: error.message}));
    },

    addAttribute(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Attribute.create(JSON.parse(data))
                .then(() => res.status(201).json({ok: true}))
                .catch((error) => res.status(400).json({ok: false, error: error.message}))
        });

    },

    getAttributeInfo(req, res){
        return Attribute.findById(+req.params.id)
            .then(attribute => {
                if (!attribute)
                    return res.status(404).json({ok: false, error: 'Attributes Not Found'});
                return res.status(200).json(attribute)
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    updateAttribute(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Attribute.findById(+req.params.id)
                .then(attribute => {
                        if (!attribute)
                            return res.status(404).json({ok: false, error: 'Attributes Not Found'});
                        return attribute.update(JSON.parse(data))
                            .then(() => res.status(201).json({ok: true}))
                            .catch((error) => res.status(400).json({ok: false, error: error.message}))
                    }
                )
        })
    },

    destroyAttribute(req, res){
        return Attribute.findById(+req.params.id)
            .then(item => {
                if (!item)
                    return res.status(404).json({ok: false, error: 'Attributes Not Found'});
                return item.destroy()
                    .then(() => res.status(201).json({ok: true}))
                    .catch((error) => res.status(400).json({ok: false, error: error.message}))
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    }
}

