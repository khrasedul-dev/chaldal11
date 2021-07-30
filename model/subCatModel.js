const mongoose = require('mongoose')

const subCatSchema = mongoose.Schema({
    catName: {
        type: String
    },
    parentCat: {
        type:mongoose.Types.ObjectId,
        ref:"categories"
    },
    image:{
        type:String
    },
    photo:{
        type: String
    },
    route: {
        type:String
    },
    date:{
        type: String,
        default: Date.now
    }
})

module.exports = subCatSchema