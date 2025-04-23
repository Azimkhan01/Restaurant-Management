const mongoose = require('mongoose')
const userSchema = require('./userSchema')
const Otp = require('./otpSchema')
const logSchema = require('./logSchema')
const categorySchema = require('./categorySchema')
const dishSchema = require('./dishSchema')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log('connected successfully !!')
    })
    .catch((error) => {
        console.log("Error happen while connecting database :", error)
    })

const userModel = new mongoose.model('user', userSchema)
const logModel = new mongoose.model('log', logSchema)
const categoryModel = new mongoose.model('category',categorySchema)
const dishModel = new mongoose.model('dish',dishSchema)

module.exports = { userModel, Otp, logModel, categoryModel, dishModel}