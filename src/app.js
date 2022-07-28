const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cors = require('cors');
const forecastByLocation = require('./utils/forecast-by-location')

const app = express()
const port = process.env.PORT || 3001;

app.use(cors());

const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

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
    console.log('222', err);
    if(err){
      return res.send(err)
    }
    console.log('data', data);
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

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
})