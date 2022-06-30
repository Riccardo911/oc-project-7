/*************************************************
    comment routes -
    contains all of our comment related business logic
 *************************************************/

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const commentCtrl = require("../controllers/comment");

    try {
        router.get('/all', commentCtrl.getComment)
        router.post('/create', commentCtrl.postComment)

    } catch (error) {
        console.log(error);
    }

module.exports = router;
    