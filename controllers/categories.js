const Category = require('../models').Category;
const Good = require('../models').Good;


module.exports = {
    getCategoriesList(req, res){
        return Category.findAll({
            order: [['createdAt']]
        })
            .then(categories => res.status(200).json(categories))
            .catch(error => res.status(400).json({ok: false, error: error.message}));

    },

    getCategoryInfo(req, res) {
        return Category.findAll({
            order: [['createdAt']],
            include: [{
                model: Good,
                as: 'goods',
            }]
        })
            .then(categories => {
                const categoryData = categories.filter(item => item.dataValues.id === +req.params.id)[0];
                if (!categoryData)
                    return res.status(404).json({ok: false, error: 'Category Not Found'});
                const category = categoryData.dataValues;
                if (category.parentId)
                    category.categoryParent = categories.filter(item => item.dataValues.id === category.parentId)[0].dataValues;
                category.categoriesChildren = categories.filter(item => {
                    if (item.dataValues.parentId === category.id) return true;
                }).map(item => item.dataValues);
                categoryData.getAttributes().then(attributes => {
                    category.attributes = attributes.map(item => item.dataValues);
                    res.status(200).json(category)
                })
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    getCategoryTree(req, res){
        return Category.findAll({
            order: [['createdAt']]
        })
            .then(categories => res.status(200).json(buildTreeCategory(categories, null)))
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    },

    addCategory(req, res){

        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Category.create(JSON.parse(data))
                .then(() => res.status(201).json({ok: true}))
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        });

    },

    updateCategory(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            return Category.findById(+req.params.id)
                .then(category => {
                        if (!category)
                            return res.status(404).json({ok: false, error: 'Category Not Found'});
                        return category.update(JSON.parse(data))
                            .then(() => res.status(201).json({ok: true}))
                            .catch(error => res.status(400).json({ok: false, error: error.message}));
                    }
                )
        })
    },

    destroyCategory(req, res){
        return Category.findById(+req.params.id)
            .then(item => {
                if (!item)
                    return res.status(404).json({ok: false, error: 'Category Not Found'});
                return item.destroy()
                    .then(() => res.status(201).json({ok: true}))
                    .catch(error => res.status(400).json({ok: false, error: error.message}))
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    }
}


function buildTreeCategory(allCategories, id) {
    const treeRootsDate = allCategories.filter(item => item.dataValues.parentId === id);
    const treeRoots = [];
    for (let i = 0; i < treeRootsDate.length; i++) {
        const root = treeRootsDate[i].dataValues;
        root.categoriesChildren = buildTreeCategory(allCategories, root.id);
        treeRoots.push(root);
    }
    return treeRoots;
}
