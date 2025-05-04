const { logApi } = require('../controller/logApi')
const login = require('../controller/login')
const verifyLogin = require('../controller/verifyLogin')

const Router = require('express').Router()

Router.route('/login').post(login)
Router.route('/verify-login').get(verifyLogin)
Router.route('/show-log').get(logApi)
module.exports = Router