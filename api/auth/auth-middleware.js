const User = require('./auth-model')
const bcrypt = require('bcryptjs')

function validateBody(req, res, next) {
    const {username, password } = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'a username and password required'})
    } else {
        next()
    }
}

async function checkUsername(req, res, next) {
    const username = req.body.username
    const check = await User.findBy({username})

    if (check) {
        res.status(422).json({message: 'That username is taken'})
    } else {
        next()
    }
}

async function checkUserRegistration(req, res, next) {
    const {username, password} = req.body

    try {
        let checkUser = await User.findBy({username})
        if (!checkUser) {
            next({status: 401, message: 'Invalid username'})
        } else {
            if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
                next()
            } else {
                next({status: 401, messagE: 'Invalid username or passowrd'})
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateBody,
    checkUsername,
    checkUserRegistration
}