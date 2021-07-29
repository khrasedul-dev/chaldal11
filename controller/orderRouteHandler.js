//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const ordersSchema = require('../model/ordersModel')


//create order model 
const orderModelObj = mongoose.model('orders',ordersSchema)

//define custom router
const orderRouter = express.Router()

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
        customerID: id
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
orderRouter.post('/add',(req,res)=>{

    //get all data from body
    const customerID = req.body.customerID
    const productID = req.body.productID
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    const discountsType = req.body.discountsType
    const discount = req.body.discount
    const couponCode = req.body.couponCode
    const couponDiscount = req.body.couponDiscount
    const orderStatus = req.body.orderStatus
    const paymentMethod = req.body.paymentMethod

    //prepare for database
    const orderData = new orderModelObj({
        customerID:customerID,
        productID:productID,
        quantity:quantity,
        totalPrice:totalPrice,
        discountsType: discountsType,
        discount: discount,
        couponCode:couponCode,
        couponDiscount: couponDiscount,
        orderStatus:orderStatus,
        paymentMethod:paymentMethod
    })

    orderModelObj.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({"Status":"Data Insert"})
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
            // res.json({"Data updated"})
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