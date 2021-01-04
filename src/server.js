const express = require('express');

const path = require('path')




//Init
const app = express();


// Settings

app.set('port', process.env.PORT || 3000);
app.set('view', path.join(__dirname, 'view'));


// Middlewares
app.use(express.urlencoded({extended: false}));

//Global Variables


// Routes
app.get('/', (req, res) => {
    res.send("Hello Word")
})


// Statics Files

app.use(express.static(path.join(__dirname,'public')));

module.exports = app;