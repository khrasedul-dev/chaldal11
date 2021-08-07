//dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const workerSchema = require('../model/workerModel')
//global var
const url = require('../lib/url')


//express router define
const workerRouter = express.Router()

//worker model init
const workerObj = mongoose.model('workers',workerSchema)

//multer config

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename: (req,file,cb)=>{
        const fileName = file.fieldname+'-'+Date.now()+file.originalname
        cb(null,fileName)
    }
})
const upload = multer({storage:storage})


//worker fetch
workerRouter.get('/',(req,res)=>{
    workerObj.find({},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    }).sort({'date':-1})
})

//worker fetch by id
workerRouter.get('/:id',(req,res)=>{
    //get id from url
    const id = req.params.id

    const findbyID = {
        _id : id
    }
    workerObj.find(findbyID,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//worker add
workerRouter.post('/add',upload.single('file'),(req,res)=>{

    //Get all data from body
    const name = req.body.name
    const phone = req.body.phone
    const salary = req.body.salary    
    const designation = req.body.designation
    const address = req.body.address


    console.log(req.body)
    //file check
    const fileCheck = req.file
    if(!fileCheck){

        const workerData = new workerObj({
            name:name,
            phone:phone,
            salary:salary,
            designation: designation,
            address: address
        })
        workerData.save((err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.json({"massege":"Data Insert"})
            }
        })


    }else{
        const photo = req.file.filename
        const image = url+photo

        const workerData = new workerObj({
            name:name,
            phone:phone,
            image:image,
            salary:salary,
            designation: designation,
            address:address,
            photo: req.file.filename
        })
        workerData.save((err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.json({"massege":"Data Insert"})
            }
        })

    }
    

})

//update worker
workerRouter.put('/update/:id',upload.single('file'),(req,res)=>{

    const workerID = req.params.id

    //Get all data from body
    const name = req.body.name
    const phone = req.body.phone
    const salary = req.body.salary
    const designation = req.body.designation
    const address = req.body.address

    //find logic
    const findByID = {
        _id: workerID
    }

    //file check 
    const fileFinder = req.file

    if(!fileFinder){

        const updateData = {
            name:name,
            phone:phone,
            salary:salary,
            designation: designation,
            address: address
        }

        workerObj.findOneAndUpdate(findByID,updateData,(err,data)=>{
            res.json({"Status":true})
        })

    }else{
        const photo = req.file.filename
        const image = url+photo
        
        const updateData = {
            name:name,
            phone:phone,
            image:image,
            photo:photo,
            salary:salary,
            designation: designation,
            address: address
        }

        workerObj.findOneAndUpdate(findByID,updateData,(err,data)=>{

            console.log(data)

            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(error);
            })


            res.json({"Status":true})
        })
    }
})

//delete worker
workerRouter.delete('/delete/:id',(req,res)=>{
    //get id from url
    const id = req.params.id

    const deleteByID = {
        _id : id
    }
    workerObj.findOneAndDelete(deleteByID,(err,data)=>{
        if(err){
            console.log(err)

        }else{

            console.log(data)
            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(error);
            })


            res.json({"massege":"Data delete successfully"})
        }
    })
})

module.exports = workerRouter