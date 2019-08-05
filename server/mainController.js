const pool = require('../db/database.js');

const middlewareFuncs = {};

middlewareFuncs.addUser = (req, res, next) => {
    // values to be inserted into new, come from request body
    let values = [req.body.firstname, req.body.lastname, req.body.email];
    //console.log(values);
    pool.query(`INSERT INTO thirty (firstname, lastname, email) VALUES ($1, $2, $3);`,
      values, (err, results) => {
        if(err) console.log('User is already created, or issues with the input fields');
        next();
    })
}

middlewareFuncs.poolQuery = (req, res, next) => {
    pool.query('select * from thirty', (err, result) => {
      if(err) console.log('this is an error');
      // store all rows in our table to res.locals
      res.locals.queryResult = result.rows;
      next();
    })
}

module.exports = middlewareFuncs;
