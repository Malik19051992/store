/**
 * Created by Valh on 20.03.2017.
 */
function Property (attributeId,value,id) {
    /*if(typeof name === 'string')
        this.name = name;
    else
        throw TypeError();

    if(type === 'string'||type ==='number')
        this.type = type;
    else
        throw TypeError();*/
    if(id === null || id === undefined)
        this.id = idGeneratorForProperty();
    else
        this.id = id;


    this.attributeId = attributeId;
    this.attributeOfProperty = this.getAttributeById(attributeId);
    this.value = value;
}


const propertyProt ={
    constructor: Property,
    getAttributeById: function (id) {
        return attributes[id];
    }
}

Object.assign(Property.prototype, propertyProt);
