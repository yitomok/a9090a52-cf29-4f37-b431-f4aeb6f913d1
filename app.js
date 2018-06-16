const express = require('express')
const bodyParser = require('body-parser')

const app = module.exports = express()
if (process.env.NODE_ENV != 'test') {
    app.use(require('morgan')('common'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('helmet')())

const http = require('http').Server(app)

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

if (process.env.NODE_ENV != 'test') {
    mongoose.connect(process.env.DB_URI)
    .then((db) => {
        if (db) {
            http.listen(Number(process.env.PORT), () => {
                console.log('The magic happens on port ' + process.env.PORT)
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

// Routes for user registration and login
app.use('/user', require('./routes/user.js'))
// Routes for adding contacts, each requests pass through an authentication middleware
app.use('/contact', require('./auth.js'), require('./routes/contact.js'))
// Routes for all other requests
app.use((req, res) => {
    res.json({ 'message': 'welcome' })
})
