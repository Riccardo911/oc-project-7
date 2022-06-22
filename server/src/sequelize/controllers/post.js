/******************************************************* 
                Post controllers
******************************************************/

const { User , Post } = require('../models/index')


//create post
exports.createPost = async (req, res) => {
    //data from Create component
    let postText = req.body.postText
    let userId = req.body.userId
    let insert = {postText, userId}

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

// exports.deletePost = async (req, res) => {

// }
