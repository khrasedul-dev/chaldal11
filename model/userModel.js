const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },  
    phone: {
        type: String
    },  
    address: {
        type: String
    },
    town: {
        type: String
    },  
    city: {
        type: String
    }, 
    postcode: {
        type: String
    },
    image: {
        type: String
    },
    photo:{
        type:String
    },   
    role:{
        type:String,
        default: "user"
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = userSchema