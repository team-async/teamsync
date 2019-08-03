const express = require('express');
const app = express();
const path = require('path');
// const bodyParser = require('body-parser');
const port = 3000;
// app.use(bodyParser.json())
app.use('/build',express.static(path.resolve(__dirname,'../build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
})

app.listen(port, ()=> console.log(`Server running on ${port}...`))