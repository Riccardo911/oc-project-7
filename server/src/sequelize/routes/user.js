/**************************************
              user router
 *************************************/

const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

try{
    
    router.post('/register', userCtrl.register);
    router.post('/login', userCtrl.login);  

} catch (error) {
    console.log(error)
}



module.exports = router;