module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.STRING.BINARY,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //админ 0, модератор 1, пользователь 2
        role: {
            type: DataTypes.INTEGER
        }
    });
    return User;
};
