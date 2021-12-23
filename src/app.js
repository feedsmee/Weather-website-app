const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./Utils/geoCode')
const forecast = require('./Utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)

app.use(express.static(publicDirectory))
hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Robbens'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Robbens'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Robbens',
        phrase: 'Never give up your Dreams!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({error: 'Adress not found'})
    }

    const adress = req.query.adress

    geocode(adress, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                forecast: forecastData.body.weather[0].main,
                location: forecastData.body.name,
                adress
            })

        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        error: 'Help article not found!',
        name: 'Robbens'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 404,
        error: 'Page not found!',
        name: 'Robbens'
    })
})

app.listen(port, () => {
    console.log('Server is up on  port ' + port)
})
