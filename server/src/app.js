//modules require
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Sequelize } = require("sequelize")
const { sequelize } = require("./sequelize/models")

const userRoutes = require('./sequelize/routes/user')
const { User } = require('./sequelize/models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
app.use(morgan('combined'))
app.use(cors())

async function main() {
    await sequelize.sync({ alter:true })
    console.log('Database synced!')
}
main()

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
app.use(bodyParser.json())

app.use('/register', userRoutes)
// app.use('/login', userRoutes)

//login
app.post('/login', (req, res, next) => {
    User.findOne({ where: {email: req.body.email} }).then((user) => {
        if(!user) {
            return res.status(401).json({ error: "User doesn't exist!"});
        };
        bcrypt.compare(req.body.password, user.password).then((valid) => {
            if (!valid) {
                return res.status(401).json({ error: 'Incorrect password!'});
            };
            res.status(200).json({
                userID: user.user_id,
                token: jwt.sign({userID: user.user_id}, 'secret_token_dev', {expiresIn: '24h'})
            })
        }).catch(error => res.status(400).json(error));
    }).catch(error => res.status(500).json({error}));
});


// app.post('/login', (req, res, next) => {
//     User.findOne({ where: {email: req.body.email} }).then((user) => {
//         if(user) {
//             res.status(200).json({
//                 email: user.firstName
//             })
//         }
//     }).catch(error => res.status(400).json(error))
// })



// app.post('/login', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//     message: 'User Logged successfully!'
//   });
// })


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
