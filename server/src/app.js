//modules require
const express = require('express');
// const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Sequelize } = require("sequelize")

const userRoutes = require('./sequelize/routes/user')


const app = express();
app.use(morgan('combined'))
// app.use(bodyParser.json())
app.use(cors())


// CORS defines how web servers and browsers interact, 
// specifying which resources can be legitimately requested 
// — by default, AJAX requests are forbidden.
//  -----
//To allow cross-origin requests (and prevent CORS errors), 
//specific access control headers must be set on your server response object.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


app.use('/register', userRoutes)

// app.use((req, res, next) => {
//     console.log('Request received from http://localhost:3000' + req.url)
//     next()
// })

// app.use((req, res, next) => {
//     res.status(200)
//     next()
// })

// app.use((req, res, next) => {
//     res.json({
//         message: 'Your request was sucessful',
//     })
//     next()
// })


// app.use((req, res, next) => {
//     console.log('Response sent successfully!')
// })

module.exports = app;
