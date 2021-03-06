//dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs  = require('fs')
const catSchema = require('../model/catModel')
//sub cat model import
const subCatSchema = require('../model/subCatModel')
//global var
const url = require('../lib/url')

//define model
const catObj = mongoose.model('categories',catSchema)

//sub cat model define
const subCat = mongoose.model('subCategories',subCatSchema)

//express router imoport
const catRouter = express.Router();

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

//cat fetch 
catRouter.get('/',(req,res)=>{
   catObj.find({},(err,cat)=>{
       res.json(cat)
   }).skip(0)
})

//single cat fetch

catRouter.get('/:id',(req,res)=>{

    //get finder parameter 
    const id = req.params.id
    
    //find by id
    const catFinder = {
        _id: id
    }
    catObj.find(catFinder,(err,cat)=>{
        res.json(cat)
    })
})

//cat add 
catRouter.post('/add',upload.single('file'),(req,res)=>{
    const name = req.body.name
    const photo = req.file.filename
    const image = url+photo
    const route = req.body.route
    
    const catData = new catObj({
        name:name,
        image:image,
        photo:photo,
        route:route
    })
    catData.save((err,data)=>{
        if (err) {
            console.log(err)
        } else {
            res.json({"massege":"Data Insert Successfully"})
        }
    })
})


//cat update 
catRouter.put('/update/:id',upload.single('file'),(req,res)=>{
    //get param id
    const catID = req.params.id

    const name = req.body.name
    const route = req.body.route

    //check condition
    const catforID = {
        _id:catID
    }
    
    //check file has exists
    const hasFile = req.file
    if(!hasFile){

        const updateData = {
            name:name,
            route:route
        }

        catObj.findOneAndUpdate(catforID,updateData,(err,result)=>{
            if (err) {
                console.log(err)
            } else {
                res.json({"massege":"Data Insert Successfully"})
            }
        })
    }else{
        const photo = req.file.filename
        const image = url+photo

        const updateData = {
            name:name,
            image:image,
            photo:photo,
            route:route
        }

        catObj.findOneAndUpdate(catforID,updateData,(err,result)=>{

            if (err) {
                console.log(err)
            } else {              
                const imageName = result.photo

                fs.unlink('public/uploads/'+imageName,(err)=>{
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({"massege":"Data Insert Successfully"})
                    }
                })
            }
        })
    }
})

//cat Delete
catRouter.delete('/delete/:id',(req,res)=>{
    //get param id
    const catID = req.params.id

    //sub cat find by id
    const findSubCatByID = {
        parent:catID
    }

    //check have sub categories
    subCat.countDocuments(findSubCatByID,(err,data)=>{
        if (data>0) {
            res.json({"massage":"failure"})
        } else {
            const deleteData = {
                _id: catID
            }
        
            catObj.findOneAndDelete(deleteData,(err,result)=>{
        
                if(err){
                    console.log(err)
                }else{
                    const imageName = result.photo
        
                    fs.unlink('public/uploads/'+imageName,(err)=>{
                        console.log(err)
                    })
                    res.json({"massege":"Data delete successfully"})
                }
               
            })
        }
    })
})

module.exports = catRouter