
module.exports = (function () {
    const Attribute = require('./../models/Attribute');
    const Category = require('./../models/Category');
    const DateProvider = require('./../dataProviders/DateProvider');
    let dateProvider;

    function CategoryController() {
        dateProvider = new DateProvider();
    }

    const categoryControllerProt = {
        constructor: CategoryController,
        getAllCategories: function (db) {
            return dateProvider.getCategories(db).then((data) => {
                const categoryArray = [];
                for (let i = 0; i < data.length; i++) {
                    categoryArray.push(new Category(data[i]))
                }
                const categoriesTree = buildTreeCategory(categoryArray, null);
                return {categories: categoryArray, categoriesTree};
            })
        },
        getCategoryById: function (id, db) {
            return dateProvider.getCategories(db).then((data) => {
                const dataCategory = data.filter(item => item.id === id);
                const category = new Category(dataCategory);
                if (dataCategory.parentid)
                    category.parentCategory = new Category(data.filter(item => item.id === dataCategory.parentid));
                for (let i = 0; i < data.length; i++)
                    if (data[i].parentid === category.id)
                        category.childrenOfCategory.push(new Category(data[i]));
                return category;
            })
        },
        addNewCategory: function (categoryToSave) {
        }
    }

    Object.assign(CategoryController.prototype, categoryControllerProt);

    function buildTreeCategory(allCategories, id) {
        const treeRoots = allCategories.filter((item) => item.parentCategoryId === id);
        for (let i = 0; i < treeRoots.length; i++) {
            treeRoots[i].childrenOfCategory = buildTreeCategory(allCategories, treeRoots[i].id);
        }
        return treeRoots;
    }

    return CategoryController;

})
()