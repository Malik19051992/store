/**
 * Created by Valh on 07.04.2017.
 */



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
                for(let i=0;i<data.length;i++){
                    categoryArray.push(new Category(data[i]))
                }
                return categoryArray;
            })
        },
        getCategoryById: function (id, db) {
            return dateProvider.getCategories(db).then((data) => {
                const dataCategory = getDataById(id, data);
                const category = new Category(dataCategory);
                if(dataCategory.parentid)
                    category.parentCtegory = new Category(getDataById(dataCategory.parentid, data));
                return category;
            })
        },
        addNewCategory: function (categoryToSave) {

        }

    }

    Object.assign(CategoryController.prototype, categoryControllerProt);

    function getDataById(id, data) {
        for(let i=0;i<data.length;i++) {
            if (data[i].id === id)
                return data[i];
        }
    }

    return CategoryController;

})
()