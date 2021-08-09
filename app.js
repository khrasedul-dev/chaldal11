//dependencies
const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const catRouter = require('./controller/catRouteHandler')
const userRouterHandler = require('./controller/userRouterHandler')
const workerRouter = require('./controller/workerHandler')
const couponRouter = require('./controller/couponHandler')
const addProductRouter = require('./controller/productRouter')
const subCatRoute = require('./controller/subCatRouteHandler')
const orderRouteHandler = require('./controller/orderRouteHandler')
const reportHandler = require('./controller/reportHandler')

// //web database connection
// mongoose.connect("mongodb+srv://chaldal:rps1234@cluster0.lea2e.mongodb.net/chaldal?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false}).catch((err)=>{
//     console.log(err)
// })

//local database
mongoose.connect('mongodb://localhost:27017/chaldal',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false})

//call express function
const app = express()

app.use(express.json({
    type:['application/json','text/plain']
}))

app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'*',
    methods:['GET,POST,PUT,DELETE']
}))

//static route
app.use(express.static(path.join(__dirname,"public")))

//demo route
app.get('/',(req,res)=>{
    res.send('Hello World')
    res.end()
})

//categories route
app.use('/cat',catRouter)

//sub cat 
app.use('/subcat',subCatRoute)

// product route
app.use('/product',addProductRouter)

//user route
app.use('/user',userRouterHandler)

//worker route 
app.use('/worker',workerRouter)

//coupon route
app.use('/coupon',couponRouter)

//order router
app.use('/order',orderRouteHandler)

//report
app.use('/report',reportHandler)



//create a server
app.listen(process.env.PORT || 8888,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Server runing on port 8888')
    }
})
