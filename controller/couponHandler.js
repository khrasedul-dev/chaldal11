//dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const couponSchema = require('../model/couponModel')

//express router define
const couponRouter = express.Router()

//create a coupon model
const couponObj = mongoose.model('coupon',couponSchema)

//fetch all coupon 
couponRouter.get('/',(req,res)=>{

    const findBy = {

    }
    couponObj.find(findBy,(err,data)=>{
        if (err) {
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//specefic coupon
couponRouter.get('/:id',(req,res)=>{

    const id = req.params.id

    const findBy = {
        _id:id
    }
    couponObj.find(findBy,(err,data)=>{
        if (err) {
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//check coupon
couponRouter.post('/check/:couponCode',(req,res)=>{

    const code = req.params.couponCode

    const findBy = {
        code: code
    }
    couponObj.find(findBy,(err,data)=>{
        if (err) {
            console.log(err)
        }else{
            if (data === null) {
                res.json({"Status":false})
            }else{
                res.json(data)
            }
        }
    })
})

//add coupon
couponRouter.post('/add',(req,res)=>{

    //body data store 
    const couponCode = req.body.code
    const discount = req.body.discount
    const minSpend = req.body.spend

    const couponData = new couponObj({
        code:couponCode,
        discount:discount,
        minSpend:minSpend
    })


    couponData.save((err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"massege":"Data Insert"})
        }
    })
})

//coupon update
couponRouter.put('/update/:id',(req,res)=>{

    //id from url
    const id = req.params.id

    //body data store 
    const couponCode = req.body.code
    const discount = req.body.discount
    const minSpend = req.body.spend

    const findBy = {
        _id: id
    }
    const updateData = {
        code:couponCode,
        discount:discount,
        minSpend:minSpend
    }
    couponObj.findOneAndUpdate(findBy,updateData,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"massege":"Data updated"})
        }
        
    })
})

//coupon delete
couponRouter.delete('/delete/:id',(req,res)=>{
    
    //id from url
    const id = req.params.id

    //find coupon
    const findBy = {
        _id: id
    }

    couponObj.findOneAndDelete(findBy,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"massege":"coupon delete"})
        }
    })
    
})

module.exports = couponRouter