module.exports = (sequelize, DataTypes) => {
    const PropertyGood = sequelize.define('PropertyGood', {
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return PropertyGood;
};
