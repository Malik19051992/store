/**
 * Created by Valh on 20.03.2017.
 */

module.exports = (function () {
    function Attribute(newAttribute) {

        if(newAttribute.hasOwnProperty('id'))
            this.id = newAttribute.id;
        if (typeof newAttribute.name === 'string') {
             this.name = newAttribute.name;
        }
        else
            throw TypeError();

        if (newAttribute.type === 'string' || newAttribute.type === 'number')
            this.type = newAttribute.type;
        else
            throw TypeError();

    }

    const attributeProt = {
        constructor: Attribute

    }

    Object.assign(Attribute.prototype, attributeProt);

    module.exports = Attribute;
    return Attribute;
})();