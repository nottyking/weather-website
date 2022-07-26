const forecast = require('./forecast');
const geocode = require('./geocode');

const forecastByLocation = (search, callback) => {
  geocode(search, (err, data = {})=>{
    if(err){
      return callback(err)
    }
    console.log(data)
    const {
      features: {
        0: {
          center: {
            0:lng,
            1:lat
          } = {}
        } = {}
      }
    } = data;
    forecast(lat,lng, (err, data)=>{
      console.log('err', err);
      if(err || !data.location){
        return callback(err || 'Error')
      }
      console.log('data 2', data);
      const {
        location:{name},
        current: {
          weather_descriptions: {
            0:weather_description
          }
        }
      } = data
      callback(undefined, {name, weather_description})
    })
  })
}

module.exports = forecastByLocation