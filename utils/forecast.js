var request=require('request')
forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/088cf1726634701c924b1bc68eabdb4e/'+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Weather Service can't be accessed",undefined)
        }else if(response.body.error){
            callback("Invalid Location",undefined)
        }else{
            callback(undefined,"It is currently "+response.body.currently.temperature+" degrees out. There is "+response.body.currently.precipProbability+"% chances of rain.")
        }
    })
}
module.exports=forecast