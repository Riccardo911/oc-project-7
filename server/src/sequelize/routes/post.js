/*************************************************
    post routes -
    contains all of our post related business logic
 *************************************************/

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
    
const postCtrl = require('../controllers/post')

try {

    //GET
    router.get('/all' , auth , postCtrl.getAllPosts)
    router.get('/all/:id', auth , postCtrl.getPostsByUser)
    router.get('/all/like', auth , postCtrl.getLikes)

    //POST
    router.post('/create/', auth, postCtrl.createPost)
    router.post('/all/:id/like', auth, postCtrl.likePost)

    //DELETE
    router.delete('/all/:id', auth, postCtrl.deletePost)

} catch (error) {
    console.log(error)
}







module.exports = router;
