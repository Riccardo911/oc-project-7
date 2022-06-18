/******************************************************* 
                Post controllers
******************************************************/

const { User , Post } = require('../models/index')


//create post
exports.createPost = async (req,res) => {
    const { userID , postText } = req.body

    try {
        const user = await User.findOne({ where: { user_id : userID }})

        const post = await Post.create({ postText, userId: user.user_id})
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

