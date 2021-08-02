const mongoose = require('mongoose')

const subCatSchema = mongoose.Schema({
    name: {
        type: String
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "categories"
    },
    image: {
        type: String
    },
    photo: {
        type: String
    }, 
    route: {
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = subCatSchema