/*************************************************
    post routes -
    contains all of our post related business logic
 *************************************************/

    const express = require('express')
    const router = express.Router()
    
    const postCtrl = require('../controllers/post')

    router.post('/create' , postCtrl.createPost)

    module.exports = router;
