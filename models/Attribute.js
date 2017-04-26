module.exports = (sequelize, DataTypes) => {
    const Attribute = sequelize.define('Attribute', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Attribute.belongsToMany(models.Category, {
                    as: 'categories',
                    foreignKey: 'AttributeId',
                    through: models.AttributeCategory
                });
                Attribute.belongsToMany(models.Good, {
                    as: 'Goods',
                    foreignKey: 'AttributeId',
                    through: models.PropertyGood
                });
            }
        }
    });
    return Attribute;
};

