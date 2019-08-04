const pool = require('../db/database.js');

const middlewareFuncs = {};

middlewareFuncs.addUser = (req, res, next) => {
    let values = [req.body.firstname, req.body.lastname, req.body.email];
    pool.query('INSERT INTO thirty (firstname, lastname, email) VALUES ($1, $2, $3);', values, (err, results) => {
        if(err) console.log('nothing was added to db');
    next();
    })
}

middlewareFuncs.poolQuery = (req, res, next) => {
    pool.query('select * from thirty', (err, result) => {
    if(err) console.log('this is an error');
    res.locals.queryResult = result.rows;
    next();
    })
}

module.exports = middlewareFuncs;