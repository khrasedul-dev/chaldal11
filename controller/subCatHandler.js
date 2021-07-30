//dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const subCatSchema = require('../model/subCatModel')


//define express
const subCatRouter = express.Router()


//define sub categories object
const sp = mongoose.model('subCategories',subCatSchema)

//multer config
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage})


//all sub fetch
subCatRouter.get('/',(req,res)=>{
    //condition
    const findCondition = {
    }

    sp.find(findCondition,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//categories add
subCatRouter.post('/add/new',upload.single('file'),(res,req)=>{
    //body data 
    const catName = req.body.catName
    const parentCat = req.body.parentCat
    const photo = req.file.filename
    const image = "http://localhost:8888/uploads/"+photo
    const route = req.body.route

    //new object 
    const addData = new sp({
        catName:catName,
        parentCat:parentCat,
        image:image,
        photo:photo,
        route:route
    })
    addData.save(()=>{
        if (err) {
            console.log(err)
        } else {
            res.json({
                id: addData._id,
                catName: catName,
                parentCat:parentCat,
                image:image,route:route
            })
        }
    })
})

//categorites update
subCatRouter.put('/update/:id',upload.single('file'),(req,res)=>{

    //get id from url
    const id = req.params.id

    //get data from 
    const catName = req.body.catName
    const route = req.body.route

    const updateByID = {
        _id: id
    }

    const updateData = {
        catName: catName
    }

    sp.findOneAndUpdate(updateByID,updateData,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})


module.exports = subCatRouter