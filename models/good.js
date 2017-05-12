module.exports = (sequelize, DataTypes) => {
    const Good = sequelize.define('Good', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Good.belongsToMany(models.Attribute, {
                    as: 'properties',
                    foreignKey: 'GoodId',
                    through: models.PropertyGood
                });
                Good.belongsTo(models.Category, {
                    foreignKey: 'CategoryId',
                    onDelete: 'CASCADE'
                });
            },
        },
    });
    return Good;
};
