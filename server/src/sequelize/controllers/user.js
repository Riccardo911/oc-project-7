/******************************************************* 
                User controllers
******************************************************/

const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

//////////////////////////////////////////////////////////////////////////////////////////
//register
exports.register = async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.status(401).json({ error: "User already exist!" });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          });
          user.save().then(() => {
            res.status(201).json({
              message: "User created successfully from register form"
            });
          }).catch((error) => {
            res.status(400).json({ error: error });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

//////////////////////////////////////////////////////////////////////////////////////////
//login
exports.login = async (req, res, next) => {
    await User.findOne({ where: {email: req.body.email} }).then((user) => {
        if(!user) {
            return res.status(404).json({ error: "User doesn't exist!"});
        };
        bcrypt.compare(req.body.password, user.password).then((valid) => {
            if (!valid) {
                return res.status(402).json({ error: 'Incorrect password!'});
            };
            res.status(200).json({
                userID: user.user_id,
                // firstName : user.firstName,
                // lastName : user.lastName,
                token: jwt.sign({userID: user.user_id }, 'secret_token_dev', {expiresIn: '24h'})
            })
        }).catch(error => res.status(400).json(error));
    }).catch(error => res.status(500).json({error}));
}

//////////////////////////////////////////////////////////////////////////////////////////
// see user profile 
exports.profile = async (req, res, next) => {

  try{
    const user = await User.findOne({ 
      where : { user_id : req.params.id },
      attributes: { exclude: ['password', 'user_id'] }
    })
      return res.json(user);
  }catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }

}

//////////////////////////////////////////////////////////////////////////////////////////
// delete user profile

exports.deleteUser = async (req, res, next) => {
  
  await User.destroy({ 
    where: { user_id : req.params.id }, force:true})
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((error) => {
      res.satus(400).json(error)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////
// update user profile

exports.updateUser = async (req, res, next) => {
  
}