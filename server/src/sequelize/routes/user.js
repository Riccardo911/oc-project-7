const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const { User } = require('../models')

router.post('', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    });
    user.save().then(() => {
        res.status(201).json({
            message: 'User created successfully from register form'
        })
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
    })
});



module.exports = router;