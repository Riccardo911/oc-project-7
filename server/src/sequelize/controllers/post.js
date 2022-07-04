/******************************************************* 
                Post controllers
******************************************************/

const { User , Post, Like, Comment, sequelize } = require('../models/index')
const jwt = require('jsonwebtoken');

//////////////////////////////////////////////////////////////////////////////////////////
//create post
exports.createPost = async (req, res) => {
  let imageUrl = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  let postText = req.body.text 
  let userId = req.body.userId
  let insert = { postText, userId, imageUrl}

  await Post.create(insert)
  .then((response) => {
    res.status(201).json(response)
  }).catch((error) => {
    res.status(400).json(error);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
//get all posts - author of the post - comments of the post - authors of comments 
// view in the home page

exports.getAllPosts = async (req, res) => {

  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, attributes: { exclude: ['password', 'email', 'user_id']}},
        { model: Comment, 
          attributes: {
          include: [ 'comText', 'postId', 'userId', [sequelize.fn("DATE_FORMAT", sequelize.col("comCreatedAt"), "%d-%m-%Y %H:%i:%s" ), 'comCreatedAt']],
          exclude: ['id', 'comUpdatedAt']},
            include: { model: User, attributes: {exclude:['password', 'email', 'user_id']}},
        }
      ],
      attributes: { 
        include: [ 'post_id', [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s" ), 'date']],
        exclude: ['createdAt', 'updatedAt']}
    });
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
    
}

//////////////////////////////////////////////////////////////////////////////////////////
//Get posts by author

exports.getPostsByUser = async (req, res) => {

  try {
    const posts = await Post.findAll({
      where: { userId: req.params.id }, //search all posts made by user_id
      include: [{ model: User, attributes: { exclude: ['password', 'email', 'user_id']} }],
      attributes: { 
        include: [ 'post_id', [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s" ), 'date']],
        exclude: ['createdAt', 'updatedAt']}
    });
    return res.json(posts);     //return all posts made by user_id
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }

};

//////////////////////////////////////////////////////////////////////////////////////////
//delete a post by author

exports.deletePost = async (req, res) => {

  let postId = req.params.id; // --> define from the param the id of the post user wants to delete

  const token = req.headers.authorization.split(" ")[1];            // ||||||||||||||||||||||||||||||||||
  const decodedToken = jwt.verify(token, "secret_token_dev");       // | user Id who wants delete post  |
  const userId = decodedToken.userID;                               // ||||||||||||||||||||||||||||||||||

  await Post.findOne({ where : { post_id: postId }})
    .then((post) => {
        //check if post exists
        if (!post) {
            return res.status(404).json({
                error: "Post doesn't exist!"
            });
        }
        // check if the user is authorized -> post by author == user who wants delete post ?
        if ( post.userId !== userId ) {
            return res.status(401).json({
                error: 'Unauthorized!'
            });
        }
    // if tests pass --> delete post row on database
    Post.destroy({ where: { post_id: postId } })
        .then((response) => {
        res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
        res.status(400).json(JSON.stringify(error));
        });

    }).catch((error) => res.status(500).json(error))   
};
