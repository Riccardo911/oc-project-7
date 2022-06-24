/******************************************************* 
                Post controllers
******************************************************/

const { User , Post } = require('../models/index')
const jwt = require('jsonwebtoken');


//create post
exports.createPost = async (req, res) => {
    //data from Create component
    let postText = req.body.postText
    let userId = req.body.userId
    let insert = { postText, userId }

    await Post.create(insert).then((response) => {
        res.status(201).json(JSON.stringify(response))
    })
}

//get all post - view in the home page all posts

exports.getAllPosts = async (req, res) => {

    try {
        const posts = await Post.findAll() //search all posts in the DB
        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    
}

//Get posts by author

exports.getPostsByUser = async (req, res) => {
    
    try {
        const posts = await Post.findAll({      //search all posts made by user_id
            where: { userId : req.params.id }
        })
        return res.json(posts)  //return all posts made by user_id
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

//delete a post

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
            return res.status(403).json({
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

