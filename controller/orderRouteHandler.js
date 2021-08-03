//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const ordersSchema = require('../model/ordersModel')


//define custom router
const orderRouter = express.Router()

//create order model 
const orderModelObj = mongoose.model('orders',ordersSchema)

//get all orders
orderRouter.get('/',(req,res)=>{
    //condition
    const condition = {

    }
    orderModelObj.find(condition,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//get specific orders
orderRouter.get('/:id',(req,res)=>{

    //get id from url
    const id = req.params.id

    //condition
    const condition = {
        _id: id
    }
    orderModelObj.find(condition,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//get specific user orders
orderRouter.get('/user/:id',(req,res)=>{
    //get data from url
    const id = req.params.id

    //condition
    const condition = {
        useId: id
    }
    orderModelObj.find(condition,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

//add orders in database
orderRouter.post('/add/new',(req,res)=>{

    //get all data from body
    const useId = req.body.useId
    const totalPrice = req.body.totalPrice
    const products = req.body.products
    const discountsType = req.body.discountsType
    const discount = req.body.discount
    const couponCode = req.body.couponCode
    const couponDiscount = req.body.couponDiscount
    const orderStatus = req.body.orderStatus
    const date = new Date().toLocaleString()

    //prepare for database
    const orderData = new orderModelObj({
        useId:useId,   
        products:products,
        totalPrice:totalPrice,
        discountsType: discountsType,
        discount: discount,
        couponCode:couponCode,
        couponDiscount: couponDiscount,
        orderStatus:orderStatus,
        date:date
    })

    orderData.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"status":true})
        }
    })

})

//orders update
orderRouter.put('/update/:id',(req,res)=>{

    //get id from url
    const id = req.params.id

    //condition
    const updateById = {
        _id: id
    }

    //update data define
    const orderStatus = req.body.orderStatus

    const orderUpdateData = {
        orderStatus:orderStatus
    }

    orderModelObj.findOneAndUpdate(updateById,orderUpdateData,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json({status:true})
        }
    })
})

//order Delete
orderRouter.delete('/delete/:id',(req,res)=>{
    //get id from url
    const id = req.params.id
    
    //delete by id 
    const deleteByID = {
        _id: id
    }

    orderModelObj.findByIdAndDelete(deleteByID,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"massage":"Data deleted"})
        }
    })
})


module.exports = orderRouter