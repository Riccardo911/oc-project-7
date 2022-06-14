const express = require('express')
const router = express.Router()

const { User } = require('../models')

router.post('', (req, res, next) => {
    const user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
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
});



module.exports = router;