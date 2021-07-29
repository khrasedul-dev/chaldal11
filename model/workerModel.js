const mongoose = require('mongoose')

const workerSchema = mongoose.Schema({
    name: {
        type: String,
    },  
    phone: {
        type: String
    },
    image: {
        type: String
    },  
    salary: {
        type: String
    },  
    designation:{
        type:String
    },
    address:{
        type:String
    },
    photo:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = workerSchema