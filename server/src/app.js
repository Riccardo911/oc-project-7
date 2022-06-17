//modules require
const chalk = require('chalk')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('express-async-errors');
const { Sequelize } = require("sequelize")
const { sequelize } = require("./sequelize/models")

const userRoutes = require('./sequelize/routes/user')
const { Post } = require('./sequelize/models/index')


const app = express();
app.use(morgan('combined'))
app.use(cors())

//sync with SQL database
async function main() {
    await sequelize.sync({ alter:true })
    console.log(chalk.bgGreen('Database synced!'))
}
main()

//test connection
sequelize.authenticate().then(() => {
    console.log(chalk.bgGreen('[sequelize] Connection has been established successfully.'));
}).catch ((error) => {
    console.error(chalk.bgRed('[sequelize] Unable to connect to the database:', error));
});

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(bodyParser.json())

//user login and register
app.use('/api/auth', userRoutes)


//post
app.post('/post/create', (req, res) => {
    const post = new Post ({
        postText: req.body.postText,
    })
    post.save().then(() => {
        res.status(201).json({
            message: 'Post created successfully!'
        })
    }).catch((error) => {res.status(400).json({error: error})
    })
})


// app.post('/login', (req, res, next) => {
//     User.findOne({ where: {email: req.body.email} }).then((user) => {
//         if(user) {
//             res.status(200).json({
//                 email: user.firstName
//             })
//         }
//     }).catch(error => res.status(400).json(error))
// })


//test
// app.post('/home/create', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//     message: 'Post create successfully!'
//   });
// })



// app.use((req, res, next) => {
//     console.log('Request received from http://localhost:3000' + req.url)
//     next()
// })

// app.use((req, res, next) => {
//     res.status(200)
//     next()
// })

// app.use((req, res, next) => {
//     res.json({
//         message: 'Your request was sucessful',
//     })
//     next()
// })


// app.use((req, res, next) => {
//     console.log('Response sent successfully!')
// })

module.exports = app;
