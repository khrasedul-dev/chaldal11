const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    purchasePrice: {
        type: String
    },
    sellPrice: {
        type:String
    },
    desc: {
        type: String
    },
    image: {
        type: String
    },
    catID: {
        type: mongoose.Types.ObjectId,
        ref: "categories"
    },
    quantity:{
        type:String
    },
    sellQuantity:{
        type:String, 
        default: '0'
    },
    discountType:{
        type: String,
        default: "%"
    },
    discount:{
        type: String,
        trim: true,
        default: "0"
    },
    discountPrice:{
        type: String,
        default: "0"
    },
    photo: {
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = productSchema