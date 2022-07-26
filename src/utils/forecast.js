const request = require('request')


const forecast = (lat, lng, callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=a7e3a47e91a648d5f39a4a384dcd9723&query=${lat},${lng}&units=F`
  
  request({url, json:true}, (error,{body})=>{
    if (error) {
      callback(error)
    } 
    else{
      callback(undefined,body)
    }
  })
}

module.exports = forecast