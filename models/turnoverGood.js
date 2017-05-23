module.exports = (sequelize, DataTypes) => {
    const TurnoverGood = sequelize.define('TurnoverGood', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            dateAction: {
                type: DataTypes.DATE,
                allowNull: false
            },
            purchasePrice: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            sellingPrice: {
                type: DataTypes.DOUBLE,
                allowNull: true
            }
        }, {
            classMethods: {
                associate: (models) => {
                    TurnoverGood.belongsTo(models.Good, {
                        foreignKey: 'GoodId',
                        onDelete: 'CASCADE'
                    });
                }

            }
        }
    );
    return TurnoverGood;
};

