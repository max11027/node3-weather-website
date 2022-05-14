const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

//reference heroku's .env file to get the port
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

const locals = {
    title: 'Weather',
    name: 'Stefano Servodidio'
}
app.get('', (req, res) => {
    res.render('index', locals)
})

app.get('/about', (req, res) => {
    res.render('about', locals)
})

app.get('/help', (req, res) => {
    res.render('help', {
        ...locals,
        helpText: 'Did this help?'
    })
})

app.get('/weather', ({ query: { address } }, res) => {
    if (!address)
        return res.send({
            error: 'You must provide an address!'
        })
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error })
        forecast(latitude, longitude, (error, forecast) => {
            if (error)
                return res.send({ error })
            res.send({ address, location, forecast })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        ...locals,
        errorMessage: 'Help article not found.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        ...locals,
        errorMessage: 'Page not found.',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})