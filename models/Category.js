/**
 * Created by Valh on 17.03.2017.
 */
module.exports = (function () {
    function Category(newCategory) {
        if (newCategory.hasOwnProperty('id'))
            this.id = newCategory.id;
        if (typeof newCategory.name === 'string') {
            this.name = newCategory.name;
        }
        this.childrenOfCategory = [];
        this.goodsOfCategory = [];
        this.attributes = []//attributes;
        this.parentCtegory = null;
        if (newCategory.parentCtegory) {
            this.parentCtegory.addToChildrenOfCategory(this);
            this.parentCtegory = newCategory.parentCtegory;
        }

    }

    const categoryProt = {
        constructor: Category,
        addToChildrenOfCategory: function (category) {
            this.childrenOfCategory.push(category);
        },
        getAllChildrenOfCategory: function () {
            return this.childrenOfCategory;
        },
        addGoodToCategory: function (good) {
            this.goodsOfCategory.push(good);
        }
    }

    Object.assign(Category.prototype, categoryProt);
    return Category
})();
