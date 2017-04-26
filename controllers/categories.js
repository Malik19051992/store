const Category = require('../models').Category;

module.exports = {
    categoryList(req, res){
        return Category.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(categories => res.status(200).json(categories))
            .catch(error => res.status(400).json(error));
    },

    categoryInfo(req, res) {
        return Category.findAll({})
            .then(categories => {
                const categoryData = categories.filter(item => item.dataValues.id === +req.params.id)[0];
                const category = categoryData.dataValues;
                if (category.parentId)
                    category.categoryParent = categories.filter(item => item.dataValues.id === category.parentId)[0].dataValues;
                category.categoriesChildren = categories.filter(item => {
                    if (item.dataValues.parentId === category.id) return true;
                }).map(item => item.dataValues);
                categoryData.getAttributties().then(attributties => {
                    category.attributties = attributties.map(item => item.dataValues);
                    res.status(200).json(category)
                })
            })
            .catch(error => res.status(400).json(error));
    },

    categoryTree(req, res){
        return Category.findAll({})
            .then(categories => res.status(200).json(buildTreeCategory(categories, null)))
            .catch(error => res.status(400).json(error));
    },

    addCategory(req, res){
        return res.status(200).json({ok:"ok"});
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
