const express = require('express');
const app = express();
const path = require('path');
const pool = require('../db/database.js');
const mainController = require('./mainController.js');
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json())
app.use('/build',express.static(path.resolve(__dirname,'../build')));
app.post('/main', mainController.addUser, mainController.poolQuery, (req, res) => {
    res.send(res.locals.queryResult)    
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
})

app.listen(port, ()=> console.log(`Server running on ${port}...`))