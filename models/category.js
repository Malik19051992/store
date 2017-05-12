module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            classMethods: {
                associate: (models) => {
                    Category.belongsToMany(models.Attribute, {
                        as: 'attributes',
                        foreignKey: 'CategoryId',
                        through: models.AttributeCategory
                    });
                    Category.hasMany(models.Good, {
                        foreignKey: 'CategoryId',
                        as: 'goods'
                    });
                },
            }
        }
    );
    return Category;
};

