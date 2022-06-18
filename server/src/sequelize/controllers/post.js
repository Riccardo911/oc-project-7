/******************************************************* 
                Post controllers
******************************************************/

const { User , Post } = require('../models/index')


//create post
exports.createPost = async (req, res) => {
    const { userID , postText } = req.body

    try {
        const user = await User.findOne({ where: { user_id : userID }}) //search the id of the user that create the post

        const post = await Post.create({ postText, userId: user.user_id}) //create a row in the database ( postText, ForeignKey = user_id)
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
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
