const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    code: {
        type: String
    },
    discount: {
        type: String
    },
    catID:{
        type: mongoose.Types.ObjectId,
        ref: 'subCategories',
        default: "No"
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