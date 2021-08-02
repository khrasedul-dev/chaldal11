//dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs  = require('fs')
const subCatSchema = require('../model/subCatModel')
//import product model
const productSchema = require('../model/productModel')

//define sub cat model
const sp = mongoose.model('subCategories',subCatSchema)

//define product model
const pro = mongoose.model('products',productSchema)

//express router imoport
const subCatRouter = express.Router();

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
subCatRouter.get('/',(req,res)=>{
   sp.find({},(err,cat)=>{
       res.json(cat)
   }).skip(0)
})

//single cat fetch

subCatRouter.get('/:id',(req,res)=>{

    //get finder parameter 
    const id = req.params.id
    
    //find by id
    const catFinder = {
        _id: id
    }
    sp.find(catFinder,(err,cat)=>{
        res.json(cat)
    })
})

//sub cat fetch by parent categories

subCatRouter.post('/p/:id',(req,res)=>{

    //get finder parameter 
    const pID = req.params.id
    
    //find by id
    const catFinder = {
        parent: pID
    }
    sp.find(catFinder,(err,cat)=>{
        res.json(cat)
    })
})

//cat add 
subCatRouter.post('/add',upload.single('file'),(req,res)=>{
    const name = req.body.name
    const parent = req.body.parentCategoryId
    const route = req.body.route
    
    //check has photo
    const hasFile = req.file

    if(!hasFile){

        const catData = new sp({
            name:name,
            parent:parent,
            photo:'none',
            route:route
        })
        catData.save((err)=>{
            if(err){
                console.log(err)
            }else{
                res.json({"massege":"Data inserted succesfully"})
            }
        })

    }else{
        //get file
        const photo = req.file.filename
        const image = "http://localhost:8888/uploads/"+photo

        const catData = new sp({
            name:name,
            parent:parent,
            image:image,
            photo:photo,
            route:route
        })
        catData.save((err)=>{
            if(err){
                console.log(err)
            }else{
                res.json({"massege":"Data inserted succesfully"})
            }
        })
    }

    
})


//cat update 
subCatRouter.put('/update/:id',upload.single('file'),(req,res)=>{
    //get param id
    const catID = req.params.id

    const parent = req.body.parentCategoryId
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
            parent:parent,
            route:route
        }

        sp.findOneAndUpdate(catforID,updateData,(err,result)=>{
            res.json(result)
        })
    }else{
        const photo = req.file.filename
        const image = "http://localhost:8888/uploads/"+photo

        const updateData = {
            name:name,
            parent:parent,
            image:image,
            photo:photo,
            route:route
        }

        sp.findOneAndUpdate(catforID,updateData,(err,result)=>{

            if (err) {
                console.log(err)
            } else {              
                const imageName = result.photo
                if(imageName === "none"){
                    res.json({"massage":"file not found"})
                }else{
                    fs.unlink('public/uploads/'+imageName,(err)=>{
                        console.log(err)
                    })
                }
            }
        })
    }
})

//cat Delete
subCatRouter.delete('/delete/:id',(req,res)=>{
    //get param id
    const catID = req.params.id

    //cat wise product find by id
    const findProductByID = {
        catID:catID
    }
    //check have product
    pro.countDocuments(findProductByID,(err,data)=>{
        if(data >0){
            res.json({"massage":"failure"})
        }else{
            const deleteData = {
                _id: catID
            }
        
            sp.findOneAndDelete(deleteData,(err,result)=>{
        
                if(err){
                    console.log(err)
                }else{
                    const imageName = result.photo
        
                    if(imageName === "none"){
                        res.json({"massage":"file not found"})
                    }else{
                        fs.unlink('public/uploads/'+imageName,(err)=>{
                            console.log(err)
                            res.json({"massage":"file not found"})
                        })
                    }
                }
               
            })
        }
    })
})

module.exports = subCatRouter