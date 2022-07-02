/******************************************************* 
                Like controllers
******************************************************/

const { User, Post, Like, sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////////////////////////////////////////
// like a post
exports.likes = async (req, res) => {
  let userId = req.body.userId;
  let postId = req.params.id;
  let insert = { userId, postId };

  await Like.create(insert).then((response) => res.status(201).json(response));
};

//////////////////////////////////////////////////////////////////////////////////////////
// get likes - render all likes
exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: ["postId",
      [sequelize.fn('COUNT', sequelize.col('postId')), 'n_like']],
      group: "postId"
    });
    return res.json(likes);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
