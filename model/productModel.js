const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
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
    discountType:{
        type: String
    },
    discount:{
        type:String
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