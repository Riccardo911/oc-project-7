/*************************************************
    post routes -
    contains all of our post related business logic
 *************************************************/

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
    
const postCtrl = require('../controllers/post')

//GET
router.get('/all' , auth , postCtrl.getAllPosts)
router.get('/all/:id', auth , postCtrl.getPostsByUser)

//POST
router.post('/create' , auth , postCtrl.createPost)

//DELETE
// router.delete('all/:id', postCtrl.deletePost)

module.exports = router;
