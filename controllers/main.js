const Category = require('../models').Category;
const Attribute = require('../models').Attribute;
const AttributeCategory = require('../models').AttributeCategory;
const Good = require('../models').Good;
const PropertyGood = require('../models').PropertyGood;
const User = require('../models').User;
const TurnoverGood = require('../models').TurnoverGood


module.exports = {
    createBase(req, res){
        try {
            Category.sync();
            Attribute.sync();
            AttributeCategory.sync();
            Good.sync();
            PropertyGood.sync();
            TurnoverGood.sync();
            User.sync();

            return res.status(200).json({ok:'ok'});
        } catch (err) {
            return  res.status(400).json(err);
        }
    }
}