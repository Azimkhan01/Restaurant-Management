const login = require('../controller/login')
const verifyLogin = require('../controller/verifyLogin')

const Router = require('express').Router()

Router.route('/login').post(login)
Router.route('/verify-login').get(verifyLogin)

module.exports = Router