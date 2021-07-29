const mongoose = require('mongoose')

const catSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    photo: {
        type: String
    },  
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = catSchema