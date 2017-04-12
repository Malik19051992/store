/**
 * Created by Valh on 17.03.2017.
 */
function Good(name, price, unitOfCalculation, category, properties,id){
    if(id === null || id === undefined)
        this.id = idGeneratorForGood();
    else
        this.id = id;

    if( typeof name === 'string'&&typeof price == 'number') {
        this.name = name;
        this.price = price;
    }
    else
        throw TypeError();
    if(properties instanceof Array &&  (function checkProperties (n) {
                                            if(n+1<properties.length){
                                                return properties[n] instanceof Property && checkProperties(n+1);
                                            }
                                            return properties[n] instanceof Property;
                                        })(0))
        this.properties = properties;
    else
        throw TypeError();
    this.unitOfCalculation = unitOfCalculation;

    this.category = category;
    this.category.addGoodToCategory(this);
}

const goodProt ={
    constructor: Good
}

Object.assign(Good.prototype, goodProt);