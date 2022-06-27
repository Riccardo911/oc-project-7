/**************************************
              user router
 *************************************/

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/user')

try{
    
    router.get('/profile/:id', auth, userCtrl.profile);
    router.delete('/profile/:id', auth, userCtrl.deleteUser);

    router.post('/register', userCtrl.register);
    router.post('/login', userCtrl.login);



} catch (error) {
    console.log(error)
}


module.exports = router;
