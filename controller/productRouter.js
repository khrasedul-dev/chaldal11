const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const productSchema = require('../model/productModel')
//global var
const url = require('../lib/url')


const proObj = mongoose.model('products',productSchema)

//define router
const proRoute = express.Router()


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


//fetch product
proRoute.get('/',(req,res)=>{
    proObj.find({},(err,data)=>{
        res.json(data)
    }).sort({'date':-1})
})

//fetch product last 10
proRoute.get('/last',(req,res)=>{
    proObj.find({},(err,data)=>{
        res.json(data)
    }).sort({'date':-1}).limit(4)
})

//single product
proRoute.post('/:productID',(req,res)=>{

    const productID = req.params.productID

    const productQueryByID = {
        _id : productID
    }
    proObj.find( productQueryByID,(err,data)=>{
        res.json(data)
    })
})

//single category data fetch
proRoute.post('/cat/:catID',(req,res)=>{
    //get id form url
    const catID = req.params.catID

    const catfindbyid = {
        catID:catID
    }
    proObj.find(catfindbyid).sort({'date':-1}).exec((err,data)=>{
        res.json(data)
    })    
})

//single category data fetch last 10
proRoute.post('/cat/last/:catID',(req,res)=>{
    //get id form url
    const catID = req.params.catID

    const catfindbyid = {
        catID:catID
    }
    proObj.find(catfindbyid).sort({'date': -1}).limit(8).exec((err,data)=>{
        res.json(data)
    })    
})

//add product
proRoute.post('/add/new',upload.single('file'),(req,res)=>{

    const name = req.body.name
    const purchasePrice = req.body.purchasePrice
    const sellPrice = req.body.sellPrice
    const desc = req.body.description
    const photo = req.file.filename
    const image = url+photo
    const catID = req.body.category
    const quantity = req.body.quantity

    // discount manage
    const discountType = req.body.discountType
    const discount = req.body.discount
    const discountPrice = req.body.discountPrice

    const productData = new proObj({
        name:name,
        purchasePrice:purchasePrice,
        sellPrice:sellPrice,
        desc:desc,
        catID: catID,
        image:image,
        photo:photo,
        quantity:quantity,
        discountType: discountType,
        discount: discount,
        discountPrice: discountPrice

    })

    console.log(productData)

    productData.save((err,data)=>{
        if(err){
            console.log(err)
        }else{

            res.json({"massege":"Data Insert"})
        }
    })
})

// //product update
proRoute.put('/update/:id',upload.single('file'),(req,res)=>{

    const productID = req.params.id

    //Recive body Value
    const name = req.body.name
    const purchasePrice = req.body.purchasePrice
    const sellPrice = req.body.sellPrice
    const desc = req.body.description
    const catID = req.body.category
    const quantity = req.body.quantity

    //discount manage
    const discountType = req.body.discountType
    const discount = req.body.discount
    const discountPrice = req.body.discountPrice

     //find data 
     const findProductID = {
        _id: productID
    }

    //check file exist
    const fileFinder = req.file

    //update with file check
    if(!fileFinder){

        const productUpdatedData = {
            name:name,
            purchasePrice:purchasePrice,
            sellPrice:sellPrice,
            desc:desc,
            catID: catID,
            quantity:quantity,
            discountType: discountType,
            discount: discount,
            discountPrice:discountPrice
        }

        proObj.findOneAndUpdate(findProductID,productUpdatedData,(err,data)=>{
            res.json({"Status":true})
        })

    }else{
        const photo = req.file.filename
        const image = url+photo

        const productUpdatedData = {
            name:name,
            purchasePrice:purchasePrice,
            sellPrice:sellPrice,
            desc:desc,
            image:image,
            catID: catID,
            quantity:quantity,
            photo:photo,
            discountType: discountType,
            discount: discount,
            discountPrice:discountPrice
        }

        proObj.findOneAndUpdate(findProductID,productUpdatedData,(err,data)=>{

            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(err)
            })

            res.json({"Status":true})

        })

    }
    
})

//product sell quantity update
proRoute.put('/update/s/q',(req,res)=>{

    //get id and quantity from body
    const id = req.body.id
    const quantity = parseInt(req.body.sellQuantity)

    //find by id 
    const findByID = {
        _id : id
    }
    proObj.find(findByID,(err,data)=>{
        const oldSellQuantity = parseInt(data[0].sellQuantity)

        const finalQuantity = quantity+oldSellQuantity

        const updateQuantity = {
            sellQuantity: finalQuantity
        }
        proObj.findOneAndUpdate(findByID,updateQuantity,(err)=>{
            if (err) {
                console.log(err)
            } else {
                res.json({"status":true})
            }
        })
    })
})

//product delete
proRoute.delete('/delete/:id',(req,res)=>{
   
    //get id from url
    const id = req.params.id

    const deleteByID = {
        _id : id
    }

    proObj.findOneAndDelete(deleteByID,(err,data)=>{
        if(err){
            console.log(err)
            res.json({"massege":"Data delete successfully"})
        }else{
            const fileName = data.photo
            fs.unlink('public/uploads/'+fileName,(error)=>{
                console.log(err)
            })
            res.json({"massege":"Data delete successfully"})
        }       
    })

})

module.exports = proRoute