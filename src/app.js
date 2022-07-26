const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecastByLocation = require('./utils/forecast-by-location')

const app = express()


const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))
// console.log(`${__dirname}/../public'`)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather app',
    name: 'Andrew Mead',
  })
})

app.get('/weather', (req, res)=>{
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  forecastByLocation(req.query.address, (err, data)=>{
    if(err){
      return res.send(err)
    }
    res.send({
      forecast: data.weather_description,
      location: data.name,
    })
  })
})

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead',
  })
})

app.get('/help', (req, res)=>{
  res.render('help', {
    title: 'helpppp',
    name: 'Andrew Mead',
  })
})

app.get('/help/*', (req, res)=>{
  res.render('404',{
    title: '404 not found',
    name: 'pla duk',
    errorMessage: 'Help article not found'
  })
})

app.get('/*', (req, res)=>{
  res.render('404',{
    title: '404 not found',
    name: 'pla duk',
    errorMessage: 'Page not found'
  })
})

app.listen(3001, ()=>{
  console.log('Server is up on port 3000')
})