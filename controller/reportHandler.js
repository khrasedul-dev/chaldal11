//dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

//internal dependencies
const ordersModel = require('../model/ordersModel')
const productModel = require('../model/productModel')

//create model
const order = mongoose.model('orders',ordersModel)
const product = mongoose.model('products',productModel)


//define report router
const report = express.Router()

//all orders
report.get('/',(req,res)=>{

    //get all order
    order.find((err,data)=>{
        let orderData = data

        //get all product 
        product.find((err,data2)=>{
            res.json({orderData:orderData,productData:data2})
        })

    })

})


module.exports = report
