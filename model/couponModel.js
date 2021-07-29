const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    code: {
        type: String
    },
    discount: {
        type: String
    },
    minSpend: {
        type: String
    },  
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = couponSchema