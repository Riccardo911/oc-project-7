/******************************************************* 
                Comment controllers
******************************************************/

const { User , Post, Like, Comment, sequelize } = require('../models/index')
const jwt = require('jsonwebtoken');

//////////////////////////////////////////////////////////////////////////////////////////
//post comment
exports.postComment = async (req, res) => {
    let comText = req.body.comText
    let postId = req.body.postId
    let userId = req.body.userId
    let insert = { comText, postId, userId }

    await Comment.create(insert).then((response) => {
        res.status(201).json(response)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////
//get comment
exports.getComment = async (req, res) => {
    try {
        const comments = await Comment.findAll({
          order: [["createdAt", "ASC"]],
          include: [{ model: User, attributes: { exclude: ['password', 'email', 'user_id']} }],
          attributes: { 
            include: [ 'postId', 
            [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s" ), 'date']],
            exclude: ['createdAt', 'updatedAt', 'id'],
          },
        });
        return res.json(comments);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
}

//////////////////////////////////////////////////////////////////////////////////////////
//Delete comment

//TODO

//////////////////////////////////////////////////////////////////////////////////////////
//Update comment

//TODO