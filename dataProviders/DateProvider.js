module.exports = (function () {

    function DateProvider() {

    }

    const dateProviderProto = {
        constructor: DateProvider,

        //категории
        getCategories: function (db) {
            return db.any("select ID as id, PARENT_ID as parentId, NAME as name from CATEGORIES");
        },
        getCategoryById:function (id, db) {
            return db.any(`select ID as id, PARENT_ID as parentId, NAME as name from CATEGORIES where ID = ${id}`);
        },

        //атрибуты
        getAttributties: function (db) {
            return db.any("select ID as id, TYPE as type, NAME as name from ATTRIBUTTIES");
        },
        getAttributeById: function (id, db) {
            return db.any(`select ID as id, TYPE as type, NAME as name from ATTRIBUTTIES where ID = ${id}`);
        },

        //атрибуты категорий
        getAttributtiesOfCategory:function (id, db) {
            return db.any(`select ATTRIBUTTE_ID as attributtiesId from ATTRIBUTTIES_CATEGORIES where CATEGORIES_ID = ${id}`);
        }
    }

    Object.assign(DateProvider.prototype, dateProviderProto);
    return DateProvider;
})();