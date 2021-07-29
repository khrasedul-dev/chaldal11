const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    customerID:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    productID: {
        type: mongoose.Types.ObjectId,
        ref: "products"
    },
    quantity: {
        type: String
    },
    totalPrice: {
        type: String
    },
    discountsType: {
        type:String
    },
    discount: {
        type: String
    },
    couponCode: {
        type: String
    },
    couponDiscount: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "Pending"
    },
    date:{
        type: String,
        default: Date
    }
    
})

module.exports = orderSchema