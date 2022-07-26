const request = require('request')

const geocode = (search, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1Ijoibm90dHlraW5nIiwiYSI6ImNsNWI3MjhxbjA0cmUzam1pMGh2OWJqMTkifQ.WCMflo_ya-OciL1mlVAJDw`
  request({url, json:true}, (err, {body}) => {
    if (err){
      callback(err)
    }
    else{
      // console.log(body)
      callback(undefined, body)
    }
  } ) 
}

module.exports = geocode