const express = require('express');

const app = express();


// CORS defines how web servers and browsers interact, 
// specifying which resources can be legitimately requested 
// — by default, AJAX requests are forbidden.
//  -----
//To allow cross-origin requests (and prevent CORS errors), 
//specific access control headers must be set on your server response object.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
    console.log('Request received')
    next()
})

app.use((req, res, next) => {
    res.status(200)
    next()
})

app.use((req, res, next) => {
    res.json({
        message: 'Your request was sucessful',
    })
    next()
})


app.use((req, res, next) => {
    console.log('Response sent successfully!')
})

module.exports = app;
