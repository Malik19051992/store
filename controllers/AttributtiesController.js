/**
 * Created by Valh on 12.04.2017.
 */

module.exports = (function () {
    const Attribute = require('./../models/Attribute');
    const DateProvider = require('./../dataProviders/DateProvider');
    let dateProvider;

    function AttributtiesController() {
        dateProvider = new DateProvider();
    }

    const attributeControllerProt = {
        constructor: AttributtiesController,
        getAllAttributties: function (db) {
            return dateProvider.getAttributties(db).then((data) => {
                const attributtiesArray = [];
                for(let i=0;i<data.length;i++){
                    attributtiesArray.push(new Attribute(data[i]))
                }
                return attributtiesArray;
            })
        }
    }

    Object.assign(CategoryController.prototype, attributeControllerProt);

    return AttributtiesController;
})();