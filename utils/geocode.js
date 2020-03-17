const request = require("request")
geocode=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmluc2h1bWVzaCIsImEiOiJjazRuc3BpdmkyeHF5M2tvYjRsbWV6MndpIn0.sZ0XiaDnPGDofVAUNsqvqg&limit=1'
    request({url:geourl,json:true},(error,response)=>{
        if(error){
            callback("Location service can't be accessed",undefined)
        }else if(response.body.features.length===0){
            callback("Location doesn't exit",undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name,
            })
        }
    })
}
module.exports=geocode