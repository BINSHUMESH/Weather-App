const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const forecast=require('../utils/forecast.js')
const geocode=require('../utils/geocode.js')
var address

//Defining the different paths for usage
const dataPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../Tempelate/views')
const partialPath=path.join(__dirname,'../Tempelate/partials')

//Setting up the views and handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setting up static pages
app.use(express.static(dataPath))

//Setting up the various routes
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        body:'this is body'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'This is the help page',
        body:'this is body'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'This is the about page',
        body:'this is body'
    })
})
app.get('/weather',(req,res)=>{
    if(req.query.address){
        address=req.query.address
        geocode(address,(error,response)=>{
            if(error){
                res.send({
                    error: error
                })
            }else{
                forecast(response.latitude,response.longitude,(error,data)=>{
                    return res.send({
                        Forecast:data,
                        Location: address
                    })
                })
            }
        })
        
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('prompt',{
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('prompt',{
        message:'404 not found'
    })
})

app.listen(3000,()=>{
    console.log("Server is up and running on port 3000")
})