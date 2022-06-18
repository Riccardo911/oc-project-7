/*************************************************
    post routes -
    contains all of our post related business logic
 *************************************************/

const express = require('express')
const router = express.Router()
    
const postCtrl = require('../controllers/post')

//GET
router.get('/all' , postCtrl.getAllPosts)
router.get('/all/:id' , postCtrl.getPostsByUser)

//POST
router.post('/create' , postCtrl.createPost)

module.exports = router;
