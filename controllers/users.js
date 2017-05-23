const User = require('../models').User;
const jwt = require('jsonwebtoken');
const jwtConfig = require(`./../config/config.json`).jwtConfig;
var pbkdf2 = require('pbkdf2')


module.exports = {
    loginUser(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const userRequestData = JSON.parse(data);
            User.findAll({
                where: {login: userRequestData.login.toLowerCase()}
            }).then(user => {
                if (!user) {
                    return res.status(404).json({ok: false, error: 'Login or password isn\'t wrong'})
                }
                const userData = user[0].dataValues;
                if (userData.passwordHash.toString() !== pbkdf2.pbkdf2Sync(userRequestData.password, 'salt', 1, 32, 'sha512').toString()) {
                    return res.status(400).json({ok: false, error: 'Login or password isn\'t wrong'})
                }

                const token = jwt.sign({
                    id: userData.id,
                    login: userData.login,
                    name: userData.name,
                    role: userData.role
                }, jwtConfig.secretKey);//, {expiresInMinutes: 1440 // expires in 24 hours
                return res.status(200).json({token: token})

            })
                .catch(error => res.status(400).json({ok: true, error: error.message}));
        })
    },
    changePassword(req, res){
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const passwordsRequestData = JSON.parse(data);
            return User.findById(+req.params.id)
                .then(user => {

                    if (!user)
                        return res.status(404).json({ok: false, error: 'Users Not Found'});
                    const userData = user.dataValues;
                    if (userData.passwordHash.toString() === pbkdf2.pbkdf2Sync(passwordsRequestData.oldPassword, 'salt', 1, 32, 'sha512').toString()) {
                        userData.passwordHash = pbkdf2.pbkdf2Sync(passwordsRequestData.newPassword, 'salt', 1, 32, 'sha512');
                        return user.update(userData)
                            .then(() => res.status(201).json({ok: true}))
                            .catch((error) => res.status(400).json({ok: false, error: error.message}))
                    }else{
                        return res.status(400).json({ok: false, error: 'Password isn\'t wrong'})
                    }

                })
                .catch(error => res.status(400).json({ok: false, error: error.message}));
        });
    },

    getUsersList(req, res)
    {
        return User.findAll({
            attributes: ['id', 'name', 'login', 'role'],
            order: [['createdAt']]
        })
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json({ok: true, error: error.message}));
    }
    ,

    addUser(req, res)
    {
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const inputData = JSON.parse(data);
            inputData.login = inputData.login.toLowerCase();
            console.log(inputData.password)
            inputData.passwordHash = pbkdf2.pbkdf2Sync(inputData.password, 'salt', 1, 32, 'sha512')
            console.log(inputData.passwordHash)
            return User.create(inputData)
                .then(() => res.status(201).json({ok: true}))
                .catch((error) => res.status(400).json({ok: false, error: error.message}))
        });

    }
    ,

    getUserInfo(req, res)
    {
        return User.findById(+req.params.id)
            .then(user => {
                if (!user)
                    return res.status(404).json({ok: false, error: 'Users Not Found'});
                return res.status(200).json({login: user.login, role: user.role, name: user.name, id: user.id})
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    }
    ,

    updateUser(req, res)
    {
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            const inputData = JSON.parse(data);
            inputData.login = inputData.login.toLowerCase();
            return User.findById(+req.params.id)
                .then(user => {
                        if (!user)
                            return res.status(404).json({ok: false, error: 'Users Not Found'});
                        return user.update(inputData)
                            .then(() => res.status(201).json({ok: true}))
                            .catch((error) => res.status(400).json({ok: false, error: error.message}))
                    }
                )
        })
    }
    ,

    destroyUser(req, res)
    {
        return User.findById(+req.params.id)
            .then(item => {
                if (!item)
                    return res.status(404).json({ok: false, error: 'Users Not Found'});
                return item.destroy()
                    .then(() => res.status(201).json({ok: true}))
                    .catch((error) => res.status(400).json({ok: false, error: error.message}))
            })
            .catch(error => res.status(400).json({ok: false, error: error.message}));
    }
}