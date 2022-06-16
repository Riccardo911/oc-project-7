const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/index')

const userCtrl = require('../controllers/user')

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Sequelize } = require("sequelize")

const fs = require('fs');

//register
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

// login
// router.post('', (req, res, next) => {
//     User.findOne({ where: {email: req.body.email} }).then((user) => {
//         if(!user) {
//             return res.status(401).json({ error: "User doesn't exist!"});
//         };
//         bcrypt.compare(req.body.password, user.password).then((valid) => {
//             if (!valid) {
//                 return res.status(401).json({ error: 'Incorrect password!'});
//             };
//             res.status(200).json({
//                 userID: user.user_id,
//                 token: jwt.sign({userID: user.user_id}, 'secret_token_dev', {expiresIn: '24h'})
//             })
//         }).catch(error => res.status(400).json(error));
//     }).catch(error => res.status(500).json({error}));
// });


module.exports = router;