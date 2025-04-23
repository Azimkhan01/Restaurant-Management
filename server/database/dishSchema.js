const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({

    dish_name:{type:String,trim:true},
    category_id:{type:String,trim:true},
    priceCol:[
                new mongoose.Schema
                (
                    {
                        name:{type:String},
                        price:{type:Number}
                    }
                )
            ]

},{
    timestamps:true
})

module.exports = dishSchema