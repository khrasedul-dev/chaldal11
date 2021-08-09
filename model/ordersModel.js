const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    useId:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    products:[
        {
            id:{
                type:mongoose.Types.ObjectId,
                ref:"products"
            },
            name:{
                type:String
            },
            price:{
                type:String
            },
            quantity:{
                type:String
            }

        }
    ],
    totalPrice: {
        type: String
    },
    couponCode: {
        type: String
    },
    couponDiscount: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "Pending"
    },
    date:{
        type: String,
    }
    
})

module.exports = orderSchema