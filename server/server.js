const express = require('express');
const app = express();
const path = require('path');
const pool = require('../db/database.js');
const mainController = require('./mainController.js');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json())

// server static files
app.use('/build',express.static(path.resolve(__dirname,'../build')));

// handle post requests to main page
app.post('/main', mainController.addUser, mainController.poolQuery, (req, res) => {
    // send the results of the query back to the user, should be all rows in our db
    res.send(res.locals.queryResult)
})

// send initial html file
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
})

// set up global error handler

app.listen(port, ()=> console.log(`Server running on ${port}...`))
