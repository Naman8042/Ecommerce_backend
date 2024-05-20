const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Product",Product)