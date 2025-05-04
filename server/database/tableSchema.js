const mongoose = require('mongoose')
const tableSchema = new mongoose.Schema
(
    {
    name:
        {
            type:String,
            unique:true
        },
    total_table:
                {
                    type:Number
                },
    table_size:
                [
                    {
                        type:Number
                    }
                ]
    },
    {
        timestamps:true
    }
)

module.exports = tableSchema