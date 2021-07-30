//dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs  = require('fs')
const catSchema = require('../model/catModel')

//define model
const catObj = mongoose.model('categories',catSchema)

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
    const image = "http://localhost:8888/uploads/"+photo
    const route = req.body.route
    
    const catData = new catObj({
        name:name,
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
    });
    
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
            res.json(result)
        })
    }else{
        const photo = req.file.filename
        const image = "http://localhost:8888/uploads/"+photo

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
                    console.log(err)
                })
            }
        })
    }
})

//cat Delete
catRouter.delete('/delete/:id',(req,res)=>{
    //get param id
    const catID = req.params.id

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

})

module.exports = catRouter