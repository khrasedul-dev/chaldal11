//dependencies
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const userSchema = require('../model/userModel')
//global var
const url = require('../lib/url')



const userObj = mongoose.model('users',userSchema)

//express router imoport
const userRouter = express.Router();

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

//sigle user fetch 
userRouter.get('/:id',(req,res)=>{
   const id = req.params.id
   const userfindbyID = {
      _id:id
   }
   userObj.find(userfindbyID,(err,user)=>{
       res.json(user)
   }).select({
       password:0
   })
})

//user photo upload
userRouter.put('/update/photo/:id',upload.single('file'),(req,res)=>{
    //get id from url
    const id = req.params.id

    const photo = req.file.filename
    const image = url+photo

    const updateByID = {
        _id: id
    }
    
    const updateData = {
        photo: photo,
        image: image
    }
    userObj.findOneAndUpdate(updateByID,updateData,(err,data)=>{

        if(err){
            console.log(err)
        }
        else{
            res.json({"message":"Photo Uploded"})
        }

        console.log(data)
    })
})

//user signup 
userRouter.post('/add',upload.single('file'),(req,res)=>{

    //store body data
    const name = req.body.name
    const emailBody = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const address = req.body.address
    const town = req.body.town
    const city = req.body.city
    const postcode = req.body.postcode
    const role = req.body.role
    const defaultImage = "http://localhost:8888/uploads/userLogo.png"

    //check user email
    userObj.findOne({"email":emailBody},(err,user)=>{
        if (user === null){

            //file check
            const fileCheck = req.files
            //user add with and without photo
            if(!fileCheck){

                const userData = new userObj({
                    name:name,
                    email:emailBody,
                    password:password,
                    phone:phone,
                    image:defaultImage,
                    address:address,
                    town:town,
                    city:city,
                    postcode:postcode,
                    role:role
                })
                userData.save((err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.json({"status":true,"massege":"Signup successfull"})
                    }
                });
                
            }else{
                const photo = req.file.filename
                const image = url+photo

                const userData = new userObj({
                    name:name,
                    email:emailBody,
                    password:password,
                    phone:phone,
                    image:image,
                    address:address,
                    town:town,
                    city:city,
                    postcode:postcode,
                    photo:photo,
                    role:role
                })
                userData.save((err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.json({"status":true,"massege":"Signup successfull"})
                    }
                });
            }  
        }else{
            res.json({"massege":"User already Exits"}) 
        }


    })

})

//log in 

userRouter.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const inputMail = {
        email:email
    }
    
    userObj.findOne(inputMail,(err,data)=>{

        if (data===null){
            res.json({"massege":"Email Not found."})
        }else{
            if(data.password === password){
                res.json({"status":true,id:data._id,role:data.role})
            }else{
                res.json({"massege":"Password Incorrect."})
            }
        }
    })
})

//user update
userRouter.put('/update/:id',upload.single('file'),(req,res)=>{
    //get id from url
    const id = req.params.id

    //body data 
    const name = req.body.name
    const phone = req.body.phone
    const address = req.body.address
    const town = req.body.town
    const city = req.body.city
    const postcode = req.body.postcode
    
    const updateByID = {
        _id : id
    }

    //file Check 
    const hasfile = req.file

    if(!hasfile){
        const updateData = {
            name:name,
            phone:phone,
            address:address,
            town:town,
            city:city,
            postcode:postcode
        }
        userObj.findByIdAndUpdate(updateByID,updateData,(err,data)=>{
            res.json(data)
        })
    }else{
        const photo = req.file.filename
        const image = url+photo

        const updateData = {
            name:name,
            phone:phone,
            address:address,
            town:town,
            city:city,
            postcode:postcode,
            image:image,
            photo:photo
        }
        userObj.findByIdAndUpdate(updateByID,updateData,(err,data)=>{
            
            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(error);
            })

            res.json(data)
        })
    }
})

//user delete
userRouter.delete('/delete/:id',(req,res)=>{
    //Get id from url
    const id = req.params.id

    const deleteByID = {
        _id : id
    }
    userObj.findOneAndDelete(deleteByID,(err)=>{
        if(err){
            console.log(err)
        }else{
            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(error);
            })

            res.json({"Status":true})
        }
       
    })
})



module.exports = userRouter
