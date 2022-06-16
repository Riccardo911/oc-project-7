/********************************************* 
            Connecting to a database
*********************************************/

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('forum', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});


//testing the connection

sequelize.authenticate().then(() => {
    console.log('[sequelize] Connection has been established successfully.');
}).catch ((error) => {
    console.error('[sequelize] Unable to connect to the database:', error);
});



/**********************************************
    inserting a Table into mySQL with sync() 
***********************************************/

const { DataTypes } = Sequelize

sequelize.sync({ alter: true});

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

User.sync().then(() => {
    console.log("Table and model synced successfully!")
}).catch(() => {
    console.log("Error syncing the table and model!")
});

/**********************
    insert into table
***********************/

// User.sync().then(() => {
//     return User.create({
//         firstName: 'test',
//         lastName: 'test',
//         email:'test@example.com',
//         password: 'passaworld'
//     })
// }).then((data) => {
//     console.log("User added to database!");
//     console.log(data.toJSON())
// }).catch((err) => {
//     console.log(err)
// });

// /************************ 
//   model queryng
// **********************/

// User.sync().then(() => {
//     return User.findAll( );
// }).then((data) => {
//     data.forEach((element) => {
//         console.log(element.toJSON())
//     })
// }).catch((err) => {
//     console.log(err)
// })
